---
title: "Dữ liệu Parquet và dữ liệu nền triển khai EC2"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.3.2. </b> "
---

### Dữ liệu phân tích trên S3

File **analytics/itviec/current_jobs.parquet** cung cấp dữ liệu cho Athena và dashboard. Pipeline cập nhật đúng object này sau khi hoàn tất xử lý và kiểm tra dữ liệu. Việc giữ một file Parquet tại đường dẫn phân tích tránh để Athena đọc đồng thời nhiều bản sao của cùng tập dữ liệu.

### Dữ liệu nền khi triển khai EC2

File **current_jobs.json** trong **deploy/ec2/seed/** dùng để khởi tạo dữ liệu việc làm hiện tại trên máy chủ khi triển khai, giữ lại các mốc **first_seen** và **last_seen** đã có. Nhờ đó, hệ thống tiếp tục theo dõi việc làm từ dữ liệu trước đó thay vì bắt đầu lại toàn bộ lịch sử theo dõi.

Bản seed được lưu trong thư mục mang mã SHA-256 của nội dung file. Mã này dùng để đối chiếu tính toàn vẹn sau khi tải xuống EC2, giúp phát hiện file bị thay đổi hoặc tải sai bản. File seed phục vụ khởi tạo; dữ liệu current trên EC2 tiếp tục được pipeline cập nhật trong quá trình vận hành.

### Vị trí lưu dữ liệu seed

**1. Thư mục deploy/ec2/** chứa các gói và dữ liệu phục vụ triển khai, trong đó có thư mục **seed/**.

![Thư mục deploy/ec2 chứa thư mục seed trên S3](/images/workshop/setup-5-3-ec2-folders.png)

**2. Thư mục seed/** chứa thư mục con được đặt tên theo mã SHA-256 để phân biệt bản dữ liệu nền.

![Thư mục con lưu bản dữ liệu nền trong seed](/images/workshop/setup-5-3-seed-folder.png)

**3. Bên trong thư mục mã SHA-256** là file **current_jobs.json** phục vụ khởi tạo dữ liệu trên EC2.

![File current_jobs.json được lưu trong thư mục seed phục vụ triển khai EC2](/images/workshop/setup-5-3-02.png)


---

[← 5.3. Thiết lập lưu trữ trên Amazon S3](../) · [Mục lục Workshop](../../) · [Bước trước](../5.3.1-step1/)
