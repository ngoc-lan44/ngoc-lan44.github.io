---
title: "Dữ liệu sử dụng và IAM Role cho EC2"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.2.2. </b> "
aliases:
  - "/5-workshop/5.2-prerequisites/5.2.3-step3/"
  - "/5-workshop/5.1-overview/5.1.3-step3/"
  - "/5-workshop/5.1-overview/5.1.4-step4/"
---

**Thực hiện tại:** Máy quản trị, S3, Glue và DynamoDB

### Mục tiêu

Xác định các thành phần dữ liệu và IAM Role sử dụng cho EC2.

### Điều kiện đầu vào

Có quyền quản trị tài nguyên dự án và bản sao dữ liệu hiện có.

### Dữ liệu sử dụng

| Thành phần | Vai trò |
| --- | --- |
| Dữ liệu việc làm trên EC2 | Lưu dữ liệu hiện tại và lịch sử thay đổi |
| Parquet trên S3 | Cung cấp dữ liệu phân tích |
| Glue Data Catalog | Lưu cấu trúc bảng cho Athena |
| DynamoDB | Lưu trạng thái kiểm duyệt và nhật ký thao tác |
| Dữ liệu người dùng trên S3 | Lưu tài khoản và hoạt động cá nhân |

### Phân quyền cho EC2

EC2 sử dụng IAM Role để chương trình trên máy chủ truy cập dịch vụ AWS bằng credential tạm thời. Role của dự án có ba policy:

- **AmazonSSMManagedInstanceCore**: cho phép quản lý và truy cập EC2 qua Systems Manager.
- **EC2CloudWatchLogs**: cấp quyền gửi log vận hành lên CloudWatch.
- **ExistingProjectRuntime**: cấp quyền truy cập tài nguyên AWS phục vụ ứng dụng và pipeline theo cấu hình dự án.

![IAM Role của EC2 với các policy AmazonSSMManagedInstanceCore, EC2CloudWatchLogs và ExistingProjectRuntime](/images/workshop/setup-5-2-02.png)

### Kết quả

IAM Role cung cấp quyền cho EC2 sử dụng Systems Manager, gửi log và truy cập tài nguyên phục vụ hệ thống.

---

[← 5.2. Các bước chuẩn bị](../) · [Mục lục Workshop](../../) · [Bước trước](../5.2.1-step1/)
