---
title: "Giám sát và xử lý sự cố"
date: 2026-11-11T00:00:00+07:00
weight: 14
chapter: false
pre: " <b> 5.14. </b> "
---

**Mục tiêu:** Đối chiếu CloudWatch, các trang trạng thái và runbook.

**Thành phần thực hành:** CloudWatch, trạng thái và runbook.

**Môi trường:** AWS Console tại Singapore; CLI/SSM theo hướng dẫn từng bài.

### Trước khi bắt đầu

Hoàn thành kiểm tra tài nguyên/runtime ở 5.2. Sử dụng cùng run_id, job_id hoặc source version khi đối chiếu; với hệ thống đang phục vụ, xem service/timer trước thao tác thay đổi.

### Các bước thực hiện

- [5.14.1. CloudWatch](5.14.1-step1/)
- [5.14.2. Trạng thái và chất lượng dữ liệu](5.14.2-step2/)
- [5.14.3. Đối chiếu sự cố theo runbook](5.14.3-step3/)

### Kết quả mong đợi

Đối chiếu CloudWatch, các trang trạng thái và runbook. Kết quả thực tế được ghi theo từng bài con và bằng chứng của phiên thực hành, không điền sẵn PASS.


---

[← 5.13. Tự động hóa pipeline và Operations Worker](../5.13-Pipeline-Automation/) · [Mục lục Workshop](../) · [5.15. Kiểm thử và kết quả thực hiện →](../5.15-Testing-Results/)
