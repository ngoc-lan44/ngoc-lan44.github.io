---
title: "Xóa mềm, khôi phục và đồng bộ snapshot"
date: 2026-11-10
weight: 3
chapter: false
pre: " <b> 5.7.3. </b> "
---

1. Trong **Quản lý việc làm**, chọn tin thử và ghi job_id.
2. Xóa mềm với lý do/xác nhận; kiểm **Việc làm đã xóa**, audit và dashboard public.
3. Khôi phục cùng tin; đối chiếu action/reason/revision và kết quả công khai sau đồng bộ. Tin nguồn đã hết hạn không trở thành active chỉ nhờ Restore.

Projection Worker đọc DynamoDB, xuất `control/moderation/job_moderation.json` lên S3 với schema_version=2, backend=DYNAMODB và revision. Timer hai phút chạy độc lập dashboard; ETag/revision ngăn snapshot cũ ghi đè mới.

~~~bash
systemctl status vnjob-projection.timer --no-pager
journalctl -u vnjob-projection -n 80 --no-pager
~~~

**Kiểm tra sau bước này:** Delete/Restore có audit và kết quả projection cùng job_id.

> 📸 **[CẦN THÊM ẢNH 5.7-03]**
>
> Ảnh cùng job_id khi Delete/Restore, audit tương ứng và log/snapshot revision sau Projection Worker đồng bộ.
>
> File: `5-7-03.png`

---

[← 5.7](../) · [Mục lục Workshop](../../) · [Bước trước](../5.7.2-step2/) · [Bước tiếp →](../5.7.4-step4/)
