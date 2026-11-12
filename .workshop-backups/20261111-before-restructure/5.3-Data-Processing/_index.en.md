---
title: "Synchronisation and Parquet"
date: 2026-11-08
weight: 3
chapter: false
pre: " <b> 5.3. </b> "
aliases:
  - "/en/5-workshop/5.4-data-processing/"
  - "/en/5-workshop/5.4-data-processing/5.4.1-step1/"
  - "/en/5-workshop/5.4-data-processing/5.4.2-step2/"
  - "/en/5-workshop/5.4-data-processing/5.4.3-step3/"
  - "/en/5-workshop/5.4-data-processing/5.4.4-step4/"
  - "/en/5-workshop/5.4-data-processing/5.4.5-step5/"
  - "/en/5-workshop/5.4-data-processing/5.4.6-step6/"
  - "/en/4-workshop/4.4-data-processing/4.4.1-step1/"
  - "/en/4-workshop/4.4-data-processing/4.4.2-step2/"
  - "/en/4-workshop/4.4-data-processing/4.4.3-step3/"
  - "/en/4-workshop/4.4-data-processing/"
---

### Procedure

Compare staged current/history for the same completed run. NEW/UPDATED are events; UNCHANGED is a summary counter. ACTIVE/EXPIRED are record states, with valid elapsed source deadlines driving expiry; absence from discovery does not expire jobs.

Inspect normalisation of whitespace, location, experience, level, skills and salary disclosure. Use PIPELINE_DATA_ROOT on a temporary copy, run cleaner/exporter, and compare PyArrow metadata rows with clean JSON. The Vietnamese guide includes the exact shell sequence. Do not publish that practice copy.

### Result and images

Current/clean/Parquet counts agree; crawled can be smaller than retained current. JSON processing remains on EC2, analytical Parquet is published separately. Capture matching history/clean records and real schema/row-count output.

---

[← 5.2](../5.2-ITviec-Collection/) · [Contents](../) · [5.4 →](../5.4-S3-Glue-Athena/)

### Step pages

- [5.3.1. Đồng bộ Current và History](5.3.1-step1/)
- [5.3.2. Làm sạch và chuẩn hóa](5.3.2-step2/)
- [5.3.3. Xuất và kiểm tra Parquet](5.3.3-step3/)
- [5.3.4. Đối chiếu quy tắc chuẩn hóa](5.3.4-step4/)
- [5.3.5. Đọc schema và kiểm tính nhất quán](5.3.5-step5/)
