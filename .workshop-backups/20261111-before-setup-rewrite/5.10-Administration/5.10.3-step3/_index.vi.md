---
title: "Xóa mềm, khôi phục và đồng bộ snapshot"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.10.3. </b> "
aliases:
  - "/5-workshop/5.7-administration/5.7.3-step3/"
---

**Mục tiêu:** Xóa mềm, khôi phục và đồng bộ snapshot.

**Bối cảnh:** Quản lý tài khoản, xóa mềm/khôi phục và đối chiếu projection/audit.

### Các bước thực hiện

1. Trong **Quản lý việc làm**, chọn tin thử và ghi job_id.
2. Xóa mềm với lý do/xác nhận; kiểm **Việc làm đã xóa**, audit và dashboard public.
3. Khôi phục cùng tin; đối chiếu action/reason/revision và kết quả công khai sau đồng bộ. Tin nguồn đã hết hạn không trở thành active chỉ nhờ Restore.

Projection Worker đọc DynamoDB, xuất `control/moderation/job_moderation.json` lên S3 với schema_version=2, backend=DYNAMODB và revision. Timer hai phút chạy độc lập dashboard; ETag/revision ngăn snapshot cũ ghi đè mới.

~~~bash
systemctl status vnjob-projection.timer --no-pager
journalctl -u vnjob-projection -n 80 --no-pager
~~~


> 📸 **[CẦN THÊM ẢNH 5.10-03]**
>
> Ảnh cùng job_id khi Delete/Restore, audit tương ứng và log/snapshot revision sau Projection Worker đồng bộ.
>
> File: `5-10-03.png`

### Kết quả mong đợi

Delete/Restore có audit và kết quả projection cùng job_id.

### Source đối chiếu

- `dashboard/job_management.py`
- `dashboard/dynamo_moderation_store.py`
- `dashboard/moderation_projection.py`
- `dashboard/sync_moderation_projection.py`
- `deploy/ec2/projection.timer`
- `docs/SOFT_DELETE_PHASE3.md`

---

[← 5.10. Quản trị và kiểm duyệt bằng DynamoDB](../) · [Mục lục Workshop](../../) · [Bước trước](../5.10.2-step2/) · [Bước tiếp →](../5.10.4-step4/)
