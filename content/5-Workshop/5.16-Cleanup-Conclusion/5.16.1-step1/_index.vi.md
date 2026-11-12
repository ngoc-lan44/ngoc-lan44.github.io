---
title: "Lập kế hoạch dọn tài nguyên an toàn"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.16.1. </b> "
aliases:
  - "/5-workshop/5.10-monitoring-results/5.10.6-step6/"
---

**Thực hiện tại:** AWS Console và danh sách tài nguyên dự án

### Mục tiêu

Xác định đúng phạm vi và thứ tự dọn khi hệ thống không còn dùng.

### Điều kiện đầu vào

Đã lưu báo cáo/backup, xác định dữ liệu cần giữ và người có quyền thực hiện.

### Các bước thực hiện

1. Ghi danh sách instance/volume, base/public stack, role, S3, Catalog, DynamoDB, log group và alarm của project.
2. Dừng lịch/worker trong đợt kết thúc sử dụng trước khi tháo hạ tầng.
3. Kiểm dependency và quyền quản lý của CloudFormation. Public stack chỉ sở hữu ingress; base stack không sở hữu bucket/table dữ liệu nền.
4. Kiểm extra inline policy CloudWatch do configure_monitoring.py thêm ngoài stack trước khi xóa role/stack.
5. Nếu tháo EC2, nhớ EBS có DeleteOnTermination theo template; lưu dữ liệu cần giữ trước.
6. Với S3/DynamoDB, chỉ xóa khi xác nhận dữ liệu không còn cần và kiểm deletion protection/PITR/versioning thực tế. Không dùng xóa đệ quy toàn bucket theo một prefix phỏng đoán.
7. Kiểm Billing/tài nguyên còn lại sau khi dọn. Stop EC2 không tự xóa EBS, S3 hoặc mọi khoản phí.

### Kiểm tra kết quả

Danh sách tài nguyên, dependency và dữ liệu cần giữ được xác định trước khi dọn.

---

[← 5.16. Dọn dẹp tài nguyên và kết luận](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.16.2-step2/)
