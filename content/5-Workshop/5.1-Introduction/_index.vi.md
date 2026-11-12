---
title: "Giới thiệu"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.1. </b> "
aliases:
  - "/5-workshop/5.1-overview/"
  - "/5-workshop/5.1-overview/5.1.1-step1/"
  - "/4-workshop/4.1-workshop-overview/"
  - "/4-workshop/4.2-prerequisites/"
---

Vietnam IT Job Market thu thập tin tuyển dụng CNTT từ **ITviec**, xử lý bằng Python, lưu Parquet trên S3 và phân tích bằng Athena/Streamlit. Workshop trình bày quy trình thiết lập các thành phần và đưa hệ thống vào vận hành trên AWS.

### Kiến trúc hệ thống

![Kiến trúc Vietnam IT Job Market](/images/vietnam-it-job-market-selected-architecture.png)

Một EC2 chạy collector, ETL, dashboard, Nginx và các worker. JSON raw/current/history/clean nằm trên EC2; Parquet phân tích và dữ liệu cá nhân nằm trên S3. Glue Data Catalog cung cấp metadata; DynamoDB lưu moderation/audit, Projection Worker xuất snapshot để Athena lọc. systemd quản lý lịch, CloudWatch nhận log và cảnh báo lỗi.

### Mục tiêu

- Thiết lập tài nguyên dữ liệu, metadata, quyền và cấu hình ứng dụng.
- Đóng gói source, triển khai EC2, đưa dữ liệu nền vào runtime.
- Chạy quy trình thu thập, ETL và publication; kết nối dashboard.
- Thiết lập USER/ADMIN, HTTPS, timer, worker và giám sát.
- Kiểm thử và đối chiếu kết quả với ảnh/log thực tế.

### Phạm vi triển khai

Hệ thống triển khai trong tài khoản **381924757765**, tại **Singapore (ap-southeast-1)**. S3, Glue Data Catalog và DynamoDB được chuẩn bị trước khi triển khai EC2. Một máy EC2 chạy pipeline, dashboard và các worker; Nginx cung cấp truy cập web qua HTTPS.

Dữ liệu phản ánh ITviec tiếp cận được, không đại diện toàn bộ thị trường. Theo dõi ứng tuyển do USER cập nhật, không tự nộp CV.

### Trình tự triển khai

Chuẩn bị → S3 → Catalog/Athena → DynamoDB → EC2 → thu thập → ETL/publication → dashboard → tài khoản/quản trị → HTTPS → lịch/worker → CloudWatch → nghiệm thu/backup.

---

[Mục lục](../) · [5.2 →](../5.2-Prerequisites/)
