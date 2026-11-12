---
title: "Kiểm tra HTTP, HTTPS và WebSocket"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.11.3. </b> "
aliases:
  - "/5-workshop/5.12-nginx-https/5.12.2-step2/"
  - "/5-workshop/5.8-ec2-https/5.8.4-step4/"
---

**Thực hiện tại:** Terminal SSM trên EC2 và trình duyệt

### Mục tiêu

Nghiệm thu đường truy cập sau cấu hình.

### Điều kiện đầu vào

Dùng IPv4 hiện tại lấy từ Console, không dùng IP cũ trong biên bản.

### Các bước thực hiện

Kiểm tra chuyển hướng HTTP và phản hồi HTTPS trong Terminal SSM. Sau đó mở website trên trình duyệt để kiểm tra kết nối tương tác của Streamlit.

### Kiểm tra kết quả

Kiểm tra lần lượt chuyển hướng HTTP, phản hồi HTTPS và kết nối WebSocket.

### Kiểm tra chuyển hướng HTTP và phản hồi HTTPS

Nginx chuyển truy cập HTTP sang HTTPS để người dùng tiếp tục sử dụng kết nối được mã hóa. Lệnh kiểm tra trả về **301 Moved Permanently**, với header **Location: https://18.143.183.231/**.

```bash
curl -I http://18.143.183.231
curl --fail https://18.143.183.231/_stcore/health
```

Endpoint **/_stcore/health** trả về **ok** qua HTTPS, xác nhận ứng dụng phản hồi qua Nginx với kết nối TLS được curl xác thực.

![HTTP chuyển hướng 301 sang HTTPS và endpoint health trả về ok](/images/workshop/setup-5-11-http-redirect.png)

### Kết nối WebSocket

Mở DevTools (F12) → Network → Socket, tải lại trang và chọn **stream** → **Headers**.

WebSocket duy trì kết nối tương tác giữa trình duyệt và Streamlit khi người dùng sử dụng dashboard. Trong DevTools, kết nối **wss://18.143.183.231/_stcore/stream** trả về **101 Switching Protocols**, xác nhận bắt tay WebSocket thành công qua Nginx trên kết nối TLS.

![DevTools hiển thị kết nối WebSocket bảo mật đến Streamlit với trạng thái 101 Switching Protocols](/images/workshop/setup-5-11-websocket.png)


---

[← 5.11. Thiết lập Nginx và HTTPS theo IP](../) · [Mục lục Workshop](../../) · [Bước trước](../5.11.2-step2/)
