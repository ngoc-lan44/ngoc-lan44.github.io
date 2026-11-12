# Kiểm tra Workshop trước khi bổ sung ảnh — 11/11/2026

## Kết luận nội dung

Cấu trúc tiếng Việt có 16 chương, 57 bài con. Kiến trúc và các nhóm chức năng đã đối chiếu với source: ITviec; discovery/batch/validation; current/history/clean/Parquet trên EC2; S3 canonical; Glue Data Catalog; Athena active views; Streamlit/Plotly; tài khoản và hoạt động cá nhân S3; DynamoDB moderation/audit; Projection Worker; Nginx/HTTPS; systemd, Operations Worker và CloudWatch. Không phát hiện khác biệt kiến trúc chính trong phạm vi đối chiếu.

## Điểm đã chỉnh khi rà soát

- Sửa nguồn đối chiếu ở 57 bài con: ưu tiên module/SQL trực tiếp thay danh sách nguồn chung.
- Ghi đầy đủ gốc data/runs/<RUN_ID_THUC_TE>/ cho staging current/history.
- Ghi bucket/prefix control SQL, result location Athena đầy đủ và tiêu chí số ID/không lọt tin xóa; bổ sung điều kiện snapshot hợp lệ.
- Gắn số liệu 28/10 với run_id 20261028T101436Z-5b06686c và tài liệu gốc; không biến số liệu lịch sử thành số liệu hiện tại.
- Ảnh chạy bù chỉ được ghi nhận khi có trigger/log/trạng thái cuối; không giả định lượt 03/11 đã hoàn tất.

## Phần còn cần bằng chứng

Có thể bắt đầu bổ sung 27 nhóm ảnh theo WORKSHOP_IMAGES_TODO.md. Ghi ngày/run_id/Query ID khi có; một nhóm có thể cần nhiều ảnh để chữ đọc được. Các trạng thái enabled, PITR, chứng chỉ/IP và CloudWatch cần chụp theo AWS hiện tại. Không có số chi phí tháng, tải lớn hoặc SNS/email được coi là đã kiểm chứng. Không chạy lại thao tác ghi/xóa hoặc restart EC2 chỉ để tạo ảnh nếu chưa có kế hoạch.

Bản tiếng Việt là nội dung đầy đủ; tiếng Anh là bản tóm tắt/đường dẫn sang bài Việt. Rà soát source và liên kết không thay thế nghiệm thu AWS live. Lần này không chạy AWS, crawler, pipeline, triển khai hoặc test ứng dụng.
