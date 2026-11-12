---
title: "Tổng quan và chuẩn bị"
date: 2026-11-08
weight: 1
chapter: false
pre: " <b> 5.1. </b> "
aliases:
  - "/5-workshop/5.2-prerequisites/"
  - "/4-workshop/4.1-workshop-overview/"
  - "/4-workshop/4.2-prerequisites/"
---

**Mục tiêu thực hành:** Xác định đúng tài nguyên, môi trường và đầu vào để thực hiện các bước trên AWS.

Vietnam IT Job Market thu thập dữ liệu tuyển dụng CNTT từ **ITviec**, xử lý bằng Python và cung cấp dashboard phân tích bằng **Streamlit, Plotly**.

**Console:** AWS Management Console → EC2 → Instances.

**Region:** ap-southeast-1 — Singapore.

### Trước khi bắt đầu

**Đầu vào:** AWS Console của dự án, quyền truy cập Session Manager và source hiện hữu trên EC2.

**Đầu ra:** Xác định được tài nguyên, runtime và một run_id làm mốc đối chiếu cho các bài tiếp theo.

### Các bài thực hành

- [5.1.1. Kiến trúc hệ thống](5.1.1-step1/)
- [5.1.2. Chuẩn bị tài nguyên và quyền truy cập](5.1.2-step2/)
- [5.1.3. Kiểm tra môi trường](5.1.3-step3/)
- [5.1.4. Xác định đầu vào trước khi thực hành](5.1.4-step4/)
- [5.1.5. Phân biệt nơi thực hiện thao tác](5.1.5-step5/)

### Kết quả mong đợi

Xác định đúng môi trường, tài nguyên AWS và dữ liệu đầu vào. Khi bổ sung ảnh, che mật khẩu, token, private key và dữ liệu tài khoản cá nhân.

### Checklist

- [ ] Đúng account, Region và instance dự án.
- [ ] EC2 có IAM Role và truy cập được qua SSM.
- [ ] Python/dependency hợp lệ; có current seed và run đầu vào.


---

[← 5](../) · [Mục lục](../) · [5.2 →](../5.2-ITviec-Collection/)
