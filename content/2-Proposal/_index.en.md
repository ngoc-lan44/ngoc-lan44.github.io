---
title: "Project Proposal"
date: 2026-11-08
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

## VIETNAM IT JOB MARKET

### IT recruitment data collection, processing and analytics on AWS

### 1. Executive summary

Vietnam IT Job Market collects ITviec listings with Python, processes JSON on one EC2 and publishes analytical Parquet to S3. Glue Data Catalog provides metadata for Athena. Streamlit and Plotly deliver analytics through Nginx HTTPS. The deployment region is ap-southeast-1. Personal data is stored in S3; moderation state and audit are stored in DynamoDB.

### 2. Problem statement

Individual listings are difficult to aggregate manually and repeated collection requires deduplication, validation and change tracking. Users need saved jobs and self-managed application tracking; administrators need reversible moderation and traceable operations. The dataset covers accessible ITviec listings, not the entire Vietnamese IT labour market. No measured financial ROI is claimed.

### 3. Solution architecture

![Source-based Vietnam IT Job Market architecture](/images/vietnam-it-job-market-selected-architecture.png)

The recruitment flow is ITviec → EC2 Python → raw/current/history/clean JSON → S3 Parquet → Athena with Glue metadata → Streamlit/Plotly. Run artifacts remain separate from the canonical analytics prefix. Accounts and personal activity use S3 objects. DynamoDB moderation transactions write state and audit; a Projection Worker publishes an S3 snapshot for Athena filtering. The application also checks DynamoDB. These services do not form one atomic transaction.

One EC2 simplifies the project deployment but is a shared failure point. Glue is used as Data Catalog, while Python on EC2 performs ETL.

### 4. Technical implementation

Discovery and batches are validated before ETL; collectors process up to 25 URLs per batch by default. Current records use job_id, retain first_seen and update last_seen. Missing listings alone do not imply expiry. Cleaning and Parquet export are checked for schema and row-count consistency. ETag conditions, staging, journals and backups support controlled publication.

Guest users explore public analytics. USER adds saved jobs, application tracking, profile and password management. ADMIN adds six administration pages, for ten pages overall. The dashboard has four overall and four weekly KPIs plus seven chart groups. Weekly comparisons use retained listings by posting date; application tracking does not submit CVs.

Deployment records describe t3.small Ubuntu 24.04 with encrypted 30 GiB gp3 storage. Streamlit runs as vnjob on 127.0.0.1:8501; Nginx exposes HTTPS and forwards WebSocket traffic. Runtime uses an IAM Role and IMDSv2. Passwords use salted PBKDF2-HMAC-SHA256 with 600,000 iterations. Role, account status and session checks protect actions.

systemd schedules the pipeline daily at 02:00 Vietnam time. Projection runs every two minutes. The Operations Worker validates allowlisted administrator recovery requests. Certbot and an IP-aware helper maintain HTTPS; CloudWatch records logs and pipeline failures. Email notifications are not established by the presence of a Console alarm.

### 5. Implementation roadmap

| Phase | Deliverable |
| --- | --- |
| Design | Source scope, schema, roles and architecture |
| Collection and ETL | Validated artifacts, current/history, cleaned JSON and Parquet |
| Analytics | Canonical S3 data, Glue metadata and Athena views |
| Application | Dashboard, personal features and moderation |
| Deployment | EC2 services, HTTPS, timers, workers and monitoring |
| Acceptance | Dated tests, screenshots, runbook and Workshop |

Phases do not assert dates that are absent from project records. The twelve-week learning log is separate.

### 6. Budget basis

Costs comprise EC2 runtime/credits, EBS, public IPv4, S3 storage/requests, Athena scans, DynamoDB, CloudWatch and applicable transfer. Actual Billing data or a documented estimate is required before publishing a monthly total. Parquet, caching, a single canonical analytics file and log retention provide cost controls; no savings percentage or complete Free Tier coverage is claimed.

### 7. Risk assessment

Source changes and blocking can interrupt collection; validation and bounded retry do not guarantee coverage. Schema or duplicate files can distort analysis. Publication journals and conditional writes support recovery, while moderation projection remains eventually consistent. A single EC2, changing public IPs and certificate dependencies can interrupt access. Runtime roles, private configuration and server-side session checks reduce access risks. Backup verification is separate from production restoration across all data stores.

### 8. Expected outcomes and recorded evidence

Expected deliverables are validated recruitment processing, usable analytics, persistent personal features, auditable moderation and observable operation.

The 02 November deployment report records 140 unit tests, six UI smoke suites, 130 matching file checksums, eight KPIs, one jobs table and ten ADMIN pages. HTTP redirected with 301; HTTPS/health returned 200; TLS and WebSocket checks passed. The 03 November HTTPS report records timer and certificate checks but no completed stop/start drill. These are dated records, not current live AWS verification. No large-scale load capacity or financial ROI is established.

The Vietnamese proposal contains the full submission text, detailed risk/cost tables and exact positions for five real-image groups.

[Read the Workshop →](../5-Workshop/)
