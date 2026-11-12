---
title: "Kiểm tra Glue Data Catalog"
date: 2026-11-10
weight: 2
chapter: false
pre: " <b> 5.4.2. </b> "
---

Mở **AWS Glue → Data Catalog → Databases → vn_it_job_market → itviec_current_jobs**. Đối chiếu schema với exporter: skills array<string>, lương double, các trường ngày date và first_seen/last_seen timestamp. Location trỏ `analytics/itviec/`.

~~~bash
aws glue get-table --database-name vn_it_job_market --name itviec_current_jobs --region ap-southeast-1 --query 'Table.StorageDescriptor.{Location:Location,Columns:Columns}'
~~~

**Kiểm tra sau bước này:** Database/table location và schema khớp exporter.

> 📸 **[CẦN THÊM ẢNH 5.4-02]**
>
> Ảnh Glue Table details: database, bảng itviec_current_jobs, columns/types và S3 location.
>
> File: `5-4-02.png`



Khi cần tái lập metadata: tạo database, chạy `sql/create_itviec_table.sql`, sau đó control_v3 → deleted_v3 → active_jobs_v3 → active_skills_v3 và ba alias theo thư mục sql/. Thay placeholder bucket/prefix trong bản SQL chuẩn bị. Glue chỉ dùng Data Catalog; migration moderation là quy trình riêng.

---

[← 5.4](../) · [Mục lục Workshop](../../) · [Bước trước](../5.4.1-step1/) · [Bước tiếp →](../5.4.3-step3/)
