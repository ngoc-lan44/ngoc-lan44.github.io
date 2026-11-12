# Workshop rút gọn — 10/11/2026

Website Hugo: E:\vn-it-job-market\MauWorklogWorkshop\MauWorklogWorkshop. Giữ Workshop số 5, Tự đánh giá 6 và Góp ý 7.

## Nội dung hiện tại

10 chương chính, bước con nằm trong từng trang; cộng mục lục là 11 trang/ngôn ngữ, 22 Markdown. Bản hiện tại được biên tập còn khoảng 5.218 từ đếm theo khoảng trắng. Không bỏ các luồng dữ liệu, quyền và vận hành quan trọng. Bản Anh là companion ngắn; hướng dẫn chi tiết và mã ảnh nằm ở bản Việt.

- [5.1. Tổng quan và chuẩn bị](content/5-Workshop/5.1-Overview/_index.vi.md)
- [5.2. Thu thập dữ liệu tuyển dụng từ ITviec](content/5-Workshop/5.2-ITviec-Collection/_index.vi.md)
- [5.3. Đồng bộ, làm sạch và xuất Parquet](content/5-Workshop/5.3-Data-Processing/_index.vi.md)
- [5.4. Lưu trữ S3, metadata Glue và truy vấn Athena](content/5-Workshop/5.4-S3-Glue-Athena/_index.vi.md)
- [5.5. Dashboard Streamlit và trực quan hóa](content/5-Workshop/5.5-Streamlit-Dashboard/_index.vi.md)
- [5.6. Tài khoản và chức năng người dùng](content/5-Workshop/5.6-User-Features/_index.vi.md)
- [5.7. Quản trị, DynamoDB và Projection Worker](content/5-Workshop/5.7-Administration/_index.vi.md)
- [5.8. Triển khai EC2, Nginx và HTTPS](content/5-Workshop/5.8-EC2-HTTPS/_index.vi.md)
- [5.9. Tự động hóa pipeline và phục hồi](content/5-Workshop/5.9-Pipeline-Automation/_index.vi.md)
- [5.10. Giám sát, kiểm thử và kết quả](content/5-Workshop/5.10-Monitoring-Results/_index.vi.md)

## Đối chiếu nguồn

| Mục | Nội dung | Căn cứ chính |
| --- | --- | --- |
| 5.1 | Tổng quan và chuẩn bị | `README.md`, `docs/EC2_DEPLOYMENT_2026-11-02.md`, `deploy/ec2/stack.json`, `dashboard/app.py`. |
| 5.2 | Thu thập dữ liệu tuyển dụng từ ITviec | `collectors/discover_itviec_jobs.py`, `collectors/crawl_support.py`, `collectors/itviec_batch_collector.py`, `deploy/ec2/run_pipeline.py`. |
| 5.3 | Đồng bộ, làm sạch và xuất Parquet | `processors/sync_itviec_current.py`, `processors/clean_itviec.py`, `processors/export_itviec_parquet.py`, `sql/create_itviec_table.sql`. |
| 5.4 | Lưu trữ S3, metadata Glue và truy vấn Athena | `deploy/ec2/run_pipeline.py`, `deploy/ec2/pipeline_state.py`, `sql/`, `dashboard/job_data.py`. |
| 5.5 | Dashboard Streamlit và trực quan hóa | `dashboard/app.py`, `dashboard/job_data.py`, `dashboard/market_dashboard.py`, `dashboard/weekly_metrics.py`, `dashboard/job_components.py`. |
| 5.6 | Tài khoản và chức năng người dùng | `AUTHENTICATION.md`, `dashboard/auth.py`, `dashboard/registration.py`, `dashboard/passwords.py`, `dashboard/personal_pages.py`, `dashboard/personal_service.py`, `dashboard/account_security.py`. |
| 5.7 | Quản trị, DynamoDB và Projection Worker | `dashboard/app.py`, `dashboard/job_management.py`, `dashboard/job_admin_service.py`, `dashboard/dynamo_moderation_store.py`, `dashboard/moderation_projection.py`, `docs/SOFT_DELETE_PHASE3.md`. |
| 5.8 | Triển khai EC2, Nginx và HTTPS | `deploy/ec2/stack.json`, `deploy/ec2/provision.py`, `deploy/ec2/build_release.py`, `deploy/ec2/streamlit.service`, `deploy/ec2/proxy.inc`, `deploy/ec2/auto_https.py`, `docs/AUTO_HTTPS.md`. |
| 5.9 | Tự động hóa pipeline và phục hồi | `deploy/ec2/pipeline.service`, `deploy/ec2/pipeline.timer`, `deploy/ec2/run_pipeline.py`, `deploy/ec2/operations_worker.py`, `deploy/ec2/install_recovery.sh`, `docs/OPERATIONS_RUNBOOK.md`. |
| 5.10 | Giám sát, kiểm thử và kết quả | `deploy/ec2/configure_monitoring.py`, `deploy/ec2/install_monitoring.sh`, `.github/workflows/offline-tests.yml`, `docs/OPERATIONS_RUNBOOK.md`, `docs/EC2_DEPLOYMENT_2026-11-02.md`, `docs/UNUSED_CODE_CLEANUP.md`, `docs/AUTO_HTTPS.md`. |

Danh mục đầy đủ file nguồn: WORKSHOP_SOURCE_MAP.json. Câu lệnh chính: WORKSHOP_COMMANDS.md.

## Ảnh

27 ghi chú cần chụp, nêu loại màn hình/nội dung/tên file; danh sách tại WORKSHOP_IMAGES_TODO.md. Một sơ đồ kiến trúc theo source đã có. Không có ảnh AWS giả hoặc img trỏ đến ảnh tương lai.

## Kiểm tra

Hugo build PASS; 82 liên kết nội bộ, 130 chuyển hướng cũ mỗi ngôn ngữ, ảnh hiện hữu và mã ảnh không lỗi. 155 file ứng dụng có checksum không đổi, tất cả nội dung ngoài Workshop giữ nguyên trong lần rút gọn. CSS/theme và cơ chế mobile không thay đổi trong lần này. Bản standalone đã đồng bộ còn 30 trang toàn báo cáo, trong đó 11 trang Workshop.

## Giới hạn bằng chứng

Các kết quả 28/10, deploy 02/11, cleanup local và HTTPS 03/11 giữ đúng mốc riêng. Cần output log chạy bù 03/11 trước khi xác nhận kết quả; chưa có Stop/Start HTTPS E2E, AWS live/số jobs/test mới, tải lớn hoặc gửi SNS/email mới được chứng minh. Không chạy lại crawler/pipeline/test ứng dụng, không deploy hoặc thay đổi AWS.

## File nội dung hiện hành

- `content/5-Workshop/_index.vi.md`
- `content/5-Workshop/_index.en.md`
- `content/5-Workshop/5.1-Overview/_index.vi.md`
- `content/5-Workshop/5.1-Overview/_index.en.md`
- `content/5-Workshop/5.2-ITviec-Collection/_index.vi.md`
- `content/5-Workshop/5.2-ITviec-Collection/_index.en.md`
- `content/5-Workshop/5.3-Data-Processing/_index.vi.md`
- `content/5-Workshop/5.3-Data-Processing/_index.en.md`
- `content/5-Workshop/5.4-S3-Glue-Athena/_index.vi.md`
- `content/5-Workshop/5.4-S3-Glue-Athena/_index.en.md`
- `content/5-Workshop/5.5-Streamlit-Dashboard/_index.vi.md`
- `content/5-Workshop/5.5-Streamlit-Dashboard/_index.en.md`
- `content/5-Workshop/5.6-User-Features/_index.vi.md`
- `content/5-Workshop/5.6-User-Features/_index.en.md`
- `content/5-Workshop/5.7-Administration/_index.vi.md`
- `content/5-Workshop/5.7-Administration/_index.en.md`
- `content/5-Workshop/5.8-EC2-HTTPS/_index.vi.md`
- `content/5-Workshop/5.8-EC2-HTTPS/_index.en.md`
- `content/5-Workshop/5.9-Pipeline-Automation/_index.vi.md`
- `content/5-Workshop/5.9-Pipeline-Automation/_index.en.md`
- `content/5-Workshop/5.10-Monitoring-Results/_index.vi.md`
- `content/5-Workshop/5.10-Monitoring-Results/_index.en.md`

Các trang chi tiết cũ được backup ngoài website và chuyển hướng về chương tương ứng; không xuất hiện như 73 bài nhỏ trong menu nữa. Các file mục lục, preview, source map, ảnh TODO và báo cáo đã cập nhật theo bản 10 mục.

## Biên tập mạch nội dung

Đã viết lại 11 trang tiếng Việt theo trình tự thao tác; bỏ các đoạn nhắc việc soạn bài và phần căn cứ dài trong nội dung công khai. Giữ 10 chương, câu lệnh chính và các giới hạn kỹ thuật liên quan; tập trung kết quả có ngày tại 5.10. Toàn bộ 27 ghi chú ảnh được đặt sát bước tương ứng, vị trí cụ thể đã cập nhật trong WORKSHOP_IMAGES_TODO.md. Alias/menu và các phần ngoài Workshop giữ nguyên.

## Đối chiếu cách viết với form mẫu

Đã mở được bản tiếng Việt bằng trình duyệt: /vi/5-workshop/, trang Chuẩn bị, S3 Buckets, DynamoDB và Kiểm thử. Áp dụng cách viết giới thiệu ngắn, đường dẫn Console, bảng thông số, thao tác/code, ảnh sát bước và checklist. Giữ 10 mục của Vietnam IT Job Market; không sao chép công nghệ, tên tài nguyên, dữ liệu hoặc lỗi đánh số của mẫu.


## Bổ sung hướng dẫn thực hành 10/11/2026

Giữ 10 mục lớn; bổ sung mục tiêu, quy trình đối chiếu dữ liệu, bảng kiểm USER/ADMIN, chẩn đoán lỗi, kiểm release, đọc trạng thái và hướng dẫn dọn tài nguyên không thực thi. Giữ 27 vị trí ảnh và sơ đồ kiến trúc. Chỉ cập nhật nội dung tiếng Việt; bản tiếng Anh vẫn là bản tóm tắt. Số từ gần đúng của 10 bài tăng từ 5668 lên 9118 (bao gồm frontmatter/câu lệnh). Không chạy AWS, pipeline hoặc bộ test ứng dụng.


## Chuẩn hóa theo bốn mẫu — 10/11/2026

Đã đối chiếu trực tiếp bốn mẫu; giữ 10 chương và chuyển 53 tiểu mục thành bước 5.x.y. Bổ sung mục lục trong bài, đầu vào/đầu ra, điều kiện kiểm tra từng bước; giữ câu lệnh, ghi chú ảnh và bằng chứng theo thời điểm. Chi tiết tham khảo tại WORKSHOP_REFERENCE_REVIEW.md.


## Đưa bài con lên thanh bên — 10/11/2026

Giữ 10 mục lớn, tách nguyên nội dung 53 bước thành 53 bài con có URL riêng. Trang mục lớn giữ phần giới thiệu/đầu vào/đầu ra/kết luận và liên kết con. Thanh bên Hugo và bản HTML dùng cùng cây phân cấp. Giữ nguyên 27 ghi chú ảnh và sơ đồ; bản tiếng Anh của bài con dẫn đến hướng dẫn tiếng Việt đầy đủ.


## Cấu trúc theo yêu cầu mới — 11/11/2026

16 chương, bắt đầu bằng 5.1. Giới thiệu và 5.2. Các bước chuẩn bị; 57 bài con. Xem WORKSHOP_RESTRUCTURE_20261111.md và WORKSHOP_SOURCE_MAP.json cho cấu trúc hiện hành. Các ghi nhận số chương ở phần trên là lịch sử chỉnh sửa.


## Bản hướng dẫn thiết lập đầy đủ — 11/11/2026

Đã viết lại 16 chương/40 bài con thành setup/deployment; xem WORKSHOP_SETUP_REWRITE_20261111.md. Thông số cũ trong các phần trên là lịch sử chỉnh sửa.
