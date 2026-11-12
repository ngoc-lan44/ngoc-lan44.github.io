---
title: "Lưu việc làm và theo dõi ứng tuyển"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.9.2. </b> "
aliases:
  - "/5-workshop/5.6-user-features/5.6.2-step2/"
---

**Mục tiêu:** Lưu việc làm và theo dõi ứng tuyển.

**Bối cảnh:** Thực hành đăng nhập, lưu việc làm, ứng tuyển, hồ sơ và kiểm tách dữ liệu.

### Các bước thực hiện

Chọn tin active, bấm lưu rồi mở **Việc làm đã lưu** để đối chiếu. Lưu lại cùng tin không tạo bản trùng; bỏ lưu chỉ ảnh hưởng tài khoản hiện tại.

Thực hiện theo dõi/ứng tuyển, mở **Lịch sử ứng tuyển** và cập nhật trạng thái theo UI. Dự án lưu các trạng thái SAVED/APPLIED/INTERVIEW/REJECTED/ACCEPTED; liên kết ITviec để người dùng tự hoàn tất hồ sơ. Hệ thống không tự gửi CV hoặc nhận trạng thái tuyển dụng từ ITviec.

Đăng nhập lại để kiểm lưu bền; dùng USER B đối chiếu dữ liệu của USER A không xuất hiện.


> 📸 **[CẦN THÊM ẢNH 5.9-02]**
>
> Ảnh Việc làm đã lưu và Lịch sử ứng tuyển của tài khoản thử, thể hiện tin và trạng thái đã cập nhật.
>
> File: `5-9-02.png`

### Kết quả mong đợi

Tin đã lưu/trạng thái ứng tuyển còn sau khi đăng nhập lại.

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

[← 5.9. Tài khoản và chức năng người dùng](../) · [Mục lục Workshop](../../) · [Bước trước](../5.9.1-step1/) · [Bước tiếp →](../5.9.3-step3/)
