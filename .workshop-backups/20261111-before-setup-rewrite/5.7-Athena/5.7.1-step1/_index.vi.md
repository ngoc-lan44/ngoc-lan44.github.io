---
title: "Tái lập metadata theo đúng thứ tự"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.7.1. </b> "
aliases:
  - "/5-workshop/5.4-s3-glue-athena/5.4.4-step4/"
---

**Mục tiêu:** Tái lập metadata theo đúng thứ tự.

**Bối cảnh:** Thiết lập view moderation và kiểm dữ liệu phân tích có Query ID.

### Các bước thực hiện

Bảng nguồn đã được đối chiếu ở 5.6. Trong Athena, chọn database vn_it_job_market và kiểm nội dung các file SQL trước khi tạo hoặc thay view moderation. Với môi trường đang hoạt động, ưu tiên kiểm metadata trước, tránh thay view trong lúc dashboard đang đọc.

| Thứ tự | File SQL của project |
| --- | --- |
| 1 | create_itviec_table.sql |
| 2 | create_itviec_moderation_v3_table.sql |
| 3 | create_itviec_deleted_jobs_v3_view.sql |
| 4 | create_itviec_active_jobs_v3_view.sql |
| 5 | create_itviec_active_skills_v3_view.sql |
| 6 | alias_itviec_deleted_jobs_v3.sql; alias_itviec_active_jobs_v3.sql; alias_itviec_active_job_skills_v3.sql |

Các file nằm trong sql/. Với create_itviec_moderation_v3_table.sql, thay {{BUCKET}} bằng vn-it-job-market-data-381924757765-ap-southeast-1-an và {{PREFIX}} bằng control/moderation/ trong bản SQL thực hành. Bảng nguồn giữ location analytics/itviec/; không trỏ bảng control hoặc bảng việc làm vào prefix artifact theo run. Chạy lần lượt, chỉ chuyển bước khi câu trước thành công.

### Kết quả mong đợi

DDL/view được kiểm theo đúng dependency trước khi tái lập metadata.

### Source đối chiếu

- `sql/create_itviec_moderation_v3_table.sql`
- `sql/create_itviec_deleted_jobs_v3_view.sql`
- `sql/create_itviec_active_jobs_v3_view.sql`
- `sql/create_itviec_active_skills_v3_view.sql`
- `dashboard/job_data.py`
- `docs/SOFT_DELETE_PHASE3.md`

---

[← 5.7. Truy vấn dữ liệu bằng Amazon Athena](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.7.2-step2/)
