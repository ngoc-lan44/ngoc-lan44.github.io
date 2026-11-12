---
title: "Thu thập từng batch và kiểm liên kết discovery"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.7.2. </b> "
aliases:
  - "/5-workshop/5.3-itviec-collection/5.3.2-step2/"
  - "/5-workshop/5.2-itviec-collection/5.2.2-step2/"
---

**Thực hiện tại:** SSM trên EC2

### Mục tiêu

Thu thập chi tiết bằng collector và kiểm batch thuộc đúng đầu vào.

### Điều kiện đầu vào

Discovery hợp lệ và pipeline đã khởi chạy.

### Các bước thực hiện

Runner chia URL thành batch tối đa 25 tin, truyền PIPELINE_DISCOVERY_FILE và gọi itviec_batch_collector.py theo số batch. Với 624 URL đã ghi nhận, tổng số batch là 25; batch cuối ít hơn 25 tin.

Pipeline tự gọi collector cho từng đợt. Kiểm tra tệp kết quả do pipeline tạo bằng lệnh dưới đây.

Kiểm tra đợt thu thập thứ nhất ngày 11/11/2026:

~~~bash
sudo -u vnjob .venv/bin/python -c 'import json; from pathlib import Path; name="itviec_urls_20261111_152117_659903.json"; matches=[(p,json.loads(p.read_text(encoding="utf-8"))) for p in Path("data/raw/itviec/batches").glob("itviec_batch_001_*.json")]; matches=[(p,d) for p,d in matches if Path(d.get("discovery_file","")).name==name]; assert matches, "Chua tim thay batch 1 thuoc discovery da chon"; p,d=max(matches,key=lambda x:x[0].stat().st_mtime); print("File:",p); print(json.dumps({k:d.get(k) for k in ("discovery_file","crawl_time","batch_number","total_batches","batch_size","expected_count","success_count","failed_count","batch_complete","snapshot_complete","stopped_early")},ensure_ascii=False,indent=2)); print("So ban ghi jobs:",len(d.get("jobs",[])))'
~~~

Ảnh ghi batch_number=1, total_batches=25, expected_count=success_count=25, failed_count=0, batch_complete=true, stopped_early=false và 25 bản ghi jobs. discovery_file trùng tên ở bước trước. snapshot_complete=false đúng với một batch riêng lẻ.

### Kiểm tra kết quả

Batch khớp discovery, số bản ghi thành công khớp expected_count; không suy thành công toàn run từ batch 1.

![Ảnh kết quả batch và metadata JSON: số batch, discovery_file, số thành công/thất bại và cờ hoàn tất.](/images/workshop/setup-5-7-02.png)


---

[← 5.7. Thiết lập và chạy thu thập ITviec](../) · [Mục lục Workshop](../../) · [Bước trước](../5.7.1-step1/) · [Bước tiếp →](../5.7.3-step3/)
