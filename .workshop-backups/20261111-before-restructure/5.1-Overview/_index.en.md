---
title: "Overview and prerequisites"
date: 2026-11-08
weight: 1
chapter: false
pre: " <b> 5.1. </b> "
aliases:
  - "/en/5-workshop/5.2-prerequisites/"
  - "/en/4-workshop/4.1-workshop-overview/"
  - "/en/4-workshop/4.2-prerequisites/"
---

### Objective

Understand the ITviec → Python/EC2 → S3 Parquet → Glue/Athena → Streamlit/Plotly flow and verify prerequisites. One EC2 also runs workers and Nginx HTTPS. S3 stores accounts/personal activity; DynamoDB stores moderation/audit and a worker publishes its S3 projection.

### Prepare

Use Singapore, the existing project bucket/database, EC2 SSM and Linux runtime at /opt/vn-it-job-market. Windows is the administration/packaging host. Verify dependencies and service; select one completed run for chapters 5.2–5.4. Do not replace existing seeds/accounts with empty data or copy personal credentials to EC2.

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python --version
.venv/bin/python -m pip check
systemctl status vnjob-dashboard --no-pager
~~~

![Source-based architecture with Vietnamese labels](/images/vietnam-it-job-market-actual-architecture.png)

### Result and images

Record real environment/identity checks, not new deployment claims. Capture EC2/role details and SSM dependency/service results. The Vietnamese page specifies exact image codes and filenames.

---

[← 5](../) · [Contents](../) · [5.2 →](../5.2-ITviec-Collection/)

### Step pages

- [5.1.1. Kiến trúc hệ thống](5.1.1-step1/)
- [5.1.2. Chuẩn bị tài nguyên và quyền truy cập](5.1.2-step2/)
- [5.1.3. Kiểm tra môi trường](5.1.3-step3/)
- [5.1.4. Xác định đầu vào trước khi thực hành](5.1.4-step4/)
- [5.1.5. Phân biệt nơi thực hiện thao tác](5.1.5-step5/)
