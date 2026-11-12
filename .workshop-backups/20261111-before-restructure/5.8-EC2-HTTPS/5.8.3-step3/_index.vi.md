---
title: "Nginx và HTTPS"
date: 2026-11-10
weight: 3
chapter: false
pre: " <b> 5.8.3. </b> "
---

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

**Kiểm tra sau bước này:** Nginx hợp lệ, certificate đúng IP và timer có lịch hoạt động.

> 📸 **[CẦN THÊM ẢNH 5.8-02]**
>
> Ảnh nginx -t, service dashboard và chứng chỉ SAN IP/hạn dùng, kèm timer hoặc log HTTPS reconcile.
>
> File: `5-8-02.png`

---

[← 5.8](../) · [Mục lục Workshop](../../) · [Bước trước](../5.8.2-step2/) · [Bước tiếp →](../5.8.4-step4/)
