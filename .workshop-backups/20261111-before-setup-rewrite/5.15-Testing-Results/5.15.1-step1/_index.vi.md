---
title: "Kiểm thử"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.15.1. </b> "
aliases:
  - "/5-workshop/5.10-monitoring-results/5.10.3-step3/"
---

**Mục tiêu:** Kiểm thử.

**Bối cảnh:** Lập bằng chứng dữ liệu, giao diện, quyền và vận hành theo thời điểm.

### Các bước thực hiện

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


> 📸 **[CẦN THÊM ẢNH 5.15-01]**
>
> Ảnh log kiểm thử có ngày/source version và kết quả từng bộ; kèm bảng nghiệm thu dữ liệu, giao diện và vận hành.
>
> File: `5-15-01.png`

### Kết quả mong đợi

Mỗi bộ test có kết quả riêng; offline test không thay bằng chứng AWS.

### Source đối chiếu

- `docs/EC2_DEPLOYMENT.md`
- `docs/EC2_DEPLOYMENT_2026-11-02.md`
- `docs/AUTO_HTTPS.md`
- `.github/workflows/offline-tests.yml`
- `docs/UNUSED_CODE_CLEANUP.md`

---

[← 5.15. Kiểm thử và kết quả thực hiện](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.15.2-step2/)
