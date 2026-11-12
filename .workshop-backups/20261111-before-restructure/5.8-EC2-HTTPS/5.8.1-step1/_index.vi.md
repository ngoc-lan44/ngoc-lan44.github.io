---
title: "EC2 và IAM Role"
date: 2026-11-10
weight: 1
chapter: false
pre: " <b> 5.8.1. </b> "
---

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

**Kiểm tra sau bước này:** Runtime dùng role của EC2, public ingress phù hợp và quản trị qua SSM.

> 📸 **[CẦN THÊM ẢNH 5.8-01]**
>
> Ảnh EC2/IAM Role/Security Group và kết quả ARN runtime trong SSM; che định danh không cần thiết.
>
> File: `5-8-01.png`

---

[← 5.8](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.8.2-step2/)
