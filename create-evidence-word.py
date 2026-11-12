from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

doc=Document()
sec=doc.sections[0]
sec.page_width=Cm(21);sec.page_height=Cm(29.7)
sec.top_margin=Cm(1.6);sec.bottom_margin=Cm(1.6)
sec.left_margin=Cm(1.5);sec.right_margin=Cm(1.5)
for name in ['Normal','Title','Heading 1','Heading 2']:
    st=doc.styles[name];st.font.name='Arial';st.font.color.rgb=RGBColor(0,0,0)
    st._element.get_or_add_rPr().get_or_add_rFonts().set(qn('w:eastAsia'),'Arial')
doc.styles['Normal'].font.size=Pt(10.5)
doc.styles['Normal'].paragraph_format.space_after=Pt(5)
doc.styles['Normal'].paragraph_format.line_spacing=1.08
doc.styles['Title'].font.size=Pt(21)
doc.styles['Title'].paragraph_format.space_after=Pt(10)
doc.styles['Heading 1'].font.size=Pt(13)
doc.styles['Heading 1'].paragraph_format.space_before=Pt(10)
doc.styles['Heading 1'].paragraph_format.space_after=Pt(6)
doc.styles['Heading 2'].font.size=Pt(11)
doc.styles['Heading 2'].paragraph_format.space_after=Pt(4)
doc.core_properties.title='Danh sách ảnh minh chứng workshop CloudDocs'
doc.core_properties.author='Trần Hải Lương'

def p(text,bold=False):
    para=doc.add_paragraph();run=para.add_run(text);run.bold=bold;return para

def table(headers,rows,widths):
    t=doc.add_table(rows=1,cols=len(headers));t.alignment=WD_TABLE_ALIGNMENT.CENTER;t.autofit=False
    for c,w in zip(t.columns,widths):c.width=Cm(w)
    for j,x in enumerate(headers):t.rows[0].cells[j].text=x
    hdr=OxmlElement('w:tblHeader');t.rows[0]._tr.get_or_add_trPr().append(hdr)
    for row in rows:
        cells=t.add_row().cells
        for j,x in enumerate(row):cells[j].text=str(x)
    for i,row in enumerate(t.rows):
        trpr=row._tr.get_or_add_trPr();trpr.append(OxmlElement('w:cantSplit'))
        for j,cell in enumerate(row.cells):
            cell.width=Cm(widths[j]);cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
            tcpr=cell._tc.get_or_add_tcPr()
            borders=OxmlElement('w:tcBorders')
            for edge in ['top','left','bottom','right']:
                b=OxmlElement('w:'+edge);b.set(qn('w:val'),'single');b.set(qn('w:sz'),'4');b.set(qn('w:color'),'D9D9D9');borders.append(b)
            tcpr.append(borders)
            margins=OxmlElement('w:tcMar')
            for edge in ['top','left','bottom','right']:
                b=OxmlElement('w:'+edge);b.set(qn('w:w'),'85');b.set(qn('w:type'),'dxa');margins.append(b)
            tcpr.append(margins)
            shade=OxmlElement('w:shd');shade.set(qn('w:fill'),'233B53' if i==0 else ('F2F5F8' if i%2==0 else 'FFFFFF'));tcpr.append(shade)
            for para in cell.paragraphs:
                para.paragraph_format.space_after=Pt(1)
                para.paragraph_format.line_spacing=1.02
                for run in para.runs:
                    run.font.name='Arial';run.font.size=Pt(9.5)
                    if i==0:run.bold=True;run.font.color.rgb=RGBColor(255,255,255)
    doc.add_paragraph().paragraph_format.space_after=Pt(0)
    return t

ec2=[
('t01-ec2-overview.png','EC2 → Instances → máy chủ CloudDocs','Instance ID, Running, instance type và status checks.'),
('t02-ec2-security-role.png','Instance → Security','IAM Role và Security Group đang gắn.'),
('t03-ec2-sg-inbound.png','Security Group của EC2 → Inbound rules','Các cổng và nguồn truy cập đang được phép.'),
('t04-iam-s3-policy.png','IAM → Roles → role của EC2 → Permissions','Policy truy cập bucket/prefix S3 của Hải Lương: Action và Resource.'),
('t05-iam-role-trust.png','Cùng role → Trust relationships','Chính sách cho phép EC2 nhận role.'),
('t06-backend-running-health.png','Terminal trên chính EC2 chạy CloudDocs','Backend hoạt động và API health phản hồi thành công.')]
rds=[
('t07-rds-overview.png','RDS → Databases → database CloudDocs','Available, tên database, MySQL và cấu hình instance.'),
('t08-rds-connectivity.png','Database → Connectivity & security','Endpoint, port, VPC, subnet và Security Group.'),
('t09-rds-sg-inbound.png','Security Group của RDS → Inbound rules','Cổng 3306 và nguồn được phép kết nối.'),
('t10-rds-data-query.png','MySQL client kết nối đúng RDS','Schema, các bảng và vài bản ghi metadata tài liệu thử.')]
cognito=[
('s01-cognito-user-pool.png','Cognito → User pools → chọn pool','Tên pool, Pool ID và Region.'),
('s02-cognito-app-client.png','App clients → chọn client web','Tên, Client ID và loại client; không hiển thị client secret.'),
('s03-callback-logout.png','App Client → Login pages','Callback URL và sign-out/logout URL đầy đủ.'),
('s04-oauth-grants-scopes.png','Cấu hình OAuth của App Client','Authorization Code grant, scopes và identity provider.'),
('s05-cognito-domain.png','Phần Domain của User Pool','Domain đang phục vụ đăng nhập.'),
('s06-cognito-test-users.png','User Pool → Users','Tài khoản thử, trạng thái và enabled/confirmed.')]
s3=[
('h01-s3-bucket-region.png','S3 → danh sách bucket','Tên bucket và Region.'),
('h02-s3-block-public-access.png','Bucket → Permissions','Trạng thái Block Public Access.'),
('h03-s3-bucket-policy.png','Permissions → Bucket policy','Quyền cho role của Tùng; Principal, Action và Resource.'),
('h04-s3-cors.png','Permissions → CORS','AllowedOrigins, AllowedMethods và AllowedHeaders.'),
('h05-s3-default-encryption.png','Properties → Default encryption','Trạng thái và loại mã hóa đang sử dụng.'),
('h06-s3-uploaded-object.png','Objects → prefix documents/','Tệp upload từ CloudDocs, kích thước và thời gian.'),
('h07-s3-object-properties.png','Object ở H06 → Properties','Object key, kích thước và thông tin tệp.')]
integration=[
('k01-login-success.png','Giao diện CloudDocs sau đăng nhập','Đăng nhập Cognito thành công; thấy tài khoản thử và ứng dụng.'),
('k02-upload-preview.png','Trang tài liệu trên CloudDocs','Upload và xem trước/tải được tài liệu thử.'),
('k03-permission-check.png','Tài khoản thử thứ hai','Được chia sẻ đúng quyền hoặc bị từ chối khi chưa có quyền.')]

doc.add_paragraph('Danh sách ảnh minh chứng\nworkshop CloudDocs','Title')
p('Chụp cấu hình AWS đang sử dụng và kết quả chạy thực tế để bổ sung vào workshop. Không cần tạo lại tài nguyên. Đặt tên ảnh theo danh sách để dễ tổng hợp và viết chú thích.')
table(['Người chụp','Phần cần chụp','Số ảnh'],[
('Tùng','EC2, IAM Role và RDS','10'),('Sang','Cognito','6'),('Hải Lương','S3','7'),('Ảnh bổ sung','Kiểm thử trên CloudDocs','3'),('Tổng','23 ảnh AWS và 3 ảnh kiểm thử','26')],[3.2,12.5,2.3])
p('Thư mục gốc: static/images/workshop-evidence',True)
doc.add_heading('1  Tùng chụp EC2 và IAM',1)
p('6 ảnh đầu tiên trong bộ 10 ảnh của Tùng. Lưu vào thư mục 01-tung-ec2-rds.')
table(['Tên ảnh','Chỗ chụp','Nội dung cần thấy'],ec2,[5.8,5.7,6.5])
p('T06: dùng phiên quản trị EC2 đang chạy, qua SSH hoặc Session Manager thực tế. Không chụp toàn bộ biến môi trường hoặc mật khẩu trong cấu hình.')

doc.add_page_break()
doc.add_heading('2  Tùng chụp RDS MySQL',1)
p('4 ảnh còn lại. Lưu cùng thư mục 01-tung-ec2-rds.')
table(['Tên ảnh','Chỗ chụp','Nội dung cần thấy'],rds,[5.8,5.7,6.5])
p('T10 chỉ truy vấn đọc trên dữ liệu thử. Không chạy lại migration, xóa bảng hoặc hiển thị mật khẩu kết nối.')
doc.add_heading('3  Sang chụp Cognito',1)
p('6 ảnh. Lưu vào thư mục 02-sang-cognito.')
table(['Tên ảnh','Chỗ chụp','Nội dung cần thấy'],cognito,[5.8,5.7,6.5])
p('Nếu tên mục trên Console khác, tìm nhóm thông tin tương ứng. PKCE nằm trong luồng ứng dụng; không cần chụp token hay authorization code để minh chứng.')

doc.add_page_break()
doc.add_heading('4  Hải Lương chụp S3',1)
p('7 ảnh. Lưu vào thư mục 03-hai-luong-s3.')
table(['Tên ảnh','Chỗ chụp','Nội dung cần thấy'],s3,[5.8,5.7,6.5])
p('Policy ở H03 cần đối chiếu được với role của EC2 ở T02 và T04 để giải thích truy cập S3 chéo tài khoản.')
doc.add_heading('5  Ảnh kiểm thử trên CloudDocs',1)
p('3 ảnh bổ sung. Lưu vào thư mục 04-kiem-thu-tich-hop.')
table(['Tên ảnh','Chỗ chụp','Nội dung cần thấy'],integration,[5.8,5.7,6.5])
doc.add_heading('Lưu ý khi tổng hợp',1)
for s in [
 'Chụp rõ chữ; giữ tên tài nguyên và Region để đối chiếu. Che mật khẩu, access key, secret, token và chữ ký presigned URL.',
 'Dùng cùng một tệp thử cho K02 trên CloudDocs, H06–H07 trên S3 và bản ghi T10 trong RDS.',
 'Nếu màn hình dài, tách ảnh bằng hậu tố -a, -b. Lưu đúng đuôi PNG/JPG; không chỉ đổi tên phần mở rộng.',
 'Giữ đúng cấu hình thực tế. Không mở thêm quyền hoặc tạo lại tài nguyên chỉ để chụp ảnh.'
]:p('• '+s)

footer=sec.footer.paragraphs[0];footer.alignment=WD_ALIGN_PARAGRAPH.RIGHT
run=footer.add_run('Trang ');run.font.name='Arial';run.font.size=Pt(9)
field=OxmlElement('w:fldSimple');field.set(qn('w:instr'),'PAGE');footer._p.append(field)
doc.save('HUONG_DAN_CHUP_ANH_WORKSHOP.docx')
print('Created HUONG_DAN_CHUP_ANH_WORKSHOP.docx')
