---
title: "Kiểm tra reverse proxy và xử lý lỗi HTTPS"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.12.3. </b> "
---

**Mục tiêu:** Kiểm tra reverse proxy và xử lý lỗi HTTPS.

**Bối cảnh:** Kiểm reverse proxy, chứng chỉ, timer tự động và truy cập bên ngoài.

### Các bước thực hiện

Cấu hình private ban đầu deploy/ec2/nginx.conf có location chặn truy cập. Cấu hình public dùng proxy include tương ứng với deploy/ec2/proxy.inc. Không sao chép đè cấu hình private lên website đang phục vụ.

1. Đối chiếu upstream về http://127.0.0.1:8501 và các header Upgrade/Connection cho WebSocket.
2. Kiểm Nginx hợp lệ bằng nginx -t; đọc journal nếu reload không thành công.
3. Nếu IP thay đổi, kiểm log vnjob-certbot, SAN IP và hạn chứng chỉ. Helper cần Certbot runtime, proxy include, Internet và cổng 80/443 sẵn sàng.
4. Nếu cấp chứng chỉ thất bại, giữ log lỗi và chờ/xử lý nguyên nhân ở lượt timer sau. Không lặp stop/start nhanh để ép cấp lại.

| Hiện tượng | Kiểm tra theo thứ tự |
| --- | --- |
| Không vào được website | EC2 state/reachability, IPv4 hiện tại, ingress 80/443, Nginx |
| 502/504 | Health loopback, service Streamlit và journal |
| Chứng chỉ sai IP/hết hạn | Public IPv4, certificate SAN/expiry, timer và log reconcile |
| Trang mở nhưng mất tương tác | Header WebSocket, kết nối Network và log proxy/app |

Hồ sơ AUTO_HTTPS.md ghi nhận cấp HTTPS và kiểm timer ngày 03/11/2026; không ghi nhận diễn tập stop/start end-to-end. Chỉ ghi đã kiểm lại khi có bằng chứng mới.

### Kết quả mong đợi

Phân biệt lỗi EC2, proxy, app và chứng chỉ; không bỏ kiểm TLS để làm kết quả kiểm tra thành công.

### Source đối chiếu

- `deploy/ec2/proxy.inc`
- `deploy/ec2/nginx.conf`
- `deploy/ec2/auto_https.py`
- `deploy/ec2/configure_public_https.sh`
- `docs/AUTO_HTTPS.md`

---

[← 5.12. Cấu hình Nginx và HTTPS theo IP](../) · [Mục lục Workshop](../../) · [Bước trước](../5.12.2-step2/)
