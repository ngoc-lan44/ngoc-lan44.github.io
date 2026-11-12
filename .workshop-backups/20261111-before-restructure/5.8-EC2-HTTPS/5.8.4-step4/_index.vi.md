---
title: "Kiểm tra truy cập"
date: 2026-11-10
weight: 4
chapter: false
pre: " <b> 5.8.4. </b> "
---

Từ máy ngoài EC2, thay IP hiện tại và kiểm:

~~~bash
curl -I http://<PUBLIC_IPV4_HIEN_TAI>/
curl --fail https://<PUBLIC_IPV4_HIEN_TAI>/_stcore/health
~~~

**Kiểm tra sau bước này:** HTTP redirect đúng host, HTTPS không bỏ kiểm chứng chỉ và WebSocket hoạt động.

> 📸 **[CẦN THÊM ẢNH 5.8-03]**
>
> Ảnh HTTP redirect, HTTPS health và Network WebSocket của dashboard trên IP hiện tại, có ngày kiểm tra.
>
> File: `5-8-03.png`

---

[← 5.8](../) · [Mục lục Workshop](../../) · [Bước trước](../5.8.3-step3/) · [Bước tiếp →](../5.8.5-step5/)
