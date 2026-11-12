---
title: "Phân biệt lỗi state và lỗi projection"
date: 2026-11-11T00:00:00+07:00
weight: 5
chapter: false
pre: " <b> 5.10.5. </b> "
aliases:
  - "/5-workshop/5.7-administration/5.7.5-step5/"
---

**Mục tiêu:** Phân biệt lỗi state và lỗi projection.

**Bối cảnh:** Quản lý tài khoản, xóa mềm/khôi phục và đối chiếu projection/audit.

### Các bước thực hiện

Nếu transaction DynamoDB thất bại, chưa coi Delete/Restore hoàn tất. Nếu state và audit đã commit nhưng snapshot S3 chưa cập nhật, đọc journal Projection Worker và xử lý quyền/kết nối rồi chờ đồng bộ lại. Không lặp Delete để tạo thêm audit cho cùng một sự cố publication.

Sau Restore, kiểm lại điều kiện hết hạn và cache: một tin hết hạn không trở thành active chỉ nhờ gỡ moderation. Khi chứng minh việc ẩn tin, dùng cả kiểm tra public và truy vấn leaked_deleted_jobs ở mục 5.7. Ảnh UI riêng lẻ chưa chứng minh dữ liệu đã hội tụ ở Athena.

PITR và deletion protection cần được đọc từ Console/API hiện tại; không đánh dấu đã bật chỉ vì project có script cấu hình bảo vệ dữ liệu.

### Kết quả mong đợi

Lỗi projection được phân biệt với lỗi transaction; Restore vẫn tuân điều kiện active.

### Source đối chiếu

- `dashboard/job_management.py`
- `dashboard/dynamo_moderation_store.py`
- `dashboard/moderation_projection.py`
- `dashboard/sync_moderation_projection.py`
- `deploy/ec2/projection.timer`
- `docs/SOFT_DELETE_PHASE3.md`

---

[← 5.10. Quản trị và kiểm duyệt bằng DynamoDB](../) · [Mục lục Workshop](../../) · [Bước trước](../5.10.4-step4/)
