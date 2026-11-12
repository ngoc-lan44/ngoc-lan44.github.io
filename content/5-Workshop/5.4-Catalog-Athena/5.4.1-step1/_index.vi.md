---
title: "Database, bảng nguồn và cấu hình Athena"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.4.1. </b> "
aliases:
  - "/5-workshop/5.6-glue-catalog/"
  - "/5-workshop/5.6-glue-catalog/5.6.1-step1/"
  - "/5-workshop/5.6-glue-catalog/5.6.2-step2/"
  - "/5-workshop/5.4-s3-glue-athena/5.4.2-step2/"
---

### Vai trò trong hệ thống

Glue Data Catalog lưu tên cột, kiểu dữ liệu và vị trí file Parquet để Athena đọc đúng dữ liệu trên S3. Athena thực hiện truy vấn SQL phục vụ dashboard; kết quả truy vấn được lưu riêng tại control/athena-results/, tách khỏi dữ liệu phân tích đầu vào.

### Database của dự án

Database **vn_it_job_market** tập hợp định nghĩa các bảng và view của dữ liệu việc làm trong Glue Data Catalog. Athena sử dụng các định nghĩa này để xác định cấu trúc và vị trí dữ liệu cần truy vấn. Dữ liệu Parquet được lưu trên S3; database này lưu metadata phục vụ truy vấn.

![Database vn_it_job_market trong AWS Glue Data Catalog](/images/workshop/setup-5-4-database.png)

### Bảng nguồn và các view phân tích

Bảng **itviec_current_jobs** mô tả dữ liệu việc làm trong file Parquet trên S3. Các view **itviec_active_jobs** và **itviec_active_job_skills** cung cấp dữ liệu việc làm và kỹ năng sau khi áp dụng trạng thái kiểm duyệt, phục vụ danh sách việc làm, KPI và biểu đồ trên dashboard. Nhóm **itviec_deleted_jobs** và **itviec_moderation_control_v3** hỗ trợ xác định các việc làm cần loại khỏi dữ liệu hiển thị.

![Danh sách bảng và view của database vn_it_job_market trong Glue Data Catalog](/images/workshop/setup-5-4-tables.png)

### Cấu hình đã sử dụng

| Cấu hình | Giá trị của dự án |
| --- | --- |
| Data source | AwsDataCatalog |
| Database | vn_it_job_market |
| Bảng nguồn | itviec_current_jobs |
| Workgroup runtime | primary |
| Table location | s3://vn-it-job-market-data-381924757765-ap-southeast-1-an/analytics/itviec/ |
| Query result location | s3://vn-it-job-market-data-381924757765-ap-southeast-1-an/control/athena-results/ |

### Vị trí dữ liệu và cấu trúc bảng

Thuộc tính **Location** của bảng trỏ đến **analytics/itviec/** trên S3, giúp Athena tìm đúng tập dữ liệu Parquet để truy vấn. **Schema** định nghĩa tên và kiểu dữ liệu của các cột, giúp Athena đọc mã việc làm, tiêu đề, kỹ năng, mức lương và thời gian theo cấu trúc thống nhất. Bảng của dự án có **24 cột**; các cột đầu gồm **job_id**, **source_job_id** và **title**, đều có kiểu **string**.

![Chi tiết bảng itviec_current_jobs với S3 Location và Schema trong AWS Glue](/images/workshop/setup-5-4-table-details.png)

Các cột được khai báo theo mục đích sử dụng: **salary_min/salary_max** dùng kiểu số để truy vấn mức lương; **salary_available** là giá trị boolean để lọc tin công khai lương; **skills** là mảng để thống kê kỹ năng; **experience_months** lưu số tháng kinh nghiệm. Các trường **posted_date**, **expired_date** và **first_seen** hỗ trợ lọc theo thời gian và theo dõi dữ liệu việc làm.

![Trang đầu Schema của bảng itviec_current_jobs với các cột 1 đến 20](/images/workshop/setup-5-4-schema-page1.png)


![Trang hai Schema của bảng itviec_current_jobs với các cột last_seen, status, source và url](/images/workshop/setup-5-4-schema-page2.png)






### Lưu kết quả truy vấn Athena

Đường dẫn **control/athena-results/** lưu các file kết quả truy vấn, giúp ứng dụng lấy dữ liệu do Athena trả về. Việc tách kết quả truy vấn khỏi **analytics/itviec/** giữ riêng dữ liệu phân tích đầu vào và dữ liệu đầu ra. Ứng dụng chỉ định đường dẫn lưu kết quả khi gửi yêu cầu truy vấn đến Athena.

Trong bucket của dự án, **control/** tập hợp dữ liệu phục vụ vận hành.

![Thư mục control trong bucket S3 của dự án](/images/workshop/setup-5-4-results-bucket.png)

Bên trong **control/**, thư mục **athena-results/** dành cho kết quả truy vấn; **moderation/** và **moderation-backups/** phục vụ dữ liệu kiểm duyệt và bản sao lưu.

![Thư mục athena-results bên trong control trên S3](/images/workshop/setup-5-4-control-folder.png)

Các file **.csv** lưu những dòng dữ liệu do truy vấn trả về; file **.csv.metadata** đi kèm lưu metadata của kết quả để Athena xử lý khi đọc lại. Tên file theo mã thực thi truy vấn giúp đối chiếu kết quả trên S3 với lịch sử truy vấn trong Athena.

![Các file CSV và metadata kết quả Athena được lưu tại control/athena-results](/images/workshop/setup-5-4-athena-result-files.png)


---

[← 5.4. Thiết lập Glue Data Catalog và Athena](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.4.2-step2/)
