---
title: "Truy vấn dữ liệu bằng Amazon Athena"
date: 2026-11-11T00:00:00+07:00
weight: 7
chapter: false
pre: " <b> 5.7. </b> "
---

**Mục tiêu:** Thiết lập view moderation và kiểm dữ liệu phân tích có Query ID.

**Thành phần thực hành:** View moderation và truy vấn.

**Môi trường:** AWS Console tại Singapore; CLI/SSM theo hướng dẫn từng bài.

### Trước khi bắt đầu

Hoàn thành kiểm tra tài nguyên/runtime ở 5.2. Sử dụng cùng run_id, job_id hoặc source version khi đối chiếu; với hệ thống đang phục vụ, xem service/timer trước thao tác thay đổi.

### Các bước thực hiện

- [5.7.1. Tái lập metadata theo đúng thứ tự](5.7.1-step1/)
- [5.7.2. Truy vấn Athena](5.7.2-step2/)
- [5.7.3. Đọc kết quả và chẩn đoán sai lệch](5.7.3-step3/)

### Kết quả mong đợi

Thiết lập view moderation và kiểm dữ liệu phân tích có Query ID. Kết quả thực tế được ghi theo từng bài con và bằng chứng của phiên thực hành, không điền sẵn PASS.


---

[← 5.6. Cấu hình AWS Glue Data Catalog](../5.6-Glue-Catalog/) · [Mục lục Workshop](../) · [5.8. Xây dựng Streamlit Dashboard →](../5.8-Streamlit-Dashboard/)
