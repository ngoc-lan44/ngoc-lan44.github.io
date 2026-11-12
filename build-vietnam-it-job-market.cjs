const fs = require('fs');
const path = require('path');
const root = __dirname;
const content = path.join(root, 'content');
// The original content/config/layouts are preserved in template-original-20261107.zip.
if (!fs.existsSync(path.join(root, 'template-original-20261107.zip'))) throw Error('Missing original backup');
if (path.dirname(content) !== root || path.basename(content) !== 'content') throw Error('Invalid content target');
fs.rmSync(content, { recursive: true, force: true });
const pages = [];
function page(slug, title, weight, body, enBody, enTitle=title, pre='') {
  const dir = path.join(content, slug); fs.mkdirSync(dir, {recursive:true});
  const fm = t => `---\ntitle: ${JSON.stringify(t)}\ndate: 2026-11-07\nweight: ${weight}\nchapter: false\n${pre ? `pre: " <b> ${pre} </b> "\n` : ''}---\n\n`;
  fs.writeFileSync(path.join(dir,'_index.vi.md'), fm(title)+body.trim()+'\n');
  fs.writeFileSync(path.join(dir,'_index.md'), fm(enTitle)+(enBody||body).trim()+'\n');
  pages.push({slug,title});
}
const scope = '> **Phạm vi báo cáo:** Nhật ký cá nhân của Trần Hải Lương về quá trình tìm hiểu các dịch vụ AWS và vận dụng vào CloudDocs. Nội dung kỹ thuật được đối chiếu với đề cương và mã nguồn hiện có ngày 07/11/2026. Lịch phân bổ từng ngày là bản tái dựng để rà soát, chưa phải bằng chứng xác nhận công việc đã hoàn thành đúng ngày.\n';
const sources = `## Tài liệu tham khảo

- Đề cương thực tập chuyên ngành nhóm 32 (bản ngày 02/11/2026).
- Kế hoạch cá nhân đã cung cấp: tham khảo phạm vi học AWS, lưu trữ, hạ tầng, xác thực và kiểm thử. Kế hoạch sáu tuần được dùng để tham khảo nội dung học tập.
- Worklog học AWS 12 tuần của Tòng Văn Tâm: tham khảo bố cục và lịch 10/08–30/10/2026; không sử dụng kết quả học tập của bạn làm thành tích của nhóm.
- Mã nguồn CloudDocs hiện có: README, Back_end/README, AUTH_COGNITO, STORAGE_QUOTAS, WORK_TASKS và cấu hình S3.
- [AWS S3 presigned URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html).
- [S3 CORS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html).
- [Cognito với PKCE](https://docs.aws.amazon.com/cognito/latest/developerguide/using-pkce-in-authorization-code.html).
- [Kết nối EC2 và RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/ec2-rds-connect.html).
- [CloudWatch Agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html).
`;
const team = `| Sinh viên thực tập tại Amazon Web Services | Lớp / MSV |
| --- | --- |
| Trần Hải Lương | K68CNTTA / 687703 |
| Phan Thị Thanh Thuỷ | K68CNTTC / 687821 |
| Lê Hoàng Tùng | K68CNTTA / 687862 |
| Hán Quang Sang | K68CNTTA / 687789 |`;
const state = `| Thành phần | Hiện trạng được đối chiếu | Phạm vi cần ghi nhận thêm |
| --- | --- | --- |
| Java 21 / Spring Boot 3.5.6 | Có backend REST, Security, JPA và kiểm tra quyền | Chạy lại trên bản build nghiệm thu |
| Frontend | HTML/CSS/JavaScript thuần, đã kết nối các API nghiệp vụ | Kiểm tra trình duyệt và màn hình thực tế |
| Amazon S3 | Có luồng signed PUT/GET, xác nhận upload bằng HeadObject, bucket private | Đối soát object, CORS và IAM ở tài khoản triển khai |
| Amazon Cognito | Có Authorization Code + PKCE và kiểm tra access token; ánh xạ issuer/sub | Kiểm tra callback/logout ở tên miền triển khai |
| MySQL / Amazon RDS | MySQL là CSDL của dự án; người dùng xác nhận RDS đang hoạt động | Chưa kiểm tra trực tiếp DB, migration và bản sao lưu trong lần biên soạn này |
| Amazon EC2 / VPC / IAM | Có trong đề cương và hướng dẫn triển khai nhóm | Chưa có endpoint hoặc ảnh Console để xác nhận bản chạy EC2 hiện tại |
| CloudWatch / Budgets / HTTPS / sao lưu | Nội dung hướng dẫn vận hành và đề xuất áp dụng | Không ghi là đã cấu hình khi chưa có minh chứng |
| Lambda / API Gateway / DynamoDB / SQS / EventBridge / CloudFront / WAF | Không phải kiến trúc hiện hành được xác nhận | Không đưa vào danh sách đã triển khai |`;
page('', 'Báo cáo thực tập CloudDocs',1,`
# Hệ thống quản lý tài liệu doanh nghiệp trên nền tảng đám mây AWS

**CloudDocs — Trần Hải Lương · Học viện Nông nghiệp Việt Nam · Khoa Công nghệ thông tin**

| Thông tin | Nội dung |
| --- | --- |
| Sinh viên lập báo cáo | Trần Hải Lương — 687703 — K68CNTTA |
| Giảng viên hướng dẫn | Nguyễn Thị Lan |
| Bắt đầu thực tập | 07/08/2026 |
| Thời gian theo đề cương | 07/08/2026–28/11/2026 |
| Giai đoạn worklog trong website | 12 tuần: 10/08/2026–30/10/2026; ngày 07/08 là buổi khởi động |
| Phạm vi nội dung | Cá nhân tìm hiểu các dịch vụ AWS và ứng dụng vào CloudDocs |
| Cơ sở thực tập | Amazon Web Services |

${scope}

## Sinh viên cùng thực tập tại Amazon Web Services

${team}

## Nội dung báo cáo

1. [Worklog 12 tuần](1-Worklog/)
2. [Bản đề xuất CloudDocs](2-Proposal/)
3. [Bài viết kỹ thuật](3-BlogsPosted/)
4. [Sự kiện đã tham gia](4-EventParticipated/)
5. [Workshop triển khai CloudDocs trên AWS](5-Workshop/)
6. [Tự đánh giá](6-Self-evaluation/)
7. [Chia sẻ và đóng góp ý kiến](7-Feedback/)

## Hiện trạng đồ án

${state}

Các chức năng được đối chiếu hiện tại gồm quản lý tài liệu, tìm kiếm/lọc, chia sẻ quyền, yêu thích, thùng rác, thao tác nhiều tài liệu, audit log, hồ sơ, quản trị tài khoản, thông báo, hạn mức dung lượng và giao việc–nộp báo cáo–duyệt/yêu cầu sửa. Các cập nhật đầu tháng 11 được ghi ở phần bổ sung của worklog, không lùi ngày về tháng 10.
`, `# CloudDocs internship report

Personal AWS learning report for CloudDocs, Vietnam National University of Agriculture. Prepared by Trần Hải Lương (687703), supervised by Nguyễn Thị Lan.

Internship starts **7 August 2026**; the outline runs through **28 November 2026**. This personal report covers **12 working weeks, 10 August–30 October**, with 7 August as orientation. The four interns at Amazon Web Services are listed below.

${team}

The daily schedule is reconstructed for review, not a verified historical record. Current code supports private S3 transfers and Cognito authentication. RDS operation was reported by the user; EC2 deployment has not been independently checked. November improvements are recorded separately.

1. [Worklog](1-Worklog/)
2. [Proposal](2-Proposal/)
3. [Technical articles](3-BlogsPosted/)
4. [Events](4-EventParticipated/)
5. [Workshop](5-Workshop/)
6. [Self-evaluation](6-Self-evaluation/)
7. [Feedback](7-Feedback/)
`, 'CloudDocs internship report');

const weeks = [
 ['Làm quen AWS và khảo sát đề tài',
 ['Tiếp nhận yêu cầu thực tập; xác định phạm vi quản lý tài liệu doanh nghiệp và cách lập worklog.','Tìm hiểu AWS Console, Region, mô hình trách nhiệm chung và quản lý tài khoản.','Nghiên cứu Billing/Budgets; lập danh sách tài nguyên dự kiến cho môi trường học tập.','Khảo sát luồng lưu trữ, tìm kiếm, chia sẻ tài liệu; thống nhất vai trò ADMIN và USER.','Tìm hiểu tổng thể CloudDocs, cấu trúc repository và vai trò các dịch vụ AWS trong kiến trúc ứng dụng.'],
 '', 'Bản phạm vi đề tài, danh sách nội dung học tập và sơ đồ dịch vụ sơ bộ.', 'Phân biệt dữ liệu tệp trên S3 với metadata trong MySQL; không coi AWS là lớp phân quyền nghiệp vụ.'],
['IAM và thiết kế quyền truy cập',
 ['Tìm hiểu IAM User, Group, Role và Policy; phân biệt IAM với người dùng ứng dụng.','Xây dựng ma trận ADMIN/USER và quyền OWNER, VIEW, DOWNLOAD, EDIT.','Thiết kế nguyên tắc bucket private, hạn chế quyền trên prefix documents/*.','Nghiên cứu IAM Role cho EC2; chỉ áp dụng AssumeRole chéo tài khoản nếu môi trường cần.','Thống nhất quản lý bí mật, biến môi trường và quy tắc Git; rà soát quyền tối thiểu.'],
 '', 'Ma trận quyền, danh mục biến môi trường và bản nháp policy S3.', 'Backend quyết định quyền tài liệu; IAM giới hạn tài nguyên AWS mà backend được phép dùng.'],
['VPC, mô hình dữ liệu và khởi tạo ứng dụng',
 ['Tìm hiểu VPC, subnet, route table, Internet Gateway và Security Group.','Thiết kế kết nối EC2–RDS: nguồn vào MySQL là Security Group của backend.','Chuẩn bị Java 21, Maven, MySQL; thống nhất Spring Boot và cấu trúc REST API.','Thiết kế users, documents, departments, document_permissions và audit_logs.','Xây dựng khung giao diện và bộ test case đầu tiên; tìm hiểu quy trình Git.'],
 '', 'Sơ đồ mạng dự kiến, ERD và bộ khung frontend/backend.', 'Cấu trúc CSDL phải đối chiếu schema hiện có; repository hiện chỉ có migration tăng dần.'],
['EC2 và hoàn thiện bộ khung CloudDocs',
 ['Tìm hiểu EC2, AMI, EBS, instance profile và truy cập quản trị.','Rà soát schema MySQL, kiểu dữ liệu metadata và quan hệ chủ sở hữu bằng owner_id.','Tiếp tục đọc tài liệu và ghi chú cá nhân trong kỳ nghỉ lễ; học theo lịch cá nhân thực tế.','Tiếp tục tự học theo điều kiện thực tế; rà soát yêu cầu API và danh sách lỗi cần xử lý.','Ghép layout Dashboard/danh sách tài liệu với API; thống nhất phản hồi lỗi.'],
 '', 'Khung môi trường chạy thử, API metadata và giao diện danh sách.', 'Tuần này chứa ngày 01/09; 02–03/09 là lịch tự học dự kiến, cần khớp lịch nghỉ thực tế.'],
['Amazon S3 và luồng tải tệp',
 ['Nghiên cứu bucket/object, Block Public Access, mã hóa và chi phí lưu trữ.','Xây dựng luồng cấp presigned PUT URL từ backend sau khi kiểm tra người dùng và quota.','Ghép frontend truyền File trực tiếp tới S3 bằng PUT; giữ đúng Content-Type đã ký.','Thiết kế upload-complete dùng HeadObject để xác nhận tồn tại và kích thước.','Kiểm tra file rỗng, file trùng tên, upload lỗi; dùng UUID làm object key.'],
 '', 'Đặc tả metadata → signed PUT → S3 → upload-complete và các trường hợp lỗi.', 'Không mở public bucket để sửa lỗi truy cập; metadata chờ upload vẫn cần quản lý dung lượng.'],
['RDS MySQL, migration và tính nhất quán',
 ['Nghiên cứu RDS MySQL, endpoint, Security Group và cấu hình kết nối ứng dụng.','Chuẩn bị bản sao schema thật; phân biệt import schema gốc và migration bổ sung.','Rà soát migration ownership, chia sẻ và yêu thích; kiểm tra trước khi chạy ALTER/CREATE.','Đối soát metadata MySQL với S3; thiết kế cách xử lý object thiếu hoặc upload chưa hoàn tất.','Thiết kế kiểm thử API danh sách, tìm kiếm/lọc và giao diện metadata.'],
 '', 'Hướng dẫn DB/migration, bảng đối soát trạng thái và test case.', 'ddl-auto=validate không tự tạo hoặc cập nhật schema; không chạy lại migration đã áp dụng.'],
['Xem trước, tải xuống và CORS',
 ['Cấu hình CORS S3 theo origin frontend và phương thức GET/HEAD/PUT.','Hoàn thiện cấp signed GET URL cho preview/download sau kiểm tra quyền.','Kiểm tra VIEW chỉ xem trước, DOWNLOAD được tải, EDIT được sửa theo ma trận quyền.','Xử lý phản hồi hết hạn URL, object không tồn tại và lỗi 403; ghi chú thời hạn URL.','Tổng hợp kết quả tích hợp frontend–backend–S3 và các trường hợp cần kiểm tra thực tế.'],
 '', 'Kịch bản xem trước/tải xuống, cấu hình CORS và danh sách lỗi tích hợp.', 'Thu hồi quyền chặn URL mới; signed URL đã cấp có thể còn dùng được đến hết hạn.'],
['Chia sẻ, nhật ký hoạt động và quản trị tài khoản',
 ['Rà soát chia sẻ tài liệu cho tài khoản nội bộ và kiểm tra quyền ở backend.','Thiết kế thu hồi quyền; kiểm tra người ngoài danh sách không truy cập được.','Hoàn thiện ghi nhật ký các thao tác nghiệp vụ và phạm vi xem audit của ADMIN/USER.','Đối chiếu quản trị tài khoản, trạng thái ACTIVE và khóa truy cập của tài khoản bị vô hiệu.','Kiểm thử hồi quy và chuẩn bị danh sách chỉnh sửa tính nhất quán dữ liệu.'],
 '', 'Ma trận quyền chi tiết, test case chia sẻ/thu hồi và thiết kế audit log.', 'Tuần này chứa ngày 29/09; audit nghiệp vụ trong MySQL khác CloudTrail của tài khoản AWS.'],
['Cognito, danh tính và tích hợp bảo mật',
 ['Tìm hiểu User Pool, public app client và Authorization Code + PKCE.','Đặc tả callback/logout và đồng bộ cấu hình frontend với backend.','Thiết kế xác thực access token: chữ ký, issuer, hết hạn, token_use và client_id.','Thiết kế ánh xạ issuer/sub với users; không dùng email làm khóa định danh.','Chuẩn bị test token sai, token hết hạn, tài khoản bị khóa và phân quyền API.'],
 '', 'Thiết kế luồng Cognito và bộ kịch bản kiểm thử xác thực.', 'Đề cương gốc xếp tích hợp Cognito ở tuần 13–14; tuần này là nghiên cứu/chuẩn bị, không tự xác nhận đã triển khai sớm.'],
['Chuẩn bị triển khai EC2 và vận hành',
 ['Rà soát kiến trúc frontend tĩnh + backend Spring Boot trên EC2 và CSDL RDS.','Chuẩn bị cấu hình Nginx phục vụ frontend, proxy /api/ và không công khai cổng backend.','Thiết kế biến môi trường, IAM instance role và kết nối RDS bằng TLS.','Nghiên cứu CloudWatch, retention log, cảnh báo và phân biệt giám sát hạ tầng với audit nghiệp vụ.','Chuẩn bị checklist triển khai, rollback bản build và ghi nhận minh chứng.'],
 '', 'Tài liệu triển khai EC2/RDS/Nginx và checklist môi trường.', 'Không coi hướng dẫn triển khai là bằng chứng đã chạy trên EC2; cần endpoint và kết quả kiểm tra. Hoạt động cuối tuần 10: thứ Bảy 17/10/2026 tham dự Mini Meetup – First Cloud AI Journey tại AWS Office, Grand Terra Tower, 36 Cát Linh, Hà Nội.'],
['Tích hợp hạ tầng, quota và sự kiện cộng đồng',
 ['Đối chiếu cấu hình EC2/RDS/S3 theo kế hoạch; ghi rõ tài nguyên nào đã có và tài nguyên còn chuẩn bị.','Rà soát hạn mức theo tài khoản, tối đa 100 MiB/file và cách tính file pending/thùng rác.','Chuẩn bị kiểm thử nhiều tài khoản, tránh vượt quota và rò rỉ tài liệu.','Tổng hợp ghi chú cá nhân sau meetup ngày 17/10; liên hệ định hướng học cloud/backend.','Cập nhật danh sách việc tuần cuối giai đoạn và các minh chứng còn thiếu.'],
 '', 'Checklist tích hợp và danh mục minh chứng; tổng hợp meetup đã diễn ra cuối tuần 10.', 'Meetup diễn ra ngày 17/10/2026, trước tuần 11 (19–23/10). Không tự bổ sung agenda hay nội dung diễn giả khi chưa có ghi chú.'],
['Kiểm thử tổng hợp và xây dựng workshop',
 ['Đối chiếu luồng tài liệu và quyền giữa frontend, backend, MySQL và S3.','Rà soát danh sách lỗi, điều kiện nghiệm thu và cách lưu kết quả test.','Soạn workshop theo trình tự IAM/VPC → S3 → RDS → Cognito → EC2 → kiểm thử.','Hoàn thiện bản đề xuất theo 8 mục của mẫu; tổng hợp kiến thức dịch vụ AWS và ngân sách theo giả định.','Chốt bản worklog 12 tuần để rà soát; tách các công việc sau 30/10 thành giai đoạn tiếp theo.'],
 '', 'Bản thảo worklog, proposal, workshop và checklist nghiệm thu.', 'Tuần này bắt đầu 26/10; tích hợp Cognito và cập nhật tháng 11 được đối chiếu ở phần bổ sung, không ghi hoàn thành toàn bộ ngày 30/10.']
];
const fmt=d=>`${String(d.getUTCDate()).padStart(2,'0')}/${String(d.getUTCMonth()+1).padStart(2,'0')}/${d.getUTCFullYear()}`;
const dateFor=(w,d)=>new Date(Date.UTC(2026,7,10+7*w+d));
let weekLinks='| Tuần | Thời gian | Chủ đề |\n| --- | --- | --- |\n';
weeks.forEach((w,i)=>{
 const start=fmt(dateFor(i,0)),end=fmt(dateFor(i,4)),slug=`1-Worklog/1.${i+1}-Week${i+1}`;
 weekLinks+=`| ${i+1} | ${start}–${end} | [${w[0]}](1.${i+1}-Week${i+1}/) |\n`;
 const tasks=w[1].map((t,j)=>`| ${j+2} | ${t} | ${fmt(dateFor(i,j))} | ${fmt(dateFor(i,j))} |`).join('\n');
 page(slug,`Worklog Tuần ${i+1}: ${w[0]}`,i+1,`
## Mục tiêu

- ${w[0]} trong phạm vi đồ án CloudDocs.
- Tự tìm hiểu dịch vụ AWS, cách ứng dụng vào CloudDocs và phương pháp kiểm thử.

> **Bản tổng hợp cần rà soát:** Ngày dưới đây là lịch phân bổ đề xuất. Kết quả nêu ở cuối tuần là đầu ra cần đối chiếu với commit, ảnh, biên bản hoặc kết quả test; chưa xác nhận hoàn thành theo từng ngày.

## Bảng công việc (${start}–${end})

| Thứ | Công việc | Ngày bắt đầu dự kiến | Ngày hoàn thành dự kiến |
| --- | --- | --- | --- |
${tasks}

## Kết quả / sản phẩm cần đối chiếu

${w[3]}

## Kiến thức áp dụng và lưu ý

${w[4]}

**Minh chứng cần bổ sung:** ghi chú học tập cá nhân, ảnh cấu hình đã che thông tin nhạy cảm, kết quả thử nghiệm hoặc commit tương ứng. Tham khảo [hiện trạng tổng hợp](../) để phân biệt kết quả hiện có với lịch tái dựng.
`, `## Week ${i+1}: ${w[0]}

**Period:** ${start}–${end}. **Author:** Trần Hải Lương.

This is a reconstructed personal learning schedule for review. Planned dates are not verified completion dates. The Vietnamese task wording is retained below to preserve the learning scope.

| Day | Work item | Planned start | Planned finish |
| --- | --- | --- | --- |
${tasks}

**Deliverables to verify:** ${w[3]}

**Implementation note:** ${w[4]}
`, `Week ${i+1}`,`1.${i+1}.`);
});
page('1-Worklog','Nhật ký công việc 12 tuần',1,`
# Worklog cá nhân: tìm hiểu AWS và ứng dụng vào CloudDocs

${scope}

## Cách tính thời gian

- **07/08/2026 (thứ Sáu):** ngày bắt đầu thực tập, khởi động và tiếp nhận yêu cầu; không tính thành một tuần đủ năm ngày.
- **Tuần 1–12:** tính theo thứ Hai–thứ Sáu, từ 10/08 đến 30/10/2026, khớp lịch bản Word tham khảo.
- Ngày **01/09 nằm trong tuần 4**, **29/09 trong tuần 8**, **26/10 là ngày đầu tuần 12**.
- Đề cương dùng tuần bảy ngày từ 07/08 và kéo dài đến 28/11. Đây là hai cách trình bày lịch; báo cáo này không rút ngắn kỳ thực tập thành 12 tuần.
- Lịch nghỉ lễ thực tế cần đối chiếu với đơn vị thực tập. Các ngày 02–03/09 trong bản dự thảo chỉ ghi tự học.

${weekLinks}

## Hiện trạng đối chiếu ngày 07/11/2026

${state}

## Bổ sung sau giai đoạn 12 tuần (31/10–07/11/2026)

Các thay đổi sau không được ghi thành kết quả hoàn tất trước 30/10:

- Tích hợp Cognito cho cả local/AWS; kiểm tra access token, ánh xạ issuer/sub và hồ sơ người dùng.
- Hoàn thiện thùng rác: xóa mềm, khôi phục, xóa vĩnh viễn; giữ tham chiếu audit.
- Thao tác một/nhiều tài liệu, chia sẻ, tải riêng từng tệp và hiển thị họ tên hồ sơ.
- Tính dung lượng cấp phát gồm upload chờ xác nhận và thùng rác; USER 100 GB, ADMIN 1 TB, tối đa 100 MiB/file.
- Giao việc, tiến độ, nộp tài liệu báo cáo, chờ duyệt, duyệt/yêu cầu sửa; thông báo riêng và audit.
- Cho phép nộp quá hạn và hiển thị nhãn nộp muộn; sửa trạng thái tải ở form nộp báo cáo; thêm xóa một/nhiều công việc theo quyền.

Đây là chức năng hiện có trong bản mã nguồn đối chiếu, không phải kết quả kiểm tra trực tiếp AWS. Cần chạy migration còn thiếu và kiểm thử trên môi trường thật trước nghiệm thu.

${sources}
`, `# Twelve-week personal worklog

Orientation: **7 August 2026**. Twelve Monday–Friday weeks: **10 August–30 October 2026**. The full internship outline ends on **28 November**.

1 September is in week 4; 29 September is in week 8; 26 October begins week 12. This worklog records personal study of AWS services and their application to CloudDocs. Daily scheduling is reconstructed for review; planned dates are not verified completion dates.

${weekLinks}

## Later updates: 31 October–7 November

Current source includes Cognito, trash/restore/permanent deletion, bulk document actions, quotas, work assignments, report submission and review, late submission labels and task deletion. These are recorded separately from the twelve-week timeline. AWS deployment was not live-tested during report preparation.
`, 'Twelve-week worklog','1.');

page('2-Proposal','Bản đề xuất',2,`
Tại phần này, em trình bày đề xuất **CloudDocs — Hệ thống quản lý tài liệu doanh nghiệp trên nền tảng đám mây AWS**. Bố cục giữ tám mục của bản mẫu và điều chỉnh theo đề cương đồ án.

# CloudDocs — Quản lý tài liệu doanh nghiệp trên AWS
## Giải pháp kết hợp Spring Boot, MySQL, S3 và Cognito

### 1. Tóm tắt điều hành

CloudDocs tập trung tài liệu và quy trình xử lý công việc vào một ứng dụng web. ADMIN quản trị tài khoản, tài liệu và thông báo; USER quản lý tài liệu thuộc sở hữu hoặc được chia sẻ. Backend Java 21/Spring Boot 3.5.6 xử lý REST API và phân quyền; frontend HTML/CSS/JavaScript cung cấp giao diện; MySQL lưu metadata, quan hệ chia sẻ, quota và nhật ký nghiệp vụ. Tệp được lưu trên S3 private, xác thực qua Cognito User Pool.

Kiến trúc triển khai mục tiêu sử dụng EC2 chạy ứng dụng và Nginx, RDS MySQL cho cơ sở dữ liệu, IAM Role cho quyền S3. Nhóm đã có mã tích hợp S3 và Cognito; người dùng xác nhận S3/Cognito/RDS hoạt động. Bản đề xuất không xác nhận một endpoint EC2 đang vận hành khi chưa có minh chứng.

### 2. Tuyên bố vấn đề

*Vấn đề hiện tại*

Tài liệu phân tán trên máy cá nhân hoặc kênh chat khiến khó tra cứu, quản lý quyền và xác định ai đã thay đổi dữ liệu. Việc xóa nhầm, chia sẻ quá rộng, thiếu kiểm soát dung lượng và thiếu liên kết giữa công việc với báo cáo làm giảm khả năng theo dõi.

*Giải pháp*

CloudDocs tổ chức tài liệu theo metadata và phòng ban, hỗ trợ tìm kiếm/lọc, xem trước, tải xuống, chia sẻ theo quyền, yêu thích và thùng rác. Backend kiểm tra quyền trước khi cấp URL có thời hạn; tệp truyền trực tiếp giữa trình duyệt và S3. MySQL lưu thông tin nghiệp vụ và audit. Luồng giao việc–nộp báo cáo–duyệt/yêu cầu sửa là phần mở rộng hiện có đầu tháng 11.

*Lợi ích và hoàn vốn đầu tư (ROI)*

- Giảm thao tác tìm kiếm và chia sẻ thủ công; có thể đo bằng thời gian thực hiện cùng một kịch bản trước/sau.
- Tách tệp khỏi metadata giúp quản lý dữ liệu rõ hơn và hạn chế backend phải trung chuyển nội dung tệp.
- Thùng rác và audit hỗ trợ xử lý nhầm lẫn; quota giới hạn cấp phát theo tài khoản.
- Chưa có dữ liệu vận hành để tính ROI tài chính hoặc tỷ lệ tiết kiệm. Chi phí được lập theo giả định, đối chiếu Billing khi triển khai.

### 3. Kiến trúc giải pháp

![Kiến trúc CloudDocs](/images/vietnam-it-job-market-architecture.svg)

*Dịch vụ AWS sử dụng / dự kiến vận hành*

| Nhóm | Thành phần | Vai trò và trạng thái |
| --- | --- | --- |
| Compute | Amazon EC2, Nginx | Môi trường triển khai mục tiêu; cần kiểm tra bản chạy thực tế |
| Database | Amazon RDS for MySQL | Metadata, users, quyền và audit; RDS hoạt động theo xác nhận người dùng |
| Storage | Amazon S3 | Bucket private, signed PUT/GET, xác nhận object; đã tích hợp trong mã |
| Identity | Amazon Cognito User Pool | Đăng nhập PKCE, phát hành access token; đã tích hợp trong mã |
| Security/network | IAM Role, VPC, Security Group | Quyền tài nguyên và giới hạn kết nối; cấu hình theo môi trường |
| Operations | CloudWatch, Budgets | Hướng dẫn/đề xuất giám sát và chi phí; chưa có minh chứng đã bật |

*Thiết kế thành phần*

- **Frontend:** giao diện tĩnh; Cognito public app client không chứa client secret. Đổi callback, logout và API_BASE theo môi trường.
- **Backend:** xác thực JWT, đọc role/status từ MySQL, kiểm tra owner_id và quyền tài liệu, quản lý trạng thái upload và quota.
- **RDS/MySQL:** lưu users, documents, permissions, favorites, notifications, audit và work_tasks theo schema phiên bản hiện tại.
- **S3:** object key UUID; tên gốc lưu trong metadata. Luồng metadata → signed PUT → PUT S3 → upload-complete/HEAD; signed GET cấp sau kiểm tra quyền.
- **Cognito:** liên kết issuer/sub, không dùng email để xác định tài khoản; hệ thống phân biệt vai trò ADMIN/USER với quyền tài liệu OWNER/VIEW/DOWNLOAD/EDIT.
- **Luồng local cũ:** endpoint local file còn giữ để tương thích; giao diện hiện hành dùng S3, không kết luận mọi tệp lịch sử đã được chuyển lên S3.

### 4. Triển khai kỹ thuật

*Các giai đoạn triển khai*

1. Khảo sát nghiệp vụ, tìm hiểu AWS và thiết kế ma trận quyền.
2. Xây dựng ERD, backend/frontend và API metadata; quản lý mã nguồn Git.
3. Tích hợp S3 private, CORS, presigned URL, chia sẻ và audit; chuẩn bị test case.
4. Chuẩn bị EC2/RDS, IAM Role, cấu hình Nginx và biến môi trường.
5. Ghép Cognito và kiểm thử tích hợp theo tiến độ thực tế; hoàn thiện quota, thùng rác và luồng công việc ở giai đoạn tiếp theo.

*Yêu cầu kỹ thuật*

- Java 21, Maven, MySQL 8 và Node.js dùng phục vụ frontend/kiểm thử; frontend không phải React và không có bước npm build.
- Schema gốc hợp lệ và migration còn thiếu. Dự án dùng ddl-auto=validate, không tự tạo database từ đầu.
- AWS account, S3 bucket, Cognito pool/client/domain; RDS endpoint; EC2 và IAM Role nếu triển khai cloud.
- Không đưa password, access key, token hoặc client secret vào repository. DB triển khai cần TLS; cấu hình local không được sao chép nguyên trạng sang AWS.

### 5. Lộ trình & Mốc triển khai

| Giai đoạn | Thời gian theo báo cáo | Đầu ra cần đối chiếu |
| --- | --- | --- |
| Khởi động | 07/08/2026 | Tiếp nhận yêu cầu và thống nhất phạm vi |
| AWS nền tảng, khảo sát, thiết kế | Tuần 1–3, 10–28/08 | Kiến thức AWS nền tảng, ma trận quyền, ERD, khung ứng dụng |
| API và giao diện | Tuần 4–6, 31/08–18/09 | Metadata, luồng tệp và kế hoạch DB |
| S3 và kiểm soát truy cập | Tuần 7–9, 21/09–09/10 | Preview/download, CORS, chia sẻ và chuẩn bị Cognito |
| Hạ tầng, kiểm thử và tài liệu | Tuần 10–12, 12–30/10 | Checklist EC2/RDS, quota, bản thảo workshop |
| Tích hợp và mở rộng sau 12 tuần | 31/10–07/11, tiếp tục đến 28/11 | Cognito, thùng rác, công việc/báo cáo và nghiệm thu theo thực tế |

Lịch 12 tuần là bản tổng hợp quá trình học tập theo ngày làm việc. Đề cương gốc sử dụng tuần từ 07/08 và xếp Cognito ở giai đoạn 30/10–12/11; cần giữ lịch sử commit/biên bản để xác nhận tiến độ thực tế.

### 6. Ước tính ngân sách

*Giả định demo:* một EC2, một RDS MySQL Single-AZ, 5 GB tệp S3, 20 GB EBS, khoảng 10 người dùng, chạy hạ tầng 160 giờ/tháng để học tập. Đây là giả định lập dự toán, không phải số đo hay báo giá AWS.

| Hạng mục | Cách tính cần nhập vào AWS Pricing Calculator |
| --- | --- |
| EC2 compute | Giá instance/giờ × 160 giờ; so sánh 730 giờ nếu chạy liên tục |
| EBS | 20 GB × giá GB-tháng, kể cả lúc EC2 dừng |
| RDS compute | Giá DB instance/giờ × số giờ chạy thực tế |
| RDS storage/backup | Dung lượng cấp phát × giá GB-tháng, cộng backup/snapshot tính phí |
| S3 | 5 GB-tháng + PUT/GET/HEAD + truyền dữ liệu theo thực tế |
| Public IPv4 và mạng | Số IP × giờ tính phí; thêm NAT Gateway hoặc endpoint nếu có |
| Cognito | MAU và tính năng/tier theo tài khoản |
| CloudWatch/Budgets | Lượng log, retention, metric/alarm và tính năng ngân sách đã chọn |
| Tên miền/HTTPS | Chỉ cộng dịch vụ được chọn; không tự ghi Route 53/ALB là đã dùng |
| Tổng | Tổng các dòng theo Region, cấu hình và giá tại ngày lập dự toán |

Chưa có bảng tài nguyên/giá đầu vào để đưa ra tổng tiền đáng tin cậy. Lập ước tính riêng cho CloudDocs tại [AWS Pricing Calculator](https://calculator.aws/), lưu bản export và so với Billing trước khi nộp. Quyền lợi Free Tier/credit phải được đối chiếu theo tài khoản; dừng RDS cũng không thay cho quy trình quản lý chi phí dài hạn.

### 7. Đánh giá rủi ro

*Ma trận rủi ro*

| Rủi ro | Ảnh hưởng | Khả năng định tính |
| --- | --- | --- |
| Sai IAM, CORS hoặc Region làm lỗi S3 | Cao | Trung bình |
| RDS không kết nối / sai schema | Cao | Trung bình |
| Sai callback, issuer hoặc app client | Cao | Trung bình |
| Không nhất quán metadata/object sau lỗi upload | Cao | Trung bình |
| URL đã cấp còn hiệu lực khi thu hồi quyền | Trung bình | Là đặc tính thiết kế hiện tại |
| Chạy migration lặp hoặc nhầm database | Cao | Trung bình |
| Chi phí tài nguyên tồn dư | Trung bình | Trung bình |
| Nhầm tiến độ tái dựng với lịch sử thực tế | Trung bình | Giảm bằng đối chiếu minh chứng |

*Chiến lược giảm thiểu*

Giữ bucket private, dùng IAM Role giới hạn prefix, kiểm tra quyền ở backend và đặt URL thời hạn ngắn. Sao lưu DB, preflight migration, đối soát HEAD object và kiểm thử tài khoản khác nhau. Cấu hình SG theo nguồn được phép, TLS khi kết nối RDS, quản lý secrets ngoài mã nguồn. Ghi nhận chi phí và dọn tài nguyên demo khi kết thúc.

*Kế hoạch dự phòng*

Giữ bản build trước, bản sao DB và cấu hình môi trường có kiểm soát. Nếu EC2 chưa sẵn sàng, trình diễn ứng dụng local kết nối dịch vụ được phép và ghi đúng môi trường demo. Không khôi phục DB tùy tiện lên dữ liệu đang sử dụng; thử phục hồi trên bản sao trước.

### 8. Kết quả kỳ vọng

*Cải tiến kỹ thuật*

- Trình diễn được đăng nhập, upload, preview/download, chia sẻ/thu hồi và audit với hai vai trò.
- Đối chiếu được quota, thùng rác, khôi phục và xóa vĩnh viễn với metadata/S3.
- Trình diễn công việc, nộp báo cáo, chờ duyệt, yêu cầu sửa và nộp muộn ở phiên bản mở rộng.
- Có tài liệu triển khai, cấu hình môi trường và kịch bản kiểm thử theo đúng mã nguồn.

*Giá trị dài hạn*

Rèn kỹ năng backend, xác thực, phân quyền, dữ liệu quan hệ, lưu trữ đối tượng và tự tìm hiểu kiến trúc ứng dụng. Hướng mở rộng gồm tự động hóa triển khai, tăng khả năng phục hồi, quét tệp, theo dõi phiên bản báo cáo và giám sát; chỉ đưa vào kết quả đã làm khi có triển khai thực tế.

${sources}
`, `# CloudDocs proposal

## 1. Executive summary
CloudDocs is an enterprise document management application using Java 21/Spring Boot, vanilla HTML/CSS/JavaScript, MySQL, private S3 and Cognito. EC2/Nginx with RDS is the target hosting architecture; a running EC2 endpoint was not verified.

## 2. Problem statement
Scattered files complicate discovery, access control, recovery and accountability. CloudDocs centralizes metadata, sharing and business audit records. Financial ROI has not been measured.

## 3. Solution architecture
![CloudDocs architecture](/images/vietnam-it-job-market-architecture.svg)
The backend authorizes each operation; MySQL stores metadata and permissions. The browser transfers files with signed S3 URLs. Cognito uses Authorization Code + PKCE and issuer/sub identity mapping.

## 4. Technical implementation
Use the existing schema, reviewed migrations, Java 21, Maven and MySQL 8. Configure S3 CORS, Cognito callback/logout, backend environment and an EC2 IAM role. Current frontend needs no React build. See the workshop for steps.

## 5. Roadmap and milestones
Orientation is 7 August. Twelve working weeks run from 10 August to 30 October. The original outline continues through 28 November; Cognito integration and November workflow improvements must not be backdated.

## 6. Budget estimate
Model one EC2, one Single-AZ RDS, 20 GB EBS, 5 GB S3, ten users and 160 compute hours/month. Add storage, requests, IPs, transfer, backups, identity and logs. No monetary total is claimed without a region/configuration estimate. Use [AWS Pricing Calculator](https://calculator.aws/).

## 7. Risk assessment
Review IAM/CORS, JWT settings, DB schema, migration ordering, object/metadata consistency and retained costs. Previously issued signed URLs may remain valid until expiry. Back up and verify on a copy before migration.

## 8. Expected outcomes
Demonstrate authentication, private file access, sharing/revocation and audit, plus trash, quotas and assignment/report approval in the later release. Record real evidence and environment; do not claim live AWS validation from mocked tests.
`, 'Proposal','2.');

page('3-BlogsPosted','Các bài viết kỹ thuật',3,`
# Các bài viết kỹ thuật

Chưa có đường dẫn bài blog đã đăng được cung cấp cho CloudDocs. Danh sách bài xuất bản sẽ được bổ sung theo sản phẩm thực tế của nhóm.

| Chủ đề có thể phát triển từ đồ án | Nội dung |
| --- | --- |
| Upload tài liệu S3 private bằng presigned URL | Metadata, kiểm tra quota, PUT và HEAD xác nhận |
| Cognito PKCE và Spring Security | Access token, issuer/sub và phân quyền nội bộ |
| Nhất quán MySQL–S3 và audit | Upload lỗi, thùng rác, xóa vĩnh viễn, quyền đã thu hồi |

Các chủ đề trên là gợi ý biên soạn, chưa được ghi nhận là bài đã xuất bản. Khi có bài thật, bổ sung tiêu đề, tác giả, ngày đăng và URL.
`, '# Technical articles\n\nNo published CloudDocs blog URL was provided. Suggested subjects are private S3 uploads, Cognito PKCE with Spring Security, and MySQL–S3 consistency. These are proposed articles, not publication claims.', 'Technical articles','3.');
page('4-EventParticipated','Các sự kiện đã tham gia',4,`
# CÁC EVENTS ĐÃ THAM GIA

Trong quá trình thực tập, em đã tham gia các sự kiện với mỗi sự kiện là một trải nghiệm đáng nhớ với những kiến thức mới, hay và bổ ích, cùng với đó là những khoảnh khắc rất tuyệt vời.

| Sự kiện | Thời gian | Vai trò |
| --- | --- | --- |
| [Mini Meetup – First Cloud AI Journey](4.1-Event1/) | 17/10/2026 | Người tham dự |

Danh sách hiện ghi một sự kiện theo thông tin được cung cấp; không giữ các sự kiện của người viết bản mẫu.
`, '# Participated events\n\n[Mini Meetup – First Cloud AI Journey](4.1-Event1/), 17 October 2026. Role: attendee. Only the event supplied by the user is recorded.', 'Participated events','4.');
page('4-EventParticipated/4.1-Event1','Mini Meetup – First Cloud AI Journey',1,`
# Event 1

| Thông tin | Nội dung |
| --- | --- |
| Tên sự kiện | Mini Meetup – First Cloud AI Journey |
| Thời gian | 17/10/2026 |
| Địa điểm | AWS Office – Grand Terra Tower, 36 Cát Linh, Hà Nội |
| Đơn vị tổ chức | Cộng đồng First Cloud AI Journey (FCAJ) |
| Vai trò trong sự kiện | Người tham dự |

## Liên hệ với quá trình thực tập

Sự kiện là hoạt động cộng đồng trong giai đoạn thực tập CloudDocs, bổ sung trải nghiệm bên cạnh việc tự học và phát triển dự án. Nội dung liên hệ trong báo cáo tập trung vào tinh thần học hỏi, trao đổi và chủ động tìm hiểu công nghệ đám mây.

Chưa có agenda, ghi chú diễn giả hoặc ảnh tham dự được cung cấp nên không ghi thêm chủ đề bài nói, chứng nhận, hoạt động trình bày hay kết quả cụ thể. Có thể bổ sung ảnh thực tế và cảm nhận cá nhân sau khi đối chiếu.
`, '# Event 1\n\n**Mini Meetup – First Cloud AI Journey**\n\n- Date: 17 October 2026.\n- Location: AWS Office – Grand Terra Tower, 36 Cát Linh, Hà Nội.\n- Organizer: First Cloud AI Journey community (FCAJ).\n- Role: attendee.\n\nNo agenda, speaker notes, attendance photo or certificate was supplied; no additional participation claims are made.', 'Mini Meetup – First Cloud AI Journey','4.1.');

const workshop = [];
function lab(slug,title,body,en){ workshop.push({slug,title}); page(`5-Workshop/${slug}`,title,Number(slug.split('-')[0].split('.')[1]),body,en,title,slug.split('-')[0]+'.'); }
lab('5.1-Workshop-overview','Tổng quan workshop',`
# Triển khai CloudDocs trên AWS

## Mục tiêu

Triển khai một ứng dụng quản lý tài liệu sử dụng EC2, RDS MySQL, S3 private và Cognito; hiểu trách nhiệm của từng thành phần, kiểm tra quyền và thu thập minh chứng. Đây là hướng dẫn áp dụng từ mã nguồn hiện có, chưa phải biên bản hoàn tất tất cả bước trên tài khoản AWS.

![Kiến trúc CloudDocs](/images/vietnam-it-job-market-architecture.svg)

## Luồng xử lý

1. Trình duyệt đăng nhập Cognito qua Authorization Code + PKCE, nhận access token.
2. Frontend gọi Spring Boot API qua Nginx; backend kiểm tra token và trạng thái tài khoản MySQL.
3. Tạo metadata, kiểm tra quota và cấp URL PUT. Trình duyệt upload trực tiếp tới S3.
4. Gọi upload-complete; backend HEAD object và xác nhận kích thước.
5. Khi xem/tải, backend kiểm tra quyền hiện tại rồi cấp URL GET có thời hạn.
6. Chia sẻ, audit, quota và trạng thái nghiệp vụ được quản lý bởi backend/MySQL.

## Phạm vi phiên bản hiện tại

Có tài liệu, chia sẻ, yêu thích, thông báo, tài khoản, dung lượng; bản cập nhật đầu tháng 11 có thùng rác, thao tác hàng loạt và công việc/báo cáo. Thông báo hiện lưu trong CSDL, không mặc định có SNS, SQS, SES hoặc WebSocket. Chưa có nhắc hạn tự động hay lịch sử phiên bản báo cáo riêng.

**Kiểm chứng hoàn tất:** có URL chạy thật, kết quả health/API, ảnh đăng nhập, upload S3 và kiểm thử hai tài khoản; che password, token và signed URL trong minh chứng.
`, '# Workshop overview\n\nTarget: EC2/Nginx + Spring Boot + RDS MySQL + private S3 + Cognito. Authenticate with PKCE, authorize in the backend, allocate metadata, upload directly with signed PUT, confirm with HEAD and use signed GET for access. Notifications are database-backed, not an assumed SNS/SQS pipeline. This is a deployment guide, not a completed live deployment certificate.');
lab('5.2-Prerequisites','Chuẩn bị môi trường',`
## Điều kiện trước khi bắt đầu

| Thành phần | Cần chuẩn bị |
| --- | --- |
| Repository | Bản CloudDocs đang sử dụng, gồm Back_end, FrontEnd, scripts |
| Công cụ | Git, Java 21, Maven, MySQL client, Node.js; AWS CLI nếu dùng CLI |
| Database | Bản export schema hiện có và dữ liệu thử đã được phép sử dụng |
| AWS | Quyền tạo/quản lý tài nguyên trong môi trường demo được giao |
| Môi trường | Region của S3/RDS/EC2; Region và issuer riêng của Cognito |
| Tên miền | Origin HTTPS dự kiến; URL callback/logout khớp tuyệt đối |

Không giả định S3 và Cognito cùng Region: cấu hình hiện có có thể khác nhau. Backend dùng AWS_REGION cho S3; COGNITO_ISSUER_URI phải thuộc User Pool thực tế.

## Kiểm tra bản nguồn tại máy

Chạy trong repository CloudDocs, không chạy trong thư mục website báo cáo:

~~~powershell
java -version
mvn -version
node --version
mvn -f Back_end/pom.xml package
node --test FrontEnd/tests/*.test.cjs
~~~

Các lệnh build/test không chứng minh đã kết nối AWS thật. Lưu kết quả và phiên bản commit; không viết số ca pass khi chưa chạy.

## Chạy local để có bản đối chiếu

1. Import schema đúng và migration cần thiết theo mục RDS.
2. Cấu hình Cognito public client/callback tại FrontEnd/js/cognito-config.js, API_BASE trong app.js.
3. Dùng scripts/start-local-backend.ps1; script hỏi mật khẩu DB. Nếu pool khác cấu hình mẫu, điều chỉnh issuer/client/UserInfo đồng bộ; script hiện có gán giá trị phát triển cụ thể.
4. Dùng scripts/start-frontend.ps1 hoặc node scripts/serve-frontend.cjs; mở URL script in ra.
5. Kiểm tra /api/health và đăng nhập. Local vẫn dùng Cognito, không có cơ chế đăng nhập mật khẩu local thay thế.

**Đầu ra:** môi trường, commit, schema và cấu hình công khai đã được đối chiếu; không lưu secret vào báo cáo.
`, '# Prerequisites\n\nPrepare the actual CloudDocs repository, Java 21, Maven, Node.js, MySQL client, an authorized schema export and an AWS demo account. Record S3/RDS/EC2 region separately from Cognito issuer region. Build with `mvn -f Back_end/pom.xml package` and run `node --test FrontEnd/tests/*.test.cjs`. Import the existing schema before starting; local authentication also uses Cognito. Read the Vietnamese steps for exact configuration and startup script limitations.');
lab('5.3-IAM-VPC','IAM, VPC và kết nối an toàn',`
## 1. Chọn tài khoản và mạng

Xác định account/Region, gắn tag Project=CloudDocs và Environment=demo cho tài nguyên hỗ trợ. Dùng VPC hiện có hợp lệ hoặc tạo VPC lab: EC2 ở subnet có đường ra phù hợp, RDS ở DB subnet group gồm subnet thuộc ít nhất hai Availability Zone. RDS Single-AZ vẫn cần subnet group hợp lệ.

## 2. Security Group

| Nhóm | Inbound dự kiến | Ghi chú |
| --- | --- | --- |
| clouddocs-web-sg | 443 từ người dùng; 80 nếu chuyển hướng/cấp chứng chỉ | Nginx kết thúc TLS; không công khai 8080 |
| clouddocs-db-sg | 3306 từ clouddocs-web-sg | Không mở MySQL ra toàn Internet |
| Quản trị | Session Manager nếu cấu hình đủ quyền/kết nối; SSH giới hạn IP nếu cần | Không giả định Session Manager tự hoạt động |

RDS private không kết nối trực tiếp từ laptop qua Internet. Dùng đường quản trị được cho phép như tunnel/SSM/VPN hoặc thao tác từ EC2; không sửa thành public chỉ để bỏ qua lỗi mạng.

## 3. IAM Role cho EC2

Tạo role trust EC2, gắn policy chỉ cho bucket/prefix của dự án. Đây là mẫu; thay ACCOUNT/BUCKET theo môi trường trước khi áp dụng:

~~~json
{
  "Version": "2012-10-17",
  "Statement": [
    {"Effect":"Allow","Action":"s3:ListBucket","Resource":"arn:aws:s3:::YOUR_BUCKET","Condition":{"StringLike":{"s3:prefix":["documents","documents/*"]}}},
    {"Effect":"Allow","Action":["s3:GetObject","s3:PutObject","s3:DeleteObject"],"Resource":"arn:aws:s3:::YOUR_BUCKET/documents/*"}
  ]
}
~~~

Gắn role qua instance profile, backend dùng default credential provider chain. HeadObject sử dụng quyền GetObject; nếu chọn SSE-KMS cần bổ sung quyền KMS và key policy phù hợp. Không đưa khóa AWS xuống frontend.

## 4. Chéo tài khoản nếu có

Chỉ cấu hình theo tài khoản triển khai thật. Nếu ứng dụng dùng AssumeRole cần trust policy, quyền sts:AssumeRole và credential flow tương ứng; không chỉ thêm policy một phía. Với resource policy trực tiếp cần kiểm tra cả policy của role và bucket. Nội dung này là nhánh triển khai tùy môi trường, không mặc định đã được dùng.

**Kiểm tra:** EC2 kết nối RDS qua SG đúng; backend có Get/Put/Delete trên prefix dự án; origin công khai không truy cập cổng DB/backend.
`, '# IAM and networking\n\nUse scoped EC2 instance-role permissions for S3 documents/*. Keep the DB private and allow MySQL from the application security group. Serve HTTPS through Nginx without exposing port 8080. A DB subnet group must span at least two Availability Zones. Cross-account access is conditional and must match the actual credential/resource-policy design; it is not implied by attaching one policy.');
lab('5.4-S3','Tạo S3 private và cấu hình CORS',`
## 1. Tạo hoặc đối chiếu bucket

Trong S3 Console, chọn bucket dự án ở Region đã thống nhất, giữ **Block Public Access**, Object Ownership **Bucket owner enforced** và mã hóa mặc định. Nếu bucket đang dùng có dữ liệu, đối chiếu trước khi chỉnh sửa. Không bật public website cho bucket tài liệu.

Backend hiện sử dụng prefix documents/ và key UUID. Mẫu policy, CORS và script nằm trong Back_end/aws/s3; đây là công cụ thay đổi hạ tầng khi chạy, không phải bước khởi động ứng dụng bắt buộc.

## 2. CORS theo origin thật

Ví dụ nhập tại S3 Console → Permissions → CORS (thay origin):

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

Trong Console nhập **mảng rule** như trên. File JSON dùng với AWS CLI có dạng object chứa CORSRules như mẫu repository. Nếu cần local, thêm đúng origin http://localhost:5500 hoặc http://127.0.0.1:5500 đang dùng. CORS không thay thế IAM và không tự làm bucket công khai.

## 3. Cấu hình backend

| Biến | Giá trị cần đặt |
| --- | --- |
| AWS_REGION | Region bucket thật |
| S3_BUCKET | Tên bucket của nhóm |
| S3_PRESIGN_EXPIRY | Thời gian giây; mặc định hiện có 900, có thể giảm theo nhu cầu |

## 4. Kiểm tra luồng chuẩn

1. Đăng nhập, tạo metadata qua POST /api/documents.
2. POST /api/documents/{id}/upload-url; không tự đoán trường JSON, dùng giao diện/DTO của phiên bản đang chạy.
3. Frontend PUT File tới URL S3, giữ nguyên header được ký.
4. POST /api/documents/{id}/upload-complete; backend HEAD object và xác nhận kích thước.
5. GET preview-url/download-url bằng tài khoản có quyền, mở URL mới được cấp.

**Kết quả mong đợi:** object private tồn tại, metadata xác nhận upload và tài khoản khác bị từ chối khi chưa được chia sẻ. URL ký trước có thể còn dùng được tới khi hết hạn; credential tạm hết hạn có thể làm URL hết hiệu lực sớm hơn.

## Lỗi thường gặp

403: kiểm tra principal ký, policy, prefix, Region, header và URL hết hạn. CORS: so origin đầy đủ scheme/host/port; test từ browser. Metadata đã tạo nhưng file thiếu: không coi upload hoàn tất; xử lý allocation chờ theo luồng ứng dụng.

Tham khảo [CORS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html) và [presigned URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html).
`, '# Private S3 and CORS\n\nKeep Block Public Access enabled, ACLs disabled and encryption configured. Grant the instance role only required object operations. S3 Console CORS expects an array; AWS CLI input wraps rules in CORSRules. Allow the actual frontend origin and GET/HEAD/PUT. Configure AWS_REGION, S3_BUCKET and S3_PRESIGN_EXPIRY. Test metadata allocation → signed PUT → direct transfer → upload-complete/HEAD → authorized signed GET. Existing signed URLs may remain valid until expiry.');
lab('5.5-RDS','RDS MySQL, schema và migration',`
## 1. Chuẩn bị RDS

Trong RDS Console tạo/đối chiếu MySQL phù hợp với bản ứng dụng. Chọn VPC/subnet group và DB SG đã chuẩn bị; cấu hình storage, backup retention và quản lý mật khẩu theo môi trường. Đối với lab một DB Single-AZ, không ghi là Multi-AZ nếu chưa cấu hình. Ghi lại endpoint, port và schema name ở nơi quản lý cấu hình.

## 2. Import schema gốc

Repository hiện **không có bộ cài schema trống hoàn chỉnh**. Sử dụng bản export đã được kiểm tra nguồn gốc và schema, kiểm tra dữ liệu nhạy cảm và import vào DB thử trước. Các bảng nghiệp vụ nền như users/documents/audit_logs phải tồn tại. Không chạy migration tăng dần lên DB rỗng và không bật ddl-auto=update để né lỗi validate.

## 3. Rà soát migration

| Thứ tự | File trong Back_end/db/migration | Vai trò |
| --- | --- | --- |
| 0 | 00_PRECHECK.sql | Kiểm tra tham chiếu chủ sở hữu cũ |
| 1 | 01_APPLY_document_permissions.sql | owner_id và quyền chia sẻ |
| 2 | 02_APPLY_document_favorites.sql | Yêu thích |
| 3 | 03_APPLY_notifications.sql | Thông báo chung |
| 4 | 04_APPLY_cognito_identities.sql | Ánh xạ issuer/sub |
| 5 | 05_APPLY_optional_contact_email.sql | Email liên hệ tùy chọn |
| 6 | 06_APPLY_work_tasks.sql | Công việc và thông báo người nhận; thuộc bản cập nhật tháng 11 |

Chỉ áp dụng bước còn thiếu sau khi sao lưu và preflight đúng database. Migration 04 và share-cognito-identities.sql là hai cách tạo cùng bảng, không chạy nối tiếp. MySQL DDL có thể tự commit; không coi một ROLLBACK là hoàn tác toàn bộ ALTER/CREATE.

## 4. Kết nối ứng dụng

Đặt DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD ngoài mã nguồn. Chọn user ứng dụng có quyền cần thiết, tách khỏi user quản trị migration.

**TLS:** cấu hình application.yml hiện có chuỗi JDBC local chứa useSSL=false. Khi lên AWS, ghi đè SPRING_DATASOURCE_URL bằng JDBC URL của RDS dùng sslMode=VERIFY_IDENTITY và cấu hình truststore/CA bundle RDS phù hợp với JVM. Kiểm tra SSL session; không chỉ đổi DB_HOST rồi mặc định kết nối đã được mã hóa.

## 5. Kiểm tra

Khởi động backend bằng schema đã kiểm tra; xác nhận ddl-auto=validate không báo thiếu bảng/cột. Chạy đọc/ghi dữ liệu thử được phép, kiểm tra metadata/audit và chụp kết quả đã che thông tin nhạy cảm. Thử phục hồi backup trên DB riêng trước khi ghi là đã kiểm chứng khôi phục.
`, '# RDS and schema\n\nPrepare a private MySQL instance and import the authorized existing base schema. The repository provides incremental migrations, not an empty-database installer. Preflight, back up and apply only missing changes; do not run migration 04 and its alternative identity script together. Migration 06 belongs to the November work-task release. Override the local JDBC URL using TLS identity verification and the correct RDS CA/JVM trust configuration. Schema validation does not perform migrations.');
lab('5.6-Cognito','Cognito và xác thực người dùng',`
## 1. User Pool và public app client

Tạo/đối chiếu User Pool, domain và app client cho web frontend. Sử dụng **public client không có client secret**, Authorization Code grant và PKCE. Callback/logout phải khớp URL thực tế; dùng HTTPS khi triển khai. Chọn scope phù hợp luồng UserInfo, thường gồm openid, profile, email theo cấu hình ứng dụng. Không bật thêm grant ngoài nhu cầu.

## 2. Cấu hình đồng bộ

| Vị trí | Nội dung |
| --- | --- |
| FrontEnd/js/cognito-config.js | Domain, client ID, redirectUri/logoutUri, scope theo cấu trúc file thật |
| Backend COGNITO_ISSUER_URI | Issuer https://cognito-idp.REGION.amazonaws.com/POOL_ID |
| Backend COGNITO_CLIENT_ID | Public app client ID tương ứng |
| Backend COGNITO_USER_INFO_URI | Domain UserInfo của chính pool đang dùng |
| Backend CORS_ALLOWED_ORIGINS | Origin frontend thực tế |

Không sao chép issuer/client công khai của bản dev sang pool khác. Khi dùng script local cần đọc các giá trị script đang gán; không giả định biến môi trường ngoài script luôn được giữ nguyên.

## 3. Backend xác thực và danh tính nội bộ

Backend kiểm tra chữ ký JWT, issuer, thời gian hiệu lực, token_use=access, client_id và sub. Hệ thống ánh xạ issuer/sub với tài khoản MySQL, rồi đọc role/status hiện hành. Email và họ tên là dữ liệu hồ sơ, không thay thế khóa định danh.

Tài khoản mới là USER; bootstrap ADMIN đầu tiên theo template Back_end/db/bootstrap-cognito-admin.sql sau khi rà soát, không sửa trực tiếp dữ liệu trên DB dùng chung tùy tiện. Template mặc định có mục tiêu NULL/ROLLBACK để người vận hành kiểm tra trước.

## 4. Kiểm thử

Đăng nhập, callback, GET /api/auth/me, đăng xuất. Kiểm tra token thiếu/sai/hết hạn bị từ chối; USER không gọi được API quản trị; tài khoản khóa/DELETED không còn truy cập nghiệp vụ. Logout không làm mọi bản sao access token mất hiệu lực ngay; không mô tả khác khả năng hiện tại.

Tham khảo [Cognito PKCE](https://docs.aws.amazon.com/cognito/latest/developerguide/using-pkce-in-authorization-code.html).
`, '# Cognito authentication\n\nConfigure a public client without a secret, Authorization Code + PKCE and exact callback/logout URLs. Match frontend configuration with COGNITO_ISSUER_URI, COGNITO_CLIENT_ID, COGNITO_USER_INFO_URI and backend CORS. Validate access JWTs and map issuer/sub to MySQL identities; email is not the identity key. New users are USER. Review the admin bootstrap template. Test missing/expired/invalid tokens and blocked accounts. Logout is not instant invalidation of every access-token copy.');
lab('5.7-EC2-Operations','EC2, Nginx và vận hành',`
## 1. Chuẩn bị máy chủ

Khởi tạo/đối chiếu EC2 Linux phù hợp, instance profile truy cập S3 và SG của phần mạng. Cài Java 21 và Nginx bằng package phù hợp OS. Build JAR trên môi trường đã kiểm tra, chuyển JAR và thư mục FrontEnd tới máy chủ; frontend hiện không cần npm install hay npm build. Không phục vụ cả repository bằng web server.

## 2. Cấu hình môi trường backend

Đặt cấu hình trong file môi trường chỉ người vận hành đọc được, nằm ngoài web root và repository. Các biến tối thiểu:

| Biến | Mục đích |
| --- | --- |
| SPRING_PROFILES_ACTIVE=aws | Profile triển khai |
| DB_HOST / DB_PORT / DB_NAME / DB_USERNAME / DB_PASSWORD | Kết nối CSDL |
| SPRING_DATASOURCE_URL | JDBC TLS override theo phần RDS |
| AWS_REGION / S3_BUCKET / S3_PRESIGN_EXPIRY | S3 đúng môi trường |
| COGNITO_ISSUER_URI / COGNITO_CLIENT_ID / COGNITO_USER_INFO_URI | Xác thực đúng pool |
| CORS_ALLOWED_ORIGINS | Origin frontend |
| PORT=8080 | Backend chỉ phục vụ sau reverse proxy |

Mẫu service systemd dưới đây cần thay đường dẫn và JAR thật; tạo user hệ thống clouddocs trước, cho quyền đọc cấu hình và tệp ứng dụng. Không dùng tên JAR giả làm lệnh có thể chạy nguyên xi.

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

Đổi tên bản build đã kiểm tra thành backend.jar khi đóng gói triển khai, kiểm tra /usr/bin/java thực sự là Java 21. Dùng systemctl daemon-reload, enable/start theo quy trình quản trị, rồi xem journalctl -u clouddocs để tìm lỗi. Không ghi password/token trong log.

## 3. Nginx phục vụ frontend và proxy

Ví dụ **bên trong server HTTPS đã cấu hình chứng chỉ hợp lệ** (thay domain, certificate và thư mục theo máy thật):

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

Copy **nội dung FrontEnd** vào web root ở ví dụ này. Nếu callback dùng prefix /FrontEnd/, cấu hình thư mục/Nginx phải bảo toàn prefix đó; không chỉ sửa Cognito một phía. Đặt API_BASE theo hostname/backend thật. Kiểm tra nginx -t trước reload. Cổng 80 chuyển hướng HTTPS theo chính sách môi trường; hướng dẫn này không giả định đã có tên miền/chứng chỉ.

## 4. Giám sát, sao lưu và chi phí

CloudWatch EC2 cơ bản có CPU/network/status checks; muốn RAM, filesystem và log ứng dụng cần cài/cấu hình agent, IAM và đường mạng phù hợp. Đặt retention, thử tạo một lỗi kiểm soát và kiểm tra log nhận được. RDS backup/snapshot cần theo retention thực tế và thử restore trên bản sao. Thiết lập ngân sách theo tài khoản được giao, ghi rõ người nhận và ngưỡng; không coi Budgets là công tắc tự dừng mọi tài nguyên.

CloudWatch/Budgets ở đây là hướng dẫn áp dụng, chưa được xác nhận đã cấu hình. Secrets Manager có thể bổ sung sau nhưng ứng dụng hiện đọc biến môi trường; tạo secret không tự khiến Spring Boot đọc secret đó.

## 5. Minh chứng triển khai

Ghi EC2 instance, commit/JAR, thời gian deploy, URL HTTPS, /api/health, kết nối RDS, upload S3 và đăng nhập Cognito. Dùng endpoint, hostname và ảnh của chính môi trường CloudDocs được kiểm tra.
`, '# EC2, Nginx and operations\n\nInstall Java 21 and Nginx, attach the S3 instance role, deploy the tested JAR and only the FrontEnd contents. Configure a non-root systemd service and an external restricted environment file. Set the AWS profile, TLS JDBC URL, Cognito values and actual frontend origin. Nginx serves HTTPS and proxies /api/ to localhost:8080. Preserve any callback path prefix. Validate Nginx configuration before reload. CloudWatch needs an agent/configuration for memory and application logs; monitoring, backups and budgets remain deployment steps until evidenced.');
lab('5.8-Smoke-Test','Kiểm thử nghiệp vụ và tích hợp',`
## Điều kiện kiểm thử

Ít nhất một ADMIN, hai USER đang hoạt động đã liên kết Cognito; tệp nhỏ được phép dùng, một file rỗng và một file quá giới hạn để thử từ chối. Dùng dữ liệu thử, ghi commit, môi trường, người chạy và thời điểm. Bảng sau là **kịch bản/kết quả mong đợi**, không phải bảng PASS sẵn.

| Mã | Kịch bản | Kết quả mong đợi |
| --- | --- | --- |
| AUTH-01 | Không gửi/sai/hết hạn access token | API nghiệp vụ từ chối, không lộ nội dung |
| AUTH-02 | USER gọi API quản trị | Bị từ chối |
| DOC-01 | Tạo metadata, PUT S3, xác nhận upload | Object tồn tại, metadata đúng và đọc lại được |
| DOC-02 | Upload trùng tên cùng lúc | Object key khác nhau, không ghi đè nhầm |
| DOC-03 | Upload lỗi hoặc chưa PUT, gọi confirm | Không xác nhận object thiếu; allocation được theo dõi |
| DOC-04 | File 0 byte | Preview/download xử lý hợp lệ theo định dạng |
| DOC-05 | File >100 MiB hoặc vượt quota | Bị từ chối; kiểm tra cấp phát không vượt hạn mức |
| ACL-01 | Chia sẻ VIEW cho USER B | B xem trước được, không được cấp download/edit |
| ACL-02 | Chia sẻ DOWNLOAD/EDIT | Cho phép đúng thao tác; không tự có quyền quản lý chia sẻ |
| ACL-03 | USER C không được chia sẻ | Không xem/tải/sửa được qua API |
| ACL-04 | Thu hồi quyền B | Yêu cầu cấp URL mới bị chặn; ghi nhận URL cũ còn hiệu lực tới expiry |
| TRASH-01 | Chủ sở hữu đưa file vào thùng rác | Chặn preview/download/edit/share, vẫn tính quota |
| TRASH-02 | Khôi phục | Trở về ACTIVE và giữ quyền chia sẻ cũ theo thiết kế |
| TRASH-03 | Xóa vĩnh viễn tệp thử | Xóa object/quyền, metadata PURGED size 0, giữ audit |
| BULK-01 | Chọn nhiều file có một lỗi quyền | Hiển thị thành công/thất bại từng file; xử lý lại phần lỗi |
| QUOTA-01 | Pending + trash + tài liệu được chia sẻ | Pending/trash tính cho chủ; chia sẻ không nhân dung lượng |
| AUDIT-01 | USER/ADMIN đọc nhật ký | USER chỉ audit do mình thực hiện; ADMIN xem toàn hệ thống |
| TASK-01 | ADMIN giao việc, USER nộp tài liệu hợp lệ | Thông báo riêng, trạng thái SUBMITTED/chờ duyệt |
| TASK-02 | Người giao yêu cầu sửa rồi duyệt | Đúng người có quyền; lưu feedback, audit và thông báo |
| TASK-03 | Nộp sau hạn | Được nộp và có nhãn nộp muộn; chờ duyệt không bị tính quá hạn do người duyệt chậm |
| TASK-04 | Hai tab dùng version cũ | Từ chối 409, yêu cầu tải lại dữ liệu |
| TASK-05 | Xóa/ghi đè file đang là báo cáo SUBMITTED/COMPLETED | API chặn theo guard của phiên bản hiện tại |
| TASK-06 | Xóa một/nhiều công việc | Chỉ ADMIN người giao; giữ tài liệu/quyền/audit, thông báo liên quan được xử lý |
| USER-01 | Xóa tài khoản còn tệp hoặc công việc chưa xong | Bị chặn theo điều kiện hiện hành |

TRASH/BULK/TASK và các sửa đổi tháng 11 kiểm tra trên bản hiện tại, không dùng bảng này để khẳng định hoàn thành ở tuần 12.

## Lưu kết quả

| Mã test | Người chạy | Thời gian / môi trường / commit | Kết quả thực tế | Minh chứng / lỗi |
| --- | --- | --- | --- | --- |
| Điền sau khi chạy | Chưa ghi nhận | Chưa ghi nhận | Chưa chạy trong lần biên soạn | Chưa có |

## Kiểm thử tự động và giới hạn

Trong repository CloudDocs: mvn -f Back_end/pom.xml test; node --test FrontEnd/tests/*.test.cjs. Kiểm thử dùng mock repository/AWS client không xác nhận migration RDS, khóa dòng, redirect Cognito, CORS S3 hay PDF trong trình duyệt. Không tự ghi tỷ lệ PASS hoặc SLA khi chưa có lần chạy đo được.
`, '# Integration and business tests\n\nUse an ADMIN and two USER identities with authorized test files. Check authentication failure, role boundaries, metadata/PUT/HEAD, empty and oversized files, sharing/revocation, trash/restore/purge, partial bulk failure, quota and audit scope. For the November release also test report submission/review, late submissions, stale versions (409), report-file guards and authorized task deletion. Record actual results, commit and evidence. Mock tests do not prove live migrations, Cognito redirects, S3 CORS or browser rendering.');
lab('5.9-Teardown','Dọn dẹp và bàn giao',`
## Trước khi dọn dẹp

Chỉ dọn tài nguyên demo thuộc phạm vi được phép. Kiểm tra tài nguyên còn phục vụ đồ án đến 28/11 hay không; không xóa hạ tầng dùng chung khi kết thúc một buổi workshop. Lập danh mục resource ID, Region/account, chủ sở hữu và dữ liệu cần giữ. Hướng dẫn này không thực hiện xóa tài nguyên AWS.

## Bàn giao

Lưu commit/JAR và hướng dẫn khởi động, danh mục cấu hình không chứa secret, schema/migration đã áp dụng, kết quả test và ảnh minh chứng. Bản sao lưu dữ liệu phải được lưu ở nơi được phép; kiểm tra khả năng phục hồi trên bản sao. Signed URL và access token không phải nội dung bàn giao.

## Thứ tự dọn môi trường demo sau khi được xác nhận

1. Dừng truy cập/tiến trình ứng dụng, ghi lại cấu hình cần giữ.
2. Sao lưu DB nếu cần, sau đó xóa RDS demo đúng phạm vi; rà soát final snapshot và retained backup còn phát sinh phí.
3. Xử lý tệp thử trên S3 đã xác định. Nếu bucket bật Versioning, rà soát phiên bản/delete marker riêng; xóa object hiện tại không tự xóa mọi version.
4. Terminate EC2 demo khi hết nhu cầu; kiểm tra EBS còn giữ, snapshot và public IPv4/Elastic IP.
5. Xóa Cognito pool/client demo nếu không còn dùng; không xóa pool nhóm đang sử dụng.
6. Rà soát CloudWatch log groups/alarms, tài nguyên mạng như NAT/endpoint, IAM role/policy và các tài nguyên liên quan thật sự đã tạo.
7. Kiểm tra Billing các Region sau thời gian cập nhật; dừng EC2 không tự ngừng chi phí EBS, snapshot hoặc IP còn cấp phát.

**Kết quả mong đợi:** có biên bản bàn giao và danh sách tài nguyên giữ/xóa; không ghi “chi phí bằng 0” khi chưa đối soát hóa đơn.
`, '# Cleanup and handover\n\nInventory authorized demo resources and preserve required evidence/backups before cleanup. Do not remove shared project infrastructure. When approved by its owner, clean up only the designated RDS, S3 objects/versions, EC2/EBS/IPs, Cognito and any monitoring/network resources actually created. Retained storage and backups may still incur charges. This guide does not execute AWS deletions or claim a zero bill.');
page('5-Workshop','Workshop CloudDocs trên AWS',5,`
# Triển khai CloudDocs trên AWS

Workshop hướng dẫn tự tìm hiểu và thực hành từ chuẩn bị đến kiểm thử, bàn giao theo kiến trúc của đồ án: **EC2/Nginx + Spring Boot + RDS MySQL + S3 private + Cognito**.

> Các bước là hướng dẫn để tái triển khai/đối chiếu. Mã nguồn có tích hợp S3/Cognito; RDS hoạt động theo thông tin người dùng. Chưa cung cấp URL EC2 hoặc bộ ảnh Console để chứng nhận đã hoàn tất toàn bộ workshop. CloudWatch, Budgets và cấu hình vận hành được ghi là phần áp dụng cần kiểm tra.

| Mục | Nội dung |
| --- | --- |
${workshop.map(w=>`| ${w.slug.split('-')[0]} | [${w.title}](${w.slug}/) |`).join('\n')}

## Tiêu chí hoàn thành

Ứng dụng chạy ở môi trường được ghi nhận; đăng nhập đúng; upload/preview/download và chia sẻ bị kiểm soát theo quyền; MySQL/S3 nhất quán trong các ca đã thử; có log và kết quả kiểm thử thực tế. Chỉ ghi dịch vụ đã dùng khi có cấu hình và minh chứng tương ứng.

${sources}
`, `# Deploy CloudDocs on AWS

This guide covers EC2/Nginx, Spring Boot, RDS MySQL, private S3 and Cognito. It is a reproducible deployment and review guide; it is not evidence that all AWS steps have been completed. No live EC2 demo URL was supplied.

${workshop.map(w=>`- [${w.title}](${w.slug}/)`).join('\n')}

Record actual environment, build, test results and evidence before marking the workshop complete.
`, 'CloudDocs AWS workshop','5.');
page('6-Self-evaluation','Tự đánh giá',6,`
# Tự đánh giá quá trình thực tập

Em là **Trần Hải Lương**, lớp **K68CNTTA**, mã sinh viên **687703**, thực tập tại **Amazon Web Services**. Trong quá trình thực tập, em tìm hiểu các dịch vụ AWS, kiến trúc ứng dụng và cách vận dụng vào CloudDocs. Mục này là bản tự đánh giá cá nhân cần em rà soát.

| Tiêu chí | Nội dung tự nhìn nhận | Mức tự đánh giá |
| --- | --- | --- |
| Kiến thức chuyên môn | Kết nối kiến thức REST API, MySQL, xác thực và S3 vào bài toán tài liệu | Chưa chấm; đối chiếu kết quả thực hiện |
| Khả năng học hỏi | Đọc tài liệu AWS và đối chiếu lỗi cấu hình với mã nguồn | Chưa chấm |
| Tinh thần trách nhiệm | Theo dõi tiến độ học tập, thực hành và hoàn thiện tài liệu cá nhân | Chưa chấm |
| Giải quyết vấn đề | Rà soát quyền, quota, trạng thái tệp và tính nhất quán dữ liệu | Chưa chấm |
| Trình bày kiến thức | Tổng hợp nội dung học tập, giải thích kiến trúc và cấu hình dịch vụ | Chưa chấm |
| Tài liệu và bàn giao | Viết worklog, proposal, workshop và kịch bản kiểm thử | Chưa chấm |

## Điểm cần tiếp tục cải thiện

Tăng minh chứng triển khai thực tế; kiểm thử đủ luồng mạng/xác thực/lưu trữ thay vì chỉ dựa vào mock; cập nhật nhật ký đúng thời điểm và nâng chất lượng tài liệu cấu hình, migration, sao lưu. Tiếp tục học giám sát, tối ưu chi phí và tự động hóa triển khai khi phù hợp phạm vi đề tài.
`, '# Self-evaluation\n\nTrần Hải Lương, 687703, an intern at Amazon Web Services studying AWS services and their application to CloudDocs. This section is a personal draft for review. Assess technical skills, learning, responsibility, problem solving, knowledge presentation and documentation using actual evidence. No grades have been preselected. Improve live integration evidence, timely logs, migration documentation, monitoring and cost management.', 'Self-evaluation','6.');
page('7-Feedback','Chia sẻ và đóng góp ý kiến',7,`
# Chia sẻ và đóng góp ý kiến

Quá trình tìm hiểu CloudDocs giúp em liên hệ kiến thức lập trình web, cơ sở dữ liệu, xác thực và dịch vụ đám mây trong một bài toán quản lý tài liệu. Một chức năng chỉ hoàn chỉnh khi frontend, backend, quyền truy cập, dữ liệu và môi trường triển khai khớp nhau.

## Đề xuất từ quá trình thực hiện đồ án

- Tự hệ thống hóa kiến thức backend, frontend, Cognito, hạ tầng và kiểm thử; mỗi mốc học tập có ghi chú và minh chứng rõ ràng.
- Thống nhất schema/migration, biến môi trường và phiên bản commit trước khi tích hợp để hạn chế lỗi khác môi trường.
- Bổ sung buổi trao đổi về IAM, CORS, callback Cognito và kết nối RDS vì đây là các điểm ảnh hưởng trực tiếp đến luồng ứng dụng.
- Kiểm tra ngân sách, dữ liệu thử và kế hoạch bàn giao ngay từ đầu; ghi worklog theo ngày thay vì hồi tưởng cuối kỳ.

## Định hướng tiếp theo

Hoàn thiện kiểm thử trên môi trường triển khai thật, đối soát sao lưu/phục hồi và đo chi phí. Các hướng như CI/CD, quét tệp hoặc phiên bản báo cáo chỉ đưa vào giai đoạn mở rộng khi có thời gian và bằng chứng triển khai.

Đây là dự thảo ý kiến gắn với đồ án; không kế thừa nhận xét về mentor, chứng nhận hoặc chương trình của người viết bản mẫu.
`, '# Feedback\n\nCloudDocs connects web development, relational data, identity and cloud storage. Suggested improvements are personal learning checkpoints, consistent schema/environment versions, focused IAM/CORS/Cognito/RDS debugging, early cost planning and daily worklogs. Next steps are live deployment tests, backup restoration and measured costs. This draft does not inherit the template author’s mentor or program experiences.', 'Feedback','7.');

// Replace template-specific identity and publication target; keep the original theme.
let config=fs.readFileSync(path.join(root,'config.toml'),'utf8');
config=config.replace(/^baseURL\s*=.*$/m,'baseURL = "http://localhost:1313/"').replace('defaultContentLanguage = "en"','defaultContentLanguage = "vi"').replace(/description = .*\n/,'description = "CloudDocs — Báo cáo thực tập Trần Hải Lương"\n').replace(/author = .*\n/,'author = "Trần Hải Lương"\n');
fs.writeFileSync(path.join(root,'config.toml'),config);
// The original layout, AWS logo and theme assets are kept unchanged.
// Exact architecture supplied as a local vector artifact, rather than a generated illustration.
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="680" viewBox="0 0 1100 680"><defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="#546a86" stroke-width="1.5"/></marker><style>text{font-family:Arial,sans-serif;fill:#16334f}.title{font-size:28px;font-weight:bold}.h{font-size:20px;font-weight:bold}.b{font-size:16px}.small{font-size:14px}.card{fill:white;stroke:#bdd0e5;stroke-width:2}.line{fill:none;stroke:#546a86;stroke-width:2;marker-end:url(#arrow)}</style></defs><rect width="1100" height="680" fill="#f3f7fc"/><text x="45" y="50" class="title">CloudDocs · Kiến trúc triển khai mục tiêu</text><text x="45" y="82" class="b">EC2/RDS: đối chiếu môi trường · S3/Cognito: đã có mã tích hợp</text><rect x="360" y="235" width="690" height="315" rx="20" fill="#e8eff9" stroke="#9fb7d3" stroke-dasharray="8 6"/><text x="385" y="265" class="small">VPC · RDS chỉ nhận kết nối được cho phép</text><rect class="card" x="50" y="305" width="245" height="125" rx="14"/><text x="75" y="341" class="h">Trình duyệt</text><text x="75" y="373" class="b">Frontend HTML/CSS/JS</text><text x="75" y="401" class="small">Access token + PKCE</text><rect class="card" x="400" y="300" width="285" height="145" rx="14"/><text x="425" y="337" class="h">EC2 · Nginx</text><text x="425" y="370" class="b">Spring Boot REST API</text><text x="425" y="400" class="small">JWT · quyền · quota · audit</text><text x="425" y="425" class="small">IAM instance role cho S3</text><rect class="card" x="780" y="310" width="230" height="125" rx="14"/><text x="805" y="347" class="h">RDS MySQL</text><text x="805" y="380" class="b">Metadata + quyền</text><text x="805" y="410" class="small">Users · audit · công việc</text><rect class="card" x="80" y="125" width="295" height="100" rx="14"/><text x="105" y="163" class="h">Amazon Cognito</text><text x="105" y="198" class="b">User Pool · xác thực</text><rect class="card" x="705" y="125" width="305" height="100" rx="14"/><text x="730" y="163" class="h">Amazon S3 private</text><text x="730" y="198" class="b">Tệp · signed PUT / GET</text><path class="line" d="M170 303 L170 227"/><path class="line" d="M296 368 L397 368"/><text x="310" y="348" class="small">HTTPS</text><path class="line" d="M687 368 L776 368"/><text x="700" y="348" class="small">TLS</text><path class="line" d="M580 300 L580 175 L703 175"/><text x="591" y="278" class="small">Ký URL / HEAD</text><path class="line" d="M285 305 L420 245 L706 215"/><text x="430" y="216" class="small">Truyền tệp trực tiếp</text><text x="48" y="600" class="b">Backend kiểm tra quyền trước khi cấp URL; MySQL không lưu nội dung tệp.</text><text x="48" y="630" class="b">Sơ đồ mô tả thiết kế; không xác nhận endpoint EC2 hoặc tài nguyên đã triển khai.</text></svg>`;
fs.mkdirSync(path.join(root,'static/images'),{recursive:true});fs.writeFileSync(path.join(root,'static/images/vietnam-it-job-market-architecture.svg'),svg);
const readme=`# CloudDocs — báo cáo thực tập cá nhân Trần Hải Lương

Nội dung đã được thay từ mẫu Nguyễn Nhật Minh/WebFood sang CloudDocs. Bản mẫu gốc được giữ trong template-original-20261107.zip. Không sửa repository ứng dụng CloudDocs ở thư mục bên cạnh.

## Xem tại máy

Mở vietnam-it-job-market-review.html để xem nhanh toàn bộ nội dung, có mục lục và bảng. Đây là bản render Markdown độc lập; giao diện Hugo cần build riêng.

Cần Hugo tương thích theme hugo-theme-learn. Tại thư mục này chạy:

    hugo server --bind 127.0.0.1 --baseURL http://localhost:1313/

Mở http://localhost:1313/. Ngôn ngữ mặc định là tiếng Việt. Các trang tiếng Anh hiện là bản tóm lược; worklog tiếng Anh giữ nguyên tên công việc tiếng Việt để đối chiếu.

Trước khi xuất bản, đổi baseURL sang URL repository/site thật. Không giữ URL GitHub hoặc demo của tác giả mẫu.

## Những điểm cần rà lại trước nộp

- 07/08 là khởi động; 12 tuần thứ Hai–thứ Sáu từ 10/08 đến 30/10. Đề cương kéo dài tới 28/11.
- Lịch từng ngày là tái dựng theo đề cương và bản Word của Tòng Văn Tâm; chưa phải xác nhận lịch sử hoàn thành.
- Tính năng đầu tháng 11 được ghi riêng ở cuối Worklog.
- S3/Cognito có trong mã nguồn; RDS theo xác nhận người dùng. EC2/CloudWatch/Budgets cần minh chứng môi trường thực tế.
- Cần endpoint demo, ảnh Console đã che secret, schema export được phép dùng, kết quả test và số liệu chi phí trước nghiệm thu.
- Meetup 17/10 giữ đúng dữ kiện được cung cấp; không thêm agenda/diễn giả/chứng nhận.
- Phan Thị Thanh Thuỷ được ghi lớp K68CNTTC theo đề cương; kiểm tra nếu cần sửa.
- Worklog trình bày cá nhân tự tìm hiểu các dịch vụ AWS và cách vận dụng vào CloudDocs. Danh sách cùng thực tập tại Amazon Web Services chỉ có Trần Hải Lương, Phan Thị Thanh Thuỷ, Lê Hoàng Tùng và Hán Quang Sang.

## Nguồn đã đối chiếu

Đề cương nhóm 32 ngày 02/11/2026; các kế hoạch thực tập đã cung cấp; Worklog_12_tuan_CHI_HOC_AWS_CloudJourney (1).docx của Tòng Văn Tâm; README và mã cấu hình/API của CloudDocs-CloudDocs_newupdate; tài liệu AWS chính thức có liên kết trong nội dung.
`;
fs.writeFileSync(path.join(root,'README-Vietnam-IT-Job-Market.md'),readme);
fs.writeFileSync(path.join(root,'content-manifest.json'),JSON.stringify(pages,null,2));
console.log(`Wrote ${pages.length} bilingual pages (${pages.length*2} Markdown files), architecture SVG, config and review README.`);
require('./finalize-report.cjs');
