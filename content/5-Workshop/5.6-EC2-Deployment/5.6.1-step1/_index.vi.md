---
title: "Source release và hạ tầng EC2"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.6.1. </b> "
aliases:
  - "/5-workshop/5.11-ec2-deployment/"
  - "/5-workshop/5.11-ec2-deployment/5.11.1-step1/"
  - "/5-workshop/5.8-ec2-https/"
  - "/5-workshop/5.8-ec2-https/5.8.1-step1/"
  - "/5-workshop/5.11-ec2-deployment/5.11.5-step5/"
  - "/5-workshop/5.12-nginx-https/5.12.4-step4/"
  - "/4-workshop/4.10-ec2-deployment/4.10.1-step1/"
  - "/4-workshop/4.10-ec2-deployment/4.10.2-step2/"
  - "/4-workshop/4.10-ec2-deployment/4.10.3-step3/"
  - "/4-workshop/4.10-ec2-deployment/4.10.4-step4/"
  - "/4-workshop/4.10-ec2-deployment/"
---

### Vai trò trong hệ thống

EC2 là máy chủ chạy pipeline thu thập và xử lý dữ liệu, Streamlit Dashboard và các worker. IAM Role cấp quyền truy cập các dịch vụ AWS cho chương trình trên máy chủ. IMDSv2 yêu cầu phiên truy cập metadata của instance, hỗ trợ bảo vệ thông tin metadata và credential tạm thời.

### Quản lý hạ tầng bằng CloudFormation

Stack **vn-it-job-market-ec2** quản lý máy chủ EC2, IAM Role và Security Group. Stack **vn-it-job-market-ec2-public** quản lý các rule cho phép truy cập web, tách cấu hình cổng truy cập khỏi hạ tầng máy chủ. CloudFormation giúp quản lý các tài nguyên này theo cùng bộ cấu hình triển khai.

![Hai stack EC2 và public web của dự án ở trạng thái CREATE_COMPLETE](/images/workshop/setup-5-6-stacks.png)

**Outputs** cung cấp mã máy chủ và nhóm bảo mật để các bước quản trị, kết nối SSM và cấu hình truy cập web sử dụng đúng tài nguyên của stack.

![Outputs của stack EC2 gồm InstanceId và SecurityGroupId](/images/workshop/setup-5-6-stack-outputs.png)

### Máy chủ EC2

| Thành phần | Cấu hình dự án |
| --- | --- |
| EC2 | vn-it-job-market — i-0e6d841407d7baa32 |
| Region | ap-southeast-1 |
| Instance type | t3.small |
| OS/volume theo hồ sơ triển khai | Ubuntu 24.04, gp3 mã hóa 30 GiB |
| Metadata | IMDSv2 Required |
| Stack | vn-it-job-market-ec2 |
| Source runtime | /opt/vn-it-job-market |

Gói source được lưu trên S3 để chuyển lên EC2 khi triển khai. Stack CloudFormation quản lý hạ tầng EC2 và IAM Role theo cấu hình của dự án.

![Ảnh AWS Console: Region Singapore, EC2 của dự án và IAM Role gắn với instance.](/images/workshop/setup-5-6-01.png)

### Ổ đĩa lưu trữ của máy chủ

Ổ **Amazon EBS gp3** lưu hệ điều hành, source, môi trường Python và dữ liệu xử lý trên EC2. Mã hóa EBS bảo vệ dữ liệu lưu trên ổ đĩa.

![Ổ EBS gắn với instance của dự án, dung lượng 30 GiB và đã mã hóa](/images/workshop/setup-5-6-ebs-attachment.png)

![Loại ổ Amazon EBS gp3 dung lượng 30 GiB đang sử dụng](/images/workshop/setup-5-6-ebs-gp3.png)

### Gói source triển khai trên S3

Gói **source.tar.gz** tập hợp mã chương trình để chuyển lên EC2 khi triển khai. Các bản phát hành được lưu riêng dưới **deploy/ec2/**, giúp xác định đúng gói source cần sử dụng.

![Thư mục ec2 bên trong deploy trên S3](/images/workshop/setup-5-6-deploy-folder.png)

![Các thư mục bản phát hành bên trong deploy/ec2](/images/workshop/setup-5-6-release-folders.png)

![Gói source.tar.gz trong thư mục bản phát hành trên S3](/images/workshop/setup-5-6-source-archive.png)

Thông tin **Key** và **S3 URI** xác định chính xác object để máy chủ tải đúng gói source khi triển khai.

![Thông tin Properties và đường dẫn S3 của gói source.tar.gz](/images/workshop/setup-5-6-source-properties.png)

Kiểm tra **SHA-256** đối chiếu nội dung gói source với mã bản phát hành, giúp phát hiện tải nhầm hoặc thay đổi gói.

![Kiểm tra SHA-256 gói source trên S3 với kết quả MATCH True](/images/workshop/setup-5-6-04.png)

### Tổ chức source trên máy chủ

Source được đặt tại **/opt/vn-it-job-market**. Thư mục **collectors** chứa chương trình thu thập ITviec, **processors** xử lý dữ liệu và **dashboard** cung cấp ứng dụng Streamlit. Môi trường **.venv** cung cấp Python và thư viện cho các dịch vụ; liên kết đến môi trường theo bản phát hành giúp ứng dụng sử dụng bộ dependency của phiên bản triển khai. Source thuộc quyền sở hữu root, còn dịch vụ chạy bằng tài khoản vnjob để tách quyền vận hành khỏi quyền sửa chương trình.

![Cấu trúc source và liên kết môi trường Python trên EC2](/images/workshop/setup-5-6-source-folders.png)





---

[← 5.6. Triển khai mã nguồn và môi trường chạy trên EC2](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.6.2-step2/)
