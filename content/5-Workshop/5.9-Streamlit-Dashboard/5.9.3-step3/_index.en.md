---
title: "Search, filter and view job details"
date: 2026-11-11T00:00:00+07:00
weight: 3
chapter: false
pre: " <b> 4.9.3. </b> "
aliases:
  - "/en/5-workshop/5.8-streamlit-dashboard/5.8.3-step3/"
  - "/en/5-workshop/5.8-streamlit-dashboard/5.8.5-step5/"
  - "/en/5-workshop/5.5-streamlit-dashboard/5.5.3-step3/"
  - "/en/5-workshop/5.5-streamlit-dashboard/5.5.5-step5/"
---

**Where:** Project website

### Objectives

Check the job search workflow after configuring the data sources.

### Prerequisites

The active job list has loaded.

### Procedure

1. Enter a job title or company keyword.
2. Select location, seniority, experience, company and salary availability filters.
3. Select View details on a row; check the title, company, job_id and ITviec URL.
4. Select another row to ensure the details change to the selected posting.
5. Try a keyword with no matches, then clear the filters to restore the list.

If the UI updates slowly after publication, check the data timestamp and cache before rerunning the pipeline. A successful health check confirms that the process responds; queries and application workflows require separate checks.

### Check the results

Search and filters return the appropriate data; job details and ITviec links match the selected posting. Empty results are handled without errors.

### Keyword search

The **Keyword** field searches job titles or companies to narrow the list to relevant postings. With **aws** entered, the KPIs, charts and job table update together to reflect the search results.

![KPIs after entering the keyword aws](/images/workshop/setup-5-9-search-kpi.png)

![Charts for search results matching aws](/images/workshop/setup-5-9-search-charts.png)

![Job list and salary disclosure for the keyword aws](/images/workshop/setup-5-9-search-results.png)

### Filter jobs by location

The location filter limits the dataset to the selected area. Selecting **Hà Nội** applies the same scope to KPIs, charts and the job list, allowing analysis and browsing of the same dataset.

![Dashboard KPIs with Hà Nội selected](/images/workshop/setup-5-9-filter-kpi.png)

![Charts updated for the Hà Nội filter](/images/workshop/setup-5-9-filter-charts.png)

![Salary disclosure chart and job list filtered by Hà Nội](/images/workshop/setup-5-9-filter-jobs.png)

### View job details

The details section helps users assess an opportunity through its company, location, salary, experience, seniority and employment type. The ITviec link opens the original posting. Save job and Apply connect to personal account features when the user is signed in.

![Details of SureFlow's IT Project Manager posting selected from the Hà Nội results, including its ITviec link](/images/workshop/setup-5-9-03.png)


---

[← 4.9. Configure and deploy the Streamlit Dashboard](../) · [Workshop contents](../../) · [Previous step](../5.9.2-step2/)
