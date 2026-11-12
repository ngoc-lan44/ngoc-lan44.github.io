---
title: "Đồng bộ Current và History"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.4.1. </b> "
aliases:
  - "/5-workshop/5.3-data-processing/5.3.1-step1/"
---

**Mục tiêu:** Đồng bộ Current và History.

**Bối cảnh:** Đồng bộ current/history, chuẩn hóa dữ liệu và kiểm Parquet trên bản sao.

### Các bước thực hiện

Với run đã hoàn thành, mở thư mục `data/runs/<RUN_ID_THUC_TE>/` rồi đối chiếu `staged/current/itviec/current_jobs.json` và `staged/history/itviec/events_*.json` bên trong. Thay RUN_ID_THUC_TE bằng lượt đã chọn, không lấy history của lượt khác. Tin đã có giữ first_seen và cập nhật last_seen.

| Nội dung | Cách xử lý |
| --- | --- |
| NEW | Tạo sự kiện cho tin mới |
| UPDATED | Ghi sự kiện và các trường thay đổi |
| UNCHANGED | Tăng bộ đếm summary, không tạo event riêng |
| EXPIRED | Xác định khi deadline nguồn hợp lệ đã qua; reason EXPLICIT_SOURCE_DEADLINE |

ACTIVE/EXPIRED là trạng thái bản ghi, khác với sự kiện NEW/UPDATED. Tin vắng discovery hoặc thiếu expired_date không tự hết hạn; bản ghi hết hạn vẫn được giữ để truy vết và bị loại khỏi active view.


> 📸 **[CẦN THÊM ẢNH 5.4-01]**
>
> Ảnh current/history của cùng job_id và summary; thể hiện first_seen, last_seen hoặc reason hết hạn nếu có.
>
> File: `5-4-01.png`

### Kết quả mong đợi

Giữ first_seen, cập nhật last_seen; phân biệt sự kiện và trạng thái bản ghi.

### Source đối chiếu

- `processors/sync_itviec_current.py`
- `deploy/ec2/run_pipeline.py`
- `sql/create_itviec_active_jobs_v3_view.sql`

---

[← 5.4. Đồng bộ, làm sạch và xuất Parquet](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.4.2-step2/)
