# Viết lại Workshop thành quy trình thiết lập — 11/11/2026

16 chương, 40 bài con. Thứ tự: prerequisite/data → Catalog/moderation → EC2 → collection/ETL/publication → dashboard/accounts → HTTPS/scheduling/monitoring → acceptance/backup/cleanup. Mỗi bài có mục tiêu, điều kiện, bước thiết lập và kiểm kết quả. Các lệnh chỉ đọc không thay thế thao tác cài đặt/chạy nghiệp vụ.

Giữ năm ảnh người dùng đã gửi, sơ đồ đã chọn và log discovery thực tế. Mã ảnh/vị trí thay theo cấu trúc mới. Log/screenshot 624 URL và batch 1 vẫn chỉ chứng minh đúng phần đó, không chứng nhận toàn run. Không tạo ảnh thao tác giả.

Giới hạn triển khai đúng source: provision.py tái dùng bucket/Catalog/DynamoDB và từ chối account khác; publication yêu cầu current seed và canonical có sẵn; Phase 3 là migration từ nguồn/control hợp lệ, không init trống; Certbot runtime cần chuẩn bị trước configure_public_https.sh. Không chạy script lịch sử SHA/IP cố định như updater chung.

Không sửa code ứng dụng, không gọi AWS/pipeline/deploy/migration và không xóa tài nguyên. Bản trước giữ tại .workshop-backups/20261111-before-setup-rewrite.

## Kiểm tra bản viết lại

Hugo build thành công; 329 liên kết nội bộ, 199 redirect và các mã ảnh được kiểm. Mỗi bài con có môi trường, mục tiêu, điều kiện đầu vào, thao tác và kiểm kết quả. SHA256 của 118 file ứng dụng/deploy/SQL/config giữ nguyên. Đã giữ 5 ảnh thực tế và 1 sơ đồ, còn 32 nhóm ảnh cần bổ sung cho cả thao tác thiết lập lẫn kết quả. Bản tiếng Việt đầy đủ; bản tiếng Anh là điều hướng/tóm tắt.
