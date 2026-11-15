---
title: "Workshop"
date: 2026-11-11T00:00:00+07:00
weight: 4
chapter: false
pre: " <b> 4. </b> "
aliases:
  - "/4-workshop/"
---

## THIẾT LẬP VÀ TRIỂN KHAI VIETNAM IT JOB MARKET TRÊN AWS

Workshop trình bày quá trình thiết lập Vietnam IT Job Market trên AWS, từ chuẩn bị tài nguyên, thu thập và xử lý dữ liệu ITviec đến triển khai dashboard, quản trị và giám sát vận hành.

**Region:** ap-southeast-1 — Singapore. **Source:** E:\vn-it-job-market. **Runtime:** /opt/vn-it-job-market trên một EC2.

### Nội dung

| Mục | Phần thiết lập |
| --- | --- |
| 4.1 | [Giới thiệu](5.1-Introduction/) |
| 4.2 | [Các bước chuẩn bị](5.2-Prerequisites/) |
| 4.3 | [Thiết lập lưu trữ trên Amazon S3](5.3-S3-Storage/) |
| 4.4 | [Thiết lập Glue Data Catalog và Athena](5.4-Catalog-Athena/) |
| 4.5 | [Thiết lập DynamoDB và dữ liệu kiểm duyệt](5.5-DynamoDB-Moderation/) |
| 4.6 | [Triển khai mã nguồn và môi trường chạy trên EC2](5.6-EC2-Deployment/) |
| 4.7 | [Thiết lập và chạy thu thập ITviec](5.7-ITviec-Collection/) |
| 4.8 | [Thiết lập ETL và công bố Parquet](5.8-Data-Processing/) |
| 4.9 | [Cấu hình và triển khai Streamlit Dashboard](5.9-Streamlit-Dashboard/) |
| 4.10 | [Thiết lập tài khoản và chức năng quản trị](5.10-Users-Administration/) |
| 4.11 | [Thiết lập Nginx và HTTPS theo IP](5.11-Nginx-HTTPS/) |
| 4.12 | [Thiết lập lịch pipeline và Operations Worker](5.12-Pipeline-Automation/) |
| 4.13 | [Thiết lập CloudWatch và giám sát](5.13-Monitoring/) |
| 4.14 | [Kiểm thử và nghiệm thu triển khai](5.14-Testing-Results/) |
| 4.15 | [Sao lưu và kiểm tra phục hồi dữ liệu](5.15-Backup-Recovery/) |
| 4.16 | [Dọn dẹp tài nguyên và kết luận](5.16-Cleanup-Conclusion/) |

### Cách thực hiện

Thực hiện theo thứ tự các mục bên dưới. Pipeline điều phối việc thu thập, đồng bộ, làm sạch và công bố dữ liệu. Sử dụng cùng mã lượt chạy để liên kết kết quả trên EC2 với tệp Parquet trên S3.

Đối với tài nguyên đã có trên AWS, bài ghi cấu hình sử dụng và ảnh tài nguyên sau thiết lập, không yêu cầu tạo lại. Các bước source, runtime, pipeline và ETL trình bày trình tự triển khai cùng kiểm tra kết quả.

---

[Bắt đầu: 4.1. Giới thiệu →](5.1-Introduction/)
