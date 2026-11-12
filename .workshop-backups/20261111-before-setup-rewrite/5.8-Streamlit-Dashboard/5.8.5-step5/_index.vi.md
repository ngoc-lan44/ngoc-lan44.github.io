---
title: "Kiểm tra dữ liệu rỗng và hiệu lực cache"
date: 2026-11-11T00:00:00+07:00
weight: 5
chapter: false
pre: " <b> 5.8.5. </b> "
aliases:
  - "/5-workshop/5.5-streamlit-dashboard/5.5.5-step5/"
---

**Mục tiêu:** Kiểm tra dữ liệu rỗng và hiệu lực cache.

**Bối cảnh:** Đọc dữ liệu Athena, kiểm KPI/biểu đồ và tra cứu việc làm.

### Các bước thực hiện

1. Nhập từ khóa không có trong tập dữ liệu, kiểm giao diện thông báo không có kết quả và không phát sinh lỗi.
2. Xóa từ khóa, trả bộ lọc về ban đầu rồi chọn một dòng khác để mở chi tiết; thông tin không được giữ nhầm từ tin trước.
3. So sánh thời điểm cập nhật và journal khi cần xác minh dữ liệu mới. Reader có cache 300 giây cho jobs/skills; không kết luận pipeline lỗi chỉ vì UI chưa đổi ngay.
4. Sau một thao tác moderation, kiểm public view và giao diện theo quy trình mục 5.10 để phân biệt cache với độ trễ projection.

Nếu health trả OK nhưng trang không có dữ liệu, kiểm truy vấn Athena, quyền IAM và log ứng dụng. Health chỉ kiểm tiến trình Streamlit, không chứng minh toàn bộ đường đọc dữ liệu đã thành công. Không đưa credential vào ảnh lỗi hoặc nội dung báo cáo.

### Kết quả mong đợi

Dữ liệu rỗng có thông báo, bỏ lọc khôi phục được kết quả; cache được phân biệt với lỗi pipeline.

### Source đối chiếu

- `dashboard/app.py`
- `dashboard/job_data.py`
- `dashboard/market_dashboard.py`
- `dashboard/weekly_metrics.py`
- `docs/WEEKLY_KPIS.md`

---

[← 5.8. Xây dựng Streamlit Dashboard](../) · [Mục lục Workshop](../../) · [Bước trước](../5.8.4-step4/)
