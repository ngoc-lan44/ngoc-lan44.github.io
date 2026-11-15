---
title: "Installing the runtime and configuring the application on EC2"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 4.6.2. </b> "
aliases:
  - "/en/5-workshop/5.11-ec2-deployment/5.11.2-step2/"
  - "/en/5-workshop/5.8-ec2-https/5.8.2-step2/"
---

### Installing the EC2 environment

User Data downloads the source from S3 and runs the installation script to prepare the service account, Python environment, systemd units, and Nginx. The following screenshots show installation and configuration on the deployed server.

### Server initialization

**cloud-init** applies the EC2 initialization configuration from User Data, including application preparation and installation. Its status indicates whether initialization has finished and lists any recorded errors.

![cloud-init status done with empty errors and recoverable_errors on EC2](/images/workshop/setup-5-6-cloud-init.png)

### Service environment installation

Bootstrap installs Python libraries, checks the Nginx configuration, and sets up the dashboard service. During initial installation, the pipeline timer and data publication remain disabled until data preparation and configuration are complete.

![Bootstrap log showing library installation, Nginx validation, and dashboard service setup on EC2](/images/workshop/setup-5-6-05.png)

### Python environment validation

**.venv** supplies Python and shared dependencies for the dashboard, pipeline, and workers. **pip check** validates dependencies between installed packages to detect missing libraries or incompatible versions.

![Python version and pip check results in the EC2 Python environment](/images/workshop/setup-5-6-python-dependencies.png)

### Protecting configuration files

Both configuration files are owned by **root:vnjob** with permissions **640**: root can read and write, the vnjob group can read, and other accounts have no access. Services can therefore use the configuration without modifying it.

![Permissions on the two application configuration files on EC2](/images/workshop/setup-5-6-config-permissions.png)


---

[← 4.6. Deploying source code and the runtime on EC2](../) · [Workshop contents](../../) · [Previous step](../5.6.1-step1/) · [Next step →](../5.6.3-step3/)
