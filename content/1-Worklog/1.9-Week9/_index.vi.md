---
title: "Tuần 9: Python SDK và transaction DynamoDB"
menuTitle: "Worklog Tuần 9"
date: 2026-11-08
weight: 9
chapter: false
pre: " <b> 1.9. </b> "
---

**Thời gian:** 12/10/2026–16/10/2026.

#### Mục tiêu

- Hiểu cách Python/Boto3 thao tác DynamoDB.
- Biết ý nghĩa ghi nguyên tử nhiều Item.

#### Nội dung đã tìm hiểu

| Thứ | Nội dung học tập | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| --- | --- | --- | --- | --- |
| 2 | Đọc Boto3 resource và khai báo KeySchema trong chương trình tạo bảng Movies. | 12/10/2026 | 12/10/2026 | [https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.1-createtable/](https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.1-createtable/) |
| 3 | Tìm hiểu đọc moviedata.json và nạp dữ liệu bằng put_item trong Python. | 13/10/2026 | 13/10/2026 | [https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.6-loadsampledata/](https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.6-loadsampledata/) |
| 4 | Đọc ví dụ Query phim theo year bằng KeyConditionExpression. | 14/10/2026 | 14/10/2026 | [https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.7-querydata/](https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.7-querydata/) |
| 5 | Tìm hiểu TransactWriteItems và nguyên tắc tất cả thành công hoặc cùng thất bại. | 15/10/2026 | 15/10/2026 | [https://000039.awsfcaj.com/1-lhol/1.2/1.2.6/](https://000039.awsfcaj.com/1-lhol/1.2/1.2.6/) |
| 6 | Tổng hợp lợi ích transaction khi các bản ghi liên quan cần nhất quán. | 16/10/2026 | 16/10/2026 | [https://000039.awsfcaj.com/1-lhol/1.2/1.2.6/](https://000039.awsfcaj.com/1-lhol/1.2/1.2.6/) |

#### Kết quả học tập

- Hiểu SDK là giao diện gọi dịch vụ, không phải nơi lưu dữ liệu.
- Hiểu transaction giúp ghi các Item liên quan theo nguyên tắc tất cả cùng thành công hoặc cùng thất bại.
