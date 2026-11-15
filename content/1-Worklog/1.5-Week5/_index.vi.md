---
title: "Tuần 5: IAM Role cho EC2 và Session Manager"
menuTitle: "Worklog Tuần 5"
date: 2026-11-08
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

**Thời gian:** 14/09/2026–18/09/2026.

#### Mục tiêu

- Hiểu cấp quyền cho ứng dụng chạy trên EC2.
- Biết mục đích quản trị phiên bằng Systems Manager.

#### Nội dung đã tìm hiểu

| Thứ | Nội dung học tập | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| --- | --- | --- | --- | --- |
| 2 | Đọc so sánh access key dài hạn và IAM Role cho ứng dụng. | 14/09/2026 | 14/09/2026 | [https://000048.awsfcaj.com/](https://000048.awsfcaj.com/) |
| 3 | Tìm hiểu trust dành cho EC2 và policy gắn với role trong bài mẫu. | 15/09/2026 | 15/09/2026 | [https://000048.awsfcaj.com/3-iamroleec2/3.1-createrole/](https://000048.awsfcaj.com/3-iamroleec2/3.1-createrole/) |
| 4 | Đọc cách gắn role vào Instance và ví dụ Python/Boto3 truy cập S3. | 16/09/2026 | 16/09/2026 | [https://000048.awsfcaj.com/3-iamroleec2/3.2-useiamrole/](https://000048.awsfcaj.com/3-iamroleec2/3.2-useiamrole/) |
| 5 | Tìm hiểu Session Manager và mục đích truy cập máy chủ không cần mở cổng SSH. | 17/09/2026 | 17/09/2026 | [https://000058.awsfcaj.com/1-introduce/](https://000058.awsfcaj.com/1-introduce/) |
| 6 | Đọc cách gắn SSM Role và mở phiên kết nối Public Linux Instance. | 18/09/2026 | 18/09/2026 | [https://000058.awsfcaj.com/3-accessibilitytoinstances/3.1-public-instance/](https://000058.awsfcaj.com/3-accessibilitytoinstances/3.1-public-instance/) |

#### Kết quả học tập

- Hiểu ứng dụng có thể dùng role thay vì lưu access key trong source.
- Phân biệt phiên quản trị máy chủ với quyền ứng dụng đọc/ghi dịch vụ AWS.
