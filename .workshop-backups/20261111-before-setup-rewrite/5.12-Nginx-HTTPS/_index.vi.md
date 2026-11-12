---
title: "Cấu hình Nginx và HTTPS theo IP"
date: 2026-11-11T00:00:00+07:00
weight: 12
chapter: false
pre: " <b> 5.12. </b> "
---

**Mục tiêu:** Kiểm reverse proxy, chứng chỉ, timer tự động và truy cập bên ngoài.

**Thành phần thực hành:** Proxy, certificate và timer HTTPS.

**Môi trường:** EC2 qua SSM hoặc máy quản trị theo chỉ dẫn trong từng bước.

### Trước khi bắt đầu

Hoàn thành kiểm tra tài nguyên/runtime ở 5.2. Sử dụng cùng run_id, job_id hoặc source version khi đối chiếu; với hệ thống đang phục vụ, xem service/timer trước thao tác thay đổi.

### Các bước thực hiện

- [5.12.1. Nginx và HTTPS](5.12.1-step1/)
- [5.12.2. Kiểm tra truy cập](5.12.2-step2/)
- [5.12.3. Kiểm tra reverse proxy và xử lý lỗi HTTPS](5.12.3-step3/)

### Kết quả mong đợi

Kiểm reverse proxy, chứng chỉ, timer tự động và truy cập bên ngoài. Kết quả thực tế được ghi theo từng bài con và bằng chứng của phiên thực hành, không điền sẵn PASS.


---

[← 5.11. Triển khai hệ thống trên Amazon EC2](../5.11-EC2-Deployment/) · [Mục lục Workshop](../) · [5.13. Tự động hóa pipeline và Operations Worker →](../5.13-Pipeline-Automation/)
