---
title: "Kiểm thử mã nguồn và giao diện"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.14.1. </b> "
aliases:
  - "/5-workshop/5.15-testing-results/5.15.1-step1/"
  - "/5-workshop/5.10-monitoring-results/5.10.3-step3/"
---

Kiểm thử trên máy phát triển giúp kiểm tra logic xử lý và các luồng giao diện trước khi phát hành. Ngày **11/11/2026**, các bài kiểm thử đã thực hiện có kết quả:

| Hạng mục | Kết quả |
| --- | --- |
| Unit test | 140 kiểm thử, hoàn tất trong 62,065 giây; OK |
| Đăng ký và đăng nhập | Các bước kiểm tra xác thực đạt |
| Kiểm duyệt việc làm | Xác nhận/hủy, xóa mềm, khôi phục, nhật ký và giới hạn quyền USER đạt trong bài kiểm thử |
| Giao diện tiếng Việt | Điều hướng, các trang giám sát và giới hạn quyền ADMIN đạt |

**Kết quả unit test**

![Kết quả 140 kiểm thử unit](/images/workshop/setup-5-14-unit-tests.png)

**Đăng ký và đăng nhập**

![Kiểm thử đăng ký và đăng nhập](/images/workshop/setup-5-14-registration-smoke.png)

**Kiểm duyệt việc làm**

![Kiểm thử moderation](/images/workshop/setup-5-14-moderation-smoke.png)

**Giao diện tiếng Việt**

![Kiểm thử giao diện tiếng Việt](/images/workshop/setup-5-14-vietnamese-smoke.png)


---

[← 5.14. Kiểm thử và nghiệm thu triển khai](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.14.2-step2/)
