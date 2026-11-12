Đã rà các mục 5.2–5.6 với ảnh thực tế đã cung cấp.

- Python Windows 3.14.2 tách biệt Python EC2 3.12.3.
- Glue: 24 cột; S3 location và file Parquet khớp.
- Athena kỹ năng: 3447 cặp việc làm–kỹ năng, không phải 3447 việc làm.
- DynamoDB: Active, Deletion protection, On-demand và PITR đúng ảnh; READY/revision 0 và snapshot tương ứng.
- Truy vấn không giao nhau là kết quả lịch sử 28/10, không kết luận đã kiểm thử Delete/Restore.
- EC2: source root-owned, config root:vnjob 0640, dữ liệu vnjob-owned, dashboard active/health ok; bootstrap là lịch sử.
- Bỏ hướng dẫn cài/nạp seed/restart khỏi phần ghi nhận EC2 hiện hữu; bỏ khẳng định timer hiện tại tắt.
- Chưa có ảnh CloudFormation Outputs, EBS và checksum gói source; placeholder 5.6-04 giữ để bổ sung. Ảnh current hiện tại không chứng minh checksum seed lúc khởi tạo.
