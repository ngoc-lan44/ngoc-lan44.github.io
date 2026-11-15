---
title: "Source code and interface testing"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 4.14.1. </b> "
aliases:
  - "/en/5-workshop/5.15-testing-results/5.15.1-step1/"
  - "/en/5-workshop/5.10-monitoring-results/5.10.3-step3/"
---

Testing on the development machine checks processing logic and interface flows before release. Tests performed on **11 November 2026** produced these results:

| Area | Result |
| --- | --- |
| Unit tests | 140 tests completed in 62.065 seconds; OK |
| Registration and sign-in | Authentication checks passed |
| Job moderation | Confirmation/cancellation, soft deletion, restoration, audit logging, and USER access restrictions passed in the test environment |
| Vietnamese interface | Navigation, monitoring pages, and ADMIN access restrictions passed |

**Unit test results**

![Results of 140 unit tests](/images/workshop/setup-5-14-unit-tests.png)

**Registration and sign-in**

![Registration and sign-in tests](/images/workshop/setup-5-14-registration-smoke.png)

**Job moderation**

![Moderation tests](/images/workshop/setup-5-14-moderation-smoke.png)

**Vietnamese interface**

![Vietnamese interface tests](/images/workshop/setup-5-14-vietnamese-smoke.png)


---

[← 4.14. Testing and deployment verification](../) · [Workshop contents](../../) · [Next step →](../5.14.2-step2/)
