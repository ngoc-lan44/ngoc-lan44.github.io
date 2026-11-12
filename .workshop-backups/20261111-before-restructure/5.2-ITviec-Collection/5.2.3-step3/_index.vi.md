---
title: "Kiểm tra toàn lượt thu thập"
date: 2026-11-10
weight: 3
chapter: false
pre: " <b> 5.2.3. </b> "
---

`deploy/ec2/run_pipeline.py` điều phối tất cả batch, kiểm số lượng, liên kết discovery và job_id duy nhất. Sau khi hợp lệ, runner tạo `data/runs/<run_id>/validated_snapshot.json` và chuyển sang ETL. Hai lệnh chạy rời ở trên chỉ minh họa thành phần; các mục tiếp theo dùng artifact của một run hoàn chỉnh.

Checkpoint tại `data/control/crawl/` lưu theo checksum discovery và dùng lại kết quả URL tối đa 6 giờ; discovery reuse còn yêu cầu cùng ngày Việt Nam. Retry mạng/5xx có giới hạn; 403/429 dừng để xử lý. Runner chặn độ phủ dưới 60% baseline các lượt thành công gần nhất khi có baseline.

**Kiểm tra sau bước này:** Runner xác nhận toàn lượt trước khi tạo đầu vào ETL.

---

[← 5.2](../) · [Mục lục Workshop](../../) · [Bước trước](../5.2.2-step2/) · [Bước tiếp →](../5.2.4-step4/)
