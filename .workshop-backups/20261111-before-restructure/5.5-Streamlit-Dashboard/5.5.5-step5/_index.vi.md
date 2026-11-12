---
title: "Kiểm tra dữ liệu rỗng và hiệu lực cache"
date: 2026-11-10
weight: 5
chapter: false
pre: " <b> 5.5.5. </b> "
---

1. Nhập từ khóa không có trong tập dữ liệu, kiểm giao diện thông báo không có kết quả và không phát sinh lỗi.
2. Xóa từ khóa, trả bộ lọc về ban đầu rồi chọn một dòng khác để mở chi tiết; thông tin không được giữ nhầm từ tin trước.
3. So sánh thời điểm cập nhật và journal khi cần xác minh dữ liệu mới. Reader có cache 300 giây cho jobs/skills; không kết luận pipeline lỗi chỉ vì UI chưa đổi ngay.
4. Sau một thao tác moderation, kiểm public view và giao diện theo quy trình mục 5.7 để phân biệt cache với độ trễ projection.

Nếu health trả OK nhưng trang không có dữ liệu, kiểm truy vấn Athena, quyền IAM và log ứng dụng. Health chỉ kiểm tiến trình Streamlit, không chứng minh toàn bộ đường đọc dữ liệu đã thành công. Không đưa credential vào ảnh lỗi hoặc nội dung báo cáo.

**Kiểm tra sau bước này:** Dữ liệu rỗng có thông báo, bỏ lọc khôi phục được kết quả; cache được phân biệt với lỗi pipeline.

---

[← 5.5](../) · [Mục lục Workshop](../../) · [Bước trước](../5.5.4-step4/)
