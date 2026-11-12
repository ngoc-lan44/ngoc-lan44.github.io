---
title: "Đối chiếu cấu hình service và reverse proxy"
date: 2026-11-10
weight: 5
chapter: false
pre: " <b> 5.8.5. </b> "
---

Mở kết quả systemctl cat ở bước trên, kiểm WorkingDirectory, User, EnvironmentFile và ExecStart. Service thực tế cần chạy dashboard/app.py bằng Python Linux trong .venv. Cấu hình source giới hạn quyền ghi vào data và tự khởi động lại khi lỗi; không chạy dashboard bằng root để khắc phục lỗi quyền.

Nginx cần chuyển tiếp kết nối tới loopback 8501 và hỗ trợ WebSocket. File deploy/ec2/nginx.conf là cấu hình private ban đầu, có location chặn truy cập; public HTTPS được cấu hình riêng với proxy include. Không sao chép đè cấu hình private lên site public đang dùng.

**Kiểm tra sau bước này:** Service thực chạy đúng entrypoint với tài khoản vnjob; proxy dùng cấu hình public phù hợp.

---

[← 5.8](../) · [Mục lục Workshop](../../) · [Bước trước](../5.8.4-step4/) · [Bước tiếp →](../5.8.6-step6/)
