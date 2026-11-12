---
title: "Truy vấn Athena"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.7.2. </b> "
aliases:
  - "/5-workshop/5.4-s3-glue-athena/5.4.3-step3/"
---

**Mục tiêu:** Truy vấn Athena.

**Bối cảnh:** Thiết lập view moderation và kiểm dữ liệu phân tích có Query ID.

### Các bước thực hiện

Trong **Athena Query Editor**, chọn Singapore, AwsDataCatalog, database và result location `s3://vn-it-job-market-data-381924757765-ap-southeast-1-an/control/athena-results/`. Kiểm workgroup thực tế rồi chạy từng query:

~~~sql
SELECT COUNT(*) AS total_rows, COUNT(DISTINCT job_id) AS distinct_ids
FROM vn_it_job_market.itviec_current_jobs;

SELECT company, COUNT(*) AS jobs
FROM vn_it_job_market.itviec_active_jobs
GROUP BY company ORDER BY jobs DESC LIMIT 10;

SELECT location, level, COUNT(*) AS jobs
FROM vn_it_job_market.itviec_active_jobs
GROUP BY location, level ORDER BY jobs DESC;

SELECT skill, COUNT(DISTINCT job_id) AS jobs
FROM vn_it_job_market.itviec_active_job_skills
GROUP BY skill ORDER BY jobs DESC LIMIT 10;

SELECT COUNT(*) AS leaked_deleted_jobs
FROM vn_it_job_market.itviec_active_jobs a
JOIN vn_it_job_market.itviec_deleted_jobs d ON a.job_id=d.job_id;
~~~


> 📸 **[CẦN THÊM ẢNH 5.7-01]**
>
> Ảnh Athena: SQL, kết quả tổng số/thống kê và leaked_deleted_jobs, kèm Query ID/thời điểm.
>
> File: `5-7-01.png`

### Kết quả mong đợi

Lưu Query ID, kết quả và thời điểm. total_rows phải bằng distinct_ids; leaked_deleted_jobs mong đợi bằng 0. Số tin active có thể nhỏ hơn bảng nguồn. Lớp view v3 chỉ mở dữ liệu khi có đúng một snapshot moderation hợp lệ với schema_version=2, backend=DYNAMODB và deleted_jobs không null; không bỏ điều kiện này để làm query có số liệu.

### Source đối chiếu

- `sql/create_itviec_table.sql`
- `sql/create_itviec_active_jobs_v3_view.sql`
- `sql/create_itviec_active_skills_v3_view.sql`
- `sql/create_itviec_deleted_jobs_v3_view.sql`
- `dashboard/job_data.py`

---

[← 5.7. Truy vấn dữ liệu bằng Amazon Athena](../) · [Mục lục Workshop](../../) · [Bước trước](../5.7.1-step1/) · [Bước tiếp →](../5.7.3-step3/)
