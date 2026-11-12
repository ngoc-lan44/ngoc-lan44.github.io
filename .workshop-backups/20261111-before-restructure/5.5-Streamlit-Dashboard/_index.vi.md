---
title: "Dashboard Streamlit và trực quan hóa"
date: 2026-11-08
weight: 5
chapter: false
pre: " <b> 5.5. </b> "
aliases:
  - "/5-workshop/5.8-streamlit-dashboard/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.1-step1/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.2-step2/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.3-step3/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.4-step4/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.5-step5/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.6-step6/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.7-step7/"
  - "/4-workshop/4.8-streamlit-dashboard/4.8.1-step1/"
  - "/4-workshop/4.8-streamlit-dashboard/4.8.2-step2/"
  - "/4-workshop/4.8-streamlit-dashboard/4.8.3-step3/"
  - "/4-workshop/4.8-streamlit-dashboard/"
---

**Mục tiêu thực hành:** Kiểm kết nối Athena, KPI, biểu đồ, bộ lọc và chi tiết việc làm trên website.

Dashboard sử dụng dữ liệu Athena để trình bày tình hình tuyển dụng và hỗ trợ tra cứu tin ITviec.

**Giao diện:** mở Dashboard → Tổng quan thị trường qua HTTPS hiện tại.

### Trước khi bắt đầu

**Đầu vào:** Website HTTPS và nguồn Athena/view ở 5.4 đã kiểm tra.

**Đầu ra:** Dashboard có bằng chứng về KPI, biểu đồ, lọc và chi tiết trên cùng phạm vi dữ liệu.

### Các bài thực hành

- [5.5.1. Kết nối dữ liệu](5.5.1-step1/)
- [5.5.2. KPI và biểu đồ](5.5.2-step2/)
- [5.5.3. Tìm kiếm, lọc và xem chi tiết](5.5.3-step3/)
- [5.5.4. Đối chiếu KPI và cách đọc biểu đồ](5.5.4-step4/)
- [5.5.5. Kiểm tra dữ liệu rỗng và hiệu lực cache](5.5.5-step5/)

### Kết quả mong đợi

Người xem theo dõi được chỉ số, lọc và mở đúng tin. Phân tích phản ánh tập dữ liệu ITviec đang được giữ; không suy rộng thành toàn bộ lịch sử thị trường.

### Checklist

- [ ] Dashboard hiển thị 8 KPI và các nhóm biểu đồ hiện có.
- [ ] Bộ lọc áp dụng thống nhất cho KPI, chart và bảng.
- [ ] Chi tiết và URL ITviec khớp tin đã chọn.


### Source đối chiếu

- `dashboard/app.py`
- `dashboard/market_dashboard.py`
- `dashboard/job_data.py`
- `dashboard/weekly_metrics.py`
- `dashboard/aws_clients.py`
- `deploy/ec2/streamlit.service`

---

[← 5.4](../5.4-S3-Glue-Athena/) · [Mục lục](../) · [5.6 →](../5.6-User-Features/)
