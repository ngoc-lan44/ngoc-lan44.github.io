---
title: "Kiểm tra toàn bộ lượt thu thập trước ETL"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.7.3. </b> "
aliases:
  - "/5-workshop/5.3-itviec-collection/5.3.3-step3/"
  - "/5-workshop/5.3-itviec-collection/5.3.4-step4/"
  - "/5-workshop/5.3-itviec-collection/5.3.5-step5/"
  - "/5-workshop/5.2-itviec-collection/5.2.3-step3/"
  - "/5-workshop/5.2-itviec-collection/5.2.4-step4/"
  - "/5-workshop/5.2-itviec-collection/5.2.5-step5/"
---

**Thực hiện tại:** SSM trên EC2

### Mục tiêu

Chỉ đưa dữ liệu hợp lệ vào đồng bộ current.

### Điều kiện đầu vào

Các batch của một discovery được runner điều phối.

### Các bước thực hiện

Theo dõi journal và trạng thái run:

~~~bash
sudo journalctl -u vnjob-pipeline.service -n 120 --no-pager -o cat
sudo systemctl status vnjob-pipeline.service --no-pager
~~~

Trong data/runs/<RUN_ID_THUC_TE>/status.json, đối chiếu stage, completed_batches, crawled, trạng thái cuối và published. Đọc file với user vnjob hoặc quyền SSM phù hợp.

Runner kiểm đầy đủ số batch, discovery_file, expected/success/failed, batch_complete và ID duy nhất trên toàn tập. Sau đó mới ghi validated_snapshot.json và chạy sync/clean/export. Thiếu batch hoặc có lỗi thì không coi đầu vào ETL đạt. Checkpoint theo discovery SHA chỉ dùng lại URL trong giới hạn của source.

Không ghép batch từ hai discovery. 403/429 cần dừng/đánh giá điều kiện truy cập nguồn; không bật vòng retry liên tục hoặc hạ guard độ phủ để làm lượt chạy qua kiểm tra.

### Kiểm tra kết quả

Có run_id, aggregate hợp lệ và trạng thái thực tế của toàn lượt. Nếu lỗi, có failed_stage/error_type để xử lý.

### Kết quả lượt chạy ngày 11/11/2026

Lượt chạy **20261111T081952Z-a435a240** hoàn tất **25/25 batch**, thu thập **624 tin** và kết thúc với trạng thái **SUCCEEDED**, **published=true**. Sau đồng bộ, dữ liệu current, dữ liệu sạch và Parquet có **1.072 bản ghi**; Parquet gồm **24 cột**. Tổng dữ liệu hiện tại bao gồm các bản ghi đã có từ trước cùng dữ liệu được cập nhật trong lượt chạy.

![Log pipeline hoàn thành toàn bộ batch, đồng bộ, làm sạch, xuất Parquet và công bố dữ liệu thành công](/images/workshop/setup-5-7-completed-run.png)


---

[← 5.7. Thiết lập và chạy thu thập ITviec](../) · [Mục lục Workshop](../../) · [Bước trước](../5.7.2-step2/)
