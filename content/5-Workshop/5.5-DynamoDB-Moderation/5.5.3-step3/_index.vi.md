---
title: "Kết nối backend kiểm duyệt và kiểm tra dữ liệu hiển thị"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.5.3. </b> "
aliases:
  - "/5-workshop/5.7-athena/5.7.2-step2/"
  - "/5-workshop/5.7-athena/5.7.3-step3/"
  - "/5-workshop/5.4-s3-glue-athena/5.4.3-step3/"
  - "/5-workshop/5.4-s3-glue-athena/5.4.5-step5/"
---

### Kết nối ứng dụng với dữ liệu kiểm duyệt

Ứng dụng sử dụng DynamoDB để lưu trạng thái kiểm duyệt và nhật ký quản trị, đồng thời dùng bản tổng hợp trên S3 để Athena lọc việc làm đã xóa mềm.

![Cấu hình moderation trên EC2 sử dụng DynamoDB, hai bảng kiểm duyệt và đường dẫn S3 của dự án](/images/workshop/setup-5-5-runtime-config.png)

### Kiểm tra việc làm sau kiểm duyệt

Truy vấn đối chiếu mã việc làm giữa view đang hiển thị và view đã xóa mềm. Kết quả bằng 0 nghĩa là không có việc làm xuất hiện đồng thời trong hai tập dữ liệu tại thời điểm kiểm tra.

~~~sql
SELECT COUNT(*) AS n
FROM vn_it_job_market.itviec_active_jobs j
INNER JOIN vn_it_job_market.itviec_deleted_jobs d
ON j.job_id = d.job_id;
~~~

Kết quả truy vấn ngày **28/10/2026** là **n = 0**: không có mã việc làm trùng giữa hai view trong lần kiểm tra này. Đây là phép kiểm tra tính nhất quán của dữ liệu hiển thị; kết quả không thay thế kiểm thử thao tác xóa mềm và khôi phục.

![Kết quả truy vấn Athena đối chiếu việc làm đang hiển thị và đã xóa mềm: n bằng 0](/images/workshop/setup-5-5-02.png)


---

[← 5.5. Thiết lập DynamoDB và dữ liệu kiểm duyệt](../) · [Mục lục Workshop](../../) · [Bước trước](../5.5.2-step2/)
