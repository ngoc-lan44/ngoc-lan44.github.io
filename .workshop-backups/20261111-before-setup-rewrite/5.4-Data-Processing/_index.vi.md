---
title: "Đồng bộ, làm sạch và xuất Parquet"
date: 2026-11-11T00:00:00+07:00
weight: 4
chapter: false
pre: " <b> 5.4. </b> "
aliases:
  - "/5-workshop/5.3-data-processing/"
  - "/5-workshop/5.4-data-processing/5.4.6-step6/"
  - "/4-workshop/4.4-data-processing/4.4.1-step1/"
  - "/4-workshop/4.4-data-processing/4.4.2-step2/"
  - "/4-workshop/4.4-data-processing/4.4.3-step3/"
  - "/4-workshop/4.4-data-processing/"
---

**Mục tiêu:** Đồng bộ current/history, chuẩn hóa dữ liệu và kiểm Parquet trên bản sao.

**Thành phần thực hành:** Current/history, clean JSON và Parquet.

**Môi trường:** EC2 qua SSM hoặc máy quản trị theo chỉ dẫn trong từng bước.

### Trước khi bắt đầu

Hoàn thành kiểm tra tài nguyên/runtime ở 5.2. Sử dụng cùng run_id, job_id hoặc source version khi đối chiếu; với hệ thống đang phục vụ, xem service/timer trước thao tác thay đổi.

### Các bước thực hiện

- [5.4.1. Đồng bộ Current và History](5.4.1-step1/)
- [5.4.2. Làm sạch và chuẩn hóa](5.4.2-step2/)
- [5.4.3. Xuất và kiểm tra Parquet](5.4.3-step3/)
- [5.4.4. Đối chiếu quy tắc chuẩn hóa](5.4.4-step4/)
- [5.4.5. Đọc schema và kiểm tính nhất quán](5.4.5-step5/)

### Kết quả mong đợi

Đồng bộ current/history, chuẩn hóa dữ liệu và kiểm Parquet trên bản sao. Kết quả thực tế được ghi theo từng bài con và bằng chứng của phiên thực hành, không điền sẵn PASS.


---

[← 5.3. Thu thập dữ liệu tuyển dụng từ ITviec](../5.3-ITviec-Collection/) · [Mục lục Workshop](../) · [5.5. Lưu trữ và công bố dữ liệu trên Amazon S3 →](../5.5-S3-Storage/)
