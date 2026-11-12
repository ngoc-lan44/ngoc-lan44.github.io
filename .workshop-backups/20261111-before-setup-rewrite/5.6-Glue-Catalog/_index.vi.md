---
title: "Cấu hình AWS Glue Data Catalog"
date: 2026-11-11T00:00:00+07:00
weight: 6
chapter: false
pre: " <b> 5.6. </b> "
---

**Mục tiêu:** Kiểm database/table và tái lập metadata nguồn đúng schema Parquet.

**Thành phần thực hành:** Database, table, schema và location.

**Môi trường:** AWS Console tại Singapore; CLI/SSM theo hướng dẫn từng bài.

### Trước khi bắt đầu

Hoàn thành kiểm tra tài nguyên/runtime ở 5.2. Sử dụng cùng run_id, job_id hoặc source version khi đối chiếu; với hệ thống đang phục vụ, xem service/timer trước thao tác thay đổi.

### Các bước thực hiện

- [5.6.1. Kiểm tra Glue Data Catalog](5.6.1-step1/)
- [5.6.2. Tạo hoặc đối chiếu database và bảng nguồn](5.6.2-step2/)

### Kết quả mong đợi

Kiểm database/table và tái lập metadata nguồn đúng schema Parquet. Kết quả thực tế được ghi theo từng bài con và bằng chứng của phiên thực hành, không điền sẵn PASS.


---

[← 5.5. Lưu trữ và công bố dữ liệu trên Amazon S3](../5.5-S3-Storage/) · [Mục lục Workshop](../) · [5.7. Truy vấn dữ liệu bằng Amazon Athena →](../5.7-Athena/)
