---
title: "Lưu trữ và công bố Parquet trên S3"
date: 2026-11-10
weight: 1
chapter: false
pre: " <b> 5.4.1. </b> "
---

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

**Kiểm tra sau bước này:** Metadata canonical khớp run-id/sha256 và trạng thái publication.

> 📸 **[CẦN THÊM ẢNH 5.4-01]**
>
> Ảnh S3: canonical Parquet và Properties/Metadata hiển thị run-id, sha256, Last modified.
>
> File: `5-4-01.png`


Prefix phân tích chỉ có một Parquet canonical. Khi lỗi CAS giữ journal/artifact để phục hồi; không ghi đè cưỡng bức. PIPELINE_PUBLISH=false vẫn xử lý/commit local. Không có transaction nguyên tử xuyên EC2/S3.

---

[← 5.4](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.4.2-step2/)
