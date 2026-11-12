---
title: "Khám phá và chuẩn hóa URL"
date: 2026-11-10
weight: 1
chapter: false
pre: " <b> 5.2.1. </b> "
---

`collectors/discover_itviec_jobs.py` duyệt trang danh sách theo tham số page, đọc JSON-LD ItemList và ghi `data/raw/itviec/itviec_urls_*.json`. Source giới hạn mặc định 500 trang, delay 2 giây và timeout request 20 giây.

Hàm canonical_url chỉ nhận HTTPS, host itviec.com và path /it-jobs/; bỏ query, fragment, dấu / cuối và loại URL trùng. Trong đợt thực hành thu thập, chạy:

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python collectors/discover_itviec_jobs.py
~~~

Mở discovery vừa tạo, kiểm `total_unique_jobs`, `job_urls`, `coverage_checked` và `failed_pages`. Discovery hoàn tất cần coverage_checked=true, failed_pages rỗng và URL duy nhất.

**Kiểm tra sau bước này:** Discovery hoàn tất, URL duy nhất và không có failed_pages.

> 📸 **[CẦN THÊM ẢNH 5.2-01]**
>
> Ảnh file discovery JSON: thời điểm quét, tổng URL, coverage_checked, failed_pages và một phần job_urls.
>
> File: `5-2-01.png`

---

[← 5.2](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.2.2-step2/)
