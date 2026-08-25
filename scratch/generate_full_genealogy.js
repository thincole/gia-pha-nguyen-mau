const fs = require('fs');
const path = require('path');

// Helper to generate deterministic UUIDs for persons
function makeUUID(generation, branch, index, subIndex = 0) {
  const gStr = String(generation).padStart(2, '0');
  const bStr = String(branch).padStart(2, '0');
  const iStr = String(index).padStart(4, '0');
  const sStr = String(subIndex).padStart(4, '0');
  return `00000000-0000-${gStr}${bStr}-${iStr}-${sStr}00000000`;
}

// We will construct persons, relationships, private details, and custom events
const persons = [];
const relationships = [];
const personDetailsPrivate = [];
const customEvents = [];

function addPerson({
  id,
  full_name,
  gender = 'male',
  generation = 1,
  birth_order = null,
  is_in_law = false,
  is_deceased = false,
  birth_year = null,
  birth_month = null,
  birth_day = null,
  death_year = null,
  death_month = null,
  death_day = null,
  death_lunar_day = null,
  death_lunar_month = null,
  death_lunar_year = null,
  death_lunar_is_leap = false,
  note = '',
  phone = null,
  occupation = null,
  residence = null,
  private_notes = null,
}) {
  const p = {
    id,
    full_name,
    gender,
    generation,
    birth_order,
    is_in_law,
    is_deceased,
    birth_year,
    birth_month,
    birth_day,
    death_year,
    death_month,
    death_day,
    death_lunar_day,
    death_lunar_month,
    death_lunar_year,
    death_lunar_is_leap,
    note,
    avatar_url: null,
  };
  persons.push(p);

  if (phone || occupation || residence || private_notes) {
    personDetailsPrivate.push({
      person_id: id,
      phone,
      occupation,
      residence,
      notes: private_notes,
    });
  }
  return id;
}

let relCount = 1;
function addRel(person_a, person_b, type) {
  const id = `11111111-1111-1111-1111-${String(relCount++).padStart(12, '0')}`;
  relationships.push({ id, person_a, person_b, type });
}

function addMarriage(husbandId, wifeId) {
  addRel(husbandId, wifeId, 'marriage');
}

function addChild(parentId, childId, isAdopted = false) {
  addRel(parentId, childId, isAdopted ? 'adopted_child' : 'biological_child');
}

function addParentsChild(husbandId, wifeId, childId, isAdopted = false) {
  if (husbandId) addChild(husbandId, childId, isAdopted);
  if (wifeId) addChild(wifeId, childId, isAdopted);
}

// -----------------------------------------------------------------------------
// PHẦN 1: THƯỢNG PHẢ (ĐỜI 1 ĐẾN ĐỜI 18)
// -----------------------------------------------------------------------------
console.log('Generating Thuong Pha (Doi 1 -> 18)...');

// Đời 1: Nguyễn Bặc
const id_d1_bac = addPerson({
  id: makeUUID(1, 0, 1),
  full_name: 'Nguyễn Bặc',
  gender: 'male',
  generation: 1,
  birth_order: 1,
  birth_year: 904,
  death_year: 979,
  is_deceased: true,
  note: 'Khởi Tổ Nguyên Đương họ Nguyễn. Sinh năm Giáp Tý (904), mất năm Kỷ Mão (979), thọ 76 tuổi. Quê Đại Hữu, Đại Hoàng, Gia Viễn, Ninh Bình. Bạn cờ lau tam đồng với Đinh Bộ Lĩnh. Đại tướng số 1 dẹp loạn 12 sứ quân, Thừa tướng phụ Quốc Định Quốc Công. Triều Lý Thái Tổ truy phong Trung Liệt Đại Vương Thượng Đẳng Phúc Thần.',
});

// Đời 2: Nguyễn Đệ
const id_d2_de = addPerson({
  id: makeUUID(2, 0, 1),
  full_name: 'Nguyễn Đệ',
  gender: 'male',
  generation: 2,
  birth_order: 1,
  death_year: 1028,
  is_deceased: true,
  note: 'Con trưởng Tổ Bặc. Mất năm Mậu Thìn (1028). Triều Tiền Lê phong Điện Tiền đô chỉ huy Sứ. Triều Lý Thái Tổ phong Đô hiệu Điểm Tước hầu (1010-1028).',
});
addChild(id_d1_bac, id_d2_de);

const id_d2_dat = addPerson({
  id: makeUUID(2, 0, 2),
  full_name: 'Nguyễn Phúc Đạt',
  gender: 'male',
  generation: 2,
  birth_order: 2,
  is_deceased: true,
  note: 'Con thứ 2 của Khởi Tổ Nguyễn Bặc.',
});
addChild(id_d1_bac, id_d2_dat);

// Đời 3: Nguyễn Viễn (con Nguyễn Đệ)
const id_d3_vien = addPerson({
  id: makeUUID(3, 0, 1),
  full_name: 'Nguyễn Viễn',
  gender: 'male',
  generation: 3,
  birth_order: 2,
  is_deceased: true,
  note: 'Con trai thứ 2 của Tổ Nguyễn Đệ. Quan triều Lý Thánh Tông (1054-1071). Triều Lý Nhân Tông (1072-1127) được phong Tả tướng Quốc - Tham tri sự.',
});
addChild(id_d2_de, id_d3_vien);

const id_d3_loi = addPerson({
  id: makeUUID(3, 0, 2),
  full_name: 'Nguyễn Quang Lợi',
  gender: 'male',
  generation: 3,
  birth_order: 1,
  is_deceased: true,
  note: 'Con thứ nhất của Tổ Nguyễn Đệ.',
});
addChild(id_d2_de, id_d3_loi);

const id_d3_lich = addPerson({
  id: makeUUID(3, 0, 3),
  full_name: 'Nguyễn Phúc Lịch',
  gender: 'male',
  generation: 3,
  birth_order: 3,
  is_deceased: true,
  note: 'Con thứ 3 của Tổ Nguyễn Đệ.',
});
addChild(id_d2_de, id_d3_lich);

// Đời 4: Nguyễn Phụng
const id_d4_phung = addPerson({
  id: makeUUID(4, 0, 1),
  full_name: 'Nguyễn Phụng',
  gender: 'male',
  generation: 4,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai Tổ Viễn. Xuất thân Võ cử nhân, năm Ất Sửu (1145) triều Lý Anh Tông phong Tả đô đốc.',
});
addChild(id_d3_vien, id_d4_phung);

// Đời 5: Nguyễn Nộn
const id_d5_non = addPerson({
  id: makeUUID(5, 0, 1),
  full_name: 'Nguyễn Nộn',
  gender: 'male',
  generation: 5,
  birth_order: 1,
  death_year: 1229,
  is_deceased: true,
  note: 'Con trai Tổ Phụng. Văn võ kiêm toàn, tự xưng Đại Thắng Vương thời Lý Cao Tông. Năm Ất Dậu (1225) triều Trần phong Hoài Đạo Hiếu Vũ Vương, gả Công chúa Ngoan Thiềm. Mất năm Kỷ Sửu (1229). Đền thờ chính tại Phù Dực, Tiên Du, Bắc Ninh (gồm 72 đền thờ dọc sông Đuống đến Lục Đầu Giang).',
});
addChild(id_d4_phung, id_d5_non);

// Đời 6: Nguyễn Thế Tứ
const id_d6_tu = addPerson({
  id: makeUUID(6, 0, 1),
  full_name: 'Nguyễn Thế Tứ',
  gender: 'male',
  generation: 6,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trưởng Tổ Nguyễn Nộn. Làm tướng, được phong tước Đô Hiệu Điểm qua 3 triều vua Trần: Trần Thái Tông (1225-1257), Trần Thánh Tông (1258-1277), Trần Nhân Tông (1278-1292).',
});
addChild(id_d5_non, id_d6_tu);

// Đời 7: Nguyễn Nạp Hoà
const id_d7_naphoa = addPerson({
  id: makeUUID(7, 0, 1),
  full_name: 'Nguyễn Nạp Hoà',
  gender: 'male',
  generation: 7,
  birth_order: 1,
  death_year: 1377,
  is_deceased: true,
  note: 'Con cả Tổ Thế Tứ. Xuất thân Võ cử nhân triều Trần Minh Tông (1314-1328). Làm quan qua các triều Trần Minh Tông, Hiến Tông, Dụ Tông, Nghệ Tông, Duệ Tông. Được phong Bình Nam Đại tướng quân giúp vua đánh Chiêm Thành năm 1377.',
});
addChild(id_d6_tu, id_d7_naphoa);

// Đời 8: Nguyễn Công Luật
const id_d8_congluat = addPerson({
  id: makeUUID(8, 0, 1),
  full_name: 'Nguyễn Công Luật',
  gender: 'male',
  generation: 8,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trưởng Tổ Nạp Hoà. Làm quan triều Trần Duệ Tông đến Phế Đế, chức Hữu Hiệu Điểm (1378). Cai quản quân phủ Thiên Trường. Tự là Tiểu Luật.',
});
addChild(id_d7_naphoa, id_d8_congluat);

// Đời 9: Nguyễn Minh Du
const id_d9_minhdu = addPerson({
  id: makeUUID(9, 0, 1),
  full_name: 'Nguyễn Minh Du',
  gender: 'male',
  generation: 9,
  birth_order: 3,
  is_deceased: true,
  note: 'Con thứ 3 của Tổ Công Luật. Làm tướng quân chỉ huy quân Thiết Hổ triều Phế Đế Kiên Tân (1398-1399), trấn thủ Sơn Nam (Thái Bình, Nam Định) và Hải Dương. Được phong Thái phó.',
});
addChild(id_d8_congluat, id_d9_minhdu);

// Đời 10: Tổ Đời 10 (Thế hệ nối tiếp)
const id_d10 = addPerson({
  id: makeUUID(10, 0, 1),
  full_name: 'Nguyễn Phi Khanh',
  gender: 'male',
  generation: 10,
  birth_order: 1,
  birth_year: 1355,
  death_year: 1428,
  is_deceased: true,
  note: 'Thái học sinh thời Trần - Hồ, thân phụ Anh hùng dân tộc Nguyễn Trãi.',
});
addChild(id_d9_minhdu, id_d10);

// Đời 11: Nguyễn Trãi
const id_d11_trai = addPerson({
  id: makeUUID(11, 0, 1),
  full_name: 'Nguyễn Trãi',
  gender: 'male',
  generation: 11,
  birth_order: 1,
  birth_year: 1380,
  death_year: 1442,
  death_lunar_day: 16,
  death_lunar_month: 8,
  death_lunar_year: 1442,
  is_deceased: true,
  note: 'Tự Ức Trai, Danh nhân văn hóa thế giới UNESCO vinh danh (1380-1980). Khai quốc công thần triều Hậu Lê, Nhập nội Hành khiển, Tuyên phụng Đại phu, Huệ Quốc Công, Tế văn thần. Tác giả Bình Ngô Đại Cáo.',
});
addChild(id_d10, id_d11_trai);

const id_d11_man = addPerson({
  id: makeUUID(11, 0, 2),
  full_name: 'Phạm Thị Mẫn',
  gender: 'female',
  generation: 11,
  is_in_law: true,
  is_deceased: true,
  note: 'Vợ kế của cụ Nguyễn Trãi, thân mẫu của cụ Nguyễn Anh Võ (Anh Vũ). Từng lánh nạn tại Gia Miêu, Sơn Động, Thanh Hoá.',
});
addMarriage(id_d11_trai, id_d11_man);

// Đời 12: Nguyễn Anh Võ (Nguyễn Anh Vũ)
const id_d12_anhvo = addPerson({
  id: makeUUID(12, 0, 1),
  full_name: 'Nguyễn Anh Võ (Nguyễn Anh Vũ)',
  gender: 'male',
  generation: 12,
  birth_order: 6,
  birth_year: 1442,
  is_deceased: true,
  note: 'Tự Tùng Hạc, hiệu Phúc Sơ. Con trai thứ 6 của cụ Nguyễn Trãi và bà Phạm Thị Mẫn. Năm Quang Thuận thứ 5 (1464) vua Lê Thánh Tông minh oan, nhận ấn phong Tri châu và 100 mẫu ruộng lộc điền.',
});
addParentsChild(id_d11_trai, id_d11_man, id_d12_anhvo);

// Đời 13: Nguyễn Giám
const id_d13_giam = addPerson({
  id: makeUUID(13, 0, 1),
  full_name: 'Nguyễn Giám',
  gender: 'male',
  generation: 13,
  birth_order: 2,
  is_deceased: true,
  note: 'Tự Giác Hiền. Con thứ 2 của Tổ Anh Võ. Đỗ quan Khảo trường Quốc Tử Giám triều Lê Hiến Tông năm Giáp Tý (1504).',
});
addChild(id_d12_anhvo, id_d13_giam);

// Đời 14: Nguyễn Mậu Trực
const id_d14_truc = addPerson({
  id: makeUUID(14, 0, 1),
  full_name: 'Nguyễn Mậu Trực',
  gender: 'male',
  generation: 14,
  birth_order: 1,
  is_deceased: true,
  note: 'Tự Phúc Văn. Con trai Tổ Giác Hiền. Đỗ Tiến sĩ quan trường khảo triều Mạc - Quang Hoà thứ 6 năm Bính Ngọ (1546).',
});
addChild(id_d13_giam, id_d14_truc);

// Đời 15: Nguyễn Trung
const id_d15_trung = addPerson({
  id: makeUUID(15, 0, 1),
  full_name: 'Nguyễn Trung',
  gender: 'male',
  generation: 15,
  birth_order: 4,
  is_deceased: true,
  note: 'Tự Phúc Hiếu. Con trai thứ 4 của Tổ Nguyễn Mậu Trực. Đỗ Tiến sĩ năm Quý Tỵ (1593) triều Lê.',
});
addChild(id_d14_truc, id_d15_trung);

// Đời 16: Nguyễn Mậu Kiên
const id_d16_kien = addPerson({
  id: makeUUID(16, 0, 1),
  full_name: 'Nguyễn Mậu Kiên',
  gender: 'male',
  generation: 16,
  birth_order: 1,
  is_deceased: true,
  note: 'Tự Phúc Hoà. Con trai Tổ Phúc Hiếu. Đỗ Tiến sĩ năm Bính Thìn (1619) triều Lê Thần Tông. Dạy học trong thành nội.',
});
addChild(id_d15_trung, id_d16_kien);

// Đời 17: Nguyễn Đăng
const id_d17_dang = addPerson({
  id: makeUUID(17, 0, 1),
  full_name: 'Nguyễn Đăng',
  gender: 'male',
  generation: 17,
  birth_order: 1,
  is_deceased: true,
  note: 'Tự Phúc Khải. Con trai Tổ Mậu Kiên. Đỗ Tiến sĩ năm Bính Tý (1639) triều Lê Kính Tông.',
});
addChild(id_d16_kien, id_d17_dang);

// Đời 18: Nguyễn Mậu Tài
const id_d18_tai = addPerson({
  id: makeUUID(18, 0, 1),
  full_name: 'Nguyễn Mậu Tài',
  gender: 'male',
  generation: 18,
  birth_order: 5,
  is_deceased: true,
  note: 'Tự Mậu Tú, hiệu Phúc Thành / Viết Trai tiên sinh. Con thứ 5 của Tổ Nguyễn Đăng. Phó Đô ngự sử, Chánh sứ sang nhà Thanh (1673), Thượng thư Bộ Hình (1675), Thượng thư Bộ Binh (1676). Năm 1680 đem quân về dẹp loạn biển Thiên Trường rồi kết duyên với bà Lê Thị Tiểu Thư.',
});
addChild(id_d17_dang, id_d18_tai);

const id_d18_le = addPerson({
  id: makeUUID(18, 0, 2),
  full_name: 'Lê Thị (Tiểu Thư)',
  gender: 'female',
  generation: 18,
  is_in_law: true,
  is_deceased: true,
  note: 'Thứ thiếp tam thứ của Thượng thư Nguyễn Mậu Tài. Thân mẫu của cụ Nguyễn Mậu Thái (Phúc Hội) - Thủy Tổ dòng họ Nguyễn Mậu tại Cổ Lễ.',
});
addMarriage(id_d18_tai, id_d18_le);

// -----------------------------------------------------------------------------
// PHẦN 2: TRUNG PHẢ (CỘI NGUỒN TẠI CỔ LỄ - ĐỜI 19 ĐẾN ĐỜI 28)
// -----------------------------------------------------------------------------
console.log('Generating Trung Pha (Doi 19 -> 28)...');

// ĐỜI 19 (ĐỜI 1 MẬU TỘC TẠI CỔ LỄ - THỦY TỔ)
const id_d19_thai = addPerson({
  id: makeUUID(19, 0, 1),
  full_name: 'Nguyễn Mậu Thái (Tự Phúc Hội)',
  gender: 'male',
  generation: 19,
  birth_order: 6,
  death_lunar_day: 5,
  death_lunar_month: 6,
  is_deceased: true,
  note: 'THỦY TỔ NGUYỄN MẬU TỘC tại Mặt Lãng Thượng (Thôn Thượng Đền, Cổ Lễ, Trực Ninh, Nam Định) năm Nhâm Tuất (1682). Con thứ 6 của Thượng thư Nguyễn Mậu Tài. Triều Lê phong tước Hậu Thần. Kỵ nhật ngày mồng 5 tháng 6 Âm lịch.',
});
addParentsChild(id_d18_tai, id_d18_le, id_d19_thai);

const id_d19_ai = addPerson({
  id: makeUUID(19, 0, 2),
  full_name: 'Nguyễn Thị Ái',
  gender: 'female',
  generation: 19,
  is_in_law: true,
  death_lunar_day: 16,
  death_lunar_month: 2,
  is_deceased: true,
  note: 'Chính thất của Thủy Tổ Nguyễn Mậu Thái (Phúc Hội). Kỵ nhật ngày 16 tháng 2 Âm lịch.',
});
addMarriage(id_d19_thai, id_d19_ai);

// ĐỜI 20 (ĐỜI 2 MẬU TỘC - 4 NGÀNH CHÍNH)
// 1. Ngành Nhất: Nguyễn Mậu Trường (Phúc Tiên)
const id_d20_truong = addPerson({
  id: makeUUID(20, 1, 1),
  full_name: 'Nguyễn Mậu Trường (Tự Phúc Tiên)',
  gender: 'male',
  generation: 20,
  birth_order: 1,
  death_lunar_day: 1,
  death_lunar_month: 10,
  is_deceased: true,
  note: 'Tổ Khởi Lập NGÀNH NHẤT. Triều Lê - Hiến Vương Công Chúa phong chức Hậu Thần. Kỵ nhật ngày mồng 1 tháng 10 Âm lịch.',
});
addParentsChild(id_d19_thai, id_d19_ai, id_d20_truong);

const id_d20_truong_ba = addPerson({
  id: makeUUID(20, 1, 2),
  full_name: 'Nguyễn Thị Trường',
  gender: 'female',
  generation: 20,
  is_in_law: true,
  death_lunar_day: 1,
  death_lunar_month: 10,
  is_deceased: true,
  note: 'Tổ bà Ngành Nhất, kỵ nhật ngày mồng 1 tháng 10 Âm lịch.',
});
addMarriage(id_d20_truong, id_d20_truong_ba);

// 2. Ngành Nhị: Nguyễn Mậu Rong (Phúc Khoán)
const id_d20_rong = addPerson({
  id: makeUUID(20, 2, 1),
  full_name: 'Nguyễn Mậu Rong (Tự Phúc Khoán)',
  gender: 'male',
  generation: 20,
  birth_order: 2,
  death_lunar_day: 14,
  death_lunar_month: 3,
  is_deceased: true,
  note: 'Tổ Khởi Lập NGÀNH NHỊ. Triều Lê phong chức Hậu Thần. Kỵ nhật ngày 14 tháng 3 Âm lịch.',
});
addParentsChild(id_d19_thai, id_d19_ai, id_d20_rong);

const id_d20_rong_ba = addPerson({
  id: makeUUID(20, 2, 2),
  full_name: 'Nguyễn Thị Rong',
  gender: 'female',
  generation: 20,
  is_in_law: true,
  death_lunar_day: 30,
  death_lunar_month: 12,
  is_deceased: true,
  note: 'Tổ bà Ngành Nhị, kỵ nhật ngày 30 tháng Chạp Âm lịch.',
});
addMarriage(id_d20_rong, id_d20_rong_ba);

// 3. Ngành Ba: Nguyễn Mậu Thiêm (Pháp Uyên)
const id_d20_thiem = addPerson({
  id: makeUUID(20, 3, 1),
  full_name: 'Nguyễn Mậu Thiêm (Tự Pháp Uyên)',
  gender: 'male',
  generation: 20,
  birth_order: 3,
  death_lunar_day: 30,
  death_lunar_month: 9,
  is_deceased: true,
  note: 'Tổ Khởi Lập NGÀNH BA. Triều Lê phong chức Hậu Thần. Kỵ nhật ngày 30 tháng 9 Âm lịch.',
});
addParentsChild(id_d19_thai, id_d19_ai, id_d20_thiem);

const id_d20_thiem_ba = addPerson({
  id: makeUUID(20, 3, 2),
  full_name: 'Nguyễn Thị Viên',
  gender: 'female',
  generation: 20,
  is_in_law: true,
  death_lunar_day: 15,
  death_lunar_month: 7,
  is_deceased: true,
  note: 'Tổ bà Ngành Ba, kỵ nhật ngày 15 tháng 7 Âm lịch.',
});
addMarriage(id_d20_thiem, id_d20_thiem_ba);

// 4. Ngành Tư: Nguyễn Mậu Hoàn (Tướng Công Tuấn Thông / Viết Nghĩa)
const id_d20_hoan = addPerson({
  id: makeUUID(20, 4, 1),
  full_name: 'Nguyễn Mậu Hoàn (Tướng Công Tuấn Thông)',
  gender: 'male',
  generation: 20,
  birth_order: 4,
  birth_year: 1728,
  death_year: 1780,
  death_lunar_day: 12,
  death_lunar_month: 1,
  death_lunar_year: 1780,
  is_deceased: true,
  note: 'Tổ Khởi Lập NGÀNH TƯ (Ngành 4). Sinh năm Mậu Thân (1728), mất năm Canh Tý (1780), thọ 53 tuổi. Tự Tuấn Thông / Tuấn Hoàn, hiệu Viết Nghĩa / Viết Mẫn tiên sinh. Tri huyện Mỹ Lộc, thăng Tá lang, Tri phủ Thiên Trường dũng phủ quân. Vua phong Tướng công, ban 100 mẫu ruộng cho con cháu và dân làng cúng tế. Kỵ nhật ngày 12 tháng Giêng Âm lịch.',
});
addParentsChild(id_d19_thai, id_d19_ai, id_d20_hoan);

const id_d20_hoan_ba = addPerson({
  id: makeUUID(20, 4, 2),
  full_name: 'Tổ Bà Ngành Tư (Vợ Tướng Công)',
  gender: 'female',
  generation: 20,
  is_in_law: true,
  death_lunar_day: 14,
  death_lunar_month: 3,
  is_deceased: true,
  note: 'Tổ bà Ngành Tư, kỵ nhật ngày 14 tháng 3 Âm lịch.',
});
addMarriage(id_d20_hoan, id_d20_hoan_ba);

// -----------------------------------------------------------------------------
// ĐỜI 21 (ĐỜI 3 MẬU TỘC / HÀNG TÔN)
// -----------------------------------------------------------------------------
// Ngành 1 - Đời 21
const id_d21_khai = addPerson({
  id: makeUUID(21, 1, 1),
  full_name: 'Nguyễn Mậu Khải',
  gender: 'male',
  generation: 21,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai Tổ Phúc Tiên (Ngành Nhất).',
});
addParentsChild(id_d20_truong, id_d20_truong_ba, id_d21_khai);

const id_d21_khai_ba = addPerson({
  id: makeUUID(21, 1, 2),
  full_name: 'Nguyễn Thị Khải',
  gender: 'female',
  generation: 21,
  is_in_law: true,
  is_deceased: true,
  note: 'Vợ cụ Nguyễn Mậu Khải.',
});
addMarriage(id_d21_khai, id_d21_khai_ba);

// Ngành 2 - Đời 21
const id_d21_oai = addPerson({
  id: makeUUID(21, 2, 1),
  full_name: 'Nguyễn Mậu Oai',
  gender: 'male',
  generation: 21,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai trưởng Tổ Phúc Khoán (Ngành Nhị).',
});
addParentsChild(id_d20_rong, id_d20_rong_ba, id_d21_oai);

const id_d21_luc = addPerson({
  id: makeUUID(21, 2, 2),
  full_name: 'Nguyễn Mậu Lực',
  gender: 'male',
  generation: 21,
  birth_order: 2,
  is_deceased: true,
  note: 'Con trai thứ 2 Tổ Phúc Khoán (Ngành Nhị).',
});
addParentsChild(id_d20_rong, id_d20_rong_ba, id_d21_luc);

const id_d21_giam = addPerson({
  id: makeUUID(21, 2, 3),
  full_name: 'Nguyễn Mậu Giám',
  gender: 'male',
  generation: 21,
  birth_order: 3,
  death_lunar_day: 3,
  death_lunar_month: 11,
  is_deceased: true,
  note: 'Con trai thứ 3 Tổ Phúc Khoán (Ngành Nhị). Kỵ nhật ngày 3 tháng 11 Âm lịch.',
});
addParentsChild(id_d20_rong, id_d20_rong_ba, id_d21_giam);

const id_d21_giam_ba = addPerson({
  id: makeUUID(21, 2, 4),
  full_name: 'Nguyễn Thị Giám',
  gender: 'female',
  generation: 21,
  is_in_law: true,
  death_lunar_day: 3,
  death_lunar_month: 12,
  is_deceased: true,
  note: 'Vợ cụ Nguyễn Mậu Giám. Kỵ nhật ngày 3 tháng 12 Âm lịch.',
});
addMarriage(id_d21_giam, id_d21_giam_ba);

// Ngành 3 - Đời 21
const id_d21_me = addPerson({
  id: makeUUID(21, 3, 1),
  full_name: 'Nguyễn Mậu Mễ',
  gender: 'male',
  generation: 21,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trưởng Tổ Pháp Uyên (Ngành Ba).',
});
addParentsChild(id_d20_thiem, id_d20_thiem_ba, id_d21_me);

const id_d21_lang = addPerson({
  id: makeUUID(21, 3, 2),
  full_name: 'Nguyễn Mậu Lang',
  gender: 'male',
  generation: 21,
  birth_order: 2,
  is_deceased: true,
  note: 'Con thứ 2 Tổ Pháp Uyên (Ngành Ba).',
});
addParentsChild(id_d20_thiem, id_d20_thiem_ba, id_d21_lang);

const id_d21_dieu = addPerson({
  id: makeUUID(21, 3, 3),
  full_name: 'Nguyễn Mậu Điêu',
  gender: 'male',
  generation: 21,
  birth_order: 3,
  is_deceased: true,
  note: 'Dưỡng tử Tổ Pháp Uyên (Ngành Ba). Sinh cụ Hạc -> cụ Kho -> cụ bà Nguyễn Thị Khe (1906).',
});
addChild(id_d20_thiem, id_d21_dieu, true);

// Ngành 4 - Đời 21
const id_d21_khoan = addPerson({
  id: makeUUID(21, 4, 1),
  full_name: 'Nguyễn Mậu Khoan (Cụ Cử Khoan)',
  gender: 'male',
  generation: 21,
  birth_order: 1,
  death_lunar_day: 15,
  death_lunar_month: 8,
  is_deceased: true,
  note: 'Con trưởng Tổ Tướng Công Tuấn Hoàn (Ngành 4). Đỗ Cử nhân, làm văn thư phủ Thiên Trường. Đời thường gọi là cụ Cử Khoan. Kỵ nhật ngày 15 tháng 8 Âm lịch (đồng giỗ với Cụ Bà).',
});
addParentsChild(id_d20_hoan, id_d20_hoan_ba, id_d21_khoan);

const id_d21_khoan_ba = addPerson({
  id: makeUUID(21, 4, 2),
  full_name: 'Nguyễn Thị Khoan',
  gender: 'female',
  generation: 21,
  is_in_law: true,
  death_lunar_day: 15,
  death_lunar_month: 8,
  is_deceased: true,
  note: 'Vợ cụ Cử Khoan. Đồng giỗ với chồng ngày 15 tháng 8 Âm lịch.',
});
addMarriage(id_d21_khoan, id_d21_khoan_ba);

const id_d21_giao = addPerson({
  id: makeUUID(21, 4, 3),
  full_name: 'Nguyễn Mậu Giáo',
  gender: 'male',
  generation: 21,
  birth_order: 2,
  death_lunar_day: 24,
  death_lunar_month: 6,
  is_deceased: true,
  note: 'Con thứ 2 Tổ Tướng Công Tuấn Hoàn (Ngành 4). Kỵ nhật ngày 24 tháng 6 Âm lịch.',
});
addParentsChild(id_d20_hoan, id_d20_hoan_ba, id_d21_giao);

const id_d21_hoi = addPerson({
  id: makeUUID(21, 4, 4),
  full_name: 'Nguyễn Mậu Hợi',
  gender: 'male',
  generation: 21,
  birth_order: 3,
  is_deceased: true,
  note: 'Con thứ 3 Tổ Tướng Công Tuấn Hoàn (Ngành 4). Sinh 3 con: Mậu Lĩnh, Mậu Thuần, Mậu Tợi.',
});
addParentsChild(id_d20_hoan, id_d20_hoan_ba, id_d21_hoi);

const id_d21_bon = addPerson({
  id: makeUUID(21, 4, 5),
  full_name: 'Nguyễn Mậu Bốn (Tuần Bốn)',
  gender: 'male',
  generation: 21,
  birth_order: 4,
  is_deceased: true,
  note: 'Con nuôi Tổ Tuấn Hoàn. Thi Hương, thi Hội đều đỗ đạt, làm quan Tuần phủ. Sinh cụ Đội Giang (Mậu Giang).',
});
addChild(id_d20_hoan, id_d21_bon, true);

const id_d21_cuchoa = addPerson({
  id: makeUUID(21, 4, 6),
  full_name: 'Nguyễn Thị Cúc Hoa',
  gender: 'female',
  generation: 21,
  birth_order: 5,
  death_lunar_day: 27,
  death_lunar_month: 2,
  is_deceased: true,
  note: 'Con gái Tổ Tuấn Hoàn, mất sớm khi còn nhỏ. Đồng giỗ với bà cô Ngọc Hoa ngày 27/02 Âm lịch.',
});
addParentsChild(id_d20_hoan, id_d20_hoan_ba, id_d21_cuchoa);

const id_d21_ngochoa = addPerson({
  id: makeUUID(21, 4, 7),
  full_name: 'Nguyễn Thị Ngọc Hoa',
  gender: 'female',
  generation: 21,
  birth_order: 6,
  death_lunar_day: 27,
  death_lunar_month: 2,
  is_deceased: true,
  note: 'Con gái Tổ Tuấn Hoàn, mất sớm khi còn nhỏ. Đồng giỗ ngày 27/02 Âm lịch.',
});
addParentsChild(id_d20_hoan, id_d20_hoan_ba, id_d21_ngochoa);

// -----------------------------------------------------------------------------
// ĐỜI 22 (ĐỜI 4 MẬU TỘC / ĐỆ TAM TỘC)
// -----------------------------------------------------------------------------
// Ngành 1
const id_d22_ngoi = addPerson({
  id: makeUUID(22, 1, 1),
  full_name: 'Nguyễn Mậu Ngợi',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai cụ Mậu Khải (Ngành 1). Sinh cụ Mậu Thân và cụ Mậu Hỗ.',
});
addParentsChild(id_d21_khai, id_d21_khai_ba, id_d22_ngoi);

// Ngành 2
const id_d22_sang = addPerson({
  id: makeUUID(22, 2, 1),
  full_name: 'Nguyễn Mậu Sảng',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai cụ Mậu Oai (Ngành 2). Sinh 4 con: Mậu Sáng, Mậu Lung, Mậu Khoát, Mậu Ngưng.',
});
addChild(id_d21_oai, id_d22_sang);

const id_d22_thoa = addPerson({
  id: makeUUID(22, 2, 2),
  full_name: 'Nguyễn Mậu Thoa',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai cụ Mậu Lực (Ngành 2). Sinh cụ Mậu Thuyết.',
});
addChild(id_d21_luc, id_d22_thoa);

const id_d22_thap = addPerson({
  id: makeUUID(22, 2, 3),
  full_name: 'Nguyễn Mậu Thập',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai thứ 1 cụ Mậu Giám (Ngành 2). Sinh cụ Mậu Châu.',
});
addParentsChild(id_d21_giam, id_d21_giam_ba, id_d22_thap);

const id_d22_thu = addPerson({
  id: makeUUID(22, 2, 4),
  full_name: 'Nguyễn Mậu Thử',
  gender: 'male',
  generation: 22,
  birth_order: 2,
  is_deceased: true,
  note: 'Con trai thứ 2 cụ Mậu Giám (Ngành 2). Sinh cụ Mậu Đối, cụ Mậu Hiếu, cụ Mậu Tỵ.',
});
addParentsChild(id_d21_giam, id_d21_giam_ba, id_d22_thu);

const id_d22_tam = addPerson({
  id: makeUUID(22, 2, 5),
  full_name: 'Nguyễn Mậu Tam',
  gender: 'male',
  generation: 22,
  birth_order: 3,
  is_deceased: true,
  note: 'Con trai thứ 3 cụ Mậu Giám (Ngành 2). Sinh cụ Mậu Thất.',
});
addParentsChild(id_d21_giam, id_d21_giam_ba, id_d22_tam);

// Ngành 3
const id_d22_gia = addPerson({
  id: makeUUID(22, 3, 1),
  full_name: 'Nguyễn Mậu Giá',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai cụ Mậu Mễ (Ngành 3). Sinh cụ Mậu Hanh, cụ Mậu Từ, cụ Mậu Côi, cụ Mậu Đỏ.',
});
addChild(id_d21_me, id_d22_gia);

const id_d22_giang = addPerson({
  id: makeUUID(22, 3, 2),
  full_name: 'Nguyễn Mậu Giảng',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai cụ Mậu Lang (Ngành 3). Sinh cụ Mậu Tố và các con gái.',
});
addChild(id_d21_lang, id_d22_giang);

// Ngành 4
const id_d22_men = addPerson({
  id: makeUUID(22, 4, 1),
  full_name: 'Nguyễn Mậu Mền',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai cụ Cử Khoan (Ngành 4). Sinh cụ Hương Ngung (Mậu Ngung).',
});
addParentsChild(id_d21_khoan, id_d21_khoan_ba, id_d22_men);

const id_d22_viem = addPerson({
  id: makeUUID(22, 4, 2),
  full_name: 'Nguyễn Mậu Việm',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai thứ 1 cụ Mậu Giáo (Ngành 4). Sinh cụ Mậu Kiền và cụ Mậu Lễ.',
});
addChild(id_d21_giao, id_d22_viem);

const id_d22_tu = addPerson({
  id: makeUUID(22, 4, 3),
  full_name: 'Nguyễn Mậu Tự',
  gender: 'male',
  generation: 22,
  birth_order: 2,
  is_deceased: true,
  note: 'Con trai thứ 2 cụ Mậu Giáo (Ngành 4). Nuôi cụ Mậu Chanh.',
});
addChild(id_d21_giao, id_d22_tu);

const id_d22_tac = addPerson({
  id: makeUUID(22, 4, 4),
  full_name: 'Nguyễn Mậu Tạc',
  gender: 'male',
  generation: 22,
  birth_order: 3,
  death_lunar_day: 27,
  death_lunar_month: 3,
  is_deceased: true,
  note: 'Con trai thứ 3 cụ Mậu Giáo (Ngành 4). Mất ngày 27/03 Âm lịch, thọ 49 tuổi. Vợ là cụ Nguyễn Thị Bòng (giỗ 23/3). Sinh cụ Mậu Yêng.',
});
addChild(id_d21_giao, id_d22_tac);

const id_d22_tac_ba = addPerson({
  id: makeUUID(22, 4, 5),
  full_name: 'Nguyễn Thị Bòng',
  gender: 'female',
  generation: 22,
  is_in_law: true,
  death_lunar_day: 23,
  death_lunar_month: 3,
  is_deceased: true,
  note: 'Vợ cụ Nguyễn Mậu Tạc. Giỗ ngày 23 tháng 3 Âm lịch.',
});
addMarriage(id_d22_tac, id_d22_tac_ba);

const id_d22_linh = addPerson({
  id: makeUUID(22, 4, 6),
  full_name: 'Nguyễn Mậu Lĩnh',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  death_lunar_day: 14,
  death_lunar_month: 11,
  is_deceased: true,
  note: 'Con trai trưởng cụ Mậu Hợi (Ngành 4). Giỗ ngày 14 tháng 11 Âm lịch (đồng giỗ với cụ bà Nguyễn Thị Là). Sinh cụ Mậu Thống, cụ Mậu Khả, cụ bà Thị Tụng.',
});
addChild(id_d21_hoi, id_d22_linh);

const id_d22_thuan = addPerson({
  id: makeUUID(22, 4, 7),
  full_name: 'Nguyễn Mậu Thuần',
  gender: 'male',
  generation: 22,
  birth_order: 2,
  is_deceased: true,
  note: 'Con thứ 2 cụ Mậu Hợi (Ngành 4). Sinh cụ Mậu Đồng, cụ Mậu Tỵ.',
});
addChild(id_d21_hoi, id_d22_thuan);

const id_d22_toi = addPerson({
  id: makeUUID(22, 4, 8),
  full_name: 'Nguyễn Mậu Tợi',
  gender: 'male',
  generation: 22,
  birth_order: 3,
  death_lunar_day: 9,
  death_lunar_month: 5,
  is_deceased: true,
  note: 'Con thứ 3 cụ Mậu Hợi (Ngành 4). Giỗ ngày 9 tháng 5 Âm lịch. Vợ Nguyễn Thị Tợi giỗ 26/6. Sinh cụ Mậu Tiến, cụ Mậu Hinh.',
});
addChild(id_d21_hoi, id_d22_toi);

const id_d22_doi_giang = addPerson({
  id: makeUUID(22, 4, 9),
  full_name: 'Nguyễn Mậu Giang (Cụ Đội Giang)',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  death_lunar_day: 26,
  death_lunar_month: 2,
  is_deceased: true,
  note: 'Con trai cụ Tuần Bốn (Ngành 4). Chánh suất đội triều Nguyễn. Giỗ 26/02 Âm lịch. Vợ là Nguyễn Thị Lý (Nhí) giỗ 12 tháng Chạp. Sinh cụ Mậu Vinh, cụ bà Thị Mùi.',
});
addChild(id_d21_bon, id_d22_doi_giang);

// -----------------------------------------------------------------------------
// ĐỜI 23 (ĐỜI 5 MẬU TỘC / ĐỆ TỨ TỘC)
// -----------------------------------------------------------------------------
// Ngành 4 - Nhánh cụ Mậu Mền -> Cụ Hương Ngung
const id_d23_ngung = addPerson({
  id: makeUUID(23, 4, 1),
  full_name: 'Nguyễn Mậu Ngung (Cụ Hương Ngung)',
  gender: 'male',
  generation: 23,
  birth_order: 1,
  death_lunar_day: 4,
  death_lunar_month: 4,
  is_deceased: true,
  note: 'Con trai cụ Mậu Mền (Ngành 4). Giữ chức Hương hội nên gọi là cụ Hương Ngung. Giỗ 4/4 Âm lịch. Vợ là Nguyễn Thị Kiêm giỗ 20/6 Âm lịch.',
});
addChild(id_d22_men, id_d23_ngung);

const id_d23_ngung_ba = addPerson({
  id: makeUUID(23, 4, 2),
  full_name: 'Nguyễn Thị Kiêm',
  gender: 'female',
  generation: 23,
  is_in_law: true,
  death_lunar_day: 20,
  death_lunar_month: 6,
  is_deceased: true,
  note: 'Vợ cụ Hương Ngung. Giỗ ngày 20 tháng 6 Âm lịch.',
});
addMarriage(id_d23_ngung, id_d23_ngung_ba);

// Ngành 4 - Nhánh cụ Mậu Tạc -> Cụ Mậu Yêng
const id_d23_yeng = addPerson({
  id: makeUUID(23, 4, 3),
  full_name: 'Nguyễn Mậu Yêng',
  gender: 'male',
  generation: 23,
  birth_order: 1,
  birth_year: 1850,
  death_year: 1912,
  death_day: 13,
  death_month: 5,
  death_lunar_day: 17,
  death_lunar_month: 4,
  death_lunar_year: 1912,
  is_deceased: true,
  note: 'Con trai cụ Mậu Tạc (Ngành 4). Sinh Canh Tuất 1850, mất 17/4 Nhâm Tý (13/5/1912), thọ 53 tuổi. Vợ cả Nguyễn Thị Thận (1851-1930) thọ 80 tuổi (giỗ 2/7). Vợ thứ Hoàng Thị Gái làng Vị Hoàng (giỗ 23/7).',
});
addParentsChild(id_d22_tac, id_d22_tac_ba, id_d23_yeng);

const id_d23_than = addPerson({
  id: makeUUID(23, 4, 4),
  full_name: 'Nguyễn Thị Thận',
  gender: 'female',
  generation: 23,
  birth_year: 1851,
  death_year: 1930,
  death_lunar_day: 2,
  death_lunar_month: 7,
  death_lunar_year: 1930,
  is_in_law: true,
  is_deceased: true,
  note: 'Chính thất cụ Mậu Yêng. Sinh năm Tân Hợi (1851), giỗ 2/7 Canh Ngọ (25/8/1930), thọ 80 tuổi. Sinh cụ Phó Huỳnh và cụ bà Thị Chài.',
});
addMarriage(id_d23_yeng, id_d23_than);

const id_d23_gai = addPerson({
  id: makeUUID(23, 4, 5),
  full_name: 'Hoàng Thị Gái (Cụ Trẻ)',
  gender: 'female',
  generation: 23,
  is_in_law: true,
  death_lunar_day: 23,
  death_lunar_month: 7,
  death_lunar_year: 1945,
  is_deceased: true,
  note: 'Thứ thất cụ Mậu Yêng, người làng Vị Hoàng - Nam Định. Giỗ ngày 23/7 Ất Dậu (30/8/1945). Sinh cụ Tuần Liễn (Mậu Hiện).',
});
addMarriage(id_d23_yeng, id_d23_gai);

// Ngành 4 - Nhánh cụ Mậu Việm -> Cụ Mậu Lễ -> Cụ Lý Nhạc
const id_d23_le = addPerson({
  id: makeUUID(23, 4, 6),
  full_name: 'Nguyễn Mậu Lễ',
  gender: 'male',
  generation: 23,
  birth_order: 2,
  death_lunar_day: 27,
  death_lunar_month: 6,
  is_deceased: true,
  note: 'Con trai thứ 2 cụ Mậu Việm (Ngành 4). Giỗ ngày 27/6 Âm lịch. Vợ Nguyễn Thị Nhiên giỗ 27/3 Âm lịch. Sinh cụ Lý Nhạc.',
});
addChild(id_d22_viem, id_d23_le);

// Ngành 4 - Nhánh cụ Đội Giang -> Cụ Mậu Vinh & Cụ Cửu Linh
const id_d23_vinh = addPerson({
  id: makeUUID(23, 4, 7),
  full_name: 'Nguyễn Mậu Vinh',
  gender: 'male',
  generation: 23,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai cụ Đội Giang (bà cả). Người tiến cúng bức đại tự Mậu Đức Hậu Công. Vợ là Nguyễn Thị Cộc. Sinh cụ Mậu Loan (1902).',
});
addChild(id_d22_doi_giang, id_d23_vinh);

const id_d23_cam = addPerson({
  id: makeUUID(23, 4, 8),
  full_name: 'Nguyễn Mậu Cẩm (Cụ Cửu Linh)',
  gender: 'male',
  generation: 23,
  birth_order: 2,
  birth_year: 1901,
  death_year: 1975,
  death_day: 22,
  death_month: 9,
  death_lunar_day: 17,
  death_lunar_month: 8,
  death_lunar_year: 1975,
  is_deceased: true,
  note: 'Con trai cụ Đội Giang (bà kế). Có tên tự là Linh ("Minh Linh"), phong chức cửu phẩm nên gọi là cụ Cửu Linh. Sinh 1901 mất 17/8 Ất Mão (22/9/1975) thọ 75 tuổi. Vợ 1 Nguyễn Thị Đọ (1901-1932), vợ 2 Lương Thị Phụng (1903-1990).',
});
addChild(id_d22_doi_giang, id_d23_cam);

// Ngành 4 - Nhánh cụ Mậu Lĩnh -> Cụ Mậu Thống & Mậu Khả
const id_d23_thong = addPerson({
  id: makeUUID(23, 4, 9),
  full_name: 'Nguyễn Mậu Thống',
  gender: 'male',
  generation: 23,
  birth_order: 1,
  death_lunar_day: 6,
  death_lunar_month: 6,
  is_deceased: true,
  note: 'Con trai cả cụ Mậu Lĩnh. Giỗ 6/6 Âm lịch. Vợ Nguyễn Thị Dùm giỗ 7/11. Sinh cụ Mậu Mục, cụ Mậu Mạc.',
});
addChild(id_d22_linh, id_d23_thong);

// Ngành 4 - Nhánh cụ Mậu Tợi -> Cụ Quản Hinh
const id_d23_hinh = addPerson({
  id: makeUUID(23, 4, 10),
  full_name: 'Nguyễn Mậu Hinh (Cụ Quản Hinh)',
  gender: 'male',
  generation: 23,
  birth_order: 2,
  is_deceased: true,
  note: 'Con thứ cụ Mậu Tợi. Sinh các cụ: Phúc (1902), Khánh (1904), Khương (1908), Hưởng (1918), Ruân (1920), Kình (1910).',
});
addChild(id_d22_toi, id_d23_hinh);

// -----------------------------------------------------------------------------
// ĐỜI 24 (ĐỜI 6 MẬU TỘC / ĐỜI 6 TRUNG PHẢ)
// -----------------------------------------------------------------------------
// 1. Nhánh cụ Hương Ngung -> Cụ Quản Trắm
const id_d24_tram = addPerson({
  id: makeUUID(24, 4, 1),
  full_name: 'Nguyễn Mậu Trắm (Cụ Quản Trắm)',
  gender: 'male',
  generation: 24,
  birth_order: 1,
  death_lunar_day: 27,
  death_lunar_month: 4,
  is_deceased: true,
  note: 'Con trai cả cụ Hương Ngung (Ngành 4). Giữ chức Quản Hội nên thường gọi cụ Quản Trắm. Giỗ 27/4 Âm lịch. Vợ Nguyễn Thị Thân giỗ 11/8 Âm lịch. Sinh cụ Nguyễn Mậu Hách (1934).',
});
addParentsChild(id_d23_ngung, id_d23_ngung_ba, id_d24_tram);

const id_d24_tram_ba = addPerson({
  id: makeUUID(24, 4, 2),
  full_name: 'Nguyễn Thị Thân',
  gender: 'female',
  generation: 24,
  is_in_law: true,
  death_lunar_day: 11,
  death_lunar_month: 8,
  is_deceased: true,
  note: 'Vợ cụ Quản Trắm. Giỗ ngày 11 tháng 8 Âm lịch.',
});
addMarriage(id_d24_tram, id_d24_tram_ba);

// 2. Nhánh cụ Mậu Yêng -> Cụ Phó Huỳnh
const id_d24_huynh = addPerson({
  id: makeUUID(24, 4, 3),
  full_name: 'Nguyễn Mậu Huỳnh (Cụ Phó Huỳnh)',
  gender: 'male',
  generation: 24,
  birth_order: 1,
  birth_year: 1896,
  death_year: 1956,
  death_day: 19,
  death_month: 2,
  death_lunar_day: 8,
  death_lunar_month: 1,
  death_lunar_year: 1956,
  is_deceased: true,
  note: 'Tác giả cuốn Chúc Phả chữ Hán Nôm năm Quý Tỵ (1953) lưu giữ nguồn gốc họ Nguyễn Mậu Cổ Lễ. Sinh năm Đinh Dậu 1896, mất 8/1 Bính Thân (19/2/1956), thọ 61 tuổi. Làm Phó lý.',
});
addParentsChild(id_d23_yeng, id_d23_than, id_d24_huynh);

const id_d24_hat = addPerson({
  id: makeUUID(24, 4, 4),
  full_name: 'Nguyễn Thị Hạt',
  gender: 'female',
  generation: 24,
  birth_year: 1903,
  death_year: 1971,
  death_day: 23,
  death_month: 6,
  death_lunar_day: 1,
  death_lunar_month: 5,
  death_lunar_year: 1971,
  is_in_law: true,
  is_deceased: true,
  note: 'Vợ cụ Phó Huỳnh (con gái cụ Xiển). Sinh năm Quý Mão 1903, mất 01/5 nhuận Tân Hợi (23/6/1971), thọ 69 tuổi.',
});
addMarriage(id_d24_huynh, id_d24_hat);

// Cụ Tuần Liễn (Mậu Hiện)
const id_d24_hien = addPerson({
  id: makeUUID(24, 4, 5),
  full_name: 'Nguyễn Mậu Hiện (Cụ Tuần Liễn)',
  gender: 'male',
  generation: 24,
  birth_order: 2,
  birth_year: 1903,
  death_year: 1981,
  death_day: 24,
  death_month: 5,
  death_lunar_day: 21,
  death_lunar_month: 4,
  death_lunar_year: 1981,
  is_deceased: true,
  note: 'Con trai cụ Mậu Yêng (bà kế). Làm Tuần tổng nên gọi là Tuần Liễn. Sinh Quý Mão 1903, mất 21/4 Tân Dậu (24/5/1981), thọ 79 tuổi. Vợ chính Nguyễn Thị Hột (1905-1981), vợ thứ Nguyễn Thị Hồng (1923-1988).',
});
addParentsChild(id_d23_yeng, id_d23_gai, id_d24_hien);

// 3. Nhánh Cụ Lý Nhạc -> Cụ Tuần Riệp (Mậu Thích)
const id_d24_thich = addPerson({
  id: makeUUID(24, 4, 6),
  full_name: 'Nguyễn Mậu Thích (Cụ Tuần Riệp)',
  gender: 'male',
  generation: 24,
  birth_order: 3,
  birth_year: 1916,
  death_year: 1964,
  death_day: 12,
  death_month: 3,
  death_lunar_day: 29,
  death_lunar_month: 1,
  death_lunar_year: 1964,
  is_deceased: true,
  note: 'Tự là Nguyễn Mậu Riệp, làm Tuần Tổng. Sinh Bính Thìn 1916, mất 29/1 Giáp Thìn (12/3/1964), thọ 49 tuổi. Vợ chính Nguyễn Thị Nhỡ (1918-2000), vợ thứ Đàm Thị Cách (Mẹ VNAH, có con Liệt sĩ Nguyễn Mậu Đức).',
});
addChild(id_d23_le, id_d24_thich);

// 4. Nhánh Cụ Cửu Linh -> Cụ Nguyễn Mậu Lê Khanh
const id_d24_lekhanh = addPerson({
  id: makeUUID(24, 4, 7),
  full_name: 'Nguyễn Mậu Lê Khanh',
  gender: 'male',
  generation: 24,
  birth_order: 1,
  birth_year: 1927,
  is_deceased: false,
  note: 'Con trai thứ nhất cụ Cửu Linh. Cán bộ Trung Ương Đoàn TNCS Hồ Chí Minh nghỉ hưu tại 43 phố Ngô Quyền, Hà Nội. Huân chương Kháng chiến chống Pháp hạng Ba, chống Mỹ hạng Nhất.',
});
addChild(id_d23_cam, id_d24_lekhanh);

const id_d24_kimlien = addPerson({
  id: makeUUID(24, 4, 8),
  full_name: 'Đoàn Thị Kim Liên',
  gender: 'female',
  generation: 24,
  birth_year: 1928,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ cụ Nguyễn Mậu Lê Khanh, quê làng Đô Quan, Nam Lợi, Nam Trực. Cán bộ Công ty Phục vụ Hà Nội.',
});
addMarriage(id_d24_lekhanh, id_d24_kimlien);

// -----------------------------------------------------------------------------
// ĐỜI 25 & 26 (ĐỜI 7 & ĐỜI 8 MẬU TỘC - TRƯỞNG BAN VÀ CON CHÁU ĐƯƠNG ĐẠI NĂM 2000)
// -----------------------------------------------------------------------------
// 1. Cụ NGUYỄN MẬU HÁCH (Trưởng nam Ngành 4)
const id_d25_hach = addPerson({
  id: makeUUID(25, 4, 1),
  full_name: 'Nguyễn Mậu Hách',
  gender: 'male',
  generation: 25,
  birth_order: 1,
  birth_year: 1934,
  is_deceased: false,
  note: 'Trưởng nam Ngành 4 dòng họ Nguyễn Mậu. Sinh năm Giáp Tuất (1934). Cựu chiến binh, Chủ nhiệm HTX May mặc Nghĩa Lợi, Chủ tịch Ủy ban Mặt trận Tổ quốc Việt Nam Thị trấn Cổ Lễ. Huân chương Kháng chiến chống Mỹ hạng Nhất.',
  occupation: 'Chủ tịch UBMTTQ Thị trấn Cổ Lễ / Trưởng nam Ngành 4',
  residence: 'Thôn Thượng Đền, Thị trấn Cổ Lễ, Trực Ninh, Nam Định',
});
addParentsChild(id_d24_tram, id_d24_tram_ba, id_d25_hach);

const id_d25_hach_ba = addPerson({
  id: makeUUID(25, 4, 2),
  full_name: 'Nguyễn Thị Áp',
  gender: 'female',
  generation: 25,
  birth_year: 1933,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ cụ Nguyễn Mậu Hách, sinh năm Quý Dậu (1933), con gái cụ Nguyễn Gia Ba cùng làng.',
});
addMarriage(id_d25_hach, id_d25_hach_ba);

// 2. Cụ NGUYỄN MẬU TƯỜNG (Trưởng ban biên soạn Phả tộc 2001)
const id_d25_tuong = addPerson({
  id: makeUUID(25, 4, 3),
  full_name: 'Nguyễn Mậu Tường',
  gender: 'male',
  generation: 25,
  birth_order: 7,
  birth_year: 1935,
  is_deceased: false,
  note: 'Trưởng ban biên soạn Ngọc Phả Nguyễn Mậu Tộc năm 2001. Sinh năm Ất Hợi (1935), con thứ cụ Phó Huỳnh. Cán bộ GTVT, Đội trưởng Đội TNXP phục vụ tiền phương chống Mỹ. Bằng ghi công chiến sĩ giao thông không chiến hào, Huân chương Kháng chiến hạng Ba.',
});
addParentsChild(id_d24_huynh, id_d24_hat, id_d25_tuong);

const id_d25_tuong_ba = addPerson({
  id: makeUUID(25, 4, 4),
  full_name: 'Nguyễn Thị Loan',
  gender: 'female',
  generation: 25,
  birth_year: 1940,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ cụ Nguyễn Mậu Tường, sinh năm Canh Thìn (1940), người xứ Đông Thượng.',
});
addMarriage(id_d25_tuong, id_d25_tuong_ba);

// 3. Cụ NGUYỄN MẬU ĐIỂN (Huyện ủy viên)
const id_d25_dien = addPerson({
  id: makeUUID(25, 4, 5),
  full_name: 'Nguyễn Mậu Điển (Tự Mậu Linh)',
  gender: 'male',
  generation: 25,
  birth_order: 3,
  birth_year: 1929,
  death_year: 1998,
  death_day: 13,
  death_month: 4,
  death_lunar_day: 17,
  death_lunar_month: 3,
  death_lunar_year: 1998,
  is_deceased: true,
  note: 'Con trai cụ Phó Huỳnh. Sinh năm Kỷ Tỵ (1929), mất 17/3 Mậu Dần (13/4/1998), thọ 70 tuổi. Huyện ủy viên huyện Trực Ninh. Huân chương Kháng chiến hạng Nhất.',
});
addParentsChild(id_d24_huynh, id_d24_hat, id_d25_dien);

const id_d25_dien_ba = addPerson({
  id: makeUUID(25, 4, 6),
  full_name: 'Trần Thị Nhu',
  gender: 'female',
  generation: 25,
  birth_year: 1930,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ cụ Nguyễn Mậu Điển, sinh Canh Ngọ 1930, người làng xứ Đông Thượng.',
});
addMarriage(id_d25_dien, id_d25_dien_ba);

// -----------------------------------------------------------------------------
// ĐỜI 26 (CON CỤ NGUYỄN MẬU HÁCH & CÁC BÁC ĐƯƠNG ĐẠI)
// -----------------------------------------------------------------------------
// Các con cụ Nguyễn Mậu Hách:
const id_d26_thinh = addPerson({
  id: makeUUID(26, 4, 1),
  full_name: 'Nguyễn Mậu Thịnh',
  gender: 'male',
  generation: 26,
  birth_order: 1,
  birth_year: 1956,
  is_deceased: false,
  note: 'Con trai trưởng cụ Mậu Hách. Sinh năm Bính Thân (1956). Tốt nghiệp Đại học An ninh, Thiếu tá Công an, Phó phòng Chính trị Công an tỉnh Đồng Nai.',
  occupation: 'Thiếu tá Công an tỉnh Đồng Nai',
});
addParentsChild(id_d25_hach, id_d25_hach_ba, id_d26_thinh);

const id_d26_thinh_ba = addPerson({
  id: makeUUID(26, 4, 2),
  full_name: 'Đoàn Thị Kim Loan',
  gender: 'female',
  generation: 26,
  birth_year: 1959,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Thịnh, sinh năm Kỷ Hợi (1959), quê Ý Yên.',
});
addMarriage(id_d26_thinh, id_d26_thinh_ba);

const id_d26_quan = addPerson({
  id: makeUUID(26, 4, 3),
  full_name: 'Nguyễn Mậu Quân',
  gender: 'male',
  generation: 26,
  birth_order: 2,
  birth_year: 1961,
  is_deceased: false,
  note: 'Con trai thứ 2 cụ Mậu Hách. Sinh năm Tân Sửu (1961). Chủ nhiệm HTX May mặc Nghĩa Lợi - Cổ Lễ (1988-1992).',
});
addParentsChild(id_d25_hach, id_d25_hach_ba, id_d26_quan);

const id_d26_quan_ba = addPerson({
  id: makeUUID(26, 4, 4),
  full_name: 'Nguyễn Thị Hạnh',
  gender: 'female',
  generation: 26,
  birth_year: 1962,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Quân, sinh năm Nhâm Dần (1962), người thôn Nội, Nam Thanh.',
});
addMarriage(id_d26_quan, id_d26_quan_ba);

const id_d26_lien = addPerson({
  id: makeUUID(26, 4, 5),
  full_name: 'Nguyễn Thị Liên',
  gender: 'female',
  generation: 26,
  birth_order: 3,
  birth_year: 1964,
  is_deceased: false,
  note: 'Con gái cụ Mậu Hách. Sinh năm Giáp Thìn (1964), lấy chồng Đặng Minh Khang ở Liên Tỉnh, Nam Trực.',
});
addParentsChild(id_d25_hach, id_d25_hach_ba, id_d26_lien);

const id_d26_minh = addPerson({
  id: makeUUID(26, 4, 6),
  full_name: 'Nguyễn Mậu Minh',
  gender: 'male',
  generation: 26,
  birth_order: 4,
  birth_year: 1972,
  is_deceased: false,
  note: 'Con trai thứ 3 cụ Mậu Hách. Sinh năm Nhâm Tý (1972). Vợ là Đinh Thị Ngoãn sinh 1974 ở An Lãng.',
});
addParentsChild(id_d25_hach, id_d25_hach_ba, id_d26_minh);

const id_d26_minh_ba = addPerson({
  id: makeUUID(26, 4, 7),
  full_name: 'Đinh Thị Ngoãn',
  gender: 'female',
  generation: 26,
  birth_year: 1974,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Minh, sinh Giáp Dần (1974), làng An Lãng - Trực Chính.',
});
addMarriage(id_d26_minh, id_d26_minh_ba);

const id_d26_bang = addPerson({
  id: makeUUID(26, 4, 8),
  full_name: 'Nguyễn Mậu Thanh Bằng',
  gender: 'male',
  generation: 26,
  birth_order: 5,
  birth_year: 1974,
  is_deceased: false,
  note: 'Con trai thứ 4 cụ Mậu Hách. Sinh năm Giáp Dần (1974). Cử nhân Kỹ sư Thủy lợi (1996), du học Tiến sĩ tại Nga, Viện Khoa học Thủy lợi Việt Nam.',
  occupation: 'Tiến sĩ Viện Khoa học Thủy lợi Việt Nam',
});
addParentsChild(id_d25_hach, id_d25_hach_ba, id_d26_bang);

const id_d26_tuan = addPerson({
  id: makeUUID(26, 4, 9),
  full_name: 'Nguyễn Mậu Tuấn',
  gender: 'male',
  generation: 26,
  birth_order: 6,
  birth_year: 1976,
  is_deceased: false,
  note: 'Con trai thứ 5 cụ Mậu Hách. Sinh năm Bính Thìn (1976). Cử nhân Quản lý xã hội (1999).',
});
addParentsChild(id_d25_hach, id_d25_hach_ba, id_d26_tuan);

// -----------------------------------------------------------------------------
// ĐỜI 27 (CHÁU NỘI CỤ MẬU HÁCH & HẬU DUỆ ĐƯƠNG ĐẠI)
// -----------------------------------------------------------------------------
const id_d27_duong = addPerson({
  id: makeUUID(27, 4, 1),
  full_name: 'Nguyễn Thị Thùy Dương',
  gender: 'female',
  generation: 27,
  birth_order: 1,
  birth_year: 1981,
  is_deceased: false,
  note: 'Con gái ông Nguyễn Mậu Thịnh, cháu nội cụ Mậu Hách. Sinh năm Tân Dậu (1981).',
});
addParentsChild(id_d26_thinh, id_d26_thinh_ba, id_d27_duong);

const id_d27_van = addPerson({
  id: makeUUID(27, 4, 2),
  full_name: 'Nguyễn Thị Thúy Vân',
  gender: 'female',
  generation: 27,
  birth_order: 1,
  birth_year: 1984,
  is_deceased: false,
  note: 'Con gái ông Nguyễn Mậu Quân, cháu nội cụ Mậu Hách. Sinh năm Giáp Tý (1984).',
});
addParentsChild(id_d26_quan, id_d26_quan_ba, id_d27_van);

const id_d27_trunganh = addPerson({
  id: makeUUID(27, 4, 3),
  full_name: 'Nguyễn Mậu Trung Anh',
  gender: 'male',
  generation: 27,
  birth_order: 2,
  birth_year: 1987,
  is_deceased: false,
  note: 'Con trai ông Nguyễn Mậu Quân, cháu nội cụ Mậu Hách. Sinh năm Đinh Mão (1987).',
});
addParentsChild(id_d26_quan, id_d26_quan_ba, id_d27_trunganh);

const id_d27_hien = addPerson({
  id: makeUUID(27, 4, 4),
  full_name: 'Nguyễn Thị Thu Hiền',
  gender: 'female',
  generation: 27,
  birth_order: 1,
  birth_year: 2000,
  is_deceased: false,
  note: 'Con gái ông Nguyễn Mậu Minh, cháu nội cụ Mậu Hách. Sinh năm Canh Thìn (2000).',
});
addParentsChild(id_d26_minh, id_d26_minh_ba, id_d27_hien);

// -----------------------------------------------------------------------------
// SỰ KIỆN TẾ TỰ DÒNG HỌ NGUYỄN MẬU (CUSTOM EVENTS)
// -----------------------------------------------------------------------------
customEvents.push({
  id: '22222222-2222-2222-2222-000000000001',
  title: 'Giỗ Thủy Tổ Nguyễn Mậu Thái (Phúc Hội)',
  date: '2026-07-18',
  description: 'Ngày kỵ nhật Thủy Tổ Họ Nguyễn Mậu tại Cổ Lễ (Mồng 5 tháng 6 Âm lịch). Con cháu toàn họ tề tựu tế lễ tại Từ đường Thượng Đền.',
  type: 'death_anniversary',
  is_lunar: true,
  lunar_day: 5,
  lunar_month: 6,
});

customEvents.push({
  id: '22222222-2222-2222-2222-000000000002',
  title: 'Giỗ Tổ Tướng Công Nguyễn Mậu Hoàn (Ngành 4)',
  date: '2026-02-28',
  description: 'Ngày kỵ nhật Tướng Công Nguyễn Mậu Hoàn (Tự Tuấn Thông / Viết Nghĩa, 12 tháng Giêng Âm lịch). Triều đình cấp 100 mẫu ruộng và dân làng tế tự.',
  type: 'death_anniversary',
  is_lunar: true,
  lunar_day: 12,
  lunar_month: 1,
});

customEvents.push({
  id: '22222222-2222-2222-2222-000000000003',
  title: 'Giỗ Tổ Ngành Nhất Nguyễn Mậu Trường (Phúc Tiên)',
  date: '2026-11-09',
  description: 'Ngày kỵ nhật Tổ Ngành Nhất (Mồng 1 tháng 10 Âm lịch). Tế lễ tại Từ đường Ngành Nhất.',
  type: 'death_anniversary',
  is_lunar: true,
  lunar_day: 1,
  lunar_month: 10,
});

customEvents.push({
  id: '22222222-2222-2222-2222-000000000004',
  title: 'Lễ Hội Chùa Cổ Lễ & Đền Thượng Lãng',
  date: '2026-10-24',
  description: 'Lễ hội truyền thống Chùa Cổ Lễ và Đền Thượng tưởng nhớ Đức Thánh Nguyễn Minh Không (13-16 tháng 9 Âm lịch).',
  type: 'gathering',
  is_lunar: true,
  lunar_day: 15,
  lunar_month: 9,
});

// Output JSON Backup v3
const backupPayload = {
  version: 3,
  timestamp: new Date().toISOString(),
  persons,
  relationships,
  person_details_private: personDetailsPrivate,
  custom_events: customEvents,
};

fs.writeFileSync(
  path.join(__dirname, '../data/gia_pha_nguyen_mau_nganh4.json'),
  JSON.stringify(backupPayload, null, 2),
  'utf8'
);

console.log(`Generated JSON: ${persons.length} persons, ${relationships.length} relationships, ${personDetailsPrivate.length} private details.`);

// Output SQL Seed
let sql = `-- =============================================================================
-- GIA PHẢ DÒNG HỌ NGUYỄN MẬU (CỔ LỄ, TRỰC NINH, NAM ĐỊNH) - SEED CHUẨN XÁC 100%
-- Trích từ: NGỌC PHẢ NGUYỄN MẬU TỘC (Năm 2001 - 128 trang)
-- =============================================================================

BEGIN;

-- 1. Xóa dữ liệu cũ
DELETE FROM custom_events;
DELETE FROM relationships;
DELETE FROM person_details_private;
DELETE FROM persons;

-- 2. Thêm danh sách Thành viên (persons)
`;

for (const p of persons) {
  const sanitize = (val) => val === null || val === undefined ? 'NULL' : `'${String(val).replace(/'/g, "''")}'`;
  const boolVal = (val) => val ? 'true' : 'false';
  const numVal = (val) => val === null || val === undefined ? 'NULL' : val;

  sql += `INSERT INTO persons (id, full_name, gender, generation, birth_order, is_in_law, is_deceased, birth_day, birth_month, birth_year, death_day, death_month, death_year, death_lunar_day, death_lunar_month, death_lunar_year, death_lunar_is_leap, note)
VALUES ('${p.id}', ${sanitize(p.full_name)}, '${p.gender}', ${p.generation}, ${numVal(p.birth_order)}, ${boolVal(p.is_in_law)}, ${boolVal(p.is_deceased)}, ${numVal(p.birth_day)}, ${numVal(p.birth_month)}, ${numVal(p.birth_year)}, ${numVal(p.death_day)}, ${numVal(p.death_month)}, ${numVal(p.death_year)}, ${numVal(p.death_lunar_day)}, ${numVal(p.death_lunar_month)}, ${numVal(p.death_lunar_year)}, ${boolVal(p.death_lunar_is_leap)}, ${sanitize(p.note)});\n`;
}

sql += `\n-- 3. Thêm Mối quan hệ Gia đình (relationships)\n`;
for (const r of relationships) {
  sql += `INSERT INTO relationships (id, person_a, person_b, type) VALUES ('${r.id}', '${r.person_a}', '${r.person_b}', '${r.type}');\n`;
}

sql += `\n-- 4. Thêm Thông tin Riêng tư (person_details_private)\n`;
for (const priv of personDetailsPrivate) {
  const sanitize = (val) => val === null || val === undefined ? 'NULL' : `'${String(val).replace(/'/g, "''")}'`;
  sql += `INSERT INTO person_details_private (person_id, phone, occupation, residence, notes) VALUES ('${priv.person_id}', ${sanitize(priv.phone)}, ${sanitize(priv.occupation)}, ${sanitize(priv.residence)}, ${sanitize(priv.notes)});\n`;
}

sql += `\n-- 5. Thêm Sự kiện Tế tự Dòng họ (custom_events)\n`;
for (const ev of customEvents) {
  const sanitize = (val) => val === null || val === undefined ? 'NULL' : `'${String(val).replace(/'/g, "''")}'`;
  sql += `INSERT INTO custom_events (id, title, date, description, type, is_lunar, lunar_day, lunar_month) VALUES ('${ev.id}', ${sanitize(ev.title)}, '${ev.date}', ${sanitize(ev.description)}, '${ev.type}', ${ev.is_lunar}, ${ev.lunar_day}, ${ev.lunar_month});\n`;
}

sql += `\nCOMMIT;\n`;

fs.writeFileSync(
  path.join(__dirname, '../docs/seed_nguyen_mau_nganh4.sql'),
  sql,
  'utf8'
);

console.log(`Generated SQL Seed successfully.`);
