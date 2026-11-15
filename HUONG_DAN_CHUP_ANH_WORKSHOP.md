# Danh sách ảnh minh chứng workshop CloudDocs

Ngày lập: 08/11/2026.

Mục đích: tổng hợp ảnh cấu hình AWS và kết quả thực tế để bổ sung vào workshop. Chụp tài nguyên đang sử dụng, không cần tạo lại dịch vụ. Tên mục trên AWS Console có thể thay đổi nhẹ; tìm nhóm thông tin tương ứng nếu giao diện khác hướng dẫn.

## 1. Số lượng và nơi tập hợp

| Người tổng hợp | Phạm vi | Số ảnh chính | Thư mục nhận ảnh |
| --- | --- | --- | --- |
| Tùng | EC2, IAM Role của EC2 và RDS MySQL | 10 | `static/images/workshop-evidence/01-tung-ec2-rds/` |
| Sang | Cognito User Pool và App Client | 6 | `static/images/workshop-evidence/02-sang-cognito/` |
| Hải Lương | S3 private, quyền truy cập, CORS và tệp mẫu | 7 | `static/images/workshop-evidence/03-hai-luong-s3/` |
| Cả nhóm tổng hợp sau khi đủ ảnh AWS | Kết quả thao tác trên CloudDocs | 3 ảnh bổ sung nên có | `static/images/workshop-evidence/04-kiem-thu-tich-hop/` |
| **Tổng** | **Bộ chính + minh chứng tích hợp** | **23 ảnh chính; 26 ảnh nếu có đủ 3 ảnh tích hợp** | |

Sơ đồ kiến trúc đã có trong báo cáo, không tính vào số ảnh cần chụp này. Các thư mục trên đã được tạo sẵn trong MauWorklogWorkshop. Lưu ảnh trực tiếp vào đúng thư mục, không dán vào Word hoặc ghép tất cả thành một ảnh dài.

Nếu một màn hình không thể hiện hết nội dung, được tách ảnh bằng hậu tố `-a`, `-b`; khi đó số tệp thực tế sẽ tăng. Ví dụ: `s03-callback-logout-a.png`, `s03-callback-logout-b.png`. Không thu nhỏ trình duyệt đến mức chữ không đọc được chỉ để đủ số lượng.

## 2. Tùng — 10 ảnh EC2, IAM và RDS

Tập hợp vào `static/images/workshop-evidence/01-tung-ec2-rds/`.

### EC2 và IAM: 6 ảnh

| Mã | Tên tệp | Chỗ cần mở | Nội dung cần nhìn thấy | Đưa vào workshop |
| --- | --- | --- | --- | --- |
| T01 | `t01-ec2-overview.png` | EC2 → Instances → chọn instance CloudDocs | Tên instance, Instance ID, trạng thái Running, instance type, Region/AZ và status checks. Chọn đúng instance chạy backend. | 4.7 — Chuẩn bị máy chủ |
| T02 | `t02-ec2-security-role.png` | Chi tiết instance → Security | IAM Role đang gắn với instance và Security Group liên quan. Giữ tên role/SG đọc được để nối với các ảnh sau. | 4.3 — IAM Role cho EC2 |
| T03 | `t03-ec2-sg-inbound.png` | Mở Security Group của EC2 → Inbound rules | Các cổng thực tế được dùng để truy cập web/quản trị và nguồn truy cập. Chụp cấu hình đang dùng; không mở thêm cổng chỉ để lấy ảnh. | 4.3 — Security Group |
| T04 | `t04-iam-s3-policy.png` | IAM → Roles → role ở T02 → Permissions → mở policy S3 liên quan | Các Action và Resource cho bucket/prefix của Hải Lương. Nếu dùng chính sách JSON, chụp phần cho phép thao tác S3 và ARN bucket/object. | 4.3 — Quyền truy cập S3 |
| T05 | `t05-iam-role-trust.png` | Cùng IAM Role → Trust relationships | Chính sách trust của role; nếu đây là instance role, thể hiện EC2 là dịch vụ được nhận role. Chụp đúng cơ chế đang dùng. | 4.3 — IAM Role cho EC2 |
| T06 | `t06-backend-running-health.png` | Phiên quản trị của chính EC2 chạy CloudDocs, qua Session Manager hoặc SSH đang dùng | Dịch vụ/tiến trình backend hoạt động và một lần gọi API health thành công. Nên giữ đầu mối nhận biết máy chủ. Nếu dùng SSH thì ghi là SSH, không ghi thành Session Manager. | 4.7 — Backend vận hành |

Gợi ý cho T06: hiển thị trạng thái dịch vụ backend hoặc đoạn log khởi động phù hợp, sau đó gọi endpoint health của ứng dụng. Dùng đúng tên dịch vụ và cổng đang chạy; không cần chụp toàn bộ lịch sử terminal. Không chạy lệnh in toàn bộ biến môi trường hoặc file cấu hình chứa mật khẩu.

T04 và H03 là cặp minh chứng quan trọng vì EC2 và S3 nằm ở các tài khoản khác nhau trong sơ đồ. Cần nhìn được policy phía EC2 và policy phía bucket. Nếu hệ thống dùng AssumeRole thay vì cấp quyền trực tiếp qua bucket policy, bổ sung ảnh role đích/trust policy tương ứng và ghi rõ cơ chế; không sửa cấu hình đang chạy để giống một ví dụ.

### RDS MySQL: 4 ảnh

| Mã | Tên tệp | Chỗ cần mở | Nội dung cần nhìn thấy | Đưa vào workshop |
| --- | --- | --- | --- | --- |
| T07 | `t07-rds-overview.png` | RDS → Databases → chọn database CloudDocs | DB identifier, trạng thái Available, engine MySQL, phiên bản và DB instance class. | 4.5 — Chuẩn bị RDS |
| T08 | `t08-rds-connectivity.png` | Database → Connectivity & security | Endpoint, port, VPC, DB subnet group, Security Group và thiết lập public access. Tên SG phải đối chiếu được với T09. | 4.5 — Kết nối cơ sở dữ liệu |
| T09 | `t09-rds-sg-inbound.png` | Mở Security Group của RDS → Inbound rules | Quy tắc MySQL/3306 và nguồn truy cập đang được phép. Với kết nối EC2–RDS, cần thấy nguồn SG của EC2 nếu cấu hình theo mô hình này. | 4.3 và 4.5 — Kết nối EC2–RDS |
| T10 | `t10-rds-data-query.png` | MySQL client đang kết nối đúng RDS, hoặc phiên MySQL trên EC2 | Tên schema, danh sách bảng và kết quả truy vấn vài bản ghi metadata của tài liệu thử. Giữ tên kết nối/đầu mối nhận biết RDS, nhưng không lộ mật khẩu hoặc chuỗi kết nối chứa secret. | 4.5 và 4.8 — Dữ liệu thực tế |

T10 chỉ dùng truy vấn đọc trên dữ liệu thử. Có thể hiển thị bảng tài liệu cùng ID, tên tệp, object key và kích thước nếu schema thực tế có các cột đó. Không cần chạy migration lại, không xóa bảng và không hiển thị dữ liệu cá nhân của người dùng khác.

Nếu đã cấu hình sao lưu và muốn chứng minh phần này, có thể bổ sung `t11-rds-backup.png` ở màn hình backup retention/snapshot. Ảnh này nằm ngoài 10 ảnh chính; ảnh có snapshot không tự chứng minh đã phục hồi thành công.

## 3. Sang — 6 ảnh Cognito

Tập hợp vào `static/images/workshop-evidence/02-sang-cognito/`.

| Mã | Tên tệp | Chỗ cần mở | Nội dung cần nhìn thấy | Đưa vào workshop |
| --- | --- | --- | --- | --- |
| S01 | `s01-cognito-user-pool.png` | Cognito → User pools → chọn pool CloudDocs | Tên User Pool, Pool ID và Region. Pool phải đúng với cấu hình issuer của backend. | 4.6 — User Pool |
| S02 | `s02-cognito-app-client.png` | User Pool → Applications/App clients → chọn client web | Tên App Client, Client ID và loại/cấu hình client. Với frontend hiện tại, xác nhận public client không dùng client secret. Nếu màn hình có secret, không mở hoặc để lộ giá trị. | 4.6 — App Client |
| S03 | `s03-callback-logout.png` | App Client → Login pages hoặc phần cấu hình managed login/Hosted UI | Allowed callback URLs và allowed sign-out/logout URLs đang dùng. Chụp đủ scheme, host, port và path để đối chiếu frontend. | 4.6 — Cấu hình chuyển hướng |
| S04 | `s04-oauth-grants-scopes.png` | Cùng App Client → cấu hình OAuth | Authorization Code grant, các scope và identity provider đang được chọn. Nếu S03 và S04 nằm chung một màn hình, vẫn lưu hai góc chụp rõ phần cần kiểm tra. | 4.6 — Luồng xác thực |
| S05 | `s05-cognito-domain.png` | User Pool → Branding/Domain hoặc phần domain tương ứng | Cognito domain hoặc custom domain đang phục vụ đăng nhập. Giữ hostname đọc được để đối chiếu frontend và UserInfo. | 4.6 — Domain đăng nhập |
| S06 | `s06-cognito-test-users.png` | User Pool → Users | Một hoặc hai tài khoản thử với trạng thái tài khoản và enabled/confirmed tương ứng. Che email/số điện thoại của người không tham gia demo. | 4.6 và 4.8 — Người dùng thử nghiệm |

PKCE được thực hiện trong luồng ứng dụng; ảnh bật Authorization Code grant không tự chứng minh PKCE đã hoạt động. Không cần chụp toàn bộ URL callback có authorization code, token response hay nội dung lưu trữ phiên trong trình duyệt để lấy minh chứng. Khi ghép workshop sẽ giải thích bằng cấu hình và luồng mã nguồn tương ứng.

Client ID, Pool ID và hostname không phải client secret. Có thể giữ các định danh cần thiết để đối chiếu các ảnh; ưu tiên che secret/token thay vì che hết tên tài nguyên khiến ảnh không còn kiểm tra được.

## 4. Hải Lương — 7 ảnh S3

Tập hợp vào `static/images/workshop-evidence/03-hai-luong-s3/`.

| Mã | Tên tệp | Chỗ cần mở | Nội dung cần nhìn thấy | Đưa vào workshop |
| --- | --- | --- | --- | --- |
| H01 | `h01-s3-bucket-region.png` | S3 → General purpose buckets → tìm bucket CloudDocs | Tên bucket và AWS Region. Chọn đúng bucket thực tế backend đang dùng. | 4.4 — Chuẩn bị bucket |
| H02 | `h02-s3-block-public-access.png` | Bucket → Permissions → Block public access | Trạng thái chặn truy cập công khai của bucket. Không tắt chặn public chỉ để chụp ảnh. | 4.4 — Bucket private |
| H03 | `h03-s3-bucket-policy.png` | Bucket → Permissions → Bucket policy | Principal/role được cấp quyền, Action và Resource liên quan đến EC2 của Tùng, bucket và prefix. Nếu có nhiều statement, lấy đủ phần dùng cho hệ thống. | 4.3 và 4.4 — Truy cập chéo tài khoản |
| H04 | `h04-s3-cors.png` | Bucket → Permissions → CORS | JSON CORS hiện tại: AllowedOrigins, AllowedMethods, AllowedHeaders và ExposeHeaders nếu có. Cần thấy origin của frontend đang dùng và phương thức phục vụ upload/download. | 4.4 — CORS |
| H05 | `h05-s3-default-encryption.png` | Bucket → Properties → Default encryption | Trạng thái và loại mã hóa đang sử dụng. Ghi theo cấu hình thật, không mặc định là KMS nếu chỉ dùng SSE-S3. | 4.4 — Bảo vệ dữ liệu |
| H06 | `h06-s3-uploaded-object.png` | Bucket → Objects → mở prefix chứa tài liệu, thường là documents/ | Object của tệp thử được upload từ CloudDocs, cùng tên/key, thời gian và kích thước. | 4.4 và 4.8 — Kết quả upload |
| H07 | `h07-s3-object-properties.png` | Chọn object ở H06 → Properties | Object key, kích thước, thời gian và thông tin định dạng nếu màn hình có. Dùng cùng object để nối với metadata ở T10. | 4.8 — Đối soát tệp và metadata |

H03 cần khớp với role ở T02/T04, vì sơ đồ dự án sử dụng S3 ở tài khoản khác EC2. Chụp policy hiện hữu; nếu chính sách chưa đủ để giải thích cơ chế đang chạy, gửi kèm ghi chú cấu hình để kiểm tra thêm, không thay quyền vội.

Nếu đã dùng Versioning/Lifecycle và muốn đưa vào phần vận hành, bổ sung ảnh riêng với tên `h08-s3-versioning.png` hoặc `h09-s3-lifecycle.png`. Đây là ảnh ngoài 7 ảnh chính; không cần bật tính năng mới để đủ ảnh.

## 5. Ba ảnh tích hợp nên bổ sung

Tập hợp vào `static/images/workshop-evidence/04-kiem-thu-tich-hop/`. Có thể để Hải Lương chụp từ giao diện CloudDocs sau khi các dịch vụ đã hoạt động.

| Mã | Tên tệp | Chụp ở đâu và cần thấy gì | Đưa vào workshop |
| --- | --- | --- | --- |
| K01 | `k01-login-success.png` | Giao diện CloudDocs sau đăng nhập qua Cognito; thấy tài khoản thử và trang ứng dụng. Không chụp token hoặc authorization code. | 4.6 và 4.8 — Đăng nhập thành công |
| K02 | `k02-upload-preview.png` | Giao diện có tài liệu thử đã upload và xem trước/tải được. Dùng đúng tệp liên quan H06/H07/T10. Có thể tách `-a` và `-b` nếu không thể nhìn rõ cùng lúc. | 4.8 — Luồng tài liệu |
| K03 | `k03-permission-check.png` | Một tài khoản thử khác được chia sẻ đúng quyền hoặc bị từ chối khi chưa có quyền. Ghi chú tài khoản đang dùng và tình huống kiểm tra. | 4.8 — Kiểm tra phân quyền |

K03 không cần sửa dữ liệu sản xuất: dùng hai tài khoản và một tài liệu thử đã được phép kiểm tra. Nếu chỉ có ảnh danh sách tài liệu trống thì chưa đủ kết luận là API đã chặn truy cập; ưu tiên kết quả từ thao tác thực tế trong giao diện.

## 6. Cách chụp để ghép workshop được ngay

1. Dùng PNG, ảnh rõ chữ; chụp cả tiêu đề dịch vụ/tài nguyên và vùng cấu hình cần minh chứng.
2. Giữ Region, tên tài nguyên và tên policy/SG liên quan đọc được. Nếu cần che số tài khoản AWS, che nhất quán; không che mất toàn bộ mối liên hệ giữa role, bucket và instance.
3. Che password, access key, secret key, client secret, token, authorization code và phần chữ ký của presigned URL. Không đưa file `.env`, private key hoặc database dump vào bộ ảnh.
4. Dùng cùng môi trường và bản chạy hiện tại; không trộn ảnh cấu hình cũ với tài nguyên mới.
5. Với ảnh cấu hình dài, chụp các phần có liên quan và dùng hậu tố `-a`/`-b`. Để nguyên ảnh gốc về nội dung; chỉ che thông tin nhạy cảm cần thiết.
6. Đặt tên theo bảng và đưa đúng thư mục. Nếu dùng JPG, giữ tên tương ứng và đuôi thật `.jpg`, không chỉ đổi phần mở rộng thành `.png`.

## 7. Thông tin ghi kèm khi nộp ảnh

Mỗi người ghi ngắn tại cuối file này hoặc gửi kèm một ghi chú:

| Thông tin | Nội dung điền |
| --- | --- |
| Người gửi | Tùng / Sang / Hải Lương |
| Ngày chụp | Ngày thực tế |
| Region | Region của từng dịch vụ |
| Tài nguyên | Tên instance/DB/bucket/pool tương ứng |
| Mã ảnh đã có | Ví dụ: T01–T10; ghi riêng ảnh còn thiếu |
| Khác biệt với hướng dẫn | Ví dụ: dùng SSH thay vì Session Manager; không dùng Snapshot/Versioning |
| Tệp thử liên quan | Tên tệp hiển thị trong CloudDocs và object key nếu có |

Khi đủ ảnh, báo tên thư mục đã tập hợp. Có thể tham chiếu ảnh theo mã T/S/H/K để chèn đúng mục, viết chú thích Việt–Anh và mô tả cấu hình thực tế. Nội dung phân chia người chụp trong file này chỉ phục vụ thu thập ảnh, không thêm phân công vào worklog cá nhân.

## 8. Tài liệu đối chiếu

- Workshop CloudDocs hiện tại: các mục 4.3–4.8 trong thư mục `content/4-Workshop/`.
- [Cognito managed login và App Client](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-managed-login.html).
- [Cognito App Client settings](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-client-apps.html).
- [Kết nối EC2–RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/ec2-rds-connect.html).
- [IAM Role cho ứng dụng trên EC2](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html).
- [S3 CORS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html).
