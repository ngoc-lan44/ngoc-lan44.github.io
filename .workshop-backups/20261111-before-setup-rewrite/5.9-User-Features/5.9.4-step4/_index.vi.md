---
title: "Kiểm tra lưu bền và tách dữ liệu cá nhân"
date: 2026-11-11T00:00:00+07:00
weight: 4
chapter: false
pre: " <b> 5.9.4. </b> "
aliases:
  - "/5-workshop/5.6-user-features/5.6.4-step4/"
---

**Mục tiêu:** Kiểm tra lưu bền và tách dữ liệu cá nhân.

**Bối cảnh:** Thực hành đăng nhập, lưu việc làm, ứng tuyển, hồ sơ và kiểm tách dữ liệu.

### Các bước thực hiện

Dùng hai tài khoản thử A và B, không dùng tài khoản thật của người khác. Với A, lưu một tin, cập nhật trạng thái ứng tuyển rồi đăng xuất. Đăng nhập B để kiểm danh sách của A không xuất hiện; sau đó quay lại A để xác nhận dữ liệu còn được lưu.

| Tình huống | Kết quả mong đợi |
| --- | --- |
| Lưu cùng tin hai lần | Không tạo hai mục trùng cho cùng tài khoản |
| Bỏ lưu ở A | Không thay đổi dữ liệu cá nhân của B |
| Cập nhật ứng tuyển | Trạng thái mới còn sau đăng nhập lại |
| Đổi tên hiển thị/giới thiệu | Hồ sơ được lưu; role và user_id không đổi |
| Mật khẩu hiện tại sai | Không thực hiện đổi mật khẩu |
| USER vào chức năng ADMIN | Bị từ chối quyền truy cập |

Việc lưu job_id và dữ liệu hoạt động trên S3 tách khỏi Parquet tuyển dụng. Vì vậy thao tác cá nhân không làm thay đổi số liệu thị trường hoặc dữ liệu nguồn của người dùng khác.

### Kết quả mong đợi

Dữ liệu của A không hiển thị trong tài khoản B.

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

[← 5.9. Tài khoản và chức năng người dùng](../) · [Mục lục Workshop](../../) · [Bước trước](../5.9.3-step3/) · [Bước tiếp →](../5.9.5-step5/)
