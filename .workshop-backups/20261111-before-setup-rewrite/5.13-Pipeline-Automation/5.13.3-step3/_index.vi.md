---
title: "Operations Worker"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.13.3. </b> "
aliases:
  - "/5-workshop/5.9-pipeline-automation/5.9.3-step3/"
---

**Mục tiêu:** Operations Worker.

**Bối cảnh:** Kiểm lịch 02:00, chạy bù và kết quả phục hồi có kiểm soát.

### Các bước thực hiện

Worker chỉ thực hiện allowlist restart_dashboard/retry_pipeline, kiểm lại ADMIN từ S3, hạn request 15 phút và trạng thái pending. Sau khi cài install_recovery.sh và kiểm worker mới bật auth.operations_enabled.

~~~bash
systemctl status vnjob-operations.timer --no-pager
journalctl -u vnjob-operations -n 80 --no-pager
~~~

Retry toàn pipeline có điều kiện, tối đa ba lượt/ngày và cách ít nhất 30 phút; khác retry GET trong collector. Lỗi parser, IAM, CAS hoặc nguồn chặn cần được xử lý theo nguyên nhân.


> 📸 **[CẦN THÊM ẢNH 5.13-03]**
>
> Ảnh Operations Worker timer/log và request/result của ADMIN thử, đối chiếu với trạng thái service/run thực tế.
>
> File: `5-13-03.png`

### Cài worker trong đợt triển khai

Khi env/runtime đã được chuẩn bị và source worker thuộc root, script cài là:

~~~bash
cd /opt/vn-it-job-market
sudo bash deploy/ec2/install_recovery.sh
~~~

Script cài operations service/timer và cập nhật pipeline timer. Nó có thao tác restart pipeline timer, vì vậy xem trạng thái lịch và khả năng chạy bù trước khi thực hiện. Sau khi kiểm worker mới bật auth.operations_enabled trong cấu hình thực tế; không bật quyền UI trước khi backend đã sẵn sàng.

### Kết quả mong đợi

Worker chỉ tiếp nhận thao tác allowlist và kiểm quyền/hạn request.

### Source đối chiếu

- `deploy/ec2/operations_worker.py`
- `deploy/ec2/install_recovery.sh`
- `deploy/ec2/operations.timer`
- `dashboard/operations.py`
- `docs/OPERATIONS_RUNBOOK.md`

---

[← 5.13. Tự động hóa pipeline và Operations Worker](../) · [Mục lục Workshop](../../) · [Bước trước](../5.13.2-step2/) · [Bước tiếp →](../5.13.4-step4/)
