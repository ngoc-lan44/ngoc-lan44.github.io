---
title: "Triển khai source và Streamlit Service"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.11.2. </b> "
aliases:
  - "/5-workshop/5.8-ec2-https/5.8.2-step2/"
---

**Mục tiêu:** Triển khai source và Streamlit Service.

**Bối cảnh:** Kiểm IAM/runtime, đóng gói source và nghiệm thu đúng release.

### Các bước thực hiện

Trên Windows, tạo gói source và kiểm checksum:

~~~powershell
Set-Location E:\vn-it-job-market
.\.venv\Scripts\python.exe deploy/ec2/build_release.py
Get-FileHash -Algorithm SHA256 -LiteralPath .\data\releases\ec2-source.tar.gz
~~~

Bootstrap dùng provision.py và UserData để tải/giải nén source vào /opt/vn-it-job-market rồi gọi install.sh. Khi cập nhật, dùng gói đã kiểm checksum, backup source/config và giữ data/secrets/env. Gói không chứa runtime data, secrets thật, .venv Windows hoặc tests/.

Dashboard service dùng vnjob, .venv Linux, /etc/vn-it-job-market.env và bind **127.0.0.1:8501**. Installer không tự bật lịch pipeline; các bước recovery/monitoring/Certbot được cấu hình riêng.

### Cài đặt ban đầu trên EC2 đã chuẩn bị

Chỉ áp dụng khi source release đã được chuyển, kiểm checksum và đặt đúng /opt/vn-it-job-market trên Ubuntu 24.04 trong đợt triển khai. Chạy qua SSM:

~~~bash
cd /opt/vn-it-job-market
sudo bash deploy/ec2/install.sh
~~~

Installer tạo tài khoản dịch vụ nếu cần, chuẩn bị .venv Linux, cài thư viện, giữ cấu hình hiện hữu và cài unit dashboard/pipeline/projection. Nó bật dashboard và projection timer; không tự bật lịch pipeline. Mẫu Nginx ban đầu phục vụ kiểm tra private, public HTTPS là chương 5.12.

Với máy đang phục vụ, không dùng lệnh cài ban đầu như quy trình cập nhật release tùy ý. Đợt cập nhật 02/11 có backup, môi trường và checksum riêng theo biên bản; script lịch sử có SHA cố định chỉ áp dụng đúng đợt đó.

### Kết quả mong đợi

Gói có SHA256; source/runtime/config được phân biệt khi cập nhật.

### Source đối chiếu

- `deploy/ec2/stack.json`
- `deploy/ec2/build_release.py`
- `deploy/ec2/install.sh`
- `deploy/ec2/streamlit.service`
- `docs/EC2_DEPLOYMENT_2026-11-02.md`

---

[← 5.11. Triển khai hệ thống trên Amazon EC2](../) · [Mục lục Workshop](../../) · [Bước trước](../5.11.1-step1/) · [Bước tiếp →](../5.11.3-step3/)
