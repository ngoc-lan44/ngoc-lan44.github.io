---
title: "Kiểm soát phiên và ghi đồng thời"
date: 2026-11-11T00:00:00+07:00
weight: 5
chapter: false
pre: " <b> 5.9.5. </b> "
aliases:
  - "/5-workshop/5.6-user-features/5.6.5-step5/"
---

**Mục tiêu:** Kiểm soát phiên và ghi đồng thời.

**Bối cảnh:** Thực hành đăng nhập, lưu việc làm, ứng tuyển, hồ sơ và kiểm tách dữ liệu.

### Các bước thực hiện

S3 store dùng điều kiện ETag khi cập nhật để phát hiện object đã thay đổi. Khi gặp xung đột, làm mới và kiểm trạng thái vừa lưu trước khi thử lại; không ghi đè file accounts.json thủ công để bỏ qua lỗi.

Sau đổi mật khẩu hoặc ADMIN thu hồi phiên, kiểm phiên cũ bằng một thao tác được bảo vệ. Giao diện ẩn menu chỉ là biểu hiện; việc kiểm quyền phải dựa vào trạng thái server. Cấu hình email_enabled=false không chứng minh gửi thư xác minh hoặc khôi phục mật khẩu qua email đang hoạt động. Chỉ mô tả các luồng đã bật và có bằng chứng trong môi trường thực hành.

### Kết quả mong đợi

Phiên bị thu hồi không tiếp tục thực hiện thao tác bảo vệ; không ghi đè S3 thủ công.

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

[← 5.9. Tài khoản và chức năng người dùng](../) · [Mục lục Workshop](../../) · [Bước trước](../5.9.4-step4/)
