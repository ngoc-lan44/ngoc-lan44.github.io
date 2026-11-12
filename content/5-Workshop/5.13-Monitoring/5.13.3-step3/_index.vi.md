---
title: "Theo dõi ứng dụng và xử lý sự cố"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.13.3. </b> "
aliases:
  - "/5-workshop/5.14-monitoring/5.14.2-step2/"
  - "/5-workshop/5.14-monitoring/5.14.3-step3/"
  - "/5-workshop/5.10-monitoring-results/5.10.2-step2/"
---

**Thực hiện tại:** CloudWatch, Website ADMIN và SSM

### Mục tiêu

Dùng các trang quản trị và runbook sau thiết lập.

### Điều kiện đầu vào

Log/artifact và quyền ADMIN sẵn sàng.

### Các bước thực hiện

Mở Trạng thái hệ thống, Trạng thái thu thập dữ liệu và Chất lượng dữ liệu. So run_id, thời điểm, stage, số dòng và cảnh báo với artifact/query cùng lượt. Thiếu lương do nguồn không công khai khác lỗi thiếu trường bắt buộc.

~~~bash
sudo systemctl status vnjob-dashboard vnjob-pipeline vnjob-pipeline.timer --no-pager
sudo journalctl -u vnjob-pipeline.service -n 120 --no-pager
df -h /opt/vn-it-job-market
free -m
~~~

Khi có sự cố, xem nhật ký để xác định bước bị lỗi và kiểm tra kết nối mạng, quyền truy cập hoặc dữ liệu đầu vào. Đối chiếu nhật ký CloudWatch với trạng thái lượt chạy trên EC2 trước khi xử lý.

### Theo dõi nhật ký trên CloudWatch

Mở log group **/vn-it-job-market/ec2**, chọn stream **i-0e6d841407d7baa32/services** để xem các sự kiện theo thời gian. Nhật ký giúp theo dõi dịch vụ và tra cứu nguyên nhân khi xảy ra sự cố.

Ảnh ghi nhận **MODERATION_PROJECTION_SYNCED** của Projection Worker và **HTTPS_READY https://18.143.183.231** của dịch vụ quản lý HTTPS. Các dòng **Deactivated successfully** và **Finished** ghi nhận những lượt dịch vụ đã kết thúc thành công.

![CloudWatch Log events ghi nhận đồng bộ moderation và trạng thái HTTPS sẵn sàng](/images/workshop/setup-5-13-log-events.png)

### Theo dõi trạng thái hệ thống trên website

Đăng nhập bằng tài khoản quản trị, chọn **Trạng thái hệ thống**. Trang này tập trung tình trạng kết nối dữ liệu, tệp lưu trữ và thời điểm cập nhật để quản trị viên theo dõi hoạt động của ứng dụng.

**Tổng quan hệ thống** hiển thị 654 việc làm đang hoạt động, 321 doanh nghiệp và 131 việc làm công khai lương. Trang báo Athena và S3 đang kết nối, có dữ liệu phân tích và dữ liệu đã làm sạch.

![Tổng quan trạng thái hệ thống trên trang quản trị](/images/workshop/setup-5-13-system-overview.png)

**Lưu trữ AWS và quy trình xử lý dữ liệu** giúp kiểm tra vị trí tệp và các thành phần tham gia xử lý. Ảnh hiển thị Parquet phân tích trên S3 có dung lượng 152.02 KB, cập nhật ngày 11/11/2026; tệp JSON đã làm sạch trên S3 có thời điểm cập nhật riêng là 01/11/2026.

![Tệp lưu trữ trên S3 và các giai đoạn xử lý dữ liệu](/images/workshop/setup-5-13-system-storage.png)

**Thông tin cập nhật và tình trạng dịch vụ** giúp theo dõi độ mới của dữ liệu. Trang hiển thị lần ghi nhận gần nhất từ Athena lúc 15:52:40 và Parquet cập nhật trên S3 lúc 15:52:45 ngày 11/11/2026, theo giờ Việt Nam; bảng dịch vụ hiển thị trạng thái S3, Glue, Athena và Streamlit.

![Thời điểm cập nhật dữ liệu và tình trạng các dịch vụ của ứng dụng](/images/workshop/setup-5-13-system-services.png)

### Theo dõi trạng thái thu thập dữ liệu

Chọn **Trạng thái thu thập dữ liệu** để theo dõi tiến độ pipeline và kết quả đồng bộ. Lượt chạy **20261111T081952Z-a435a240** hiển thị **Thành công**, **Đã kết thúc** và hoàn tất **25/25 đợt**. Đợt cuối thu thập thành công **24 tin**, không có tin thất bại và được ghi nhận đầy đủ.

![Trạng thái pipeline thành công và kết quả đợt thu thập cuối](/images/workshop/setup-5-13-crawl-overview.png)

Bảng đồng bộ ghi nhận **624 việc làm nhận vào**, gồm **13 việc làm mới**, **2 cập nhật** và **609 không đổi**; tổng dữ liệu hiện tại là **1.072 việc làm**. Bảng cũng ghi nhận **24 việc làm hết hạn** và trạng thái ảnh chụp đầy đủ là **Không**. Biểu mẫu **Phục hồi hệ thống** cho phép quản trị viên gửi yêu cầu quét bù hoặc chạy lại hôm nay, kèm lý do và xác nhận.

![Kết quả đồng bộ dữ liệu và biểu mẫu yêu cầu phục hồi hệ thống](/images/workshop/setup-5-13-crawl-sync.png)

### Theo dõi chất lượng dữ liệu

Chọn **Chất lượng dữ liệu**, sử dụng nguồn **Clean JSON local** để xem kết quả kiểm tra tập dữ liệu đã làm sạch trên EC2. Trang này giúp quản trị viên phát hiện bản ghi trùng, trường thiếu và giá trị bất thường; không tự sửa dữ liệu nguồn.

Ảnh hiển thị **1.072 việc làm**, **0 trùng mã việc làm**, **438 việc làm chưa xác định cấp bậc** và điểm chất lượng nội bộ **95,7/100**.

![Tổng quan chất lượng dữ liệu từ Clean JSON local](/images/workshop/setup-5-13-quality-overview.png)

Bảng kiểm tra ghi nhận **0 URL trùng**, không thiếu mã việc làm, vị trí tuyển dụng, công ty, địa điểm hoặc kỹ năng. Có **846 bản ghi không có lương dạng số** và **97 bản ghi chưa xác định kinh nghiệm**; số bản ghi lương bất thường và salary_min lớn hơn salary_max đều bằng **0**. Các nhóm chi tiết giúp quản trị viên xem những bản ghi cần kiểm tra. Thiếu thông tin lương hoặc cấp bậc không tự động đồng nghĩa dữ liệu sai; điểm chất lượng là chỉ số nội bộ.

![Bảng kiểm tra và các nhóm chi tiết chất lượng dữ liệu](/images/workshop/setup-5-13-quality-checks.png)


---

[← 5.13. Thiết lập CloudWatch và giám sát](../) · [Mục lục Workshop](../../) · [Bước trước](../5.13.2-step2/)
