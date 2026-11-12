---
title: "Đồng bộ current và history bằng runner"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.8.1. </b> "
aliases:
  - "/5-workshop/5.4-data-processing/"
  - "/5-workshop/5.4-data-processing/5.4.1-step1/"
  - "/5-workshop/5.3-data-processing/"
  - "/5-workshop/5.3-data-processing/5.3.1-step1/"
  - "/5-workshop/5.4-data-processing/5.4.6-step6/"
  - "/4-workshop/4.4-data-processing/4.4.1-step1/"
  - "/4-workshop/4.4-data-processing/4.4.2-step2/"
  - "/4-workshop/4.4-data-processing/4.4.3-step3/"
  - "/4-workshop/4.4-data-processing/"
---

**Thực hiện tại:** SSM trên EC2

### Mục tiêu

Đồng bộ dữ liệu của toàn bộ lượt thu thập và lưu lịch sử thay đổi của việc làm.

### Điều kiện đầu vào

Run đã vượt qua validation ở 5.7.

### Các bước thực hiện

Ở stage SYNC_CURRENT, runner chuẩn bị data/runs/<run_id>/staged/, seed current vào staging, trỏ module sync đến validated_snapshot.json và gọi sync.main(). Không gọi sync_itviec_current.py độc lập để đồng bộ toàn lượt vì entry point mặc định có thể chọn latest batch.

| Thành phần | Xử lý |
| --- | --- |
| current | Upsert theo job_id, giữ first_seen, cập nhật last_seen |
| history NEW/UPDATED | Lưu tin mới hoặc trường đã thay đổi |
| UNCHANGED | Bộ đếm summary, không tạo event riêng |
| EXPIRED | Deadline nguồn hợp lệ đã qua, reason EXPLICIT_SOURCE_DEADLINE |

Tin vắng discovery không tự hết hạn. ACTIVE/EXPIRED là trạng thái bản ghi; history là sự kiện nên không so số event bằng số tin.

Mở staged/current/itviec/current_jobs.json và staged/history/itviec/events_*.json **trong cùng thư mục run** để theo dấu job_id và summary.

### Theo dõi việc làm qua các lượt đồng bộ

**first_seen** giữ thời điểm hệ thống ghi nhận việc làm lần đầu; **last_seen** lưu thời điểm ghi nhận gần nhất. Hai mốc này giúp tiếp tục theo dõi cùng một việc làm qua nhiều lượt thu thập mà không làm mất thời điểm xuất hiện ban đầu. **status** thể hiện trạng thái việc làm trong dữ liệu hiện tại.

![Dữ liệu current trên EC2 với first_seen, last_seen và status của một việc làm](/images/workshop/setup-5-8-current-tracking.png)

### Lịch sử thay đổi dữ liệu

File history lưu các sự kiện việc làm mới, cập nhật hoặc hết hạn để truy vết thay đổi qua từng lượt đồng bộ. Phần **summary** tổng hợp kết quả xử lý; mỗi sự kiện ghi mã việc làm, loại thay đổi và thời điểm phát sinh. Các tin không đổi được tổng hợp trong bộ đếm, không tạo sự kiện riêng.

![Summary đồng bộ và sự kiện NEW trong file history của cùng lượt pipeline](/images/workshop/setup-5-8-history.png)

### Kiểm tra kết quả

Dữ liệu hiện tại lưu thông tin việc làm sau đồng bộ; dữ liệu lịch sử lưu các sự kiện phát sinh trong cùng lượt xử lý.




---

[← 5.8. Thiết lập ETL và công bố Parquet](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.8.2-step2/)
