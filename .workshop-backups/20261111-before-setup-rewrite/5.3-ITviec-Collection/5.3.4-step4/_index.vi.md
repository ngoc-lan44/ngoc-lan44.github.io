---
title: "Đọc dữ liệu một tin trước khi chuyển ETL"
date: 2026-11-11T00:00:00+07:00
weight: 4
chapter: false
pre: " <b> 5.3.4. </b> "
aliases:
  - "/5-workshop/5.2-itviec-collection/5.2.4-step4/"
---

**Mục tiêu:** Đọc dữ liệu một tin trước khi chuyển ETL.

**Bối cảnh:** Theo dấu discovery, batch và snapshot được kiểm tra trước ETL.

### Các bước thực hiện

Mở một JSON batch đã hoàn tất, chọn một tin và đối chiếu với trang ITviec tương ứng. Kiểm tiêu đề, doanh nghiệp, URL, địa điểm, kỹ năng, ngày đăng và thông tin lương nếu nguồn công khai. Dùng job_id để theo dấu tin trong các bước sau; không dùng tiêu đề làm khóa vì nhiều tin có thể cùng tên.

| Kiểm tra | Cách đánh giá |
| --- | --- |
| Đúng nguồn | URL thuộc ITviec và mở đúng tin đã thu thập |
| Đúng discovery | discovery_file của batch trỏ đến đầu vào đã chọn |
| Đủ batch | Tổng hợp toàn bộ batch, kể cả batch cuối ít hơn 25 tin |
| Không trùng | URL sau canonical và job_id trong snapshot hợp lệ phải duy nhất |
| Trường thiếu | Phân biệt nguồn không công khai dữ liệu với lỗi trích xuất |

Một batch hoàn tất chưa chứng minh toàn lượt hoàn tất. Chỉ dùng validated_snapshot.json khi runner đã xác nhận các batch liên quan hợp lệ. Không ghép thủ công batch thuộc discovery khác để bù số lượng.

### Kết quả mong đợi

Một job_id được đối chiếu với đúng trang ITviec và dữ liệu batch.

### Source đối chiếu

- `collectors/discover_itviec_jobs.py`
- `collectors/itviec_batch_collector.py`
- `collectors/crawl_support.py`
- `collectors/extract_itviec_job.py`
- `deploy/ec2/run_pipeline.py`

---

[← 5.3. Thu thập dữ liệu tuyển dụng từ ITviec](../) · [Mục lục Workshop](../../) · [Bước trước](../5.3.3-step3/) · [Bước tiếp →](../5.3.5-step5/)
