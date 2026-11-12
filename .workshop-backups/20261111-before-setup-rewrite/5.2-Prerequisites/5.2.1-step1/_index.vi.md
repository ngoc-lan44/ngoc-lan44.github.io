---
title: "Chuẩn bị tài nguyên và quyền truy cập"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.2.1. </b> "
aliases:
  - "/5-workshop/5.1-overview/5.1.2-step2/"
---

**Mục tiêu:** Chuẩn bị tài nguyên và quyền truy cập.

**Bối cảnh:** Xác định account/Region, quyền truy cập, runtime và dữ liệu đầu vào.

### Các bước thực hiện

| Thành phần | Cấu hình của dự án |
| --- | --- |
| Region | ap-southeast-1 — Singapore |
| Máy chủ | Một EC2 t3.small, Ubuntu 24.04, gp3 mã hóa 30 GiB theo hồ sơ triển khai |
| Source EC2 | /opt/vn-it-job-market; Python .venv; tài khoản dịch vụ vnjob |
| Bucket S3 | vn-it-job-market-data-381924757765-ap-southeast-1-an |
| Database Athena | vn_it_job_market |

Đăng nhập AWS Console, chọn **Singapore**, mở **EC2 → Instances** và xác định máy của dự án. Kiểm IAM Role gắn với instance, sau đó mở **Systems Manager → Session Manager** để truy cập máy chủ.


![EC2 Vietnam IT Job Market tại Singapore: Running, t3.small, IAM role và IMDSv2 Required](/images/workshop/5-2-01.png)

*Hình 5.2-01: EC2 của dự án tại Singapore, IAM role gắn với instance và IMDSv2 Required.*

### Kết quả mong đợi

Xác định đúng Region, instance, role, bucket và database của dự án.

### Source đối chiếu

- `README.md`
- `deploy/ec2/stack.json`
- `.streamlit/secrets.toml.example`
- `deploy/ec2/runtime.env.example`

---

[← 5.2. Các bước chuẩn bị](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.2.2-step2/)
