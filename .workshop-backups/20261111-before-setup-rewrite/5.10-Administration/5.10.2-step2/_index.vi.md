---
title: "DynamoDB moderation và audit"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 5.10.2. </b> "
aliases:
  - "/5-workshop/5.7-administration/5.7.2-step2/"
---

**Mục tiêu:** DynamoDB moderation và audit.

**Bối cảnh:** Quản lý tài khoản, xóa mềm/khôi phục và đối chiếu projection/audit.

### Các bước thực hiện

| Bảng | Khóa | Dữ liệu |
| --- | --- | --- |
| vn-it-job-market-moderation | record_id (String) | Trạng thái kiểm duyệt |
| vn-it-job-market-moderation-audit | event_group + event_key (String) | Nhật ký moderation |

**Console:** DynamoDB → Tables → mở từng bảng. Kiểm trạng thái, key schema, billing, deletion protection và PITR. State/audit được ghi cùng transaction. Lặp lệnh sau cho bảng audit:

~~~bash
aws dynamodb describe-table --table-name vn-it-job-market-moderation --region ap-southeast-1
aws dynamodb describe-continuous-backups --table-name vn-it-job-market-moderation --region ap-southeast-1
~~~


> 📸 **[CẦN THÊM ẢNH 5.10-02]**
>
> Ảnh DynamoDB Console: hai bảng moderation/audit và cấu hình trạng thái, bảo vệ dữ liệu.
>
> File: `5-10-02.png`

### Kết quả mong đợi

Đúng hai bảng và đúng key schema; trạng thái bảo vệ dữ liệu được đọc thực tế.

### Source đối chiếu

- `dashboard/job_management.py`
- `dashboard/dynamo_moderation_store.py`
- `dashboard/moderation_projection.py`
- `dashboard/sync_moderation_projection.py`
- `deploy/ec2/projection.timer`
- `docs/SOFT_DELETE_PHASE3.md`

---

[← 5.10. Quản trị và kiểm duyệt bằng DynamoDB](../) · [Mục lục Workshop](../../) · [Bước trước](../5.10.1-step1/) · [Bước tiếp →](../5.10.3-step3/)
