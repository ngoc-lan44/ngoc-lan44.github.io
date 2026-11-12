---
title: "Tổng hợp kết quả thực hiện"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.14.3. </b> "
aliases:
  - "/5-workshop/5.15-testing-results/5.15.2-step2/"
  - "/5-workshop/5.10-monitoring-results/5.10.4-step4/"
---

Hệ thống đã triển khai luồng thu thập ITviec, xử lý bằng Python trên EC2, xuất Parquet lên S3 và truy vấn bằng Athena qua Glue Data Catalog. Streamlit cung cấp dashboard, chức năng người dùng và quản trị; Nginx và HTTPS phục vụ truy cập web.

Trong lượt chạy ngày **11/11/2026**, pipeline thu thập **624 tin**, đồng bộ thành tập dữ liệu hiện tại **1.072 việc làm** và công bố Parquet thành công. Dashboard hiển thị **654 việc làm đang hoạt động**, **321 doanh nghiệp** và **131 việc làm công khai lương**. Tổng dữ liệu hiện tại bao gồm các trạng thái việc làm nên khác số việc làm đang hoạt động trên dashboard.

Các kết quả kiểm thử và ảnh vận hành cho thấy những chức năng đã kiểm tra hoạt động theo thiết kế. Dữ liệu phân tích được giới hạn trong nguồn ITviec.


---

[← 5.14. Kiểm thử và nghiệm thu triển khai](../) · [Mục lục Workshop](../../) · [Bước trước](../5.14.2-step2/)
