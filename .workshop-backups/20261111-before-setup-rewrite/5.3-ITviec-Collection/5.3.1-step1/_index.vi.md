---
title: "Khám phá và chuẩn hóa URL"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.3.1. </b> "
aliases:
  - "/5-workshop/5.2-itviec-collection/5.2.1-step1/"
---

**Mục tiêu:** Khám phá và chuẩn hóa URL.

**Bối cảnh:** Theo dấu discovery, batch và snapshot được kiểm tra trước ETL.

### 1. Kiểm tra log khám phá URL

Pipeline đã chạy discovery với thời điểm bắt đầu được ghi là **11/11/2026 lúc 15:19:55 (UTC+7)**. Đọc journal của service:

~~~bash
sudo journalctl -u vnjob-pipeline.service --since "2026-11-11 08:15:00 UTC" --until "2026-11-11 08:25:00 UTC" --no-pager -o cat
~~~

Log ghi nhận giới hạn tối đa 500 trang. Discovery dừng ở trang 33 vì trang này không có tin; kết quả thu được 624 URL duy nhất và không có trang thất bại.

~~~text
KET QUA DISCOVERY
======================================================================
So page thanh cong: 33
So page that bai: 0
Tong job URL unique: 624
File: data/raw/itviec/itviec_urls_20261111_152117_659903.json
~~~

<details>
<summary>Xem đầy đủ log discovery</summary>
<pre>DISCOVER ALL ITVIEC JOB URLS
======================================================================
Discovery time: 2026-11-11T15:19:55+07:00
Max page: 500
[1/500] Page 1
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 20
[2/500] Page 2
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 40
[3/500] Page 3
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 60
[4/500] Page 4
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 80
[5/500] Page 5
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 100
[6/500] Page 6
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 120
[7/500] Page 7
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 140
[8/500] Page 8
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 160
[9/500] Page 9
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 180
[10/500] Page 10
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 200
[11/500] Page 11
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 220
[12/500] Page 12
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 240
[13/500] Page 13
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 260
[14/500] Page 14
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 280
[15/500] Page 15
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 300
[16/500] Page 16
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 320
[17/500] Page 17
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 340
[18/500] Page 18
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 360
[19/500] Page 19
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 380
[20/500] Page 20
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 400
[21/500] Page 21
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 420
[22/500] Page 22
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 440
[23/500] Page 23
Job tren page: 20
Job moi unique: 19
Tong unique hien tai: 459
[24/500] Page 24
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 479
[25/500] Page 25
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 499
[26/500] Page 26
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 519
[27/500] Page 27
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 539
[28/500] Page 28
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 559
[29/500] Page 29
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 579
[30/500] Page 30
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 599
[31/500] Page 31
Job tren page: 20
Job moi unique: 20
Tong unique hien tai: 619
[32/500] Page 32
Job tren page: 5
Job moi unique: 5
Tong unique hien tai: 624
[33/500] Page 33
Job tren page: 0
Job moi unique: 0
Tong unique hien tai: 624
Page khong co job. Dung discovery.
======================================================================
KET QUA DISCOVERY
======================================================================
So page thanh cong: 33
So page that bai: 0
Tong job URL unique: 624
File: data/raw/itviec/itviec_urls_20261111_152117_659903.json</pre>
</details>

### 2. Kiểm tra file discovery


Dữ liệu URL tuyển dụng được pipeline lưu trong các file `data/raw/itviec/itviec_urls_*.json`. Ở bước này, mở terminal SSM và kiểm tra file discovery mới nhất đã có trên EC2.

1. Chuyển đến thư mục dự án:

~~~bash
cd /opt/vn-it-job-market
~~~

2. Hiển thị tên file, thời điểm discovery, số trang đã kiểm tra, số URL và năm URL đầu tiên:


~~~bash
sudo -u vnjob .venv/bin/python -c 'import json; from pathlib import Path; files=list(Path("data/raw/itviec").glob("itviec_urls_*.json")); assert files, "Chua co file discovery"; p=max(files,key=lambda x:x.stat().st_mtime); d=json.loads(p.read_text(encoding="utf-8")); urls=d.get("job_urls",[]); print("File:",p); print(json.dumps({k:d.get(k) for k in ("source","discovery_time","coverage_checked","total_pages_checked","total_unique_jobs","failed_pages")},ensure_ascii=False,indent=2)); print("URLs:",len(urls),"| Unique:",len(set(urls))); print("5 URL dau:"); print("\n".join(urls[:5]))'
~~~

![Kết quả discovery ITviec: 33 trang, 624 URL duy nhất, coverage_checked true và failed_pages rỗng](/images/workshop/5-3-01.png)

### Kết quả đã kiểm tra

Ảnh kết quả ngày 11/11/2026 ghi nhận discovery kiểm tra 33 trang, thu được 624 URL và 624 URL duy nhất; coverage_checked=true, failed_pages rỗng. Kết quả này xác nhận bước khám phá URL, không thay thế kết quả thu thập chi tiết và ETL.

### Đối chiếu kết quả

- `coverage_checked: true`: discovery đã hoàn tất kiểm tra độ phủ theo quy trình của collector.
- `total_pages_checked: 33`: số trang đã kiểm tra.
- `total_unique_jobs: 624`, `URLs: 624 | Unique: 624`: danh sách có 624 URL không trùng nhau.
- `failed_pages: []`: discovery không ghi nhận trang lỗi.
- Năm URL được in ra thuộc ITviec và có đường dẫn `/it-jobs/`.

### Source đối chiếu

- `collectors/discover_itviec_jobs.py`
- `collectors/itviec_batch_collector.py`
- `collectors/crawl_support.py`
- `collectors/extract_itviec_job.py`
- `deploy/ec2/run_pipeline.py`

---

[← 5.3. Thu thập dữ liệu tuyển dụng từ ITviec](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.3.2-step2/)
