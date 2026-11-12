---
title: "Tái lập metadata theo đúng thứ tự"
date: 2026-11-10
weight: 4
chapter: false
pre: " <b> 5.4.4. </b> "
---

Khi thực hiện trên môi trường cần tái lập, chọn database vn_it_job_market trong Athena và kiểm nội dung SQL trước khi chạy. Bảng nguồn lấy schema từ sql/create_itviec_table.sql, trỏ duy nhất đến prefix Parquet canonical. Với môi trường đang hoạt động, ưu tiên kiểm metadata trước, tránh thay view trong lúc dashboard đang đọc.

| Thứ tự | File SQL của project |
| --- | --- |
| 1 | create_itviec_table.sql |
| 2 | create_itviec_moderation_v3_table.sql |
| 3 | create_itviec_deleted_jobs_v3_view.sql |
| 4 | create_itviec_active_jobs_v3_view.sql |
| 5 | create_itviec_active_skills_v3_view.sql |
| 6 | alias_itviec_deleted_jobs_v3.sql; alias_itviec_active_jobs_v3.sql; alias_itviec_active_job_skills_v3.sql |

Các file nằm trong sql/. Kiểm và thay placeholder bucket/prefix ở bản SQL dùng cho đợt thực hành, không thay bằng prefix chứa artifact theo run. Chạy lần lượt, chỉ chuyển bước khi câu trước thành công.

**Kiểm tra sau bước này:** DDL/view được kiểm theo đúng dependency trước khi tái lập metadata.

---

[← 5.4](../) · [Mục lục Workshop](../../) · [Bước trước](../5.4.3-step3/) · [Bước tiếp →](../5.4.5-step5/)
