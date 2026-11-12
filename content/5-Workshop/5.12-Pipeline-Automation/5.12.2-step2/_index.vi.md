---
title: "Cài Operations Worker và bật chức năng vận hành"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.12.2. </b> "
aliases:
  - "/5-workshop/5.13-pipeline-automation/5.13.3-step3/"
  - "/5-workshop/5.13-pipeline-automation/5.13.5-step5/"
  - "/5-workshop/5.9-pipeline-automation/5.9.3-step3/"
  - "/5-workshop/5.9-pipeline-automation/5.9.5-step5/"
---

**Thực hiện tại:** SSM và secrets.toml

### Mục tiêu

Cài backend phục hồi trước khi bật chức năng ADMIN.

### Điều kiện đầu vào

Runtime đã có; source worker thuộc root; tài khoản ADMIN hợp lệ.

### Các bước thực hiện

~~~bash
cd /opt/vn-it-job-market
sudo bash deploy/ec2/install_recovery.sh
systemctl status vnjob-operations.timer --no-pager
sudo journalctl -u vnjob-operations.service -n 80 --no-pager
~~~

Script cài unit/timer operations, cập nhật/restart pipeline timer. Vì restart timer có thể liên quan lịch bù, chọn thời điểm thiết lập sau khi kiểm trạng thái pipeline.

Sau kiểm worker, đặt operations_enabled=true trong [auth] của secrets rồi restart dashboard. Trong env, PIPELINE_AUTO_RETRY=true bật retry giới hạn; OPERATIONS_ACCOUNTS_KEY=users/accounts.json phải khớp dữ liệu thực.

Operations Worker kiểm tra quyền quản trị và chỉ xử lý các yêu cầu vận hành được hệ thống cho phép, như khởi động lại dashboard hoặc chạy lại pipeline.

### Trạng thái timer Operations Worker

Timer **vnjob-operations** kích hoạt dịch vụ xử lý yêu cầu vận hành. Cấu hình **OnBootSec=2min** đặt lần kích hoạt sau khi máy chủ khởi động 2 phút; **OnUnitActiveSec=1min** đặt khoảng cách tính từ lần kích hoạt dịch vụ trước.

```bash
sudo systemctl status vnjob-operations.timer --no-pager -n 0
sudo systemctl cat vnjob-operations.timer
```

Ảnh ghi nhận timer đã **enabled**, đang **active (running)** và liên kết với **vnjob-operations.service**.

![Trạng thái và cấu hình timer Operations Worker trên EC2](/images/workshop/setup-5-12-03.png)


### Nhật ký thực thi

Operations Worker chạy theo từng lượt để kiểm tra và xử lý yêu cầu vận hành được cho phép. Nhật ký ghi nhận các lượt dịch vụ kết thúc với **Deactivated successfully** và **Finished**.

```bash
sudo journalctl -u vnjob-operations.service -n 30 --no-pager -o cat
```

![Nhật ký Operations Worker ghi nhận các lượt dịch vụ kết thúc thành công](/images/workshop/setup-5-12-operations-log.png)


---

[← 5.12. Thiết lập lịch pipeline và Operations Worker](../) · [Mục lục Workshop](../../) · [Bước trước](../5.12.1-step1/) · [Bước tiếp →](../5.12.3-step3/)
