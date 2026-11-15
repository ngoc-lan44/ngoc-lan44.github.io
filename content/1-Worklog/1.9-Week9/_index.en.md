---
title: "Week 9: Python SDK and DynamoDB transactions"
menuTitle: "Worklog Week 9"
date: 2026-11-08
weight: 9
chapter: false
pre: " <b> 1.9. </b> "
---

**Period:** 12/10/2026–16/10/2026.

#### Learning objectives

- Understand Python/Boto3 DynamoDB access.
- Understand atomic multi-item writes.

#### Topics studied

| Day | Learning activity | Start date | Completion date | Source |
| --- | --- | --- | --- | --- |
| Monday | Read the Boto3 resource and KeySchema in the Movies table-creation program. | 12/10/2026 | 12/10/2026 | [https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.1-createtable/](https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.1-createtable/) |
| Tuesday | Study loading moviedata.json with Python put_item calls. | 13/10/2026 | 13/10/2026 | [https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.6-loadsampledata/](https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.6-loadsampledata/) |
| Wednesday | Read the year-based movie query using KeyConditionExpression. | 14/10/2026 | 14/10/2026 | [https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.7-querydata/](https://000060.awsfcaj.com/3-gettingstartedwithawssdk/3.2-pythonandynamodb/3.2.7-querydata/) |
| Thursday | Study TransactWriteItems all-or-nothing behavior. | 15/10/2026 | 15/10/2026 | [https://000039.awsfcaj.com/1-lhol/1.2/1.2.6/](https://000039.awsfcaj.com/1-lhol/1.2/1.2.6/) |
| Friday | Review transaction use for consistency across related records. | 16/10/2026 | 16/10/2026 | [https://000039.awsfcaj.com/1-lhol/1.2/1.2.6/](https://000039.awsfcaj.com/1-lhol/1.2/1.2.6/) |

#### Learning outcomes

- Understand that SDKs call services rather than store data.
- Understand all-or-nothing writes across related items.
