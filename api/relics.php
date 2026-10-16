<?php
require_once __DIR__ . '/config.php';

if (!$pdo) {
    // Fallback mock data when running without MySQL
    $mock_relics = [
        [
            "id" => 1,
            "code" => "CHUA_CAU",
            "name" => "Chùa Cầu (Lai Viễn Kiều)",
            "category_slug" => "nhat-ban",
            "build_year" => "Thế kỷ 17",
            "address" => "Đầu đường Nguyễn Thị Minh Khai, P. Minh An, Hội An",
            "opening_hours" => "07:00 - 21:30",
            "ticket_price" => 80000,
            "image" => "assets/images/chua_cau.jpg",
            "short_desc" => "Biểu tượng lịch sử vô giá hơn 400 năm bắc qua nhánh sông Hoài, mang dấu ấn văn hóa Nhật Bản.",
            "history" => "Chùa Cầu được các thương nhân Nhật Bản xây dựng vào khoảng đầu thế kỷ 17...",
            "architecture" => "Cây cầu dài khoảng 18m với mái che ngói âm dương uốn cong nhẹ nhàng...",
            "rating" => 4.9,
            "views" => 1250
        ],
        [
            "id" => 2,
            "code" => "NHA_CO_TAN_KY",
            "name" => "Nhà cổ Tấn Ký",
            "category_slug" => "nha-co",
            "build_year" => "Năm 1741",
            "address" => "101 Nguyễn Thái Học, P. Minh An, Hội An",
            "opening_hours" => "08:00 - 17:45",
            "ticket_price" => 80000,
            "image" => "assets/images/nha_co.jpg",
            "short_desc" => "Di tích nhà cổ đầu tiên được công nhận Di tích quốc gia, nơi hội tụ tinh hoa kiến trúc Việt - Trung - Nhật.",
            "history" => "Ngôi nhà được xây dựng từ năm 1741 bởi gia tộc họ Lê qua 7 thế hệ sinh sống...",
            "architecture" => "Kiến trúc hình ống đặc trưng, gỗ lim và đồ khảm xà cừ quý hiếm...",
            "rating" => 4.8,
            "views" => 980
        ],
        [
            "id" => 3,
            "code" => "HQ_PHUC_KIEN",
            "name" => "Hội quán Phúc Kiến",
            "category_slug" => "hoi-quan",
            "build_year" => "Năm 1697",
            "address" => "46 Trần Phú, P. Cẩm Châu, Hội An",
            "opening_hours" => "07:30 - 18:00",
            "ticket_price" => 80000,
            "image" => "assets/images/hoi_quan.jpg",
            "short_desc" => "Công trình tín ngưỡng đồ sộ và rực rỡ nhất phố Hội, thờ Bà Thiên Hậu Thánh Mẫu phù hộ ngư dân.",
            "history" => "Khởi nguồn là gian miếu nhỏ từ năm 1690 do thương nhân Phúc Kiến lập nên...",
            "architecture" => "Cổng tam quan nguy nga lợp ngói lưu ly xanh, nghệ thuật chạm khắc rồng phượng...",
            "rating" => 4.9,
            "views" => 1120
        ],
        [
            "id" => 4,
            "code" => "HOA_DANG",
            "name" => "Bến thuyền Sông Hoài & Đêm hoa đăng",
            "category_slug" => "tam-linh",
            "build_year" => "Truyền thống dân gian",
            "address" => "Dọc bờ sông Bạch Đằng, P. Minh An, Hội An",
            "opening_hours" => "18:00 - 22:00",
            "ticket_price" => 50000,
            "image" => "assets/images/hoa_dang.jpg",
            "short_desc" => "Trải nghiệm linh thiêng thả đèn hoa đăng cầu an và ngắm phố cổ lung linh ánh nến soi bóng nước.",
            "history" => "Lễ hội hoa đăng là nét đẹp tâm linh truyền thống gắn liền với đời sống phố Hội...",
            "architecture" => "Không gian cảnh quan bến sông lung linh hàng vạn chiếc đèn lồng rực rỡ...",
            "rating" => 4.9,
            "views" => 2300
        ]
    ];
    sendJson("success", $mock_relics, "Lấy dữ liệu di tích từ bộ nhớ tạm thành công (Offline Mode)");
}

$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$search = isset($_GET['search']) ? trim($_GET['search']) : '';

try {
    $sql = "SELECT * FROM relics WHERE 1=1";
    $params = [];

    if (!empty($category) && $category !== 'all') {
        $sql .= " AND category_slug = :cat";
        $params[':cat'] = $category;
    }

    if (!empty($search)) {
        $sql .= " AND (name LIKE :kw OR address LIKE :kw OR short_desc LIKE :kw)";
        $params[':kw'] = '%' . $search . '%';
    }

    $sql .= " ORDER BY id ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $relics = $stmt->fetchAll();

    sendJson("success", $relics, "Lấy danh sách di tích thành công");
} catch (Exception $e) {
    sendJson("error", [], "Lỗi truy vấn: " . $e->getMessage());
}
