---
title: "Monitoring tests and results"
date: 2026-11-08
weight: 10
chapter: false
pre: " <b> 5.10. </b> "
aliases:
  - "/en/5-workshop/5.14-monitoring-operations/"
  - "/en/5-workshop/5.14-monitoring-operations/5.14.1-step1/"
  - "/en/5-workshop/5.14-monitoring-operations/5.14.2-step2/"
  - "/en/5-workshop/5.14-monitoring-operations/5.14.3-step3/"
  - "/en/5-workshop/5.14-monitoring-operations/5.14.4-step4/"
  - "/en/5-workshop/5.14-monitoring-operations/5.14.5-step5/"
  - "/en/5-workshop/5.15-testing-results/"
  - "/en/5-workshop/5.15-testing-results/5.15.1-step1/"
  - "/en/5-workshop/5.15-testing-results/5.15.2-step2/"
  - "/en/5-workshop/5.15-testing-results/5.15.3-step3/"
  - "/en/5-workshop/5.15-testing-results/5.15.4-step4/"
  - "/en/5-workshop/5.15-testing-results/5.15.5-step5/"
  - "/en/5-workshop/5.15-testing-results/5.15.6-step6/"
  - "/en/4-workshop/4.11-pipeline-monitoring/4.11.4-step4/"
  - "/en/4-workshop/4.12-testing-results/"
  - "/en/4-workshop/4.13-cleanup-conclusion/"
---

### Monitoring and validation

Inspect CloudWatch log group /vn-it-job-market/ec2, real exporter units and the PipelineFailure Console alarm. Correlate log timestamps/run IDs with system/crawl/data-quality pages. Do not assume SNS/email or advanced RAM/disk/stale alarms are active.

Validate unique data/counts, publication metadata, Glue schema, Athena results, UI roles/personal isolation and moderation projection. Offline tests require full source with tests/ and a separate environment; release archives exclude tests. Current CI calls unit tests, six UI suites and the clock test, but CI configuration alone is not a new PASS record.

### Recorded outcomes and limits

October 28: 660 crawled/848 current in a historical run. November 2 deployment: 140 unit/six UI, 130 checksums, eight KPIs/one table and verified external access. Separate cleanup: 145 unit/seven UI/clock, not current totals. November 3 HTTPS: reconciliation checks, not completed Stop/Start E2E.

Current live AWS/data/test results, original catch-up output, load/reboot/Stop-Start and notification/recovery evidence remain separate. Capture real logs, administrator status/quality and dated test evidence; do not delete resources or create failures for screenshots.

---

[← 5.9](../5.9-Pipeline-Automation/) · [Contents](../)

### Step pages

- [5.10.1. CloudWatch](5.10.1-step1/)
- [5.10.2. Trạng thái và chất lượng dữ liệu](5.10.2-step2/)
- [5.10.3. Kiểm thử](5.10.3-step3/)
- [5.10.4. Kết quả thực hiện](5.10.4-step4/)
- [5.10.5. Lập bảng nghiệm thu cho một phiên thực hành](5.10.5-step5/)
- [5.10.6. Dọn dẹp tài nguyên sau Workshop — chỉ hướng dẫn](5.10.6-step6/)
- [5.10.7. Kết luận Workshop](5.10.7-step7/)
