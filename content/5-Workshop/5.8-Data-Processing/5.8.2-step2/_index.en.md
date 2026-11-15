---
title: "Clean Data and Export Parquet"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 4.8.2. </b> "
aliases:
  - "/en/5-workshop/5.4-data-processing/5.4.2-step2/"
  - "/en/5-workshop/5.4-data-processing/5.4.3-step3/"
  - "/en/5-workshop/5.4-data-processing/5.4.4-step4/"
  - "/en/5-workshop/5.4-data-processing/5.4.5-step5/"
  - "/en/5-workshop/5.3-data-processing/5.3.2-step2/"
  - "/en/5-workshop/5.3-data-processing/5.3.3-step3/"
  - "/en/5-workshop/5.3-data-processing/5.3.4-step4/"
  - "/en/5-workshop/5.3-data-processing/5.3.5-step5/"
---

**Run in:** SSM on EC2

### Objectives

Normalize recruitment data and export a Parquet file for Athena queries.

### Prerequisites

Current staging data has been synchronized; PyArrow and the required dependencies are installed.

### Procedure

Within the pipeline, the runner points PIPELINE_DATA_ROOT to staged, then runs clean_itviec.py followed by export_itviec_parquet.py. The cleaner normalizes text, location, skills, experience, level and salary; the exporter uses PyArrow with Snappy compression.

The pipeline executes these steps sequentially on the synchronized data. Outputs remain in the run directory until publication to S3.

Skills processing removes empty and duplicate values while preserving order. Unrecognized locations are assigned Khác (Other), and missing experience is assigned Không xác định (Unspecified). Undisclosed salaries are not converted to zero or estimated. Check date/timestamp fields, the skills list and salary double fields against the DDL.

### Check the results

Clean JSON and Parquet have the same row count, and the schema is compatible with the Catalog. Current data may contain more records than the latest collection because it retains existing data.

### Validate the Parquet Export

Comparing clean JSON and Parquet row counts checks that export preserved the number of records. Schema inspection verifies that numeric, date, timestamp and skills-list fields use suitable types for Athena queries.

![Matching clean JSON and Parquet row counts and the pipeline run schema: MATCH True](/images/workshop/setup-5-8-02.png)


---

[← 4.8. Set Up ETL and Publish Parquet](../) · [Workshop Contents](../../) · [Previous Step](../5.8.1-step1/) · [Next Step →](../5.8.3-step3/)
