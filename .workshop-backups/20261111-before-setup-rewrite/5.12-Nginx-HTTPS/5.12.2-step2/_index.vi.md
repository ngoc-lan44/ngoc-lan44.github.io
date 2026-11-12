---
title: "Kiểm tra truy cập"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.12.2. </b> "
aliases:
  - "/5-workshop/5.8-ec2-https/5.8.4-step4/"
---

**Mục tiêu:** Kiểm tra truy cập.

**Bối cảnh:** Kiểm reverse proxy, chứng chỉ, timer tự động và truy cập bên ngoài.

### Các bước thực hiện

Từ máy ngoài EC2, thay IP hiện tại và kiểm:

~~~bash
curl -I http://<PUBLIC_IPV4_HIEN_TAI>/
curl --fail https://<PUBLIC_IPV4_HIEN_TAI>/_stcore/health
~~~


> 📸 **[CẦN THÊM ẢNH 5.12-02]**
>
> Ảnh HTTP redirect, HTTPS health và Network WebSocket của dashboard trên IP hiện tại, có ngày kiểm tra.
>
> File: `5-12-02.png`

### Kết quả mong đợi

HTTP redirect đúng host, HTTPS không bỏ kiểm chứng chỉ và WebSocket hoạt động.

### Source đối chiếu

- `deploy/ec2/proxy.inc`
- `deploy/ec2/nginx.conf`
- `deploy/ec2/auto_https.py`
- `deploy/ec2/configure_public_https.sh`
- `docs/AUTO_HTTPS.md`

---

[← 5.12. Cấu hình Nginx và HTTPS theo IP](../) · [Mục lục Workshop](../../) · [Bước trước](../5.12.1-step1/) · [Bước tiếp →](../5.12.3-step3/)
