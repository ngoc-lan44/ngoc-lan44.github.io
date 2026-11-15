---
title: "Source releases and EC2 infrastructure"
date: 2026-11-11T00:00:00+07:00
weight: 1
chapter: false
pre: " <b> 4.6.1. </b> "
aliases:
  - "/en/5-workshop/5.11-ec2-deployment/"
  - "/en/5-workshop/5.11-ec2-deployment/5.11.1-step1/"
  - "/en/5-workshop/5.8-ec2-https/"
  - "/en/5-workshop/5.8-ec2-https/5.8.1-step1/"
  - "/en/5-workshop/5.11-ec2-deployment/5.11.5-step5/"
  - "/en/5-workshop/5.12-nginx-https/5.12.4-step4/"
  - "/4-workshop/4.10-ec2-deployment/4.10.1-step1/"
  - "/4-workshop/4.10-ec2-deployment/4.10.2-step2/"
  - "/4-workshop/4.10-ec2-deployment/4.10.3-step3/"
  - "/4-workshop/4.10-ec2-deployment/4.10.4-step4/"
  - "/4-workshop/4.10-ec2-deployment/"
---

### Role in the system

EC2 runs the data collection and processing pipeline, Streamlit Dashboard, and workers. The IAM Role grants programs on the server access to AWS services. IMDSv2 requires a session to access instance metadata, helping protect metadata and temporary credentials.

### Infrastructure management with CloudFormation

The **vn-it-job-market-ec2** stack manages the EC2 instance, IAM Role, and Security Group. The **vn-it-job-market-ec2-public** stack manages web ingress rules, separating access configuration from server infrastructure. CloudFormation manages these resources using the project's deployment configuration.

![The project's EC2 and public web stacks in CREATE_COMPLETE status](/images/workshop/setup-5-6-stacks.png)

**Outputs** provide the instance and security group IDs used for administration, SSM connections, and web access configuration.

![EC2 stack outputs: InstanceId and SecurityGroupId](/images/workshop/setup-5-6-stack-outputs.png)

### EC2 instance

| Component | Project configuration |
| --- | --- |
| EC2 | vn-it-job-market — i-0e6d841407d7baa32 |
| Region | ap-southeast-1 |
| Instance type | t3.small |
| OS and volume in the deployment records | Ubuntu 24.04, encrypted 30 GiB gp3 volume |
| Metadata | IMDSv2 Required |
| Stack | vn-it-job-market-ec2 |
| Source runtime | /opt/vn-it-job-market |

The source package is stored on S3 and transferred to EC2 during deployment. The CloudFormation stack manages EC2 infrastructure and its IAM Role according to the project configuration.

![AWS Console showing the Singapore Region, project EC2 instance, and attached IAM Role](/images/workshop/setup-5-6-01.png)

### Server storage

The **Amazon EBS gp3** volume stores the operating system, source code, Python environment, and processing data on EC2. EBS encryption protects data at rest.

![Encrypted 30 GiB EBS volume attached to the project instance](/images/workshop/setup-5-6-ebs-attachment.png)

![The project's 30 GiB Amazon EBS gp3 volume in use](/images/workshop/setup-5-6-ebs-gp3.png)

### Source package on S3

The **source.tar.gz** package contains the application code transferred to EC2 during deployment. Releases are stored separately under **deploy/ec2/** to identify the correct source package.

![The ec2 folder under deploy on S3](/images/workshop/setup-5-6-deploy-folder.png)

![Release folders under deploy/ec2](/images/workshop/setup-5-6-release-folders.png)

![source.tar.gz in its release folder on S3](/images/workshop/setup-5-6-source-archive.png)

The **Key** and **S3 URI** identify the exact object the server downloads during deployment.

![Properties and S3 path of source.tar.gz](/images/workshop/setup-5-6-source-properties.png)

The **SHA-256** check compares the package contents with the release identifier to detect an incorrect download or a modified package.

![SHA-256 verification of the S3 source package returning MATCH True](/images/workshop/setup-5-6-04.png)

### Source layout on the server

The source code is located at **/opt/vn-it-job-market**. **collectors** contains ITviec collection programs, **processors** handles data processing, and **dashboard** provides the Streamlit application. **.venv** supplies Python and libraries for the services; its release-specific symbolic link selects the dependencies for the deployed version. The source is owned by root, while services run as vnjob, separating service operation from permission to modify program files.

![Source layout and Python environment symbolic link on EC2](/images/workshop/setup-5-6-source-folders.png)





---

[← 4.6. Deploying source code and the runtime on EC2](../) · [Workshop contents](../../) · [Next step →](../5.6.2-step2/)
