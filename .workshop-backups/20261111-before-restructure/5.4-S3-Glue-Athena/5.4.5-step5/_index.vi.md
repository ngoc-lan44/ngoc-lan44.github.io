---
title: "Đọc kết quả và chẩn đoán sai lệch"
date: 2026-11-10
weight: 5
chapter: false
pre: " <b> 5.4.5. </b> "
---

- total_rows phải bằng distinct_ids nếu không có job_id trùng. Số active có thể nhỏ hơn bảng nguồn do hết hạn hoặc moderation.
- Nếu số dòng tăng bất thường, kiểm prefix có thêm bản Parquet thứ hai không; không cộng các bản snapshot trong cùng location.
- Nếu schema lỗi, đối chiếu kiểu Parquet với Glue trước khi sửa câu truy vấn.
- Nếu active view không trả dữ liệu, kiểm snapshot moderation hợp lệ, schema/backend và trạng thái projection; không bỏ lớp moderation để làm dashboard có số liệu.
- Nếu truy vấn thất bại, lưu Query ID, lỗi và workgroup; kiểm quyền đọc nguồn và ghi result location.

Ghi lại số dòng, Query ID, thời điểm và run-id của canonical để nối bằng chứng S3 → Catalog → Athena. Các truy vấn thống kê ở bài này phục vụ đối chiếu; biểu đồ dashboard được tổng hợp trên dữ liệu đã tải vào pandas.

**Kiểm tra sau bước này:** Sai lệch được truy về canonical, schema, snapshot hoặc quyền truy cập.

---

[← 5.4](../) · [Mục lục Workshop](../../) · [Bước trước](../5.4.4-step4/)
