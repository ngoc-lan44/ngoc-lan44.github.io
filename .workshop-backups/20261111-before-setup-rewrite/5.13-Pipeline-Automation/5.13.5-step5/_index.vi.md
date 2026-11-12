---
title: "Quy trình xử lý yêu cầu phục hồi"
date: 2026-11-11T00:00:00+07:00
weight: 5
chapter: false
pre: " <b> 5.13.5. </b> "
aliases:
  - "/5-workshop/5.9-pipeline-automation/5.9.5-step5/"
---

**Mục tiêu:** Quy trình xử lý yêu cầu phục hồi.

**Bối cảnh:** Kiểm lịch 02:00, chạy bù và kết quả phục hồi có kiểm soát.

### Các bước thực hiện

1. ADMIN đọc lỗi và xác định dashboard lỗi hay pipeline lỗi; không gửi Retry chỉ để làm mới biểu đồ.
2. Gửi đúng thao tác có sẵn trên Trạng thái hệ thống. Worker xác minh tài khoản, quyền, hạn yêu cầu và trạng thái trước khi chạy.
3. Đối chiếu log Operations Worker với service đích. Với retry pipeline, tiếp tục theo dõi đến trạng thái cuối và published.
4. Ghi kết quả, thời điểm và run_id vào biên bản, kể cả khi tác vụ không thành công.

Retry toàn pipeline khác retry HTTP của collector. Giới hạn ba lượt/ngày và khoảng cách 30 phút không loại bỏ yêu cầu xử lý nguyên nhân. Lỗi quyền, parser hoặc xung đột canonical không được khắc phục bằng việc gửi lặp yêu cầu. Chỉ bật auto-retry và quyền operations sau khi cấu hình/worker đã được kiểm tra phù hợp.

### Kết quả mong đợi

Yêu cầu phục hồi được theo dõi đến service/run cuối, giữ nguyên giới hạn retry.

### Source đối chiếu

- `deploy/ec2/pipeline.service`
- `deploy/ec2/pipeline.timer`
- `deploy/ec2/run_pipeline.py`
- `deploy/ec2/operations_worker.py`
- `deploy/ec2/install_recovery.sh`
- `docs/OPERATIONS_RUNBOOK.md`

---

[← 5.13. Tự động hóa pipeline và Operations Worker](../) · [Mục lục Workshop](../../) · [Bước trước](../5.13.4-step4/)
