---
title: "Phân biệt nơi thực hiện thao tác"
date: 2026-11-11T00:00:00+07:00
weight: 4
chapter: false
pre: " <b> 5.2.4. </b> "
aliases:
  - "/5-workshop/5.1-overview/5.1.5-step5/"
---

**Mục tiêu:** Phân biệt nơi thực hiện thao tác.

**Bối cảnh:** Xác định account/Region, quyền truy cập, runtime và dữ liệu đầu vào.

### Các bước thực hiện

| Nơi thực hiện | Công việc trong Workshop |
| --- | --- |
| AWS Console | Quan sát EC2, S3, Glue, Athena, DynamoDB và CloudWatch |
| Terminal SSM trên EC2 | Kiểm service, journal, dữ liệu runtime và môi trường Python Linux |
| Máy quản trị | Chuẩn bị gói source và kiểm checksum khi thực hiện đợt triển khai |
| Website HTTPS | Thực hành dashboard, tài khoản và quản trị |

Thực hiện lệnh Linux trong terminal SSM tại thư mục `/opt/vn-it-job-market`. Các lệnh PowerShell đóng gói source chạy trên máy quản trị. Thao tác tài nguyên thực hiện trên AWS Console tại Region Singapore; chức năng người dùng và quản trị được kiểm tra trên website HTTPS của dự án.

### Kết quả mong đợi

Phân biệt được thao tác Console, SSM, máy quản trị và website.

### Source đối chiếu

- `README.md`
- `deploy/ec2/stack.json`
- `.streamlit/secrets.toml.example`
- `deploy/ec2/runtime.env.example`

---

[← 5.2. Các bước chuẩn bị](../) · [Mục lục Workshop](../../) · [Bước trước](../5.2.3-step3/)
