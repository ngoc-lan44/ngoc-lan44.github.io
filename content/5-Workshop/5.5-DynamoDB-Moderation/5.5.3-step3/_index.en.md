---
title: "Connecting the moderation backend and checking displayed data"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 4.5.3. </b> "
aliases:
  - "/en/5-workshop/5.7-athena/5.7.2-step2/"
  - "/en/5-workshop/5.7-athena/5.7.3-step3/"
  - "/en/5-workshop/5.4-s3-glue-athena/5.4.3-step3/"
  - "/en/5-workshop/5.4-s3-glue-athena/5.4.5-step5/"
---

### Connecting the application to moderation data

The application uses DynamoDB for moderation state and administrative audit logging, and an S3 snapshot for Athena to filter soft-deleted jobs.

![EC2 moderation configuration using DynamoDB, both project tables and the S3 path](/images/workshop/setup-5-5-runtime-config.png)

### Checking jobs after moderation

The query compares job IDs between the public and soft-deleted views. A result of 0 means no job appears in both datasets at the time of the check.

~~~sql
SELECT COUNT(*) AS n
FROM vn_it_job_market.itviec_active_jobs j
INNER JOIN vn_it_job_market.itviec_deleted_jobs d
ON j.job_id = d.job_id;
~~~

The query result on **28 October 2026** was **n = 0**: the two views had no overlapping job IDs in this check. This checks displayed data consistency; it does not replace testing soft deletion and restoration.

![Athena consistency query result for public and soft-deleted jobs: n equals 0](/images/workshop/setup-5-5-02.png)


---

[← 4.5. Setting up DynamoDB and moderation data](../) · [Workshop contents](../../) · [Previous step](../5.5.2-step2/)
