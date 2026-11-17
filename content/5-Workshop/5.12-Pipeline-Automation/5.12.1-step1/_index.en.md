---
title: "Schedule the pipeline at 02:00 Vietnam time"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 4.11.1. </b> "
aliases:
  - "/en/5-workshop/5.13-pipeline-automation/"
  - "/en/5-workshop/5.13-pipeline-automation/5.13.1-step1/"
  - "/en/5-workshop/5.9-pipeline-automation/"
  - "/en/5-workshop/5.9-pipeline-automation/5.9.1-step1/"
  - "/en/5-workshop/5.13-pipeline-automation/5.13.6-step6/"
  - "/4-workshop/4.11-pipeline-monitoring/4.10.1-step1/"
  - "/4-workshop/4.11-pipeline-monitoring/4.10.2-step2/"
  - "/4-workshop/4.11-pipeline-monitoring/4.10.3-step3/"
  - "/4-workshop/4.11-pipeline-monitoring/"
---

### Daily data update schedule

The **vnjob-pipeline** timer triggers the recruitment data collection and processing pipeline daily, automatically updating data on EC2. **OnCalendar=*-*-* 19:00:00 UTC** corresponds to **02:00 Vietnam time the following day**.

**Persistent=true** allows a missed execution to be triggered after server downtime. **AccuracySec=1min** sets a one-minute scheduling tolerance.

### Check the configuration

```bash
sudo systemctl status vnjob-pipeline.timer --no-pager -n 0
sudo systemctl cat vnjob-pipeline.timer
```

The output shows the timer **enabled**, **active (waiting)**, and scheduled to trigger **vnjob-pipeline.service**.

![Pipeline timer status and configuration for daily execution at 02:00 Vietnam time](/images/workshop/setup-pipeline-timer-2026-11-16.png)

---

[← 4.11. Schedule the pipeline and Operations Worker](../) · [Workshop contents](../../) · [Next step →](../5.12.2-step2/)
