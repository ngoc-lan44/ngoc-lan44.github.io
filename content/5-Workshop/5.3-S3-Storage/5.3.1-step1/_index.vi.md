---
title: "Bucket và cấu trúc lưu trữ S3"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.3.1. </b> "
aliases:
  - "/5-workshop/5.5-s3-storage/5.5.1-step1/"
---

### Cấu hình đã sử dụng

Bucket sử dụng: **vn-it-job-market-data-381924757765-ap-southeast-1-an**, Region **ap-southeast-1**.

![Danh sách bucket S3 của dự án tại Region Singapore (ap-southeast-1)](/images/workshop/setup-5-3-bucket-region.png)

| Đường dẫn trong bucket | Dữ liệu lưu trữ |
| --- | --- |
| analytics/itviec/current_jobs.parquet | Dữ liệu việc làm dạng Parquet dùng cho Athena |
| pipeline-runs/&#60;run_id&#62;/ | Các file kết quả của từng lần chạy pipeline |
| users/ | Tài khoản và hoạt động cá nhân |
| control/moderation/job_moderation.json | Bản tổng hợp trạng thái kiểm duyệt việc làm |
| control/athena-results/ | Kết quả Athena |
| deploy/ec2/ | Các file phục vụ triển khai EC2 |

Tab **Objects** hiển thị các thư mục: `analytics/`, `clean/`, `control/`, `current/`, `deploy/`, `history/`, `pipeline-runs/`, `raw/` và `users/`.

![Các thư mục hiện có trong bucket S3 của dự án](/images/workshop/setup-5-3-bucket-objects.png)

Thư mục **analytics/itviec/** tập trung dữ liệu việc làm đã xử lý để phục vụ phân tích, tách khỏi dữ liệu tài khoản, nhật ký pipeline và cấu hình vận hành. Glue Data Catalog trỏ đến thư mục này để Athena xác định nơi đọc dữ liệu.

![Thư mục itviec bên trong analytics trên Amazon S3](/images/workshop/setup-5-3-analytics-folder.png)

File **current_jobs.parquet** lưu tập dữ liệu việc làm hiện tại sau khi được làm sạch và chuẩn hóa. Định dạng Parquet lưu dữ liệu theo cột và có nén, giúp Athena đọc các cột cần thiết cho truy vấn. Dashboard sử dụng kết quả truy vấn để hiển thị KPI, biểu đồ và danh sách việc làm.

![File current_jobs.parquet trong analytics/itviec trên Amazon S3](/images/workshop/setup-5-3-current-parquet.png)

### Quyền truy cập bucket

**Block Public Access** ngăn dữ liệu trong bucket bị công khai, bảo vệ các file việc làm, tài khoản và hoạt động cá nhân khỏi truy cập công cộng. EC2 vẫn đọc và ghi dữ liệu bằng IAM Role được cấp quyền. Người dùng sử dụng dữ liệu thông qua dashboard thay vì truy cập trực tiếp bucket. Dự án bật **Block all public access (On)** để áp dụng cơ chế bảo vệ này.

![Block all public access được bật cho bucket của dự án](/images/workshop/setup-5-3-public-access.png)

### Mã hóa dữ liệu lưu trữ

Cấu hình mã hóa mặc định của bucket sử dụng **SSE-S3** cho các object được ghi mới, giúp bảo vệ dữ liệu khi lưu trữ. Amazon S3 quản lý khóa, mã hóa khi ghi và giải mã khi ứng dụng có quyền đọc dữ liệu; ứng dụng không cần tự quản lý khóa mã hóa. Cấu hình này bảo vệ dữ liệu lưu trữ, còn quyền truy cập được kiểm soát bằng IAM và Block Public Access.

![Cấu hình mã hóa mặc định SSE-S3 của bucket dự án](/images/workshop/setup-5-3-encryption.png)


---

[← 5.3. Thiết lập lưu trữ trên Amazon S3](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.3.2-step2/)
