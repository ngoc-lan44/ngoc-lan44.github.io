---
title: "EC2 Nginx and HTTPS"
date: 2026-11-08
weight: 8
chapter: false
pre: " <b> 5.8. </b> "
aliases:
  - "/en/5-workshop/5.11-ec2-deployment/"
  - "/en/5-workshop/5.11-ec2-deployment/5.11.1-step1/"
  - "/en/5-workshop/5.11-ec2-deployment/5.11.2-step2/"
  - "/en/5-workshop/5.11-ec2-deployment/5.11.3-step3/"
  - "/en/5-workshop/5.11-ec2-deployment/5.11.4-step4/"
  - "/en/5-workshop/5.11-ec2-deployment/5.11.5-step5/"
  - "/en/5-workshop/5.12-nginx-https/"
  - "/en/5-workshop/5.12-nginx-https/5.12.1-step1/"
  - "/en/5-workshop/5.12-nginx-https/5.12.2-step2/"
  - "/en/5-workshop/5.12-nginx-https/5.12.3-step3/"
  - "/en/5-workshop/5.12-nginx-https/5.12.4-step4/"
  - "/en/4-workshop/4.10-ec2-deployment/4.10.1-step1/"
  - "/en/4-workshop/4.10-ec2-deployment/4.10.2-step2/"
  - "/en/4-workshop/4.10-ec2-deployment/4.10.3-step3/"
  - "/en/4-workshop/4.10-ec2-deployment/4.10.4-step4/"
  - "/en/4-workshop/4.10-ec2-deployment/"
---

### Procedure

Inspect the one EC2 instance, encrypted storage, IMDSv2, Standard CPU credits, instance role and SSM. Public 80/443 ingress belongs to the separate public stack; 22/8501 stay private. Verify the SDK identity as vnjob.

Build a source-only archive with build_release.py and inspect SHA-256. Initial provisioning/bootstrap differs from updating an existing instance: preserve data/config, use verified staging/backups and do not rerun historical hardcoded release scripts blindly. Streamlit runs under vnjob on loopback 8501.

Nginx proxies HTTP/WebSocket and serves trusted IP HTTPS. Existing Certbot/proxy configuration is required; auto_https checks IMDSv2 IPv4 and certificate lifetime, validates Nginx and reconciles after boot/every 30 minutes after a run. It does not keep the IP stable.

### Result and images

Verify HTTP redirect, trusted TLS/health and WebSocket with the current IP. Capture role/service/checksum and certificate/proxy/timer evidence without secrets. The November 3 record does not establish a completed Stop/Start exercise.

---

[← 5.7](../5.7-Administration/) · [Contents](../) · [5.9 →](../5.9-Pipeline-Automation/)

### Step pages

- [5.8.1. EC2 và IAM Role](5.8.1-step1/)
- [5.8.2. Triển khai source và Streamlit Service](5.8.2-step2/)
- [5.8.3. Nginx và HTTPS](5.8.3-step3/)
- [5.8.4. Kiểm tra truy cập](5.8.4-step4/)
- [5.8.5. Đối chiếu cấu hình service và reverse proxy](5.8.5-step5/)
- [5.8.6. Nghiệm thu sau đợt triển khai](5.8.6-step6/)
