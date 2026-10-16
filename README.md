# 🏮 ĐỒ ÁN CÔNG NGHỆ WEB: WEBSITE GIỚI THIỆU KHU DI TÍCH HỘI AN

> **Học phần:** Công Nghệ Web (Kỳ 7)  
> **Trường:** Đại học Bách Khoa - Đại học Đà Nẵng (DUT)  
> **Đề tài:** Xây dựng website giới thiệu và quảng bá quần thể Khu di tích Đô thị cổ Hội An (Di sản Văn hóa Thế giới UNESCO).  
> **Kho lưu trữ GitHub:** [https://github.com/nck345/CNW_CK.git](https://github.com/nck345/CNW_CK.git)

---

## 🌟 1. TỔNG QUAN ĐỀ TÀI

Hội An là một đô thị cổ nằm ở hạ lưu sông Thu Bồn, tỉnh Quảng Nam, được UNESCO công nhận là Di sản Văn hóa Thế giới vào ngày 04/12/1999. Nhằm mục đích bảo tồn, số hóa tư liệu và lan tỏa giá trị di sản tới đông đảo du khách, dự án xây dựng một nền tảng web tương tác hiện đại, trực quan, thẩm mỹ cao mang tên **Hội An Heritage**.

Website kết hợp giữa giao diện đậm nét hoài cổ (tường vàng, ngói âm dương, đèn lồng, hoa đăng) với các công nghệ web hiện đại, mang lại trải nghiệm khám phá sống động và tiện ích số cho du khách.

---

## 🚀 2. TÍNH NĂNG NỔI BẬT

### 2.1. Giao diện & Trải nghiệm (UI/UX)
- **Chế độ Ngày & Đêm Phố Cổ (Day / Night Lantern Mode):** Chuyển đổi linh hoạt giữa ánh sáng ban ngày ấm áp và không gian đêm phố cổ lung linh hàng vạn ngọn đèn lồng cùng hiệu ứng hạt hoa đăng (Floating Lantern Canvas).
- **Thuyết minh âm thanh (Audio Guide Simulator):** Thanh phát audio thuyết minh di sản với thanh tiến trình và sóng âm thanh trực quan.
- **Tiện ích Thời gian & Thời tiết thời gian thực:** Đồng hồ điện tử phố cổ theo múi giờ GMT+7 và mô phỏng nhiệt độ thực tế ven sông Thu Bồn.

### 2.2. Khám phá & Tra cứu Di tích
- **Bộ lọc & Tìm kiếm tức thời (Live Search & Category Filter):** Lọc nhanh di tích theo từng nhóm (Dấu ấn Nhật Bản, Hội quán Hoa kiều, Nhà cổ truyền thống, Bến sông & Tâm linh) hoặc gõ từ khóa tên di tích.
- **Hồ sơ di tích chi tiết (Modal Popup):** Cung cấp thông tin đầy đủ về nguồn gốc lịch sử, niên đại xây dựng, kiến trúc "thượng gia hạ kiều", giá vé và những điểm tham quan không thể bỏ lỡ.
- **Bản đồ tương tác di tích phố cổ (Interactive Heritage Map):** Mô phỏng trục đường di sản Trần Phú, Bạch Đằng ven sông Hoài với các điểm ghim (pinpoint) có hiệu ứng radar tỏa sáng. Nhấp vào từng điểm để xem nhanh hình ảnh và thông tin.

### 2.3. Dịch vụ & Đặt vé tham quan (E-Ticket System)
- **Tính toán giá vé tự động:** Tự động tính tổng tiền theo số lượng vé người lớn, trẻ em và tùy chọn đăng ký thuyết minh viên (tiếng Việt, tiếng Anh, tiếng Nhật).
- **Kiểm tra hợp lệ form (Form Validation):** Kiểm tra tính hợp lệ của số điện thoại chuẩn Việt Nam, email và ngày tham quan.
- **Xuất vé điện tử kèm mã QR:** Hiển thị thẻ vé điện tử (E-ticket) với mã định danh duy nhất (Booking Code), mã QR check-in và hỗ trợ in vé trực tiếp (`window.print`).

### 2.4. Sổ lưu bút & Đánh giá của khách tham quan (Guestbook & Reviews)
- **Đánh giá xếp hạng sao tương tác:** Chọn từ 1 đến 5 sao theo cảm nhận thực tế.
- **Lưu trữ dữ liệu kết hợp:** Lưu trữ tức thời tại `localStorage` và tự động đồng bộ về REST API backend qua `fetch()`.

---

## 📂 3. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
CNW_CK/
├── index.html                  # Trang chủ ứng dụng web di sản Hội An
├── README.md                   # Tài liệu báo cáo đồ án
├── assets/
│   └── images/                 # Tài nguyên hình ảnh di tích chất lượng cao
│       ├── hero.jpg            # Toàn cảnh hoàng hôn phố cổ bên sông Hoài
│       ├── chua_cau.jpg        # Di tích Chùa Cầu (Lai Viễn Kiều)
│       ├── hoi_quan.jpg        # Hội quán Phúc Kiến uy nghiêm
│       ├── nha_co.jpg          # Không gian bên trong nhà cổ Tấn Ký
│       ├── hoa_dang.jpg        # Đêm hội thả hoa đăng trên sông Hoài
│       └── am_thuc.jpg         # Ẩm thực Cao Lầu và Bánh hoa hồng trắng
├── css/
│   ├── style.css               # Hệ thống định kiểu cốt lõi (Design System)
│   ├── night-mode.css          # Giao diện Đêm Phố Cổ & đèn lồng phát sáng
│   └── responsive.css          # Tối ưu hiển thị Responsive (Mobile, Tablet, Desktop)
├── js/
│   ├── data.js                 # Cơ sở dữ liệu tĩnh di tích, ẩm thực, lộ trình
│   ├── main.js                 # Xử lý tương tác giao diện, bản đồ, audio, canvas
│   ├── booking.js              # Xử lý tính toán đặt vé & xuất vé điện tử
│   └── reviews.js              # Xử lý gửi và hiển thị đánh giá du khách
├── database/
│   └── hoian_heritage.sql      # Kịch bản tạo CSDL MySQL (Bảng di tích, đặt vé, review)
└── api/                        # REST API viết bằng PHP (kết nối MySQL PDO)
    ├── config.php              # Cấu hình kết nối cơ sở dữ liệu
    ├── relics.php              # API danh sách và tìm kiếm di tích
    ├── booking.php             # API tiếp nhận đơn đặt vé
    └── reviews.php             # API lấy và thêm nhận xét của du khách
```

---

## 🛠️ 4. CÔNG NGHỆ SỬ DỤNG

- **Frontend:**
  - HTML5 (Cấu trúc ngữ nghĩa chuẩn SEO)
  - CSS3 (Vanilla CSS, CSS Grid, Flexbox, Custom Variables, CSS Keyframe Animations)
  - JavaScript ES6+ (Fetch API, Canvas API, LocalStorage, DOM Manipulation)
  - Typography: Google Fonts (`Playfair Display` & `Plus Jakarta Sans`)
- **Backend & Database:**
  - PHP 8.x (RESTful API, Prepared Statements, PDO)
  - MySQL / MariaDB (UTF-8 mb4, cấu trúc quan hệ chuẩn)

---

## 💻 5. HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

### Cách 1: Chạy trực tiếp phía Client (Nhanh nhất)
1. Mở file `index.html` trực tiếp bằng bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Cốc Cốc) hoặc sử dụng extension **Live Server** trong VS Code.
2. Toàn bộ các tính năng tìm kiếm, chuyển đổi ngày/đêm, bản đồ tương tác, đặt vé sinh mã QR và đánh giá đều hoạt động hoàn chỉnh thông qua bộ nhớ cục bộ (`localStorage`).

### Cách 2: Chạy cùng Backend PHP & MySQL (Môi trường XAMPP)
1. Sao chép thư mục `CNW_CK` vào thư mục `C:/xampp/htdocs/`.
2. Khởi động **Apache** và **MySQL** trên phần mềm XAMPP Control Panel.
3. Mở trình duyệt truy cập `http://localhost/phpmyadmin/`.
4. Tạo mới cơ sở dữ liệu có tên `hoian_heritage` và chọn tab **Import**, tải file `database/hoian_heritage.sql` lên rồi nhấn **Go**.
5. Mở trình duyệt và truy cập: `http://localhost/CNW_CK/` để trải nghiệm toàn bộ hệ thống kết nối cơ sở dữ liệu.
