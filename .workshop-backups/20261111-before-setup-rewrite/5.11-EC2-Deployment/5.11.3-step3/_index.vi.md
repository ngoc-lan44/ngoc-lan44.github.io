---
title: "Kiểm tra Streamlit Service và quyền runtime"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 5.11.3. </b> "
aliases:
  - "/5-workshop/5.8-ec2-https/5.8.5-step5/"
---

**Mục tiêu:** Kiểm tra Streamlit Service và quyền runtime.

**Bối cảnh:** Kiểm IAM/runtime, đóng gói source và nghiệm thu đúng release.

### Các bước thực hiện

Sau khi triển khai source trong đợt được phép, mở SSM và đối chiếu unit đang cài với deploy/ec2/streamlit.service:

~~~bash
cd /opt/vn-it-job-market
systemctl cat vnjob-dashboard.service
systemctl show vnjob-dashboard.service -p User -p Group -p WorkingDirectory -p ExecStart
systemctl status vnjob-dashboard --no-pager
curl --fail http://127.0.0.1:8501/_stcore/health
journalctl -u vnjob-dashboard -n 80 --no-pager
~~~

| Thuộc tính | Giá trị trong source |
| --- | --- |
| User/Group | vnjob |
| WorkingDirectory | /opt/vn-it-job-market |
| EnvironmentFile | /etc/vn-it-job-market.env |
| Entry point | dashboard/app.py qua .venv Linux |
| Địa chỉ/cổng | 127.0.0.1:8501 |
| Restart | on-failure, RestartSec=10 |
| Vùng ghi runtime | /opt/vn-it-job-market/data |

Không đưa private config vào gói source công khai. Đối chiếu owner/quyền file nếu service lỗi quyền; không chuyển dashboard sang chạy root. Health thành công chứng minh tiến trình HTTP nội bộ hoạt động, chưa chứng minh truy vấn Athena hoặc chức năng tài khoản thành công.

### Kết quả mong đợi

Unit chạy đúng user, entrypoint và loopback; journal/health có kết quả thực tế để tiếp tục Nginx HTTPS.

### Source đối chiếu

- `deploy/ec2/stack.json`
- `deploy/ec2/build_release.py`
- `deploy/ec2/install.sh`
- `deploy/ec2/streamlit.service`
- `docs/EC2_DEPLOYMENT_2026-11-02.md`

---

[← 5.11. Triển khai hệ thống trên Amazon EC2](../) · [Mục lục Workshop](../../) · [Bước trước](../5.11.2-step2/) · [Bước tiếp →](../5.11.4-step4/)
