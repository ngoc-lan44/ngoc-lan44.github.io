---
title: "Truy vấn dữ liệu kỹ năng bằng Athena"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.4.2. </b> "
aliases:
  - "/5-workshop/5.7-athena/5.7.1-step1/"
  - "/5-workshop/5.4-s3-glue-athena/5.4.4-step4/"
---

**Thực hiện tại:** Athena Query editor

### Mục đích

Truy xuất dữ liệu kỹ năng từ các việc làm được phép hiển thị, cung cấp đầu vào cho thống kê kỹ năng trên dashboard. Athena đọc dữ liệu trên S3 thông qua bảng và view đã khai báo trong Glue Data Catalog.

### Truy vấn kỹ năng phục vụ dashboard

View **itviec_active_job_skills** cung cấp từng cặp việc làm–kỹ năng sau khi áp dụng kiểm duyệt. Dashboard sử dụng dữ liệu này để thống kê kỹ năng xuất hiện trong các tin tuyển dụng. Một việc làm có thể có nhiều kỹ năng nên số dòng kết quả không phải số lượng việc làm.

~~~sql
SELECT job_id, skill
FROM vn_it_job_market.itviec_active_job_skills;
~~~

Truy vấn đã lưu có trạng thái **Completed**, trả về **3.447 dòng**, thời gian chạy **842 ms** và lượng dữ liệu quét **39.19 KB**.

![Truy vấn Athena hoàn thành và trả về dữ liệu job_id, skill](/images/workshop/setup-5-4-athena-skills-results.png)



---

[← 5.4. Thiết lập Glue Data Catalog và Athena](../) · [Mục lục Workshop](../../) · [Bước trước](../5.4.1-step1/)
