---
title: "Implementation results"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 4.14.3. </b> "
aliases:
  - "/en/5-workshop/5.15-testing-results/5.15.2-step2/"
  - "/en/5-workshop/5.10-monitoring-results/5.10.4-step4/"
---

The deployed system collects ITviec data, processes it with Python on EC2, and exports Parquet to S3. Athena queries S3 Parquet using metadata from AWS Glue Data Catalog. Streamlit provides the dashboard, user features, and administration; Nginx and HTTPS provide web access.

On **11 November 2026**, the pipeline collected **624 jobs**, synchronized a current dataset of **1,072 jobs**, and successfully published Parquet. The dashboard displayed **654 active jobs**, **321 companies**, and **131 jobs disclosing salaries**. The current dataset includes multiple job statuses, so its total differs from the active-job count on the dashboard.

Test results and operational screenshots show that the checked functions operate as designed. Analytical data is limited to ITviec.


---

[← 4.14. Testing and deployment verification](../) · [Workshop contents](../../) · [Previous step](../5.14.2-step2/)
