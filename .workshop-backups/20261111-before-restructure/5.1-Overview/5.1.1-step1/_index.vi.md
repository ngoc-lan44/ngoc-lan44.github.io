---
title: "Kiến trúc hệ thống"
date: 2026-11-10
weight: 1
chapter: false
pre: " <b> 5.1.1. </b> "
---

Một EC2 chạy pipeline, dashboard và các worker. JSON raw/current/history/clean được xử lý trên EC2; Parquet được công bố lên S3. Glue Data Catalog cung cấp metadata để Athena truy vấn. Nginx và HTTPS cung cấp truy cập web.

Tài khoản và hoạt động cá nhân lưu trên S3. DynamoDB lưu trạng thái kiểm duyệt và audit; Projection Worker xuất snapshot sang S3 để Athena lọc tin được công khai.

![Kiến trúc Vietnam IT Job Market](/images/vietnam-it-job-market-actual-architecture.png)

*Sơ đồ kiến trúc được vẽ theo source của dự án.*

**Kiểm tra sau bước này:** Chỉ ra được nơi chạy ETL, nơi lưu Parquet và nơi lưu moderation trên sơ đồ.

---

[← 5.1](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.1.2-step2/)
