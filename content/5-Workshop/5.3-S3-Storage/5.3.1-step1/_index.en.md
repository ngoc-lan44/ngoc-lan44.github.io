---
title: "S3 Bucket and Storage Structure"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 4.3.1. </b> "
aliases:
  - "/en/5-workshop/5.5-s3-storage/5.5.1-step1/"
---

### Configuration used

Project bucket: **vn-it-job-market-data-381924757765-ap-southeast-1-an**, Region **ap-southeast-1**.

![Project S3 bucket in Singapore](/images/workshop/setup-5-3-bucket-region.png)

| Bucket path | Stored data |
| --- | --- |
| analytics/itviec/current_jobs.parquet | Job data in Parquet for Athena |
| pipeline-runs/&#60;run_id&#62;/ | Output files for each pipeline run |
| users/ | Accounts and personal activity |
| control/moderation/job_moderation.json | Job moderation snapshot |
| control/athena-results/ | Athena query results |
| deploy/ec2/ | EC2 deployment files |

The **Objects** tab lists `analytics/`, `clean/`, `control/`, `current/`, `deploy/`, `history/`, `pipeline-runs/`, `raw/`, and `users/`.

![Existing project bucket folders](/images/workshop/setup-5-3-bucket-objects.png)

**analytics/itviec/** holds processed job data for analysis, separate from accounts, pipeline logs, and operational configuration. Glue Data Catalog references this directory so Athena can locate its data.

![ITviec directory inside analytics on S3](/images/workshop/setup-5-3-analytics-folder.png)

**current_jobs.parquet** stores current job data after cleaning and normalization. Parquet uses compressed columnar storage, allowing Athena to read the columns needed by a query. The dashboard uses query results for KPIs, charts, and job listings.

![Current Parquet file on S3](/images/workshop/setup-5-3-current-parquet.png)

### Bucket access

**Block Public Access** prevents public exposure of bucket data, protecting job files, accounts, and personal activity. EC2 reads and writes using its authorized IAM role. Users access data through the dashboard instead of directly accessing the bucket. The project enables **Block all public access (On)**.

![Block all public access enabled](/images/workshop/setup-5-3-public-access.png)

### Encryption at rest

The bucket's default encryption uses **SSE-S3** for newly written objects to protect stored data. Amazon S3 manages keys, encrypts writes, and decrypts authorized reads; the application does not manage encryption keys itself. This protects data at rest, while IAM and Block Public Access control access.

![Default SSE-S3 encryption](/images/workshop/setup-5-3-encryption.png)


---

[← 4.3. Amazon S3 Storage Setup](../) · [Workshop contents](../../) · [Next step →](../5.3.2-step2/)
