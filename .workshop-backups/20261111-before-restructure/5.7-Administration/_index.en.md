---
title: "Administration and moderation"
date: 2026-11-08
weight: 7
chapter: false
pre: " <b> 5.7. </b> "
aliases:
  - "/en/5-workshop/5.10-administration/"
  - "/en/5-workshop/5.10-administration/5.10.1-step1/"
  - "/en/5-workshop/5.10-administration/5.10.2-step2/"
  - "/en/5-workshop/5.10-administration/5.10.3-step3/"
  - "/en/5-workshop/5.10-administration/5.10.4-step4/"
  - "/en/5-workshop/5.10-administration/5.10.5-step5/"
  - "/en/5-workshop/5.10-administration/5.10.6-step6/"
  - "/en/5-workshop/5.10-administration/5.10.7-step7/"
  - "/en/5-workshop/5.10-administration/5.10.8-step8/"
  - "/en/4-workshop/4.9-user-administration/4.9.3-step3/"
  - "/en/4-workshop/4.9-user-administration/4.9.4-step4/"
  - "/en/4-workshop/4.9-user-administration/4.9.5-step5/"
---

### Procedure

ADMIN accesses ten pages in total, of which six are administration-only. Inspect user management, test account lock/unlock/revoke, job management, deleted jobs, quality/crawl/system status. Never test on the only administrator.

DynamoDB state and audit tables are the moderation source of truth. Soft-delete/restore does not rewrite raw data or Parquet. Compare one test job's action/reason/revision and audit. Projection Worker publishes schema-2 DYNAMODB snapshots to S3 every two minutes with revision/ETag protection. Athena filters through active views; application-side DynamoDB checks provide immediate hiding while projection can lag.

### Result and images

Capture administrator navigation, redacted test user management, both table configurations, matching audit and delete/restore/projection evidence. No atomic transaction spans DynamoDB/S3/Athena, and restore does not make an expired source job active.

---

[← 5.6](../5.6-User-Features/) · [Contents](../) · [5.8 →](../5.8-EC2-HTTPS/)

### Step pages

- [5.7.1. Quản lý người dùng](5.7.1-step1/)
- [5.7.2. DynamoDB moderation và audit](5.7.2-step2/)
- [5.7.3. Xóa mềm, khôi phục và đồng bộ snapshot](5.7.3-step3/)
- [5.7.4. Theo dấu một thao tác kiểm duyệt](5.7.4-step4/)
- [5.7.5. Phân biệt lỗi state và lỗi projection](5.7.5-step5/)
