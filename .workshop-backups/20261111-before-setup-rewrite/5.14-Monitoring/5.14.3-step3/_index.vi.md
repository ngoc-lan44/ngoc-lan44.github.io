---
title: "Đối chiếu sự cố theo runbook"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.14.3. </b> "
---

**Mục tiêu:** Đối chiếu sự cố theo runbook.

**Bối cảnh:** Đối chiếu CloudWatch, các trang trạng thái và runbook.

### Các bước thực hiện

Dùng run_id và thời điểm lỗi để nối trang trạng thái với journal và artifact. Trên EC2, kiểm tài nguyên và tiến trình trước khi gửi yêu cầu chạy lại:

~~~bash
systemctl status vnjob-dashboard vnjob-pipeline vnjob-pipeline.timer --no-pager
journalctl -u vnjob-pipeline -n 120 --no-pager
df -h /opt/vn-it-job-market
free -m
~~~

| Nguyên nhân | Cách xử lý theo dự án |
| --- | --- |
| Mạng/5xx/timeout | Kiểm retry có giới hạn và checkpoint còn hợp lệ |
| 403/429 | Dừng yêu cầu, kiểm điều kiện truy cập nguồn; không retry liên tục |
| Parser/phân trang/độ phủ thấp | Đối chiếu HTML và baseline, sửa/test trước đợt deploy |
| AccessDenied/ExpiredToken | Kiểm runtime role và cấu hình, không tạo lại USER ứng dụng |
| CAS/checksum/pending commit | Giữ journal/artifact và đối chiếu canonical, không ép ghi đè |
| Thiếu disk/RAM | Kiểm dung lượng, log và backup trước khi xử lý tài nguyên |

Một file RUNNING cũ không chứng minh còn tiến trình chạy; một request DISPATCHED không chứng minh tác vụ phục hồi xong. Sau xử lý, kiểm trạng thái cuối và dữ liệu công khai thay vì chỉ nhìn service active.

### Kết quả mong đợi

Có chẩn đoán, log và kết quả xử lý theo cùng run; không xóa marker hoặc pending_commit để bỏ qua kiểm soát.

### Source đối chiếu

- `deploy/ec2/configure_monitoring.py`
- `deploy/ec2/install_monitoring.sh`
- `dashboard/admin_monitoring.py`
- `docs/OPERATIONS_RUNBOOK.md`

---

[← 5.14. Giám sát và xử lý sự cố](../) · [Mục lục Workshop](../../) · [Bước trước](../5.14.2-step2/)
