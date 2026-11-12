---
title: "Cấu hình cổng truy cập và Nginx"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.11.1. </b> "
aliases:
  - "/5-workshop/5.12-nginx-https/"
---

### Vai trò trong hệ thống

Nginx tiếp nhận truy cập web và chuyển yêu cầu đến Streamlit đang chạy nội bộ tại 127.0.0.1:8501. Cổng 80 phục vụ HTTP và cổng 443 phục vụ HTTPS; cấu hình WebSocket duy trì kết nối tương tác của dashboard. Security Group giới hạn các cổng được phép truy cập từ bên ngoài.

### Cấu hình đã sử dụng

Stack **vn-it-job-market-ec2-public** quản lý hai ingress TCP 80/443 trên Security Group của dự án. Nginx chuyển HTTP/WebSocket về **127.0.0.1:8501**; cổng 22/8501 không mở public theo cấu hình triển khai.


Cổng **80** phục vụ xác thực chứng chỉ qua ACME và chuyển hướng HTTP; cổng **443** tiếp nhận kết nối HTTPS đến dashboard. Hai cổng cho phép truy cập từ Internet qua nguồn **0.0.0.0/0**.

![Security Group của EC2 với hai inbound rule TCP 80 và 443](/images/workshop/setup-5-11-inbound-rules.png)

Phần cấu hình ứng dụng sử dụng /etc/nginx/vnjob-proxy.inc, được cài từ deploy/ec2/proxy.inc, gồm upstream và header WebSocket/X-Forwarded-Proto. Các bước HTTPS tiếp theo mô tả cấu hình phía máy chủ.





### Kiểm tra Nginx

Lệnh `nginx -t` kiểm tra tính hợp lệ của cấu hình; `systemctl status` cho biết trạng thái dịch vụ. Kết quả hiển thị cấu hình kiểm tra thành công và Nginx đang **active (running)**, được bật khởi động cùng hệ thống.

```bash
sudo nginx -t
sudo systemctl status nginx --no-pager -n 0
```

![Kiểm tra cấu hình Nginx thành công và dịch vụ đang hoạt động trên EC2](/images/workshop/setup-5-11-nginx-status.png)


---

[← 5.11. Thiết lập Nginx và HTTPS theo IP](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.11.2-step2/)
