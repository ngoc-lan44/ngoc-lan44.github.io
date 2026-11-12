---
title: "Theo dõi run và chạy bù"
date: 2026-11-10
weight: 2
chapter: false
pre: " <b> 5.9.2. </b> "
---

Đối chiếu status.json với journal qua run_id, started_at, finished_at, stage, crawled/current và published. Runner đi từ discovery, crawl, sync, clean, Parquet đến publication/commit. FAILED cần xem failed_stage và error_type.

~~~bash
journalctl -u vnjob-pipeline -n 120 --no-pager
systemctl show vnjob-pipeline.service -p ActiveState -p SubState -p ExecMainStartTimestamp -p ExecMainExitTimestamp -p Result
~~~

Persistent timer cho phép kích một lượt bị lỡ sau boot; runner vẫn bỏ qua nếu cùng ngày Việt Nam/cùng chế độ đã thành công. Activating là trạng thái có thể gặp của oneshot; file RUNNING cũ cần đối chiếu process. Không xóa marker để ép chạy lại.

**Kiểm tra sau bước này:** Run_id và trạng thái cuối khớp journal; service được kiểm khi RUNNING/activating.

> 📸 **[CẦN THÊM ẢNH 5.9-02]**
>
> Ảnh journal và status cùng run_id, có thời điểm bắt đầu/kết thúc, trạng thái cuối và published; dùng log catch-up 03/11 nếu còn.
>
> File: `5-9-02.png`

---

[← 5.9](../) · [Mục lục Workshop](../../) · [Bước trước](../5.9.1-step1/) · [Bước tiếp →](../5.9.3-step3/)
