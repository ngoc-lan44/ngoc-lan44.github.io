---
title: "Workshop"
date: 2026-11-11T00:00:00+07:00
weight: 5
chapter: false
pre: " <b> 5. </b> "
aliases:
  - "/4-workshop/"
---

## VIETNAM IT JOB MARKET TRÊN AWS

Workshop hướng dẫn xây dựng và kiểm tra luồng **ITviec → Python/EC2 → Parquet/S3 → Glue Data Catalog/Athena → Streamlit/Plotly**, cùng chức năng cá nhân, kiểm duyệt và vận hành. Nội dung lấy từ source và hồ sơ triển khai của Vietnam IT Job Market; cách trình bày theo các bài Workshop tham khảo.

**Region:** ap-southeast-1 — Singapore. **Triển khai:** một EC2 chạy pipeline, dashboard và worker; Nginx/HTTPS cung cấp truy cập web.

### Nội dung Workshop

Bắt đầu với **5.1. Giới thiệu** và **5.2. Các bước chuẩn bị**, sau đó làm theo luồng dữ liệu, ứng dụng và vận hành. Mỗi bài con 5.x.y có đường dẫn riêng trên thanh bên.

| Mục | Nội dung | Kết quả cần đạt |
| --- | --- | --- |
| 5.1 | [Giới thiệu](5.1-Introduction/) | Kiến trúc và phạm vi |
| 5.2 | [Các bước chuẩn bị](5.2-Prerequisites/) | Account, quyền, runtime và dữ liệu đầu vào |
| 5.3 | [Thu thập dữ liệu tuyển dụng từ ITviec](5.3-ITviec-Collection/) | Discovery, batch và kiểm snapshot |
| 5.4 | [Đồng bộ, làm sạch và xuất Parquet](5.4-Data-Processing/) | Current/history, clean JSON và Parquet |
| 5.5 | [Lưu trữ và công bố dữ liệu trên Amazon S3](5.5-S3-Storage/) | Prefix/key và publication |
| 5.6 | [Cấu hình AWS Glue Data Catalog](5.6-Glue-Catalog/) | Database, table, schema và location |
| 5.7 | [Truy vấn dữ liệu bằng Amazon Athena](5.7-Athena/) | View moderation và truy vấn |
| 5.8 | [Xây dựng Streamlit Dashboard](5.8-Streamlit-Dashboard/) | KPI, biểu đồ, lọc và chi tiết |
| 5.9 | [Tài khoản và chức năng người dùng](5.9-User-Features/) | USER và dữ liệu cá nhân S3 |
| 5.10 | [Quản trị và kiểm duyệt bằng DynamoDB](5.10-Administration/) | ADMIN, DynamoDB và projection |
| 5.11 | [Triển khai hệ thống trên Amazon EC2](5.11-EC2-Deployment/) | Role, release, service và nghiệm thu |
| 5.12 | [Cấu hình Nginx và HTTPS theo IP](5.12-Nginx-HTTPS/) | Proxy, certificate và timer HTTPS |
| 5.13 | [Tự động hóa pipeline và Operations Worker](5.13-Pipeline-Automation/) | Timer pipeline, trạng thái và worker |
| 5.14 | [Giám sát và xử lý sự cố](5.14-Monitoring/) | CloudWatch, trạng thái và runbook |
| 5.15 | [Kiểm thử và kết quả thực hiện](5.15-Testing-Results/) | Test, bằng chứng và bảng nghiệm thu |
| 5.16 | [Dọn dẹp tài nguyên và kết luận](5.16-Cleanup-Conclusion/) | Backup, hướng dẫn dọn và tổng kết |

### Phương pháp thực hành

1. Chọn đúng account/Region và runtime; dùng một run_id làm mốc cho các bài dữ liệu.
2. Đọc mục tiêu, thực hiện thao tác/câu lệnh trong đúng môi trường và kiểm kết quả ngay sau bước.
3. Ảnh thực tế đặt tại ghi chú trong từng bài. Ghi ngày, run_id/Query ID hoặc phiên bản source khi phù hợp.
4. Thu thập, publication, triển khai và thử chức năng ghi dữ liệu chỉ thực hiện theo đợt có kế hoạch. Tài liệu không tự thực thi các thao tác này.
5. Phân biệt kết quả mong đợi, kết quả vừa kiểm và biên bản lịch sử ở 5.15. Hướng dẫn dọn tài nguyên ở 5.16 không được thực thi khi biên soạn.

Sơ đồ kiến trúc và 5 ảnh thực tế đã được bổ sung; còn 23 nhóm ảnh chờ bổ sung. Dataset ITviec không đại diện toàn bộ thị trường; không công bố trạng thái AWS hiện tại chỉ từ hồ sơ cũ.

---

[Bắt đầu: 5.1. Giới thiệu →](5.1-Introduction/)

