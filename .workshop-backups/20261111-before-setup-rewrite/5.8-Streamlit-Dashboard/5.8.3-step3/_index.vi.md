---
title: "Tìm kiếm, lọc và xem chi tiết"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.8.3. </b> "
aliases:
  - "/5-workshop/5.5-streamlit-dashboard/5.5.3-step3/"
---

**Mục tiêu:** Tìm kiếm, lọc và xem chi tiết.

**Bối cảnh:** Đọc dữ liệu Athena, kiểm KPI/biểu đồ và tra cứu việc làm.

### Các bước thực hiện

1. Nhập từ khóa vị trí hoặc công ty.
2. Kết hợp địa điểm, cấp bậc, kinh nghiệm, công ty và điều kiện có lương.
3. Kiểm bảng, KPI và chart cùng áp dụng bộ lọc; thử trường hợp không có kết quả.
4. Chọn **Xem chi tiết**, đối chiếu job_id, tiêu đề, công ty và URL ITviec với dòng đã chọn. Xóa bộ lọc để trở lại toàn tập.


> 📸 **[CẦN THÊM ẢNH 5.8-03]**
>
> Ảnh bộ lọc và bảng kết quả, tiếp theo là chi tiết cùng tin đã chọn với URL ITviec.
>
> File: `5-8-03.png`

### Kết quả mong đợi

Tin được mở có job_id/URL khớp dòng chọn, không giữ chi tiết của tin trước.

### Source đối chiếu

- `dashboard/app.py`
- `dashboard/job_data.py`
- `dashboard/market_dashboard.py`
- `dashboard/weekly_metrics.py`
- `docs/WEEKLY_KPIS.md`

---

[← 5.8. Xây dựng Streamlit Dashboard](../) · [Mục lục Workshop](../../) · [Bước trước](../5.8.2-step2/) · [Bước tiếp →](../5.8.4-step4/)
