---
title: "Querying skill data with Athena"
date: 2026-11-11T00:00:00+07:00
weight: 2
chapter: false
pre: " <b> 4.4.2. </b> "
aliases:
  - "/en/5-workshop/5.7-athena/5.7.1-step1/"
  - "/en/5-workshop/5.4-s3-glue-athena/5.4.4-step4/"
---

**Run in:** Athena Query editor

### Purpose

Retrieve skills from jobs eligible for display as input for dashboard skill statistics. Athena reads S3 data through the tables and views defined in Glue Data Catalog.

### Skill query for the dashboard

The **itviec_active_job_skills** view provides job–skill pairs after moderation filtering. The dashboard uses this data to count skills appearing in job listings. One job can have multiple skills, so the result row count is not the number of jobs.

~~~sql
SELECT job_id, skill
FROM vn_it_job_market.itviec_active_job_skills;
~~~

The saved query has status **Completed**, returning **3,447 rows**, with a runtime of **842 ms** and **39.19 KB** scanned.

![Completed Athena query returning job_id and skill data](/images/workshop/setup-5-4-athena-skills-results.png)



---

[← 4.4. Setting up Glue Data Catalog and Athena](../) · [Workshop contents](../../) · [Previous step](../5.4.1-step1/)
