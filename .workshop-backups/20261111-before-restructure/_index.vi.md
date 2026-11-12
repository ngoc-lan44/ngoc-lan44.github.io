---
title: "Workshop"
date: 2026-11-08
weight: 5
chapter: false
pre: " <b> 5. </b> "
aliases:
  - "/4-workshop/"
---

## VIETNAM IT JOB MARKET TRÊN AWS

### Giới thiệu Workshop

Workshop hướng dẫn theo dấu hệ thống từ **thu thập tin ITviec → xử lý Python trên EC2 → Parquet S3 → Glue Data Catalog/Athena → dashboard Streamlit**, đồng thời thực hành chức năng cá nhân, kiểm duyệt và vận hành. Nội dung bám các module, SQL, cấu hình service và hồ sơ triển khai của dự án.

**Region:** ap-southeast-1 — Singapore. **Nền tảng triển khai:** một EC2 chạy pipeline, dashboard và worker; Nginx cung cấp HTTPS.

### Mục tiêu thực hành

- Hiểu và kiểm chứng đường đi của một tin tuyển dụng bằng job_id và run_id.
- Kiểm tra tính nhất quán giữa JSON, Parquet, metadata và truy vấn.
- Sử dụng dashboard, tài khoản USER/ADMIN và kiểm chứng lớp moderation.
- Đọc service/timer/log, đánh giá kết quả triển khai và lập bằng chứng nghiệm thu.

### Nội dung

Giữ **10 mục lớn**; mỗi mục có các bài con **5.x.y** xuất hiện trên thanh bên, mỗi bài có đường dẫn riêng và mục lục bấm được, câu lệnh/thao tác, điều kiện kiểm tra và vị trí ảnh. Thực hiện theo thứ tự dữ liệu, sau đó đến giao diện và vận hành:

| Mục | Bài thực hành | Nội dung chính |
| --- | --- | --- |
| 5.1 | [Tổng quan và chuẩn bị](5.1-Overview/) | Kiến trúc, tài nguyên AWS, quyền truy cập và môi trường thực hành |
| 5.2 | [Thu thập dữ liệu tuyển dụng từ ITviec](5.2-ITviec-Collection/) | Discovery, batch, kiểm dữ liệu và snapshot của một lượt thu thập |
| 5.3 | [Đồng bộ, làm sạch và xuất Parquet](5.3-Data-Processing/) | Current/history, quy tắc chuẩn hóa, clean JSON và Parquet |
| 5.4 | [Lưu trữ S3, metadata Glue và truy vấn Athena](5.4-S3-Glue-Athena/) | Publication S3, metadata Glue, DDL/view và kiểm truy vấn Athena |
| 5.5 | [Dashboard Streamlit và trực quan hóa](5.5-Streamlit-Dashboard/) | Kết nối dữ liệu, KPI, biểu đồ, tìm kiếm/lọc và chi tiết |
| 5.6 | [Tài khoản và chức năng người dùng](5.6-User-Features/) | Đăng ký/đăng nhập, dữ liệu cá nhân, hồ sơ và kiểm soát phiên |
| 5.7 | [Quản trị, DynamoDB và Projection Worker](5.7-Administration/) | Quản lý USER, Delete/Restore, DynamoDB state/audit và projection |
| 5.8 | [Triển khai EC2, Nginx và HTTPS](5.8-EC2-HTTPS/) | Release, IAM Role, systemd dashboard, Nginx, TLS và WebSocket |
| 5.9 | [Tự động hóa pipeline và phục hồi](5.9-Pipeline-Automation/) | Lịch pipeline 02:00, chạy bù, trạng thái run và Operations Worker |
| 5.10 | [Giám sát, kiểm thử và kết quả](5.10-Monitoring-Results/) | CloudWatch, chất lượng dữ liệu, kiểm thử, nghiệm thu và hướng dẫn dọn tài nguyên |

### Cách thực hiện và ghi kết quả

1. Bắt đầu tại 5.1, xác định tài nguyên và một run_id đã hoàn thành. Dùng cùng run khi đối chiếu các bước dữ liệu.
2. Thực hiện lệnh Linux qua SSM trên EC2; lệnh PowerShell và AWS CLI theo chỉ dẫn máy quản trị. Bước USER/ADMIN thực hiện trên website HTTPS.
3. Với đợt thu thập, publication hoặc triển khai mới, bố trí phiên riêng, kiểm lịch/service trước khi chạy. Bài ETL dùng bản sao để tránh ghi đè dữ liệu đang phục vụ.
4. Lưu ảnh ngay tại ghi chú của từng bước. Ghi kèm ngày, run_id/Query ID hoặc phiên bản source khi phù hợp; chỉ đánh dấu đạt sau khi đã kiểm tra.

### Sản phẩm sau Workshop

Có bộ bằng chứng liên kết từ dữ liệu thu thập đến kết quả dashboard; bảng kiểm tài khoản/moderation; kết quả service, HTTPS, lịch pipeline và CloudWatch; cùng bảng nghiệm thu và các giới hạn đã xác định. Sơ đồ kiến trúc đã có ở 5.1; **27 vị trí ảnh thực tế** còn chờ bổ sung.

Các số liệu lịch sử được ghi riêng ở 5.10. Dữ liệu phản ánh tin ITviec tiếp cận được, không đại diện toàn thị trường. Chức năng theo dõi ứng tuyển do USER cập nhật, không tự nộp CV. Hướng dẫn dọn tài nguyên chỉ là nội dung tài liệu.

---

[Bắt đầu: 5.1. Tổng quan và chuẩn bị →](5.1-Overview/)
