---
title: "Bản ghi điều khiển và đồng bộ kiểm duyệt lên S3"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.5.2. </b> "
aliases:
  - "/5-workshop/5.10-administration/5.10.4-step4/"
  - "/5-workshop/5.10-administration/5.10.5-step5/"
  - "/5-workshop/5.7-administration/5.7.4-step4/"
  - "/5-workshop/5.7-administration/5.7.5-step5/"
---

### Vai trò trong hệ thống

Lớp view giúp dashboard chỉ sử dụng những việc làm được phép hiển thị. Projection Worker chuyển trạng thái kiểm duyệt từ DynamoDB thành bản tổng hợp trên S3 để Athena lọc dữ liệu; các view việc làm và kỹ năng cùng áp dụng trạng thái kiểm duyệt này.

### Cấu hình đã sử dụng

Ứng dụng dùng DynamoDB làm nguồn moderation chính. META#CONTROL chứa trạng thái/revision; Projection Worker xuất snapshot S3 schema_version=2, backend=DYNAMODB để Athena đọc.

### Bản ghi điều khiển kiểm duyệt

**META#CONTROL** lưu thông tin điều khiển của backend kiểm duyệt, gồm phiên bản thay đổi và thông tin đồng bộ bản tổng hợp lên S3. Ứng dụng và Projection Worker sử dụng thông tin này để phối hợp cập nhật trạng thái kiểm duyệt giữa DynamoDB và dữ liệu Athena đọc.

![Bản ghi META#CONTROL trong bảng vn-it-job-market-moderation](/images/workshop/setup-5-5-control-item.png)

Trạng thái **READY** cho biết backend kiểm duyệt đã sẵn sàng theo bản ghi điều khiển. **revision** theo dõi phiên bản thay đổi; **projection_bucket** và **projection_prefix** xác định nơi Projection Worker xuất bản tổng hợp kiểm duyệt lên S3 tại **control/moderation/**. **audit_table** chỉ định bảng lưu nhật ký thao tác.

![Thuộc tính META#CONTROL với trạng thái READY và cấu hình đồng bộ moderation lên S3](/images/workshop/setup-5-5-control-details.png)

### Bản tổng hợp kiểm duyệt trên S3

Thư mục **control/moderation/** lưu bản tổng hợp kiểm duyệt để Athena đọc. Projection Worker lấy trạng thái từ DynamoDB và xuất dữ liệu tại đường dẫn này, giúp lớp truy vấn phân tích áp dụng các quyết định kiểm duyệt của quản trị viên.

![Thư mục moderation bên trong control trên S3](/images/workshop/setup-5-5-control-s3.png)

File **job_moderation.json** cung cấp dữ liệu kiểm duyệt cho các bảng và view của Athena. Các view sử dụng dữ liệu này để loại việc làm đã xóa mềm khỏi tập dữ liệu hiển thị.

![File job_moderation.json trong control/moderation trên S3](/images/workshop/setup-5-5-snapshot-file.png)

Bản tổng hợp sử dụng **schema_version: 2** và **backend: DYNAMODB** để lớp truy vấn nhận diện cấu trúc và nguồn kiểm duyệt. **revision** dùng để đối chiếu phiên bản với DynamoDB; **deleted_jobs** cung cấp danh sách việc làm bị xóa mềm cho Athena lọc. Trong bản dữ liệu này, revision bằng **0**, deleted_jobs và audit_log đang rỗng.

![Nội dung job_moderation.json với backend DYNAMODB và revision 0](/images/workshop/setup-5-5-snapshot-json.png)

---

[← 5.5. Thiết lập DynamoDB và dữ liệu kiểm duyệt](../) · [Mục lục Workshop](../../) · [Bước trước](../5.5.1-step1/) · [Bước tiếp →](../5.5.3-step3/)
