---
title: "Làm sạch và chuẩn hóa"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.4.2. </b> "
aliases:
  - "/5-workshop/5.3-data-processing/5.3.2-step2/"
---

**Mục tiêu:** Làm sạch và chuẩn hóa.

**Bối cảnh:** Đồng bộ current/history, chuẩn hóa dữ liệu và kiểm Parquet trên bản sao.

### Các bước thực hiện

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

**Chuyển bước:** Giữ nguyên phiên shell và biến PIPELINE_DATA_ROOT khi mở bài 5.4.3; lệnh xuất Parquet phải dùng cùng bản sao vừa làm sạch.

### Kết quả mong đợi

Cleaner ghi vào PIPELINE_DATA_ROOT của bản sao, không ghi đè runtime.

### Source đối chiếu

- `processors/clean_itviec.py`
- `processors/export_itviec_parquet.py`
- `deploy/ec2/run_pipeline.py`

---

[← 5.4. Đồng bộ, làm sạch và xuất Parquet](../) · [Mục lục Workshop](../../) · [Bước trước](../5.4.1-step1/) · [Bước tiếp →](../5.4.3-step3/)
