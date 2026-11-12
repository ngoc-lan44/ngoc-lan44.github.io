---
title: "Tìm kiếm, lọc và xem chi tiết việc làm"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.9.3. </b> "
aliases:
  - "/5-workshop/5.8-streamlit-dashboard/5.8.3-step3/"
  - "/5-workshop/5.8-streamlit-dashboard/5.8.5-step5/"
  - "/5-workshop/5.5-streamlit-dashboard/5.5.3-step3/"
  - "/5-workshop/5.5-streamlit-dashboard/5.5.5-step5/"
---

**Thực hiện tại:** Website của dự án

### Mục tiêu

Kiểm tra luồng tra cứu sau khi cấu hình dữ liệu.

### Điều kiện đầu vào

Danh sách active đã tải.

### Các bước thực hiện

1. Nhập từ khóa vị trí hoặc công ty.
2. Chọn địa điểm, cấp bậc, kinh nghiệm, công ty và điều kiện có thông tin lương.
3. Chọn Xem chi tiết ở một dòng; đối chiếu tiêu đề, công ty, job_id và URL ITviec.
4. Chọn dòng khác để kiểm chi tiết không giữ nhầm tin trước.
5. Thử từ khóa không có kết quả rồi xóa lọc để trở lại danh sách.

Nếu UI chậm cập nhật sau publication, kiểm thời điểm dữ liệu/cache trước khi chạy lại pipeline. Health OK chỉ xác nhận tiến trình, không thay kiểm truy vấn và nghiệp vụ.

### Kiểm tra kết quả

Tìm/lọc đúng dữ liệu, chi tiết và link ITviec khớp tin; trạng thái rỗng không tạo lỗi.

### Tìm kiếm bằng từ khóa

Ô **Từ khóa** tìm theo vị trí tuyển dụng hoặc công ty, giúp thu hẹp danh sách theo nội dung người dùng quan tâm. Với từ khóa **aws**, KPI, biểu đồ và bảng việc làm cùng cập nhật theo kết quả tìm kiếm.

![KPI sau khi nhập từ khóa aws](/images/workshop/setup-5-9-search-kpi.png)

![Các biểu đồ theo kết quả tìm kiếm từ khóa aws](/images/workshop/setup-5-9-search-charts.png)

![Danh sách việc làm và mức độ công khai lương theo từ khóa aws](/images/workshop/setup-5-9-search-results.png)

### Lọc việc làm theo địa điểm

Bộ lọc địa điểm giới hạn dữ liệu theo khu vực người dùng quan tâm. Khi chọn **Hà Nội**, KPI, biểu đồ và danh sách việc làm cùng sử dụng phạm vi đã chọn, giúp người xem phân tích và tra cứu trên cùng tập dữ liệu.

![KPI dashboard sau khi chọn địa điểm Hà Nội](/images/workshop/setup-5-9-filter-kpi.png)

![Các biểu đồ cập nhật theo bộ lọc Hà Nội](/images/workshop/setup-5-9-filter-charts.png)

![Biểu đồ công khai lương và danh sách việc làm theo bộ lọc Hà Nội](/images/workshop/setup-5-9-filter-jobs.png)

### Xem chi tiết việc làm

Phần chi tiết giúp người dùng đánh giá từng cơ hội qua thông tin công ty, địa điểm, lương, kinh nghiệm, cấp bậc và loại công việc. Liên kết ITviec cho phép mở tin tuyển dụng gốc. Các nút lưu việc làm và ứng tuyển kết nối với chức năng cá nhân khi người dùng đăng nhập.

![Chi tiết tin IT Project Manager của SureFlow được chọn từ danh sách lọc Hà Nội, kèm liên kết ITviec](/images/workshop/setup-5-9-03.png)


---

[← 5.9. Cấu hình và triển khai Streamlit Dashboard](../) · [Mục lục Workshop](../../) · [Bước trước](../5.9.2-step2/)
