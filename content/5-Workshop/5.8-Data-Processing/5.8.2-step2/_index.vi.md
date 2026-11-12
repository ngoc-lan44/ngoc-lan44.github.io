---
title: "Làm sạch dữ liệu và xuất Parquet"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.8.2. </b> "
aliases:
  - "/5-workshop/5.4-data-processing/5.4.2-step2/"
  - "/5-workshop/5.4-data-processing/5.4.3-step3/"
  - "/5-workshop/5.4-data-processing/5.4.4-step4/"
  - "/5-workshop/5.4-data-processing/5.4.5-step5/"
  - "/5-workshop/5.3-data-processing/5.3.2-step2/"
  - "/5-workshop/5.3-data-processing/5.3.3-step3/"
  - "/5-workshop/5.3-data-processing/5.3.4-step4/"
  - "/5-workshop/5.3-data-processing/5.3.5-step5/"
---

**Thực hiện tại:** SSM trên EC2

### Mục tiêu

Chuẩn hóa dữ liệu tuyển dụng và xuất tệp Parquet phục vụ truy vấn Athena.

### Điều kiện đầu vào

Current staging đã sync; PyArrow và dependency đã cài.

### Các bước thực hiện

Trong pipeline, runner đặt PIPELINE_DATA_ROOT trỏ vào staged và lần lượt chạy clean_itviec.py rồi export_itviec_parquet.py. Cleaner chuẩn hóa text, location, skills, experience, level và lương; exporter dùng PyArrow/Snappy.

Hai bước này được pipeline thực hiện nối tiếp trên dữ liệu đã đồng bộ. Kết quả được lưu trong thư mục của lượt chạy trước khi công bố lên S3.

Skills loại rỗng/trùng và giữ thứ tự; địa điểm chưa nhận dạng là Khác; kinh nghiệm thiếu là Không xác định. Lương ẩn không được biến thành 0 hoặc ước lượng. Kiểm date/timestamp, skills list và salary double với DDL.

### Kiểm tra kết quả

Clean JSON và Parquet cùng số dòng; schema tương thích Catalog. Current có thể lớn hơn số tin vừa crawl vì giữ dữ liệu đã có.

### Đối chiếu dữ liệu sau xuất Parquet

So sánh số dòng giữa JSON sạch và Parquet giúp kiểm tra bước xuất không làm thay đổi số lượng bản ghi. Kiểm tra schema giúp xác định các trường số, ngày, thời gian và danh sách kỹ năng được lưu theo kiểu phù hợp để Athena truy vấn.

![Đối chiếu số dòng JSON sạch và Parquet cùng schema của lượt pipeline: MATCH True](/images/workshop/setup-5-8-02.png)


---

[← 5.8. Thiết lập ETL và công bố Parquet](../) · [Mục lục Workshop](../../) · [Bước trước](../5.8.1-step1/) · [Bước tiếp →](../5.8.3-step3/)
