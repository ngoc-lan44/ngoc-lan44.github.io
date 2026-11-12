---
title: "Theo dõi run và chạy bù"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.13.2. </b> "
aliases:
  - "/5-workshop/5.9-pipeline-automation/5.9.2-step2/"
---

**Mục tiêu:** Theo dõi run và chạy bù.

**Bối cảnh:** Kiểm lịch 02:00, chạy bù và kết quả phục hồi có kiểm soát.

### Các bước thực hiện

Đối chiếu status.json với journal qua run_id, started_at, finished_at, stage, crawled/current và published. Runner đi từ discovery, crawl, sync, clean, Parquet đến publication/commit. FAILED cần xem failed_stage và error_type.

~~~bash
journalctl -u vnjob-pipeline -n 120 --no-pager
systemctl show vnjob-pipeline.service -p ActiveState -p SubState -p ExecMainStartTimestamp -p ExecMainExitTimestamp -p Result
~~~

Persistent timer cho phép kích một lượt bị lỡ sau boot; runner vẫn bỏ qua nếu cùng ngày Việt Nam/cùng chế độ đã thành công. Activating là trạng thái có thể gặp của oneshot; file RUNNING cũ cần đối chiếu process. Không xóa marker để ép chạy lại.


> 📸 **[CẦN THÊM ẢNH 5.13-02]**
>
> Ảnh journal và status cùng run_id, có thời điểm bắt đầu/kết thúc, trạng thái cuối và published; chỉ ghi là chạy bù khi có log thể hiện trigger và trạng thái cuối tương ứng.
>
> File: `5-13-02.png`

### Kết quả mong đợi

Run_id và trạng thái cuối khớp journal; service được kiểm khi RUNNING/activating.

### Source đối chiếu

- `deploy/ec2/pipeline.service`
- `deploy/ec2/pipeline.timer`
- `deploy/ec2/run_pipeline.py`
- `deploy/ec2/operations_worker.py`
- `deploy/ec2/install_recovery.sh`
- `docs/OPERATIONS_RUNBOOK.md`

---

[← 5.13. Tự động hóa pipeline và Operations Worker](../) · [Mục lục Workshop](../../) · [Bước trước](../5.13.1-step1/) · [Bước tiếp →](../5.13.3-step3/)
