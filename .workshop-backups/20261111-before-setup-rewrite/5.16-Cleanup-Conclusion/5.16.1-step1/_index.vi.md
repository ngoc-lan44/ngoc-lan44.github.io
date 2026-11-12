---
title: "Chuẩn bị backup và kiểm tra phục hồi"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.16.1. </b> "
---

**Mục tiêu:** Chuẩn bị backup và kiểm tra phục hồi.

**Bối cảnh:** Chuẩn bị backup, hướng dẫn dọn đúng tài nguyên và tổng kết phạm vi.

### Các bước thực hiện

Trước khi kết thúc sử dụng hoặc bảo trì, xác định dữ liệu cần giữ: runtime EC2, cấu hình riêng tư, tài khoản/hoạt động cá nhân, canonical S3 và moderation/audit DynamoDB. Backup source không thay thế backup dữ liệu.

Công cụ của project hỗ trợ backup và verify-restore. Các lệnh dưới là hướng dẫn cho phiên diễn tập riêng; thay đường dẫn bằng thư mục riêng tư đã chuẩn bị, file ZIP mới và thư mục restore chưa tồn tại:

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python deploy/ec2/backup_data.py backup /duong-dan-rieng/backup-moi.zip
sudo -u vnjob .venv/bin/python deploy/ec2/backup_data.py verify-restore /duong-dan-rieng/backup-moi.zip --destination /duong-dan-rieng/restore-thu-moi
~~~

Tùy chọn --s3-bucket ở lệnh backup lấy thêm dữ liệu S3 theo phạm vi công cụ. Đọc manifest, số file và checksum, sau đó đối chiếu JSON/Parquet trên bản khôi phục. Công cụ từ chối archive trùng và destination đã tồn tại; không tự promote dữ liệu lên production.

Backup này không tạo transaction nhất quán xuyên EC2, S3 và DynamoDB, không tự khôi phục toàn bộ bảng moderation/audit. Kế hoạch bảo vệ DynamoDB cần kiểm riêng theo tài nguyên và trạng thái AWS thực tế.

### Kết quả mong đợi

Danh sách dữ liệu cần giữ rõ ràng, có kế hoạch verify-restore vào vị trí mới; không ghi đè production hoặc thực thi dọn tài nguyên trong lần viết tài liệu.

### Source đối chiếu

- `deploy/ec2/backup_data.py`
- `docs/OPERATIONS_RUNBOOK.md`
- `docs/EC2_DEPLOYMENT_2026-11-02.md`

---

[← 5.16. Dọn dẹp tài nguyên và kết luận](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.16.2-step2/)
