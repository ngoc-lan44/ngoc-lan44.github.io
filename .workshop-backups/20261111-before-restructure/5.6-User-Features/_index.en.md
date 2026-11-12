---
title: "Accounts and personal features"
date: 2026-11-08
weight: 6
chapter: false
pre: " <b> 5.6. </b> "
aliases:
  - "/en/5-workshop/5.9-user-features/"
  - "/en/5-workshop/5.9-user-features/5.9.1-step1/"
  - "/en/5-workshop/5.9-user-features/5.9.2-step2/"
  - "/en/5-workshop/5.9-user-features/5.9.3-step3/"
  - "/en/5-workshop/5.9-user-features/5.9.4-step4/"
  - "/en/5-workshop/5.9-user-features/5.9.5-step5/"
  - "/en/5-workshop/5.9-user-features/5.9.6-step6/"
  - "/en/4-workshop/4.9-user-administration/4.9.1-step1/"
  - "/en/4-workshop/4.9-user-administration/4.9.2-step2/"
  - "/en/4-workshop/4.9-user-administration/"
---

### Procedure

Public registration creates USER accounts only. S3 stores accounts and per-user activity; passwords use salted PBKDF2-HMAC-SHA256 with 600,000 iterations and writes use conditional updates.

With test users A/B, verify login, unique saved jobs, application tracking, persistence and isolation. Tracking opens ITviec for the user and never submits CVs or synchronises recruiter decisions automatically. Edit display name/bio, not role/user_id. Change passwords through the private UI and verify reauthentication/session invalidation. Do not claim disabled email flows are active.

### Result and images

Guest/USER/ADMIN access one/four/ten pages, with server-side checks. Capture registration/login, personal lists and a redacted profile/password-change screen. No secrets or real account changes are needed for report screenshots.

---

[← 5.5](../5.5-Streamlit-Dashboard/) · [Contents](../) · [5.7 →](../5.7-Administration/)

### Step pages

- [5.6.1. Đăng ký, đăng nhập và phân quyền](5.6.1-step1/)
- [5.6.2. Lưu việc làm và theo dõi ứng tuyển](5.6.2-step2/)
- [5.6.3. Hồ sơ và đổi mật khẩu](5.6.3-step3/)
- [5.6.4. Kiểm tra lưu bền và tách dữ liệu cá nhân](5.6.4-step4/)
- [5.6.5. Kiểm soát phiên và ghi đồng thời](5.6.5-step5/)
