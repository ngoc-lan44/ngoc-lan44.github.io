---
title: "Kiểm tra cấu trúc bucket và phân tách dữ liệu"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.5.1. </b> "
---

**Mục tiêu:** Kiểm tra cấu trúc bucket và phân tách dữ liệu.

**Bối cảnh:** Tổ chức đúng prefix và kiểm publication canonical theo run.

### Các bước thực hiện

Mở **S3 → Buckets → vn-it-job-market-data-381924757765-ap-southeast-1-an → Objects**. Đối chiếu các nhóm dữ liệu trước khi đọc hoặc công bố file:

| Prefix/key | Vai trò |
| --- | --- |
| analytics/itviec/current_jobs.parquet | Parquet canonical mà bảng nguồn Athena đọc |
| pipeline-runs/&lt;run_id&gt;/ | Artifact và kết quả theo lượt; không nằm chung prefix phân tích |
| users/accounts.json | Tài khoản ứng dụng |
| users/activity/ | Hoạt động cá nhân, mỗi người dùng có object riêng |
| control/moderation/job_moderation.json | Snapshot moderation phục vụ Athena |
| control/athena-results/ | Kết quả truy vấn Athena |

1. Mở analytics/itviec/, kiểm có đúng một file Parquet canonical.
2. Mở pipeline-runs/, chọn artifact của cùng run dùng trong bài ETL.
3. Xác định result location và snapshot moderation; không đưa chúng vào location bảng việc làm.
4. Không mở công khai hoặc chụp nội dung tài khoản/mật khẩu trong users/.

JSON raw/current/history/clean được xử lý trên EC2. S3 không thay vai trò thư mục runtime; file Parquet tạm của bài thực hành không tự trở thành dữ liệu dashboard.

### Kết quả mong đợi

Phân biệt được canonical, artifact, dữ liệu cá nhân và control; location phân tích không chứa bản Parquet trùng.

### Source đối chiếu

- `deploy/ec2/run_pipeline.py`
- `deploy/ec2/pipeline_state.py`
- `deploy/ec2/runtime.env.example`
- `dashboard/s3_store.py`

---

[← 5.5. Lưu trữ và công bố dữ liệu trên Amazon S3](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.5.2-step2/)
