const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'content');
function write(slug,title,body){
 const dir=path.join(root,slug),vi=fs.readFileSync(path.join(dir,'_index.vi.md'),'utf8');
 let fm=vi.match(/^---\n[\s\S]*?\n---/)[0].replace(/^title:.*$/m,`title: ${JSON.stringify(title)}`);
 const w=slug.match(/1-Worklog\/1\.(\d+)-Week/);if(w)fm=fm.replace(/^menuTitle:.*$/m,`menuTitle: "Worklog Week ${w[1]}"`);
 fs.writeFileSync(path.join(dir,'_index.md'),fm+'\n\n'+body.trim()+'\n');
}
const refs=`## References

- [First Cloud AI Journey](https://cloudjourney.awsfcaj.com/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- The internship outline and CloudDocs technical documentation.`;
const menu=`1. [Worklog](1-Worklog/)
2. [Proposal](2-Proposal/)
3. [Meetup events attended](3-EventParticipated/)
4. [Workshop](4-Workshop/)
5. [Self-evaluation](5-Self-evaluation/)
6. [Feedback and suggestions](6-Feedback/)`;
write('','Internship report',`# Internship report

## Student information

**Full name:** Trần Hải Lương

**Phone:** [0918285802](tel:0918285802)

**Email:** [tranhailuong0@gmail.com](mailto:tranhailuong0@gmail.com)

**Class:** K68CNTTA

**University:** Vietnam National University of Agriculture

**Major:** Information Technology

**Internship organization:** Amazon Web Services

**Internship period:** From 8 August 2026 to 31 October 2026.

<p style="text-align:center"><img src="/images/tran-hai-luong.png" alt="Trần Hải Lương" width="220" style="display:block;width:220px;max-width:100%;height:auto;margin:1.5rem auto" /></p>

## Report contents

${menu}`);
const lessons=[
 ['AWS overview and the internship environment',['Studied cloud computing, Regions, Availability Zones and the shared responsibility model.','Explored the AWS Management Console, service search and account management.','Reviewed CloudDocs and the relationship between file storage, databases and authentication.'],'Understood the roles of AWS service categories and the learning direction for the project.'],
 ['IAM and cost management',['Studied IAM users, groups, roles, policies and the principle of least privilege.','Learned account protection, credential management and the use of IAM roles.','Studied Billing, AWS Budgets and ways to track resources that incur charges.'],'Distinguished AWS access permissions from application user permissions and understood how to monitor learning-related costs.'],
 ['Amazon VPC and network connectivity',['Studied VPCs, subnets, route tables, Internet Gateways and security groups.','Examined the connection model between an EC2 application server and an RDS database.','Analyzed how to restrict access to application and MySQL ports.'],'Understood basic network structure and how to restrict connectivity between system components.'],
 ['Amazon EC2 and the application environment',['Studied EC2 instances, AMIs, EBS and instance profiles.','Examined Java 21, Spring Boot and how to run an application on a server.','Studied how Nginx serves static frontend files and proxies requests to the backend.'],'Understood server preparation and the CloudDocs frontend/backend deployment model.'],
 ['Amazon S3 and data protection',['Studied buckets, objects, Regions, storage classes and data encryption.','Examined Block Public Access, Object Ownership and policies scoped to documents/*.','Analyzed private S3 file storage and MySQL metadata management.'],'Understood how to organize S3 objects and control access to a private bucket.'],
 ['Presigned URLs and file transfers',['Studied presigned PUT/GET URLs and temporary access expiration.','Examined metadata creation, upload URL issuance, file PUT and HeadObject confirmation.','Studied CORS for GET/HEAD/PUT, HTTP 403 errors and expired URLs.'],'Explained the S3 upload, preview and download workflows used in CloudDocs.'],
 ['Amazon RDS MySQL and business data',['Studied RDS MySQL, endpoints, DB subnet groups, security groups and backups.','Examined metadata, ownership relationships, sharing permissions and audit logs.','Studied migrations, schema validation and TLS database connections.'],'Understood the role of RDS/MySQL and how to maintain consistency between metadata and S3 objects.'],
 ['Amazon Cognito and authentication',['Studied Cognito User Pools, public app clients and sign-in domains.','Examined Authorization Code + PKCE, JWT access tokens and callback/logout URLs.','Studied issuer/sub identity mapping and backend ADMIN/USER authorization.'],'Understood authentication and the distinction between Cognito identities and application permissions.'],
 ['Document permissions and storage quotas',['Studied OWNER, VIEW, DOWNLOAD and EDIT permissions and authorization before URL issuance.','Examined permission revocation, favorites, notifications and audit visibility.','Studied the USER quota of 100 GB, ADMIN quota of 1 TB and maximum file size of 100 MiB.'],'Understood how authentication, document authorization and storage limits work together in CloudDocs.'],
 ['AWS monitoring and community activities',['Studied CloudWatch Metrics, Logs, Alarms and the role of the CloudWatch Agent.','Distinguished infrastructure logs from CloudDocs business audit logs.','Attended Mini Meetup – First Cloud AI Journey at AWS Office, Grand Terra Tower, 36 Cát Linh, Hanoi.'],'Consolidated monitoring knowledge and gained experience participating in the First Cloud AI Journey community.'],
 ['Trash, work assignments and reports',['Studied soft deletion, restoration, permanent deletion and bulk document actions.','Examined assignment creation, document report submission, pending approval and change requests.','Studied late submission rules, private notifications and version checks for work-task updates.'],'Consolidated existing features and the relationships between documents, access permissions, quotas and audit records.'],
 ['Knowledge consolidation and report completion',['Consolidated knowledge of IAM, VPC, EC2, S3, RDS, Cognito and CloudWatch.','Completed the proposal and workshop guide based on the CloudDocs architecture.','Reviewed test scenarios, deployment documentation and further learning goals.'],'Completed a structured body of knowledge and reporting documents on AWS applications in CloudDocs.']
];
const dates=['08/08/2026','15/08/2026','22/08/2026','05/09/2026','12/09/2026','19/09/2026','26/09/2026','03/10/2026','10/10/2026','17/10/2026','24/10/2026','31/10/2026'];
let weekTable='| Week | Saturday worklog date | Topic |\n| --- | --- | --- |\n';
lessons.forEach((l,i)=>{
 weekTable+=`| ${i+1} | ${dates[i]} | [${l[0]}](1.${i+1}-Week${i+1}/) |\n`;
 write(`1-Worklog/1.${i+1}-Week${i+1}`,`Week ${i+1}: ${l[0]}`,`## Objectives

Study ${l[0].charAt(0).toLowerCase()+l[0].slice(1)} and apply this knowledge to the CloudDocs document management system.

**Worklog date:** Saturday, ${dates[i]}.

## Topics studied

| No. | Topic |
| --- | --- |
${l[1].map((t,j)=>`| ${j+1} | ${t} |`).join('\n')}

## Learning outcomes

${l[2]}

## Study materials

[First Cloud AI Journey — Cloud Journey](https://cloudjourney.awsfcaj.com/) and official AWS documentation for the relevant services.`);
});
write('1-Worklog','Worklog',`# Worklog

This worklog records **twelve internship weeks (8 August–31 October 2026)** at Amazon Web Services. It focuses on studying AWS services through First Cloud AI Journey and applying this knowledge to the CloudDocs document management system.

${[
 'Understood AWS fundamentals and became familiar with the internship environment',
 'Understood IAM, access permissions and cost management',
 'Learned VPC architecture, subnets and security groups',
 'Understood EC2, the Spring Boot environment and Nginx',
 'Learned how to store and protect documents in private S3',
 'Understood presigned URLs, CORS and file transfers',
 'Learned RDS MySQL, metadata and migrations',
 'Understood Cognito, PKCE and JWT authentication',
 'Learned document permissions and storage quotas',
 'Understood CloudWatch and attended the FCAJ Mini Meetup',
 'Understood trash, work assignments and report submission',
 'Consolidated knowledge and completed the proposal, workshop and report'
].map((result,i)=>`**Week ${i+1}:** [${result}](1.${i+1}-Week${i+1}/)`).join('\n\n')}`);
write('2-Proposal','Proposal',`This section presents **CloudDocs — Enterprise document management on the AWS cloud**.

# CloudDocs — Enterprise document management on AWS
## A solution combining Spring Boot, MySQL, S3 and Cognito

### 1. Executive summary

CloudDocs centralizes documents and work-processing workflows in a web application. ADMIN manages accounts, documents and announcements; USER manages owned or shared documents. Java 21/Spring Boot 3.5.6 provides REST APIs and authorization; HTML/CSS/JavaScript provides the frontend; MySQL stores metadata, sharing relationships, quotas and business audit records. Files are stored in private S3, with authentication through a Cognito User Pool.

The target architecture uses EC2 for the application and Nginx, RDS MySQL for the database and an IAM role for S3 access. The application uses S3 for documents, Cognito for authentication and MySQL for business data.

### 2. Problem statement

*Current problems*

Documents scattered across personal devices or chat channels are difficult to find, authorize and trace to the person who changed them. Accidental deletion, excessive sharing, missing capacity controls and disconnected assignments and reports reduce traceability.

*Solution*

CloudDocs organizes documents by metadata and department and supports search/filtering, preview, download, permission-based sharing, favorites and trash. The backend checks permissions before issuing time-limited URLs; files move directly between the browser and S3. MySQL stores business data and audit records. Assignment creation, report submission, approval and change requests are extensions available in the early-November release.

*Benefits and return on investment (ROI)*

- Reduce manual searching and sharing; measure the time required for the same scenario before and after adoption.
- Separate file contents from metadata for clearer data management and fewer file transfers through the backend.
- Use trash and audit records to handle mistakes; apply account quotas to control allocations.
- Financial ROI and savings rates have not been measured. Costs are modeled from assumptions and compared with Billing during deployment.

### 3. Solution architecture

![CloudDocs architecture](/images/vietnam-it-job-market-architecture.en.svg)

*AWS services used or planned for operation*

| Category | Component | Role and status |
| --- | --- | --- |
| Compute | Amazon EC2, Nginx | Target hosting environment; verify the deployed instance |
| Database | Amazon RDS for MySQL | Metadata, users, permissions and audit; RDS operation was reported by the user |
| Storage | Amazon S3 | Private bucket, signed PUT/GET and object confirmation; integrated in the code |
| Identity | Amazon Cognito User Pool | PKCE sign-in and access token issuance; integrated in the code |
| Security/network | IAM Role, VPC, Security Group | Resource permissions and network restrictions configured per environment |
| Operations | CloudWatch, Budgets | Resource monitoring, log collection and budget tracking |

*Component design*

- **Frontend:** static web interface; the Cognito public client has no client secret. Configure callback, logout and API_BASE for each environment.
- **Backend:** validate JWTs, read current roles/status from MySQL, check owner_id and document permissions, and manage upload state and quotas.
- **RDS/MySQL:** store users, documents, permissions, favorites, notifications, audit and work_tasks according to the current schema.
- **S3:** UUID object keys; original names remain in metadata. Workflow: metadata → signed PUT → S3 PUT → upload-complete/HEAD; signed GET is issued after authorization.
- **Cognito:** link identities by issuer/sub rather than email; distinguish ADMIN/USER system roles from OWNER/VIEW/DOWNLOAD/EDIT document permissions.
- **Legacy local workflow:** local file endpoints remain for compatibility. The current frontend uses S3; this does not imply that every historical file has been migrated.

### 4. Technical implementation

*Implementation stages*

1. Analyze business needs, study AWS and design the permission matrix.
2. Develop the ERD, backend/frontend and metadata APIs; manage source code with Git.
3. Integrate private S3, CORS, presigned URLs, sharing and audit; prepare test cases.
4. Prepare EC2/RDS, the IAM role, Nginx configuration and environment variables.
5. Integrate Cognito and run integration tests according to actual progress; extend quotas, trash and work-task workflows in the following stage.

*Technical requirements*

- Java 21, Maven, MySQL 8 and Node.js for serving the frontend/testing; the frontend is not React and has no npm build step.
- A valid base schema and any missing incremental migrations. The application uses ddl-auto=validate and does not create an empty database automatically.
- AWS account, S3 bucket, Cognito pool/client/domain and RDS endpoint; EC2 and an IAM role when deploying to AWS.
- Keep passwords, access keys, tokens and client secrets out of the repository. Deployment database connections require TLS; local settings must not be copied unchanged to AWS.

### 5. Roadmap and milestones

| Stage | Saturday sessions | Topics |
| --- | --- | --- |
| AWS fundamentals | 08/08, 15/08, 22/08 | Overview, IAM, costs and VPC |
| Servers and storage | 05/09, 12/09, 19/09 | EC2, S3 and presigned URLs |
| Data, authentication and monitoring | 26/09, 03/10, 10/10, 17/10 | RDS, Cognito, permissions, CloudWatch and meetup |
| Application research and consolidation | 24/10, 31/10 | Work tasks, reports and knowledge consolidation |

Twelve internship sessions were completed from 8 August to 31 October 2026. The 29 August session, in the week containing 1 September, was skipped.

### 6. Budget estimate

*Demo assumptions:* one EC2 instance, one Single-AZ RDS MySQL instance, 5 GB of S3 files, 20 GB of EBS, approximately ten users and 160 infrastructure operating hours per month for learning. These are modeling assumptions, not measured usage or an AWS quotation.

| Item | Calculation for AWS Pricing Calculator |
| --- | --- |
| EC2 compute | Hourly instance price × 160 hours; compare with 730 hours for continuous operation |
| EBS | 20 GB × price per GB-month, including periods when EC2 is stopped |
| RDS compute | Hourly DB instance price × actual operating hours |
| RDS storage/backup | Allocated capacity × price per GB-month, plus billable backups/snapshots |
| S3 | 5 GB-month + PUT/GET/HEAD requests + actual data transfer |
| Public IPv4 and networking | Number of IPs × billable hours; add NAT Gateway or endpoints if used |
| Cognito | Monthly active users and the account's selected features/tier |
| CloudWatch/Budgets | Log volume, retention, metrics/alarms and selected budget features |
| Domain/HTTPS | Include only selected services; do not assume Route 53/ALB is used |
| Total | Sum all items using the Region, configuration and prices at the estimation date |

The budget depends on Region, resource configuration, operating time and prices at deployment. Estimates are prepared with [AWS Pricing Calculator](https://calculator.aws/), while actual usage is tracked through AWS Billing. Storage, snapshots and IP addresses are accounted for separately according to the configuration.

### 7. Risk assessment

*Risk matrix*

| Risk | Impact | Qualitative likelihood |
| --- | --- | --- |
| S3 failures caused by incorrect IAM, CORS or Region | High | Medium |
| RDS connection failure or incorrect schema | High | Medium |
| Incorrect callback, issuer or app client | High | Medium |
| Metadata/object inconsistency after failed uploads | High | Medium |
| Previously issued URLs remain valid after permission revocation | Medium | A property of the current design |
| Repeated migrations or execution against the wrong database | High | Medium |
| Charges from retained resources | Medium | Medium |

*Mitigation strategy*

Keep the bucket private, scope the IAM role to the required prefix, authorize requests in the backend and use short-lived URLs. Back up the database, preflight migrations, verify objects with HEAD and test with different accounts. Restrict security groups to permitted sources, use TLS for RDS and keep secrets outside source code. Track costs and clean up demo resources after use.

*Contingency plan*

Retain the previous build, database backup and controlled environment configuration. If EC2 is unavailable, demonstrate the local application connected to authorized services and identify the demonstration environment accurately. Do not restore a database over active data without a controlled procedure; test restoration on a separate copy first.

### 8. Expected outcomes

*Technical improvements*

- Demonstrate sign-in, upload, preview/download, sharing/revocation and audit using both system roles.
- Verify quotas, trash, restoration and permanent deletion against metadata/S3.
- Demonstrate assignments, report submission, pending approval, change requests and late submission in the extended release.
- Provide deployment instructions, environment configuration and test scenarios matching the actual source code.

*Long-term value*

Develop skills in backend engineering, authentication, authorization, relational data, object storage and independent architecture research. Possible extensions include automated deployment, improved resilience, file scanning, report versioning and monitoring; count them as completed outcomes only after implementation.

${refs}`);

write('3-EventParticipated','Meetup events attended',`# Meetup events attended

During my internship, I attended community events that offered memorable experiences, useful new knowledge and valuable moments.

| Event | Date | Role |
| --- | --- | --- |
| [Mini Meetup – First Cloud AI Journey](3.1-Event1/) | 17/10/2026 | Attendee |`);
write('3-EventParticipated/3.1-Event1','Mini Meetup – First Cloud AI Journey',`# Event 1

| Field | Details |
| --- | --- |
| Event name | Mini Meetup – First Cloud AI Journey |
| Date | 17/10/2026 |
| Location | AWS Office – Grand Terra Tower, 36 Cát Linh, Hanoi |
| Organizer | First Cloud AI Journey community (FCAJ) |
| Role | Attendee |

## Connection to the internship

The event was a community activity during the CloudDocs internship, complementing independent learning and project development. Its connection to this report centers on learning, exchanging ideas and proactively exploring cloud technologies.`);

const workshops=[['4.1-Workshop-overview','Workshop overview'],['4.2-Prerequisites','Environment preparation'],['4.3-IAM-VPC','IAM, VPC and secure connectivity'],['4.4-S3','Private S3 and CORS configuration'],['4.5-RDS','RDS MySQL, schema and migrations'],['4.6-Cognito','Cognito and user authentication'],['4.7-EC2-Operations','EC2, Nginx and operations'],['4.8-Smoke-Test','Business and integration testing'],['4.9-Teardown','Cleanup and handover']];
write('4-Workshop','Workshop',`# Deploying CloudDocs on AWS

This workshop guides independent study and practical work from preparation through testing and handover, following the project's architecture: **EC2/Nginx + Spring Boot + RDS MySQL + private S3 + Cognito**.

| Section | Topic |
| --- | --- |
${workshops.map(w=>`| ${w[0].split('-')[0]} | [${w[1]}](${w[0]}/) |`).join('\n')}

## Completion criteria

The application runs in the recorded environment; authentication works; upload/preview/download and sharing enforce permissions; MySQL/S3 are consistent in the tested scenarios; logs and actual test results are available.

${refs}`);
write('4-Workshop/4.1-Workshop-overview','Workshop overview',`# Deploying CloudDocs on AWS

## Objectives

Deploy a document management application with EC2, RDS MySQL, private S3 and Cognito; understand each component's responsibilities, verify permissions and collect evidence.

![CloudDocs architecture](/images/vietnam-it-job-market-architecture.en.svg)

## Processing flow

1. The browser signs in through Cognito using Authorization Code + PKCE and receives an access token.
2. The frontend calls the Spring Boot API through Nginx; the backend validates the token and MySQL account status.
3. Create metadata, check the quota and issue a PUT URL. The browser uploads directly to S3.
4. Call upload-complete; the backend sends HEAD to verify the object and confirm its size.
5. For preview/download, the backend checks current permissions before issuing a time-limited GET URL.
6. Sharing, audit, quotas and business state are managed by the backend/MySQL.

## Current release scope

The application includes documents, sharing, favorites, notifications, accounts and storage usage. The early-November update adds trash, bulk actions and work tasks/reports. Notifications are stored in the database; SNS, SQS, SES and WebSocket are not implicitly included. Automatic deadline reminders and a separate report-version history are not implemented.

**Completion evidence:** an actual application URL, health/API results, sign-in and S3 upload screenshots, and tests with two accounts. Hide passwords, tokens and signed URLs in the evidence.`);
write('4-Workshop/4.2-Prerequisites','Environment preparation',`## Prerequisites

| Component | Preparation |
| --- | --- |
| Repository | The current CloudDocs version, including Back_end, FrontEnd and scripts |
| Tools | Git, Java 21, Maven, MySQL client and Node.js; AWS CLI if using command-line operations |
| Database | An export of the existing schema and authorized test data |
| AWS | Permission to create/manage resources in the assigned demo environment |
| Environment | S3/RDS/EC2 Region; Cognito's own Region and issuer |
| Domain | Intended HTTPS origin and exactly matching callback/logout URLs |

Do not assume S3 and Cognito use the same Region: existing settings may differ. The backend uses AWS_REGION for S3; COGNITO_ISSUER_URI must identify the actual User Pool.

## Check the local source version

Run these commands in the CloudDocs application repository, not in the report website directory:

~~~powershell
java -version
mvn -version
node --version
mvn -f Back_end/pom.xml package
node --test FrontEnd/tests/*.test.cjs
~~~

Build/test commands do not establish connectivity to actual AWS resources. Save results and the commit version; record passing test counts only after execution.

## Run a local reference version

1. Import the correct schema and required migrations as described in the RDS section.
2. Configure the Cognito public client/callback in FrontEnd/js/cognito-config.js and API_BASE in app.js.
3. Use scripts/start-local-backend.ps1, which prompts for the database password. If using another pool, update issuer/client/UserInfo together; the current script assigns specific development values.
4. Use scripts/start-frontend.ps1 or node scripts/serve-frontend.cjs and open the printed URL.
5. Check /api/health and sign in. Local execution still uses Cognito; there is no alternative local-password sign-in mechanism.

**Output:** verified environment, commit, schema and public configuration. Keep secrets out of the report.`);
write('4-Workshop/4.3-IAM-VPC','IAM, VPC and secure connectivity',`## 1. Select the account and network

Identify the account/Region and add Project=CloudDocs and Environment=demo tags to supported resources. Use an appropriate existing VPC or create a lab VPC: EC2 needs a subnet with suitable outbound connectivity; RDS needs a DB subnet group covering subnets in at least two Availability Zones. A Single-AZ RDS instance still requires a valid subnet group.

## 2. Security groups

| Group | Intended inbound access | Notes |
| --- | --- | --- |
| clouddocs-web-sg | Port 443 from users; port 80 for redirects/certificate issuance if needed | Nginx terminates TLS; do not expose port 8080 |
| clouddocs-db-sg | Port 3306 from clouddocs-web-sg | Do not expose MySQL to the entire Internet |
| Administration | Session Manager with the required permissions/connectivity; IP-restricted SSH if needed | Session Manager does not work without its prerequisites |

A private RDS instance cannot be reached directly from a laptop over the Internet. Use an authorized administrative path such as a tunnel, SSM, VPN or operations from EC2; do not make it public simply to bypass a network error.

## 3. EC2 IAM role

Create a role trusted by EC2 and attach a policy scoped to the project's bucket/prefix. Replace ACCOUNT/BUCKET for the deployment environment before applying the example:

~~~json
{
  "Version": "2012-10-17",
  "Statement": [
    {"Effect":"Allow","Action":"s3:ListBucket","Resource":"arn:aws:s3:::YOUR_BUCKET","Condition":{"StringLike":{"s3:prefix":["documents","documents/*"]}}},
    {"Effect":"Allow","Action":["s3:GetObject","s3:PutObject","s3:DeleteObject"],"Resource":"arn:aws:s3:::YOUR_BUCKET/documents/*"}
  ]
}
~~~

Attach the role using an instance profile; the backend uses the default credential provider chain. HeadObject requires GetObject permission. SSE-KMS requires appropriate KMS permissions and key policy. Do not send AWS access keys to the frontend.

## 4. Cross-account access, if applicable

Configure this only for the actual deployment accounts. AssumeRole requires the trust policy, sts:AssumeRole permission and matching credential flow; a policy on only one side is insufficient. Direct resource-policy access requires checking both the role and bucket policies. This is an environment-dependent deployment option, not an assumed existing configuration.

**Verification:** EC2 reaches RDS through the correct security groups; the backend has Get/Put/Delete access to the project prefix; public origins cannot access database/backend ports.`);
write('4-Workshop/4.4-S3','Private S3 and CORS configuration',`## 1. Create or verify the bucket

In the S3 Console, select the project bucket in the agreed Region. Keep **Block Public Access**, **Bucket owner enforced** Object Ownership and default encryption enabled. Review existing data before changing an active bucket. Do not enable public website hosting for the document bucket.

The backend uses the documents/ prefix and UUID keys. Policy, CORS and script examples are in Back_end/aws/s3. Running these tools changes infrastructure; they are not mandatory application startup steps.

## 2. Configure CORS for the actual origin

Example for S3 Console → Permissions → CORS; replace the origin:

~~~json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD", "PUT"],
    "AllowedOrigins": ["https://YOUR_FRONTEND_HOST"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
~~~

The Console expects the **array of rules** shown above. AWS CLI JSON wraps rules in a CORSRules object, as in the repository example. For local development, add the exact active origin, such as http://localhost:5500 or http://127.0.0.1:5500. CORS does not replace IAM or make a bucket public.

## 3. Backend configuration

| Variable | Required value |
| --- | --- |
| AWS_REGION | Actual bucket Region |
| S3_BUCKET | The project's bucket name |
| S3_PRESIGN_EXPIRY | Lifetime in seconds; current default is 900 and may be reduced as required |

## 4. Test the normal workflow

1. Sign in and create metadata with POST /api/documents.
2. Call POST /api/documents/{id}/upload-url; use the current UI/DTO rather than guessing JSON fields.
3. The frontend sends the File with PUT to the S3 URL, preserving signed headers.
4. Call POST /api/documents/{id}/upload-complete; the backend verifies the object with HEAD and confirms its size.
5. Request GET preview-url/download-url using an authorized account and open the newly issued URL.

**Expected result:** the private object exists, metadata confirms the upload and unshared accounts are denied access. Previously signed URLs may remain usable until expiration; temporary credential expiration can invalidate them earlier.

## Common errors

For HTTP 403, check the signing principal, policy, prefix, Region, headers and expiration. For CORS, compare the complete scheme/host/port origin and test in a browser. When metadata exists but the file is missing, do not treat the upload as complete; handle the pending allocation through the application workflow.

See [CORS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html) and [presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html).`);
write('4-Workshop/4.5-RDS','RDS MySQL, schema and migrations',`## 1. Prepare RDS

Create or verify a MySQL instance compatible with the application in the RDS Console. Select the prepared VPC/subnet group and database security group; configure storage, backup retention and password management for the environment. Describe a Single-AZ lab accurately rather than calling it Multi-AZ. Record the endpoint, port and schema name in configuration management.

## 2. Import the base schema

The repository **does not include a complete empty-database installer**. Use a verified schema export, check for sensitive data and import into a test database first. Base business tables such as users/documents/audit_logs must exist. Do not apply incremental migrations to an empty database or enable ddl-auto=update merely to bypass validation failures.

## 3. Review migrations

| Order | File in Back_end/db/migration | Purpose |
| --- | --- | --- |
| 0 | 00_PRECHECK.sql | Check legacy owner references |
| 1 | 01_APPLY_document_permissions.sql | owner_id and sharing permissions |
| 2 | 02_APPLY_document_favorites.sql | Favorites |
| 3 | 03_APPLY_notifications.sql | Global announcements |
| 4 | 04_APPLY_cognito_identities.sql | issuer/sub identity mapping |
| 5 | 05_APPLY_optional_contact_email.sql | Optional contact email |
| 6 | 06_APPLY_work_tasks.sql | Work tasks and recipient notifications; part of the November update |

Apply only missing steps after backing up and preflighting the correct database. Migration 04 and share-cognito-identities.sql are alternative ways to create the same table; do not run them consecutively. MySQL DDL may commit automatically, so ROLLBACK does not undo every ALTER/CREATE.

## 4. Connect the application

Set DB_HOST, DB_PORT, DB_NAME, DB_USERNAME and DB_PASSWORD outside source code. Give the application user only required privileges and keep it separate from the migration administrator.

**TLS:** the current application.yml contains a local JDBC URL with useSSL=false. For AWS, override SPRING_DATASOURCE_URL with an RDS JDBC URL using sslMode=VERIFY_IDENTITY and configure the correct RDS CA bundle/JVM truststore. Verify the SSL session; changing DB_HOST alone does not establish encryption.

## 5. Verification

Start the backend with the verified schema and confirm that ddl-auto=validate reports no missing tables/columns. Perform authorized test reads/writes, check metadata/audit and capture results with sensitive information hidden. Test backup restoration on a separate database before claiming recovery has been verified.`);
write('4-Workshop/4.6-Cognito','Cognito and user authentication',`## 1. User Pool and public app client

Create or verify the User Pool, domain and web app client. Use a **public client without a client secret**, Authorization Code grant and PKCE. Callback/logout settings must exactly match actual URLs; use HTTPS for deployment. Select scopes appropriate to UserInfo, usually openid, profile and email according to the application. Do not enable unnecessary grants.

## 2. Consistent configuration

| Location | Configuration |
| --- | --- |
| FrontEnd/js/cognito-config.js | Domain, client ID, redirectUri/logoutUri and scopes using the actual file structure |
| Backend COGNITO_ISSUER_URI | Issuer https://cognito-idp.REGION.amazonaws.com/POOL_ID |
| Backend COGNITO_CLIENT_ID | Corresponding public app client ID |
| Backend COGNITO_USER_INFO_URI | UserInfo domain for the actual pool |
| Backend CORS_ALLOWED_ORIGINS | Actual frontend origin |

Do not copy the development issuer/client into another pool's configuration. Read the values assigned by local scripts rather than assuming externally supplied environment variables remain unchanged.

## 3. Backend validation and internal identities

The backend validates the JWT signature, issuer, validity period, token_use=access, client_id and sub. The system maps issuer/sub to a MySQL account and reads its current role/status. Email and full name are profile data, not substitutes for the identity key.

New accounts receive USER. Review Back_end/db/bootstrap-cognito-admin.sql to bootstrap the first ADMIN; do not arbitrarily edit shared database data. The template defaults to NULL targets/ROLLBACK so the operator can inspect it first.

## 4. Testing

Test sign-in, callback, GET /api/auth/me and logout. Missing, invalid or expired tokens must be rejected; USER must not call administrative APIs; locked/DELETED accounts must be denied business access. Logout does not instantly invalidate every access-token copy; document the actual behavior accurately.

See [Cognito PKCE](https://docs.aws.amazon.com/cognito/latest/developerguide/using-pkce-in-authorization-code.html).`);
write('4-Workshop/4.7-EC2-Operations','EC2, Nginx and operations',`## 1. Prepare the server

Create or verify an appropriate Linux EC2 instance, S3 instance profile and network security group. Install Java 21 and Nginx using packages appropriate to the OS. Build the JAR in a verified environment and transfer it and FrontEnd to the server. The current frontend needs neither npm install nor npm build. Do not serve the entire repository through the web server.

## 2. Backend environment configuration

Keep configuration in an environment file readable only by the operator, outside the web root and repository. Minimum variables:

| Variable | Purpose |
| --- | --- |
| SPRING_PROFILES_ACTIVE=aws | Deployment profile |
| DB_HOST / DB_PORT / DB_NAME / DB_USERNAME / DB_PASSWORD | Database connection |
| SPRING_DATASOURCE_URL | TLS JDBC override described in the RDS section |
| AWS_REGION / S3_BUCKET / S3_PRESIGN_EXPIRY | Environment-specific S3 settings |
| COGNITO_ISSUER_URI / COGNITO_CLIENT_ID / COGNITO_USER_INFO_URI | Authentication against the correct pool |
| CORS_ALLOWED_ORIGINS | Frontend origin |
| PORT=8080 | Backend accessed only through the reverse proxy |

Replace paths and the actual JAR in this systemd example. Create the clouddocs system user first and grant it access to configuration and application files. An example JAR name is not a command that can be used unchanged in every environment.

~~~ini
[Unit]
Description=CloudDocs backend
After=network-online.target
Wants=network-online.target

[Service]
User=clouddocs
WorkingDirectory=/opt/clouddocs
EnvironmentFile=/etc/clouddocs/backend.env
ExecStart=/usr/bin/java -jar /opt/clouddocs/backend.jar
Restart=on-failure
RestartSec=5
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
~~~

Rename the tested deployment build to backend.jar and verify that /usr/bin/java is Java 21. Run systemctl daemon-reload and enable/start according to the administration procedure, then inspect journalctl -u clouddocs for errors. Keep passwords/tokens out of logs.

## 3. Serve the frontend and proxy with Nginx

Example **inside an HTTPS server with a valid certificate**; replace the domain, certificate and directories for the actual server:

~~~nginx
root /var/www/clouddocs;
index index.html;

location / {
    try_files $uri $uri/ =404;
}
location /api/ {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
~~~

Copy the **contents of FrontEnd** into the web root in this example. If the callback uses /FrontEnd/, preserve that prefix in directory/Nginx configuration; changing Cognito alone is insufficient. Set API_BASE for the actual hostname/backend. Run nginx -t before reloading. Redirect port 80 to HTTPS according to environment policy; a domain/certificate is a prerequisite rather than an assumed existing resource.

## 4. Monitoring, backups and costs

Basic EC2 CloudWatch monitoring includes CPU, network and status checks. RAM, filesystem and application logs require the agent, permissions and suitable networking. Set retention, generate a controlled error and verify that its log arrives. Configure RDS backup/snapshot retention and test restoration on a copy. Set a budget with the appropriate account, recipient and threshold; Budgets is not a switch that automatically stops every resource.

Secrets Manager may be added later, but the application currently reads environment variables. Creating a secret does not automatically make Spring Boot retrieve it.

## 5. Deployment evidence

Record the EC2 instance, commit/JAR, deployment time, HTTPS URL, /api/health, RDS connection, S3 upload and Cognito sign-in. Use endpoints, hostnames and screenshots from the actual CloudDocs environment under test.`);
write('4-Workshop/4.8-Smoke-Test','Business and integration testing',`## Test prerequisites

Prepare at least one ADMIN and two active USER accounts linked to Cognito, an authorized small file, an empty file and an oversized file for rejection tests. Use test data and record the commit, environment, tester and time. The following table lists **scenarios and expected results**, not preassigned passing outcomes.

| ID | Scenario | Expected result |
| --- | --- | --- |
| AUTH-01 | Missing, invalid or expired access token | Business API rejects the request without exposing content |
| AUTH-02 | USER calls an administrative API | Access denied |
| DOC-01 | Create metadata, PUT to S3 and confirm upload | Object exists; metadata is correct and readable |
| DOC-02 | Concurrent uploads with identical filenames | Distinct object keys; no unintended overwrite |
| DOC-03 | Failed/missing PUT followed by confirmation | Missing object is not confirmed; allocation remains tracked |
| DOC-04 | Zero-byte file | Preview/download handles the file appropriately for its format |
| DOC-05 | File exceeds 100 MiB or the account quota | Rejected; allocations remain within the quota |
| ACL-01 | Grant VIEW to USER B | B can preview but cannot obtain download/edit access |
| ACL-02 | Grant DOWNLOAD/EDIT | Only the corresponding actions are allowed; sharing administration is not implied |
| ACL-03 | USER C has no share | API denies preview/download/edit |
| ACL-04 | Revoke B's permission | New URL requests are blocked; previously issued URLs may remain valid until expiration |
| TRASH-01 | Owner moves a file to trash | Preview/download/edit/share are blocked; quota still includes the file |
| TRASH-02 | Restore a file | Returns to ACTIVE and preserves earlier shares as designed |
| TRASH-03 | Permanently delete a test file | Object/permissions removed; metadata becomes PURGED with size 0; audit retained |
| BULK-01 | Select multiple files including one permission failure | Show individual success/failure and allow retrying failed items |
| QUOTA-01 | Pending uploads, trash and shared documents | Pending/trash count against the owner; sharing does not multiply allocation |
| AUDIT-01 | USER/ADMIN reads audit records | USER sees their own actor events; ADMIN sees system-wide events |
| TASK-01 | ADMIN assigns work; USER submits a valid document | Private notification and SUBMITTED/pending approval status |
| TASK-02 | Creator requests changes, then approves | Only authorized actor proceeds; feedback, audit and notifications recorded |
| TASK-03 | Submit after the deadline | Submission accepted and labeled late; reviewer delay does not make a pending approval overdue |
| TASK-04 | Two tabs use an outdated version | HTTP 409; user must reload current data |
| TASK-05 | Delete/overwrite a SUBMITTED/COMPLETED report file | API blocks the operation using the current release's guard |
| TASK-06 | Delete one or multiple tasks | Only the assigning ADMIN; retain documents/permissions/audit and handle related notifications |
| USER-01 | Delete an account with files or unfinished tasks | Blocked according to current conditions |

## Automated tests and limitations

In the CloudDocs repository, run mvn -f Back_end/pom.xml test and node --test FrontEnd/tests/*.test.cjs. Tests using mock repositories/AWS clients do not verify live RDS migrations, row locking, Cognito redirects, S3 CORS or browser PDF rendering. Record results for each test execution.`);
write('4-Workshop/4.9-Teardown','Cleanup and handover',`## Before cleanup

Clean up only authorized demo resources. Check whether resources are still needed for the project through 28 November; do not remove shared infrastructure at the end of an individual workshop session. Inventory resource IDs, Regions/accounts, ownership and data to retain. This guide does not execute AWS resource deletions.

## Handover

Keep the commit/JAR and startup instructions, a secret-free configuration inventory, applied schema/migrations, test results and evidence. Store backups only in approved locations and test restoration on a copy. Signed URLs and access tokens are not handover materials.

## Demo cleanup sequence after confirmation

1. Stop application access/processes and record configuration that must be retained.
2. Back up the database if needed, then remove the designated demo RDS instance; check final snapshots and retained backups for continuing charges.
3. Handle identified S3 test files. If Versioning is enabled, review versions and delete markers separately; deleting the current object does not delete every version.
4. Terminate demo EC2 instances when no longer needed; check retained EBS, snapshots and public IPv4/Elastic IPs.
5. Delete demo Cognito pools/clients only when no longer used; retain any pool still used by the project.
6. Review CloudWatch log groups/alarms, networking such as NAT/endpoints, IAM roles/policies and other resources actually created.
7. Check Billing across Regions after updates propagate. Stopping EC2 does not eliminate charges for retained EBS, snapshots or allocated IPs.

**Expected result:** a handover record and retained/deleted resource inventory. Do not claim zero costs before reconciling the bill.`);
write('5-Self-evaluation','Self-evaluation',`# Self-evaluation

During my internship at Amazon Web Services, I focused on cloud computing and applying AWS services to CloudDocs. Learning used First Cloud AI Journey materials, AWS technical documentation and application source-code research.

| Area | Self-evaluation |
| --- | --- |
| Technical knowledge | Consolidated IAM, VPC, EC2, S3, RDS, Cognito and CloudWatch knowledge and understood each service's role in the architecture. |
| Independent learning | Proactively read documentation, summarized concepts and connected knowledge to CloudDocs workflows. |
| Problem-solving | Analyzed permission, networking, authentication, CORS and data-related issues. |
| Learning discipline | Maintained Saturday summaries and independent study during the remaining time. |
| Presentation and documentation | Practiced writing structured worklogs, proposals and workshop instructions. |

## Areas for improvement

Further practice is needed in production operations, cost optimization and deployment troubleshooting. Backup, restoration and monitoring also require continued hands-on work for deeper understanding.

## Next steps

Continue developing Backend and Cloud skills, including security, integration testing, system operations and deployment automation.`);
write('6-Feedback','Feedback and suggestions',`# Feedback and suggestions

Studying CloudDocs helped me connect web development, databases, authentication and cloud services in a document management problem. A feature is complete only when the frontend, backend, access permissions, data and deployment environment work consistently together.

## Suggestions from the project

- Organize personal knowledge of the backend, frontend, Cognito, infrastructure and testing; keep notes and evidence for each learning milestone.
- Align schema/migrations, environment variables and commit versions before integration to reduce environment mismatches.
- Add discussions on IAM, CORS, Cognito callbacks and RDS connectivity because these directly affect application workflows.
- Review budgets, test data and handover plans from the start; keep timely worklogs rather than reconstructing them at the end.

## Future direction

Complete testing in the actual deployment environment, verify backup/restoration and measure costs. CI/CD, file scanning and report versioning should be treated as extensions when time and implementation evidence are available.`);

const svgTranslations={
 'CloudDocs · Kiến trúc triển khai mục tiêu':'CloudDocs · Target deployment architecture',
 'EC2/RDS: đối chiếu môi trường · S3/Cognito: đã có mã tích hợp':'EC2/RDS: verify environment · S3/Cognito: integrated in code',
 'VPC · RDS chỉ nhận kết nối được cho phép':'VPC · RDS accepts authorized connections only',
 'Trình duyệt':'Browser','JWT · quyền · quota · audit':'JWT · permissions · quota · audit',
 'IAM instance role cho S3':'IAM instance role for S3','Metadata + quyền':'Metadata + permissions',
 'Users · audit · công việc':'Users · audit · work tasks','User Pool · xác thực':'User Pool · authentication',
 'Tệp · signed PUT / GET':'Files · signed PUT / GET','Ký URL / HEAD':'Sign URL / HEAD','Truyền tệp trực tiếp':'Direct file transfer',
 'Backend kiểm tra quyền trước khi cấp URL; MySQL không lưu nội dung tệp.':'Backend checks permissions before issuing URLs; MySQL does not store file contents.',
 'Cognito xác thực danh tính; backend quản lý quyền truy cập và dữ liệu nghiệp vụ.':'Cognito authenticates identities; backend manages permissions and business data.'
};
let diagram=fs.readFileSync(path.join(__dirname,'static/images/vietnam-it-job-market-architecture.svg'),'utf8');
for(const [vi,en]of Object.entries(svgTranslations))diagram=diagram.split(vi).join(en);
fs.writeFileSync(path.join(__dirname,'static/images/vietnam-it-job-market-architecture.en.svg'),diagram);
console.log('Completed full English translations for all 29 pages and the architecture diagram.');
require('./learning-worklog.cjs');
