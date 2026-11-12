---
title: "Lưu trữ S3, metadata Glue và truy vấn Athena"
date: 2026-11-08
weight: 4
chapter: false
pre: " <b> 5.4. </b> "
aliases:
  - "/5-workshop/5.5-s3-storage/"
  - "/5-workshop/5.5-s3-storage/5.5.1-step1/"
  - "/5-workshop/5.5-s3-storage/5.5.2-step2/"
  - "/5-workshop/5.5-s3-storage/5.5.3-step3/"
  - "/5-workshop/5.5-s3-storage/5.5.4-step4/"
  - "/5-workshop/5.5-s3-storage/5.5.5-step5/"
  - "/5-workshop/5.6-glue-catalog/"
  - "/5-workshop/5.6-glue-catalog/5.6.1-step1/"
  - "/5-workshop/5.6-glue-catalog/5.6.2-step2/"
  - "/5-workshop/5.6-glue-catalog/5.6.3-step3/"
  - "/5-workshop/5.6-glue-catalog/5.6.4-step4/"
  - "/5-workshop/5.7-athena/"
  - "/5-workshop/5.7-athena/5.7.1-step1/"
  - "/5-workshop/5.7-athena/5.7.2-step2/"
  - "/5-workshop/5.7-athena/5.7.3-step3/"
  - "/5-workshop/5.7-athena/5.7.4-step4/"
  - "/5-workshop/5.7-athena/5.7.5-step5/"
  - "/5-workshop/5.7-athena/5.7.6-step6/"
  - "/4-workshop/4.5-s3-storage/4.5.1-step1/"
  - "/4-workshop/4.5-s3-storage/4.5.2-step2/"
  - "/4-workshop/4.5-s3-storage/4.5.3-step3/"
  - "/4-workshop/4.5-s3-storage/"
  - "/4-workshop/4.6-glue-catalog/4.6.1-step1/"
  - "/4-workshop/4.6-glue-catalog/4.6.2-step2/"
  - "/4-workshop/4.6-glue-catalog/"
  - "/4-workshop/4.7-athena/4.7.1-step1/"
  - "/4-workshop/4.7-athena/4.7.2-step2/"
  - "/4-workshop/4.7-athena/"
---

**Mục tiêu thực hành:** Đối chiếu publication, metadata và kết quả truy vấn của cùng bộ dữ liệu.

S3 lưu dữ liệu, Glue Data Catalog mô tả schema/location và Athena cung cấp lớp truy vấn cho dashboard.

**Console:** Amazon S3 → AWS Glue Data Catalog → Amazon Athena.

**Region:** ap-southeast-1.

### Trước khi bắt đầu

**Đầu vào:** Parquet canonical và artifact run hợp lệ; quyền S3, Glue, Athena; snapshot moderation hiện hành.

**Đầu ra:** Chứng minh được đường dữ liệu S3 → Catalog → Athena và lớp view công khai phục vụ dashboard.

### Các bài thực hành

- [5.4.1. Lưu trữ và công bố Parquet trên S3](5.4.1-step1/)
- [5.4.2. Kiểm tra Glue Data Catalog](5.4.2-step2/)
- [5.4.3. Truy vấn Athena](5.4.3-step3/)
- [5.4.4. Tái lập metadata theo đúng thứ tự](5.4.4-step4/)
- [5.4.5. Đọc kết quả và chẩn đoán sai lệch](5.4.5-step5/)

### Kết quả mong đợi

Tổng source không trùng ID, public view loại tin bị ẩn, leaked_deleted_jobs mong đợi 0. Active view yêu cầu snapshot schema 2/backend DYNAMODB hợp lệ. Ghi Query ID và thời điểm; SELECT ghi kết quả S3 và có thể tính phí dữ liệu quét.

### Checklist

- [ ] Canonical key và metadata run-id/sha256 đúng run.
- [ ] Glue schema/location khớp Parquet.
- [ ] Athena dùng đúng source/view, lưu Query ID và thời điểm.
- [ ] Tin bị xóa mềm không lọt active view.


### Source đối chiếu

- `deploy/ec2/run_pipeline.py`
- `dashboard/s3_store.py`
- `dashboard/moderation_config.py`
- `config/user_data_iam_policy.json`
- `deploy/ec2/pipeline_state.py`
- `deploy/ec2/runtime.env.example`

---

[← 5.3](../5.3-Data-Processing/) · [Mục lục](../) · [5.5 →](../5.5-Streamlit-Dashboard/)
