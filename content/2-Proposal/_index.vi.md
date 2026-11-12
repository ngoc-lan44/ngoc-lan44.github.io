---
title: "Bản đề xuất"
date: 2026-11-11
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

## VIETNAM IT JOB MARKET

### Xây dựng nền tảng thu thập, xử lý và phân tích dữ liệu tuyển dụng CNTT trên AWS

### 1. Tóm tắt đề tài

**Vietnam IT Job Market** là nền tảng tổng hợp và phân tích tin tuyển dụng CNTT từ **ITviec**. Dự án xây dựng quy trình từ thu thập dữ liệu, làm sạch, lưu trữ đến truy vấn và hiển thị trên website. Người dùng có thể quan sát nhu cầu tuyển dụng trong tập dữ liệu, tìm việc phù hợp, lưu tin quan tâm và theo dõi lịch sử ứng tuyển.

Hệ thống sử dụng Python trên một Amazon EC2 để thu thập và xử lý dữ liệu. Dữ liệu phân tích dạng Parquet được đưa lên Amazon S3, khai báo metadata trong AWS Glue Data Catalog và truy vấn bằng Amazon Athena. Website sử dụng Streamlit, Plotly và được cung cấp qua Nginx, HTTPS. DynamoDB lưu trạng thái kiểm duyệt và nhật ký quản trị; S3 lưu tài khoản và hoạt động cá nhân.

Mục tiêu của đề tài là xây dựng một hệ thống xử lý dữ liệu và ứng dụng web có thể vận hành trên AWS, với lịch cập nhật tự động và công cụ theo dõi tình trạng hoạt động. Phạm vi dữ liệu chỉ gồm tin tuyển dụng từ ITviec, không đại diện cho toàn bộ thị trường CNTT Việt Nam.

### 2. Vấn đề và nhu cầu thực tế

Tin tuyển dụng nằm trên nhiều trang chi tiết, có cách trình bày khác nhau và thay đổi theo thời gian. Việc đọc từng tin không thuận tiện khi cần tổng hợp kỹ năng, doanh nghiệp, địa điểm hoặc kinh nghiệm đang được tuyển dụng. Thu thập lặp lại còn phát sinh URL trùng, thay đổi nội dung và tin hết hạn, ảnh hưởng đến kết quả thống kê nếu xử lý không nhất quán.

Người tìm việc cũng cần một nơi lưu các vị trí quan tâm và ghi nhận tiến trình ứng tuyển. Đối với quản trị viên, hệ thống cần hỗ trợ kiểm duyệt tin hiển thị, theo dõi dữ liệu và phát hiện sự cố vận hành.

Đề tài giải quyết các nhu cầu này bằng một quy trình dữ liệu thống nhất, kết hợp dashboard phân tích, chức năng cá nhân và công cụ quản trị trên cùng website.

### 3. Mục tiêu và phạm vi

#### Mục tiêu thực hiện

- Thu thập URL và chi tiết tin tuyển dụng từ ITviec, kiểm tra trùng lặp và lưu dữ liệu JSON.
- Đồng bộ dữ liệu hiện tại và lịch sử thay đổi, chuẩn hóa thông tin rồi xuất Parquet phục vụ phân tích.
- Kết nối S3, Glue Data Catalog và Athena để cung cấp dữ liệu cho dashboard.
- Hiển thị KPI, biểu đồ, tìm kiếm, bộ lọc và chi tiết việc làm.
- Cung cấp đăng ký, đăng nhập, chức năng cá nhân và phân quyền USER/ADMIN.
- Hỗ trợ xóa mềm, khôi phục tin tuyển dụng và ghi nhật ký kiểm duyệt.
- Triển khai website trên EC2, bảo vệ kết nối bằng HTTPS, tự động hóa pipeline và tập trung log trên CloudWatch.

#### Đối tượng sử dụng

| Đối tượng | Nhu cầu được đáp ứng |
| --- | --- |
| Khách truy cập | Xem tổng quan thị trường, lọc và tra cứu tin tuyển dụng |
| Người dùng USER | Lưu việc làm, ghi nhận ứng tuyển và quản lý hồ sơ cá nhân |
| Quản trị viên ADMIN | Quản lý người dùng, kiểm duyệt việc làm và theo dõi tình trạng hệ thống |

Chức năng ứng tuyển dùng để người dùng ghi nhận và cập nhật tiến trình cá nhân. Người dùng truy cập liên kết ITviec để thực hiện ứng tuyển tại nguồn; hệ thống không tự gửi CV và không đồng bộ kết quả tuyển dụng từ ITviec.

### 4. Kiến trúc giải pháp

![Kiến trúc Vietnam IT Job Market](/images/vietnam-it-job-market-selected-architecture.png)

Tài nguyên chính của dự án được triển khai tại **Asia Pacific (Singapore), ap-southeast-1**. Một EC2 chạy pipeline, dashboard và các worker. Các dịch vụ lưu trữ, truy vấn và giám sát phối hợp như sau:

| Thành phần | Mục đích sử dụng |
| --- | --- |
| Amazon EC2 | Chạy Python Collector/ETL, Streamlit, Nginx và các worker |
| Amazon S3 | Lưu Parquet phân tích, kết quả Athena, dữ liệu người dùng, snapshot kiểm duyệt và gói triển khai |
| AWS Glue Data Catalog | Lưu tên bảng, cấu trúc cột và vị trí dữ liệu để Athena truy vấn |
| Amazon Athena | Truy vấn dữ liệu tuyển dụng trên S3 để cung cấp cho website |
| Amazon DynamoDB | Lưu trạng thái xóa mềm, khôi phục và nhật ký kiểm duyệt |
| AWS IAM | Cấp quyền truy cập tài nguyên cho EC2 thông qua Instance Role |
| AWS Systems Manager | Truy cập máy chủ bằng Session Manager để quản trị và kiểm tra |
| Amazon CloudWatch | Tập trung log và theo dõi cảnh báo lỗi pipeline |
| Streamlit và Plotly | Xây dựng giao diện và các biểu đồ tương tác |
| Nginx và Certbot | Cung cấp reverse proxy, HTTPS và duy trì chứng chỉ |

**Luồng dữ liệu:** ITviec → Python trên EC2 → JSON → làm sạch, chuẩn hóa → Parquet trên S3 → Glue Data Catalog → Athena → Streamlit Dashboard.

**Luồng kiểm duyệt:** ADMIN thao tác trên website → DynamoDB lưu trạng thái và audit → Projection Worker xuất snapshot lên S3 → Athena lọc việc làm đã xóa mềm.

Glue được sử dụng làm Data Catalog. Quá trình ETL chạy bằng Python trên EC2.

### 5. Các nội dung xây dựng

#### 5.1. Thu thập và xử lý dữ liệu

Bộ thu thập khám phá URL trên danh sách tuyển dụng ITviec, chuẩn hóa liên kết và loại trùng trước khi thu thập chi tiết theo batch. Dữ liệu được lưu dưới dạng JSON, kèm thông tin để theo dõi từng lượt chạy.

Quá trình đồng bộ sử dụng mã việc làm để cập nhật dữ liệu hiện tại và ghi lịch sử thay đổi. Các trường thời gian ghi nhận giúp theo dõi sự xuất hiện của tin qua các lần cập nhật. Hệ thống kiểm tra độ đầy đủ của lượt thu thập trước khi xử lý việc làm không còn xuất hiện, tránh coi dữ liệu thiếu do lỗi thu thập là tin đã hết hạn.

ETL làm sạch và chuẩn hóa các thông tin như vị trí, công ty, địa điểm, kỹ năng, kinh nghiệm, cấp bậc và mức lương. Tin không công khai lương được giữ đúng trạng thái thiếu thông tin, không tự suy đoán mức lương. Dữ liệu đầu ra được xuất thành Parquet với cấu trúc cột thống nhất.

#### 5.2. Lưu trữ và truy vấn phân tích

JSON raw, current, history và clean được xử lý trên EC2. Parquet phục vụ phân tích được công bố tại `analytics/itviec/current_jobs.parquet` trên S3. Artifact từng lượt chạy được lưu riêng để phục vụ kiểm tra và truy vết.

Glue Data Catalog cung cấp metadata cho database `vn_it_job_market` và bảng nguồn `itviec_current_jobs`. Athena truy vấn dữ liệu này và các view phục vụ ứng dụng. Việc tách dữ liệu phân tích khỏi artifact giúp tránh đọc lặp nhiều phiên bản của cùng tập dữ liệu.

#### 5.3. Dashboard và tra cứu việc làm

Dashboard trình bày số việc làm đang hoạt động, doanh nghiệp, tin công khai lương và kỹ năng. Các biểu đồ thể hiện xu hướng theo ngày đăng, kỹ năng được yêu cầu, phân bố địa điểm, doanh nghiệp, kinh nghiệm, cấp bậc và tỷ lệ công khai lương. Phần so sánh theo tuần hỗ trợ quan sát thay đổi giữa hai khoảng thời gian.

Người dùng có thể nhập từ khóa, kết hợp bộ lọc địa điểm, cấp bậc, kinh nghiệm, công ty hoặc tin có lương. KPI, biểu đồ và danh sách việc làm cập nhật theo bộ lọc. Chi tiết việc làm cung cấp thông tin tuyển dụng và liên kết đến tin ITviec gốc.

#### 5.4. Tài khoản và quản trị

Website hỗ trợ đăng ký, đăng nhập bằng email và phân quyền USER/ADMIN. Tài khoản và hoạt động cá nhân được lưu trên S3. Người dùng có thể lưu hoặc bỏ lưu việc làm, cập nhật trạng thái ứng tuyển, chỉnh sửa tên hiển thị, giới thiệu và đổi mật khẩu.

ADMIN có các trang quản lý người dùng, quản lý việc làm, việc làm đã xóa, chất lượng dữ liệu, trạng thái hệ thống và trạng thái thu thập. Xóa mềm chỉ thay đổi quyền hiển thị của tin, giữ dữ liệu nguồn để có thể khôi phục. Trạng thái kiểm duyệt và nhật ký thao tác được lưu trong DynamoDB; Projection Worker đồng bộ snapshot sang S3 để Athena áp dụng bộ lọc kiểm duyệt.

#### 5.5. Triển khai và vận hành

Hạ tầng EC2 được quản lý bằng CloudFormation. Cấu hình đã ghi nhận sử dụng instance **t3.small**, ổ EBS **gp3 30 GiB** và IAM Role cho các truy cập AWS của ứng dụng. Streamlit chạy bằng môi trường Python Linux và được systemd quản lý.

Nginx tiếp nhận truy cập web, kết thúc kết nối HTTPS và chuyển tiếp HTTP/WebSocket tới Streamlit tại `127.0.0.1:8501`. Security Group mở cổng 80 và 443 cho truy cập web. Certbot và timer hỗ trợ duy trì HTTPS theo địa chỉ IP công khai của máy chủ.

Pipeline được lập lịch **02:00 giờ Việt Nam hằng ngày** bằng systemd timer. Cơ chế chạy bù hỗ trợ trường hợp máy chủ bỏ lỡ lịch; Operations Worker xử lý các yêu cầu phục hồi được cho phép. CloudWatch Agent và bộ xuất journal đưa log dịch vụ lên CloudWatch để theo dõi tập trung.

### 6. Bảo vệ dữ liệu và tính ổn định

S3 bật Block Public Access để hạn chế công bố dữ liệu ngoài ý muốn và dùng SSE-S3 để mã hóa dữ liệu lưu trữ. Ứng dụng truy cập tài nguyên AWS bằng quyền IAM được cấp cho môi trường chạy. Kết nối HTTPS bảo vệ dữ liệu trao đổi giữa trình duyệt và website.

Phân quyền được kiểm tra tại nghiệp vụ quản trị. DynamoDB lưu trạng thái kiểm duyệt và audit trong cùng giao dịch, giúp giữ nhật ký nhất quán với thao tác xóa hoặc khôi phục. Hai bảng đã bật bảo vệ xóa và khả năng khôi phục theo thời điểm.

CloudWatch lưu log tại `/vn-it-job-market/ec2` với thời gian giữ **hai tuần**. Metric filter `PipelineFailure` nhận diện log chứa `FAILED`; alarm theo dõi ngưỡng từ một lần trong năm phút. Cảnh báo hiện được theo dõi trên Console, chưa cấu hình gửi thông báo đến email hoặc dịch vụ nhận cảnh báo.

### 7. Kế hoạch thực hiện và sản phẩm bàn giao

| Giai đoạn | Nội dung | Sản phẩm |
| --- | --- | --- |
| Khảo sát và thiết kế | Xác định dữ liệu ITviec, chức năng và kiến trúc | Phạm vi đề tài, mô hình dữ liệu, sơ đồ kiến trúc |
| Xây dựng pipeline | Thu thập, kiểm tra, đồng bộ, làm sạch và xuất Parquet | Collector/ETL và dữ liệu đầu ra |
| Kết nối phân tích | Lưu S3, khai báo Catalog và xây dựng truy vấn | Bảng, view và kết nối Athena |
| Xây dựng ứng dụng | Dashboard, tra cứu, tài khoản và kiểm duyệt | Website Streamlit cho khách, USER và ADMIN |
| Triển khai AWS | Cấu hình EC2, quyền truy cập, Nginx và HTTPS | Hệ thống truy cập được qua web |
| Tự động hóa và kiểm thử | Lịch chạy, worker, log, kiểm thử và tổng hợp kết quả | Hệ thống vận hành cùng tài liệu Workshop và báo cáo |

Sản phẩm bàn giao gồm source dự án, cấu hình triển khai, bộ kiểm thử, tài liệu hướng dẫn thiết lập và vận hành, sơ đồ kiến trúc cùng ảnh kết quả thực hiện.

### 8. Chi phí và giới hạn triển khai

Chi phí gồm EC2, EBS, IPv4 công khai, dung lượng và yêu cầu S3, dữ liệu Athena quét, DynamoDB, CloudWatch và lưu lượng truyền dữ liệu phát sinh. Mức chi phụ thuộc thời gian vận hành và mức sử dụng thực tế. Báo cáo chưa đưa ra tổng chi phí cố định khi chưa có bảng tổng hợp hóa đơn tương ứng.

Mô hình một EC2 phù hợp phạm vi thực hành và giúp tập trung vận hành. Khi máy chủ dừng, website và các tiến trình trên máy cũng bị gián đoạn. Địa chỉ IPv4 tự cấp có thể thay đổi sau stop/start. Snapshot kiểm duyệt được đồng bộ định kỳ nên có độ trễ giữa DynamoDB và lớp truy vấn Athena.

Dữ liệu nguồn có thể thiếu lương, cấp bậc hoặc thay đổi cấu trúc trang. Hệ thống cần tiếp tục kiểm tra chất lượng dữ liệu và điều chỉnh bộ thu thập khi nguồn thay đổi. Chưa có kết quả kiểm thử tải để khẳng định khả năng phục vụ quy mô lớn.

### 9. Kết quả thực hiện

Các bằng chứng thực hành ngày **11/11/2026** ghi nhận:

| Hạng mục | Kết quả |
| --- | --- |
| Pipeline | Hoàn thành 25/25 batch, thu thập 624 tin và kết thúc với trạng thái `SUCCEEDED` |
| Dữ liệu xử lý | Current và clean có 1.072 bản ghi; Parquet có 1.072 dòng, 24 cột |
| Công bố dữ liệu | Parquet trên S3 có metadata mã lượt chạy tương ứng với lượt xử lý |
| Dashboard | Hiển thị 654 việc làm đang hoạt động, 321 doanh nghiệp, 131 tin công khai lương và 328 kỹ năng khi chưa áp dụng bộ lọc |
| Truy cập web | HTTP chuyển sang HTTPS; health trả `ok`; WebSocket nhận mã 101 |
| Tự động hóa | Pipeline timer được bật, có lịch 02:00 giờ Việt Nam; các dịch vụ hỗ trợ có bằng chứng trạng thái và log |
| Kiểm thử | Bộ unit test hoàn thành 140 test với kết quả `OK`; các script kiểm thử giao diện đăng ký, kiểm duyệt và tiếng Việt có thông báo kiểm tra thành công |

Số bản ghi trong dữ liệu hiện tại khác số tin thu thập của một lượt vì hệ thống có đồng bộ và lưu trạng thái qua nhiều lần cập nhật. Số việc làm công khai trên dashboard là tập dữ liệu sau các điều kiện hiển thị. Các số liệu trên gắn với thời điểm thực hành và có thể thay đổi khi dữ liệu được cập nhật.

### 10. Kết luận và hướng phát triển

Vietnam IT Job Market đã kết nối quá trình thu thập dữ liệu ITviec, ETL bằng Python, lưu trữ và truy vấn trên AWS với một website phân tích có chức năng người dùng và quản trị. Lịch xử lý tự động, kiểm duyệt và log tập trung hỗ trợ theo dõi hệ thống sau triển khai.

Hướng phát triển tiếp theo là kiểm thử tải, cải thiện việc chuẩn hóa các trường còn thiếu, hoàn thiện quản lý phiên và phục hồi tài khoản, bổ sung kênh nhận cảnh báo, đồng thời đánh giá phương án địa chỉ truy cập ổn định và tăng tính sẵn sàng. Các nội dung này là định hướng mở rộng, chưa tính là kết quả đã triển khai của đề tài.

[Xem Workshop Vietnam IT Job Market →](../5-Workshop/)
