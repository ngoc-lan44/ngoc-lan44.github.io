---
title: "Tự động hóa pipeline và Operations Worker"
date: 2026-11-11T00:00:00+07:00
weight: 13
chapter: false
pre: " <b> 5.13. </b> "
aliases:
  - "/5-workshop/5.9-pipeline-automation/"
  - "/5-workshop/5.13-pipeline-automation/5.13.6-step6/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.1-step1/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.2-step2/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.3-step3/"
  - "/4-workshop/4.11-pipeline-monitoring/"
---

**Mục tiêu:** Kiểm lịch 02:00, chạy bù và kết quả phục hồi có kiểm soát.

**Thành phần thực hành:** Timer pipeline, trạng thái và worker.

**Môi trường:** EC2 qua SSM hoặc máy quản trị theo chỉ dẫn trong từng bước.

### Trước khi bắt đầu

Hoàn thành kiểm tra tài nguyên/runtime ở 5.2. Sử dụng cùng run_id, job_id hoặc source version khi đối chiếu; với hệ thống đang phục vụ, xem service/timer trước thao tác thay đổi.

### Các bước thực hiện

- [5.13.1. Pipeline Service và lịch chạy](5.13.1-step1/)
- [5.13.2. Theo dõi run và chạy bù](5.13.2-step2/)
- [5.13.3. Operations Worker](5.13.3-step3/)
- [5.13.4. Phân biệt các trạng thái khi đọc kết quả](5.13.4-step4/)
- [5.13.5. Quy trình xử lý yêu cầu phục hồi](5.13.5-step5/)

### Kết quả mong đợi

Kiểm lịch 02:00, chạy bù và kết quả phục hồi có kiểm soát. Kết quả thực tế được ghi theo từng bài con và bằng chứng của phiên thực hành, không điền sẵn PASS.


---

[← 5.12. Cấu hình Nginx và HTTPS theo IP](../5.12-Nginx-HTTPS/) · [Mục lục Workshop](../) · [5.14. Giám sát và xử lý sự cố →](../5.14-Monitoring/)
