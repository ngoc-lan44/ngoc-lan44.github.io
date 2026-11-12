---
title: "Làm sạch và chuẩn hóa"
date: 2026-11-10
weight: 2
chapter: false
pre: " <b> 5.3.2. </b> "
---

`clean_itviec.py` gộp khoảng trắng, chuẩn địa điểm, kinh nghiệm, cấp bậc, kỹ năng và thông tin lương. Địa điểm không nhận dạng trả Khác; kinh nghiệm thiếu trả Không xác định. Skills bỏ rỗng/trùng, giữ thứ tự. salary_available dựa trên min/max; lương ẩn không được tự ước lượng.

Thực hành trên bản sao, giữ cùng shell đến khi xuất Parquet:

~~~bash
sudo -u vnjob /bin/bash
cd /opt/vn-it-job-market
WORKSHOP_DATA="$(mktemp -d /tmp/vnjob-workshop.XXXXXX)"
mkdir -p "$WORKSHOP_DATA/current/itviec"
cp data/current/itviec/current_jobs.json "$WORKSHOP_DATA/current/itviec/current_jobs.json"
export PIPELINE_DATA_ROOT="$WORKSHOP_DATA"
.venv/bin/python processors/clean_itviec.py
~~~

**Kiểm tra sau bước này:** Cleaner ghi vào PIPELINE_DATA_ROOT của bản sao, không ghi đè runtime.

---

[← 5.3](../) · [Mục lục Workshop](../../) · [Bước trước](../5.3.1-step1/) · [Bước tiếp →](../5.3.3-step3/)
