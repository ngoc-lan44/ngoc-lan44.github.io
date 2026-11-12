---
title: "Quản trị, DynamoDB và Projection Worker"
date: 2026-11-08
weight: 7
chapter: false
pre: " <b> 5.7. </b> "
aliases:
  - "/5-workshop/5.10-administration/"
  - "/5-workshop/5.10-administration/5.10.1-step1/"
  - "/5-workshop/5.10-administration/5.10.2-step2/"
  - "/5-workshop/5.10-administration/5.10.3-step3/"
  - "/5-workshop/5.10-administration/5.10.4-step4/"
  - "/5-workshop/5.10-administration/5.10.5-step5/"
  - "/5-workshop/5.10-administration/5.10.6-step6/"
  - "/5-workshop/5.10-administration/5.10.7-step7/"
  - "/5-workshop/5.10-administration/5.10.8-step8/"
  - "/4-workshop/4.9-user-administration/4.9.3-step3/"
  - "/4-workshop/4.9-user-administration/4.9.4-step4/"
  - "/4-workshop/4.9-user-administration/4.9.5-step5/"
---

**Mục tiêu thực hành:** Theo dấu quản lý tài khoản và Delete/Restore từ giao diện đến DynamoDB, snapshot và Athena.

Quản trị viên quản lý tài khoản và kiểm duyệt tin tuyển dụng. Moderation lưu riêng với dữ liệu tuyển dụng nguồn để hỗ trợ xóa mềm, khôi phục và audit.

**Giao diện:** đăng nhập ADMIN → các trang quản trị.

**Console:** DynamoDB → Tables, region ap-southeast-1.

### Trước khi bắt đầu

**Đầu vào:** ADMIN hợp lệ, USER thử và một job_id đủ điều kiện để kiểm duyệt theo kế hoạch.

**Đầu ra:** Liên kết được thao tác ADMIN với state/audit DynamoDB, snapshot S3 và kết quả công khai.

### Các bài thực hành

- [5.7.1. Quản lý người dùng](5.7.1-step1/)
- [5.7.2. DynamoDB moderation và audit](5.7.2-step2/)
- [5.7.3. Xóa mềm, khôi phục và đồng bộ snapshot](5.7.3-step3/)
- [5.7.4. Theo dấu một thao tác kiểm duyệt](5.7.4-step4/)
- [5.7.5. Phân biệt lỗi state và lỗi projection](5.7.5-step5/)

### Kết quả mong đợi

Tin bị xóa mềm được ẩn, audit ghi đúng thao tác và snapshot hội tụ để Athena lọc. App còn kiểm DynamoDB trực tiếp. Nếu state đã commit nhưng S3 lỗi, thử lại projection thay vì lặp Delete. Transaction state/audit không bao trùm S3/Athena; DynamoDB không lưu toàn bộ kho tin hoặc tài khoản.

### Checklist

- [ ] ADMIN có 10 trang, gồm sáu trang quản trị.
- [ ] Khóa/mở USER và kiểm quyền hoạt động đúng.
- [ ] Delete/Restore, audit và projection cùng job_id/revision.


### Source đối chiếu

- `dashboard/personal_pages.py`
- `dashboard/auth.py`
- `dashboard/user_storage.py`
- `dashboard/account_security.py`
- `dashboard/job_management.py`
- `dashboard/job_admin_service.py`

---

[← 5.6](../5.6-User-Features/) · [Mục lục](../) · [5.8 →](../5.8-EC2-HTTPS/)
