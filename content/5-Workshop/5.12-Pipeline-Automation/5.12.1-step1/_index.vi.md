---
title: "Lập lịch pipeline lúc 02:00 giờ Việt Nam"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.12.1. </b> "
aliases:
  - "/5-workshop/5.13-pipeline-automation/"
  - "/5-workshop/5.13-pipeline-automation/5.13.1-step1/"
  - "/5-workshop/5.9-pipeline-automation/"
  - "/5-workshop/5.9-pipeline-automation/5.9.1-step1/"
  - "/5-workshop/5.13-pipeline-automation/5.13.6-step6/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.1-step1/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.2-step2/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.3-step3/"
  - "/4-workshop/4.11-pipeline-monitoring/"
---

### Lịch cập nhật dữ liệu hằng ngày

Timer **vnjob-pipeline** kích hoạt pipeline thu thập và xử lý dữ liệu tuyển dụng mỗi ngày, giúp hệ thống cập nhật dữ liệu tự động trên EC2. Cấu hình **OnCalendar=*-*-* 19:00:00 UTC** tương ứng **02:00 giờ Việt Nam ngày kế tiếp**.

**Persistent=true** cho phép timer kích hoạt chạy bù khi bỏ lỡ lịch trong lúc máy chủ không hoạt động. **AccuracySec=1min** đặt khoảng dung sai lập lịch một phút.

### Kiểm tra cấu hình

```bash
sudo systemctl status vnjob-pipeline.timer --no-pager -n 0
sudo systemctl cat vnjob-pipeline.timer
```

Kết quả hiển thị timer đã **enabled**, đang **active (waiting)** và sẽ kích hoạt **vnjob-pipeline.service** theo lịch.

![Trạng thái và cấu hình timer pipeline chạy lúc 02:00 giờ Việt Nam hằng ngày](/images/workshop/setup-5-12-02.png)

---

[← 5.12. Thiết lập lịch pipeline và Operations Worker](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.12.2-step2/)
