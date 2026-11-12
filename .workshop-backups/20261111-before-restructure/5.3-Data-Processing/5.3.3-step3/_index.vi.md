---
title: "Xuất và kiểm tra Parquet"
date: 2026-11-10
weight: 3
chapter: false
pre: " <b> 5.3.3. </b> "
---

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

**Kiểm tra sau bước này:** Schema Parquet được in và số dòng khớp JSON clean.

> 📸 **[CẦN THÊM ẢNH 5.3-02]**
>
> Ảnh kết quả clean và kiểm Parquet trên bản sao: schema, số dòng và thông báo đối chiếu thành công.
>
> File: `5-3-02.png`

---

[← 5.3](../) · [Mục lục Workshop](../../) · [Bước trước](../5.3.2-step2/) · [Bước tiếp →](../5.3.4-step4/)
