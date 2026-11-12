---
title: "Nghiệm thu sau đợt triển khai"
date: 2026-11-10
weight: 6
chapter: false
pre: " <b> 5.8.6. </b> "
---

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

**Kiểm tra sau bước này:** Lưu checklist nghiệm thu và phương án rollback của đúng release.

---

[← 5.8](../) · [Mục lục Workshop](../../) · [Bước trước](../5.8.5-step5/)
