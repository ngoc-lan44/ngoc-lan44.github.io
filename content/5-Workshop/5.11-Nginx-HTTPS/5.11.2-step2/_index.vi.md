---
title: "Cài Certbot và cấu hình HTTPS tự động"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.11.2. </b> "
aliases:
  - "/5-workshop/5.12-nginx-https/5.12.1-step1/"
  - "/5-workshop/5.12-nginx-https/5.12.3-step3/"
  - "/5-workshop/5.8-ec2-https/5.8.3-step3/"
---

**Thực hiện tại:** SSM trên EC2

### Mục tiêu

Cấp chứng chỉ IP và cài timer theo IP thay đổi.

### Điều kiện đầu vào

Ingress 80/443 hoạt động, Nginx đã cài và include tồn tại.

### Các bước thực hiện

Chuẩn bị runtime Certbot theo quy trình project:

~~~bash
sudo python3 -m venv /opt/vnjob-certbot
sudo /opt/vnjob-certbot/bin/pip install "certbot>=5.4,<7"
sudo /opt/vnjob-certbot/bin/certbot --version
sudo install -d -m 0755 /var/www/letsencrypt/.well-known/acme-challenge
~~~

Cài bộ cấu hình HTTPS tự nhận địa chỉ IP công khai của EC2:

~~~bash
cd /opt/vn-it-job-market
sudo bash deploy/ec2/configure_public_https.sh
sudo nginx -t
sudo /opt/vnjob-certbot/bin/certbot certificates
sudo systemctl list-timers vnjob-certbot.timer --no-pager
~~~

Script cần Certbot executable, site vnjob và proxy include sẵn có; backup cấu hình, cài /usr/local/sbin/vnjob-auto-https.py và units, chạy reconcile rồi bật timer. Helper đọc IMDSv2, cấu hình ACME HTTP, cấp chứng chỉ khi IP thay đổi hoặc còn dưới hai ngày, kiểm Nginx rồi reload/rollback khi lỗi. Timer boot 30 giây, sau mỗi lượt hoàn tất 30 phút.

Khi IP công khai thay đổi, dịch vụ kiểm tra địa chỉ mới và cập nhật chứng chỉ cùng cấu hình Nginx.

### Kiểm tra kết quả

Kiểm tra chứng chỉ cấp cho IP hiện tại và trạng thái timer tự động quản lý HTTPS.

### Truy cập website qua HTTPS

HTTPS mã hóa dữ liệu trao đổi giữa trình duyệt và website, bảo vệ thông tin đăng nhập và hoạt động của người dùng khi truyền qua mạng. Dashboard được truy cập qua địa chỉ **https://18.143.183.231** như hình dưới.

![Dashboard Vietnam IT Job Market hiển thị qua địa chỉ HTTPS của dự án](/images/workshop/setup-5-11-browser-https.png)

### Chứng chỉ HTTPS đã cài

Certbot quản lý chứng chỉ **vnjob-ip** cho địa chỉ IP của máy chủ. Kết quả kiểm tra cho thấy chứng chỉ dùng khóa **ECDSA**, còn hiệu lực tại thời điểm chụp và hết hạn lúc **23:21:51 ngày 17/11/2026 (UTC)**.

```bash
sudo /opt/vnjob-certbot/bin/certbot certificates
sudo systemctl status vnjob-certbot.timer --no-pager -n 0
```

Timer **vnjob-certbot** tự động kích hoạt dịch vụ quản lý HTTPS. Kết quả hiển thị timer đã **enabled**, đang **active (waiting)** và có lịch chạy tiếp theo.

![Chứng chỉ HTTPS còn hiệu lực và timer vnjob-certbot đang chờ lịch chạy tiếp theo](/images/workshop/setup-5-11-certificates.png)


---

[← 5.11. Thiết lập Nginx và HTTPS theo IP](../) · [Mục lục Workshop](../../) · [Bước trước](../5.11.1-step1/) · [Bước tiếp →](../5.11.3-step3/)
