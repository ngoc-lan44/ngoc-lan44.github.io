---
title: "Triển khai EC2, Nginx và HTTPS"
date: 2026-11-08
weight: 8
chapter: false
pre: " <b> 5.8. </b> "
aliases:
  - "/5-workshop/5.11-ec2-deployment/"
  - "/5-workshop/5.11-ec2-deployment/5.11.1-step1/"
  - "/5-workshop/5.11-ec2-deployment/5.11.2-step2/"
  - "/5-workshop/5.11-ec2-deployment/5.11.3-step3/"
  - "/5-workshop/5.11-ec2-deployment/5.11.4-step4/"
  - "/5-workshop/5.11-ec2-deployment/5.11.5-step5/"
  - "/5-workshop/5.12-nginx-https/"
  - "/5-workshop/5.12-nginx-https/5.12.1-step1/"
  - "/5-workshop/5.12-nginx-https/5.12.2-step2/"
  - "/5-workshop/5.12-nginx-https/5.12.3-step3/"
  - "/5-workshop/5.12-nginx-https/5.12.4-step4/"
  - "/4-workshop/4.10-ec2-deployment/4.10.1-step1/"
  - "/4-workshop/4.10-ec2-deployment/4.10.2-step2/"
  - "/4-workshop/4.10-ec2-deployment/4.10.3-step3/"
  - "/4-workshop/4.10-ec2-deployment/4.10.4-step4/"
  - "/4-workshop/4.10-ec2-deployment/"
---

**Mục tiêu thực hành:** Hiểu quy trình triển khai, kiểm runtime và nghiệm thu đường truy cập HTTPS/WebSocket.

Hệ thống triển khai trên một EC2, chạy Streamlit bằng systemd và phục vụ web qua Nginx HTTPS.

**Console:** EC2 → chọn instance dự án → Session Manager.

**Máy quản trị:** Windows PowerShell để đóng gói source.

### Trước khi bắt đầu

**Đầu vào:** EC2/role và cấu hình hiện hữu; gói source đã kiểm nếu thực hiện đợt triển khai.

**Đầu ra:** Biên bản xác nhận release, runtime, reverse proxy, TLS và truy cập web.

### Các bài thực hành

- [5.8.1. EC2 và IAM Role](5.8.1-step1/)
- [5.8.2. Triển khai source và Streamlit Service](5.8.2-step2/)
- [5.8.3. Nginx và HTTPS](5.8.3-step3/)
- [5.8.4. Kiểm tra truy cập](5.8.4-step4/)
- [5.8.5. Đối chiếu cấu hình service và reverse proxy](5.8.5-step5/)
- [5.8.6. Nghiệm thu sau đợt triển khai](5.8.6-step6/)

### Kết quả mong đợi

HTTP chuyển HTTPS đúng host, TLS được xác thực, health và WebSocket hoạt động. Không dùng -k để bỏ kiểm chứng chỉ. Script release/HTTPS lịch sử có SHA hoặc IP cố định chỉ dùng đúng phạm vi của đợt đó; helper cần Certbot và proxy include đã có.

### Checklist

- [ ] Runtime EC2 sử dụng Instance Role; Streamlit bind loopback 8501.
- [ ] Release có checksum, dữ liệu/config được giữ.
- [ ] Nginx/TLS/health/WebSocket được kiểm trên IP hiện tại.


### Source đối chiếu

- `deploy/ec2/stack.json`
- `deploy/ec2/provision.py`
- `docs/EC2_DEPLOYMENT_2026-11-02.md`
- `config/user_data_iam_policy.json`
- `config/moderation_dynamodb_iam_policy.json`
- `dashboard/aws_clients.py`

---

[← 5.7](../5.7-Administration/) · [Mục lục](../) · [5.9 →](../5.9-Pipeline-Automation/)
