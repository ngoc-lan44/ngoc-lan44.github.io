---
title: "Nginx và HTTPS"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.12.1. </b> "
aliases:
  - "/5-workshop/5.8-ec2-https/5.8.3-step3/"
---

**Mục tiêu:** Nginx và HTTPS.

**Bối cảnh:** Kiểm reverse proxy, chứng chỉ, timer tự động và truy cập bên ngoài.

### Các bước thực hiện

Nginx proxy HTTP/WebSocket tới Streamlit, terminate TLS 443; cổng 80 phục vụ ACME và redirect. Certbot runtime ở /opt/vnjob-certbot. Helper auto_https.py lấy IP qua IMDSv2, cấp chứng chỉ khi IP đổi hoặc còn dưới hai ngày, kiểm nginx -t trước reload.

Timer HTTPS kiểm sau boot 30 giây và sau mỗi lượt kết thúc 30 phút. Cơ chế cập nhật chứng chỉ theo IP mới, không giữ IP cố định.

~~~bash
systemctl cat vnjob-dashboard.service
systemctl status nginx vnjob-dashboard --no-pager
sudo nginx -t
sudo /opt/vnjob-certbot/bin/certbot certificates
systemctl list-timers vnjob-certbot.timer --no-pager
journalctl -u vnjob-certbot.service -n 50 --no-pager
~~~


> 📸 **[CẦN THÊM ẢNH 5.12-01]**
>
> Ảnh nginx -t, service dashboard và chứng chỉ SAN IP/hạn dùng, kèm timer hoặc log HTTPS reconcile.
>
> File: `5-12-01.png`

### Kết quả mong đợi

Nginx hợp lệ, certificate đúng IP và timer có lịch hoạt động.

### Source đối chiếu

- `deploy/ec2/proxy.inc`
- `deploy/ec2/nginx.conf`
- `deploy/ec2/auto_https.py`
- `deploy/ec2/configure_public_https.sh`
- `docs/AUTO_HTTPS.md`

---

[← 5.12. Cấu hình Nginx và HTTPS theo IP](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.12.2-step2/)
