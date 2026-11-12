---
title: "Kiểm tra kết quả vận hành pipeline"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.12.3. </b> "
aliases:
  - "/5-workshop/5.13-pipeline-automation/5.13.2-step2/"
  - "/5-workshop/5.13-pipeline-automation/5.13.4-step4/"
  - "/5-workshop/5.9-pipeline-automation/5.9.2-step2/"
  - "/5-workshop/5.9-pipeline-automation/5.9.4-step4/"
---

**Thực hiện tại:** SSM và trang Trạng thái hệ thống

### Mục tiêu

Đọc đúng kết quả sau lịch hoặc yêu cầu phục hồi.

### Điều kiện đầu vào

Có journal/status.json của run cần kiểm.

### Các bước thực hiện

~~~bash
sudo journalctl -u vnjob-pipeline.service -n 120 --no-pager
systemctl show vnjob-pipeline.service -p ActiveState -p SubState -p ExecMainStartTimestamp -p ExecMainExitTimestamp -p Result
~~~

| Dấu hiệu | Cách đối chiếu |
| --- | --- |
| activating | Oneshot đang chạy; kiểm process/log |
| RUNNING | Đối chiếu updated_at và process, tránh dùng file cũ |
| SUCCEEDED/published=true | Kiểm metadata canonical cùng run-id/sha256 |
| SKIPPED | Đọc lý do, có thể đã thành công cùng ngày/cùng chế độ |
| FAILED | Đọc failed_stage/error_type và giữ artifact/journal |
| DISPATCHED | Chỉ đã chuyển yêu cầu; kiểm tiếp service và run cuối |

Cấu hình Persistent=true cho phép timer kích hoạt khi máy chủ hoạt động trở lại sau một thời điểm chạy bị bỏ lỡ. Kết quả mỗi lượt được theo dõi trong nhật ký pipeline.

### Kết quả pipeline ngày 11/11/2026

Nhật ký của lượt **20261111T081952Z-a435a240** ghi nhận trạng thái **SUCCEEDED**, giai đoạn **FINISHED** và **published=true**. Pipeline hoàn tất **25/25 batch**, thu thập **624 tin**, đồng bộ tập current thành **1.072 bản ghi** và xuất Parquet **1.072 dòng, 24 cột**.

```bash
sudo journalctl -u vnjob-pipeline.service -n 40 --no-pager -o cat
```

![Nhật ký pipeline hoàn tất thu thập, đồng bộ, làm sạch, xuất Parquet và publication thành công](/images/workshop/setup-5-12-04.png)


---

[← 5.12. Thiết lập lịch pipeline và Operations Worker](../) · [Mục lục Workshop](../../) · [Bước trước](../5.12.2-step2/)
