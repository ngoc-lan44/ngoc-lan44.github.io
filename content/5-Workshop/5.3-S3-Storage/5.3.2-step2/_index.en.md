---
title: "Parquet Data and EC2 Deployment Seed Data"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 4.3.2. </b> "
---

### Analytical data on S3

**analytics/itviec/current_jobs.parquet** supplies data to Athena and the dashboard. The pipeline updates this object after processing and validation. Keeping one Parquet file at the analytical location prevents Athena from reading multiple copies of the same dataset.

### Seed data for EC2 deployment

**current_jobs.json** under **deploy/ec2/seed/** initializes current job data on the server during deployment and preserves existing **first_seen** and **last_seen** values. This allows tracking to continue from previous data rather than restarting its entire history.

The seed is stored in a directory named after its content's SHA-256 digest. The digest verifies integrity after downloading to EC2, helping detect changes or an incorrect version. The seed initializes data; the pipeline continues updating current data on EC2 during operation.

### Seed data location

**1. deploy/ec2/** contains deployment packages and data, including **seed/**.

![EC2 deployment directory containing seed on S3](/images/workshop/setup-5-3-ec2-folders.png)

**2. seed/** contains a subdirectory named after the SHA-256 digest to identify the seed version.

![Seed version directory](/images/workshop/setup-5-3-seed-folder.png)

**3. The SHA-256 directory** contains **current_jobs.json** for initializing EC2 data.

![Current JSON seed for EC2 deployment](/images/workshop/setup-5-3-02.png)


---

[← 4.3. Amazon S3 Storage Setup](../) · [Workshop contents](../../) · [Previous step](../5.3.1-step1/)
