---
title: "S3 Glue and Athena"
date: 2026-11-08
weight: 4
chapter: false
pre: " <b> 5.4. </b> "
aliases:
  - "/en/5-workshop/5.5-s3-storage/"
  - "/en/5-workshop/5.5-s3-storage/5.5.1-step1/"
  - "/en/5-workshop/5.5-s3-storage/5.5.2-step2/"
  - "/en/5-workshop/5.5-s3-storage/5.5.3-step3/"
  - "/en/5-workshop/5.5-s3-storage/5.5.4-step4/"
  - "/en/5-workshop/5.5-s3-storage/5.5.5-step5/"
  - "/en/5-workshop/5.6-glue-catalog/"
  - "/en/5-workshop/5.6-glue-catalog/5.6.1-step1/"
  - "/en/5-workshop/5.6-glue-catalog/5.6.2-step2/"
  - "/en/5-workshop/5.6-glue-catalog/5.6.3-step3/"
  - "/en/5-workshop/5.6-glue-catalog/5.6.4-step4/"
  - "/en/5-workshop/5.7-athena/"
  - "/en/5-workshop/5.7-athena/5.7.1-step1/"
  - "/en/5-workshop/5.7-athena/5.7.2-step2/"
  - "/en/5-workshop/5.7-athena/5.7.3-step3/"
  - "/en/5-workshop/5.7-athena/5.7.4-step4/"
  - "/en/5-workshop/5.7-athena/5.7.5-step5/"
  - "/en/5-workshop/5.7-athena/5.7.6-step6/"
  - "/en/4-workshop/4.5-s3-storage/4.5.1-step1/"
  - "/en/4-workshop/4.5-s3-storage/4.5.2-step2/"
  - "/en/4-workshop/4.5-s3-storage/4.5.3-step3/"
  - "/en/4-workshop/4.5-s3-storage/"
  - "/en/4-workshop/4.6-glue-catalog/4.6.1-step1/"
  - "/en/4-workshop/4.6-glue-catalog/4.6.2-step2/"
  - "/en/4-workshop/4.6-glue-catalog/"
  - "/en/4-workshop/4.7-athena/4.7.1-step1/"
  - "/en/4-workshop/4.7-athena/4.7.2-step2/"
  - "/en/4-workshop/4.7-athena/"
---

### Procedure

Inspect the private project bucket and distinguish canonical Parquet, per-run artifacts, user data, moderation snapshot and Athena results. Publication uses staging/journal/ETag CAS and must be evidenced by SUCCEEDED/published=true plus canonical metadata. False publication mode still writes local data.

In Glue, verify vn_it_job_market.itviec_current_jobs against the exporter schema and analytics/itviec/ location. Moderation metadata follows control/deleted/active/skills v3 then aliases; render bucket/prefix placeholders only in an intentional configuration exercise.

In Athena select AwsDataCatalog/database/workgroup/output, inspect source counts, company/location/level/skills aggregates and active/deleted overlap. The exact verified SQL is in the Vietnamese companion. Record execution IDs/times and scanned data; SELECT creates results and may incur charges.

### Result and images

Trace the same run across S3, Glue and Athena. Capture object metadata, schema/location and query/results. Do not invent current counts or treat ETag as SHA-256.

---

[← 5.3](../5.3-Data-Processing/) · [Contents](../) · [5.5 →](../5.5-Streamlit-Dashboard/)

### Step pages

- [5.4.1. Lưu trữ và công bố Parquet trên S3](5.4.1-step1/)
- [5.4.2. Kiểm tra Glue Data Catalog](5.4.2-step2/)
- [5.4.3. Truy vấn Athena](5.4.3-step3/)
- [5.4.4. Tái lập metadata theo đúng thứ tự](5.4.4-step4/)
- [5.4.5. Đọc kết quả và chẩn đoán sai lệch](5.4.5-step5/)
