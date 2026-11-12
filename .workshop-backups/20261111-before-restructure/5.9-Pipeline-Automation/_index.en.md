---
title: "Pipeline automation and recovery"
date: 2026-11-08
weight: 9
chapter: false
pre: " <b> 5.9. </b> "
aliases:
  - "/en/5-workshop/5.13-pipeline-automation/"
  - "/en/5-workshop/5.13-pipeline-automation/5.13.1-step1/"
  - "/en/5-workshop/5.13-pipeline-automation/5.13.2-step2/"
  - "/en/5-workshop/5.13-pipeline-automation/5.13.3-step3/"
  - "/en/5-workshop/5.13-pipeline-automation/5.13.4-step4/"
  - "/en/5-workshop/5.13-pipeline-automation/5.13.5-step5/"
  - "/en/5-workshop/5.13-pipeline-automation/5.13.6-step6/"
  - "/en/4-workshop/4.11-pipeline-monitoring/4.11.1-step1/"
  - "/en/4-workshop/4.11-pipeline-monitoring/4.11.2-step2/"
  - "/en/4-workshop/4.11-pipeline-monitoring/4.11.3-step3/"
  - "/en/4-workshop/4.11-pipeline-monitoring/"
---

### Procedure

Inspect the vnjob oneshot service, runtime environment and timer. 19:00 UTC equals 02:00 Vietnam the following day; Persistent=true can trigger one missed schedule after boot. The installer does not automatically enable publication scheduling.

Compare process/timer timestamps, journal and per-run status. RUNNING/activating, FAILED, SKIPPED and SUCCEEDED/published are different outcomes. Do not delete markers to bypass same-day protection. The user-reported November 3 catch-up start still needs its original output log before claiming successful completion.

Operations Worker validates current ADMIN authority, a 15-minute request age and an action allowlist. Bounded transient retries require configuration and spacing/count limits; DISPATCHED is not task success. Capture timer/run and request/result evidence without starting a new crawl merely for screenshots.

---

[← 5.8](../5.8-EC2-HTTPS/) · [Contents](../) · [5.10 →](../5.10-Monitoring-Results/)

### Step pages

- [5.9.1. Pipeline Service và lịch chạy](5.9.1-step1/)
- [5.9.2. Theo dõi run và chạy bù](5.9.2-step2/)
- [5.9.3. Operations Worker](5.9.3-step3/)
- [5.9.4. Phân biệt các trạng thái khi đọc kết quả](5.9.4-step4/)
- [5.9.5. Quy trình xử lý yêu cầu phục hồi](5.9.5-step5/)
