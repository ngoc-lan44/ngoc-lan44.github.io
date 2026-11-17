---
title: "Connect data sources and start the application"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 4.9.1. </b> "
aliases:
  - "/en/5-workshop/5.8-streamlit-dashboard/"
  - "/en/5-workshop/5.8-streamlit-dashboard/5.8.1-step1/"
  - "/en/5-workshop/5.5-streamlit-dashboard/"
  - "/en/5-workshop/5.5-streamlit-dashboard/5.5.1-step1/"
  - "/en/5-workshop/5.8-streamlit-dashboard/5.8.6-step6/"
  - "/en/5-workshop/5.8-streamlit-dashboard/5.8.7-step7/"
  - "/4-workshop/4.8-streamlit-dashboard/4.8.1-step1/"
  - "/4-workshop/4.8-streamlit-dashboard/4.8.2-step2/"
  - "/4-workshop/4.8-streamlit-dashboard/4.8.3-step3/"
  - "/4-workshop/4.8-streamlit-dashboard/"
---

**Run in:** SSM on EC2

### Objectives

Run app.py as a service with permission to read Athena, S3 and DynamoDB.

### Prerequisites

Parquet, public views, secrets and IAM permissions are ready.

### Procedure

dashboard/job_data.py configures Region ap-southeast-1, database vn_it_job_market and query result location control/athena-results/. With the DynamoDB backend, the application reads the itviec_active_jobs and itviec_active_job_skills aliases and checks moderation state directly.

1. Check the [auth]/[moderation] sections in secrets against 4.5.
2. Check that the dashboard unit uses the Linux .venv and dashboard/app.py entry point.
3. After saving the configuration, restart the application:

~~~bash
sudo systemctl restart vnjob-dashboard.service
sudo systemctl status vnjob-dashboard.service --no-pager
curl --fail http://127.0.0.1:8501/_stcore/health
sudo journalctl -u vnjob-dashboard.service -n 80 --no-pager
~~~

Before HTTPS is configured, use an SSM tunnel through deploy/ec2/open_private.ps1 with the Session Manager plugin installed; after 4.11, use the current HTTPS URL. Keep port 8501 private behind the reverse proxy. The reader uses a 90-second timeout, pagination and type conversion; jobs and skills are cached for 300 seconds.

### Check the results

The application can read data using the EC2 role; the health check and UI respond. Resolve access errors through IAM permissions and configuration.

---

[← 4.9. Configure and deploy the Streamlit Dashboard](../) · [Workshop contents](../../) · [Next step →](../5.9.2-step2/)
