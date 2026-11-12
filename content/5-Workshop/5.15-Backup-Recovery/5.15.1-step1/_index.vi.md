---
title: "Sao lưu dữ liệu và kiểm tra khả năng phục hồi"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.15.1. </b> "
---

**Thực hiện tại:** AWS Console và Terminal SSM trên EC2

### Mục tiêu

Lưu bản sao dữ liệu và kiểm tra khả năng khôi phục vào thư mục riêng.

### Điều kiện đầu vào

Thư mục backup riêng tư có quyền vnjob; tên ZIP mới và destination chưa tồn tại.

### Bản sao lưu Parquet trên Amazon S3

Bản sao lưu giữ lại một phiên bản dữ liệu phân tích để sử dụng khi cần phục hồi. Trong bucket của dự án, mở **deploy/ → ec2/ → backups/**.

![Thư mục triển khai và backups trên S3](/images/workshop/setup-5-15-deploy-folders.png)

Mở thư mục bản sao lưu bên trong **backups/**.

![Thư mục chứa bản sao lưu](/images/workshop/setup-5-15-backup-folder.png)

Bản sao lưu chứa **current_jobs.parquet**, dung lượng **119.5 KB**, được cập nhật ngày **28/10/2026 lúc 17:42:02 (UTC+07:00)**. Đây là phiên bản dữ liệu được lưu riêng với tệp phân tích đang sử dụng tại **analytics/itviec/**.

![Tệp current_jobs.parquet được sao lưu trên S3](/images/workshop/setup-5-15-backup-parquet.png)

### Sao lưu và kiểm tra phục hồi bằng công cụ dự án

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python deploy/ec2/backup_data.py backup /duong-dan-rieng/backup-moi.zip
sudo -u vnjob .venv/bin/python deploy/ec2/backup_data.py verify-restore /duong-dan-rieng/backup-moi.zip --destination /duong-dan-rieng/restore-thu-moi
~~~

Thay đường dẫn trong lệnh bằng thư mục sao lưu đã chuẩn bị. Lệnh **backup** tạo tệp ZIP mới và khóa thao tác pipeline trong lúc sao lưu. Lệnh **verify-restore** kiểm tra danh sách tệp, dung lượng và SHA256 trước khi giải nén vào thư mục mới.

Tùy chọn **--s3-bucket** bổ sung các object S3 thuộc phạm vi của công cụ; việc sao lưu DynamoDB được quản lý riêng. Sau khi khôi phục, kiểm tra số bản ghi JSON và cấu trúc Parquet trước khi sử dụng dữ liệu.

### Kết quả cần đạt khi kiểm tra phục hồi

Tệp sao lưu vượt qua kiểm tra tính toàn vẹn và được giải nén vào thư mục riêng, giữ nguyên dữ liệu của ứng dụng đang chạy.



---

[← 5.15. Sao lưu và kiểm tra phục hồi dữ liệu](../) · [Mục lục Workshop](../../)
