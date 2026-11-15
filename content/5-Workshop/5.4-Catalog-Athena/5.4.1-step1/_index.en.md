---
title: "Database, source table and Athena configuration"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 4.4.1. </b> "
aliases:
  - "/en/5-workshop/5.6-glue-catalog/"
  - "/en/5-workshop/5.6-glue-catalog/5.6.1-step1/"
  - "/en/5-workshop/5.6-glue-catalog/5.6.2-step2/"
  - "/en/5-workshop/5.4-s3-glue-athena/5.4.2-step2/"
---

### Role in the system

Glue Data Catalog stores column names, data types and the Parquet location so that Athena can read S3 data correctly. Athena runs SQL queries for the dashboard; query results are stored separately under control/athena-results/, away from the analytical input data.

### Project database

The **vn_it_job_market** database groups job-data table and view definitions in Glue Data Catalog. Athena uses these definitions to identify the structure and location of the data to query. Parquet data is stored in S3; this database stores query metadata.

![Database vn_it_job_market trong AWS Glue Data Catalog](/images/workshop/setup-5-4-database.png)

### Source table and analytical views

The **itviec_current_jobs** table describes the job data in the Parquet file on S3. The **itviec_active_jobs** and **itviec_active_job_skills** views provide jobs and skills after moderation filtering for the dashboard's job list, KPIs and charts. **itviec_deleted_jobs** and **itviec_moderation_control_v3** help identify jobs to exclude from public results.

![Tables and views in the vn_it_job_market Glue Data Catalog database](/images/workshop/setup-5-4-tables.png)

### Configuration used

| Setting | Project value |
| --- | --- |
| Data source | AwsDataCatalog |
| Database | vn_it_job_market |
| Source table | itviec_current_jobs |
| Workgroup runtime | primary |
| Table location | s3://vn-it-job-market-data-381924757765-ap-southeast-1-an/analytics/itviec/ |
| Query result location | s3://vn-it-job-market-data-381924757765-ap-southeast-1-an/control/athena-results/ |

### Data location and table structure

The table's **Location** points to **analytics/itviec/** on S3, allowing Athena to locate the Parquet dataset. The **Schema** defines column names and data types so that job IDs, titles, skills, salaries and timestamps follow a consistent structure. The project table has **24 columns**; the first columns are **job_id**, **source_job_id** and **title**, all of type **string**.

![itviec_current_jobs table details, S3 Location and Schema in AWS Glue](/images/workshop/setup-5-4-table-details.png)

Columns are defined for their intended use: **salary_min/salary_max** are numeric for salary queries; **salary_available** is a boolean for filtering jobs with disclosed salaries; **skills** is an array for skill statistics; **experience_months** stores months of experience. **posted_date**, **expired_date** and **first_seen** support time filtering and job tracking.

![First Schema page of itviec_current_jobs showing columns 1 to 20](/images/workshop/setup-5-4-schema-page1.png)


![Second Schema page showing last_seen, status, source and url](/images/workshop/setup-5-4-schema-page2.png)






### Storing Athena query results

**control/athena-results/** stores query result files so that the application can retrieve the data returned by Athena. Keeping results separate from **analytics/itviec/** separates analytical input and output data. The application specifies this output location when submitting queries to Athena.

In the project bucket, **control/** groups operational data.

![The control folder in the project S3 bucket](/images/workshop/setup-5-4-results-bucket.png)

Within **control/**, **athena-results/** stores query results; **moderation/** and **moderation-backups/** store moderation data and backups.

![The athena-results folder inside control on S3](/images/workshop/setup-5-4-control-folder.png)

**.csv** files contain the rows returned by queries; their accompanying **.csv.metadata** files store result metadata used by Athena when reading results. Filenames based on query execution IDs link S3 results to Athena query history.

![Athena CSV result files and metadata under control/athena-results](/images/workshop/setup-5-4-athena-result-files.png)


---

[← 4.4. Setting up Glue Data Catalog and Athena](../) · [Workshop contents](../../) · [Next step →](../5.4.2-step2/)
