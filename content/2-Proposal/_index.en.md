---
title: "Project Proposal"
date: 2026-11-11
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

## VIETNAM IT JOB MARKET

### Building an AWS platform for collecting, processing and analyzing IT recruitment data

### 1. Project summary

This proposal presents the Vietnam IT Job Market solution and summarizes its actual implementation results.

**Vietnam IT Job Market** collects and analyzes IT recruitment listings from **ITviec**. The project covers collection, cleaning, storage, querying and presentation on a website. Users can explore recruitment demand within the dataset, find suitable jobs, save listings and track their applications.

Python runs on a single Amazon EC2 instance to collect and process data. Analytical Parquet files are published to Amazon S3; AWS Glue Data Catalog defines their metadata, and Amazon Athena queries them. Streamlit and Plotly provide the website through Nginx and HTTPS. DynamoDB stores moderation state and administrative audit records; S3 stores accounts and personal activity.

The goal is an AWS data processing and web application system with scheduled updates and operational monitoring. Its data covers ITviec listings only and does not represent the entire Vietnamese IT job market.

### 2. Problem and practical needs

Recruitment listings span multiple detail pages, vary in presentation and change over time. Reading each listing is inefficient when comparing skills, employers, locations or experience requirements. Repeated collection also introduces duplicate URLs, changed content and expired listings, affecting statistics unless handled consistently.

Job seekers need a place to save opportunities and record application progress. Administrators need to moderate displayed listings, monitor data and identify operational issues.

The project addresses these needs through a consistent data pipeline, analytical dashboard, personal features and administrative tools on one website.

### 3. Objectives and scope

#### Implementation objectives

- Collect ITviec URLs and job details, check duplicates and store JSON data.
- Synchronize current data and change history, normalize fields and export analytical Parquet.
- Connect S3, Glue Data Catalog and Athena to the dashboard.
- Display KPIs, charts, search, filters and job details.
- Provide registration, login, personal features and USER/ADMIN authorization.
- Support soft deletion, restoration and moderation auditing.
- Deploy on EC2 with HTTPS, automate the pipeline and centralize logs in CloudWatch.

#### Users

| User group | Supported needs |
| --- | --- |
| Visitors | View market summaries, filter and search listings |
| USER | Save jobs, track applications and manage a personal profile |
| ADMIN | Manage users, moderate listings and monitor system health |

Application tracking records progress entered by the user. Applications are submitted through the original ITviec link; the system neither sends CVs automatically nor synchronizes recruitment outcomes from ITviec.

### 4. Solution architecture

![Vietnam IT Job Market architecture](/images/vietnam-it-job-market-selected-architecture.png)

The main resources are deployed in **Asia Pacific (Singapore), ap-southeast-1**. One EC2 instance runs the pipeline, dashboard and workers. Storage, query and monitoring services work together as follows:

| Component | Purpose |
| --- | --- |
| Amazon EC2 | Runs Python Collector/ETL, Streamlit, Nginx and workers |
| Amazon S3 | Stores analytical Parquet, Athena results, user data, moderation snapshots and deployment packages |
| AWS Glue Data Catalog | Stores table names, column schemas and data locations for Athena |
| Amazon Athena | Queries S3 recruitment data for the website |
| Amazon DynamoDB | Stores soft deletion, restoration and moderation audit records |
| AWS IAM | Grants EC2 resource access through its Instance Role |
| AWS Systems Manager | Provides server administration and inspection through Session Manager |
| Amazon CloudWatch | Centralizes logs and monitors pipeline failure alarms |
| Streamlit and Plotly | Provide the interface and interactive charts |
| Nginx and Certbot | Provide reverse proxy, HTTPS and certificate maintenance |

**Data flow:** ITviec → Python collection and processing on EC2 → Parquet on Amazon S3 → Amazon Athena → Streamlit Dashboard. AWS Glue Data Catalog supplies table schemas and data locations to Athena.

**Moderation flow:** ADMIN action on the website → state and audit stored in DynamoDB → Projection Worker exports a snapshot to S3 → Athena filters soft-deleted jobs.


### 5. Implementation

#### 5.1. Collection and processing

The collector discovers URLs from ITviec listing pages, normalizes links and removes duplicates before collecting details in batches. JSON output includes information for tracking each run.

Synchronization uses job identifiers to update current data and record changes. Observation timestamps track listings across updates. Collection completeness is checked before handling missing listings, so collection gaps are not mistaken for expired jobs.

ETL cleans and normalizes titles, companies, locations, skills, experience, levels and salaries. Undisclosed salary information remains missing rather than being estimated. Output is exported to Parquet with a consistent schema.

#### 5.2. Analytical storage and queries

Raw, current, history and clean JSON are processed on EC2. Analytical Parquet is published to `analytics/itviec/current_jobs.parquet` on S3. Run artifacts are stored separately for inspection and traceability.

Glue Data Catalog provides metadata for database `vn_it_job_market` and source table `itviec_current_jobs`. Athena queries this data and application views. Separating analytical data from artifacts prevents reading multiple versions of the same dataset.

#### 5.3. Dashboard and job search

The dashboard shows active jobs, employers, salary disclosure and skills. Charts cover posting trends, requested skills, locations, employers, experience, levels and salary disclosure. Weekly comparisons show changes between two periods.

Users can combine keywords with location, level, experience, company and salary filters. KPIs, charts and listings update with the selected filters. Job details include recruitment information and the original ITviec link.

#### 5.4. Accounts and administration

The website supports email registration and login with USER/ADMIN authorization. Accounts and personal activity are stored on S3. Users can save or unsave jobs, update application status, edit their display name and introduction, and change their password.

ADMIN pages cover System status, User management, Job management and Data quality. Soft deletion changes visibility while retaining source data for restoration. DynamoDB stores moderation state and audit records; the Projection Worker synchronizes a snapshot to S3 for Athena filtering.

#### 5.5. Deployment and operations

CloudFormation manages EC2 infrastructure. The recorded configuration uses a **t3.small** instance, **30 GiB gp3 EBS** and an IAM Role for application AWS access. Streamlit runs in a Linux Python environment managed by systemd.

Nginx accepts web traffic, terminates HTTPS and proxies HTTP/WebSocket to Streamlit at `127.0.0.1:8501`. The Security Group opens ports 80 and 443 for web access. Certbot and a timer maintain HTTPS for the server's public IP address.

A systemd timer schedules the pipeline at **02:00 Vietnam time daily**. Catch-up handling covers missed schedules; the Operations Worker handles permitted recovery requests. CloudWatch Agent and a journal exporter send service logs to CloudWatch.

### 6. Data protection and reliability

S3 Block Public Access limits unintended public exposure; SSE-S3 encrypts stored data. The application uses IAM permissions granted to its runtime. HTTPS protects traffic between the browser and website.

Authorization is checked in administrative operations. DynamoDB stores moderation state and audit records in the same transaction to keep deletion and restoration consistent with the audit trail. Both tables have deletion protection and point-in-time recovery enabled.

CloudWatch retains logs in `/vn-it-job-market/ec2` for **two weeks**. The `PipelineFailure` metric filter detects `FAILED` in logs; its alarm uses a threshold of at least one occurrence within five minutes. Alarms are monitored in the Console; no email or other notification destination is configured.

### 7. Implementation plan and deliverables

| Phase | Work | Deliverable |
| --- | --- | --- |
| Analysis and design | Define ITviec data, functions and architecture | Scope, data model and architecture diagram |
| Pipeline | Collection, validation, synchronization, cleaning and Parquet export | Collector/ETL and output data |
| Analytics | S3 storage, Catalog definitions and queries | Tables, views and Athena connection |
| Application | Dashboard, search, accounts and moderation | Streamlit website for visitors, USER and ADMIN |
| AWS deployment | EC2, permissions, Nginx and HTTPS | Web-accessible system |
| Automation and testing | Schedules, workers, logs, tests and results | Operational system, Workshop documentation and report |

Deliverables include source code, deployment configuration, tests, setup and operation instructions, architecture diagrams and implementation screenshots.

### 8. Costs and deployment limitations

Estimated monthly costs in Singapore (ap-southeast-1), with the server running continuously:

| Component | Estimated monthly cost (USD) |
| --- | ---: |
| EC2 t3.small Linux | 19,27 |
| EBS gp3 30 GiB | 2,88 |
| One public IPv4 address | 3.65 |
| **Base total** | **25.80** |

**Planned budget: USD 35/month**, comprising USD 25.80 in base costs and USD 9.20 reserved for S3, Glue Data Catalog, Athena, DynamoDB (including point-in-time recovery), CloudWatch and data transfer. These vary with storage, requests, scanned data and logs; USD 9.20 is a reserve, not measured expenditure.

This estimate is before tax and credits or discounts, not an actual bill. Additional T3 CPU credit charges are excluded. EC2 and EBS rates come from project deployment documentation; IPv4 pricing follows [Amazon VPC pricing](https://aws.amazon.com/vpc/pricing/).

A single EC2 instance suits the workshop scope and centralizes operations. If it stops, the website and its processes are interrupted. The automatically assigned IPv4 address may change after stop/start. Periodic moderation snapshots introduce delay between DynamoDB and Athena.

Source data may omit salaries or levels, and page structures may change. Data quality checks and collector maintenance remain necessary. No load-test results establish large-scale capacity.

### 9. Results

#### 9.1. Source code tests

On **16 November 2026**, **144 unit tests**, **six offline UI test suites** and the Vietnam-time clock test passed on the development machine.

#### 9.2. Deployed AWS system checks

Screenshots and logs from **11 November 2026** record:

| Area | Result |
| --- | --- |
| Pipeline | Completed 25/25 batches, collected 624 listings and finished with `SUCCEEDED` |
| Processed data | Current and clean contain 1,072 records; Parquet has 1,072 rows and 24 columns |
| Publication | S3 Parquet metadata contains the corresponding processing run ID |
| Dashboard | With no filters: 654 active jobs, 321 employers, 131 salary-disclosing listings and 328 skills |
| Web access | HTTP redirects to HTTPS; health returns `ok`; WebSocket returns status 101 |
| Automation | Pipeline timer is enabled for 02:00 Vietnam time; supporting services have status and log evidence |

The collection run retrieved **624 listings**; synchronized current data contains **1,072 records**; the dashboard showed **654 active jobs** when checked. The run has `snapshot_complete: false` and is therefore not a complete snapshot.

### 10. Conclusion and future work

Vietnam IT Job Market connects ITviec collection, Python ETL, AWS storage and queries with an analytical website offering personal and administrative features. Scheduled processing, moderation and centralized logs support operations after deployment.

Future work includes load testing, better normalization of missing fields, session and account recovery improvements, alarm notifications, a stable access address and higher availability. These are proposed extensions, not implemented project results.
