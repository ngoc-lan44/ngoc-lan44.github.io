---
title: "Nghiệm thu sau đợt triển khai"
date: 2026-11-11T00:00:00+07:00
weight: 4
chapter: false
pre: " <b> 5.11.4. </b> "
aliases:
  - "/5-workshop/5.8-ec2-https/5.8.6-step6/"
---

**Mục tiêu:** Nghiệm thu sau đợt triển khai.

**Bối cảnh:** Kiểm IAM/runtime, đóng gói source và nghiệm thu đúng release.

### Các bước thực hiện

| Kiểm tra | Bằng chứng cần lưu |
| --- | --- |
| Source đúng release | SHA256 gói và kết quả đối chiếu file theo biên bản triển khai |
| Python hợp lệ | pip check, service không lặp lỗi dependency |
| Streamlit nội bộ | Health loopback và journal dashboard |
| Proxy/TLS | nginx -t, HTTP redirect, HTTPS được xác thực |
| Tương tác | WebSocket kết nối; thao tác bộ lọc và chi tiết việc làm hoạt động |
| Dữ liệu được giữ | Current/config/tài khoản không bị reset trong cập nhật |

Khi cần rollback, sử dụng source/config backup của đúng release theo runbook; không khôi phục bằng cách xóa runtime data. Các script cập nhật lịch sử có SHA cố định không phải bộ cập nhật chung cho mọi phiên bản.

Việc kiểm timer chứng chỉ hoạt động và cấp HTTPS thành công tại một thời điểm chưa thay thế diễn tập stop/start đầy đủ. Ghi IP và thời điểm thật của phiên kiểm tra; không dùng địa chỉ cũ trong biên bản để khẳng định website đang truy cập được hôm nay.

### Kết quả mong đợi

Lưu checklist nghiệm thu và phương án rollback của đúng release.

### Source đối chiếu

- `deploy/ec2/stack.json`
- `deploy/ec2/build_release.py`
- `deploy/ec2/install.sh`
- `deploy/ec2/streamlit.service`
- `docs/EC2_DEPLOYMENT_2026-11-02.md`

---

[← 5.11. Triển khai hệ thống trên Amazon EC2](../) · [Mục lục Workshop](../../) · [Bước trước](../5.11.3-step3/)
