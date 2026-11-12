---
title: "Công bố dữ liệu Parquet lên S3"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.8.3. </b> "
aliases:
  - "/5-workshop/5.5-s3-storage/5.5.2-step2/"
  - "/5-workshop/5.4-s3-glue-athena/5.4.1-step1/"
---

**Thực hiện tại:** SSM trên EC2

### Mục tiêu

Công bố dữ liệu đã kiểm qua cơ chế staging/journal/CAS.

### Điều kiện đầu vào

Seed current hợp lệ, canonical S3 hiện hữu và đúng một Parquet; IAM và ETL đã kiểm.

### Các bước thực hiện

Mở env:

~~~bash
sudoedit /etc/vn-it-job-market.env
~~~

Đặt đúng các biến:

~~~ini
PIPELINE_BUCKET=vn-it-job-market-data-381924757765-ap-southeast-1-an
PIPELINE_PARQUET_KEY=analytics/itviec/current_jobs.parquet
PIPELINE_PUBLISH=true
~~~

Chạy service khi lượt trước đã kết thúc:

~~~bash
sudo systemctl start --no-block vnjob-pipeline.service
sudo journalctl -u vnjob-pipeline.service -n 120 --no-pager -o cat
~~~

Runner xử lý/reuse discovery trong điều kiện của source, kiểm toàn lượt, ghi artifact ngoài analytics, chuẩn bị journal/backup rồi cập nhật canonical bằng IfMatch ETag và promote local. Nếu cùng ngày Việt Nam/cùng chế độ đã có SUCCEEDED, runner ghi SKIPPED; không xóa marker để ép chạy.

Kiểm status.json của run và metadata S3:

~~~bash
sudo -u vnjob .venv/bin/python -c 'import boto3,json; d=boto3.client("s3",region_name="ap-southeast-1").head_object(Bucket="vn-it-job-market-data-381924757765-ap-southeast-1-an",Key="analytics/itviec/current_jobs.parquet"); print(json.dumps({k:d.get(k) for k in ("ETag","LastModified","Metadata")},default=str,indent=2))'
~~~

status SUCCEEDED/published=true phải khớp metadata run-id/sha256. ETag dùng kiểm điều kiện ghi, không mặc định là SHA256. PIPELINE_PUBLISH=false vẫn có thể xử lý/commit local, không phải chế độ không ghi.

### Kiểm tra kết quả

Canonical, artifact và local state truy vết được cùng run; lỗi giữ journal để recover, không ghi đè cưỡng bức.

### Truy vết dữ liệu đã công bố

Metadata **run-id** liên kết file Parquet trên S3 với lượt pipeline tạo ra nó. Trường **sha256** lưu mã kiểm tra nội dung để phục vụ đối chiếu tính toàn vẹn. Run-id của object trong ảnh khớp lượt pipeline đã ghi nhận thành công ở mục 5.7.3.

![Metadata file Parquet trên S3 với run-id khớp lượt pipeline và trường sha256](/images/workshop/setup-5-8-03.png)


---

[← 5.8. Thiết lập ETL và công bố Parquet](../) · [Mục lục Workshop](../../) · [Bước trước](../5.8.2-step2/)
