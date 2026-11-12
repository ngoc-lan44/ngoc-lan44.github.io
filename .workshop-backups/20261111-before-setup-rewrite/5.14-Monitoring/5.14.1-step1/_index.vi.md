---
title: "CloudWatch"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.14.1. </b> "
aliases:
  - "/5-workshop/5.10-monitoring-results/5.10.1-step1/"
---

**Mục tiêu:** CloudWatch.

**Bối cảnh:** Đối chiếu CloudWatch, các trang trạng thái và runbook.

### Các bước thực hiện

Mở **CloudWatch → Logs → /vn-it-job-market/ec2**, chọn stream của instance và khoảng thời gian run. Đối chiếu với journal trên EC2. Metric **VietnamITJobMarket/PipelineFailure** và alarm **vn-it-job-market-pipeline-failed** theo dõi lỗi pipeline.

~~~bash
systemctl status amazon-cloudwatch-agent vnjob-log-export --no-pager
systemctl cat vnjob-log-export.service
aws cloudwatch describe-alarms --alarm-names vn-it-job-market-pipeline-failed --region ap-southeast-1
~~~

systemctl chạy trên EC2, aws chạy trên máy quản trị. Kiểm unit exporter thực cài để biết dịch vụ đang gửi log; cấu hình monitoring trong source đặt retention 14 ngày. Alarm Console chưa đồng nghĩa có thông báo SNS/email.


> 📸 **[CẦN THÊM ẢNH 5.14-01]**
>
> Ảnh CloudWatch log stream có timestamp/run_id và alarm details: metric, threshold, trạng thái và actions.
>
> File: `5-14-01.png`

### Cấu hình khi tái lập giám sát

Project có hai bước riêng, chỉ thực hiện trong đợt cấu hình được cho phép:

1. Trên máy quản trị có trạng thái deployment hợp lệ trong data/control/ec2_deployment.json, dùng deploy/ec2/configure_monitoring.py để cấu hình quyền log cho role dự án, log group/retention, metric filter và alarm.
2. Trên EC2, cài agent/exporter bằng script tương ứng:

~~~bash
cd /opt/vn-it-job-market
sudo bash deploy/ec2/install_monitoring.sh
~~~

Source installer xuất journal dashboard/pipeline/projection vào /var/log/vnjob/services.log và gửi tới stream theo instance, có logrotate. Unit thực cài có thể đã được bổ sung ở một đợt sau; đọc systemctl cat trước khi khẳng định tất cả worker đều đã gửi log.

Alarm source dùng Sum trong 300 giây, ngưỡng lớn hơn hoặc bằng 1, một kỳ đánh giá và missing data không coi là breach. Đây là alarm Console; script không cấu hình nơi nhận thông báo. Đối chiếu cấu hình AWS thật trước khi ghi kết quả nghiệm thu.

### Kết quả mong đợi

Log và alarm gắn với instance/run/thời điểm thực tế.

### Source đối chiếu

- `deploy/ec2/configure_monitoring.py`
- `deploy/ec2/install_monitoring.sh`
- `dashboard/admin_monitoring.py`
- `docs/OPERATIONS_RUNBOOK.md`

---

[← 5.14. Giám sát và xử lý sự cố](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.14.2-step2/)
