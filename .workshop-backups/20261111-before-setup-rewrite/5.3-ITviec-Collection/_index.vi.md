---
title: "Thu thập dữ liệu tuyển dụng từ ITviec"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.3. </b> "
aliases:
  - "/5-workshop/5.2-itviec-collection/"
  - "/4-workshop/4.3-itviec-collection/4.3.1-step1/"
  - "/4-workshop/4.3-itviec-collection/4.3.2-step2/"
  - "/4-workshop/4.3-itviec-collection/4.3.3-step3/"
  - "/4-workshop/4.3-itviec-collection/"
---

**Mục tiêu:** Theo dấu discovery, batch và snapshot được kiểm tra trước ETL.

**Thành phần thực hành:** Discovery, batch và kiểm snapshot.

**Môi trường:** EC2 qua SSM hoặc máy quản trị theo chỉ dẫn trong từng bước.

### Trước khi bắt đầu

Hoàn thành kiểm tra tài nguyên/runtime ở 5.2. Sử dụng cùng run_id, job_id hoặc source version khi đối chiếu; với hệ thống đang phục vụ, xem service/timer trước thao tác thay đổi.

### Các bước thực hiện

- [5.3.1. Khám phá và chuẩn hóa URL](5.3.1-step1/)
- [5.3.2. Thu thập chi tiết theo batch](5.3.2-step2/)
- [5.3.3. Kiểm tra toàn lượt thu thập](5.3.3-step3/)
- [5.3.4. Đọc dữ liệu một tin trước khi chuyển ETL](5.3.4-step4/)
- [5.3.5. Xử lý thu thập gián đoạn](5.3.5-step5/)

### Kết quả mong đợi

Theo dấu discovery, batch và snapshot được kiểm tra trước ETL. Kết quả thực tế được ghi theo từng bài con và bằng chứng của phiên thực hành, không điền sẵn PASS.


---

[← 5.2. Các bước chuẩn bị](../5.2-Prerequisites/) · [Mục lục Workshop](../) · [5.4. Đồng bộ, làm sạch và xuất Parquet →](../5.4-Data-Processing/)
