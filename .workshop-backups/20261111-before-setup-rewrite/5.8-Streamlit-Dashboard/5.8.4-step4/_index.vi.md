---
title: "Đối chiếu KPI và cách đọc biểu đồ"
date: 2026-11-11T00:00:00+07:00
weight: 4
chapter: false
pre: " <b> 5.8.4. </b> "
aliases:
  - "/5-workshop/5.5-streamlit-dashboard/5.5.4-step4/"
---

**Mục tiêu:** Đối chiếu KPI và cách đọc biểu đồ.

**Bối cảnh:** Đọc dữ liệu Athena, kiểm KPI/biểu đồ và tra cứu việc làm.

### Các bước thực hiện

Thực hiện hai lượt: bỏ toàn bộ bộ lọc, sau đó chọn một công ty hoặc địa điểm cụ thể. Ghi số việc làm trong bảng ở mỗi lượt và kiểm các thẻ/biểu đồ thay đổi theo cùng phạm vi. Kỹ năng là dữ liệu nhiều giá trị, vì vậy không lấy tổng lượt của các cột kỹ năng làm tổng số việc làm.

KPI tuần sử dụng hai khoảng 7 ngày không chồng lấn, chốt theo ngày dữ liệu. Phần trăm thay đổi được tính bằng (kỳ này − kỳ trước) / kỳ trước × 100. Khi kỳ trước bằng 0, giao diện dùng trạng thái Mới phát sinh thay vì chia cho 0. Một khoảng ngày chưa kết thúc cần được đọc cùng thời điểm dữ liệu.

### Kết quả mong đợi

Số liệu trước/sau lọc được so sánh; tỷ lệ tuần xử lý đúng kỳ trước bằng 0.

### Source đối chiếu

- `dashboard/app.py`
- `dashboard/job_data.py`
- `dashboard/market_dashboard.py`
- `dashboard/weekly_metrics.py`
- `docs/WEEKLY_KPIS.md`

---

[← 5.8. Xây dựng Streamlit Dashboard](../) · [Mục lục Workshop](../../) · [Bước trước](../5.8.3-step3/) · [Bước tiếp →](../5.8.5-step5/)
