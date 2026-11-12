---
title: "Đọc kết quả và chẩn đoán sai lệch"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.7.3. </b> "
aliases:
  - "/5-workshop/5.4-s3-glue-athena/5.4.5-step5/"
---

**Mục tiêu:** Đọc kết quả và chẩn đoán sai lệch.

**Bối cảnh:** Thiết lập view moderation và kiểm dữ liệu phân tích có Query ID.

### Các bước thực hiện

- total_rows phải bằng distinct_ids nếu không có job_id trùng. Số active có thể nhỏ hơn bảng nguồn do hết hạn hoặc moderation.
- Nếu số dòng tăng bất thường, kiểm prefix có thêm bản Parquet thứ hai không; không cộng các bản snapshot trong cùng location.
- Nếu schema lỗi, đối chiếu kiểu Parquet với Glue trước khi sửa câu truy vấn.
- Nếu active view không trả dữ liệu, kiểm snapshot moderation hợp lệ, schema/backend và trạng thái projection; không bỏ lớp moderation để làm dashboard có số liệu.
- Nếu truy vấn thất bại, lưu Query ID, lỗi và workgroup; kiểm quyền đọc nguồn và ghi result location.

Ghi lại số dòng, Query ID, thời điểm và run-id của canonical để nối bằng chứng S3 → Catalog → Athena. Các truy vấn thống kê ở bài này phục vụ đối chiếu; biểu đồ dashboard được tổng hợp trên dữ liệu đã tải vào pandas.

### Kết quả mong đợi

Sai lệch được truy về canonical, schema, snapshot hoặc quyền truy cập.

### Source đối chiếu

- `sql/create_itviec_moderation_v3_table.sql`
- `sql/create_itviec_deleted_jobs_v3_view.sql`
- `sql/create_itviec_active_jobs_v3_view.sql`
- `sql/create_itviec_active_skills_v3_view.sql`
- `dashboard/job_data.py`
- `docs/SOFT_DELETE_PHASE3.md`

---

[← 5.7. Truy vấn dữ liệu bằng Amazon Athena](../) · [Mục lục Workshop](../../) · [Bước trước](../5.7.2-step2/)
