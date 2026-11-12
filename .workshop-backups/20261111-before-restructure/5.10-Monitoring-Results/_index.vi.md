---
title: "Giám sát, kiểm thử và kết quả"
date: 2026-11-08
weight: 10
chapter: false
pre: " <b> 5.10. </b> "
aliases:
  - "/5-workshop/5.14-monitoring-operations/"
  - "/5-workshop/5.14-monitoring-operations/5.14.1-step1/"
  - "/5-workshop/5.14-monitoring-operations/5.14.2-step2/"
  - "/5-workshop/5.14-monitoring-operations/5.14.3-step3/"
  - "/5-workshop/5.14-monitoring-operations/5.14.4-step4/"
  - "/5-workshop/5.14-monitoring-operations/5.14.5-step5/"
  - "/5-workshop/5.15-testing-results/"
  - "/5-workshop/5.15-testing-results/5.15.1-step1/"
  - "/5-workshop/5.15-testing-results/5.15.2-step2/"
  - "/5-workshop/5.15-testing-results/5.15.3-step3/"
  - "/5-workshop/5.15-testing-results/5.15.4-step4/"
  - "/5-workshop/5.15-testing-results/5.15.5-step5/"
  - "/5-workshop/5.15-testing-results/5.15.6-step6/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.4-step4/"
  - "/4-workshop/4.12-testing-results/"
  - "/4-workshop/4.13-cleanup-conclusion/"
---

**Mục tiêu thực hành:** Đối chiếu log, kiểm thử, lập nghiệm thu và chuẩn bị hướng dẫn kết thúc sử dụng tài nguyên.

Theo dõi log, chất lượng dữ liệu và kết quả kiểm thử để đánh giá việc vận hành Vietnam IT Job Market.

**Console:** CloudWatch → Logs / Alarms.

**Giao diện:** Trạng thái hệ thống, Trạng thái thu thập dữ liệu, Chất lượng dữ liệu.

### Trước khi bắt đầu

**Đầu vào:** Log, artifact, Query ID, bằng chứng UI và các biên bản kiểm thử/triển khai.

**Đầu ra:** Bảng nghiệm thu có nguồn và thời điểm; danh sách ảnh còn thiếu và hướng dẫn kết thúc sử dụng tài nguyên.

### Các bài thực hành

- [5.10.1. CloudWatch](5.10.1-step1/)
- [5.10.2. Trạng thái và chất lượng dữ liệu](5.10.2-step2/)
- [5.10.3. Kiểm thử](5.10.3-step3/)
- [5.10.4. Kết quả thực hiện](5.10.4-step4/)
- [5.10.5. Lập bảng nghiệm thu cho một phiên thực hành](5.10.5-step5/)
- [5.10.6. Dọn dẹp tài nguyên sau Workshop — chỉ hướng dẫn](5.10.6-step6/)
- [5.10.7. Kết luận Workshop](5.10.7-step7/)

### Checklist

- [ ] Log/alarm và các trang trạng thái được đối chiếu cùng thời điểm.
- [ ] Dữ liệu, UI, quyền và vận hành có kết quả kiểm tra riêng.
- [ ] Kết quả báo cáo gắn ngày/source version; thiếu log giữ trạng thái chờ xác nhận.


### Source đối chiếu

- `deploy/ec2/configure_monitoring.py`
- `deploy/ec2/health_metrics.py`
- `docs/EC2_DEPLOYMENT_2026-11-02.md`
- `deploy/ec2/install_monitoring.sh`
- `data/control/ec2_https_current.sh`
- `dashboard/admin_monitoring.py`

---

[← 5.9](../5.9-Pipeline-Automation/) · [Mục lục](../)
