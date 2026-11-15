# Báo cáo thực tập Vietnam IT Job Market

Báo cáo của Tòng Văn Tâm gồm sáu mục: Nhật ký công việc; Bản đề xuất; Các sự kiện meetup đã tham gia; Workshop; Tự đánh giá; Chia sẻ, đóng góp ý kiến.

## Xem trên localhost

Mở PowerShell tại thư mục này và chạy:

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-Localhost.ps1
```

Mở http://localhost:1313/ (tiếng Việt) hoặc http://localhost:1313/en/ (English). Giữ cửa sổ PowerShell mở trong lúc xem; nhấn Ctrl+C để dừng. Lần đầu cần Internet để tải Hugo 0.134.3.

Localhost đọc cùng nội dung, ảnh và giao diện Hugo dùng để xuất bản. Không mở `public/index.html` bằng đường dẫn file. Có thể mở trực tiếp vietnam-it-job-market-review.html để xem bản độc lập song ngữ, kèm ảnh. Website được xuất bản từ nội dung Hugo.

## Website

https://tongtam2005.github.io/Workshop/

Nội dung nằm trong `content/`, ảnh và tài nguyên trong `static/`, giao diện tùy chỉnh trong `layouts/`.

