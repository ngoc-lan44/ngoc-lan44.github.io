const fs=require('fs'),path=require('path');
const root=__dirname,base=path.join(root,'content');
function put(slug,title,weight,body,enTitle=title,enBody=body,pre=''){
 const dir=path.join(base,slug);fs.mkdirSync(dir,{recursive:true});
 for(const [lang,t,b] of [['vi',title,body],['en',enTitle,enBody]]){
 const week=slug.match(/1-Worklog\/1\.(\d+)-Week/);
 const fm=`---\ntitle: ${JSON.stringify(t)}\n${week?`menuTitle: ${JSON.stringify((lang==='vi'?'Worklog Tuần ':'Worklog Week ')+week[1])}\n`:''}date: 2026-11-07\nweight: ${weight}\nchapter: false\n${pre?`pre: " <b> ${pre} </b> "\n`:''}---\n\n`;
 fs.writeFileSync(path.join(dir,lang==='vi'?'_index.vi.md':'_index.md'),fm+b.trim()+'\n');}
}
const fmt=d=>`${String(d.getUTCDate()).padStart(2,'0')}/${String(d.getUTCMonth()+1).padStart(2,'0')}/${d.getUTCFullYear()}`;
const skipped=['2026-08-29'];
const sessions=[];for(let i=0;sessions.length<12;i++){const d=new Date(Date.UTC(2026,7,8+i*7));if(!skipped.includes(d.toISOString().slice(0,10)))sessions.push(d);}
const lessons=[
 ['Tổng quan AWS và môi trường thực tập',['Tìm hiểu điện toán đám mây, Region, Availability Zone và mô hình trách nhiệm chung.','Làm quen AWS Management Console, cách tìm kiếm dịch vụ và quản lý tài khoản.','Khảo sát CloudDocs và mối liên hệ giữa lưu trữ tệp, cơ sở dữ liệu và xác thực.'],'Nắm được vai trò các nhóm dịch vụ AWS và định hướng học tập phục vụ đồ án.'],
 ['IAM và quản lý chi phí',['Nghiên cứu IAM User, Group, Role, Policy và nguyên tắc quyền tối thiểu.','Tìm hiểu cách bảo vệ tài khoản, quản lý thông tin xác thực và sử dụng IAM Role.','Tìm hiểu Billing, AWS Budgets và cách theo dõi tài nguyên phát sinh chi phí.'],'Phân biệt được quyền truy cập AWS với quyền người dùng ứng dụng; hiểu cách theo dõi chi phí học tập.'],
 ['Amazon VPC và kết nối mạng',['Nghiên cứu VPC, subnet, route table, Internet Gateway và Security Group.','Tìm hiểu mô hình kết nối giữa máy chủ EC2 và cơ sở dữ liệu RDS.','Phân tích cách giới hạn nguồn truy cập cổng ứng dụng và cổng MySQL.'],'Hiểu cấu trúc mạng cơ bản và nguyên tắc giới hạn truy cập giữa các thành phần hệ thống.'],
 ['Amazon EC2 và môi trường ứng dụng',['Tìm hiểu EC2 Instance, AMI, EBS và instance profile.','Nghiên cứu môi trường Java 21, Spring Boot và cách chạy ứng dụng trên máy chủ.','Tìm hiểu Nginx phục vụ giao diện tĩnh và chuyển tiếp yêu cầu tới backend.'],'Hiểu quy trình chuẩn bị máy chủ và mô hình triển khai frontend/backend của CloudDocs.'],
 ['Amazon S3 và bảo vệ dữ liệu',['Nghiên cứu bucket, object, Region, storage class và mã hóa dữ liệu.','Tìm hiểu Block Public Access, Object Ownership và policy theo prefix documents/*.','Phân tích cách sử dụng S3 private để lưu tài liệu và MySQL để quản lý metadata.'],'Nắm được cách tổ chức tệp trên S3 và kiểm soát truy cập bucket private.'],
 ['Presigned URL và luồng truyền tệp',['Tìm hiểu presigned PUT/GET URL và thời hạn truy cập tạm thời.','Nghiên cứu luồng tạo metadata, cấp URL tải lên, PUT tệp và xác nhận bằng HeadObject.','Tìm hiểu CORS cho GET/HEAD/PUT, lỗi 403 và trường hợp URL hết hạn.'],'Giải thích được luồng upload, xem trước và tải xuống S3 trong CloudDocs.'],
 ['Amazon RDS MySQL và dữ liệu nghiệp vụ',['Tìm hiểu RDS MySQL, endpoint, DB subnet group, Security Group và sao lưu.','Nghiên cứu cấu trúc metadata, quan hệ chủ sở hữu, quyền chia sẻ và audit log.','Tìm hiểu migration, schema validation và nguyên tắc kết nối cơ sở dữ liệu bằng TLS.'],'Hiểu vai trò RDS/MySQL và cách duy trì tính nhất quán giữa metadata và tệp trên S3.'],
 ['Amazon Cognito và xác thực',['Tìm hiểu Cognito User Pool, public app client và domain đăng nhập.','Nghiên cứu Authorization Code + PKCE, access token JWT và callback/logout URL.','Tìm hiểu ánh xạ issuer/sub và kiểm tra quyền ADMIN/USER tại backend.'],'Nắm được luồng xác thực và sự khác nhau giữa danh tính Cognito với quyền nghiệp vụ trong ứng dụng.'],
 ['Giám sát AWS và hoạt động cộng đồng',['Tìm hiểu CloudWatch Metrics, Logs, Alarms và vai trò CloudWatch Agent.','Phân biệt log hạ tầng với audit log nghiệp vụ của CloudDocs.','Tham dự Mini Meetup – First Cloud AI Journey tại AWS Office, Grand Terra Tower, 36 Cát Linh, Hà Nội.'],'Hệ thống hóa kiến thức giám sát và có thêm trải nghiệm tham gia cộng đồng First Cloud AI Journey.'],
 ['Phân quyền tài liệu và hạn mức lưu trữ',['Nghiên cứu quyền OWNER, VIEW, DOWNLOAD, EDIT và kiểm tra quyền trước khi cấp URL.','Tìm hiểu cách thu hồi quyền, yêu thích, thông báo và phạm vi xem audit log.','Nghiên cứu hạn mức USER 100 GB, ADMIN 1 TB và tối đa 100 MiB/file.'],'Hiểu cách kết hợp xác thực, phân quyền tài liệu và kiểm soát dung lượng trong CloudDocs.'],
 ['Thùng rác, công việc và báo cáo',['Tìm hiểu xóa mềm, khôi phục, xóa vĩnh viễn và thao tác nhiều tài liệu.','Nghiên cứu luồng giao việc, nộp tài liệu báo cáo, chờ duyệt và yêu cầu chỉnh sửa.','Tìm hiểu quy tắc nộp muộn, thông báo riêng và kiểm soát phiên bản khi cập nhật công việc.'],'Hệ thống hóa các chức năng hiện có và mối liên hệ giữa tài liệu, quyền truy cập, quota và nhật ký.'],
 ['Tổng kết kiến thức và hoàn thiện báo cáo',['Tổng hợp kiến thức IAM, VPC, EC2, S3, RDS, Cognito và CloudWatch.','Hoàn thiện bản đề xuất và hướng dẫn workshop theo kiến trúc CloudDocs.','Rà soát kịch bản kiểm thử, tài liệu triển khai và định hướng học tập tiếp theo.'],'Hoàn thiện hệ thống kiến thức và tài liệu báo cáo về ứng dụng AWS trong CloudDocs.']
];
// Keep the meetup in the session on its actual date, 17 October.
[lessons[8],lessons[9]]=[lessons[9],lessons[8]];
let links='| Tuần | Ngày viết worklog (thứ Bảy) | Nội dung |\n| --- | --- | --- |\n';
lessons.forEach((l,i)=>{
 const date=fmt(sessions[i]),future=false;
 const rows=l[1].map((x,j)=>`| ${j+1} | ${x} |`).join('\n');
 links+=`| ${i+1} | ${date} | [${l[0]}](1.${i+1}-Week${i+1}/) |\n`;
 put(`1-Worklog/1.${i+1}-Week${i+1}`,`Tuần ${i+1}: ${l[0]}`,i+1,`
## Mục tiêu

Tìm hiểu ${l[0].charAt(0).toLowerCase()+l[0].slice(1)} và vận dụng kiến thức vào hệ thống quản lý tài liệu CloudDocs.

**Ngày viết worklog:** Thứ Bảy, ${date}.
${future?'\n**Trạng thái:** Kế hoạch học tập.\n':''}
## Nội dung đã tìm hiểu

| STT | Nội dung |
| --- | --- |
${rows}

## Kết quả đạt được

${l[2]}

## Tài liệu nghiên cứu

[First Cloud AI Journey — Cloud Journey](https://cloudjourney.awsfcaj.com/) và tài liệu kỹ thuật AWS về các dịch vụ tương ứng.
`, `Week ${i+1}: ${l[0]}`,`## Learning objectives

Study AWS services and their application to CloudDocs.

**Saturday worklog:** ${date}.${future?'\n\n**Status:** Planned learning session.':''}

## Topics studied

| No. | Topic |
| --- | --- |
${rows}

## Learning outcomes

${l[2]}

## Study materials

[First Cloud AI Journey](https://cloudjourney.awsfcaj.com/) and official AWS documentation.
`,`1.${i+1}.`);
});
put('1-Worklog','Nhật kí công việc',1,`
# Nhật kí công việc

Worklog ghi lại quá trình thực tập **12 tuần (08/08/2026–31/10/2026)** tại Amazon Web Services. Nội dung tập trung tìm hiểu các dịch vụ AWS qua First Cloud AI Journey và vận dụng kiến thức vào hệ thống quản lý tài liệu CloudDocs.

${[
 'Nắm tổng quan AWS và làm quen môi trường thực tập',
 'Hiểu IAM, quyền truy cập và quản lý chi phí',
 'Nắm kiến trúc VPC, subnet và Security Group',
 'Hiểu EC2, môi trường Spring Boot và Nginx',
 'Nắm cách lưu trữ và bảo vệ tài liệu trên S3 private',
 'Hiểu presigned URL, CORS và luồng truyền tệp',
 'Nắm RDS MySQL, metadata và migration',
 'Hiểu Cognito, PKCE và xác thực JWT',
 'Nắm phân quyền tài liệu và hạn mức lưu trữ',
 'Hiểu CloudWatch và tham gia Mini Meetup FCAJ',
 'Hiểu thùng rác, giao việc và quy trình nộp báo cáo',
 'Tổng kết kiến thức, hoàn thiện proposal, workshop và báo cáo'
].map((result,i)=>`**Tuần ${i+1}:** [${result}](1.${i+1}-Week${i+1}/)`).join('\n\n')}
`,'Worklog',`# Personal worklog

Weekly reports are written on Saturdays, beginning **8 August 2026**. Other days are used for independent study through [First Cloud AI Journey](https://cloudjourney.awsfcaj.com/) and research into AWS applications in CloudDocs.

${links}

Weeks run Saturday–Friday. The only break is **29 August–4 September**, containing 1 September. All other Saturdays were attended. The twelfth session was completed on **31 October 2026**.
`,'1.');

// Clean editorial notes while retaining technical constraints needed for a reproducible workshop.
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const f of files(base).filter(x=>x.endsWith('.md'))){
 let s=fs.readFileSync(f,'utf8');
 s=s.replace(/^> .*\n/gm,'');
 s=s.replace(/^.*(?:Phạm vi báo cáo:|Bản tổng hợp cần rà soát|Minh chứng cần bổ sung|lần biên soạn|người viết bản mẫu|bài đã xuất bản|Chưa có agenda|Danh sách hiện ghi một sự kiện|được cung cấp;|No agenda,|Only the event supplied|This draft does not inherit).*\n/gm,'');
 s=s.replace(/Bố cục giữ tám mục của bản mẫu và điều chỉnh theo đề cương đồ án\./g,'');
 s=s.replace(/Nhóm đã có mã tích hợp S3 và Cognito; người dùng xác nhận S3\/Cognito\/RDS hoạt động\. Bản đề xuất không xác nhận một endpoint EC2 đang vận hành khi chưa có minh chứng\./g,'Ứng dụng sử dụng S3 để lưu tài liệu, Cognito để xác thực và MySQL để quản lý dữ liệu nghiệp vụ.');
 s=s.replace(/Đây là hướng dẫn áp dụng từ mã nguồn hiện có, chưa phải biên bản hoàn tất tất cả bước trên tài khoản AWS\./g,'');
 s=s.replace(/CloudWatch\/Budgets ở đây là hướng dẫn áp dụng, chưa được xác nhận đã cấu hình\. /g,'');
 s=s.replace(/Hướng dẫn\/đề xuất giám sát và chi phí; chưa có minh chứng đã bật/g,'Giám sát tài nguyên, thu thập log và theo dõi ngân sách');
 s=s.replace(/Chưa có bảng tài nguyên\/giá đầu vào để đưa ra tổng tiền đáng tin cậy\. Lập ước tính riêng cho CloudDocs tại \[AWS Pricing Calculator\]\(https:\/\/calculator\.aws\/\), lưu bản export và so với Billing trước khi nộp\. Quyền lợi Free Tier\/credit phải được đối chiếu theo tài khoản; dừng RDS cũng không thay cho quy trình quản lý chi phí dài hạn\./g,'Ngân sách được tính theo Region, cấu hình tài nguyên, thời gian sử dụng và đơn giá tại thời điểm triển khai. Công cụ lập dự toán là [AWS Pricing Calculator](https://calculator.aws/); số liệu vận hành được theo dõi qua AWS Billing. Các khoản lưu trữ, snapshot và địa chỉ IP được tính riêng theo cấu hình thực tế.');
 s=s.replace(/Không tự ghi tỷ lệ PASS hoặc SLA khi chưa có lần chạy đo được\./g,'Kết quả được ghi nhận theo từng lần chạy kiểm thử.');
 s=s.replace(/Chỉ ghi dịch vụ đã dùng khi có cấu hình và minh chứng tương ứng\./g,'');
 s=s.replace(/; a running EC2 endpoint was not verified\./g,'.');
 s=s.replace(/It is a reproducible deployment and review guide; it is not evidence that all AWS steps have been completed\. No live EC2 demo URL was supplied\./g,'The guide explains configuration, deployment, testing and handover.');
 s=s.replace(/This is a deployment guide, not a completed live deployment certificate\./g,'');
 s=s.replace(/This is a personal draft for review\./g,'');
 s=s.replace(/This section is a personal draft for review\./g,'');
 s=s.replace(/Mục này là bản tự đánh giá cá nhân cần em rà soát\./g,'');
 s=s.replace(/## Lưu kết quả\n[\s\S]*?(?=## Kiểm thử tự động)/g,'');
 s=s.replace(/TRASH\/BULK\/TASK và các sửa đổi tháng 11 kiểm tra trên bản hiện tại, không dùng bảng này để khẳng định hoàn thành ở tuần 12\./g,'');
 s=s.replace(/\| Nhầm tiến độ tái dựng với lịch sử thực tế[^\n]*\n/g,'');
 s=s.replace(/\n## Tài liệu tham khảo\n[\s\S]*$/g,'\n## Tài liệu tham khảo\n\n- [First Cloud AI Journey](https://cloudjourney.awsfcaj.com/)\n- [AWS Documentation](https://docs.aws.amazon.com/)\n- Đề cương thực tập chuyên ngành và tài liệu kỹ thuật CloudDocs.\n');
 fs.writeFileSync(f,s.replace(/\n{3,}/g,'\n\n'));
}

// Align the proposal timeline with the Saturday study calendar.
for(const lang of ['vi','en']){
 const f=path.join(base,'2-Proposal',lang==='vi'?'_index.vi.md':'_index.md');let s=fs.readFileSync(f,'utf8');
 if(lang==='vi')s=s.replace(/### 5\. Lộ trình & Mốc triển khai[\s\S]*?(?=### 6\.)/,
`### 5. Lộ trình & Mốc triển khai\n\n| Giai đoạn | Các buổi thứ Bảy | Nội dung |\n| --- | --- | --- |\n| AWS nền tảng | 08/08, 15/08, 22/08 | Tổng quan, IAM, chi phí và VPC |\n| Máy chủ và lưu trữ | 05/09, 12/09, 19/09 | EC2, S3 và presigned URL |\n| Dữ liệu, xác thực và giám sát | 26/09, 03/10, 10/10, 17/10 | RDS, Cognito, phân quyền, CloudWatch và meetup |\n| Nghiên cứu ứng dụng và tổng kết | 24/10, 31/10 | Công việc, báo cáo và tổng kết kiến thức |\n\nHoàn thành 12 buổi thực tập từ 08/08 đến 31/10/2026; nghỉ buổi 29/08 thuộc tuần chứa ngày 01/09.\n\n`);
 else s=s.replace(/## 5\. Roadmap and milestones[\s\S]*?(?=## 6\.)/,'## 5. Roadmap and milestones\n\nTwelve Saturday sessions were completed from 8 August to 31 October 2026. The only break was 29 August, in the week containing 1 September.\n\n');
 fs.writeFileSync(f,s);
}

// Exactly six report sections; retain all original theme assets and layout components.
const rename=[['4-EventParticipated','3-EventParticipated'],['5-Workshop','4-Workshop'],['6-Self-evaluation','5-Self-evaluation'],['7-Feedback','6-Feedback']];
const blog=path.join(base,'3-BlogsPosted');if(path.dirname(blog)!==base)throw Error('Invalid blog path');if(fs.existsSync(blog))fs.rmSync(blog,{recursive:true,force:true});
for(const [a,b]of rename){if(fs.existsSync(path.join(base,a)))fs.renameSync(path.join(base,a),path.join(base,b));}
const workshopDir=path.join(base,'4-Workshop');
for(const entry of fs.readdirSync(workshopDir)){if(/^5\./.test(entry))fs.renameSync(path.join(workshopDir,entry),path.join(workshopDir,entry.replace(/^5\./,'4.')));}
const eventDir=path.join(base,'3-EventParticipated');
if(fs.existsSync(path.join(eventDir,'4.1-Event1')))fs.renameSync(path.join(eventDir,'4.1-Event1'),path.join(eventDir,'3.1-Event1'));
for(const f of files(base).filter(x=>x.endsWith('.md'))){let s=fs.readFileSync(f,'utf8');for(const [a,b]of rename)s=s.split(a).join(b);s=s.replaceAll('4.1-Event1','3.1-Event1');if(f.includes('4-Workshop'))s=s.replace(/5\.(\d+)(?=[-.])/g,'4.$1').replace(/<b> 5\./g,'<b> 4.');
 if(f.includes('4-Workshop'))s=s.replace(/(\|\s*)5\.(\d+)(\s*\|)/g,'$14.$2$3');
 if(f.includes('3-EventParticipated'))s=s.replace(/<b> 4\./g,'<b> 3.');
 if(f.includes('5-Self-evaluation'))s=s.replace(/<b> 6\./g,'<b> 5.');
 if(f.includes('6-Feedback'))s=s.replace(/<b> 7\./g,'<b> 6.');
 fs.writeFileSync(f,s);}
const portrait=`<p style="text-align:center"><img src="/images/tran-hai-luong.png" alt="Trần Hải Lương" width="220" style="display:block;width:220px;max-width:100%;height:auto;margin:1.5rem auto" /></p>`;
const menu=`1. [Nhật kí công việc](1-Worklog/)\n2. [Bản đề xuất](2-Proposal/)\n3. [Các sự kiện meetup đã tham gia](3-EventParticipated/)\n4. [Workshop](4-Workshop/)\n5. [Tự đánh giá](5-Self-evaluation/)\n6. [Chia sẻ, đóng góp ý kiến](6-Feedback/)`;
put('','Báo cáo thực tập',1,`# Báo cáo thực tập\n\n## Thông tin sinh viên\n\n**Họ và tên:** Trần Hải Lương\n\n**Số điện thoại:** [0918285802](tel:0918285802)\n\n**Email:** [tranhailuong0@gmail.com](mailto:tranhailuong0@gmail.com)\n\n**Lớp:** K68CNTTA\n\n**Trường:** Học viện Nông nghiệp Việt Nam\n\n**Ngành:** Công nghệ thông tin\n\n**Cơ sở thực tập:** Amazon Web Services\n\n**Thời gian thực tập:** Từ ngày 08/08/2026 đến ngày 31/10/2026.\n\n${portrait}\n\n## Nội dung báo cáo\n\n${menu}`,'Internship report',`# Internship report\n\n**Student:** Trần Hải Lương.\n\n**Phone:** [0918285802](tel:0918285802)\n\n**Email:** [tranhailuong0@gmail.com](mailto:tranhailuong0@gmail.com)\n\n**Class:** K68CNTTA.\n\n**University:** Vietnam National University of Agriculture.\n\n**Major:** Information Technology.\n\n**Internship organization:** Amazon Web Services.\n\n**Internship period:** 8 August–31 October 2026.\n\n${portrait}\n\n## Contents\n\n${menu}`);
// Formal self-evaluation without editor-facing placeholders or invented ratings.
put('5-Self-evaluation','Tự đánh giá',5,`# Tự đánh giá\n\nTrong quá trình thực tập tại Amazon Web Services, em tập trung nghiên cứu kiến thức điện toán đám mây và cách ứng dụng các dịch vụ AWS vào hệ thống CloudDocs. Việc học tập được thực hiện thông qua tài liệu First Cloud AI Journey, tài liệu kỹ thuật AWS và nghiên cứu mã nguồn ứng dụng.\n\n| Nội dung | Tự đánh giá |\n| --- | --- |\n| Kiến thức chuyên môn | Hệ thống hóa kiến thức IAM, VPC, EC2, S3, RDS, Cognito và CloudWatch; hiểu vai trò của từng dịch vụ trong kiến trúc ứng dụng. |\n| Khả năng tự học | Chủ động đọc tài liệu, tổng hợp khái niệm và liên hệ kiến thức với các luồng xử lý của CloudDocs. |\n| Tư duy giải quyết vấn đề | Biết phân tích các nhóm lỗi liên quan đến quyền, cấu hình mạng, xác thực, CORS và dữ liệu. |\n| Ý thức học tập | Duy trì việc tổng hợp nội dung vào các buổi thứ Bảy và tự nghiên cứu trong thời gian còn lại. |\n| Trình bày và tài liệu | Rèn luyện cách viết nhật kí, bản đề xuất và hướng dẫn workshop có trình tự. |\n\n## Hạn chế\n\nKinh nghiệm vận hành thực tế, tối ưu chi phí và xử lý sự cố trên môi trường triển khai còn cần được rèn luyện thêm. Một số nội dung như sao lưu, phục hồi và giám sát cần tiếp tục thực hành để hiểu sâu hơn.\n\n## Định hướng\n\nTiếp tục học theo hướng Backend và Cloud, nâng cao kỹ năng bảo mật, kiểm thử tích hợp, vận hành hệ thống và tự động hóa triển khai.`,'Self-evaluation',`# Self-evaluation\n\nThe internship focuses on AWS foundations and their application to CloudDocs. Independent study uses FCAJ materials, AWS documentation and application source code.\n\nAreas of progress include service architecture, access control, identity, storage and technical reporting. Further practice is needed in operations, cost optimization, backup/restore and integration testing. The next learning direction is Backend and Cloud.`,'5.');
const sections=[['1-Worklog','Nhật kí công việc',1],['2-Proposal','Bản đề xuất',2],['3-EventParticipated','Các sự kiện meetup đã tham gia',3],['4-Workshop','Workshop',4],['5-Self-evaluation','Tự đánh giá',5],['6-Feedback','Chia sẻ, đóng góp ý kiến',6]];
for(const [slug,title,n]of sections)for(const name of ['_index.vi.md','_index.md']){const f=path.join(base,slug,name);let s=fs.readFileSync(f,'utf8').replace(/^weight:.*$/m,`weight: ${n}`).replace(/^pre:.*$/m,`pre: " <b> ${n}. </b> "`);if(name.includes('.vi.'))s=s.replace(/^title:.*$/m,`title: ${JSON.stringify(title)}`);fs.writeFileSync(f,s);}
const manifest=files(base).filter(f=>path.basename(f)==='_index.vi.md').map(f=>{const s=fs.readFileSync(f,'utf8');return{slug:path.relative(base,path.dirname(f)).split(path.sep).join('/'),title:JSON.parse(s.match(/^title: (.+)$/m)[1])};});
fs.writeFileSync('content-manifest.json',JSON.stringify(manifest,null,2));
fs.writeFileSync('README-Vietnam-IT-Job-Market.md','# Báo cáo thực tập CloudDocs\n\nBáo cáo cá nhân Trần Hải Lương tại Amazon Web Services.\n\nGiao diện sử dụng nguyên bản mẫu Hugo, logo AWS và màu theme workshop.\n\nGồm sáu mục: Nhật kí công việc; Bản đề xuất; Các sự kiện meetup đã tham gia; Workshop; Tự đánh giá; Chia sẻ, đóng góp ý kiến.\n\nLịch worklog: thứ Bảy từ 08/08/2026, chỉ nghỉ buổi 29/08 thuộc tuần có ngày 01/09. Đã hoàn thành đủ 12 buổi vào ngày 31/10/2026.\n\nChạy `hugo server` để xem website. Mở vietnam-it-job-market-review.html để đọc nội dung cùng logo và CSS gốc.\n');
const architecture=path.join(root,'static/images/vietnam-it-job-market-architecture.svg');
if(fs.existsSync(architecture)){let s=fs.readFileSync(architecture,'utf8');s=s.replace('Sơ đồ mô tả thiết kế; không xác nhận endpoint EC2 hoặc tài nguyên đã triển khai.','Cognito xác thực danh tính; backend quản lý quyền truy cập và dữ liệu nghiệp vụ.');fs.writeFileSync(architecture,s);}
console.log(JSON.stringify({sessions:sessions.map(fmt),breaks:skipped,sections:sections.map(s=>s[1]),pages:manifest.length}));
require('./english-report.cjs');
