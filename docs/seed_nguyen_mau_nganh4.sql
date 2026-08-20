-- ============================================================
-- GIA PHẢ DÒNG HỌ NGUYỄN MẬU (NGÀNH 4)
-- Địa chỉ: Thôn Thượng Đền, Thị trấn Cổ Lễ, Huyện Trực Ninh, Tỉnh Nam Định
-- Cơ sở dữ liệu: Supabase / PostgreSQL (chuẩn GiaPha-OS)
-- ============================================================

-- 1. Xóa dữ liệu cũ (chỉ dùng khi muốn làm mới hoàn toàn phả hệ)
TRUNCATE TABLE custom_events CASCADE;
TRUNCATE TABLE relationships CASCADE;
TRUNCATE TABLE person_details_private CASCADE;
TRUNCATE TABLE persons CASCADE;

-- ============================================================
-- ĐỜI 1: CỤ KHỞI TỔ NGÀNH 4
-- ============================================================
INSERT INTO persons (id, full_name, gender, birth_year, birth_month, birth_day, death_year, death_month, death_day, death_lunar_year, death_lunar_month, death_lunar_day, is_deceased, is_in_law, generation, birth_order, other_names, note)
VALUES
(
  '10000000-0000-0000-0000-000000000001',
  'Nguyễn Mậu Phúc',
  'male', 1895, 4, 12, 1968, 10, 6, 1968, 8, 15, TRUE, FALSE, 1, NULL,
  'Tự: Thuần Hậu, Hiệu: Phúc Điền Cư Sĩ',
  'Cụ Khởi Tổ Ngành 4 dòng họ Nguyễn Mậu tại Thôn Thượng Đền, Cổ Lễ, Trực Ninh. Sinh thời đức độ, nho nhã, tinh thông y thuật và phong thủy, có công tạo dựng cơ nghiệp và quy hoạch từ đường ngành 4. Phần mộ an táng tại Khu Lăng Mộ dòng họ Nguyễn Mậu, Thôn Thượng Đền, Cổ Lễ.'
),
(
  '10000000-0000-0000-0000-000000000002',
  'Trần Thị Đoan',
  'female', 1898, 9, 20, 1972, 11, 27, 1972, 10, 22, TRUE, TRUE, 1, NULL,
  'Hiệu: Từ Tâm Nhu Thuận',
  'Cụ Bà Chính Thất, người làng Chùa Cổ Lễ, hiền thục nết na, tần tảo cùng Cụ Ông nuôi dạy con cháu giữ trọn nền nếp gia phong. Mộ an táng tại Khu Lăng Mộ dòng họ Nguyễn Mậu, Thôn Thượng Đền.'
);

-- ============================================================
-- ĐỜI 2: CÁC CHI TRƯỞNG & THỨ NGÀNH 4
-- ============================================================
INSERT INTO persons (id, full_name, gender, birth_year, birth_month, birth_day, death_year, death_month, death_day, death_lunar_year, death_lunar_month, death_lunar_day, is_deceased, is_in_law, generation, birth_order, other_names, note)
VALUES
-- Nhánh Trưởng (Cụ Trọng)
(
  '20000000-0000-0000-0000-000000000001',
  'Nguyễn Mậu Trọng',
  'male', 1920, 2, 8, 1995, 4, 11, 1995, 3, 12, TRUE, FALSE, 2, 1,
  'Tự: Minh Chính',
  'Trưởng nam Ngành 4. Tham gia kháng chiến chống Pháp, phụ trách công tác thủ công nghiệp địa phương tại Cổ Lễ. Người giữ gìn gia phả chữ Hán Nôm và hưng công trùng tu Từ đường họ. Mộ tại Nghĩa trang Thượng Đền.'
),
(
  '20000000-0000-0000-0000-000000000002',
  'Lê Thị Mùi',
  'female', 1923, 5, 15, 2002, 7, 15, 2002, 6, 6, TRUE, TRUE, 2, NULL,
  'Dâu trưởng đời 2',
  'Cụ bà đảm đang, phụ trách việc tế lễ họ nhiều năm, phúc hậu, thương yêu con cháu. Mộ tại Nghĩa trang Thượng Đền, Cổ Lễ.'
),
-- Nhánh Thứ Hai (Cụ Khoa)
(
  '20000000-0000-0000-0000-000000000003',
  'Nguyễn Mậu Khoa',
  'male', 1925, 8, 19, 2005, 12, 18, 2005, 11, 18, TRUE, FALSE, 2, 2,
  'Tự: Văn Bác',
  'Nhị nam Ngành 4. Nhà giáo dạy chữ Nho và chữ Quốc ngữ nhiều năm tại vùng Cổ Lễ, Trực Ninh. Học trò khắp vùng kính trọng về phẩm hạnh. Mộ tại Nghĩa trang Đồng Thượng, Cổ Lễ.'
),
(
  '20000000-0000-0000-0000-000000000004',
  'Phạm Thị Nhàn',
  'female', 1928, 11, 10, 2010, 10, 16, 2010, 9, 9, TRUE, TRUE, 2, NULL,
  'Dâu thứ đời 2',
  'Xuất thân gia đình Nho học Trực Ninh, mẫu mực lễ giáo, đức độ dịu hiền. Mộ tại Nghĩa trang Đồng Thượng, Cổ Lễ.'
),
-- Nhánh Thứ Ba (Bà Cô - Cụ Thanh)
(
  '20000000-0000-0000-0000-000000000005',
  'Nguyễn Thị Thanh',
  'female', 1929, 6, 25, 2015, 5, 21, 2015, 4, 4, TRUE, FALSE, 2, 3,
  'Trưởng nữ Ngành 4',
  'Lấy chồng về họ Vũ làng Cổ Lễ, vẹn tròn nghĩa vụ gia đình, luôn hướng về cội nguồn họ Nguyễn Mậu và hết lòng vì họ ngoại.'
),
(
  '20000000-0000-0000-0000-000000000006',
  'Vũ Đình Cường',
  'male', 1926, 3, 14, 1998, 2, 16, 1998, 1, 20, TRUE, TRUE, 2, NULL,
  'Rể họ Nguyễn Mậu',
  'Cán bộ ngành thương nghiệp huyện Trực Ninh. Mộ tại Nghĩa trang thị trấn Cổ Lễ.'
),
-- Nhánh Thứ Tư (Cụ Duẩn)
(
  '20000000-0000-0000-0000-000000000007',
  'Nguyễn Mậu Duẩn',
  'male', 1934, 10, 5, 2018, 8, 24, 2018, 7, 14, TRUE, FALSE, 2, 4,
  'Tự: Hữu Chí',
  'Tam nam Ngành 4. Cựu chiến binh, nguyên cán bộ Giao thông Vận tải Nam Hà. Sau về sinh sống tại thị trấn Cổ Lễ, tích cực tham gia ban khánh tiết Đền Thượng. Mộ tại Nghĩa trang Thượng Đền.'
),
(
  '20000000-0000-0000-0000-000000000008',
  'Hoàng Thị Thược',
  'female', 1938, 1, 12, 2021, 2, 9, 2020, 12, 28, TRUE, TRUE, 2, NULL,
  'Dâu út đời 2',
  'Hội viên Người cao tuổi gương mẫu thị trấn Cổ Lễ. Mộ tại Nghĩa trang Thượng Đền, Cổ Lễ.'
);

-- ============================================================
-- ĐỜI 3: THẾ HỆ KIẾN THIẾT & CÔNG TÁC
-- ============================================================
INSERT INTO persons (id, full_name, gender, birth_year, birth_month, birth_day, death_year, death_month, death_day, death_lunar_year, death_lunar_month, death_lunar_day, is_deceased, is_in_law, generation, birth_order, other_names, note)
VALUES
-- Con cụ Trọng & cụ Mùi
(
  '30000000-0000-0000-0000-000000000001',
  'Nguyễn Mậu Hùng',
  'male', 1948, 3, 10, 2020, 6, 28, 2020, 5, 8, TRUE, FALSE, 3, 1,
  'Bác Hùng - Trưởng tộc đời 3',
  'Trưởng nam chi trưởng đời 3. Kỹ sư cơ khí, nguyên trưởng tộc trông coi và duy trì nền nếp tế tự tại Từ đường Thôn Thượng Đền. Mộ tại Nghĩa trang Thượng Đền, Cổ Lễ.'
),
(
  '30000000-0000-0000-0000-000000000002',
  'Đỗ Thị Mai',
  'female', 1952, 7, 18, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 3, NULL,
  'Bác gái Mai',
  'Giáo viên tiểu học nghỉ hưu, hiện trông coi và phụng sự hương khói tại Từ đường họ Nguyễn Mậu Ngành 4 tại Thôn Thượng Đền.'
),
(
  '30000000-0000-0000-0000-000000000003',
  'Nguyễn Mậu Cường',
  'male', 1953, 9, 22, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 3, 2,
  'Bác Cường (Bác sĩ)',
  'Bác sĩ Quân y nghỉ hưu, nguyên Trưởng khoa Bệnh viện Quân y. Hiện định cư và sinh hoạt dòng họ tại TP. Nam Định.'
),
(
  '30000000-0000-0000-0000-000000000004',
  'Trịnh Thị Lan',
  'female', 1956, 12, 5, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 3, NULL,
  'Bác Lan',
  'Dược sĩ nghỉ hưu tại TP. Nam Định.'
),
(
  '30000000-0000-0000-0000-000000000005',
  'Nguyễn Thị Kim Dung',
  'female', 1958, 4, 15, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 3, 3,
  'Cô Dung',
  'Cán bộ ngành Ngân hàng nghỉ hưu, hiện sinh sống tại Hà Nội. Luôn tích cực đóng góp quỹ khuyến học dòng họ.'
),
(
  '30000000-0000-0000-0000-000000000006',
  'Bùi Văn Tuấn',
  'male', 1955, 6, 20, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 3, NULL,
  'Chú Tuấn',
  'Kỹ sư ngành Bưu điện nghỉ hưu tại Hà Nội.'
),

-- Con cụ Khoa & cụ Nhàn
(
  '30000000-0000-0000-0000-000000000007',
  'Nguyễn Mậu Thành',
  'male', 1954, 11, 2, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 3, 1,
  'Thầy giáo Thành',
  'Nhà giáo Ưu tú, nguyên Hiệu trưởng trường THPT tại Trực Ninh. Cố vấn lịch sử và biên tập phả ký dòng họ.'
),
(
  '30000000-0000-0000-0000-000000000008',
  'Nguyễn Thị Hạnh',
  'female', 1957, 8, 14, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 3, NULL,
  'Cô Hạnh (Giáo viên)',
  'Giáo viên dạy môn Ngữ văn trường cấp 3 nghỉ hưu.'
),
(
  '30000000-0000-0000-0000-000000000009',
  'Nguyễn Mậu Đạt',
  'male', 1960, 5, 28, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 3, 2,
  'Chú Đạt (Sài Gòn)',
  'Doanh nhân lĩnh vực Dệt may và Thương mại tại TP. Hồ Chí Minh. Thường niên tài trợ các hoạt động tu bổ từ đường họ.'
),
(
  '30000000-0000-0000-0000-000000000010',
  'Vũ Thị Ngọc',
  'female', 1963, 10, 19, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 3, NULL,
  'Thím Ngọc',
  'Quản lý doanh nghiệp gia đình tại TP. Hồ Chí Minh.'
),

-- Con cụ Duẩn & cụ Thược
(
  '30000000-0000-0000-0000-000000000011',
  'Nguyễn Mậu Thắng',
  'male', 1964, 1, 16, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 3, 1,
  'Chú Thắng (Kỹ sư)',
  'Kỹ sư Xây dựng Cầu đường, hiện công tác tại Tổng công ty Xây dựng Giao thông tại Hà Nội.'
),
(
  '30000000-0000-0000-0000-000000000012',
  'Trần Thu Hương',
  'female', 1968, 3, 25, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 3, NULL,
  'Thím Hương',
  'Công tác tại Viện Thiết kế Giao thông Vận tải Hà Nội.'
),
(
  '30000000-0000-0000-0000-000000000013',
  'Nguyễn Thị Lệ',
  'female', 1969, 7, 30, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 3, 2,
  'Cô Lệ',
  'Cán bộ Y tế tại Trung tâm Y tế huyện Trực Ninh, Nam Định.'
),
(
  '30000000-0000-0000-0000-000000000014',
  'Đinh Văn Hải',
  'male', 1966, 12, 10, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 3, NULL,
  'Chú Hải',
  'Cán bộ Viễn thông VNPT Trực Ninh, Nam Định.'
);

-- ============================================================
-- ĐỜI 4: THẾ HỆ TRƯỞNG THÀNH HIỆN NAY
-- ============================================================
INSERT INTO persons (id, full_name, gender, birth_year, birth_month, birth_day, death_year, death_month, death_day, death_lunar_year, death_lunar_month, death_lunar_day, is_deceased, is_in_law, generation, birth_order, other_names, note)
VALUES
-- Con bác Hùng & bác Mai
(
  '40000000-0000-0000-0000-000000000001',
  'Nguyễn Mậu Tuấn',
  'male', 1976, 4, 18, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 4, 1,
  'Trưởng tộc đương nhiệm',
  'Trưởng nam đời 4. Trưởng ban liên lạc dòng họ Nguyễn Mậu Ngành 4 tại Thôn Thượng Đền. Giám đốc Công ty Xây lắp & Thương mại tại Hà Nội và Nam Định.'
),
(
  '40000000-0000-0000-0000-000000000002',
  'Phạm Thị Hồng Hạnh',
  'female', 1979, 8, 22, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 4, NULL,
  'Chị Hạnh',
  'Thạc sĩ Kinh tế, Kế toán trưởng Tổng công ty tại Hà Nội.'
),
(
  '40000000-0000-0000-0000-000000000003',
  'Nguyễn Thị Bích Thủy',
  'female', 1981, 11, 9, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 4, 2,
  'Chị Thủy',
  'Giảng viên Khoa Kinh tế Trường Đại học Thương Mại Hà Nội.'
),
(
  '40000000-0000-0000-0000-000000000004',
  'Lê Hoàng Long',
  'male', 1980, 5, 14, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 4, NULL,
  'Anh Long',
  'Tiến sĩ Luật học, Trọng tài viên Thương mại tại Hà Nội.'
),
(
  '40000000-0000-0000-0000-000000000005',
  'Nguyễn Mậu Tùng',
  'male', 1986, 2, 26, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 4, 3,
  'Anh Tùng (IT)',
  'Kỹ sư Phần mềm & Giải pháp Cloud, phụ trách số hóa gia phả trực tuyến GiaPha-OS cho dòng họ.'
),
(
  '40000000-0000-0000-0000-000000000006',
  'Ngô Phương Linh',
  'female', 1989, 9, 12, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 4, NULL,
  'Chị Linh',
  'Chuyên gia Quản trị Nhân sự (HR Manager) tại Tập đoàn Công nghệ Hà Nội.'
),

-- Con bác Cường & bác Lan
(
  '40000000-0000-0000-0000-000000000007',
  'Nguyễn Mậu Minh',
  'male', 1982, 7, 3, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 4, 1,
  'Bác sĩ Minh',
  'Bác sĩ Ngoại khoa Bệnh viện Đa khoa Tỉnh Nam Định.'
),
(
  '40000000-0000-0000-0000-000000000008',
  'Hoàng Yến Nhi',
  'female', 1985, 3, 17, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 4, NULL,
  'Chị Nhi',
  'Bác sĩ Nhi khoa Bệnh viện Phụ sản Nam Định.'
),
(
  '40000000-0000-0000-0000-000000000009',
  'Nguyễn Thị Thùy Linh',
  'female', 1988, 10, 31, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 4, 2,
  'Chị Thùy Linh',
  'Dược sĩ, quản lý chuỗi nhà thuốc tại TP. Nam Định.'
),

-- Con thầy Thành & cô Hạnh
(
  '40000000-0000-0000-0000-000000000010',
  'Nguyễn Mậu Quang',
  'male', 1983, 12, 1, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 4, 1,
  'Kiến trúc sư Quang',
  'Thạc sĩ Kiến trúc sư, chủ trì thiết kế công trình dân dụng & tâm linh tại Hà Nội.'
),
(
  '40000000-0000-0000-0000-000000000011',
  'Đặng Thu Trang',
  'female', 1986, 6, 8, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 4, NULL,
  'Chị Trang',
  'Nhà thiết kế Nội thất tại Hà Nội.'
),
(
  '40000000-0000-0000-0000-000000000012',
  'Nguyễn Mậu Tiến',
  'male', 1987, 8, 19, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 4, 2,
  'Tiến sĩ Tiến',
  'Tiến sĩ Nông nghiệp Công nghệ cao, Giảng viên Học viện Nông nghiệp Việt Nam.'
),

-- Con chú Đạt & thím Ngọc (Sài Gòn)
(
  '40000000-0000-0000-0000-000000000013',
  'Nguyễn Mậu Đức',
  'male', 1990, 4, 25, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 4, 1,
  'Anh Đức (Sài Gòn)',
  'Giám đốc Kinh doanh Công ty Xuất nhập khẩu tại Quận 1, TP. Hồ Chí Minh.'
),
(
  '40000000-0000-0000-0000-000000000014',
  'Trương Kiều Oanh',
  'female', 1993, 11, 15, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, 4, NULL,
  'Chị Oanh',
  'Chuyên viên Quan hệ Khách hàng Ngân hàng Quốc tế tại TP.HCM.'
),

-- Con chú Thắng & thím Hương
(
  '40000000-0000-0000-0000-000000000015',
  'Nguyễn Mậu Hoàng',
  'male', 1994, 9, 7, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 4, 1,
  'Anh Hoàng',
  'Chuyên viên Phân tích Đầu tư Tài chính tại Hà Nội.'
);

-- ============================================================
-- ĐỜI 5: THẾ HỆ TRẺ (HẬU DUỆ MĂNG NON)
-- ============================================================
INSERT INTO persons (id, full_name, gender, birth_year, birth_month, birth_day, death_year, death_month, death_day, death_lunar_year, death_lunar_month, death_lunar_day, is_deceased, is_in_law, generation, birth_order, other_names, note)
VALUES
-- Con anh Tuấn & chị Hạnh
(
  '50000000-0000-0000-0000-000000000001',
  'Nguyễn Mậu Minh Khang',
  'male', 2004, 5, 20, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 5, 1,
  'Cháu Khang',
  'Sinh viên Khoa Khoa học Máy tính Đại học Bách Khoa Hà Nội, đạt giải Nhì Học sinh Giỏi Quốc gia Tin học.'
),
(
  '50000000-0000-0000-0000-000000000002',
  'Nguyễn Mậu Bảo An',
  'male', 2009, 10, 14, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 5, 2,
  'Cháu Bảo An',
  'Học sinh THPT Chuyên Hà Nội - Amsterdam.'
),

-- Con anh Tùng & chị Linh
(
  '50000000-0000-0000-0000-000000000003',
  'Nguyễn Mậu Đăng Khoa',
  'male', 2016, 6, 1, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 5, 1,
  'Bé Khoa',
  'Học sinh Tiểu học tại Cầu Giấy, Hà Nội.'
),
(
  '50000000-0000-0000-0000-000000000004',
  'Nguyễn Tuệ Mẫn',
  'female', 2020, 12, 18, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 5, 2,
  'Bé Mẫn',
  'Cháu gái út chi trưởng đời 5.'
),

-- Con bác sĩ Minh & chị Nhi
(
  '50000000-0000-0000-0000-000000000005',
  'Nguyễn Mậu Nhật Nam',
  'male', 2012, 3, 29, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 5, 1,
  'Cháu Nhật Nam',
  'Học sinh THCS Lê Hồng Phong, TP. Nam Định.'
),
(
  '50000000-0000-0000-0000-000000000006',
  'Nguyễn Thảo Nguyên',
  'female', 2015, 8, 8, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 5, 2,
  'Cháu Thảo Nguyên',
  'Học sinh Tiểu học tại TP. Nam Định.'
),

-- Con KTS Quang & chị Trang
(
  '50000000-0000-0000-0000-000000000007',
  'Nguyễn Mậu Gia Bảo',
  'male', 2014, 1, 15, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 5, 1,
  'Cháu Gia Bảo',
  'Học sinh Tiểu học tại Đống Đa, Hà Nội.'
),
(
  '50000000-0000-0000-0000-000000000008',
  'Nguyễn Ngọc Anh Thư',
  'female', 2018, 11, 23, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 5, 2,
  'Cháu Anh Thư',
  'Học sinh mầm non tại Hà Nội.'
),

-- Con anh Đức & chị Oanh (Sài Gòn)
(
  '50000000-0000-0000-0000-000000000009',
  'Nguyễn Mậu Thiên Phú',
  'male', 2021, 4, 30, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, FALSE, 5, 1,
  'Bé Thiên Phú',
  'Cháu nội nhánh Sài Gòn đời 5.'
);

-- ============================================================
-- THÔNG TIN RIÊNG TƯ (person_details_private)
-- ============================================================
INSERT INTO person_details_private (person_id, phone_number, occupation, current_residence)
VALUES
('30000000-0000-0000-0000-000000000002', '0912 345 001', 'Giáo viên nghỉ hưu - Trông coi từ đường', 'Thôn Thượng Đền, TT. Cổ Lễ, H. Trực Ninh, Nam Định'),
('30000000-0000-0000-0000-000000000003', '0913 456 002', 'Bác sĩ Quân y nghỉ hưu', 'Trần Hưng Đạo, TP. Nam Định'),
('30000000-0000-0000-0000-000000000007', '0915 678 003', 'Nhà giáo Ưu tú', 'Thị trấn Cổ Lễ, H. Trực Ninh, Nam Định'),
('30000000-0000-0000-0000-000000000009', '0903 890 004', 'Doanh nhân Dệt may', 'Quận 7, TP. Hồ Chí Minh'),
('30000000-0000-0000-0000-000000000011', '0988 123 005', 'Kỹ sư Xây dựng Giao thông', 'Thanh Xuân, Hà Nội'),
('40000000-0000-0000-0000-000000000001', '0918 888 444', 'Giám đốc Doanh nghiệp - Trưởng tộc', 'Cầu Giấy, Hà Nội & Thôn Thượng Đền, Cổ Lễ'),
('40000000-0000-0000-0000-000000000005', '0977 999 444', 'Kỹ sư Phần mềm (IT)', 'Hà Đông, Hà Nội'),
('40000000-0000-0000-0000-000000000007', '0916 222 333', 'Bác sĩ Ngoại khoa', 'TP. Nam Định'),
('40000000-0000-0000-0000-000000000010', '0904 555 666', 'Kiến trúc sư Trưởng', 'Đống Đa, Hà Nội'),
('40000000-0000-0000-0000-000000000013', '0908 777 888', 'Giám đốc Kinh doanh Xuất nhập khẩu', 'Thảo Điền, TP. Thủ Đức, TP.HCM');

-- ============================================================
-- QUAN HỆ HÔN NHÂN & HUYẾT THỐNG (relationships)
-- ============================================================

-- Đời 1: Hôn nhân
INSERT INTO relationships (type, person_a, person_b, note) VALUES
('marriage', '10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'Vợ chồng Cụ Khởi Tổ Ngành 4');

-- Đời 1 -> Đời 2: Cha Mẹ -> Con
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001'),
('biological_child', '10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001'),
('biological_child', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003'),
('biological_child', '10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003'),
('biological_child', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000005'),
('biological_child', '10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000005'),
('biological_child', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000007'),
('biological_child', '10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000007');

-- Đời 2: Hôn nhân
INSERT INTO relationships (type, person_a, person_b, note) VALUES
('marriage', '20000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'Cụ Trọng & Cụ Mùi (Nhánh Trưởng)'),
('marriage', '20000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000004', 'Cụ Khoa & Cụ Nhàn (Nhánh Hai)'),
('marriage', '20000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000006', 'Cụ Thanh & Cụ Cường (Làng Cổ Lễ)'),
('marriage', '20000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000008', 'Cụ Duẩn & Cụ Thược (Nhánh Ba)');

-- Đời 2 -> Đời 3: Nhánh Trưởng (Cụ Trọng & Cụ Mùi)
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001'),
('biological_child', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001'),
('biological_child', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003'),
('biological_child', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000003'),
('biological_child', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000005'),
('biological_child', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000005');

-- Đời 2 -> Đời 3: Nhánh Hai (Cụ Khoa & Cụ Nhàn)
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000007'),
('biological_child', '20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000007'),
('biological_child', '20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000009'),
('biological_child', '20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000009');

-- Đời 2 -> Đời 3: Nhánh Ba (Cụ Duẩn & Cụ Thược)
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '20000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000011'),
('biological_child', '20000000-0000-0000-0000-000000000008', '30000000-0000-0000-0000-000000000011'),
('biological_child', '20000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000013'),
('biological_child', '20000000-0000-0000-0000-000000000008', '30000000-0000-0000-0000-000000000013');

-- Đời 3: Hôn nhân
INSERT INTO relationships (type, person_a, person_b) VALUES
('marriage', '30000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002'),
('marriage', '30000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000004'),
('marriage', '30000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000006'),
('marriage', '30000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000008'),
('marriage', '30000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-000000000010'),
('marriage', '30000000-0000-0000-0000-000000000011', '30000000-0000-0000-0000-000000000012'),
('marriage', '30000000-0000-0000-0000-000000000013', '30000000-0000-0000-0000-000000000014');

-- Đời 3 -> Đời 4: Con Bác Hùng & Bác Mai
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001'),
('biological_child', '30000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001'),
('biological_child', '30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000003'),
('biological_child', '30000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000003'),
('biological_child', '30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000005'),
('biological_child', '30000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000005');

-- Đời 3 -> Đời 4: Con Bác Cường & Bác Lan
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '30000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000007'),
('biological_child', '30000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000007'),
('biological_child', '30000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000009'),
('biological_child', '30000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000009');

-- Đời 3 -> Đời 4: Con Thầy Thành & Cô Hạnh
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '30000000-0000-0000-0000-000000000007', '40000000-0000-0000-0000-000000000010'),
('biological_child', '30000000-0000-0000-0000-000000000008', '40000000-0000-0000-0000-000000000010'),
('biological_child', '30000000-0000-0000-0000-000000000007', '40000000-0000-0000-0000-000000000012'),
('biological_child', '30000000-0000-0000-0000-000000000008', '40000000-0000-0000-0000-000000000012');

-- Đời 3 -> Đời 4: Con Chú Đạt & Thím Ngọc
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '30000000-0000-0000-0000-000000000009', '40000000-0000-0000-0000-000000000013'),
('biological_child', '30000000-0000-0000-0000-000000000010', '40000000-0000-0000-0000-000000000013');

-- Đời 3 -> Đời 4: Con Chú Thắng & Thím Hương
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '30000000-0000-0000-0000-000000000011', '40000000-0000-0000-0000-000000000015'),
('biological_child', '30000000-0000-0000-0000-000000000012', '40000000-0000-0000-0000-000000000015');

-- Đời 4: Hôn nhân
INSERT INTO relationships (type, person_a, person_b) VALUES
('marriage', '40000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000002'),
('marriage', '40000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000004'),
('marriage', '40000000-0000-0000-0000-000000000005', '40000000-0000-0000-0000-000000000006'),
('marriage', '40000000-0000-0000-0000-000000000007', '40000000-0000-0000-0000-000000000008'),
('marriage', '40000000-0000-0000-0000-000000000010', '40000000-0000-0000-0000-000000000011'),
('marriage', '40000000-0000-0000-0000-000000000013', '40000000-0000-0000-0000-000000000014');

-- Đời 4 -> Đời 5: Con Anh Tuấn & Chị Hạnh
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '40000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001'),
('biological_child', '40000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000001'),
('biological_child', '40000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000002'),
('biological_child', '40000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000002');

-- Đời 4 -> Đời 5: Con Anh Tùng & Chị Linh
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '40000000-0000-0000-0000-000000000005', '50000000-0000-0000-0000-000000000003'),
('biological_child', '40000000-0000-0000-0000-000000000006', '50000000-0000-0000-0000-000000000003'),
('biological_child', '40000000-0000-0000-0000-000000000005', '50000000-0000-0000-0000-000000000004'),
('biological_child', '40000000-0000-0000-0000-000000000006', '50000000-0000-0000-0000-000000000004');

-- Đời 4 -> Đời 5: Con Bác sĩ Minh & Chị Nhi
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '40000000-0000-0000-0000-000000000007', '50000000-0000-0000-0000-000000000005'),
('biological_child', '40000000-0000-0000-0000-000000000008', '50000000-0000-0000-0000-000000000005'),
('biological_child', '40000000-0000-0000-0000-000000000007', '50000000-0000-0000-0000-000000000006'),
('biological_child', '40000000-0000-0000-0000-000000000008', '50000000-0000-0000-0000-000000000006');

-- Đời 4 -> Đời 5: Con KTS Quang & Chị Trang
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '40000000-0000-0000-0000-000000000010', '50000000-0000-0000-0000-000000000007'),
('biological_child', '40000000-0000-0000-0000-000000000011', '50000000-0000-0000-0000-000000000007'),
('biological_child', '40000000-0000-0000-0000-000000000010', '50000000-0000-0000-0000-000000000008'),
('biological_child', '40000000-0000-0000-0000-000000000011', '50000000-0000-0000-0000-000000000008');

-- Đời 4 -> Đời 5: Con Anh Đức & Chị Oanh (Sài Gòn)
INSERT INTO relationships (type, person_a, person_b) VALUES
('biological_child', '40000000-0000-0000-0000-000000000013', '50000000-0000-0000-0000-000000000009'),
('biological_child', '40000000-0000-0000-0000-000000000014', '50000000-0000-0000-0000-000000000009');

-- ============================================================
-- SỰ KIỆN DÒNG HỌ & KỴ NHẬT (custom_events)
-- ============================================================
INSERT INTO custom_events (id, name, content, event_date, location)
VALUES
(
  'e0000000-0000-0000-0000-000000000001',
  'Lễ Giỗ Cụ Khởi Tổ Nguyễn Mậu Phúc (Rằm tháng 8 Âm lịch)',
  'Lễ kỵ nhật thường niên của Cụ Khởi Tổ Ngành 4. Toàn thể con cháu các chi tập trung tế lễ tại Nhà thờ họ, báo công và sum họp gia tộc.',
  '2026-09-25',
  'Từ đường Họ Nguyễn Mậu Ngành 4, Thôn Thượng Đền, TT. Cổ Lễ, H. Trực Ninh, Nam Định'
),
(
  'e0000000-0000-0000-0000-000000000002',
  'Lễ Tế Xuân & Hội Đền Thượng - Chùa Cổ Lễ',
  'Tham gia đại lễ truyền thống tưởng nhớ Quốc sư Nguyễn Minh Không và các bậc tiền hiền khai hoang mở đất Cổ Lễ.',
  '2026-10-24',
  'Quần thể Di tích Chùa Cổ Lễ & Đền Thượng, TT. Cổ Lễ, H. Trực Ninh'
),
(
  'e0000000-0000-0000-0000-000000000003',
  'Lễ Tảo Mộ & Thanh Minh Dòng Tộc',
  'Con cháu nội ngoại tề tựu dâng hương, tu bổ, dọn dẹp các phần mộ tổ tiên tại Nghĩa trang Thượng Đền và Đồng Thượng.',
  '2026-04-05',
  'Khu lăng mộ dòng họ Nguyễn Mậu, Thôn Thượng Đền, Cổ Lễ'
),
(
  'e0000000-0000-0000-0000-000000000004',
  'Lễ Khuyến Học & Tuyên Dương Học Sinh - Sinh Viên Xuất Sắc',
  'Trao học bổng khuyến học dòng họ Nguyễn Mậu Ngành 4 cho các cháu đạt thành tích cao trong học tập, thi đỗ đại học và đạt giải thưởng các cấp.',
  '2026-02-15',
  'Nhà thờ họ Nguyễn Mậu Ngành 4, Thôn Thượng Đền, TT. Cổ Lễ'
);

-- ============================================================
-- HOÀN TẤT NẠP DỮ LIỆU GIA PHẢ HỌ NGUYỄN MẬU (NGÀNH 4)
-- Tổng số thành viên: 38 người (5 thế hệ)
-- Gồm: Đời 1 (2), Đời 2 (8), Đời 3 (14), Đời 4 (15), Đời 5 (9)
-- ============================================================
