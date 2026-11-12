---
title: "Thu thập dữ liệu tuyển dụng từ ITviec"
date: 2026-11-08
weight: 2
chapter: false
pre: " <b> 5.2. </b> "
aliases:
  - "/5-workshop/5.3-itviec-collection/"
  - "/5-workshop/5.3-itviec-collection/5.3.1-step1/"
  - "/5-workshop/5.3-itviec-collection/5.3.2-step2/"
  - "/5-workshop/5.3-itviec-collection/5.3.3-step3/"
  - "/5-workshop/5.3-itviec-collection/5.3.4-step4/"
  - "/5-workshop/5.3-itviec-collection/5.3.5-step5/"
  - "/4-workshop/4.3-itviec-collection/4.3.1-step1/"
  - "/4-workshop/4.3-itviec-collection/4.3.2-step2/"
  - "/4-workshop/4.3-itviec-collection/4.3.3-step3/"
  - "/4-workshop/4.3-itviec-collection/"
---

**Mục tiêu thực hành:** Theo dấu discovery → batch → snapshot hợp lệ và đánh giá chất lượng lượt thu thập.

Pipeline bắt đầu bằng việc tìm URL trên ITviec, thu thập chi tiết theo batch và kiểm tra dữ liệu trước khi chuyển sang ETL.

**Thực hiện:** terminal SSM trên EC2, thư mục `/opt/vn-it-job-market`.

### Trước khi bắt đầu

**Đầu vào:** Runtime EC2 đã kiểm ở 5.1; discovery/batch hiện có hoặc một đợt thu thập mới được bố trí riêng.

**Đầu ra:** Discovery, batch và snapshot hợp lệ của cùng run; chuyển sang đồng bộ/ETL ở 5.3.

### Các bài thực hành

- [5.2.1. Khám phá và chuẩn hóa URL](5.2.1-step1/)
- [5.2.2. Thu thập chi tiết theo batch](5.2.2-step2/)
- [5.2.3. Kiểm tra toàn lượt thu thập](5.2.3-step3/)
- [5.2.4. Đọc dữ liệu một tin trước khi chuyển ETL](5.2.4-step4/)
- [5.2.5. Xử lý thu thập gián đoạn](5.2.5-step5/)

### Kết quả mong đợi

Có discovery, batch và run_id truy vết được; dữ liệu chỉ vào ETL sau kiểm tra. Collector chạy rời không được khóa của runner bảo vệ, vì vậy không chạy chồng timer/worker.

### Checklist

- [ ] Discovery có URL duy nhất, coverage_checked=true và không có failed_pages.
- [ ] Batch khớp discovery; số thành công/thất bại và completion hợp lệ.
- [ ] Có run_id/aggregate của lượt đầy đủ để chuyển ETL.


### Source đối chiếu

- `collectors/discover_itviec_jobs.py`
- `collectors/crawl_support.py`
- `deploy/ec2/run_pipeline.py`
- `collectors/itviec_batch_collector.py`
- `collectors/itviec_collector.py`
- `collectors/extract_itviec_job.py`

---

[← 5.1](../5.1-Overview/) · [Mục lục](../) · [5.3 →](../5.3-Data-Processing/)
