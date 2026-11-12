---
title: "KPI và biểu đồ"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.8.2. </b> "
aliases:
  - "/5-workshop/5.5-streamlit-dashboard/5.5.2-step2/"
---

**Mục tiêu:** KPI và biểu đồ.

**Bối cảnh:** Đọc dữ liệu Athena, kiểm KPI/biểu đồ và tra cứu việc làm.

### Các bước thực hiện

| Nhóm | Nội dung |
| --- | --- |
| KPI tổng quan | Việc làm active, doanh nghiệp, tin công khai lương, kỹ năng |
| KPI so sánh tuần | Tin đăng mới, doanh nghiệp có tin đăng, tin công khai lương, kỹ năng được yêu cầu |

Bỏ bộ lọc, ghi thời điểm và đối chiếu **8 KPI** với cùng phạm vi dữ liệu. So sánh tuần dùng ngày đăng của tin còn giữ trong hai khoảng 7 ngày.


> 📸 **[CẦN THÊM ẢNH 5.8-01]**
>
> Ảnh dashboard hiển thị đủ 8 KPI, khoảng ngày so sánh tuần và thời điểm dữ liệu.
>
> File: `5-8-01.png`



Plotly hiển thị bảy nhóm biểu đồ: ngày đăng, kỹ năng, địa điểm, doanh nghiệp, kinh nghiệm, cấp bậc và tỷ lệ công khai lương. Kiểm nhãn/trục/tooltip khi thay bộ lọc. Một tin có nhiều kỹ năng nên số lượt kỹ năng có thể lớn hơn số tin.

> 📸 **[CẦN THÊM ẢNH 5.8-02]**
>
> Ảnh các biểu đồ Plotly với nhãn/tooltip rõ; chia hai ảnh nếu cần để đọc được nội dung.
>
> File: `5-8-02.png`

### Kết quả mong đợi

Nhìn thấy 8 KPI và các biểu đồ tương ứng với phạm vi lọc.

### Source đối chiếu

- `dashboard/app.py`
- `dashboard/job_data.py`
- `dashboard/market_dashboard.py`
- `dashboard/weekly_metrics.py`
- `docs/WEEKLY_KPIS.md`

---

[← 5.8. Xây dựng Streamlit Dashboard](../) · [Mục lục Workshop](../../) · [Bước trước](../5.8.1-step1/) · [Bước tiếp →](../5.8.3-step3/)
