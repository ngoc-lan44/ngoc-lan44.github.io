---
title: "Tài khoản và chức năng người dùng"
date: 2026-11-08
weight: 6
chapter: false
pre: " <b> 5.6. </b> "
aliases:
  - "/5-workshop/5.9-user-features/"
  - "/5-workshop/5.9-user-features/5.9.1-step1/"
  - "/5-workshop/5.9-user-features/5.9.2-step2/"
  - "/5-workshop/5.9-user-features/5.9.3-step3/"
  - "/5-workshop/5.9-user-features/5.9.4-step4/"
  - "/5-workshop/5.9-user-features/5.9.5-step5/"
  - "/5-workshop/5.9-user-features/5.9.6-step6/"
  - "/4-workshop/4.9-user-administration/4.9.1-step1/"
  - "/4-workshop/4.9-user-administration/4.9.2-step2/"
  - "/4-workshop/4.9-user-administration/"
---

**Mục tiêu thực hành:** Thực hành chức năng USER và xác minh lưu bền, tách dữ liệu, kiểm soát phiên.

Người dùng đăng ký tài khoản để lưu việc làm, theo dõi ứng tuyển và quản lý hồ sơ. Tài khoản lưu tại `users/accounts.json`; hoạt động cá nhân lưu tại `users/activity/<sha256-user-id>.json` trên S3.

**Giao diện:** sidebar Đăng nhập và các trang cá nhân của USER.

### Trước khi bắt đầu

**Đầu vào:** Website hoạt động; hai USER thử A/B phục vụ đối chiếu tách dữ liệu.

**Đầu ra:** Có kịch bản xác nhận quyền USER, lưu bền dữ liệu cá nhân và kiểm soát phiên.

### Các bài thực hành

- [5.6.1. Đăng ký, đăng nhập và phân quyền](5.6.1-step1/)
- [5.6.2. Lưu việc làm và theo dõi ứng tuyển](5.6.2-step2/)
- [5.6.3. Hồ sơ và đổi mật khẩu](5.6.3-step3/)
- [5.6.4. Kiểm tra lưu bền và tách dữ liệu cá nhân](5.6.4-step4/)
- [5.6.5. Kiểm soát phiên và ghi đồng thời](5.6.5-step5/)

### Kết quả mong đợi

Dữ liệu cá nhân bền và tách tài khoản; cập nhật S3 dùng điều kiện ETag để kiểm soát ghi đồng thời. Kiểm thêm USER bị từ chối trang ADMIN và phiên cũ mất quyền sau revoke. Luồng email opt-in chưa được coi là hoạt động khi email_enabled=false.

### Checklist

- [ ] Đăng ký chỉ tạo USER; đăng nhập đúng vai trò.
- [ ] Lưu việc làm/ứng tuyển/hồ sơ bền và tách tài khoản.
- [ ] Đổi mật khẩu và thu hồi phiên được kiểm bằng tài khoản thử.


### Source đối chiếu

- `dashboard/registration.py`
- `dashboard/auth.py`
- `dashboard/passwords.py`
- `dashboard/s3_store.py`
- `AUTHENTICATION.md`
- `dashboard/app.py`

---

[← 5.5](../5.5-Streamlit-Dashboard/) · [Mục lục](../) · [5.7 →](../5.7-Administration/)
