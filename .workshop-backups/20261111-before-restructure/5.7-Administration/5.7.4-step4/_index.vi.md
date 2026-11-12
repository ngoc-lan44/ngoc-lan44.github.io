---
title: "Theo dấu một thao tác kiểm duyệt"
date: 2026-11-10
weight: 4
chapter: false
pre: " <b> 5.7.4. </b> "
---

Ghi job_id trước thao tác và giữ cùng mã này khi kiểm các lớp sau:

| Lớp | Nội dung cần đối chiếu |
| --- | --- |
| Giao diện ADMIN | Tin được chọn, lý do và kết quả thao tác |
| DynamoDB state | Trạng thái moderation hiện tại của tin |
| DynamoDB audit | Sự kiện, người thao tác, thời điểm và revision liên quan |
| S3 snapshot | schema_version=2, backend=DYNAMODB và revision sau projection |
| Athena/UI công khai | Tin bị ẩn không xuất hiện; tin khôi phục chỉ xuất hiện nếu vẫn đủ điều kiện active |

Trong Console DynamoDB, mở Explore table items theo khóa của bảng để kiểm bản ghi liên quan, tránh quét toàn bộ bảng chỉ để tìm một thao tác. Không sửa trực tiếp item để tạo bằng chứng nghiệm thu vì sẽ bỏ qua kiểm tra của ứng dụng.

**Kiểm tra sau bước này:** Có bằng chứng từ UI, state, audit, snapshot và Athena cho cùng thao tác.

---

[← 5.7](../) · [Mục lục Workshop](../../) · [Bước trước](../5.7.3-step3/) · [Bước tiếp →](../5.7.5-step5/)
