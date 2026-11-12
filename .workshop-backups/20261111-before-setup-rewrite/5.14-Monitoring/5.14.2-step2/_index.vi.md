---
title: "Trạng thái và chất lượng dữ liệu"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.14.2. </b> "
aliases:
  - "/5-workshop/5.10-monitoring-results/5.10.2-step2/"
---

**Mục tiêu:** Trạng thái và chất lượng dữ liệu.

**Bối cảnh:** Đối chiếu CloudWatch, các trang trạng thái và runbook.

### Các bước thực hiện

ADMIN mở **Trạng thái hệ thống**, **Trạng thái thu thập dữ liệu** và **Chất lượng dữ liệu**. Kiểm run_id, thời điểm cập nhật, stage, số dòng và nhóm cảnh báo; so với artifact/query của cùng lượt. Thiếu lương từ nguồn cần phân biệt với thiếu trường bắt buộc hoặc lỗi parser.


> 📸 **[CẦN THÊM ẢNH 5.14-02]**
>
> Ảnh các trang System Status, Crawl Status và Data Quality: run_id, thời điểm, bộ đếm và nhóm kiểm thực tế.
>
> File: `5-14-02.png`

### Kết quả mong đợi

Các trang quản trị được đối chiếu với artifact và chất lượng dữ liệu nguồn.

### Source đối chiếu

- `deploy/ec2/configure_monitoring.py`
- `deploy/ec2/install_monitoring.sh`
- `dashboard/admin_monitoring.py`
- `docs/OPERATIONS_RUNBOOK.md`

---

[← 5.14. Giám sát và xử lý sự cố](../) · [Mục lục Workshop](../../) · [Bước trước](../5.14.1-step1/) · [Bước tiếp →](../5.14.3-step3/)
