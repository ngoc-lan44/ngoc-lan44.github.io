---
title: "Phân biệt các trạng thái khi đọc kết quả"
date: 2026-11-11T00:00:00+07:00
weight: 4
chapter: false
pre: " <b> 5.13.4. </b> "
aliases:
  - "/5-workshop/5.9-pipeline-automation/5.9.4-step4/"
---

**Mục tiêu:** Phân biệt các trạng thái khi đọc kết quả.

**Bối cảnh:** Kiểm lịch 02:00, chạy bù và kết quả phục hồi có kiểm soát.

### Các bước thực hiện

| Trạng thái hoặc dấu hiệu | Cách hiểu |
| --- | --- |
| Service activating | Oneshot có thể đang chạy; kiểm process và journal trước khi kết luận treo |
| RUNNING | Đối chiếu thời điểm/cập nhật và trạng thái service; file cũ riêng lẻ không chứng minh còn chạy |
| SUCCEEDED, published=true | Lượt hoàn tất publication; đối chiếu thêm metadata canonical |
| SKIPPED | Runner có thể đã có lượt thành công cùng ngày Việt Nam/cùng chế độ; đọc lý do |
| FAILED | Giữ failed_stage, error_type, journal và artifact để xử lý |
| DISPATCHED | Worker đã chuyển yêu cầu, phải kiểm kết quả service/run tiếp theo |

Khi kiểm chạy bù, ghi last trigger, thời điểm boot và run bắt đầu sau đó. Persistent không chạy lại riêng từng ngày đã bỏ lỡ. Nếu máy dừng nhiều ngày, không suy số lượt chạy bù bằng số ngày máy dừng.

### Kết quả mong đợi

Không nhầm SKIPPED, DISPATCHED hoặc service active với toàn run SUCCEEDED.

### Source đối chiếu

- `deploy/ec2/pipeline.service`
- `deploy/ec2/pipeline.timer`
- `deploy/ec2/run_pipeline.py`
- `deploy/ec2/operations_worker.py`
- `deploy/ec2/install_recovery.sh`
- `docs/OPERATIONS_RUNBOOK.md`

---

[← 5.13. Tự động hóa pipeline và Operations Worker](../) · [Mục lục Workshop](../../) · [Bước trước](../5.13.3-step3/) · [Bước tiếp →](../5.13.5-step5/)
