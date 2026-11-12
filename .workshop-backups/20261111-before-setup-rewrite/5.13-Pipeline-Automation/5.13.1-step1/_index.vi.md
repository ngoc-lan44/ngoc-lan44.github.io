---
title: "Pipeline Service và lịch chạy"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.13.1. </b> "
aliases:
  - "/5-workshop/5.9-pipeline-automation/5.9.1-step1/"
---

**Mục tiêu:** Pipeline Service và lịch chạy.

**Bối cảnh:** Kiểm lịch 02:00, chạy bù và kết quả phục hồi có kiểm soát.

### Các bước thực hiện

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


> 📸 **[CẦN THÊM ẢNH 5.13-01]**
>
> Ảnh unit/timer hiển thị OnCalendar, Persistent, enabled và next/last trigger; chú thích giờ Việt Nam.
>
> File: `5-13-01.png`

### Kết quả mong đợi

Timer đúng 19:00 UTC tương ứng 02:00 Việt Nam, có Persistent.

### Source đối chiếu

- `deploy/ec2/pipeline.service`
- `deploy/ec2/pipeline.timer`
- `deploy/ec2/run_pipeline.py`
- `deploy/ec2/operations_worker.py`
- `deploy/ec2/install_recovery.sh`
- `docs/OPERATIONS_RUNBOOK.md`

---

[← 5.13. Tự động hóa pipeline và Operations Worker](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.13.2-step2/)
