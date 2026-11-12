---
title: "Chuẩn bị tài khoản AWS, Region và công cụ"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.2.1. </b> "
aliases:
  - "/5-workshop/5.2-prerequisites/5.2.4-step4/"
  - "/5-workshop/5.1-overview/5.1.2-step2/"
  - "/5-workshop/5.1-overview/5.1.5-step5/"
---

**Thực hiện tại:** Máy quản trị Windows và AWS Console

### Mục tiêu

Sẵn sàng thao tác đúng tài khoản và source của dự án.

### Điều kiện đầu vào

Source E:\vn-it-job-market và môi trường .venv của project.

### Các bước thực hiện

1. Đăng nhập AWS bằng phương thức đã cấu hình trên máy quản trị.
2. Chọn **Singapore** trong Console.

![AWS Console của tài khoản dự án với Region Asia Pacific Singapore](/images/workshop/setup-5-2-console.png)

3. Mở PowerShell tại thư mục project và kiểm credential/runtime:

~~~powershell
Set-Location E:\vn-it-job-market
aws sts get-caller-identity --region ap-southeast-1 --no-cli-pager
.\.venv\Scripts\python.exe --version
.\.venv\Scripts\python.exe -m pip check
~~~

![PowerShell tại E vn-it-job-market: AWS identity đúng account, Python 3.14.2 và pip check hợp lệ](/images/workshop/setup-5-2-01.png)

Máy quản trị Windows được dùng để đóng gói source và quản lý AWS. Trên EC2, script triển khai tạo môi trường Python riêng và cài thư viện từ `requirements.txt`.

### Kiểm tra kết quả

Kết quả kiểm tra xác nhận máy quản trị kết nối đến tài khoản AWS `381924757765`, sử dụng Python **3.14.2**. Lệnh `pip check` trả về **No broken requirements found.**, cho thấy không phát hiện xung đột dependency trong môi trường hiện tại.



---

[← 5.2. Các bước chuẩn bị](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.2.2-step2/)
