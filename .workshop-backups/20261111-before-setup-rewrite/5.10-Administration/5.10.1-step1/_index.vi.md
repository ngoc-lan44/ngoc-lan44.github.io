---
title: "Quản lý người dùng"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.10.1. </b> "
aliases:
  - "/5-workshop/5.7-administration/5.7.1-step1/"
---

**Mục tiêu:** Quản lý người dùng.

**Bối cảnh:** Quản lý tài khoản, xóa mềm/khôi phục và đối chiếu projection/audit.

### Các bước thực hiện

ADMIN có tổng 10 trang, trong đó sáu trang quản trị: **Trạng thái hệ thống, Quản lý người dùng, Quản lý việc làm, Việc làm đã xóa, Chất lượng dữ liệu, Trạng thái thu thập dữ liệu**.

Mở **Quản lý người dùng**, chọn USER thử và thực hiện khóa, kiểm phiên USER bị từ chối; mở khóa rồi đăng nhập lại. Kiểm thu hồi phiên bằng phiên cũ. Việc khóa không xóa hồ sơ hoặc lịch sử cá nhân.


> 📸 **[CẦN THÊM ẢNH 5.10-01]**
>
> Ảnh menu ADMIN và Quản lý người dùng, thể hiện khóa/mở hoặc thu hồi phiên của USER thử.
>
> File: `5-10-01.png`

### Kết quả mong đợi

Khóa/mở và thu hồi phiên được xác minh bằng phiên USER thử.

### Source đối chiếu

- `dashboard/personal_pages.py`
- `dashboard/account_security.py`
- `dashboard/auth.py`
- `dashboard/user_storage.py`

---

[← 5.10. Quản trị và kiểm duyệt bằng DynamoDB](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.10.2-step2/)
