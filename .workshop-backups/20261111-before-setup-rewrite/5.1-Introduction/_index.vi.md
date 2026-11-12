---
title: "Giới thiệu"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.1. </b> "
aliases:
  - "/5-workshop/5.1-overview/"
  - "/5-workshop/5.1-overview/5.1.1-step1/"
  - "/4-workshop/4.1-workshop-overview/"
  - "/4-workshop/4.2-prerequisites/"
---

Vietnam IT Job Market là hệ thống thu thập, xử lý và phân tích tin tuyển dụng CNTT từ **ITviec**. Workshop hướng dẫn lần theo dữ liệu từ nguồn đến dashboard và kiểm tra các chức năng người dùng, quản trị, vận hành trên AWS.

### Mục tiêu

- Thu thập theo discovery/batch và kiểm dữ liệu trước ETL.
- Chuẩn hóa JSON, xuất Parquet và truy vấn bằng Athena với metadata Glue.
- Sử dụng dashboard Streamlit/Plotly, chức năng USER/ADMIN và moderation.
- Kiểm lịch pipeline, HTTPS, worker, log và bằng chứng nghiệm thu.

### Kiến trúc thực tế

Một EC2 chạy pipeline, dashboard và các worker. JSON raw/current/history/clean được xử lý trên EC2; Parquet được công bố lên S3. Glue Data Catalog cung cấp metadata để Athena truy vấn. Nginx và HTTPS cung cấp truy cập web.

Tài khoản và hoạt động cá nhân lưu trên S3. DynamoDB lưu trạng thái kiểm duyệt và audit; Projection Worker xuất snapshot sang S3 để Athena lọc tin được công khai.

![Kiến trúc Vietnam IT Job Market](/images/vietnam-it-job-market-selected-architecture.png)

*Sơ đồ kiến trúc được vẽ theo source của dự án.*

### Phạm vi và cách đọc số liệu

Dữ liệu chỉ lấy từ ITviec và chỉ phản ánh các tin bộ thu thập tiếp cận được. Bốn KPI tổng quan và bốn KPI tuần không phải thống kê toàn bộ thị trường; so sánh tuần dựa trên ngày đăng của tin còn trong dataset. USER theo dõi ứng tuyển bằng trạng thái tự cập nhật, không tự gửi CV lên nguồn.

### Sản phẩm sau Workshop

Có artifact dữ liệu và run_id đối chiếu; metadata/truy vấn có Query ID; bằng chứng dashboard, tài khoản và moderation; trạng thái service/timer, HTTPS và log; bảng nghiệm thu ghi đúng ngày và kết quả. Các bước triển khai/thu thập mới được thực hiện trong phiên có kế hoạch, không tự chạy khi đọc tài liệu.

---

[Mục lục Workshop](../) · [5.2. Các bước chuẩn bị →](../5.2-Prerequisites/)
