---
title: "Dữ liệu hiện tại và dịch vụ dashboard trên EC2"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.6.3. </b> "
aliases:
  - "/5-workshop/5.11-ec2-deployment/5.11.3-step3/"
  - "/5-workshop/5.11-ec2-deployment/5.11.4-step4/"
  - "/5-workshop/5.8-ec2-https/5.8.5-step5/"
  - "/5-workshop/5.8-ec2-https/5.8.6-step6/"
---

### Dữ liệu hiện tại trên EC2

File **data/current/itviec/current_jobs.json** lưu tập việc làm hiện tại để pipeline tiếp tục đồng bộ, giữ các mốc theo dõi và tạo dữ liệu phân tích. File thuộc tài khoản **vnjob**, cho phép tiến trình pipeline đọc và cập nhật dữ liệu bằng tài khoản dịch vụ.

![File current_jobs.json hiện có trên EC2 và thuộc tài khoản vnjob](/images/workshop/setup-5-6-current-file.png)

### Dịch vụ dashboard

**systemd** quản lý dashboard dưới dạng dịch vụ để ứng dụng tiếp tục chạy khi đóng phiên SSM và được khởi động cùng máy chủ. Streamlit lắng nghe tại **127.0.0.1:8501**; Nginx chuyển tiếp yêu cầu web đến cổng nội bộ này.

Lệnh kiểm tra **/_stcore/health** xác nhận tiến trình Streamlit phản hồi trên cổng nội bộ trước khi tiếp nhận truy cập qua Nginx.

![Dịch vụ vnjob-dashboard đang chạy và health endpoint trả về ok trên EC2](/images/workshop/setup-5-6-dashboard-service.png)





---

[← 5.6. Triển khai mã nguồn và môi trường chạy trên EC2](../) · [Mục lục Workshop](../../) · [Bước trước](../5.6.2-step2/)
