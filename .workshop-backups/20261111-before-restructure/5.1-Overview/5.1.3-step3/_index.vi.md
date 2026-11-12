---
title: "Kiểm tra môi trường"
date: 2026-11-10
weight: 3
chapter: false
pre: " <b> 5.1.3. </b> "
---

Chạy trong phiên SSM:

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python --version
.venv/bin/python -m pip check
systemctl status vnjob-dashboard --no-pager
~~~

Python và thư viện cần hợp lệ, dashboard được systemd quản lý. Chọn một run đã hoàn thành làm đầu vào đối chiếu cho các mục thu thập, ETL và S3. Các bài sử dụng dữ liệu và tài khoản hiện hữu; việc chạy thu thập mới cần bố trí riêng để tránh chồng lịch tự động.

**Kiểm tra sau bước này:** Python/dependency hợp lệ, dashboard có trạng thái service để kiểm tra.

> 📸 **[CẦN THÊM ẢNH 5.1-02]**
>
> Ảnh terminal SSM: kết quả Python version, pip check và trạng thái vnjob-dashboard.
>
> File: `5-1-02.png`

---

[← 5.1](../) · [Mục lục Workshop](../../) · [Bước trước](../5.1.2-step2/) · [Bước tiếp →](../5.1.4-step4/)
