---
title: "Dọn dẹp tài nguyên sau Workshop — chỉ hướng dẫn"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.16.2. </b> "
aliases:
  - "/5-workshop/5.10-monitoring-results/5.10.6-step6/"
---

**Mục tiêu:** Dọn dẹp tài nguyên sau Workshop — chỉ hướng dẫn.

**Bối cảnh:** Chuẩn bị backup, hướng dẫn dọn đúng tài nguyên và tổng kết phạm vi.

### Các bước thực hiện

Chỉ dọn khi đã kết thúc sử dụng hệ thống và xác định đúng tài nguyên của dự án. Trước hết lưu báo cáo, artifact cần thiết và backup dữ liệu cá nhân/cấu hình vào vị trí được phép; kiểm khả năng phục hồi vào thư mục mới. Không dùng backup source thay cho backup dữ liệu runtime.

Tiếp theo, lập danh sách EC2/EBS, S3, Glue/Athena, DynamoDB, CloudWatch và các stack/IAM liên quan. Dừng lịch pipeline/worker trước khi tháo hạ tầng để tránh tác vụ tiếp tục ghi. Xem dependency và deletion protection, chỉ xóa những tài nguyên được xác nhận không còn dùng; không dùng thao tác xóa đệ quy toàn bucket hoặc stack khi chưa kiểm phạm vi.

Sau dọn, kiểm Billing và tài nguyên còn phát sinh chi phí. Stop EC2 không tự xóa EBS hay dữ liệu S3. **Tài liệu này không thực thi thao tác dừng hoặc xóa tài nguyên.**

### Kết quả mong đợi

Có danh sách tài nguyên/backup và thứ tự dọn an toàn, chưa thực thi xóa.

### Source đối chiếu

- `deploy/ec2/backup_data.py`
- `docs/OPERATIONS_RUNBOOK.md`
- `docs/EC2_DEPLOYMENT_2026-11-02.md`

---

[← 5.16. Dọn dẹp tài nguyên và kết luận](../) · [Mục lục Workshop](../../) · [Bước trước](../5.16.1-step1/) · [Bước tiếp →](../5.16.3-step3/)
