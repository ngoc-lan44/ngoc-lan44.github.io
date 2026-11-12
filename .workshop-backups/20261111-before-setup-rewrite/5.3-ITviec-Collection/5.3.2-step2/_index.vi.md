---
title: "Thu thập chi tiết theo batch"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.3.2. </b> "
aliases:
  - "/5-workshop/5.2-itviec-collection/5.2.2-step2/"
---

**Mục tiêu:** Thu thập chi tiết theo batch.

**Bối cảnh:** Theo dấu discovery, batch và snapshot được kiểm tra trước ETL.

### Các bước thực hiện

| Thành phần | Giá trị |
| --- | --- |
| Collector | itviec_batch_collector.py |
| Kích thước batch | Tối đa 25 URL |
| Đầu ra | data/raw/itviec/batches/ |

Pipeline gọi collector để thu thập chi tiết theo từng batch từ discovery `itviec_urls_20261111_152117_659903.json` đã kiểm tra ở 5.3.1. Với 624 URL và kích thước tối đa 25 URL/batch, lượt này gồm 25 batch; batch cuối có thể ít hơn 25 tin.

Tại terminal SSM, kiểm tra batch 1 thuộc đúng discovery:

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python -c 'import json; from pathlib import Path; name="itviec_urls_20261111_152117_659903.json"; matches=[(p,json.loads(p.read_text(encoding="utf-8"))) for p in Path("data/raw/itviec/batches").glob("itviec_batch_001_*.json")]; matches=[(p,d) for p,d in matches if Path(d.get("discovery_file","")).name==name]; assert matches, "Chua tim thay batch 1 thuoc discovery da chon"; p,d=max(matches,key=lambda x:x[0].stat().st_mtime); print("File:",p); print(json.dumps({k:d.get(k) for k in ("discovery_file","crawl_time","batch_number","total_batches","batch_size","expected_count","success_count","failed_count","batch_complete","snapshot_complete","stopped_early")},ensure_ascii=False,indent=2)); print("So ban ghi jobs:",len(d.get("jobs",[])))'
~~~

Lệnh chọn file batch 1 có discovery_file khớp tên discovery, rồi in metadata và số bản ghi jobs.

![Kết quả batch 1 của discovery 624 URL: 25 tin thành công, không có lỗi và batch hoàn tất](/images/workshop/5-3-02.png)

### Kết quả đã kiểm tra

- `discovery_file` trỏ tới `itviec_urls_20261111_152117_659903.json`, khớp mục 5.3.1.
- `batch_number: 1`, `total_batches: 25`, `batch_size: 25`.
- `expected_count: 25`, `success_count: 25`, số bản ghi jobs là 25.
- `failed_count: 0`, `batch_complete: true`, `stopped_early: false`.
- `snapshot_complete: false` vì một batch không phải toàn bộ snapshot. Kết quả này xác nhận batch 1; kiểm tra toàn lượt ở 5.3.3.

### Kết quả mong đợi

Batch chỉ tham chiếu discovery đã chọn; expected_count và completion khớp thực tế.

### Source đối chiếu

- `collectors/discover_itviec_jobs.py`
- `collectors/itviec_batch_collector.py`
- `collectors/crawl_support.py`
- `collectors/extract_itviec_job.py`
- `deploy/ec2/run_pipeline.py`

---

[← 5.3. Thu thập dữ liệu tuyển dụng từ ITviec](../) · [Mục lục Workshop](../../) · [Bước trước](../5.3.1-step1/) · [Bước tiếp →](../5.3.3-step3/)
