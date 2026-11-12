---
title: "Kết nối nguồn dữ liệu và khởi chạy ứng dụng"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.9.1. </b> "
aliases:
  - "/5-workshop/5.8-streamlit-dashboard/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.1-step1/"
  - "/5-workshop/5.5-streamlit-dashboard/"
  - "/5-workshop/5.5-streamlit-dashboard/5.5.1-step1/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.6-step6/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.7-step7/"
  - "/4-workshop/4.8-streamlit-dashboard/4.8.1-step1/"
  - "/4-workshop/4.8-streamlit-dashboard/4.8.2-step2/"
  - "/4-workshop/4.8-streamlit-dashboard/4.8.3-step3/"
  - "/4-workshop/4.8-streamlit-dashboard/"
---

**Thực hiện tại:** SSM trên EC2

### Mục tiêu

Đưa app.py vào service với quyền đọc Athena/S3/DynamoDB.

### Điều kiện đầu vào

Parquet/public views, secrets và IAM đã sẵn sàng.

### Các bước thực hiện

dashboard/job_data.py cấu hình Region ap-southeast-1, database vn_it_job_market và result location control/athena-results/. Với backend DynamoDB, ứng dụng đọc alias itviec_active_jobs và itviec_active_job_skills, đồng thời kiểm moderation trực tiếp.

1. Đối chiếu [auth]/[moderation] trong secrets theo 5.5 và bước tài khoản 5.10.
2. Kiểm unit dashboard dùng .venv Linux và entrypoint dashboard/app.py.
3. Sau khi lưu cấu hình, khởi động lại ứng dụng:

~~~bash
sudo systemctl restart vnjob-dashboard.service
sudo systemctl status vnjob-dashboard.service --no-pager
curl --fail http://127.0.0.1:8501/_stcore/health
sudo journalctl -u vnjob-dashboard.service -n 80 --no-pager
~~~

Trước HTTPS, dùng SSM tunnel theo deploy/ec2/open_private.ps1 nếu công cụ Session Manager plugin đã được chuẩn bị; sau 5.11 dùng URL HTTPS hiện tại. Không mở public 8501 để bỏ qua reverse proxy. Reader có timeout 90 giây, phân trang và chuyển kiểu; cache jobs/skills 300 giây.

### Kiểm tra kết quả

App đọc được dữ liệu bằng role EC2; health và UI có kết quả, lỗi quyền được xử lý ở IAM/config.

---

[← 5.9. Cấu hình và triển khai Streamlit Dashboard](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.9.2-step2/)
