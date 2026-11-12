---
title: "Đồng bộ, làm sạch và xuất Parquet"
date: 2026-11-08
weight: 3
chapter: false
pre: " <b> 5.3. </b> "
aliases:
  - "/5-workshop/5.4-data-processing/"
  - "/5-workshop/5.4-data-processing/5.4.1-step1/"
  - "/5-workshop/5.4-data-processing/5.4.2-step2/"
  - "/5-workshop/5.4-data-processing/5.4.3-step3/"
  - "/5-workshop/5.4-data-processing/5.4.4-step4/"
  - "/5-workshop/5.4-data-processing/5.4.5-step5/"
  - "/5-workshop/5.4-data-processing/5.4.6-step6/"
  - "/4-workshop/4.4-data-processing/4.4.1-step1/"
  - "/4-workshop/4.4-data-processing/4.4.2-step2/"
  - "/4-workshop/4.4-data-processing/4.4.3-step3/"
  - "/4-workshop/4.4-data-processing/"
---

**Mục tiêu thực hành:** Hiểu cách giữ current/history, kiểm quy tắc chuẩn hóa và schema Parquet trên bản sao.

Dữ liệu thu thập được đồng bộ theo job_id, lưu lịch sử thay đổi, làm sạch và chuyển thành Parquet phục vụ phân tích.

**Thực hiện:** EC2, sử dụng artifact của cùng một run và bản sao dữ liệu để thực hành.

### Trước khi bắt đầu

**Đầu vào:** Current/history và artifact của một run; bản sao current để thử cleaner/exporter.

**Đầu ra:** Hiểu kết quả sync; có clean JSON và Parquet trên bản sao với số dòng/schema đã đối chiếu.

### Các bài thực hành

- [5.3.1. Đồng bộ Current và History](5.3.1-step1/)
- [5.3.2. Làm sạch và chuẩn hóa](5.3.2-step2/)
- [5.3.3. Xuất và kiểm tra Parquet](5.3.3-step3/)
- [5.3.4. Đối chiếu quy tắc chuẩn hóa](5.3.4-step4/)
- [5.3.5. Đọc schema và kiểm tính nhất quán](5.3.5-step5/)

### Kết quả mong đợi

Current, clean và Parquet của cùng run có số dòng bằng nhau; current có thể lớn hơn số tin vừa crawl. JSON xử lý trên EC2, Parquet phân tích được công bố lên S3 ở bước tiếp theo. Không upload bản thực hành tạm.

### Checklist

- [ ] Current/history cùng run, first_seen/last_seen được đối chiếu.
- [ ] NEW/UPDATED/UNCHANGED/EXPIRED đúng ý nghĩa trong source.
- [ ] Current, clean và Parquet bằng số dòng; schema phù hợp Athena.


### Source đối chiếu

- `processors/sync_itviec_current.py`
- `deploy/ec2/run_pipeline.py`
- `sql/create_itviec_active_jobs_v3_view.sql`
- `processors/clean_itviec.py`
- `dashboard/market_dashboard.py`
- `processors/export_itviec_parquet.py`

---

[← 5.2](../5.2-ITviec-Collection/) · [Mục lục](../) · [5.4 →](../5.4-S3-Glue-Athena/)
