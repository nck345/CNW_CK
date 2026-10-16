<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM reviews ORDER BY id DESC LIMIT 20");
            $reviews = $stmt->fetchAll();
            sendJson("success", $reviews, "Lấy danh sách đánh giá thành công");
        } catch (Exception $e) {
            // fallback
        }
    }
    
    // Fallback static reviews
    $mock_reviews = [
        [
            "id" => 1,
            "author_name" => "Trần Minh Anh",
            "author_origin" => "Hà Nội",
            "rating" => 5,
            "comment" => "Chùa Cầu về đêm khoác lên mình vẻ trầm mặc thiêng liêng. Ánh sáng đèn lồng và bóng nước sông Hoài tạo nên khung cảnh tuyệt đẹp!",
            "created_at" => "2026-10-15 19:30:00"
        ],
        [
            "id" => 2,
            "author_name" => "Michael Chen",
            "author_origin" => "Đài Loan",
            "rating" => 5,
            "comment" => "Nhà cổ Tấn Ký với những cột gỗ lim đồ sộ và giếng trời thông minh chứng minh trình độ xây dựng đỉnh cao của thương nhân xưa.",
            "created_at" => "2026-10-14 10:15:00"
        ],
        [
            "id" => 3,
            "author_name" => "Đặng Hoàng Nam",
            "author_origin" => "Đà Nẵng",
            "rating" => 5,
            "comment" => "Hội quán Phúc Kiến vô cùng trang nghiêm, kiến trúc gốm sứ tinh xảo từng góc nhỏ. Rất tự hào về di sản văn hóa miền Trung!",
            "created_at" => "2026-10-12 16:45:00"
        ]
    ];
    sendJson("success", $mock_reviews, "Lấy danh sách đánh giá thành công (Offline)");
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        $input = $_POST;
    }

    $name = trim($input['name'] ?? '');
    $origin = trim($input['origin'] ?? 'Việt Nam');
    $rating = intval($input['rating'] ?? 5);
    $comment = trim($input['comment'] ?? '');

    if (empty($name) || empty($comment)) {
        sendJson("error", [], "Vui lòng nhập họ tên và nội dung cảm nghĩ của bạn.");
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO reviews (author_name, author_origin, rating, comment) VALUES (:name, :origin, :rating, :comment)");
            $stmt->execute([
                ':name' => $name,
                ':origin' => $origin,
                ':rating' => $rating,
                ':comment' => $comment
            ]);
            $new_id = $pdo->lastInsertId();
        } catch (Exception $e) {
            $new_id = time();
        }
    } else {
        $new_id = time();
    }

    sendJson("success", [
        "id" => $new_id,
        "author_name" => $name,
        "author_origin" => $origin,
        "rating" => $rating,
        "comment" => $comment,
        "created_at" => date("Y-m-d H:i:s")
    ], "Gửi cảm nhận thành công! Cảm ơn bạn đã đóng góp cho trang di sản Hội An.");
}
