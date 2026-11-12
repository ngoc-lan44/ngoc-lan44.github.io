---
title: "EC2 và IAM Role"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.11.1. </b> "
aliases:
  - "/5-workshop/5.8-ec2-https/5.8.1-step1/"
---

**Mục tiêu:** EC2 và IAM Role.

**Bối cảnh:** Kiểm IAM/runtime, đóng gói source và nghiệm thu đúng release.

### Các bước thực hiện

Trong EC2 Singapore, kiểm instance của dự án: t3.small, Ubuntu 24.04, gp3 mã hóa 30 GiB theo hồ sơ; IMDSv2 required, CPU Standard và Instance Profile. Stack public riêng quản lý cổng 80/443; quản trị qua SSM, không mở public 22/8501.

Kiểm danh tính runtime:

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python - <<'PY'
import boto3
i=boto3.client("sts",region_name="ap-southeast-1").get_caller_identity()
print("Account:",i["Account"])
print("Arn:",i["Arn"])
PY
~~~


> 📸 **[CẦN THÊM ẢNH 5.11-01]**
>
> Ảnh EC2/IAM Role/Security Group và kết quả ARN runtime trong SSM; che định danh không cần thiết.
>
> File: `5-11-01.png`

### Kết quả mong đợi

Runtime dùng role của EC2, public ingress phù hợp và quản trị qua SSM.

### Source đối chiếu

- `deploy/ec2/stack.json`
- `deploy/ec2/build_release.py`
- `deploy/ec2/install.sh`
- `deploy/ec2/streamlit.service`
- `docs/EC2_DEPLOYMENT_2026-11-02.md`

---

[← 5.11. Triển khai hệ thống trên Amazon EC2](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.11.2-step2/)
