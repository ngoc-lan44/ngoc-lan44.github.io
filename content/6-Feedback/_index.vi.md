---
title: "Chia sẻ, đóng góp ý kiến"
date: 2026-11-08
weight: 7
chapter: false
pre: " <b> 7. </b> "
---

Phần này là những đúc kết và góc nhìn cá nhân của tôi — **Nguyễn Ngọc Lan**, sinh viên lớp **K68CNTTB**, Học viện Nông nghiệp Việt Nam — sau 12 tuần gắn bó với chương trình **First Cloud AI Journey** và dự án **Vietnam IT Job Market**. Những đánh giá dưới đây được viết từ lăng kính của một sinh viên Công nghệ thông tin đang từng bước chuyển hóa lý thuyết thành các kỹ năng thực chiến trên nền tảng điện toán đám mây.

### Đánh giá theo từng khía cạnh

**1. Môi trường và phương pháp học**

Thay vì nhồi nhét lý thuyết, chương trình hướng dẫn chúng tôi tiếp cận AWS thông qua các bài thực hành thực tế. Việc đưa bài toán lưu trữ và xử lý dữ liệu tuyển dụng IT vào thực hành giúp tôi hiểu sâu bản chất của từng dịch vụ, thay vì chỉ học thuộc lòng tên gọi của chúng. Tôi học được thói quen phải đọc thật kỹ document và rà soát cấu hình trước khi nhấn nút "Deploy".

**2. Tài liệu và văn hóa hỗ trợ**

Hệ thống tài liệu trên Cloud Journey được tổ chức rất logic, dễ dàng tra cứu lại khi quên. Bên cạnh đó, văn hóa "hỏi đúng cách - đáp trúng đích" của chương trình giúp tôi rèn luyện kỹ năng mô tả lỗi (debug), cung cấp đúng log/thông báo lỗi thay vì chỉ hỏi chung chung. Đây là kỹ năng giao tiếp kỹ thuật cực kỳ quan trọng cho công việc sau này.

**3. Sự gắn kết với kiến thức chuyên ngành**

Dự án Vietnam IT Job Market là một minh chứng hoàn hảo cho một luồng dữ liệu (Data Pipeline) thực tế: từ việc chạy script Python thu thập dữ liệu trên EC2, đẩy file định dạng Parquet lên S3, dùng Glue Data Catalog để định nghĩa cấu trúc, cho đến việc dùng Athena truy vấn. Nó giúp tôi xâu chuỗi toàn bộ những mảng kiến thức rời rạc về mạng, lưu trữ và cơ sở dữ liệu đã học ở trường.

**4. Những kỹ năng tiến bộ rõ rệt nhất**

- Tư duy tra cứu tài liệu tiếng Anh chuyên ngành và đọc hiểu kiến trúc hệ thống AWS.
- Tính cẩn thận, kỷ luật khi phân quyền IAM Role, Security Group để đảm bảo bảo mật.
- Khả năng đọc log trên CloudWatch để tự cô lập và xử lý sự cố.
- Kỹ năng tổng hợp, biên tập tài liệu và trình bày báo cáo kỹ thuật một cách trực quan, rành mạch (phát huy được thế mạnh từ các hoạt động truyền thông, phong trào của bản thân).

### Câu hỏi phản hồi

**Điều hài lòng nhất?**

Tôi tự hào nhất về sự tiến bộ của bản thân khi tự tay vận hành được các thành phần cốt lõi của một hệ thống dữ liệu. Khởi đầu với rất nhiều bỡ ngỡ, nhưng giờ đây tôi đã hiểu rõ tại sao lại dùng S3 thay vì Database truyền thống cho Data Lake, hay làm thế nào để tối ưu một câu truy vấn trên Athena. Việc mọi kết quả đều được minh chứng bằng log hoặc Query ID giúp tôi làm việc có cơ sở và tự tin hơn rất nhiều.

**Chương trình nên cải thiện gì?**

- Bổ sung thêm các buổi giao lưu ngắn (mini-workshop) giữa các nhóm thực tập để cùng phân tích các cách giải quyết khác nhau cho chung một bài toán.
- Cung cấp thêm tài liệu hoặc các checklist liên quan đến **Tối ưu chi phí (Cost Optimization)** ngay từ những bài lab đầu tiên, giúp sinh viên sớm hình thành tư duy tiết kiệm tài nguyên đám mây.
- Có thêm một kho lưu trữ chung (Knowledge Base) tổng hợp các lỗi kinh điển (Troubleshooting) của những khóa trước để người mới dễ dàng đối chiếu.

**Có giới thiệu chương trình cho bạn bè tham gia không?**

Chắc chắn có. Đây là môi trường "thực chiến" lý tưởng dành cho những bạn sinh viên chủ động, không ngại đọc tài liệu tiếng Anh và muốn nâng cao năng lực tự giải quyết vấn đề.

### Đề xuất thêm và định hướng

- **Đẩy mạnh thực hành vận hành (Operations):** Mong chương trình có thêm các tình huống giả định (ví dụ: pipeline bị lỗi giữa chừng, EC2 bị sập) để thực tập sinh luyện tập cách khôi phục hệ thống (Backup/Restore).
- **Định hướng cá nhân:** Sau kỳ thực tập, tôi dự định tiếp tục đào sâu vào **Python, Data Engineering và Cloud Computing**. Tôi sẽ hoàn thiện thêm phần trực quan hóa (Dashboard) cho dự án Vietnam IT Job Market và trau dồi thêm các chứng chỉ AWS để mở rộng cơ hội nghề nghiệp.

**Lời cảm ơn**

Xin gửi lời cảm ơn chân thành đến các anh chị Mentor tại AWS Vietnam, cộng đồng First Cloud AI Journey và những người bạn đồng hành trong nhóm thực tập. Hành trình 12 tuần này không chỉ trang bị kiến thức chuyên môn sắc bén, mà còn giúp tôi định hình một tư duy làm việc độc lập, chuyên nghiệp và trách nhiệm hơn — một hành trang vô giá cho sự nghiệp IT phía trước.
