---
title: "Đọc schema và kiểm tính nhất quán"
date: 2026-11-10
weight: 5
chapter: false
pre: " <b> 5.3.5. </b> "
---

Trong kết quả PyArrow, kiểm skills là kiểu danh sách, các trường ngày có kiểu ngày và first_seen/last_seen có kiểu thời gian. Các kiểu này cần tương thích DDL Athena ở mục 5.4.

Lập bảng cho cùng run gồm số tin crawl, số current, số clean và số dòng Parquet. Current có thể lớn hơn số vừa crawl vì hệ thống giữ tin đã có; current/clean/Parquet của cùng lần xử lý cần khớp nhau. History là tập sự kiện nên không so số dòng history bằng số việc làm.

Nếu kiểm tra số dòng hoặc schema thất bại, giữ bản thực hành để đọc lỗi; không công bố Parquet đó lên S3. Bản sao trong /tmp chỉ dùng kiểm cleaner/exporter, không thay thế quy trình sync và publication của runner.

**Kiểm tra sau bước này:** Có bảng số lượng của cùng run; không nhầm history event với số tin.

---

[← 5.3](../) · [Mục lục Workshop](../../) · [Bước trước](../5.3.4-step4/)
