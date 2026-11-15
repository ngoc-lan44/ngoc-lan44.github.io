---
title: "Control record and moderation synchronization to S3"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 4.5.2. </b> "
aliases:
  - "/en/5-workshop/5.10-administration/5.10.4-step4/"
  - "/en/5-workshop/5.10-administration/5.10.5-step5/"
  - "/en/5-workshop/5.7-administration/5.7.4-step4/"
  - "/en/5-workshop/5.7-administration/5.7.5-step5/"
---

### Role in the system

The view layer ensures that the dashboard uses only jobs eligible for display. The Projection Worker converts DynamoDB moderation state into an S3 snapshot for Athena filtering; job and skill views apply the same moderation state.

### Configuration used

The application uses DynamoDB as the primary moderation source. META#CONTROL contains state/revision information; the Projection Worker exports an S3 snapshot with schema_version=2 and backend=DYNAMODB for Athena.

### Moderation control record

**META#CONTROL** stores moderation backend control information, including the change revision and S3 snapshot synchronization settings. The application and Projection Worker use it to coordinate moderation updates between DynamoDB and the data read by Athena.

![META#CONTROL record in vn-it-job-market-moderation](/images/workshop/setup-5-5-control-item.png)

**READY** indicates that the moderation backend is ready according to the control record. **revision** tracks changes; **projection_bucket** and **projection_prefix** identify the S3 output location at **control/moderation/**. **audit_table** specifies the audit table.

![META#CONTROL attributes showing READY and S3 moderation synchronization settings](/images/workshop/setup-5-5-control-details.png)

### Moderation snapshot on S3

**control/moderation/** stores the moderation snapshot read by Athena. The Projection Worker reads DynamoDB state and exports it here, allowing analytical queries to apply administrators' moderation decisions.

![The moderation folder within control on S3](/images/workshop/setup-5-5-control-s3.png)

**job_moderation.json** supplies moderation data to Athena tables and views. The views use it to exclude soft-deleted jobs from public results.

![job_moderation.json under control/moderation on S3](/images/workshop/setup-5-5-snapshot-file.png)

The snapshot uses **schema_version: 2** and **backend: DYNAMODB** to identify its structure and moderation source. **revision** allows comparison with DynamoDB; **deleted_jobs** supplies soft-deleted job IDs for Athena filtering. In this snapshot, revision is **0**, and deleted_jobs and audit_log are empty.

![job_moderation.json content with DYNAMODB backend and revision 0](/images/workshop/setup-5-5-snapshot-json.png)

---

[← 4.5. Setting up DynamoDB and moderation data](../) · [Workshop contents](../../) · [Previous step](../5.5.1-step1/) · [Next step →](../5.5.3-step3/)
