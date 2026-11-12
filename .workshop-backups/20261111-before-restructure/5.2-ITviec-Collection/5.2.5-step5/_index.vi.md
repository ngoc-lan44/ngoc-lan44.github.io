---
title: "Xử lý thu thập gián đoạn"
date: 2026-11-10
weight: 5
chapter: false
pre: " <b> 5.2.5. </b> "
---

Nếu request lỗi, đọc failed_pages hoặc metadata batch và journal cùng thời điểm. Retry mạng/5xx có giới hạn; khi gặp 403/429 cần dừng, đánh giá điều kiện truy cập nguồn thay vì tăng số request. Checkpoint chỉ được tái sử dụng khi còn thỏa điều kiện của source, không phải dữ liệu dự phòng vô thời hạn.

Khi lập bảng kết quả, ghi **run_id, số URL duy nhất, số batch, số thành công/thất bại và trạng thái cuối**. Chỉ ghi số thực tế từ artifact; không dùng số 660 trong biên bản cũ làm số kỳ vọng cố định cho mọi lần quét.

**Kiểm tra sau bước này:** Sự cố được ghi theo metadata/journal; không ghép batch khác lượt để hợp thức hóa kết quả.

---

[← 5.2](../) · [Mục lục Workshop](../../) · [Bước trước](../5.2.4-step4/)
