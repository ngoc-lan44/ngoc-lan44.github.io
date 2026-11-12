# Câu lệnh Workshop hiện hành

Tài nguyên AWS đã tạo được ghi nhận bằng cấu hình/ảnh; các lệnh bên dưới thuộc triển khai source, xử lý hoặc kiểm kết quả.

## 5.2.1. Chuẩn bị account, Region và công cụ

~~~powershell
Set-Location E:\vn-it-job-market
aws sts get-caller-identity --region ap-southeast-1
.\.venv\Scripts\python.exe --version
.\.venv\Scripts\python.exe -m pip check
~~~

## 5.3.2. Chuẩn bị canonical Parquet và seed hiện hữu

~~~bash
aws s3api head-object --bucket vn-it-job-market-data-381924757765-ap-southeast-1-an --key analytics/itviec/current_jobs.parquet --region ap-southeast-1
~~~

~~~powershell
Set-Location E:\vn-it-job-market
Get-FileHash -Algorithm SHA256 -LiteralPath .\data\current\itviec\current_jobs.json
aws s3 cp .\data\current\itviec\current_jobs.json "s3://vn-it-job-market-data-381924757765-ap-southeast-1-an/deploy/ec2/seed/<SHA256_THUC_TE>/current_jobs.json" --sse AES256 --region ap-southeast-1
~~~

## 5.4.2. Chạy truy vấn nguồn và chuẩn bị dependency view

~~~sql
SELECT COUNT(*) AS total_rows, COUNT(DISTINCT job_id) AS distinct_ids
FROM vn_it_job_market.itviec_current_jobs;

SELECT status, COUNT(*) AS jobs
FROM vn_it_job_market.itviec_current_jobs GROUP BY status;
~~~

## 5.5.3. Cấu hình backend và kiểm view công khai

~~~toml
[moderation]
backend = "dynamodb"
s3_bucket = "vn-it-job-market-data-381924757765-ap-southeast-1-an"
s3_prefix = "control/moderation/"
dynamodb_table = "vn-it-job-market-moderation"
audit_table = "vn-it-job-market-moderation-audit"
region = "ap-southeast-1"
~~~

~~~sql
SELECT COUNT(*) AS public_jobs FROM vn_it_job_market.itviec_active_jobs;
SELECT COUNT(*) AS leaked_deleted_jobs
FROM vn_it_job_market.itviec_active_jobs a
JOIN vn_it_job_market.itviec_deleted_jobs d ON a.job_id=d.job_id;
~~~

## 5.6.1. Source release và hạ tầng EC2

~~~powershell
Set-Location E:\vn-it-job-market
.\.venv\Scripts\python.exe deploy/ec2/build_release.py
Get-FileHash -Algorithm SHA256 -LiteralPath .\data\releases\ec2-source.tar.gz
~~~

## 5.6.2. Cài runtime và cấu hình ứng dụng trên EC2

~~~bash
sudo tail -n 60 /var/log/vnjob-bootstrap.log
cloud-init status
~~~

~~~bash
cd /opt/vn-it-job-market
sudo bash deploy/ec2/install.sh
~~~

~~~bash
sudoedit /opt/vn-it-job-market/.streamlit/secrets.toml
sudoedit /etc/vn-it-job-market.env
~~~

## 5.6.3. Đưa seed vào runtime và khởi động dashboard

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python - <<'PY'
import boto3,hashlib,json
from pathlib import Path
key="deploy/ec2/seed/<SHA256_THUC_TE>/current_jobs.json"
expected="<SHA256_THUC_TE>"
p=Path("data/current/itviec/current_jobs.json")
if p.exists():
    raise RuntimeError("Current da ton tai; doi chieu truoc khi thay")
response=boto3.client("s3",region_name="ap-southeast-1").get_object(
    Bucket="vn-it-job-market-data-381924757765-ap-southeast-1-an",Key=key)
stream=response["Body"]
try:
    body=stream.read()
finally:
    stream.close()
assert hashlib.sha256(body).hexdigest()==expected, "Seed checksum mismatch"
data=json.loads(body)
assert isinstance(data.get("jobs"),list) and data["jobs"], "Seed jobs invalid"
p.parent.mkdir(parents=True,exist_ok=True)
with p.open("xb") as output:
    output.write(body)
print("Seed current rows:",len(data["jobs"]))
PY
~~~

~~~bash
cd /opt/vn-it-job-market
sudo chown -R vnjob:vnjob data/current
sudo -u vnjob .venv/bin/python --version
.venv/bin/python -m pip check
sudo systemctl restart vnjob-dashboard.service
sudo systemctl status vnjob-dashboard.service --no-pager
curl --fail http://127.0.0.1:8501/_stcore/health
~~~

## 5.7.1. Chạy pipeline và khám phá URL

~~~bash
sudo systemctl status vnjob-pipeline.service --no-pager
~~~

~~~bash
sudo systemctl start --no-block vnjob-pipeline.service
sudo journalctl -u vnjob-pipeline.service -n 80 --no-pager -o cat
~~~

~~~bash
sudo journalctl -u vnjob-pipeline.service --since "2026-11-11 08:15:00 UTC" --until "2026-11-11 08:25:00 UTC" --no-pager -o cat
~~~

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python -c 'import json; from pathlib import Path; files=list(Path("data/raw/itviec").glob("itviec_urls_*.json")); assert files, "Chua co file discovery"; p=max(files,key=lambda x:x.stat().st_mtime); d=json.loads(p.read_text(encoding="utf-8")); urls=d.get("job_urls",[]); print("File:",p); print(json.dumps({k:d.get(k) for k in ("source","discovery_time","coverage_checked","total_pages_checked","total_unique_jobs","failed_pages")},ensure_ascii=False,indent=2)); print("URLs:",len(urls),"| Unique:",len(set(urls))); print("5 URL dau:"); print("\n".join(urls[:5]))'
~~~

## 5.7.2. Thu thập từng batch và kiểm liên kết discovery

~~~bash
cd /opt/vn-it-job-market
export PIPELINE_DISCOVERY_FILE="/opt/vn-it-job-market/data/raw/itviec/<TEN_DISCOVERY_THUC_TE>.json"
sudo -u vnjob env PIPELINE_DISCOVERY_FILE="$PIPELINE_DISCOVERY_FILE" .venv/bin/python collectors/itviec_batch_collector.py 1
unset PIPELINE_DISCOVERY_FILE
~~~

~~~bash
sudo -u vnjob .venv/bin/python -c 'import json; from pathlib import Path; name="itviec_urls_20261111_152117_659903.json"; matches=[(p,json.loads(p.read_text(encoding="utf-8"))) for p in Path("data/raw/itviec/batches").glob("itviec_batch_001_*.json")]; matches=[(p,d) for p,d in matches if Path(d.get("discovery_file","")).name==name]; assert matches, "Chua tim thay batch 1 thuoc discovery da chon"; p,d=max(matches,key=lambda x:x[0].stat().st_mtime); print("File:",p); print(json.dumps({k:d.get(k) for k in ("discovery_file","crawl_time","batch_number","total_batches","batch_size","expected_count","success_count","failed_count","batch_complete","snapshot_complete","stopped_early")},ensure_ascii=False,indent=2)); print("So ban ghi jobs:",len(d.get("jobs",[])))'
~~~

## 5.7.3. Hoàn tất toàn lượt và chuyển sang ETL

~~~bash
sudo journalctl -u vnjob-pipeline.service -n 120 --no-pager -o cat
sudo systemctl status vnjob-pipeline.service --no-pager
~~~

## 5.8.2. Làm sạch, cấu hình data root và xuất Parquet

~~~bash
sudo -u vnjob /bin/bash
cd /opt/vn-it-job-market
ETL_DATA="$(mktemp -d /tmp/vnjob-etl.XXXXXX)"
mkdir -p "$ETL_DATA/current/itviec"
cp data/current/itviec/current_jobs.json "$ETL_DATA/current/itviec/current_jobs.json"
export PIPELINE_DATA_ROOT="$ETL_DATA"
.venv/bin/python processors/clean_itviec.py
.venv/bin/python processors/export_itviec_parquet.py
.venv/bin/python - <<'PY'
import os,json
from pathlib import Path
import pyarrow.parquet as pq
r=Path(os.environ["PIPELINE_DATA_ROOT"])
p=r/"analytics/itviec/current_jobs.parquet"
c=json.loads((r/"clean/itviec/current_jobs_clean.json").read_text())
print(pq.read_schema(p))
print("JSON rows:",len(c["jobs"]))
print("Parquet rows:",pq.read_metadata(p).num_rows)
assert pq.read_metadata(p).num_rows==len(c["jobs"])
PY
unset PIPELINE_DATA_ROOT
exit
~~~

## 5.8.3. Bật publication và commit canonical lên S3

~~~bash
sudoedit /etc/vn-it-job-market.env
~~~

~~~ini
PIPELINE_BUCKET=vn-it-job-market-data-381924757765-ap-southeast-1-an
PIPELINE_PARQUET_KEY=analytics/itviec/current_jobs.parquet
PIPELINE_PUBLISH=true
~~~

~~~bash
sudo systemctl start --no-block vnjob-pipeline.service
sudo journalctl -u vnjob-pipeline.service -n 120 --no-pager -o cat
~~~

~~~bash
sudo -u vnjob .venv/bin/python -c 'import boto3,json; d=boto3.client("s3",region_name="ap-southeast-1").head_object(Bucket="vn-it-job-market-data-381924757765-ap-southeast-1-an",Key="analytics/itviec/current_jobs.parquet"); print(json.dumps({k:d.get(k) for k in ("ETag","LastModified","Metadata")},default=str,indent=2))'
~~~

## 5.9.1. Kết nối nguồn dữ liệu và khởi chạy ứng dụng

~~~bash
sudo systemctl restart vnjob-dashboard.service
sudo systemctl status vnjob-dashboard.service --no-pager
curl --fail http://127.0.0.1:8501/_stcore/health
sudo journalctl -u vnjob-dashboard.service -n 80 --no-pager
~~~

## 5.10.1. Cấu hình authentication và tạo ADMIN ban đầu

~~~toml
[auth]
allow_registration = true
operations_enabled = false
backend = "s3"
s3_bucket = "vn-it-job-market-data-381924757765-ap-southeast-1-an"
s3_prefix = "users/"
email_enabled = false
email_sender = ""
email_region = "ap-southeast-1"
~~~

~~~powershell
Set-Location E:\vn-it-job-market
.\.venv\Scripts\python.exe dashboard/bootstrap_admin.py
~~~

## 5.10.4. Kích hoạt xóa mềm, khôi phục và projection

~~~bash
sudo systemctl status vnjob-projection.timer --no-pager
sudo journalctl -u vnjob-projection.service -n 80 --no-pager
~~~

## 5.11.2. Cài Certbot và cấu hình HTTPS tự động

~~~bash
sudo python3 -m venv /opt/vnjob-certbot
sudo /opt/vnjob-certbot/bin/pip install "certbot>=5.4,<7"
sudo /opt/vnjob-certbot/bin/certbot --version
sudo install -d -m 0755 /var/www/letsencrypt/.well-known/acme-challenge
~~~

~~~bash
cd /opt/vn-it-job-market
sudo bash deploy/ec2/configure_public_https.sh
sudo nginx -t
sudo /opt/vnjob-certbot/bin/certbot certificates
sudo systemctl list-timers vnjob-certbot.timer --no-pager
~~~

## 5.11.3. Kiểm tra HTTP, HTTPS và WebSocket

~~~powershell
curl.exe -I http://<PUBLIC_IPV4_HIEN_TAI>/
curl.exe --fail https://<PUBLIC_IPV4_HIEN_TAI>/_stcore/health
~~~

## 5.12.1. Bật lịch 02:00 và kiểm timer

~~~bash
systemctl cat vnjob-pipeline.service vnjob-pipeline.timer
sudo systemctl enable --now vnjob-pipeline.timer
systemctl list-timers vnjob-pipeline.timer vnjob-projection.timer --no-pager
sudo systemctl status vnjob-pipeline.timer vnjob-pipeline.service --no-pager
~~~

## 5.12.2. Cài Operations Worker và bật quyền UI

~~~bash
cd /opt/vn-it-job-market
sudo bash deploy/ec2/install_recovery.sh
systemctl status vnjob-operations.timer --no-pager
sudo journalctl -u vnjob-operations.service -n 80 --no-pager
~~~

## 5.12.3. Kiểm chạy bù và trạng thái cuối

~~~bash
sudo journalctl -u vnjob-pipeline.service -n 120 --no-pager
systemctl show vnjob-pipeline.service -p ActiveState -p SubState -p ExecMainStartTimestamp -p ExecMainExitTimestamp -p Result
~~~

## 5.13.2. Cài agent, exporter và xác minh log

~~~bash
cd /opt/vn-it-job-market
sudo bash deploy/ec2/install_monitoring.sh
systemctl status amazon-cloudwatch-agent vnjob-log-export --no-pager
systemctl cat vnjob-log-export.service
~~~

## 5.13.3. Theo dõi ứng dụng và xử lý sự cố

~~~bash
sudo systemctl status vnjob-dashboard vnjob-pipeline vnjob-pipeline.timer --no-pager
sudo journalctl -u vnjob-pipeline.service -n 120 --no-pager
df -h /opt/vn-it-job-market
free -m
~~~

## 5.14.1. Chạy kiểm thử source trước phát hành

~~~bash
export AWS_EC2_METADATA_DISABLED=true PYTHONDONTWRITEBYTECODE=1
.venv/bin/python -m unittest discover -s tests -p "test_*.py"
.venv/bin/python tests/ui_registration_smoke.py
.venv/bin/python tests/ui_moderation_smoke.py
.venv/bin/python tests/ui_vietnamese_smoke.py
.venv/bin/python tests/ui_performance_safety.py
.venv/bin/python tests/ui_account_improvements.py
.venv/bin/python tests/ui_data_quality_smoke.py
node tests/test_clock.cjs
~~~

## 5.15.1. Tạo backup và verify-restore

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python deploy/ec2/backup_data.py backup /duong-dan-rieng/backup-moi.zip
sudo -u vnjob .venv/bin/python deploy/ec2/backup_data.py verify-restore /duong-dan-rieng/backup-moi.zip --destination /duong-dan-rieng/restore-thu-moi
~~~
