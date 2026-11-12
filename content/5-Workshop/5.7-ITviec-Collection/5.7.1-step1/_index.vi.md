---
title: "Chạy pipeline và khám phá URL"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.7.1. </b> "
aliases:
  - "/5-workshop/5.3-itviec-collection/"
  - "/5-workshop/5.3-itviec-collection/5.3.1-step1/"
  - "/5-workshop/5.2-itviec-collection/"
  - "/5-workshop/5.2-itviec-collection/5.2.1-step1/"
  - "/4-workshop/4.3-itviec-collection/4.3.1-step1/"
  - "/4-workshop/4.3-itviec-collection/4.3.2-step2/"
  - "/4-workshop/4.3-itviec-collection/4.3.3-step3/"
  - "/4-workshop/4.3-itviec-collection/"
---

**Thực hiện tại:** SSM trên EC2

### Mục tiêu

Khởi chạy collector thông qua service điều phối.

### Điều kiện đầu vào

EC2, seed, env ở 5.6 đã xong; chưa có lượt khác đang chạy.

### Các bước thực hiện

1. Kiểm tiến trình trước khi bắt đầu:

~~~bash
sudo systemctl status vnjob-pipeline.service --no-pager
~~~

2. Trong đợt thiết lập, giữ PIPELINE_PUBLISH=false nếu cần kiểm pipeline trước publication. Lưu env, rồi khởi động service:

~~~bash
sudo systemctl start --no-block vnjob-pipeline.service
sudo journalctl -u vnjob-pipeline.service -n 80 --no-pager -o cat
~~~

start --no-block trả quyền điều khiển terminal; runner vẫn tiếp tục chạy. Không khởi chạy lần nữa khi đã có tiến trình. Service nạp /etc/vn-it-job-market.env, chạy run_pipeline.py. Runner gọi discovery, chọn file mới hoặc reuse hợp lệ cùng ngày Việt Nam trong tối đa 6 giờ.

Discovery duyệt JSON-LD ItemList, chuẩn hóa HTTPS/itviec.com/it-jobs và loại URL trùng. Mặc định source đặt tối đa 500 trang, delay 2 giây và timeout 20 giây. Nếu chạy riêng collector trong một phiên không có runner, entry point là sudo -u vnjob .venv/bin/python collectors/discover_itviec_jobs.py; đường chạy chính của Workshop là service để toàn lượt được kiểm tra.

### Kết quả khám phá URL

Log journal ngày 11/11/2026 ghi discovery_time 15:19:55+07:00, dừng ở trang 33 vì không còn tin, 624 URL duy nhất và 0 trang thất bại. File: **itviec_urls_20261111_152117_659903.json**.

~~~bash
sudo journalctl -u vnjob-pipeline.service --since "2026-11-11 08:15:00 UTC" --until "2026-11-11 08:25:00 UTC" --no-pager -o cat
~~~

<details>
<summary>Xem log discovery đã ghi nhận ngày 11/11/2026</summary>
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

Sau bước chạy, kiểm JSON:

~~~bash
cd /opt/vn-it-job-market
sudo -u vnjob .venv/bin/python -c 'import json; from pathlib import Path; files=list(Path("data/raw/itviec").glob("itviec_urls_*.json")); assert files, "Chua co file discovery"; p=max(files,key=lambda x:x.stat().st_mtime); d=json.loads(p.read_text(encoding="utf-8")); urls=d.get("job_urls",[]); print("File:",p); print(json.dumps({k:d.get(k) for k in ("source","discovery_time","coverage_checked","total_pages_checked","total_unique_jobs","failed_pages")},ensure_ascii=False,indent=2)); print("URLs:",len(urls),"| Unique:",len(set(urls))); print("5 URL dau:"); print("\n".join(urls[:5]))'
~~~

### Kiểm tra kết quả

Discovery có coverage_checked=true, failed_pages rỗng và URL duy nhất. Lượt thu thập ngày 11/11/2026 ghi nhận 624 URL; số lượng thay đổi theo dữ liệu tuyển dụng tại từng thời điểm.

![Ảnh file discovery JSON: thời điểm quét, tổng URL, coverage_checked, failed_pages và một phần job_urls.](/images/workshop/setup-5-7-01.png)


---

[← 5.7. Thiết lập và chạy thu thập ITviec](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.7.2-step2/)
