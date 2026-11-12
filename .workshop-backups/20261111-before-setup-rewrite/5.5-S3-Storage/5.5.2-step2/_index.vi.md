---
title: "Lưu trữ và công bố Parquet trên S3"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.5.2. </b> "
aliases:
  - "/5-workshop/5.4-s3-glue-athena/5.4.1-step1/"
---

**Mục tiêu:** Lưu trữ và công bố Parquet trên S3.

**Bối cảnh:** Tổ chức đúng prefix và kiểm publication canonical theo run.

### Các bước thực hiện

Mở **S3 → bucket dự án**, kiểm các prefix:

| Vị trí | Nội dung |
| --- | --- |
| analytics/itviec/current_jobs.parquet | Parquet canonical cho Athena |
| pipeline-runs/&lt;run_id&gt;/ | Artifact theo run, tách khỏi prefix phân tích |
| users/ | Tài khoản và hoạt động cá nhân |
| control/moderation/job_moderation.json | Snapshot moderation |
| control/athena-results/ | Kết quả Athena |

Runner xử lý trong staging, lưu artifact/journal rồi thay canonical bằng S3 IfMatch theo ETag và promote local. Trước publication, kiểm seed, role và canonical hiện hữu; cấu hình /etc/vn-it-job-market.env:

~~~ini
PIPELINE_BUCKET=vn-it-job-market-data-381924757765-ap-southeast-1-an
PIPELINE_PARQUET_KEY=analytics/itviec/current_jobs.parquet
PIPELINE_PUBLISH=true
~~~

Chạy pipeline theo kế hoạch bằng `sudo systemctl start vnjob-pipeline.service`. Đối chiếu status SUCCEEDED/published=true với metadata run-id/sha256; object tồn tại riêng lẻ chưa đủ xác nhận lượt mới.

~~~bash
aws s3api head-object --bucket vn-it-job-market-data-381924757765-ap-southeast-1-an --key analytics/itviec/current_jobs.parquet --region ap-southeast-1
~~~


> 📸 **[CẦN THÊM ẢNH 5.5-01]**
>
> Ảnh S3: canonical Parquet và Properties/Metadata hiển thị run-id, sha256, Last modified.
>
> File: `5-5-01.png`


Prefix phân tích chỉ có một Parquet canonical. Khi lỗi CAS giữ journal/artifact để phục hồi; không ghi đè cưỡng bức. PIPELINE_PUBLISH=false vẫn xử lý/commit local. Không có transaction nguyên tử xuyên EC2/S3.

### Kết quả mong đợi

Metadata canonical khớp run-id/sha256 và trạng thái publication.

### Source đối chiếu

- `deploy/ec2/run_pipeline.py`
- `deploy/ec2/pipeline_state.py`
- `deploy/ec2/runtime.env.example`
- `dashboard/s3_store.py`

---

[← 5.5. Lưu trữ và công bố dữ liệu trên Amazon S3](../) · [Mục lục Workshop](../../) · [Bước trước](../5.5.1-step1/)
