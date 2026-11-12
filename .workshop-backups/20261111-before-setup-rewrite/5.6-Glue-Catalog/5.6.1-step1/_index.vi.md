---
title: "Kiểm tra Glue Data Catalog"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.6.1. </b> "
aliases:
  - "/5-workshop/5.4-s3-glue-athena/5.4.2-step2/"
---

**Mục tiêu:** Kiểm tra Glue Data Catalog.

**Bối cảnh:** Kiểm database/table và tái lập metadata nguồn đúng schema Parquet.

### Các bước thực hiện

Mở **AWS Glue → Data Catalog → Databases → vn_it_job_market → itviec_current_jobs**. Đối chiếu schema với exporter: skills array<string>, lương double, các trường ngày date và first_seen/last_seen timestamp. Location trỏ `analytics/itviec/`.

~~~bash
aws glue get-table --database-name vn_it_job_market --name itviec_current_jobs --region ap-southeast-1 --query 'Table.StorageDescriptor.{Location:Location,Columns:Columns}'
~~~


> 📸 **[CẦN THÊM ẢNH 5.6-01]**
>
> Ảnh Glue Table details: database, bảng itviec_current_jobs, columns/types và S3 location.
>
> File: `5-6-01.png`



Khi cần tái lập metadata: tạo database, chạy `sql/create_itviec_table.sql`, sau đó control_v3 → deleted_v3 → active_jobs_v3 → active_skills_v3 và ba alias theo thư mục sql/. Thay placeholder bucket/prefix trong bản SQL chuẩn bị. Glue chỉ dùng Data Catalog; migration moderation là quy trình riêng.

### Kết quả mong đợi

Database/table location và schema khớp exporter.

### Source đối chiếu

- `sql/create_itviec_table.sql`
- `processors/export_itviec_parquet.py`
- `dashboard/job_data.py`

---

[← 5.6. Cấu hình AWS Glue Data Catalog](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.6.2-step2/)
