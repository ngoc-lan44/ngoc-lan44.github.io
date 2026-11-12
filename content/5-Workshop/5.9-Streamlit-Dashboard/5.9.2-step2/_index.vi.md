---
title: "Hiển thị KPI và biểu đồ Plotly"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.9.2. </b> "
aliases:
  - "/5-workshop/5.8-streamlit-dashboard/5.8.2-step2/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.4-step4/"
  - "/5-workshop/5.5-streamlit-dashboard/5.5.2-step2/"
  - "/5-workshop/5.5-streamlit-dashboard/5.5.4-step4/"
---

**Thực hiện tại:** Website của dự án

### Mục tiêu

Đưa các thành phần phân tích hiện có vào nghiệm thu.

### Điều kiện đầu vào

Dashboard đã kết nối đúng dataset.

### Các bước thực hiện

Source market_dashboard.py dựng giao diện, weekly_metrics.py tính chỉ số tuần. Mở **Tổng quan thị trường**, bỏ bộ lọc rồi kiểm:

| Thành phần | Nội dung |
| --- | --- |
| 4 KPI tổng quan | Việc làm active, doanh nghiệp, tin công khai lương, kỹ năng |
| 4 KPI tuần | Tin đăng mới, doanh nghiệp có tin, tin có lương, kỹ năng trong từng cohort |
| 7 nhóm biểu đồ | Ngày đăng, kỹ năng, địa điểm, công ty, kinh nghiệm, cấp bậc, tỷ lệ công khai lương |

KPI tuần dùng hai khoảng 7 ngày theo ngày đăng, chốt theo dữ liệu; kỳ trước bằng 0 hiển thị trạng thái Mới phát sinh. Một tin có nhiều skills nên tổng lượt skills có thể lớn hơn số tin.

Thay đổi bộ lọc để kiểm tra các chỉ số, biểu đồ và danh sách việc làm cùng cập nhật theo phạm vi đã chọn.

### Kiểm tra kết quả

Đủ 8 KPI và các biểu đồ của source; số liệu khớp cùng phạm vi lọc, không suy thành toàn thị trường.

### Tổng quan và so sánh theo tuần

Nhóm KPI tổng quan giúp người xem nắm quy mô tập việc làm đang hiển thị, số doanh nghiệp, tin công khai lương và kỹ năng. Nhóm KPI tuần so sánh hai khoảng bảy ngày theo ngày đăng để nhận biết thay đổi tuyển dụng trong dữ liệu thu thập. Các bộ lọc bên trái xác định phạm vi dữ liệu phân tích.

![Dashboard tổng quan thị trường với bộ lọc mặc định, bốn KPI tổng quan và bốn KPI tuần](/images/workshop/setup-5-9-01.png)


### Biểu đồ phân tích thị trường

Biểu đồ xu hướng giúp theo dõi số việc làm theo ngày đăng; biểu đồ kỹ năng và địa điểm cho thấy nhu cầu tuyển dụng trong tập dữ liệu. Các biểu đồ doanh nghiệp, kinh nghiệm và cấp bậc hỗ trợ so sánh cơ hội việc làm theo từng nhóm. Tất cả sử dụng cùng phạm vi bộ lọc của dashboard.

![Sáu biểu đồ phân tích xu hướng, kỹ năng, địa điểm, doanh nghiệp, kinh nghiệm và cấp bậc](/images/workshop/setup-5-9-charts-overview.png)

### Mức độ công khai lương

Biểu đồ phân chia tin có thông tin mức lương và tin chưa công khai lương trong phạm vi bộ lọc hiện tại. Chỉ số này giúp người xem đánh giá mức độ sẵn có của thông tin lương; các tin không công khai lương không được quy đổi thành mức lương bằng 0. Danh sách việc làm bên dưới cho phép chuyển từ thống kê tổng quan sang xem từng tin cụ thể.

![Biểu đồ mức độ công khai lương và danh sách việc làm trên dashboard](/images/workshop/setup-5-9-02.png)


---

[← 5.9. Cấu hình và triển khai Streamlit Dashboard](../) · [Mục lục Workshop](../../) · [Bước trước](../5.9.1-step1/) · [Bước tiếp →](../5.9.3-step3/)
