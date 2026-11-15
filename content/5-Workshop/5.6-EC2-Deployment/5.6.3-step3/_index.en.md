---
title: "Current data and the dashboard service on EC2"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 4.6.3. </b> "
aliases:
  - "/en/5-workshop/5.11-ec2-deployment/5.11.3-step3/"
  - "/en/5-workshop/5.11-ec2-deployment/5.11.4-step4/"
  - "/en/5-workshop/5.8-ec2-https/5.8.5-step5/"
  - "/en/5-workshop/5.8-ec2-https/5.8.6-step6/"
---

### Current data on EC2

**data/current/itviec/current_jobs.json** stores the current job dataset for subsequent synchronization, tracking timestamps, and analytics generation. The file is owned by **vnjob**, allowing the pipeline to read and update it using the service account.

![Existing current_jobs.json file owned by vnjob on EC2](/images/workshop/setup-5-6-current-file.png)

### Dashboard service

**systemd** manages the dashboard as a service so it continues running after the SSM session closes and starts with the server. Streamlit listens on **127.0.0.1:8501**; Nginx forwards web requests to this internal port.

The **/_stcore/health** check confirms that Streamlit responds on its internal port before requests are routed through Nginx.

![Running vnjob-dashboard service and health endpoint returning ok on EC2](/images/workshop/setup-5-6-dashboard-service.png)





---

[← 4.6. Deploying source code and the runtime on EC2](../) · [Workshop contents](../../) · [Previous step](../5.6.2-step2/)
