---
title: "Đối chiếu quy tắc chuẩn hóa"
date: 2026-11-10
weight: 4
chapter: false
pre: " <b> 5.3.4. </b> "
---

Chọn cùng một job_id ở current và clean để kiểm từng nhóm trường. Không so sánh hai bản ghi chỉ dựa trên vị trí dòng vì quá trình xử lý có thể thay đổi thứ tự.

| Nhóm dữ liệu | Quy tắc trong project |
| --- | --- |
| Văn bản | Loại khoảng trắng dư, giữ nội dung có nghĩa |
| Địa điểm | Chuẩn hóa nhãn nhận dạng được; nhóm không nhận dạng là Khác |
| Kỹ năng | Bỏ phần tử rỗng, loại trùng không phân biệt hoa/thường và giữ thứ tự |
| Kinh nghiệm | Từ số tháng sang nhóm: Không yêu cầu, dưới 1 năm, 1–3 năm, 3–5 năm, 5 năm trở lên; thiếu/không hợp lệ là Không xác định |
| Lương | Giữ giá trị nguồn có thể trích xuất; không biến lương ẩn thành 0 hoặc tự ước lượng |
| Cấp bậc | Theo quy tắc nhận dạng của cleaner; không suy đoán chỉ từ số năm kinh nghiệm |

**Kiểm tra sau bước này:** Các trường của cùng job_id được chuẩn hóa theo quy tắc của source.

---

[← 5.3](../) · [Mục lục Workshop](../../) · [Bước trước](../5.3.3-step3/) · [Bước tiếp →](../5.3.5-step5/)
