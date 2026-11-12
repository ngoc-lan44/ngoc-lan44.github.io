---
title: "Đăng ký, đăng nhập và phân quyền"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.9.1. </b> "
aliases:
  - "/5-workshop/5.6-user-features/5.6.1-step1/"
---

**Mục tiêu:** Đăng ký, đăng nhập và phân quyền.

**Bối cảnh:** Thực hành đăng nhập, lưu việc làm, ứng tuyển, hồ sơ và kiểm tách dữ liệu.

### Các bước thực hiện

1. Mở **Đăng nhập → Đăng ký** ở sidebar.
2. Nhập email thử, mật khẩu/xác nhận và tên hiển thị tùy chọn.
3. Tạo tài khoản; kiểm role USER.
4. Đăng xuất rồi đăng nhập lại, kiểm email trùng và quyền truy cập.

| Vai trò | Phạm vi |
| --- | --- |
| Guest | Tổng quan thị trường công khai |
| USER | Public và ba trang cá nhân |
| ADMIN | Bốn trang trên và sáu trang quản trị, tổng 10 |

Mật khẩu dùng PBKDF2-HMAC-SHA256, salt và 600.000 vòng. Quyền được kiểm phía server; tài khoản website không phải IAM User.


> 📸 **[CẦN THÊM ẢNH 5.9-01]**
>
> Ảnh form đăng ký/đăng nhập và menu USER; để trống hoặc che mật khẩu và email thử.
>
> File: `5-9-01.png`

### Kết quả mong đợi

Đăng ký chỉ tạo USER; menu và chức năng đúng vai trò.

### Source đối chiếu

- `dashboard/auth.py`
- `dashboard/registration.py`
- `dashboard/personal_pages.py`
- `dashboard/personal_service.py`
- `dashboard/user_storage.py`
- `dashboard/account_security.py`
- `dashboard/account_security_ui.py`
- `dashboard/passwords.py`

---

[← 5.9. Tài khoản và chức năng người dùng](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.9.2-step2/)
