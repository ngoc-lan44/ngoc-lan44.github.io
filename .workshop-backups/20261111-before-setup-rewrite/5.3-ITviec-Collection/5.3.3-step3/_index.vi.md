---
title: "Kiểm tra toàn lượt thu thập"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.3.3. </b> "
aliases:
  - "/5-workshop/5.2-itviec-collection/5.2.3-step3/"
---

**Mục tiêu:** Kiểm tra toàn lượt thu thập.

**Bối cảnh:** Theo dấu discovery, batch và snapshot được kiểm tra trước ETL.

### Các bước thực hiện

`deploy/ec2/run_pipeline.py` điều phối tất cả batch, kiểm số lượng, liên kết discovery và job_id duy nhất. Sau khi hợp lệ, runner tạo `data/runs/<run_id>/validated_snapshot.json` và chuyển sang ETL. Discovery tạo danh sách URL; collector xử lý chi tiết theo từng batch. Runner sử dụng kết quả của tất cả batch thuộc cùng discovery để kiểm tra toàn lượt. Các bước ETL tiếp theo sử dụng validated_snapshot.json của run đã vượt qua kiểm tra.

Checkpoint tại `data/control/crawl/` lưu theo checksum discovery và dùng lại kết quả URL tối đa 6 giờ; discovery reuse còn yêu cầu cùng ngày Việt Nam. Retry mạng/5xx có giới hạn; 403/429 dừng để xử lý. Runner chặn độ phủ dưới 60% baseline các lượt thành công gần nhất khi có baseline.

### Kết quả mong đợi

Runner xác nhận toàn lượt trước khi tạo đầu vào ETL.

### Source đối chiếu

- `collectors/discover_itviec_jobs.py`
- `collectors/itviec_batch_collector.py`
- `collectors/crawl_support.py`
- `collectors/extract_itviec_job.py`
- `deploy/ec2/run_pipeline.py`

---

[← 5.3. Thu thập dữ liệu tuyển dụng từ ITviec](../) · [Mục lục Workshop](../../) · [Bước trước](../5.3.2-step2/) · [Bước tiếp →](../5.3.4-step4/)
