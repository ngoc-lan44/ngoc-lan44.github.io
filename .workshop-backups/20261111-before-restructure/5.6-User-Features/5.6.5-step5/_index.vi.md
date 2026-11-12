---
title: "Kiểm soát phiên và ghi đồng thời"
date: 2026-11-10
weight: 5
chapter: false
pre: " <b> 5.6.5. </b> "
---

S3 store dùng điều kiện ETag khi cập nhật để phát hiện object đã thay đổi. Khi gặp xung đột, làm mới và kiểm trạng thái vừa lưu trước khi thử lại; không ghi đè file accounts.json thủ công để bỏ qua lỗi.

Sau đổi mật khẩu hoặc ADMIN thu hồi phiên, kiểm phiên cũ bằng một thao tác được bảo vệ. Giao diện ẩn menu chỉ là biểu hiện; việc kiểm quyền phải dựa vào trạng thái server. Cấu hình email_enabled=false không chứng minh gửi thư xác minh hoặc khôi phục mật khẩu qua email đang hoạt động. Chỉ mô tả các luồng đã bật và có bằng chứng trong môi trường thực hành.

**Kiểm tra sau bước này:** Phiên bị thu hồi không tiếp tục thực hiện thao tác bảo vệ; không ghi đè S3 thủ công.

---

[← 5.6](../) · [Mục lục Workshop](../../) · [Bước trước](../5.6.4-step4/)
