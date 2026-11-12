---
title: "Tạo hoặc đối chiếu database và bảng nguồn"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.6.2. </b> "
---

**Mục tiêu:** Tạo hoặc đối chiếu database và bảng nguồn.

**Bối cảnh:** Kiểm database/table và tái lập metadata nguồn đúng schema Parquet.

### Các bước thực hiện

Phần này dùng khi cần tái lập metadata trên môi trường đã xác định. Với hệ thống đang hoạt động, kiểm bảng hiện hữu trước; không tạo thêm bucket hoặc đổi location để thử nghiệm.

1. Mở **Athena → Query editor**, chọn Region Singapore và data source AwsDataCatalog.
2. Nếu database chưa có trong môi trường tái lập, chạy câu lệnh dưới; nếu đã có thì chọn database đó.

~~~sql
CREATE DATABASE IF NOT EXISTS vn_it_job_market;
~~~

3. Mở file **sql/create_itviec_table.sql**, sao chép nguyên DDL vào Query editor và chạy. File này là định nghĩa bảng nguồn của project, không phải định nghĩa Glue ETL Job.
4. Vào **Glue → Data Catalog → Databases → vn_it_job_market → Tables → itviec_current_jobs**, đối chiếu schema và S3 location.

| Trường/nhóm | Kiểu trong DDL |
| --- | --- |
| job_id, title, company, location, status, url | string |
| salary_min, salary_max | double |
| salary_available | boolean |
| skills | array<string> |
| experience_months | bigint |
| posted_date, expired_date | date |
| first_seen, last_seen | timestamp |

Location nguồn: **s3://vn-it-job-market-data-381924757765-ap-southeast-1-an/analytics/itviec/**. Không đổi thành prefix pipeline-runs/ hoặc thư mục JSON raw. Các view moderation được tạo sau ở mục Athena.

CREATE TABLE IF NOT EXISTS không sửa schema của bảng đã có. Nếu đối chiếu phát hiện khác biệt, lưu thông tin và xử lý bằng đợt thay đổi metadata có kế hoạch; không kết luận bảng đã được sửa chỉ vì DDL chạy thành công.

### Kết quả mong đợi

Database/table tồn tại, schema khớp exporter và location đọc đúng Parquet canonical.

### Source đối chiếu

- `sql/create_itviec_table.sql`
- `processors/export_itviec_parquet.py`
- `dashboard/job_data.py`

---

[← 5.6. Cấu hình AWS Glue Data Catalog](../) · [Mục lục Workshop](../../) · [Bước trước](../5.6.1-step1/)
