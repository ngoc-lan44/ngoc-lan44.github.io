---
title: "Xuất và kiểm tra Parquet"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.4.3. </b> "
aliases:
  - "/5-workshop/5.3-data-processing/5.3.3-step3/"
---

**Mục tiêu:** Xuất và kiểm tra Parquet.

**Bối cảnh:** Đồng bộ current/history, chuẩn hóa dữ liệu và kiểm Parquet trên bản sao.

**Đầu vào:** Tiếp tục phiên shell của 5.4.2, giữ PIPELINE_DATA_ROOT trỏ vào bản sao. Nếu đã đóng shell, quay lại bước tạo bản sao và chạy cleaner; không chạy exporter vào runtime chỉ để tiếp tục bài.

### Các bước thực hiện

Exporter sử dụng PyArrow, nén Snappy và schema tương thích Athena. Kiểm số dòng với JSON clean:

~~~bash
.venv/bin/python processors/export_itviec_parquet.py
.venv/bin/python - <<'PY'
import os,json
from pathlib import Path
import pyarrow.parquet as pq
r=Path(os.environ["PIPELINE_DATA_ROOT"])
p=r/"analytics/itviec/current_jobs.parquet"
c=json.loads((r/"clean/itviec/current_jobs_clean.json").read_text())
print(pq.read_schema(p))
assert pq.read_metadata(p).num_rows == len(c["jobs"])
print("Row count matches clean JSON")
PY
unset PIPELINE_DATA_ROOT
exit
~~~


> 📸 **[CẦN THÊM ẢNH 5.4-02]**
>
> Ảnh kết quả clean và kiểm Parquet trên bản sao: schema, số dòng và thông báo đối chiếu thành công.
>
> File: `5-4-02.png`

### Kết quả mong đợi

Schema Parquet được in và số dòng khớp JSON clean.

### Source đối chiếu

- `processors/export_itviec_parquet.py`
- `processors/clean_itviec.py`
- `sql/create_itviec_table.sql`

---

[← 5.4. Đồng bộ, làm sạch và xuất Parquet](../) · [Mục lục Workshop](../../) · [Bước trước](../5.4.2-step2/) · [Bước tiếp →](../5.4.4-step4/)
