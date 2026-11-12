---
title: "Phân biệt các trạng thái khi đọc kết quả"
date: 2026-11-10
weight: 4
chapter: false
pre: " <b> 5.9.4. </b> "
---

| Trạng thái hoặc dấu hiệu | Cách hiểu |
| --- | --- |
| Service activating | Oneshot có thể đang chạy; kiểm process và journal trước khi kết luận treo |
| RUNNING | Đối chiếu thời điểm/cập nhật và trạng thái service; file cũ riêng lẻ không chứng minh còn chạy |
| SUCCEEDED, published=true | Lượt hoàn tất publication; đối chiếu thêm metadata canonical |
| SKIPPED | Runner có thể đã có lượt thành công cùng ngày Việt Nam/cùng chế độ; đọc lý do |
| FAILED | Giữ failed_stage, error_type, journal và artifact để xử lý |
| DISPATCHED | Worker đã chuyển yêu cầu, phải kiểm kết quả service/run tiếp theo |

Khi kiểm chạy bù, ghi last trigger, thời điểm boot và run bắt đầu sau đó. Persistent không chạy lại riêng từng ngày đã bỏ lỡ. Nếu máy dừng nhiều ngày, không suy số lượt chạy bù bằng số ngày máy dừng.

**Kiểm tra sau bước này:** Không nhầm SKIPPED, DISPATCHED hoặc service active với toàn run SUCCEEDED.

---

[← 5.9](../) · [Mục lục Workshop](../../) · [Bước trước](../5.9.3-step3/) · [Bước tiếp →](../5.9.5-step5/)
