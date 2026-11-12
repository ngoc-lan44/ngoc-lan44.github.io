---
title: "Hai bảng DynamoDB của dự án"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 5.5.1. </b> "
aliases:
  - "/5-workshop/5.10-administration/5.10.2-step2/"
  - "/5-workshop/5.7-administration/5.7.2-step2/"
---

### Vai trò trong hệ thống

DynamoDB lưu trạng thái kiểm duyệt việc làm và nhật ký thao tác quản trị. Bảng moderation quản lý trạng thái hiện tại; bảng audit lưu các sự kiện thay đổi để theo dõi thao tác. Việc tách hai bảng giúp truy xuất trạng thái và tra cứu lịch sử theo từng mục đích.

### Cấu hình đã sử dụng

| Bảng | Khóa | Vai trò |
| --- | --- | --- |
| vn-it-job-market-moderation | record_id String | State moderation và metadata control |
| vn-it-job-market-moderation-audit | event_group String + event_key String | Audit theo revision |


Các thao tác kiểm duyệt và ghi nhật ký sử dụng hai bảng này. Tài khoản và hoạt động cá nhân được lưu riêng trên S3.



**Deletion protection** bảo vệ hai bảng khỏi bị xóa nhầm.

![Hai bảng DynamoDB của dự án ở trạng thái Active và bật Deletion protection](/images/workshop/setup-5-5-tables.png)

### Cấu hình bảng kiểm duyệt

Bảng **vn-it-job-market-moderation** sử dụng khóa **record_id (String)** để định danh các bản ghi trạng thái kiểm duyệt và điều khiển. Chế độ **On-demand** đáp ứng nhu cầu đọc/ghi mà không cần đặt trước số đơn vị dung lượng, phù hợp với các thao tác quản trị phát sinh không đều.

**Point-in-time recovery (PITR)** được bật để hỗ trợ khôi phục dữ liệu về một thời điểm trong khoảng thời gian được lưu giữ khi xảy ra thay đổi ngoài ý muốn. Đây là cơ chế bảo vệ dữ liệu bổ sung cho Deletion protection.

![Cấu hình bảng moderation với khóa record_id, chế độ On-demand và PITR On](/images/workshop/setup-5-5-moderation-details.png)

### Cấu hình bảng nhật ký

Bảng **vn-it-job-market-moderation-audit** lưu nhật ký thay đổi kiểm duyệt để tra cứu thao tác quản trị. Khóa **event_group** nhóm các sự kiện; **event_key** phân biệt các sự kiện trong cùng nhóm. Bảng sử dụng **On-demand** và bật **PITR** để hỗ trợ phục hồi dữ liệu.

![Bảng moderation-audit với khóa event_group, event_key, chế độ On-demand và PITR On](/images/workshop/setup-5-5-audit-details.png)

---

[← 5.5. Thiết lập DynamoDB và dữ liệu kiểm duyệt](../) · [Mục lục Workshop](../../) · [Bước tiếp →](../5.5.2-step2/)
