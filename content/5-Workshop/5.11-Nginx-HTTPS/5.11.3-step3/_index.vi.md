---
title: "Kiểm tra HTTP, HTTPS và WebSocket"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 4.10.3. </b> "
aliases:
  - "/5-workshop/5.12-nginx-https/5.12.2-step2/"
  - "/5-workshop/5.8-ec2-https/5.8.4-step4/"
---

Nginx chuyển truy cập HTTP sang HTTPS để bảo vệ dữ liệu truyền giữa trình duyệt và ứng dụng.

Địa chỉ được xác minh trong đợt triển khai ngày **16/11/2026** là **https://47.128.13.35**. EC2 dùng IP tự cấp nên địa chỉ có thể thay đổi khi Stop/Start.

~~~bash
curl -I http://47.128.13.35
curl --fail https://47.128.13.35/_stcore/health
~~~

HTTP trả về **301 Moved Permanently** và chuyển sang HTTPS. Health endpoint qua HTTPS trả về **ok**, xác nhận ứng dụng phản hồi qua kết nối bảo mật.

![Kết quả chuyển hướng HTTP sang HTTPS và kiểm tra health endpoint ngày 16/11/2026](/images/workshop/setup-http-https-health-2026-11-16.png)

### Kiểm tra WebSocket

WebSocket duy trì kết nối tương tác của Streamlit. Mở DevTools → Network → Socket, tải lại trang và chọn **stream**. Trong Headers, kiểm tra kết nối **wss://47.128.13.35/_stcore/stream**; kết nối trả về **101 Switching Protocols**.

![WebSocket tại 47.128.13.35 trả về 101 Switching Protocols ngày 16/11/2026](/images/workshop/setup-websocket-2026-11-16.png)


---

[← 4.10. Thiết lập Nginx và HTTPS theo IP](../) · [Mục lục Workshop](../../) · [Bước trước](../5.11.2-step2/)
