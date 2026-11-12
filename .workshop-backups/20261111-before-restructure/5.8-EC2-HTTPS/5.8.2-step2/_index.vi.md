---
title: "Triển khai source và Streamlit Service"
date: 2026-11-10
weight: 2
chapter: false
pre: " <b> 5.8.2. </b> "
---

Trên Windows, tạo gói source và kiểm checksum:

~~~powershell
Set-Location E:\vn-it-job-market
.\.venv\Scripts\python.exe deploy/ec2/build_release.py
Get-FileHash -Algorithm SHA256 -LiteralPath .\data\releases\ec2-source.tar.gz
~~~

Bootstrap dùng provision.py và UserData để tải/giải nén source vào /opt/vn-it-job-market rồi gọi install.sh. Khi cập nhật, dùng gói đã kiểm checksum, backup source/config và giữ data/secrets/env. Gói không chứa runtime data, secrets thật, .venv Windows hoặc tests/.

Dashboard service dùng vnjob, .venv Linux, /etc/vn-it-job-market.env và bind **127.0.0.1:8501**. Installer không tự bật lịch pipeline; các bước recovery/monitoring/Certbot được cấu hình riêng.

**Kiểm tra sau bước này:** Gói có SHA256; source/runtime/config được phân biệt khi cập nhật.

---

[← 5.8](../) · [Mục lục Workshop](../../) · [Bước trước](../5.8.1-step1/) · [Bước tiếp →](../5.8.3-step3/)
