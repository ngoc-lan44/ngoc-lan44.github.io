---
title: "Lập bảng nghiệm thu cho một phiên thực hành"
date: 2026-11-10
weight: 5
chapter: false
pre: " <b> 5.10.5. </b> "
---

Mỗi dòng ghi thời điểm, phiên bản source hoặc run_id, kết quả thực đo và bằng chứng. Không điền PASS cho bước chưa thực hiện.

| Hạng mục | Điều kiện đạt |
| --- | --- |
| Thu thập | Discovery và batch hợp lệ, không ghép khác lượt |
| ETL | ID duy nhất; current/clean/Parquet khớp số dòng và schema |
| Publication | Trạng thái cuối khớp run-id/sha256 của canonical S3 |
| Athena | Truy vấn thành công, không lọt tin bị xóa mềm |
| Dashboard | KPI/bộ lọc/chi tiết đúng, trạng thái rỗng không phát sinh lỗi |
| Tài khoản | USER/ADMIN đúng quyền, dữ liệu cá nhân tách biệt |
| Vận hành | Service/timer, HTTPS, WebSocket và log có bằng chứng cùng thời điểm |

Unit tests và UI smoke offline dùng fake clients, xác minh hành vi source nhưng không thay thế truy cập AWS thật. Gói release EC2 không mang tests/, vì vậy không coi thiếu tests trên EC2 là lỗi deployment; chạy bộ test ở môi trường riêng đã chuẩn bị full source.

**Kiểm tra sau bước này:** Bảng nghiệm thu ghi đạt/chưa đạt/chưa kiểm tra cùng bằng chứng.

---

[← 5.10](../) · [Mục lục Workshop](../../) · [Bước trước](../5.10.4-step4/) · [Bước tiếp →](../5.10.6-step6/)
