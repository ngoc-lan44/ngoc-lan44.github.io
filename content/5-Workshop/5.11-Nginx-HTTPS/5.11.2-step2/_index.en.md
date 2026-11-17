---
title: "Install Certbot and configure automatic HTTPS"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 4.10.2. </b> "
aliases:
  - "/en/5-workshop/5.12-nginx-https/5.12.1-step1/"
  - "/en/5-workshop/5.12-nginx-https/5.12.3-step3/"
  - "/en/5-workshop/5.8-ec2-https/5.8.3-step3/"
---

**Run in:** SSM on EC2

### Objectives

Issue an IP certificate and install a timer that handles IP changes.

### Prerequisites

Ingress on ports 80/443 works, Nginx is installed, and the configuration include exists.

### Procedure

Prepare the Certbot runtime using the project's procedure:

~~~bash
sudo python3 -m venv /opt/vnjob-certbot
sudo /opt/vnjob-certbot/bin/pip install "certbot>=5.4,<7"
sudo /opt/vnjob-certbot/bin/certbot --version
sudo install -d -m 0755 /var/www/letsencrypt/.well-known/acme-challenge
~~~

Install the HTTPS configuration tool that detects the EC2 public IP address:

~~~bash
cd /opt/vn-it-job-market
sudo bash deploy/ec2/configure_public_https.sh
sudo nginx -t
sudo /opt/vnjob-certbot/bin/certbot certificates
sudo systemctl status vnjob-certbot.timer --no-pager -n 0
~~~

The script requires the Certbot executable, the vnjob site and the existing proxy include. It backs up the configuration, installs /usr/local/sbin/vnjob-auto-https.py and the units, runs reconciliation, then enables the timer. The helper reads IMDSv2, configures ACME HTTP, issues a certificate when the IP changes or fewer than two days remain, validates Nginx, and reloads or rolls back on failure. The timer starts 30 seconds after boot and 30 minutes after each completed execution.

When the public IP changes, the service checks the new address and updates the certificate and Nginx configuration.

### Check the results

The **vnjob-ip** certificate was issued for **47.128.13.35** and was valid when checked on **16 November 2026**. The **vnjob-certbot** timer is enabled and waiting for its next scheduled execution to manage the HTTPS certificate automatically.

![HTTPS certificate for 47.128.13.35 and vnjob-certbot timer status on 16 November 2026](/images/workshop/setup-https-certificate-timer-2026-11-16.png)

### Access the website over HTTPS

HTTPS encrypts login information and user activity in transit. The address verified on **16 November 2026** was **https://47.128.13.35**. The **vnjob-certbot** timer maintains the IP certificate and updates the configuration when the address changes.

![Dashboard accessed over HTTPS at 47.128.13.35 on 16 November 2026](/images/workshop/setup-https-dashboard-2026-11-16.png)



---

[← 4.10. Configure Nginx and IP-based HTTPS](../) · [Workshop contents](../../) · [Previous step](../5.11.1-step1/) · [Next step →](../5.11.3-step3/)
