---
title: "Cài runtime và cấu hình ứng dụng trên EC2"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.6.2. </b> "
aliases:
  - "/5-workshop/5.11-ec2-deployment/5.11.2-step2/"
  - "/5-workshop/5.8-ec2-https/5.8.2-step2/"
---

### Cài đặt môi trường trên EC2

User Data tải source từ S3 và gọi script cài đặt để chuẩn bị tài khoản dịch vụ, môi trường Python, các unit systemd và Nginx. Các ảnh dưới đây ghi nhận quá trình cài đặt và cấu hình của máy chủ đã triển khai.

### Khởi tạo máy chủ

**cloud-init** thực hiện cấu hình khởi tạo EC2 từ User Data, trong đó có bước chuẩn bị và cài đặt ứng dụng. Kiểm tra trạng thái giúp xác định tiến trình khởi tạo đã kết thúc và xem lỗi được cloud-init ghi nhận.

![Trạng thái cloud-init done với errors và recoverable_errors rỗng trên EC2](/images/workshop/setup-5-6-cloud-init.png)

### Cài đặt môi trường dịch vụ

Quá trình bootstrap cài thư viện Python, kiểm tra cấu hình Nginx và thiết lập dịch vụ dashboard. Ở giai đoạn cài đặt ban đầu, lịch pipeline và công bố dữ liệu được giữ tắt để hoàn tất chuẩn bị dữ liệu và cấu hình trước khi vận hành tự động.

![Log bootstrap cài thư viện, kiểm tra Nginx và thiết lập dịch vụ dashboard trên EC2](/images/workshop/setup-5-6-05.png)

### Kiểm tra môi trường Python

Môi trường **.venv** cung cấp Python và thư viện dùng chung cho dashboard, pipeline và các worker. Lệnh **pip check** kiểm tra các yêu cầu phụ thuộc giữa những gói đã cài, giúp phát hiện thư viện bị thiếu hoặc phiên bản không tương thích.

![Phiên bản Python và kết quả pip check trong môi trường Python trên EC2](/images/workshop/setup-5-6-python-dependencies.png)

### Bảo vệ file cấu hình

Hai file cấu hình thuộc **root:vnjob** và có quyền **640**: root được đọc và sửa, nhóm vnjob được đọc, các tài khoản khác không có quyền truy cập. Cách phân quyền này cho phép dịch vụ sử dụng cấu hình nhưng không tự thay đổi cấu hình vận hành.

![Quyền truy cập hai file cấu hình ứng dụng trên EC2](/images/workshop/setup-5-6-config-permissions.png)


---

[← 5.6. Triển khai mã nguồn và môi trường chạy trên EC2](../) · [Mục lục Workshop](../../) · [Bước trước](../5.6.1-step1/) · [Bước tiếp →](../5.6.3-step3/)
