---
title: "Verify the deployed AWS system"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 4.14.2. </b> "
aliases:
  - "/en/5-workshop/5.15-testing-results/"
  - "/en/5-workshop/5.15-testing-results/5.15.3-step3/"
  - "/en/5-workshop/5.10-monitoring-results/"
  - "/en/5-workshop/5.10-monitoring-results/5.10.5-step5/"
  - "/en/5-workshop/5.14-monitoring-operations/"
  - "/en/5-workshop/5.14-monitoring-operations/5.14.1-step1/"
  - "/en/5-workshop/5.14-monitoring-operations/5.14.2-step2/"
  - "/en/5-workshop/5.14-monitoring-operations/5.14.3-step3/"
  - "/en/5-workshop/5.14-monitoring-operations/5.14.4-step4/"
  - "/en/5-workshop/5.14-monitoring-operations/5.14.5-step5/"
  - "/en/5-workshop/5.15-testing-results/5.15.4-step4/"
  - "/en/5-workshop/5.15-testing-results/5.15.5-step5/"
  - "/en/5-workshop/5.15-testing-results/5.15.6-step6/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.4-step4/"
  - "/4-workshop/4.12-testing-results/"
  - "/4-workshop/4.13-cleanup-conclusion/"
---

Deployment results were checked through AWS Console, the SSM terminal, and the website. Corresponding screenshots appear in the preceding sections.

| Item | Recorded result |
| --- | --- |
| Pipeline | The 11 November 2026 run succeeded, completed 25/25 batches, and published data to S3 |
| Data | Clean JSON and Parquet each contain 1,072 records; Parquet has 24 columns |
| S3 and Athena | Parquet exists on S3; the skills query completed and returned data |
| Dashboard | Displays KPIs, charts, search, filters, and job details |
| Accounts | USER and ADMIN interfaces are available; saved jobs, application history, and profile pages were opened and checked |
| Web access | Nginx is running; HTTP redirects to HTTPS, health returns ok, and WebSocket returns 101 |
| Operations | Pipeline timer is enabled; CloudWatch Agent and the log exporter are running, with logs visible in CloudWatch |

Pipeline results belong to run **20261111T081952Z-a435a240**. Moderation interface tests in 4.14.1 were performed in a test environment.


---

[← 4.14. Testing and deployment verification](../) · [Workshop contents](../../) · [Previous step](../5.14.1-step1/) · [Next step →](../5.14.3-step3/)
