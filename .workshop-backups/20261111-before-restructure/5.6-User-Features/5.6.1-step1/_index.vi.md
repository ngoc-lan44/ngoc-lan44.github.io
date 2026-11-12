---
title: "Đăng ký, đăng nhập và phân quyền"
date: 2026-11-10
weight: 1
chapter: false
pre: " <b> 5.6.1. </b> "
---

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

**Kiểm tra sau bước này:** Đăng ký chỉ tạo USER; menu và chức năng đúng vai trò.

> 📸 **[CẦN THÊM ẢNH 5.6-01]**
>
> Ảnh form đăng ký/đăng nhập và menu USER; để trống hoặc che mật khẩu và email thử.
>
> File: `5-6-01.png`

---

[← 5.6](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.6.2-step2/)
