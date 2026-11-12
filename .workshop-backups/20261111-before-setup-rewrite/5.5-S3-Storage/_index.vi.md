---
title: "Lưu trữ và công bố dữ liệu trên Amazon S3"
date: 2026-11-11T00:00:00+07:00
weight: 5
chapter: false
pre: " <b> 5.5. </b> "
aliases:
  - "/5-workshop/5.4-s3-glue-athena/"
  - "/5-workshop/5.5-s3-storage/5.5.3-step3/"
  - "/5-workshop/5.5-s3-storage/5.5.4-step4/"
  - "/5-workshop/5.5-s3-storage/5.5.5-step5/"
  - "/5-workshop/5.6-glue-catalog/5.6.3-step3/"
  - "/5-workshop/5.6-glue-catalog/5.6.4-step4/"
  - "/5-workshop/5.7-athena/5.7.4-step4/"
  - "/5-workshop/5.7-athena/5.7.5-step5/"
  - "/5-workshop/5.7-athena/5.7.6-step6/"
  - "/4-workshop/4.5-s3-storage/4.5.1-step1/"
  - "/4-workshop/4.5-s3-storage/4.5.2-step2/"
  - "/4-workshop/4.5-s3-storage/4.5.3-step3/"
  - "/4-workshop/4.5-s3-storage/"
  - "/4-workshop/4.6-glue-catalog/4.6.1-step1/"
  - "/4-workshop/4.6-glue-catalog/4.6.2-step2/"
  - "/4-workshop/4.6-glue-catalog/"
  - "/4-workshop/4.7-athena/4.7.1-step1/"
  - "/4-workshop/4.7-athena/4.7.2-step2/"
  - "/4-workshop/4.7-athena/"
---

**Mục tiêu:** Tổ chức đúng prefix và kiểm publication canonical theo run.

**Thành phần thực hành:** Prefix/key và publication.

**Môi trường:** AWS Console tại Singapore; CLI/SSM theo hướng dẫn từng bài.

### Trước khi bắt đầu

Hoàn thành kiểm tra tài nguyên/runtime ở 5.2. Sử dụng cùng run_id, job_id hoặc source version khi đối chiếu; với hệ thống đang phục vụ, xem service/timer trước thao tác thay đổi.

### Các bước thực hiện

- [5.5.1. Kiểm tra cấu trúc bucket và phân tách dữ liệu](5.5.1-step1/)
- [5.5.2. Lưu trữ và công bố Parquet trên S3](5.5.2-step2/)

### Kết quả mong đợi

Tổ chức đúng prefix và kiểm publication canonical theo run. Kết quả thực tế được ghi theo từng bài con và bằng chứng của phiên thực hành, không điền sẵn PASS.


---

[← 5.4. Đồng bộ, làm sạch và xuất Parquet](../5.4-Data-Processing/) · [Mục lục Workshop](../) · [5.6. Cấu hình AWS Glue Data Catalog →](../5.6-Glue-Catalog/)
