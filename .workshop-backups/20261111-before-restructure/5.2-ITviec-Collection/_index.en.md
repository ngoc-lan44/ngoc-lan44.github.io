---
title: "ITviec collection"
date: 2026-11-08
weight: 2
chapter: false
pre: " <b> 5.2. </b> "
aliases:
  - "/en/5-workshop/5.3-itviec-collection/"
  - "/en/5-workshop/5.3-itviec-collection/5.3.1-step1/"
  - "/en/5-workshop/5.3-itviec-collection/5.3.2-step2/"
  - "/en/5-workshop/5.3-itviec-collection/5.3.3-step3/"
  - "/en/5-workshop/5.3-itviec-collection/5.3.4-step4/"
  - "/en/5-workshop/5.3-itviec-collection/5.3.5-step5/"
  - "/en/4-workshop/4.3-itviec-collection/4.3.1-step1/"
  - "/en/4-workshop/4.3-itviec-collection/4.3.2-step2/"
  - "/en/4-workshop/4.3-itviec-collection/4.3.3-step3/"
  - "/en/4-workshop/4.3-itviec-collection/"
---

### Objective and procedure

Inspect discovery JSON, canonical HTTPS ITviec URLs and batches of up to 25 jobs. Compare coverage_checked/failed_pages, unique URLs, discovery_file, expected/success/failed counts and completion flags. The runner validates all batches before producing the aggregate/staging; a standalone batch does not update the full current dataset.

### Checkpoints and limits

Per-discovery checkpoints retain URL results up to six hours. Discovery reuse requires the same Vietnam day. Request retries are bounded for network/5xx errors; 403/429 are not bypassed. Coverage below 60% of the recent successful baseline is rejected. Do not run standalone collectors concurrently with the timer/worker.

### Result and images

Use a completed run to connect raw artifacts to ETL. Capture discovery metadata and matching batch/run evidence, with unique image codes on the Vietnamese page. Real collection commands there are optional writes, not report-preparation steps.

---

[← 5.1](../5.1-Overview/) · [Contents](../) · [5.3 →](../5.3-Data-Processing/)

### Step pages

- [5.2.1. Khám phá và chuẩn hóa URL](5.2.1-step1/)
- [5.2.2. Thu thập chi tiết theo batch](5.2.2-step2/)
- [5.2.3. Kiểm tra toàn lượt thu thập](5.2.3-step3/)
- [5.2.4. Đọc dữ liệu một tin trước khi chuyển ETL](5.2.4-step4/)
- [5.2.5. Xử lý thu thập gián đoạn](5.2.5-step5/)
