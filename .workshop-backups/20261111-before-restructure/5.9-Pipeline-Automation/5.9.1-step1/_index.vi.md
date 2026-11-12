---
title: "Pipeline Service và lịch chạy"
date: 2026-11-10
weight: 1
chapter: false
pre: " <b> 5.9.1. </b> "
---

| Thiết lập | Giá trị |
| --- | --- |
| Service | vnjob-pipeline.service, Type=oneshot, User=vnjob |
| Runtime env | /etc/vn-it-job-market.env |
| Timeout | 8 giờ; ExecStopPost ghi lỗi thoát |
| Timer | 19:00 UTC = 02:00 Việt Nam ngày kế tiếp |
| Chạy bù | Persistent=true |

~~~bash
systemctl cat vnjob-pipeline.service vnjob-pipeline.timer
systemctl is-enabled vnjob-pipeline.timer
systemctl list-timers vnjob-pipeline.timer --no-pager
~~~

Chỉ bật lịch sau khi kiểm run publication thành công bằng `sudo systemctl enable --now vnjob-pipeline.timer`. Installer đăng ký timer nhưng không tự bật lịch pipeline.

**Kiểm tra sau bước này:** Timer đúng 19:00 UTC tương ứng 02:00 Việt Nam, có Persistent.

> 📸 **[CẦN THÊM ẢNH 5.9-01]**
>
> Ảnh unit/timer hiển thị OnCalendar, Persistent, enabled và next/last trigger; chú thích giờ Việt Nam.
>
> File: `5-9-01.png`

---

[← 5.9](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.9.2-step2/)
