---
title: "Đọc schema và kiểm tính nhất quán"
date: 2026-11-11T00:00:00+07:00
weight: 5
chapter: false
pre: " <b> 5.4.5. </b> "
aliases:
  - "/5-workshop/5.3-data-processing/5.3.5-step5/"
---

**Mục tiêu:** Đọc schema và kiểm tính nhất quán.

**Bối cảnh:** Đồng bộ current/history, chuẩn hóa dữ liệu và kiểm Parquet trên bản sao.

### Các bước thực hiện

Trong kết quả PyArrow, kiểm skills là kiểu danh sách, các trường ngày có kiểu ngày và first_seen/last_seen có kiểu thời gian. Các kiểu này cần tương thích DDL nguồn ở mục 5.6.

Lập bảng cho cùng run gồm số tin crawl, số current, số clean và số dòng Parquet. Current có thể lớn hơn số vừa crawl vì hệ thống giữ tin đã có; current/clean/Parquet của cùng lần xử lý cần khớp nhau. History là tập sự kiện nên không so số dòng history bằng số việc làm.

Nếu kiểm tra số dòng hoặc schema thất bại, giữ bản thực hành để đọc lỗi; không công bố Parquet đó lên S3. Bản sao trong /tmp chỉ dùng kiểm cleaner/exporter, không thay thế quy trình sync và publication của runner.

### Kết quả mong đợi

Có bảng số lượng của cùng run; không nhầm history event với số tin.

### Source đối chiếu

- `processors/sync_itviec_current.py`
- `processors/clean_itviec.py`
- `processors/export_itviec_parquet.py`
- `deploy/ec2/run_pipeline.py`
- `sql/create_itviec_table.sql`

---

[← 5.4. Đồng bộ, làm sạch và xuất Parquet](../) · [Mục lục Workshop](../../) · [Bước trước](../5.4.4-step4/)
