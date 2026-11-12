---
title: "Xác định đầu vào trước khi thực hành"
date: 2026-11-10
weight: 4
chapter: false
pre: " <b> 5.1.4. </b> "
---

Theo dõi một run xuyên suốt Workshop: dùng cùng run_id khi so sánh discovery, batch, JSON, Parquet và metadata S3. Nếu trộn artifact của hai ngày, số lượng và thời điểm cập nhật có thể khác dù từng thành phần vẫn hoạt động đúng.

Trong SSM, kiểm các thư mục đầu vào bằng lệnh chỉ đọc:

~~~bash
cd /opt/vn-it-job-market
ls -ld data/raw/itviec data/current/itviec data/history/itviec data/clean/itviec data/runs
systemctl list-timers vnjob-pipeline.timer vnjob-projection.timer --no-pager
~~~

Lệnh đầu xác nhận cấu trúc runtime đã có; lệnh sau cho biết lịch gần nhất/tiếp theo để tránh chạy thao tác thủ công chồng pipeline. Dữ liệu seed và file cấu hình hiện hữu được giữ nguyên.

**Kiểm tra sau bước này:** Có thư mục runtime và lịch chạy để bố trí phiên thực hành không chồng tác vụ.

---

[← 5.1](../) · [Mục lục Workshop](../../) · [Bước trước](../5.1.3-step3/) · [Bước tiếp →](../5.1.5-step5/)
