---
title: "Truy vấn Athena"
date: 2026-11-10
weight: 3
chapter: false
pre: " <b> 5.4.3. </b> "
---

Trong **Athena Query Editor**, chọn Singapore, AwsDataCatalog, database và result location `control/athena-results/`. Kiểm workgroup thực tế rồi chạy từng query:

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

**Kiểm tra sau bước này:** Lưu Query ID, kết quả và thời điểm; kiểm tra tin đã ẩn không lọt view.

> 📸 **[CẦN THÊM ẢNH 5.4-03]**
>
> Ảnh Athena: SQL, kết quả tổng số/thống kê và leaked_deleted_jobs, kèm Query ID/thời điểm.
>
> File: `5-4-03.png`

---

[← 5.4](../) · [Mục lục Workshop](../../) · [Bước trước](../5.4.2-step2/) · [Bước tiếp →](../5.4.4-step4/)
