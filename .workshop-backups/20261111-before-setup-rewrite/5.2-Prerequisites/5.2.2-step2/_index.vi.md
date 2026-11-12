---
title: "Kiểm tra môi trường"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.2.2. </b> "
aliases:
  - "/5-workshop/5.1-overview/5.1.3-step3/"
---

**Mục tiêu:** Kiểm tra môi trường.

**Bối cảnh:** Xác định account/Region, quyền truy cập, runtime và dữ liệu đầu vào.

### Công cụ của dự án

| Công cụ | Vai trò |
| --- | --- |
| Python và .venv Linux trên EC2 | Chạy collector, ETL, dashboard và worker |
| requirements.txt / requirements.lock.txt | Đối chiếu dependency và phiên bản của source |
| AWS CLI / boto3 | Kiểm tài nguyên, truy cập AWS qua credential chain/instance role |
| Session Manager | Truy cập máy EC2 để kiểm runtime, không cần mở public SSH |
| Trình duyệt | AWS Console, dashboard HTTPS và ảnh nghiệm thu |

Không thay môi trường Linux bằng .venv Windows. Visual Studio Code là công cụ phát triển/quản trị, không phải thành phần phục vụ website.

### Các bước thực hiện

Chạy trong phiên SSM:

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python --version
.venv/bin/python -m pip check
systemctl status vnjob-dashboard --no-pager
~~~

Python và thư viện cần hợp lệ, dashboard được systemd quản lý. Chọn một run đã hoàn thành làm đầu vào đối chiếu cho các mục thu thập, ETL và S3. Các bài sử dụng dữ liệu và tài khoản hiện hữu; việc chạy thu thập mới cần bố trí riêng để tránh chồng lịch tự động.


![Kết quả kiểm tra môi trường trên EC2 qua SSM: Python 3.12.3, pip check hợp lệ và vnjob-dashboard active running](/images/workshop/5-2-02.png)

*Hình 5.2-02: Python 3.12.3, dependency hợp lệ và dịch vụ vnjob-dashboard đang chạy.*

### Kết quả mong đợi

Python/dependency hợp lệ, dashboard có trạng thái service để kiểm tra.

### Source đối chiếu

- `README.md`
- `deploy/ec2/stack.json`
- `.streamlit/secrets.toml.example`
- `deploy/ec2/runtime.env.example`

---

[← 5.2. Các bước chuẩn bị](../) · [Mục lục Workshop](../../) · [Bước trước](../5.2.1-step1/) · [Bước tiếp →](../5.2.3-step3/)
