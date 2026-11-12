---
title: "Thu thập chi tiết theo batch"
date: 2026-11-10
weight: 2
chapter: false
pre: " <b> 5.2.2. </b> "
---

| Thành phần | Giá trị |
| --- | --- |
| Collector | itviec_batch_collector.py |
| Kích thước batch | Tối đa 25 URL |
| Đầu ra | data/raw/itviec/batches/ |

Chỉ định discovery đã kiểm tra rồi chạy batch đầu:

~~~bash
export PIPELINE_DISCOVERY_FILE="/opt/vn-it-job-market/data/raw/itviec/<TEN_DISCOVERY_THUC_TE>.json"
sudo -u vnjob env PIPELINE_DISCOVERY_FILE="$PIPELINE_DISCOVERY_FILE" .venv/bin/python collectors/itviec_batch_collector.py 1
unset PIPELINE_DISCOVERY_FILE
~~~

Thay placeholder bằng file thật. Đối số 1 là số batch. Kiểm discovery_file, expected_count, success_count, failed_count, batch_complete và stopped_early. Batch cuối có thể ít hơn 25 tin.

**Kiểm tra sau bước này:** Batch chỉ tham chiếu discovery đã chọn; expected_count và completion khớp thực tế.

> 📸 **[CẦN THÊM ẢNH 5.2-02]**
>
> Ảnh kết quả batch và metadata JSON: số batch, discovery_file, số thành công/thất bại và cờ hoàn tất.
>
> File: `5-2-02.png`

---

[← 5.2](../) · [Mục lục Workshop](../../) · [Bước trước](../5.2.1-step1/) · [Bước tiếp →](../5.2.3-step3/)
