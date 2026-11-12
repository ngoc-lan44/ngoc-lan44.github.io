---
title: "Tự động hóa pipeline và phục hồi"
date: 2026-11-08
weight: 9
chapter: false
pre: " <b> 5.9. </b> "
aliases:
  - "/5-workshop/5.13-pipeline-automation/"
  - "/5-workshop/5.13-pipeline-automation/5.13.1-step1/"
  - "/5-workshop/5.13-pipeline-automation/5.13.2-step2/"
  - "/5-workshop/5.13-pipeline-automation/5.13.3-step3/"
  - "/5-workshop/5.13-pipeline-automation/5.13.4-step4/"
  - "/5-workshop/5.13-pipeline-automation/5.13.5-step5/"
  - "/5-workshop/5.13-pipeline-automation/5.13.6-step6/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.1-step1/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.2-step2/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.3-step3/"
  - "/4-workshop/4.11-pipeline-monitoring/"
---

**Mục tiêu thực hành:** Kiểm lịch chạy, diễn giải trạng thái run và xác minh yêu cầu Operations Worker.

Pipeline chạy hằng ngày bằng systemd; Operations Worker xử lý các yêu cầu phục hồi được cho phép từ ADMIN.

**Thực hiện:** terminal SSM và trang Trạng thái hệ thống của ADMIN.

### Trước khi bắt đầu

**Đầu vào:** Các unit pipeline/worker, quyền ADMIN và artifact/journal hiện có.

**Đầu ra:** Giải thích được lịch 02:00, trạng thái lượt chạy, chạy bù và kết quả phục hồi.

### Các bài thực hành

- [5.9.1. Pipeline Service và lịch chạy](5.9.1-step1/)
- [5.9.2. Theo dõi run và chạy bù](5.9.2-step2/)
- [5.9.3. Operations Worker](5.9.3-step3/)
- [5.9.4. Phân biệt các trạng thái khi đọc kết quả](5.9.4-step4/)
- [5.9.5. Quy trình xử lý yêu cầu phục hồi](5.9.5-step5/)

### Kết quả mong đợi

Pipeline có lịch chạy và log truy vết, yêu cầu phục hồi được kiểm soát. DISPATCHED là đã chuyển tác vụ, chưa phải toàn pipeline thành công. Khóa flock chống runner chồng trên một host; CAS bảo vệ publication trước xung đột publisher.

### Checklist

- [ ] Timer đúng 19:00 UTC / 02:00 Việt Nam và Persistent=true.
- [ ] Run có log, trạng thái cuối và published được đối chiếu.
- [ ] Yêu cầu Operations Worker có kết quả kiểm chứng ngoài DISPATCHED.


### Source đối chiếu

- `deploy/ec2/pipeline.service`
- `deploy/ec2/run_pipeline.py`
- `deploy/ec2/report_pipeline_exit.py`
- `deploy/ec2/pipeline.timer`
- `deploy/ec2/install.sh`
- `deploy/ec2/activate_pipeline.sh`

---

[← 5.8](../5.8-EC2-HTTPS/) · [Mục lục](../) · [5.10 →](../5.10-Monitoring-Results/)
