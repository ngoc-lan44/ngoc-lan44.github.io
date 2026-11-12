---
title: "DynamoDB moderation và audit"
date: 2026-11-10
weight: 2
chapter: false
pre: " <b> 5.7.2. </b> "
---

| Bảng | Khóa | Dữ liệu |
| --- | --- | --- |
| vn-it-job-market-moderation | record_id (String) | Trạng thái kiểm duyệt |
| vn-it-job-market-moderation-audit | event_group + event_key (String) | Nhật ký moderation |

**Console:** DynamoDB → Tables → mở từng bảng. Kiểm trạng thái, key schema, billing, deletion protection và PITR. State/audit được ghi cùng transaction. Lặp lệnh sau cho bảng audit:

~~~bash
aws dynamodb describe-table --table-name vn-it-job-market-moderation --region ap-southeast-1
aws dynamodb describe-continuous-backups --table-name vn-it-job-market-moderation --region ap-southeast-1
~~~

**Kiểm tra sau bước này:** Đúng hai bảng và đúng key schema; trạng thái bảo vệ dữ liệu được đọc thực tế.

> 📸 **[CẦN THÊM ẢNH 5.7-02]**
>
> Ảnh DynamoDB Console: hai bảng moderation/audit và cấu hình trạng thái, bảo vệ dữ liệu.
>
> File: `5-7-02.png`

---

[← 5.7](../) · [Mục lục Workshop](../../) · [Bước trước](../5.7.1-step1/) · [Bước tiếp →](../5.7.3-step3/)
