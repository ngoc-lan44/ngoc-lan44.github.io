// Source-based AWS architecture. Official AWS SVG assets are embedded unchanged.
const fs=require('fs'),path=require('path');
const sharp=require('C:/Users/ASUS/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const out=path.join(__dirname,'static/images'),assets=path.join(out,'aws-icons');
const W=2600,H=1700;
const xml=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const icons={cloud:'AWS-Cloud_32.svg',region:'Region_32.svg',ec2:'Arch_Amazon-EC2_64.svg',s3:'Arch_Amazon-Simple-Storage-Service_64.svg',glue:'Arch_AWS-Glue_64.svg',athena:'Arch_Amazon-Athena_64.svg',ddb:'Arch_Amazon-DynamoDB_64.svg',cw:'Arch_Amazon-CloudWatch_64.svg',iam:'Arch_AWS-Identity-and-Access-Management_64.svg',ssm:'Arch_AWS-Systems-Manager_64.svg'};
const items=[];const palette={blue:'#2868a6',green:'#247a50',purple:'#7754a0',gray:'#697687'};
function text(x,y,s,cls='body',anchor='start'){items.push(`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${xml(s)}</text>`);}
function rect(x,y,w,h,fill='#fff',stroke='#cdd5df',dash='',rx=0){items.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"${dash?` stroke-dasharray="${dash}"`:''}/>`);}
function icon(name,x,y,size=64){items.push(`<image x="${x}" y="${y}" width="${size}" height="${size}" href="data:image/svg+xml;base64,${fs.readFileSync(path.join(assets,icons[name])).toString('base64')}"/>`);}
function card(x,y,w,h,title,lines,service,fill='#fff'){
 rect(x,y,w,h,fill,'#cdd5df','',6);let tx=x+22;
 if(service){icon(service,x+20,y+20,58);tx=x+94;}
 text(tx,y+43,title,'cardtitle');
 lines.forEach((s,i)=>text(x+22,y+(service?94:82)+i*29,s,'small'));
}
function arrow(d,color='blue',label='',x=0,y=0,dash=false,both=false){items.push(`<path d="${d}" fill="none" stroke="${palette[color]}" stroke-width="2.8"${dash?' stroke-dasharray="9 6"':''}${both?` marker-start="url(#${color})"`:''} marker-end="url(#${color})"/>`);if(label)text(x,y,label,'edge '+color);}
items.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc"><title id="title">Vietnam IT Job Market — kiến trúc thực tế trên AWS</title><desc id="desc">Một Amazon EC2 chạy thu thập ITviec, ETL, Streamlit, Nginx và worker. JSON xử lý trên EC2, Parquet trên S3. Glue Data Catalog cung cấp metadata cho Athena. Tài khoản và hoạt động cá nhân ở S3. Moderation và audit ở DynamoDB, Projection Worker xuất snapshot sang S3 để Athena lọc. systemd lập lịch; IAM role, Session Manager và CloudWatch hỗ trợ vận hành.</desc><defs><style>:root{--blue:#2868a6;--green:#247a50;--purple:#7754a0;--gray:#697687}text{font-family:'Segoe UI',Arial,sans-serif;fill:#263548}.title{font-size:38px;font-weight:700}.subtitle{font-size:22px;fill:#5d6c7d}.group{font-size:25px;font-weight:600}.cardtitle{font-size:24px;font-weight:650}.body{font-size:23px}.small{font-size:21px}.tiny{font-size:19px;fill:#5d6c7d}.edge{font-size:20px;font-weight:600;paint-order:stroke;stroke:#fff;stroke-width:8px;stroke-linejoin:round}.blue{fill:#2868a6}.green{fill:#247a50}.purple{fill:#7754a0}.gray{fill:#697687}</style>${['blue','green','purple','gray'].map(c=>`<marker id="${c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="${palette[c]}"/></marker>`).join('')}</defs>`);
rect(0,0,W,H,'#fff','#fff');
text(55,62,'VIETNAM IT JOB MARKET','title');text(55,100,'Kiến trúc triển khai thực tế • Thu thập ITviec, phân tích dữ liệu và quản trị việc làm','subtitle');
rect(320,140,2190,1430,'#fff','#596579');icon('cloud',338,153,34);text(388,180,'AWS Cloud','group');
rect(352,202,2125,1340,'#fff','#19a5b4','8 7');icon('region',370,216,32);text(416,242,'Region: ap-southeast-1 (Singapore)','group');
// One EC2 boundary: all application components remain inside this box.
rect(392,270,970,1080,'#fffdf9','#d78625','8 6');icon('ec2',412,288,58);text(490,325,'Amazon EC2 — một máy chủ','group');text(490,356,'t3.small • Ubuntu 24.04 • IAM Instance Role • IMDSv2','small');
card(430,395,385,200,'Python Collector / ETL',['Discovery → batch → kiểm tra','Sync → clean → Parquet','Nguồn duy nhất: ITviec']);
card(930,395,390,200,'Dữ liệu xử lý trên EC2',['JSON raw / current / history','JSON clean + staging / journal','Parquet được tạo trước publication']);
rect(430,650,890,105,'#fff8eb','#e0b36f','',6);text(452,686,'systemd — điều phối pipeline và worker','cardtitle');text(452,722,'Pipeline 02:00 Việt Nam/ngày • Projection 2 phút • timer Operations','small');
card(430,825,300,170,'Nginx + HTTPS',['Reverse proxy / WebSocket','Certbot + timer theo IP','80 / 443 → loopback 8501']);
card(870,825,450,170,'Streamlit + Plotly',['Dashboard / tìm kiếm / chi tiết','USER: lưu tin, ứng tuyển, hồ sơ','ADMIN: tài khoản / moderation']);
card(430,1185,355,145,'Operations Worker',['Allowlist yêu cầu ADMIN','Restart dashboard / retry pipeline']);
card(930,1185,390,145,'Projection Worker',['Đọc moderation từ DynamoDB','Xuất snapshot cho Athena']);
// External actors — neutral symbols, not AWS service icons.
rect(42,395,225,185,'#f2f4f7','#dfe4ea','',6);text(154,440,'ITviec','group','middle');text(154,480,'Nguồn tuyển dụng','small','middle');text(154,516,'HTTPS / HTML','small','middle');
rect(42,825,225,185,'#f2f4f7','#dfe4ea','',6);items.push('<circle cx="154" cy="863" r="16" fill="none" stroke="#526172" stroke-width="3"/><path d="M124 904 Q124 879 154 879 Q184 879 184 904" fill="none" stroke="#526172" stroke-width="3"/>');text(154,944,'Guest / USER','small','middle');text(154,978,'ADMIN','small','middle');
text(1490,295,'LƯU TRỮ & PHÂN TÍCH','group');
card(1490,395,390,200,'Amazon S3 — Analytics',['analytics/itviec/','current_jobs.parquet','Artifact: pipeline-runs/<run_id>/','Kết quả: control/athena-results/'],'s3');
card(2030,395,390,200,'Amazon Athena',['vn_it_job_market','itviec_current_jobs + active views','Truy vấn dữ liệu S3'],'athena');
card(2030,275,390,100,'AWS Glue Data Catalog',[],'glue');
text(1490,790,'DỮ LIỆU NGƯỜI DÙNG & KIỂM DUYỆT','group');
card(1490,825,390,170,'Amazon S3 — Users',['users/accounts.json','users/activity/<user-hash>.json'],'s3');
card(2030,825,390,170,'Amazon DynamoDB',['Moderation state + audit','Hai bảng, ghi transaction'],'ddb');
card(1490,1185,390,145,'Amazon S3 — Snapshot',['control/moderation/','job_moderation.json'],'s3');
// Edges: data (blue), personal data (green), moderation (purple), ops (gray).
arrow('M267 485 H430','blue','1. Thu thập',285,462);
arrow('M815 485 H930','blue','JSON',841,462);
arrow('M1320 485 H1490','blue','2. Publication',1336,459);
arrow('M1880 485 H2030','blue','3. Đọc S3',1899,459);
arrow('M2225 375 V395','purple');text(2040,359,'Metadata: schema / location','tiny');
arrow('M2225 595 V665 H1405 V857 H1320','blue','4. SQL / kết quả',1530,647,false,true);
arrow('M267 910 H430','gray','HTTPS',302,887);
arrow('M730 910 H870','gray','Proxy',767,887);
arrow('M1320 950 H1490','green','5. Cá nhân',1341,928,false,true);
arrow('M1095 995 V1075 H2225 V995','purple','6. Moderation / kiểm quyền hiển thị',1470,1056,false,true);
arrow('M2110 995 V1135 H1125 V1185','purple','7. Đọc state + revision',1430,1116);
arrow('M1320 1258 H1490','purple','8. Snapshot',1338,1234);
arrow('M1880 1258 H1955 V535 H2030','purple','9. Lọc view',1898,710,true);
arrow('M870 965 H835 V1258 H785','gray');text(802,1152,'Yêu cầu ADMIN','tiny');
arrow('M625 650 V595','gray','Lập lịch',644,629,true);
// Support services in AWS region but outside the EC2 boundary.
card(430,1410,355,100,'AWS Systems Manager',[],'ssm');text(524,1486,'Session Manager / quản trị','tiny');
card(1490,1410,390,100,'Amazon CloudWatch',[],'cw');text(1584,1486,'Log + alarm PipelineFailure','tiny');
card(2030,1410,390,100,'AWS IAM',[],'iam');text(2124,1486,'Instance Role cho EC2','tiny');
arrow('M608 1410 V1350','gray','SSM',626,1389,true);
arrow('M1125 1350 V1458 H1490','gray','Log vận hành',1205,1438,true);
// Clear notes describe logical grouping without implying multiple buckets/instances.
text(60,1615,'Màu xanh: dữ liệu / phân tích    •    Xanh lá: dữ liệu cá nhân    •    Tím: moderation / projection    •    Nét đứt xám: vận hành','small');
text(60,1653,'Các khối S3 là các prefix trong cùng bucket dự án. AWS Glue chỉ dùng Data Catalog; ETL chạy trên EC2. Sơ đồ theo source, không xác nhận AWS live.','tiny');
items.push('</svg>');
const svg=items.join('\n');fs.writeFileSync(path.join(out,'vietnam-it-job-market-actual-architecture.svg'),svg);
sharp(Buffer.from(svg)).resize(3900,2550).png().toFile(path.join(out,'vietnam-it-job-market-actual-architecture.png')).then(()=>console.log(JSON.stringify({svg:'static/images/vietnam-it-job-market-actual-architecture.svg',png:'static/images/vietnam-it-job-market-actual-architecture.png',officialIcons:Object.keys(icons).length,size:[3900,2550]})));
