---
title: "Log group, metric và alarm CloudWatch"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.13.1. </b> "
aliases:
  - "/5-workshop/5.14-monitoring/"
---

### Vai trò trong hệ thống

CloudWatch tập trung log vận hành để theo dõi pipeline và tra cứu khi có lỗi. Metric PipelineFailure ghi nhận tín hiệu lỗi; alarm vn-it-job-market-pipeline-failed theo dõi metric này để phát hiện sự cố. Policy EC2CloudWatchLogs cấp quyền gửi log từ EC2 lên CloudWatch.

### Cấu hình đã sử dụng

| Thành phần | Giá trị theo project |
| --- | --- |
| Log group | /vn-it-job-market/ec2 |
| Namespace/metric | VietnamITJobMarket / PipelineFailure |
| Alarm | vn-it-job-market-pipeline-failed |
| Role policy cho log | EC2CloudWatchLogs |


Cấu hình triển khai đặt thời gian lưu log là 14 ngày. Alarm tổng hợp số lỗi trong mỗi khoảng 300 giây và chuyển sang trạng thái cảnh báo khi có ít nhất một lỗi trong khoảng đánh giá.



### Log group của dự án

Log group **/vn-it-job-market/ec2** tập trung nhật ký từ máy chủ để tra cứu hoạt động và nguyên nhân lỗi. Thời gian lưu **2 tuần** giúp giữ nhật ký gần đây và giới hạn thời gian lưu trữ. Ảnh hiển thị log group sử dụng lớp **Standard** và có **1 metric filter**.

![Log group của dự án trên CloudWatch với thời gian lưu 2 tuần và một metric filter](/images/workshop/setup-5-13-03.png)


### Log stream của máy chủ

Stream **i-0e6d841407d7baa32/services** lưu nhật ký dịch vụ của EC2 dự án trong cùng log group. Phân chia theo máy chủ giúp xác định nguồn phát sinh log khi tra cứu vận hành.

![Chi tiết log group và log stream services của EC2 dự án](/images/workshop/setup-5-13-log-streams.png)


### Chuyển tín hiệu lỗi từ log thành metric

Metric filter **PipelineFailure** tìm các sự kiện log khớp mẫu **"FAILED"** và ghi giá trị **1** vào metric **VietnamITJobMarket / PipelineFailure**, với giá trị mặc định **0**. Metric này được alarm sử dụng để phát hiện tín hiệu lỗi từ nhật ký vận hành.

![Metric filter PipelineFailure với mẫu FAILED, giá trị metric và alarm liên kết](/images/workshop/setup-5-13-metric-filter.png)

### Cảnh báo lỗi pipeline

Alarm **vn-it-job-market-pipeline-failed** theo dõi tín hiệu lỗi pipeline, với điều kiện **PipelineFailure ≥ 1** cho một điểm dữ liệu trong **5 phút**. Tại thời điểm chụp, alarm ở trạng thái **OK**. Cột **No actions** cho biết chưa gắn hành động thông báo hoặc xử lý tự động vào alarm.

![Danh sách CloudWatch alarm của pipeline với trạng thái OK và điều kiện cảnh báo](/images/workshop/setup-5-13-alarm-list.png)


Biểu đồ **PipelineFailure** giúp theo dõi giá trị metric theo thời gian và so sánh với ngưỡng cảnh báo. Trong khoảng thời gian đang hiển thị, đường metric nằm ở mức **0** và alarm ở trạng thái **OK**.

![Biểu đồ PipelineFailure và trạng thái OK của alarm trên CloudWatch](/images/workshop/setup-5-13-alarm-graph.png)


### Cấu hình đánh giá cảnh báo

Alarm cộng giá trị **PipelineFailure** bằng thống kê **Sum** trong mỗi **5 phút** và cảnh báo khi một điểm dữ liệu đạt **≥ 1**. Dữ liệu thiếu được coi là không vượt ngưỡng; vì vậy, trạng thái **OK** cần được xem cùng nhật ký vận hành để đánh giá pipeline. Alarm hiện phục vụ theo dõi trên Console, chưa cấu hình đích thông báo.

![Chi tiết metric, chu kỳ, ngưỡng và cách xử lý dữ liệu thiếu của alarm pipeline](/images/workshop/setup-5-13-alarm-details.png)


---

[← 5.13. Thiết lập CloudWatch và giám sát](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.13.2-step2/)
