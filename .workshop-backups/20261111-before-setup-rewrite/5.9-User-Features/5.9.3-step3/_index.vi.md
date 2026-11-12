---
title: "Hồ sơ và đổi mật khẩu"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.9.3. </b> "
aliases:
  - "/5-workshop/5.6-user-features/5.6.3-step3/"
---

**Mục tiêu:** Hồ sơ và đổi mật khẩu.

**Bối cảnh:** Thực hành đăng nhập, lưu việc làm, ứng tuyển, hồ sơ và kiểm tách dữ liệu.

### Các bước thực hiện

Trong **Hồ sơ cá nhân**, sửa tên hiển thị/giới thiệu rồi lưu. Role và user_id không được thay đổi qua form. Mở **Đổi mật khẩu**, tự nhập mật khẩu hiện tại, mật khẩu mới và xác nhận; sau thành công kiểm yêu cầu đăng nhập lại.


> 📸 **[CẦN THÊM ẢNH 5.9-03]**
>
> Ảnh Hồ sơ cá nhân và phần Đổi mật khẩu ở trạng thái trống/đã che, kèm thông báo đăng nhập lại nếu có.
>
> File: `5-9-03.png`

### Kết quả mong đợi

Hồ sơ cập nhật được; đổi mật khẩu phải có xác nhận hợp lệ.

### Source đối chiếu

- `dashboard/personal_pages.py`
- `dashboard/account_security.py`
- `dashboard/account_security_ui.py`
- `dashboard/passwords.py`
- `dashboard/user_storage.py`

---

[← 5.9. Tài khoản và chức năng người dùng](../) · [Mục lục Workshop](../../) · [Bước trước](../5.9.2-step2/) · [Bước tiếp →](../5.9.4-step4/)
