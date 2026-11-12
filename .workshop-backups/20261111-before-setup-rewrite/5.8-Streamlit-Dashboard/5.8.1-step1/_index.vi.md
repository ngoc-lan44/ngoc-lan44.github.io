---
title: "Kết nối dữ liệu"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.8.1. </b> "
aliases:
  - "/5-workshop/5.5-streamlit-dashboard/5.5.1-step1/"
---

**Mục tiêu:** Kết nối dữ liệu.

**Bối cảnh:** Đọc dữ liệu Athena, kiểm KPI/biểu đồ và tra cứu việc làm.

### Các bước thực hiện

`app.py` định tuyến, `job_data.py` đọc Athena, `market_dashboard.py` hiển thị và `weekly_metrics.py` tính chỉ số tuần. Reader có timeout, phân trang, chuyển kiểu và cache; ứng dụng còn kiểm moderation DynamoDB.

~~~bash
systemctl status vnjob-dashboard --no-pager
curl --fail http://127.0.0.1:8501/_stcore/health
journalctl -u vnjob-dashboard -n 100 --no-pager
~~~

Mở HTTPS hiện tại để kiểm dữ liệu trên UI. Health xác nhận Streamlit hoạt động; lỗi Athena/S3 được đối chiếu qua journal và IAM Role.

### Kết quả mong đợi

Service/health nội bộ hoạt động; trang đọc dữ liệu không có lỗi kết nối.

### Source đối chiếu

- `dashboard/app.py`
- `dashboard/job_data.py`
- `dashboard/market_dashboard.py`
- `dashboard/weekly_metrics.py`
- `docs/WEEKLY_KPIS.md`

---

[← 5.8. Xây dựng Streamlit Dashboard](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.8.2-step2/)
