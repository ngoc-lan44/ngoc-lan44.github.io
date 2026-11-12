---
title: "CloudWatch"
date: 2026-11-10
weight: 1
chapter: false
pre: " <b> 5.10.1. </b> "
---

Mở **CloudWatch → Logs → /vn-it-job-market/ec2**, chọn stream của instance và khoảng thời gian run. Đối chiếu với journal trên EC2. Metric **VietnamITJobMarket/PipelineFailure** và alarm **vn-it-job-market-pipeline-failed** theo dõi lỗi pipeline.

~~~bash
systemctl status amazon-cloudwatch-agent vnjob-log-export --no-pager
systemctl cat vnjob-log-export.service
aws cloudwatch describe-alarms --alarm-names vn-it-job-market-pipeline-failed --region ap-southeast-1
~~~

systemctl chạy trên EC2, aws chạy trên máy quản trị. Kiểm unit exporter thực cài để biết dịch vụ đang gửi log; cấu hình monitoring trong source đặt retention 14 ngày. Alarm Console chưa đồng nghĩa có thông báo SNS/email.

**Kiểm tra sau bước này:** Log và alarm gắn với instance/run/thời điểm thực tế.

> 📸 **[CẦN THÊM ẢNH 5.10-01]**
>
> Ảnh CloudWatch log stream có timestamp/run_id và alarm details: metric, threshold, trạng thái và actions.
>
> File: `5-10-01.png`

---

[← 5.10](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.10.2-step2/)
