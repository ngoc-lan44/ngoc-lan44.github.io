---
title: "Kiểm tra lưu bền và tách dữ liệu cá nhân"
date: 2026-11-10
weight: 4
chapter: false
pre: " <b> 5.6.4. </b> "
---

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

**Kiểm tra sau bước này:** Dữ liệu của A không hiển thị trong tài khoản B.

---

[← 5.6](../) · [Mục lục Workshop](../../) · [Bước trước](../5.6.3-step3/) · [Bước tiếp →](../5.6.5-step5/)
