---
title: "Đọc dữ liệu một tin trước khi chuyển ETL"
date: 2026-11-10
weight: 4
chapter: false
pre: " <b> 5.2.4. </b> "
---

Mở một JSON batch đã hoàn tất, chọn một tin và đối chiếu với trang ITviec tương ứng. Kiểm tiêu đề, doanh nghiệp, URL, địa điểm, kỹ năng, ngày đăng và thông tin lương nếu nguồn công khai. Dùng job_id để theo dấu tin trong các bước sau; không dùng tiêu đề làm khóa vì nhiều tin có thể cùng tên.

| Kiểm tra | Cách đánh giá |
| --- | --- |
| Đúng nguồn | URL thuộc ITviec và mở đúng tin đã thu thập |
| Đúng discovery | discovery_file của batch trỏ đến đầu vào đã chọn |
| Đủ batch | Tổng hợp toàn bộ batch, kể cả batch cuối ít hơn 25 tin |
| Không trùng | URL sau canonical và job_id trong snapshot hợp lệ phải duy nhất |
| Trường thiếu | Phân biệt nguồn không công khai dữ liệu với lỗi trích xuất |

Một batch hoàn tất chưa chứng minh toàn lượt hoàn tất. Chỉ dùng validated_snapshot.json khi runner đã xác nhận các batch liên quan hợp lệ. Không ghép thủ công batch thuộc discovery khác để bù số lượng.

**Kiểm tra sau bước này:** Một job_id được đối chiếu với đúng trang ITviec và dữ liệu batch.

---

[← 5.2](../) · [Mục lục Workshop](../../) · [Bước trước](../5.2.3-step3/) · [Bước tiếp →](../5.2.5-step5/)
