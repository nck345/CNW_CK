-- ==============================================================
-- CƠ SỞ DỮ LIỆU ĐỒ ÁN MÔN CÔNG NGHỆ WEB (KỲ 7 - DUT)
-- ĐỀ TÀI: WEBSITE GIỚI THIỆU KHU DI TÍCH HỘI AN
-- HỆ QUẢN TRỊ CSDL: MySQL / MariaDB (UTF8mb4)
-- ==============================================================

CREATE DATABASE IF NOT EXISTS `hoian_heritage` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `hoian_heritage`;

-- --------------------------------------------------------------
-- 1. BẢNG DANH MỤC DI TÍCH (categories)
-- --------------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`slug`, `name`, `description`) VALUES
('all', 'Tất cả di tích', 'Tổng hợp toàn bộ các điểm di tích lịch sử và văn hóa tại Hội An'),
('nhat-ban', 'Dấu ấn Nhật Bản', 'Các công trình kiến trúc mang đậm dấu ấn giao thương Việt - Nhật thế kỷ 16-17'),
('hoi-quan', 'Hội quán Hoa Kiều', 'Các hội quán của cộng đồng người Hoa với nghệ thuật chạm khắc và gốm sứ tinh xảo'),
('nha-co', 'Nhà cổ truyền thống', 'Nhà ống gỗ lim trăm tuổi lưu giữ nếp sống sinh hoạt thương gia xưa'),
('tam-linh', 'Văn hóa & Tâm linh', 'Đền, chùa, miếu mạo gắn liền với đời sống tín ngưỡng phố Hội');

-- --------------------------------------------------------------
-- 2. BẢNG KHU DI TÍCH (relics)
-- --------------------------------------------------------------
DROP TABLE IF EXISTS `relics`;
CREATE TABLE `relics` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(30) NOT NULL UNIQUE,
    `name` VARCHAR(200) NOT NULL,
    `category_slug` VARCHAR(50) NOT NULL,
    `build_year` VARCHAR(50) DEFAULT NULL,
    `address` VARCHAR(255) NOT NULL,
    `opening_hours` VARCHAR(100) DEFAULT '07:30 - 18:00',
    `ticket_price` INT DEFAULT 0,
    `image` VARCHAR(255) NOT NULL,
    `short_desc` TEXT NOT NULL,
    `history` LONGTEXT,
    `architecture` LONGTEXT,
    `rating` DECIMAL(2,1) DEFAULT 5.0,
    `views` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `relics` (`code`, `name`, `category_slug`, `build_year`, `address`, `opening_hours`, `ticket_price`, `image`, `short_desc`, `history`, `architecture`, `rating`, `views`) VALUES
('CHUA_CAU', 'Chùa Cầu (Lai Viễn Kiều)', 'nhat-ban', 'Thế kỷ 17', 'Đầu đường Nguyễn Thị Minh Khai, P. Minh An, Hội An', '07:00 - 21:30', 80000, 'assets/images/chua_cau.jpg', 'Biểu tượng lịch sử vô giá hơn 400 năm bắc qua nhánh sông Hoài, mang dấu ấn văn hóa Nhật Bản.', 'Chùa Cầu được các thương nhân Nhật Bản xây dựng vào khoảng đầu thế kỷ 17 nhằm trấn áp quái vật Cù (Mamazu) theo truyền thuyết phương Đông. Năm 1719, chúa Nguyễn Phúc Chu thăm Hội An đã ngự ban ba chữ Lai Viễn Kiều (Cầu đón khách phương xa).', 'Cây cầu dài khoảng 18m với mái che bằng ngói âm dương uốn cong nhẹ nhàng, kết cấu thượng gia hạ kiều (trên là nhà, dưới là cầu). Hai đầu cầu đặt tượng gỗ Thần Khuyển và Thần Hầu trấn giữ.', 4.9, 1250),
('NHA_CO_TAN_KY', 'Nhà cổ Tấn Ký', 'nha-co', 'Năm 1741', '101 Nguyễn Thái Học, P. Minh An, Hội An', '08:00 - 17:45', 80000, 'assets/images/nha_co.jpg', 'Di tích nhà cổ đầu tiên được công nhận Di tích quốc gia, nơi hội tụ tinh hoa kiến trúc Việt - Trung - Nhật.', 'Ngôi nhà được xây dựng từ năm 1741 bởi gia tộc họ Lê, trải qua 7 thế hệ sinh sống và giữ gìn gần như nguyên vẹn từng vật dụng, cột gỗ, đồ khảm xà cừ quý hiếm.', 'Kiến trúc hình ống đặc trưng với mặt tiền đường Nguyễn Thái Học mở hiệu buôn, mặt sau mở ra bến sông Bạch Đằng tiếp nhận hàng hóa. Giếng trời ở giữa đón gió và ánh sáng tự nhiên.', 4.8, 980),
('HQ_PHUC_KIEN', 'Hội quán Phúc Kiến', 'hoi-quan', 'Năm 1697', '46 Trần Phú, P. Cẩm Châu, Hội An', '07:30 - 18:00', 80000, 'assets/images/hoi_quan.jpg', 'Công trình tín ngưỡng đồ sộ và rực rỡ nhất phố Hội, thờ Bà Thiên Hậu Thánh Mẫu phù hộ ngư dân.', 'Khởi nguồn là một gian miếu nhỏ xây dựng năm 1690 do đồng hương Phúc Kiến lập nên, sau đó được trùng tu uy nghiêm vào năm 1757 để làm nơi hội họp và cúng bái thần linh.', 'Cổng tam quan lợp ngói men xanh ngọc bích, đắp nổi tứ linh và gốm sứ cầu kỳ. Chính điện thờ Thiên Hậu Thánh Mẫu, hậu điện thờ Lục Tánh Vương Gia với những vòng hương trầm khổng lồ cháy suốt nhiều ngày.', 4.9, 1120),
('HOA_DANG', 'Bến thuyền Sông Hoài & Thả hoa đăng', 'tam-linh', 'Truyền thống dân gian', 'Dọc bờ sông Bạch Đằng, P. Minh An, Hội An', '18:00 - 22:00', 50000, 'assets/images/hoa_dang.jpg', 'Trải nghiệm linh thiêng thả đèn hoa đăng cầu an và ngắm phố cổ lung linh ánh nến soi bóng nước.', 'Lễ hội hoa đăng là nét đẹp tâm linh truyền thống gắn liền với ngày rằm và đêm phố cổ, gửi gắm ước nguyện bình an, sức khỏe và thịnh vượng xuôi theo dòng nước.', 'Không gian huyền ảo khi toàn bộ đèn điện nhường chỗ cho hàng vạn ngọn đèn lồng và đèn hoa đăng giấy màu rực rỡ bồng bềnh trên dòng sông Hoài thơ mộng.', 4.9, 2300);

-- --------------------------------------------------------------
-- 3. BẢNG ĐẶT VÉ VÀ THAM QUAN (bookings)
-- --------------------------------------------------------------
DROP TABLE IF EXISTS `bookings`;
CREATE TABLE `bookings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `booking_code` VARCHAR(20) NOT NULL UNIQUE,
    `fullname` VARCHAR(150) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `visit_date` DATE NOT NULL,
    `ticket_type` VARCHAR(50) DEFAULT 'combo_heritage',
    `adult_qty` INT DEFAULT 1,
    `child_qty` INT DEFAULT 0,
    `need_guide` TINYINT(1) DEFAULT 0,
    `guide_language` VARCHAR(30) DEFAULT 'vi',
    `total_amount` INT NOT NULL,
    `notes` TEXT,
    `status` ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'confirmed',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `bookings` (`booking_code`, `fullname`, `email`, `phone`, `visit_date`, `ticket_type`, `adult_qty`, `child_qty`, `need_guide`, `guide_language`, `total_amount`, `notes`) VALUES
('HA-20261016-01', 'Nguyễn Văn Khiêm', 'khiem.dut@gmail.com', '0905123456', '2026-10-25', 'combo_heritage', 2, 0, 1, 'vi', 350000, 'Cần thuyết minh viên am hiểu sâu lịch sử chùa Cầu và kiến trúc nhà cổ.'),
('HA-20261016-02', 'Lê Thị Thu Thảo', 'thuthao.dn@gmail.com', '0914987654', '2026-11-02', 'night_tour', 3, 1, 0, 'vi', 270000, 'Đăng ký tour hoa đăng buổi tối.');

-- --------------------------------------------------------------
-- 4. BẢNG ĐÁNH GIÁ & CẢM NHẬN (reviews)
-- --------------------------------------------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `relic_id` INT DEFAULT NULL,
    `author_name` VARCHAR(120) NOT NULL,
    `author_email` VARCHAR(100),
    `author_origin` VARCHAR(100) DEFAULT 'Việt Nam',
    `rating` INT NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
    `comment` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`relic_id`) REFERENCES `relics`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `reviews` (`relic_id`, `author_name`, `author_origin`, `rating`, `comment`) VALUES
(1, 'Trần Minh Anh', 'Hà Nội', 5, 'Chùa Cầu về đêm khoác lên mình vẻ trầm mặc thiêng liêng. Ánh sáng đèn lồng và bóng nước sông Hoài tạo nên khung cảnh không nơi nào có được!'),
(2, 'Michael Chen', 'Đài Loan', 5, 'Nhà cổ Tấn Ký với những cột gỗ lim đồ sộ và giếng trời thông minh chứng minh trình độ xây dựng đỉnh cao của thương nhân xưa.'),
(3, 'Đặng Hoàng Nam', 'Đà Nẵng', 5, 'Hội quán Phúc Kiến vô cùng trang nghiêm, kiến trúc gốm sứ tinh xảo từng góc nhỏ. Rất đáng để ghé thăm nhiều lần!');
