---
title: "Kiểm thử"
date: 2026-11-10
weight: 3
chapter: false
pre: " <b> 5.10.3. </b> "
---

Các nhóm kiểm chính:

- Dữ liệu: URL/job_id duy nhất, batch đúng discovery, current/clean/Parquet cùng số dòng.
- Phân tích: metadata S3, schema/location Glue, Query ID Athena và không lọt tin bị ẩn.
- Giao diện: KPI, chart, filter/detail, trạng thái rỗng; quyền Guest/USER/ADMIN và tách dữ liệu cá nhân.
- Vận hành: HTTPS/WebSocket, timer, trạng thái run và moderation/audit/projection.

Chạy offline trên môi trường riêng có full source/tests, theo workflow của project:

~~~bash
export AWS_EC2_METADATA_DISABLED=true PYTHONDONTWRITEBYTECODE=1
.venv/bin/python -m unittest discover -s tests -p "test_*.py"
.venv/bin/python tests/ui_registration_smoke.py
.venv/bin/python tests/ui_moderation_smoke.py
.venv/bin/python tests/ui_vietnamese_smoke.py
.venv/bin/python tests/ui_performance_safety.py
.venv/bin/python tests/ui_account_improvements.py
.venv/bin/python tests/ui_data_quality_smoke.py
node tests/test_clock.cjs
~~~

**Kiểm tra sau bước này:** Mỗi bộ test có kết quả riêng; offline test không thay bằng chứng AWS.

> 📸 **[CẦN THÊM ẢNH 5.10-03]**
>
> Ảnh log kiểm thử có ngày/source version và kết quả từng bộ; kèm bảng nghiệm thu dữ liệu, giao diện và vận hành.
>
> File: `5-10-03.png`

---

[← 5.10](../) · [Mục lục Workshop](../../) · [Bước trước](../5.10.2-step2/) · [Bước tiếp →](../5.10.4-step4/)
