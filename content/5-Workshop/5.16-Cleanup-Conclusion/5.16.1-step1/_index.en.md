---
title: "Planning Safe Resource Cleanup"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 4.14.1. </b> "
aliases:
  - "/en/5-workshop/5.10-monitoring-results/5.10.6-step6/"
---

**Where:** AWS Console and the project resource inventory

### Objectives

Identify the cleanup scope and order when the system is no longer needed.

### Prerequisites

The report and backups have been saved; retained data and authorized operators have been identified.

### Procedure

1. List the project's instance, volumes, base/public stacks, roles, S3 resources, Catalog objects, DynamoDB tables, log group, and alarm.
2. Stop schedules and workers before removing infrastructure at the end of use.
3. Check dependencies and CloudFormation ownership. The public stack owns ingress only; the base stack does not own the existing data bucket or tables.
4. Check the additional CloudWatch inline policy added outside the stack by configure_monitoring.py before deleting the role or stack.
5. Before removing EC2, save required data: the template configures EBS DeleteOnTermination.
6. Delete S3 or DynamoDB data only after confirming it is no longer needed and checking actual deletion protection, PITR, and versioning settings. Do not recursively delete a bucket using a guessed prefix.
7. Review Billing and remaining resources after cleanup. Stopping EC2 does not remove EBS, S3, or all charges.

### Check the results

The resource inventory, dependencies, and retained data are identified before cleanup.

---

[← 4.14. Resource Cleanup and Conclusion](../) · [Workshop contents](../../) · [Next step →](../5.16.2-step2/)
