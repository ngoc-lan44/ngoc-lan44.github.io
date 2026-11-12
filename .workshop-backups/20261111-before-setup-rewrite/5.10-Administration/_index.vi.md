---
title: "Quản trị và kiểm duyệt bằng DynamoDB"
date: 2026-11-11T00:00:00+07:00
weight: 10
chapter: false
pre: " <b> 5.10. </b> "
aliases:
  - "/5-workshop/5.7-administration/"
  - "/5-workshop/5.10-administration/5.10.6-step6/"
  - "/5-workshop/5.10-administration/5.10.7-step7/"
  - "/5-workshop/5.10-administration/5.10.8-step8/"
  - "/4-workshop/4.9-user-administration/4.9.3-step3/"
  - "/4-workshop/4.9-user-administration/4.9.4-step4/"
  - "/4-workshop/4.9-user-administration/4.9.5-step5/"
---

**Mục tiêu:** Quản lý tài khoản, xóa mềm/khôi phục và đối chiếu projection/audit.

**Thành phần thực hành:** ADMIN, DynamoDB và projection.

**Môi trường:** website HTTPS; AWS Console/SSM dùng cho bước đối chiếu.

### Trước khi bắt đầu

Hoàn thành kiểm tra tài nguyên/runtime ở 5.2. Sử dụng cùng run_id, job_id hoặc source version khi đối chiếu; với hệ thống đang phục vụ, xem service/timer trước thao tác thay đổi.

### Các bước thực hiện

- [5.10.1. Quản lý người dùng](5.10.1-step1/)
- [5.10.2. DynamoDB moderation và audit](5.10.2-step2/)
- [5.10.3. Xóa mềm, khôi phục và đồng bộ snapshot](5.10.3-step3/)
- [5.10.4. Theo dấu một thao tác kiểm duyệt](5.10.4-step4/)
- [5.10.5. Phân biệt lỗi state và lỗi projection](5.10.5-step5/)

### Kết quả mong đợi

Quản lý tài khoản, xóa mềm/khôi phục và đối chiếu projection/audit. Kết quả thực tế được ghi theo từng bài con và bằng chứng của phiên thực hành, không điền sẵn PASS.


---

[← 5.9. Tài khoản và chức năng người dùng](../5.9-User-Features/) · [Mục lục Workshop](../) · [5.11. Triển khai hệ thống trên Amazon EC2 →](../5.11-EC2-Deployment/)
