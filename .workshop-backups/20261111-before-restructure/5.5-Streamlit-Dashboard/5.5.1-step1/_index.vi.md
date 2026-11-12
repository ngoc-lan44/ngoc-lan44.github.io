---
title: "Kết nối dữ liệu"
date: 2026-11-10
weight: 1
chapter: false
pre: " <b> 5.5.1. </b> "
---

`app.py` định tuyến, `job_data.py` đọc Athena, `market_dashboard.py` hiển thị và `weekly_metrics.py` tính chỉ số tuần. Reader có timeout, phân trang, chuyển kiểu và cache; ứng dụng còn kiểm moderation DynamoDB.

~~~bash
systemctl status vnjob-dashboard --no-pager
curl --fail http://127.0.0.1:8501/_stcore/health
journalctl -u vnjob-dashboard -n 100 --no-pager
~~~

Mở HTTPS hiện tại để kiểm dữ liệu trên UI. Health xác nhận Streamlit hoạt động; lỗi Athena/S3 được đối chiếu qua journal và IAM Role.

**Kiểm tra sau bước này:** Service/health nội bộ hoạt động; trang đọc dữ liệu không có lỗi kết nối.

---

[← 5.5](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.5.2-step2/)
