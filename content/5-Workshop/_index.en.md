---
title: "Workshop"
date: 2026-11-11T00:00:00+07:00
weight: 4
chapter: false
pre: " <b> 4. </b> "
aliases:
  - "/4-workshop/"
---

## SET UP AND DEPLOY VIETNAM IT JOB MARKET ON AWS

This workshop describes the setup of Vietnam IT Job Market on AWS, from resource preparation and ITviec data collection and processing to dashboard deployment, administration and operational monitoring.

**Region:** ap-southeast-1 — Singapore. **Source:** E:\vn-it-job-market. **Runtime:** /opt/vn-it-job-market on a single EC2 instance.

### Contents

| Section | Setup topic |
| --- | --- |
| 4.1 | [Introduction](5.1-Introduction/) |
| 4.2 | [Preparation](5.2-Prerequisites/) |
| 4.3 | [Set up Amazon S3 storage](5.3-S3-Storage/) |
| 4.4 | [Set up Glue Data Catalog and Athena](5.4-Catalog-Athena/) |
| 4.5 | [Set up DynamoDB and moderation data](5.5-DynamoDB-Moderation/) |
| 4.6 | [Deploy source code and runtime on EC2](5.6-EC2-Deployment/) |
| 4.7 | [Set up and run ITviec collection](5.7-ITviec-Collection/) |
| 4.8 | [Set up ETL and publish Parquet](5.8-Data-Processing/) |
| 4.9 | [Configure and deploy the Streamlit Dashboard](5.9-Streamlit-Dashboard/) |
| 4.10 | [Set up accounts and administration features](5.10-Users-Administration/) |
| 4.11 | [Set up Nginx and IP-based HTTPS](5.11-Nginx-HTTPS/) |
| 4.12 | [Schedule the pipeline and set up the Operations Worker](5.12-Pipeline-Automation/) |
| 4.13 | [Set up CloudWatch and monitoring](5.13-Monitoring/) |
| 4.14 | [Test and verify the deployment](5.14-Testing-Results/) |
| 4.15 | [Back up data and verify recovery](5.15-Backup-Recovery/) |
| 4.16 | [Clean up resources and conclude](5.16-Cleanup-Conclusion/) |

### Procedure

Follow the sections in order. The pipeline coordinates collection, synchronization, cleaning and data publication. Use the same run ID to connect the EC2 results with the Parquet file on S3.

For existing AWS resources, the workshop documents the configuration and screenshots of the completed setup. These resources do not need to be recreated. The source code, runtime, pipeline and ETL sections explain the deployment sequence and result checks.

---

[Start: 4.1. Introduction →](5.1-Introduction/)
