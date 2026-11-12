---
title: "Dọn dẹp tài nguyên sau Workshop — chỉ hướng dẫn"
date: 2026-11-10
weight: 6
chapter: false
pre: " <b> 5.10.6. </b> "
---

Chỉ dọn khi đã kết thúc sử dụng hệ thống và xác định đúng tài nguyên của dự án. Trước hết lưu báo cáo, artifact cần thiết và backup dữ liệu cá nhân/cấu hình vào vị trí được phép; kiểm khả năng phục hồi vào thư mục mới. Không dùng backup source thay cho backup dữ liệu runtime.

Tiếp theo, lập danh sách EC2/EBS, S3, Glue/Athena, DynamoDB, CloudWatch và các stack/IAM liên quan. Dừng lịch pipeline/worker trước khi tháo hạ tầng để tránh tác vụ tiếp tục ghi. Xem dependency và deletion protection, chỉ xóa những tài nguyên được xác nhận không còn dùng; không dùng thao tác xóa đệ quy toàn bucket hoặc stack khi chưa kiểm phạm vi.

Sau dọn, kiểm Billing và tài nguyên còn phát sinh chi phí. Stop EC2 không tự xóa EBS hay dữ liệu S3. **Tài liệu này không thực thi thao tác dừng hoặc xóa tài nguyên.**

**Kiểm tra sau bước này:** Có danh sách tài nguyên/backup và thứ tự dọn an toàn, chưa thực thi xóa.

---

[← 5.10](../) · [Mục lục Workshop](../../) · [Bước trước](../5.10.5-step5/) · [Bước tiếp →](../5.10.7-step7/)
