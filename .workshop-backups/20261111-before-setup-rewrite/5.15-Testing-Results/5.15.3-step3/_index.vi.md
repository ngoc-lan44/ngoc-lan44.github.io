---
title: "Lập bảng nghiệm thu cho một phiên thực hành"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.15.3. </b> "
aliases:
  - "/5-workshop/5.10-monitoring-results/5.10.5-step5/"
---

**Mục tiêu:** Lập bảng nghiệm thu cho một phiên thực hành.

**Bối cảnh:** Lập bằng chứng dữ liệu, giao diện, quyền và vận hành theo thời điểm.

### Các bước thực hiện

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

### Kết quả mong đợi

Bảng nghiệm thu ghi đạt/chưa đạt/chưa kiểm tra cùng bằng chứng.

### Source đối chiếu

- `docs/EC2_DEPLOYMENT.md`
- `docs/EC2_DEPLOYMENT_2026-11-02.md`
- `docs/AUTO_HTTPS.md`
- `.github/workflows/offline-tests.yml`
- `docs/UNUSED_CODE_CLEANUP.md`

---

[← 5.15. Kiểm thử và kết quả thực hiện](../) · [Mục lục Workshop](../../) · [Bước trước](../5.15.2-step2/)
