# Ảnh Bản đề xuất cần bổ sung

Sơ đồ kiến trúc đã có. Năm nhóm ảnh thực tế được ghi tại mục 4 và mục 8 của bài.

1. S3 hiển thị canonical Parquet và metadata run-id/sha256; Athena hiển thị truy vấn view itviec_active_jobs cùng Query ID.

2. dashboard hiển thị 8 KPI, các biểu đồ và bảng việc làm có bộ lọc.

3. các trang USER và Quản lý việc làm/Việc làm đã xóa của ADMIN; che dữ liệu cá nhân.

4. EC2/service/timer và website HTTPS tại thời điểm kiểm tra; CloudWatch log hoặc alarm tương ứng.

5. kết quả kiểm thử hoặc biên bản nghiệm thu có ngày và source version; giữ đúng số lượng/kết quả thực tế.
