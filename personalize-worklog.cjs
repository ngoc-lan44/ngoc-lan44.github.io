const fs=require('fs');
const file='build-vietnam-it-job-market.cjs';
let s=fs.readFileSync(file,'utf8');
const changes=[
 ['Họp nhóm chốt tên CloudDocs, phân công 5 thành viên và cấu trúc repository.','Tìm hiểu tổng thể CloudDocs, cấu trúc repository và vai trò các dịch vụ AWS trong kiến trúc ứng dụng.'],
 ['Hoàn thiện bản đề xuất theo 8 mục của mẫu; tổng hợp phân công và ngân sách theo giả định.','Hoàn thiện bản đề xuất theo 8 mục của mẫu; tổng hợp kiến thức dịch vụ AWS và ngân sách theo giả định.'],
 ['CloudDocs tập trung tài liệu và hoạt động phối hợp vào một ứng dụng web.','CloudDocs tập trung tài liệu và quy trình xử lý công việc vào một ứng dụng web.'],
 ['1. Khảo sát nghiệp vụ, phân công, học AWS và thiết kế ma trận quyền.','1. Khảo sát nghiệp vụ, tìm hiểu AWS và thiết kế ma trận quyền.'],
 ['Phân công, ma trận quyền, ERD, khung ứng dụng','Kiến thức AWS nền tảng, ma trận quyền, ERD, khung ứng dụng'],
 ['lưu trữ đối tượng và phối hợp nhóm.','lưu trữ đối tượng và tự tìm hiểu kiến trúc ứng dụng.'],
 ['CloudDocs is a team-built enterprise document management application','CloudDocs is an enterprise document management application'],
 ['Lấy bản export đã được người phụ trách xác nhận','Sử dụng bản export đã được kiểm tra nguồn gốc và schema'],
 ['Xác nhận với người phụ trách nhóm tài nguyên còn phục vụ đồ án đến 28/11 hay không','Kiểm tra tài nguyên còn phục vụ đồ án đến 28/11 hay không'],
 ['Trần Hải Lương, 687703, team lead responsible for backend/API/DB and S3.','Trần Hải Lương, 687703, an intern at Amazon Web Services studying AWS services and their application to CloudDocs.'],
 ['problem solving, teamwork and documentation','problem solving, knowledge presentation and documentation'],
 ['# CloudDocs — báo cáo thực tập nhóm 32','# CloudDocs — báo cáo thực tập cá nhân Trần Hải Lương'],
 ['- Đã đọc cả năm kế hoạch cá nhân. Kế hoạch riêng Văn Lương tại LTS là thu thập dữ liệu AI; frontend CloudDocs ghi theo phân công trong đề cương nhóm mới hơn. Các kế hoạch cá nhân 6 tuần được dùng để tham khảo phạm vi, không coi là lịch sử hoàn thành 12 tuần.','- Worklog trình bày cá nhân tự tìm hiểu các dịch vụ AWS và cách vận dụng vào CloudDocs. Danh sách cùng thực tập tại Amazon Web Services chỉ có Trần Hải Lương, Phan Thị Thanh Thuỷ, Lê Hoàng Tùng và Hán Quang Sang.'],
 ['năm kế hoạch cá nhân của nhóm','các kế hoạch thực tập đã cung cấp'],
 ['CloudDocs — Báo cáo thực tập nhóm 32','CloudDocs — Báo cáo thực tập Trần Hải Lương'],
 ['Trần Hải Lương — Nhóm 32','Trần Hải Lương'],
 ['Quá trình xây dựng CloudDocs giúp nhóm liên hệ kiến thức','Quá trình tìm hiểu CloudDocs giúp em liên hệ kiến thức'],
 ['Tổ chức các mốc rà soát chung giữa backend, frontend, Cognito, hạ tầng và QA/QC; mỗi mốc có sản phẩm và minh chứng rõ ràng.','Tự hệ thống hóa kiến thức backend, frontend, Cognito, hạ tầng và kiểm thử; mỗi mốc học tập có ghi chú và minh chứng rõ ràng.'],
 ['bản phân bổ tái dựng theo ngày làm việc','bản tổng hợp quá trình học tập theo ngày làm việc'],
 ['chuẩn bị cho môi trường học tập','chuẩn bị cho môi trường học tập'],
 ['nhóm đang dùng','đang sử dụng'],
 ['Tìm hiểu API metadata','Tìm hiểu API metadata'],
 ['chuẩn bị dữ liệu và kịch bản kiểm thử','chuẩn bị dữ liệu và kịch bản kiểm thử'],
 ['Tìm hiểu hiện trạng đồ án','Tìm hiểu hiện trạng đồ án'],
 ['danh sách nhiệm vụ và sơ đồ dịch vụ sơ bộ','danh sách nội dung học tập và sơ đồ dịch vụ sơ bộ'],
 ['thống nhất quy trình làm việc nhóm','tìm hiểu quy trình quản lý mã nguồn'],
 ['kiểm tra quy trình Git nhóm','tìm hiểu quy trình Git'],
 ['không giả định có buổi làm việc nhóm','học theo lịch cá nhân thực tế'],
 ['Suggested improvements are shared integration checkpoints','Suggested improvements are personal learning checkpoints']
];
for(const [a,b] of changes)s=s.split(a).join(b);
// Remove the unused assignee field from every week, preserving the data indexes.
s=s.replace(/^ '[^']*', /gm," '', ");
fs.writeFileSync(file,s);
let r=fs.readFileSync('review-vietnam-it-job-market.cjs','utf8').replace('Nhóm 32 · Báo cáo thực tập','Báo cáo thực tập cá nhân');
fs.writeFileSync('review-vietnam-it-job-market.cjs',r);
