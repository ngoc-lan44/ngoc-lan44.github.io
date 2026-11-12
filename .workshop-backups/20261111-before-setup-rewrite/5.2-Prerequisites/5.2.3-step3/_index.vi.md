---
title: "Xác định đầu vào trước khi thực hành"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.2.3. </b> "
aliases:
  - "/5-workshop/5.1-overview/5.1.4-step4/"
---

**Mục tiêu:** Xác định đầu vào trước khi thực hành.

**Bối cảnh:** Xác định account/Region, quyền truy cập, runtime và dữ liệu đầu vào.

### Các bước thực hiện

Theo dõi một run xuyên suốt Workshop: dùng cùng run_id khi so sánh discovery, batch, JSON, Parquet và metadata S3. Nếu trộn artifact của hai ngày, số lượng và thời điểm cập nhật có thể khác dù từng thành phần vẫn hoạt động đúng.

Trong SSM, kiểm các thư mục đầu vào bằng lệnh chỉ đọc:

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob ls -ld data/raw/itviec data/current/itviec data/history/itviec data/clean/itviec data/runs
systemctl list-timers vnjob-pipeline.timer vnjob-projection.timer --no-pager
sudo systemctl status vnjob-pipeline.timer vnjob-pipeline.service --no-pager
~~~

Lệnh ls chạy bằng tài khoản dịch vụ vnjob để đọc các thư mục runtime riêng tư; không đổi quyền thư mục chỉ để chụp ảnh. list-timers hiển thị lịch chạy, còn status kiểm tra timer và tiến trình pipeline. Dùng sudo cho status để đọc được journal đầy đủ. Các lệnh chỉ đọc thông tin, không khởi động lại hoặc kích hoạt pipeline.

Khi pipeline oneshot đang xử lý, service có thể ở trạng thái activating (start), timer active (running) và NEXT/Trigger chưa có thời điểm kế tiếp. Cần đối chiếu tiến trình và trạng thái cuối của run, không kết luận thành công chỉ từ service đang chạy. Nếu pipeline đang hoạt động, không chạy collector/ETL thủ công chồng lên lượt đó.

![Kiểm tra thư mục runtime, lịch projection và pipeline đang chạy batch 20 trên EC2](/images/workshop/5-2-03.png)

### Kết quả mong đợi

Có thư mục runtime và lịch chạy để bố trí phiên thực hành không chồng tác vụ.

### Source đối chiếu

- `README.md`
- `deploy/ec2/stack.json`
- `.streamlit/secrets.toml.example`
- `deploy/ec2/runtime.env.example`

---

[← 5.2. Các bước chuẩn bị](../) · [Mục lục Workshop](../../) · [Bước trước](../5.2.2-step2/) · [Bước tiếp →](../5.2.4-step4/)
