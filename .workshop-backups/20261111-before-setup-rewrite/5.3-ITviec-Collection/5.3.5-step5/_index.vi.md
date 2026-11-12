---
title: "Xử lý thu thập gián đoạn"
date: 2026-11-11T00:00:00+07:00
weight: 5
chapter: false
pre: " <b> 5.3.5. </b> "
aliases:
  - "/5-workshop/5.2-itviec-collection/5.2.5-step5/"
---

**Mục tiêu:** Xử lý thu thập gián đoạn.

**Bối cảnh:** Theo dấu discovery, batch và snapshot được kiểm tra trước ETL.

### Các bước thực hiện

Nếu request lỗi, đọc failed_pages hoặc metadata batch và journal cùng thời điểm. Retry mạng/5xx có giới hạn; khi gặp 403/429 cần dừng, đánh giá điều kiện truy cập nguồn thay vì tăng số request. Checkpoint chỉ được tái sử dụng khi còn thỏa điều kiện của source, không phải dữ liệu dự phòng vô thời hạn.

Khi lập bảng kết quả, ghi **run_id, số URL duy nhất, số batch, số thành công/thất bại và trạng thái cuối**. Chỉ ghi số thực tế từ artifact; không dùng số 660 trong biên bản cũ làm số kỳ vọng cố định cho mọi lần quét.

### Kết quả mong đợi

Sự cố được ghi theo metadata/journal; không ghép batch khác lượt để hợp thức hóa kết quả.

### Source đối chiếu

- `collectors/discover_itviec_jobs.py`
- `collectors/itviec_batch_collector.py`
- `collectors/crawl_support.py`
- `collectors/extract_itviec_job.py`
- `deploy/ec2/run_pipeline.py`

---

[← 5.3. Thu thập dữ liệu tuyển dụng từ ITviec](../) · [Mục lục Workshop](../../) · [Bước trước](../5.3.4-step4/)
