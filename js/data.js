/**
 * CƠ SỞ DỮ LIỆU ĐIỂM ĐẾN & DI SẢN PHỐ CỔ HỘI AN
 * Dữ liệu phục vụ hiển thị Client-side & Offline Mode
 */

const HOIAN_DATA = {
    relics: [
        {
            id: 1,
            code: "CHUA_CAU",
            name: "Chùa Cầu (Lai Viễn Kiều)",
            category: "nhat-ban",
            categoryName: "Dấu ấn Nhật Bản",
            tag: "Di tích Quốc gia đặc biệt",
            year: "Thế kỷ 17 (khoảng 1593)",
            address: "Đường Nguyễn Thị Minh Khai, P. Minh An, TP. Hội An",
            mapX: 28, // % toạ độ trên bản đồ phố cổ
            mapY: 55,
            openHours: "07:00 - 21:30",
            ticket: "Có trong vé tham quan trọn gói phố cổ (80.000đ)",
            image: "assets/images/chua_cau.jpg",
            shortDesc: "Chiếc cầu ngói cổ kính vắt ngang nhánh sông Hoài, biểu tượng trường tồn 400 năm kết nối văn hóa Việt - Nhật.",
            history: "Chùa Cầu được các thương nhân Nhật Bản định cư tại Hội An hùn vốn xây dựng vào khoảng cuối thế kỷ 16 đầu thế kỷ 17. Theo truyền thuyết dân gian, cây cầu đóng vai trò như một thanh gươm thần yểm trấn lưng quái vật Mamazu (con Cù) có đầu ở Ấn Độ, đuôi ở Nhật Bản và lưng ở Hội An, ngăn không cho thủy quái quẫy mình gây động đất lũ lụt. Năm 1719, chúa Nguyễn Phúc Chu kinh lý Hội An, cảm kích tấm lòng hiếu khách đã ban tặng bức hoành phi sơn son thiếp vàng khắc ba chữ 'Lai Viễn Kiều' (Cầu đón bạn từ phương xa tới).",
            architecture: "Công trình dài gần 18m, mặt cắt rộng hơn 3m với cấu trúc 'thượng gia hạ kiều' (trên là ngôi nhà gỗ mái ngói, dưới là mố trụ cầu đá vững chãi). Mái cầu lợp ngói âm dương uốn cong thoai thoải. Gian chùa nhỏ ở giữa thờ Bắc Đế Trấn Vũ - vị thần chuyên trị phong ba bão lụt theo tín ngưỡng cổ xưa. Hai đầu cầu được trấn giữ bởi cặp tượng gỗ linh thiêng: Thần Hầu (khỉ) và Thần Khuyển (chó).",
            highlights: [
                "Biểu tượng in trên tờ tiền polyme 20.000 VNĐ",
                "Kết cấu thượng gia hạ kiều độc nhất vô nhị ở miền Trung",
                "Hoành phi chữ Hán cổ do chúa Nguyễn Phúc Chu ngự ban"
            ]
        },
        {
            id: 2,
            code: "NHA_CO_TAN_KY",
            name: "Nhà Cổ Tấn Ký",
            category: "nha-co",
            categoryName: "Nhà cổ truyền thống",
            tag: "Di tích lịch sử Quốc gia",
            year: "Năm 1741 (trên 280 năm)",
            address: "101 Nguyễn Thái Học, P. Minh An, TP. Hội An",
            mapX: 52,
            mapY: 62,
            openHours: "08:00 - 17:45",
            ticket: "Có trong vé tham quan phố cổ",
            image: "assets/images/nha_co.jpg",
            shortDesc: "Tuyệt phẩm nhà ống thương gia thế kỷ 18, nơi gìn giữ trọn vẹn hồn cốt kiến trúc tam hợp Việt - Hoa - Nhật.",
            history: "Được xây dựng từ năm 1741 bởi cụ Lê Công - một thương gia người Hoa gốc Quảng Đông định cư tại thương cảng Hội An. Tên gọi 'Tấn Ký' mang ý nghĩa ngày càng phát đạt, phát tài phát lộc. Trải qua hơn 7 thế hệ cháu con tiếp nối trông coi, ngôi nhà vẫn sừng sững vượt qua hàng chục trận đại hồng thủy lịch sử của sông Thu Bồn, đặc biệt là trận lụt kỷ lục năm 1964 ngập tới trần tầng 1 mà kết cấu khung gỗ lim vẫn nguyên vẹn.",
            architecture: "Nhà hình ống sâu hun hút thông hai mặt phố: mặt trước đường Nguyễn Thái Học để đón khách giao dịch buôn bán nông sản, vải lụa; mặt sau đường Bạch Đằng hướng ra bến sông để tiếp nhận hàng hóa từ thuyền buôn. Hệ khung dầm làm hoàn toàn bằng gỗ lim và kiền kiền không dùng đinh kim loại mà liên kết bằng mộng gỗ. Giếng trời ở giữa đóng vai trò thông gió đối lưu và thu nạp năng lượng tự nhiên.",
            highlights: [
                "Bảo vật 'Chén Khổng Tử' giáo dục đức tính khiêm nhường",
                "Các bức hoành phi, câu đối khảm xà cừ hình chim hạc uyển chuyển",
                "Hệ thống ròng rọc thông minh chuyển đồ lên gác xép khi mùa nước nổi"
            ]
        },
        {
            id: 3,
            code: "HQ_PHUC_KIEN",
            name: "Hội Quán Phúc Kiến",
            category: "hoi-quan",
            categoryName: "Hội quán Hoa Kiều",
            tag: "Di tích kiến trúc nghệ thuật",
            year: "Năm 1697",
            address: "46 Trần Phú, P. Cẩm Châu, TP. Hội An",
            mapX: 68,
            mapY: 48,
            openHours: "07:30 - 18:00",
            ticket: "Có trong vé tham quan phố cổ",
            image: "assets/images/hoi_quan.jpg",
            shortDesc: "Công trình hội quán quy mô bề thế nhất Hội An với nghệ thuật khảm sành sứ và những vòng nhang trầm huyền bí.",
            history: "Tiền thân là ngôi miếu nhỏ thờ Thiên Hậu Thánh Mẫu do cộng đồng Hoa kiều bang Phúc Kiến dựng nên từ năm 1697 để cầu xin bà che chở bình an trong những chuyến hải hành vượt bão gió. Trải qua các đợt đại trùng tu quy mô lớn vào thế kỷ 18 và 19, hội quán trở thành trung tâm tín ngưỡng, văn hóa và nơi hội họp tương thân tương ái của đồng hương người Phúc Kiến tại Hội An.",
            architecture: "Bố cục theo mặt bằng hình chữ Tam (chính điện, tiền điện và hậu điện). Cổng Tam quan đồ sộ lợp ngói lưu ly men xanh ngọc bích, các bờ nóc trang trí lưỡng long chầu nguyệt đắp bằng miểng sành sứ sặc sỡ. Giữa sân là hồ nước non bộ với tượng cá chép hóa rồng. Trong chính điện, hàng trăm vòng nhang khoanh khổng lồ treo lơ lửng, cháy âm ỉ tỏa hương thơm thanh tịnh cả tháng trời.",
            highlights: [
                "Chính điện tôn nghiêm thờ Bà Thiên Hậu Thánh Mẫu cứu nạn trên biển",
                "Bức tranh mô hình thuyền buồm vượt sóng của thương nhân Phúc Kiến",
                "Nghệ thuật đắp nổi sành sứ tinh xảo bậc nhất phương Nam"
            ]
        },
        {
            id: 4,
            code: "HOA_DANG",
            name: "Bến Thuyền Sông Hoài & Đêm Hoa Đăng",
            category: "tam-linh",
            categoryName: "Văn hóa & Tâm linh",
            tag: "Di sản văn hóa phi vật thể",
            year: "Truyền thống dân gian nhiều thế kỷ",
            address: "Dọc tuyến phố đi bộ Bạch Đằng, TP. Hội An",
            mapX: 45,
            mapY: 78,
            openHours: "17:30 - 22:30",
            ticket: "Miễn phí dạo phố (Thuyền và hoa đăng tự chọn)",
            image: "assets/images/hoa_dang.jpg",
            shortDesc: "Khung cảnh nghìn ánh nến lung linh trôi theo dòng sông Hoài, biến Hội An thành dạ khúc ánh sáng kỳ ảo.",
            history: "Nghi thức thả đèn hoa đăng bắt nguồn từ truyền thống Phật giáo và tín ngưỡng dân gian ven sông của cư dân Hội An xưa. Hoa đăng mang biểu tượng của ánh sáng trí tuệ, ngọn lửa xua tan u tối muộn phiền. Vào các đêm rằm ngày 14 âm lịch và dịp lễ hội, người dân Hội An tắt hết đèn điện, chỉ thắp đèn lồng và thắp nến hoa đăng trôi trên sông Hoài để cầu nguyện quốc thái dân an, gia đạo thuận hòa.",
            architecture: "Đèn hoa đăng được làm thủ công khéo léo từ giấy thủ công nhiều màu sắc, xếp cánh hoa sen nở rộ, bên trong đặt một ngọn nến nhỏ. Du khách có thể bước xuống những chiếc thuyền gỗ tam bản mộc mạc do người chèo đò phố Hội đưa đón, lướt êm đềm giữa lòng sông ngắm bóng chùa Cầu và những dãy nhà vàng soi bóng nước.",
            highlights: [
                "Cảm xúc bình yên tự tay thắp nến và thả hoa đăng cầu an",
                "Chiêm ngưỡng toàn cảnh phố cổ lung linh phản chiếu trên mặt nước",
                "Lắng nghe câu hò khoan và giai điệu bài chòi vẳng từ đôi bờ"
            ]
        }
    ],

    // Đặc sản ẩm thực Hội An
    culinary: [
        {
            name: "Cao Lầu Hội An",
            desc: "Sợi mì vàng dai giòn ngâm nước tro củi Cù Lao Chàm, xá xíu thơm lừng hòa quyện cùng rau sống Trà Quế non mơn mởn.",
            famousSpot: "Cao Lầu Bá Lễ (49/3 Trần Hưng Đạo), Cao Lầu Không Gian Xanh (687 Hai Bà Trưng)",
            price: "35.000đ - 50.000đ / tô",
            badge: "Món ăn độc bản thế giới"
        },
        {
            name: "Bánh Bao - Bánh Vạc (Bông Hồng Trắng)",
            desc: "Vỏ bánh bột gạo trắng trong như cánh hoa hồng, nhân tôm thịt tươi giòn chấm nước mắm ớt thanh ngọt đặc trưng.",
            famousSpot: "Nhà hàng Bông Hồng Trắng (533 Hai Bà Trưng)",
            price: "50.000đ - 70.000đ / đĩa",
            badge: "Hương vị cung đình tinh tế"
        },
        {
            name: "Cơm Gà Phố Hội",
            desc: "Cơm nấu nước luộc gà óng ánh nghệ vàng, thịt gà ta xé phay bóp gỏi hành tây chua ngọt, rau răm cay nồng đậm đà.",
            famousSpot: "Cơm gà Bà Buội (22 Phan Chu Trinh), Cơm gà Nga (8 Phan Chu Trinh)",
            price: "40.000đ - 65.000đ / dĩa",
            badge: "Top ẩm thực Việt Nam"
        },
        {
            name: "Mì Quảng & Bánh Mì Hội An",
            desc: "Bánh mì giòn rụm với pa-tê béo ngậy sốt rim gia truyền nổi tiếng quốc tế, cùng tô mì Quảng đậm vị quê nhà.",
            famousSpot: "Bánh mì Phượng (02B Phan Chu Trinh), Bánh mì Madam Khánh (115 Trần Cao Vân)",
            price: "25.000đ - 40.000đ / ổ",
            badge: "Bánh mì ngon nhất thế giới"
        }
    ],

    // Tuyến tham quan gợi ý
    tours: [
        {
            id: 1,
            title: "Tuyến 1: Dấu Ấn Giao Thoa 3 Nền Văn Hóa",
            duration: "3 - 4 giờ",
            target: "Khách đi lần đầu, yêu thích lịch sử",
            itinerary: ["Chùa Cầu (Nhật Bản)", "Nhà cổ Tấn Ký (Việt - Hoa)", "Hội quán Phúc Kiến (Trung Hoa)", "Bảo tàng Gốm sứ Mậu Dịch"],
            ticketSuggestion: "Vé trọn gói 5 điểm (120.000đ)"
        },
        {
            id: 2,
            title: "Tuyến 2: Hồn Phố Cổ & Nghề Thủ Công Truyền Thống",
            duration: "Nửa ngày",
            target: "Gia đình, bạn trẻ trải nghiệm văn hóa",
            itinerary: ["Xưởng làm đèn lồng", "Lò gốm Thanh Hà", "Vườn rau Trà Quế", "Thưởng thức chè bắp ven đường Bạch Đằng"],
            ticketSuggestion: "Vé làng nghề + trải nghiệm tự làm đèn lồng"
        },
        {
            id: 3,
            title: "Tuyến 3: Đêm Hội Hoa Đăng Lung Linh Sông Hoài",
            duration: "18:00 - 21:30",
            target: "Cặp đôi, du khách ngắm cảnh đêm",
            itinerary: ["Đi thuyền gỗ sông Hoài", "Thả hoa đăng cầu bình an", "Xem biểu diễn Hát Bài Chòi", "Chợ đêm Nguyễn Hoàng"],
            ticketSuggestion: "Vé thuyền + hoa đăng giấy màu"
        }
    ],

    // Đánh giá ban đầu
    initialReviews: [
        {
            id: 1,
            name: "Trần Minh Anh",
            origin: "Hà Nội",
            date: "14/10/2026",
            rating: 5,
            comment: "Chùa Cầu về đêm khoác lên mình vẻ trầm mặc thiêng liêng. Ánh sáng đèn lồng và bóng nước sông Hoài tạo nên khung cảnh mà không một tấm hình nào lột tả hết vẻ đẹp!"
        },
        {
            id: 2,
            name: "Nguyễn Lê Hoàng Nam",
            origin: "Đà Nẵng",
            date: "10/10/2026",
            rating: 5,
            comment: "Nhà cổ Tấn Ký với những cột gỗ lim và giếng trời thông minh chứng minh trình độ xây dựng đỉnh cao của thương nhân xưa. Hướng dẫn viên thuyết minh cực kỳ cuốn hút."
        },
        {
            id: 3,
            name: "Sarah Jenkins",
            origin: "Úc (Australia)",
            date: "05/10/2026",
            rating: 5,
            comment: "Hoi An is magical! The floating lantern experience on Hoai river at night took my breath away. Delicious Cao Lau and warm local people!"
        }
    ]
};
