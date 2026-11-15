---
title: "The project's two DynamoDB tables"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 4.5.1. </b> "
aliases:
  - "/en/5-workshop/5.10-administration/5.10.2-step2/"
  - "/en/5-workshop/5.7-administration/5.7.2-step2/"
---

### Role in the system

DynamoDB stores job moderation state and administrative audit events. The moderation table manages current state; the audit table stores change events for tracking actions. Separate tables support state lookups and history queries for their respective purposes.

### Configuration used

| Table | Key | Role |
| --- | --- | --- |
| vn-it-job-market-moderation | record_id String | Moderation state and control metadata |
| vn-it-job-market-moderation-audit | event_group String + event_key String | Audit theo revision |


Moderation actions and audit logging use these two tables. Accounts and personal activity are stored separately in S3.



**Deletion protection** protects both tables from accidental deletion.

![Both project DynamoDB tables are Active with Deletion protection enabled](/images/workshop/setup-5-5-tables.png)

### Moderation table configuration

**vn-it-job-market-moderation** uses **record_id (String)** to identify moderation state and control records. **On-demand** capacity handles reads and writes without preallocating capacity units, suiting irregular administrative activity.

**Point-in-time recovery (PITR)** is enabled to restore data to a point within the retained recovery period following unwanted changes. It provides protection in addition to Deletion protection.

![Moderation table with record_id key, On-demand capacity and PITR On](/images/workshop/setup-5-5-moderation-details.png)

### Audit table configuration

**vn-it-job-market-moderation-audit** stores moderation change events for reviewing administrative actions. **event_group** groups events; **event_key** distinguishes events within a group. The table uses **On-demand** capacity and has **PITR** enabled for recovery.

![The moderation-audit table with event_group and event_key, On-demand capacity and PITR On](/images/workshop/setup-5-5-audit-details.png)

---

[← 4.5. Setting up DynamoDB and moderation data](../) · [Workshop contents](../../) · [Next step →](../5.5.2-step2/)
