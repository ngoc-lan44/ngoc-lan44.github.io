---
title: "Triển khai hệ thống trên Amazon EC2"
date: 2026-11-11T00:00:00+07:00
weight: 11
chapter: false
pre: " <b> 5.11. </b> "
aliases:
  - "/5-workshop/5.8-ec2-https/"
  - "/5-workshop/5.11-ec2-deployment/5.11.5-step5/"
  - "/5-workshop/5.12-nginx-https/5.12.4-step4/"
  - "/4-workshop/4.10-ec2-deployment/4.10.1-step1/"
  - "/4-workshop/4.10-ec2-deployment/4.10.2-step2/"
  - "/4-workshop/4.10-ec2-deployment/4.10.3-step3/"
  - "/4-workshop/4.10-ec2-deployment/4.10.4-step4/"
  - "/4-workshop/4.10-ec2-deployment/"
---

**Mục tiêu:** Kiểm IAM/runtime, đóng gói source và nghiệm thu đúng release.

**Thành phần thực hành:** Role, release, service và nghiệm thu.

**Môi trường:** EC2 qua SSM hoặc máy quản trị theo chỉ dẫn trong từng bước.

### Trước khi bắt đầu

Hoàn thành kiểm tra tài nguyên/runtime ở 5.2. Sử dụng cùng run_id, job_id hoặc source version khi đối chiếu; với hệ thống đang phục vụ, xem service/timer trước thao tác thay đổi.

### Các bước thực hiện

- [5.11.1. EC2 và IAM Role](5.11.1-step1/)
- [5.11.2. Triển khai source và Streamlit Service](5.11.2-step2/)
- [5.11.3. Kiểm tra Streamlit Service và quyền runtime](5.11.3-step3/)
- [5.11.4. Nghiệm thu sau đợt triển khai](5.11.4-step4/)

### Kết quả mong đợi

Kiểm IAM/runtime, đóng gói source và nghiệm thu đúng release. Kết quả thực tế được ghi theo từng bài con và bằng chứng của phiên thực hành, không điền sẵn PASS.


---

[← 5.10. Quản trị và kiểm duyệt bằng DynamoDB](../5.10-Administration/) · [Mục lục Workshop](../) · [5.12. Cấu hình Nginx và HTTPS theo IP →](../5.12-Nginx-HTTPS/)
