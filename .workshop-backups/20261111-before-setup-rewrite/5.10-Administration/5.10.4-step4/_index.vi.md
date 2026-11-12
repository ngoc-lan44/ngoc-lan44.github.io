---
title: "Theo dấu một thao tác kiểm duyệt"
date: 2026-11-11T00:00:00+07:00
weight: 4
chapter: false
pre: " <b> 5.10.4. </b> "
aliases:
  - "/5-workshop/5.7-administration/5.7.4-step4/"
---

**Mục tiêu:** Theo dấu một thao tác kiểm duyệt.

**Bối cảnh:** Quản lý tài khoản, xóa mềm/khôi phục và đối chiếu projection/audit.

### Các bước thực hiện

Ghi job_id trước thao tác và giữ cùng mã này khi kiểm các lớp sau:

| Lớp | Nội dung cần đối chiếu |
| --- | --- |
| Giao diện ADMIN | Tin được chọn, lý do và kết quả thao tác |
| DynamoDB state | Trạng thái moderation hiện tại của tin |
| DynamoDB audit | Sự kiện, người thao tác, thời điểm và revision liên quan |
| S3 snapshot | schema_version=2, backend=DYNAMODB và revision sau projection |
| Athena/UI công khai | Tin bị ẩn không xuất hiện; tin khôi phục chỉ xuất hiện nếu vẫn đủ điều kiện active |

Trong Console DynamoDB, mở Explore table items theo khóa của bảng để kiểm bản ghi liên quan, tránh quét toàn bộ bảng chỉ để tìm một thao tác. Không sửa trực tiếp item để tạo bằng chứng nghiệm thu vì sẽ bỏ qua kiểm tra của ứng dụng.

### Kết quả mong đợi

Có bằng chứng từ UI, state, audit, snapshot và Athena cho cùng thao tác.

### Source đối chiếu

- `dashboard/job_management.py`
- `dashboard/dynamo_moderation_store.py`
- `dashboard/moderation_projection.py`
- `dashboard/sync_moderation_projection.py`
- `deploy/ec2/projection.timer`
- `docs/SOFT_DELETE_PHASE3.md`

---

[← 5.10. Quản trị và kiểm duyệt bằng DynamoDB](../) · [Mục lục Workshop](../../) · [Bước trước](../5.10.3-step3/) · [Bước tiếp →](../5.10.5-step5/)
