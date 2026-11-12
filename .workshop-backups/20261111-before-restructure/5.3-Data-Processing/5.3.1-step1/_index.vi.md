---
title: "Đồng bộ Current và History"
date: 2026-11-10
weight: 1
chapter: false
pre: " <b> 5.3.1. </b> "
---

Với run đã hoàn thành, đối chiếu `staged/current/itviec/current_jobs.json` và `staged/history/itviec/events_*.json`. Tin đã có giữ first_seen và cập nhật last_seen.

| Nội dung | Cách xử lý |
| --- | --- |
| NEW | Tạo sự kiện cho tin mới |
| UPDATED | Ghi sự kiện và các trường thay đổi |
| UNCHANGED | Tăng bộ đếm summary, không tạo event riêng |
| EXPIRED | Xác định khi deadline nguồn hợp lệ đã qua; reason EXPLICIT_SOURCE_DEADLINE |

ACTIVE/EXPIRED là trạng thái bản ghi, khác với sự kiện NEW/UPDATED. Tin vắng discovery hoặc thiếu expired_date không tự hết hạn; bản ghi hết hạn vẫn được giữ để truy vết và bị loại khỏi active view.

**Kiểm tra sau bước này:** Giữ first_seen, cập nhật last_seen; phân biệt sự kiện và trạng thái bản ghi.

> 📸 **[CẦN THÊM ẢNH 5.3-01]**
>
> Ảnh current/history của cùng job_id và summary; thể hiện first_seen, last_seen hoặc reason hết hạn nếu có.
>
> File: `5-3-01.png`

---

[← 5.3](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.3.2-step2/)
