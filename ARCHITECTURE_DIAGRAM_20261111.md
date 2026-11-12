# Sơ đồ Vietnam IT Job Market — 11/11/2026

Vẽ theo bố cục phân lớp của ảnh tham khảo, sử dụng 10 biểu tượng dịch vụ/nhóm chính thức AWS (gói 31/07/2026). Source SVG có thể chỉnh sửa; PNG 3900 × 2550 dùng trong báo cáo.

Căn cứ: deploy/ec2/stack.json, streamlit.service, pipeline.service/timer, projection.service/timer, operations.service, proxy.inc, auto_https.py; dashboard/job_data.py, moderation_config.py, sync_moderation_projection.py; docs/SOFT_DELETE_PHASE3.md và README.md.

Một EC2 chứa pipeline, local JSON, Nginx, Streamlit, systemd và worker. Các khối S3 biểu diễn prefix của cùng bucket. Glue cung cấp metadata, không chạy ETL. Athena đọc Parquet và snapshot moderation. Tài khoản/hoạt động cá nhân ở S3; moderation/audit ở DynamoDB. IAM role và Session Manager hỗ trợ EC2; CloudWatch nhận log/alarm. Không vẽ hạ tầng CI/CD hay các dịch vụ của dự án mẫu.

Sơ đồ phản ánh source và hồ sơ, không phải xác nhận AWS live. Website báo cáo được cập nhật ảnh; không thay code ứng dụng hay tài nguyên AWS.
