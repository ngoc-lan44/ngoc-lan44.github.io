---
title: "Nghiệm thu hệ thống trên AWS"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.14.2. </b> "
aliases:
  - "/5-workshop/5.15-testing-results/"
  - "/5-workshop/5.15-testing-results/5.15.3-step3/"
  - "/5-workshop/5.10-monitoring-results/"
  - "/5-workshop/5.10-monitoring-results/5.10.5-step5/"
  - "/5-workshop/5.14-monitoring-operations/"
  - "/5-workshop/5.14-monitoring-operations/5.14.1-step1/"
  - "/5-workshop/5.14-monitoring-operations/5.14.2-step2/"
  - "/5-workshop/5.14-monitoring-operations/5.14.3-step3/"
  - "/5-workshop/5.14-monitoring-operations/5.14.4-step4/"
  - "/5-workshop/5.14-monitoring-operations/5.14.5-step5/"
  - "/5-workshop/5.15-testing-results/5.15.4-step4/"
  - "/5-workshop/5.15-testing-results/5.15.5-step5/"
  - "/5-workshop/5.15-testing-results/5.15.6-step6/"
  - "/4-workshop/4.11-pipeline-monitoring/4.11.4-step4/"
  - "/4-workshop/4.12-testing-results/"
  - "/4-workshop/4.13-cleanup-conclusion/"
---

Các kết quả triển khai được kiểm tra qua AWS Console, terminal SSM và website. Hình ảnh tương ứng được trình bày tại các mục trước.

| Hạng mục | Kết quả ghi nhận |
| --- | --- |
| Pipeline | Lượt chạy 11/11/2026 thành công, hoàn tất 25/25 đợt và công bố dữ liệu lên S3 |
| Dữ liệu | Clean JSON và Parquet cùng có 1.072 bản ghi; Parquet có 24 cột |
| S3 và Athena | Parquet tồn tại trên S3; truy vấn kỹ năng hoàn thành và trả dữ liệu |
| Dashboard | Hiển thị KPI, biểu đồ, tìm kiếm, bộ lọc và chi tiết việc làm |
| Tài khoản | Có giao diện USER và ADMIN; các trang lưu việc làm, lịch sử ứng tuyển và hồ sơ đã được mở kiểm tra |
| Truy cập web | Nginx đang chạy; HTTP chuyển sang HTTPS, health trả ok và WebSocket trả 101 |
| Vận hành | Pipeline timer được bật; CloudWatch Agent và bộ xuất nhật ký đang chạy, log hiển thị trên CloudWatch |

Kết quả pipeline thuộc lượt chạy **20261111T081952Z-a435a240**. Kết quả kiểm thử giao diện kiểm duyệt tại 5.14.1 được thực hiện trong môi trường kiểm thử.


---

[← 5.14. Kiểm thử và nghiệm thu triển khai](../) · [Mục lục Workshop](../../) · [Bước trước](../5.14.1-step1/) · [Bước tiếp →](../5.14.3-step3/)
