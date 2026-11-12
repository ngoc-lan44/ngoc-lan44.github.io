---
title: "Cài CloudWatch Agent và bộ xuất log"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.13.2. </b> "
aliases:
  - "/5-workshop/5.14-monitoring/5.14.1-step1/"
  - "/5-workshop/5.10-monitoring-results/5.10.1-step1/"
---

**Thực hiện tại:** SSM trên EC2 và CloudWatch Console

### Mục tiêu

Gửi journal vận hành lên CloudWatch.

### Điều kiện đầu vào

Quyền log và log group ở bước trước đã có.

### Các bước thực hiện

~~~bash
cd /opt/vn-it-job-market
sudo bash deploy/ec2/install_monitoring.sh
systemctl status amazon-cloudwatch-agent vnjob-log-export --no-pager
systemctl cat vnjob-log-export.service
~~~

Bộ cài chuẩn bị CloudWatch Agent, dịch vụ xuất nhật ký và cơ chế luân chuyển tệp log. Nhật ký được gửi đến log stream của instance trong nhóm **/vn-it-job-market/ec2**.

Mở CloudWatch → Logs → /vn-it-job-market/ec2, chọn stream instance và cùng khoảng thời gian run. Mở alarm để kiểm metric, threshold, trạng thái và actions. 

### Trạng thái CloudWatch Agent

CloudWatch Agent chuyển nhật ký đã cấu hình trên EC2 lên CloudWatch Logs để theo dõi tập trung. Kết quả kiểm tra hiển thị dịch vụ **active (running)** và **enabled**, cho phép tự khởi động cùng máy chủ.

```bash
sudo systemctl status amazon-cloudwatch-agent --no-pager -n 0
```

![Amazon CloudWatch Agent đang chạy và được bật khởi động cùng hệ thống trên EC2](/images/workshop/setup-5-13-agent-status.png)


### Trạng thái bộ xuất nhật ký

Dịch vụ **vnjob-log-export** thu thập journal của dashboard, pipeline, projection và Certbot vào tệp đầu vào cho CloudWatch Agent. Ảnh cho thấy dịch vụ **active (running)** và **enabled**, giúp duy trì việc thu thập nhật ký sau khi EC2 khởi động lại.

```bash
sudo systemctl status vnjob-log-export --no-pager -n 0
```

![Bộ xuất nhật ký vnjob-log-export đang chạy trên EC2](/images/workshop/setup-5-13-log-export-status.png)

---

[← 5.13. Thiết lập CloudWatch và giám sát](../) · [Mục lục Workshop](../../) · [Bước trước](../5.13.1-step1/) · [Bước tiếp →](../5.13.3-step3/)
