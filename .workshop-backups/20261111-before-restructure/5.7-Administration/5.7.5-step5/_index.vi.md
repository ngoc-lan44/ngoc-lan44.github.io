---
title: "Phân biệt lỗi state và lỗi projection"
date: 2026-11-10
weight: 5
chapter: false
pre: " <b> 5.7.5. </b> "
---

Nếu transaction DynamoDB thất bại, chưa coi Delete/Restore hoàn tất. Nếu state và audit đã commit nhưng snapshot S3 chưa cập nhật, đọc journal Projection Worker và xử lý quyền/kết nối rồi chờ đồng bộ lại. Không lặp Delete để tạo thêm audit cho cùng một sự cố publication.

Sau Restore, kiểm lại điều kiện hết hạn và cache: một tin hết hạn không trở thành active chỉ nhờ gỡ moderation. Khi chứng minh việc ẩn tin, dùng cả kiểm tra public và truy vấn leaked_deleted_jobs ở mục 5.4. Ảnh UI riêng lẻ chưa chứng minh dữ liệu đã hội tụ ở Athena.

PITR và deletion protection cần được đọc từ Console/API hiện tại; không đánh dấu đã bật chỉ vì project có script cấu hình bảo vệ dữ liệu.

**Kiểm tra sau bước này:** Lỗi projection được phân biệt với lỗi transaction; Restore vẫn tuân điều kiện active.

---

[← 5.7](../) · [Mục lục Workshop](../../) · [Bước trước](../5.7.4-step4/)
