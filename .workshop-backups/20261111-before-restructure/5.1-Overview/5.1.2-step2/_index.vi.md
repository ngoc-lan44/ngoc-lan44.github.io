---
title: "Chuẩn bị tài nguyên và quyền truy cập"
date: 2026-11-10
weight: 2
chapter: false
pre: " <b> 5.1.2. </b> "
---

| Thành phần | Cấu hình của dự án |
| --- | --- |
| Region | ap-southeast-1 — Singapore |
| Máy chủ | Một EC2 t3.small, Ubuntu 24.04, gp3 mã hóa 30 GiB theo hồ sơ triển khai |
| Source EC2 | /opt/vn-it-job-market; Python .venv; tài khoản dịch vụ vnjob |
| Bucket S3 | vn-it-job-market-data-381924757765-ap-southeast-1-an |
| Database Athena | vn_it_job_market |

Đăng nhập AWS Console, chọn **Singapore**, mở **EC2 → Instances** và xác định máy của dự án. Kiểm IAM Role gắn với instance, sau đó mở **Systems Manager → Session Manager** để truy cập máy chủ.

**Kiểm tra sau bước này:** Xác định đúng Region, instance, role, bucket và database của dự án.

> 📸 **[CẦN THÊM ẢNH 5.1-01]**
>
> Ảnh AWS Console: Region Singapore, EC2 của dự án và IAM Role gắn với instance.
>
> File: `5-1-01.png`

---

[← 5.1](../) · [Mục lục Workshop](../../) · [Bước trước](../5.1.1-step1/) · [Bước tiếp →](../5.1.3-step3/)
