---
title: "Operations Worker"
date: 2026-11-10
weight: 3
chapter: false
pre: " <b> 5.9.3. </b> "
---

Worker chỉ thực hiện allowlist restart_dashboard/retry_pipeline, kiểm lại ADMIN từ S3, hạn request 15 phút và trạng thái pending. Sau khi cài install_recovery.sh và kiểm worker mới bật auth.operations_enabled.

~~~bash
systemctl status vnjob-operations.timer --no-pager
journalctl -u vnjob-operations -n 80 --no-pager
~~~

Retry toàn pipeline có điều kiện, tối đa ba lượt/ngày và cách ít nhất 30 phút; khác retry GET trong collector. Lỗi parser, IAM, CAS hoặc nguồn chặn cần được xử lý theo nguyên nhân.

**Kiểm tra sau bước này:** Worker chỉ tiếp nhận thao tác allowlist và kiểm quyền/hạn request.

> 📸 **[CẦN THÊM ẢNH 5.9-03]**
>
> Ảnh Operations Worker timer/log và request/result của ADMIN thử, đối chiếu với trạng thái service/run thực tế.
>
> File: `5-9-03.png`

---

[← 5.9](../) · [Mục lục Workshop](../../) · [Bước trước](../5.9.2-step2/) · [Bước tiếp →](../5.9.4-step4/)
