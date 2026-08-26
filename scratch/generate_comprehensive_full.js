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

  if (phone || occupation || residence) {
    personDetailsPrivate.push({
      person_id: id,
      phone_number: phone,
      occupation,
      current_residence: residence,
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

console.log('Building full 28 generations of Nguyen Mau Toc...');

// -----------------------------------------------------------------------------
// THƯỢNG PHẢ (ĐỜI 1 - 18)
// -----------------------------------------------------------------------------
const id_d1_bac = addPerson({
  id: makeUUID(1, 0, 1),
  full_name: 'Nguyễn Bặc',
  gender: 'male',
  generation: 1,
  birth_order: 1,
  birth_year: 904,
  death_year: 979,
  is_deceased: true,
  note: 'Khởi Tổ Nguyên Đương họ Nguyễn. Sinh Giáp Tý (904) mất Kỷ Mão (979) thọ 76 tuổi. Đại tướng số 1 dẹp loạn 12 sứ quân, Định Quốc Công triều Đinh Tiên Hoàng.',
});

const id_d2_de = addPerson({
  id: makeUUID(2, 0, 1),
  full_name: 'Nguyễn Đệ',
  gender: 'male',
  generation: 2,
  birth_order: 1,
  death_year: 1028,
  is_deceased: true,
  note: 'Con trưởng Tổ Bặc. Điện Tiền đô chỉ huy Sứ triều Tiền Lê. Đô hiệu Điểm Tước hầu triều Lý Thái Tổ.',
});
addChild(id_d1_bac, id_d2_de);

const id_d3_vien = addPerson({
  id: makeUUID(3, 0, 1),
  full_name: 'Nguyễn Viễn',
  gender: 'male',
  generation: 3,
  birth_order: 2,
  is_deceased: true,
  note: 'Con trai thứ 2 Tổ Nguyễn Đệ. Tả tướng Quốc - Tham tri sự triều Lý Nhân Tông (1072-1127).',
});
addChild(id_d2_de, id_d3_vien);

const id_d4_phung = addPerson({
  id: makeUUID(4, 0, 1),
  full_name: 'Nguyễn Phụng',
  gender: 'male',
  generation: 4,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai Tổ Viễn. Võ cử nhân, Tả đô đốc triều Lý Anh Tông (1145).',
});
addChild(id_d3_vien, id_d4_phung);

const id_d5_non = addPerson({
  id: makeUUID(5, 0, 1),
  full_name: 'Nguyễn Nộn',
  gender: 'male',
  generation: 5,
  birth_order: 1,
  death_year: 1229,
  is_deceased: true,
  note: 'Đại Thắng Vương, Hoài Đạo Hiếu Vũ Vương thời Lý - Trần. Đền thờ chính tại Phù Dực, Tiên Du, Bắc Ninh.',
});
addChild(id_d4_phung, id_d5_non);

const id_d6_tu = addPerson({
  id: makeUUID(6, 0, 1),
  full_name: 'Nguyễn Thế Tứ',
  gender: 'male',
  generation: 6,
  birth_order: 1,
  is_deceased: true,
  note: 'Đô Hiệu Điểm qua 3 triều vua Trần (Thái Tông, Thánh Tông, Nhân Tông).',
});
addChild(id_d5_non, id_d6_tu);

const id_d7_naphoa = addPerson({
  id: makeUUID(7, 0, 1),
  full_name: 'Nguyễn Nạp Hoà',
  gender: 'male',
  generation: 7,
  birth_order: 1,
  death_year: 1377,
  is_deceased: true,
  note: 'Bình Nam Đại tướng quân triều Trần Duệ Tông (1377).',
});
addChild(id_d6_tu, id_d7_naphoa);

const id_d8_congluat = addPerson({
  id: makeUUID(8, 0, 1),
  full_name: 'Nguyễn Công Luật',
  gender: 'male',
  generation: 8,
  birth_order: 1,
  is_deceased: true,
  note: 'Hữu Hiệu Điểm triều Trần (1378). Cai quản quân phủ Thiên Trường.',
});
addChild(id_d7_naphoa, id_d8_congluat);

const id_d9_minhdu = addPerson({
  id: makeUUID(9, 0, 1),
  full_name: 'Nguyễn Minh Du',
  gender: 'male',
  generation: 9,
  birth_order: 3,
  is_deceased: true,
  note: 'Chỉ huy quân Thiết Hổ, Thái phó thời Trần.',
});
addChild(id_d8_congluat, id_d9_minhdu);

const id_d10 = addPerson({
  id: makeUUID(10, 0, 1),
  full_name: 'Nguyễn Phi Khanh',
  gender: 'male',
  generation: 10,
  birth_order: 1,
  birth_year: 1355,
  death_year: 1428,
  is_deceased: true,
  note: 'Thái học sinh thời Trần - Hồ, thân phụ Nguyễn Trãi.',
});
addChild(id_d9_minhdu, id_d10);

const id_d11_trai = addPerson({
  id: makeUUID(11, 0, 1),
  full_name: 'Nguyễn Trãi (Ức Trai)',
  gender: 'male',
  generation: 11,
  birth_order: 1,
  birth_year: 1380,
  death_year: 1442,
  death_lunar_day: 16,
  death_lunar_month: 8,
  death_lunar_year: 1442,
  is_deceased: true,
  note: 'Danh nhân văn hóa thế giới UNESCO. Khai quốc công thần triều Hậu Lê, Nhập nội Hành khiển, Tuyên phụng Đại phu, Huệ Quốc Công.',
});
addChild(id_d10, id_d11_trai);

const id_d11_man = addPerson({
  id: makeUUID(11, 0, 2),
  full_name: 'Phạm Thị Mẫn',
  gender: 'female',
  generation: 11,
  is_in_law: true,
  is_deceased: true,
  note: 'Vợ kế cụ Nguyễn Trãi, thân mẫu cụ Nguyễn Anh Võ.',
});
addMarriage(id_d11_trai, id_d11_man);

const id_d12_anhvo = addPerson({
  id: makeUUID(12, 0, 1),
  full_name: 'Nguyễn Anh Võ (Nguyễn Anh Vũ)',
  gender: 'male',
  generation: 12,
  birth_order: 6,
  birth_year: 1442,
  is_deceased: true,
  note: 'Tự Tùng Hạc, hiệu Phúc Sơ. Con thứ 6 cụ Nguyễn Trãi. Vua Lê Thánh Tông minh oan năm 1464, phong chức Tri châu.',
});
addParentsChild(id_d11_trai, id_d11_man, id_d12_anhvo);

const id_d13_giam = addPerson({
  id: makeUUID(13, 0, 1),
  full_name: 'Nguyễn Giám (Tự Giác Hiền)',
  gender: 'male',
  generation: 13,
  birth_order: 2,
  is_deceased: true,
  note: 'Đỗ quan Khảo trường Quốc Tử Giám triều Lê Hiến Tông năm Giáp Tý (1504).',
});
addChild(id_d12_anhvo, id_d13_giam);

const id_d14_truc = addPerson({
  id: makeUUID(14, 0, 1),
  full_name: 'Nguyễn Mậu Trực (Tự Phúc Văn)',
  gender: 'male',
  generation: 14,
  birth_order: 1,
  is_deceased: true,
  note: 'Đỗ Tiến sĩ quan trường khảo triều Mạc - Quang Hoà thứ 6 Bính Ngọ (1546).',
});
addChild(id_d13_giam, id_d14_truc);

const id_d15_trung = addPerson({
  id: makeUUID(15, 0, 1),
  full_name: 'Nguyễn Trung (Tự Phúc Hiếu)',
  gender: 'male',
  generation: 15,
  birth_order: 4,
  is_deceased: true,
  note: 'Đỗ Tiến sĩ năm Quý Tỵ (1593) triều Lê.',
});
addChild(id_d14_truc, id_d15_trung);

const id_d16_kien = addPerson({
  id: makeUUID(16, 0, 1),
  full_name: 'Nguyễn Mậu Kiên (Tự Phúc Hoà)',
  gender: 'male',
  generation: 16,
  birth_order: 1,
  is_deceased: true,
  note: 'Đỗ Tiến sĩ năm Bính Thìn (1619) triều Lê Thần Tông.',
});
addChild(id_d15_trung, id_d16_kien);

const id_d17_dang = addPerson({
  id: makeUUID(17, 0, 1),
  full_name: 'Nguyễn Đăng (Tự Phúc Khải)',
  gender: 'male',
  generation: 17,
  birth_order: 1,
  is_deceased: true,
  note: 'Đỗ Tiến sĩ năm Bính Tý (1639) triều Lê Kính Tông.',
});
addChild(id_d16_kien, id_d17_dang);

const id_d18_tai = addPerson({
  id: makeUUID(18, 0, 1),
  full_name: 'Nguyễn Mậu Tài (Thượng Thư Bộ Binh)',
  gender: 'male',
  generation: 18,
  birth_order: 5,
  is_deceased: true,
  note: 'Tự Mậu Tú, hiệu Phúc Thành / Viết Trai tiên sinh. Chánh sứ sang nhà Thanh (1673), Thượng thư Bộ Hình, Thượng thư Bộ Binh (1676).',
});
addChild(id_d17_dang, id_d18_tai);

const id_d18_le = addPerson({
  id: makeUUID(18, 0, 2),
  full_name: 'Lê Thị (Tiểu Thư)',
  gender: 'female',
  generation: 18,
  is_in_law: true,
  is_deceased: true,
  note: 'Thứ thất cụ Thượng thư Nguyễn Mậu Tài, thân mẫu Thủy Tổ Nguyễn Mậu Thái (Phúc Hội).',
});
addMarriage(id_d18_tai, id_d18_le);

// -----------------------------------------------------------------------------
// TRUNG PHẢ (CỘI NGUỒN CỔ LỄ - ĐỜI 19 ĐẾN ĐỜI 28)
// -----------------------------------------------------------------------------
// ĐỜI 19 (ĐỜI 1 MẬU TỘC CỔ LỄ - THỦY TỔ)
const id_d19_thai = addPerson({
  id: makeUUID(19, 0, 1),
  full_name: 'Nguyễn Mậu Thái (Tự Phúc Hội)',
  gender: 'male',
  generation: 19,
  birth_order: 6,
  death_lunar_day: 5,
  death_lunar_month: 6,
  is_deceased: true,
  note: 'THỦY TỔ NGUYỄN MẬU TỘC tại Mặt Lãng Thượng (Thôn Thượng Đền, Cổ Lễ, Trực Ninh, Nam Định) năm 1682. Triều đình phong Hậu Thần. Kỵ nhật mồng 5 tháng 6 Âm lịch.',
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
  note: 'Chính thất Thủy Tổ Phúc Hội. Kỵ nhật ngày 16 tháng 2 Âm lịch.',
});
addMarriage(id_d19_thai, id_d19_ai);

// ĐỜI 20 (ĐỜI 2 MẬU TỘC - 4 NGÀNH)
// Ngành 1
const id_d20_truong = addPerson({
  id: makeUUID(20, 1, 1),
  full_name: 'Nguyễn Mậu Trường (Tự Phúc Tiên)',
  gender: 'male',
  generation: 20,
  birth_order: 1,
  death_lunar_day: 1,
  death_lunar_month: 10,
  is_deceased: true,
  note: 'Tổ Khởi Lập NGÀNH NHẤT. Hậu thần, kỵ nhật mồng 1 tháng 10 Âm lịch.',
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
  note: 'Tổ bà Ngành Nhất, kỵ nhật mồng 1 tháng 10 Âm lịch.',
});
addMarriage(id_d20_truong, id_d20_truong_ba);

// Ngành 2
const id_d20_rong = addPerson({
  id: makeUUID(20, 2, 1),
  full_name: 'Nguyễn Mậu Rong (Tự Phúc Khoán)',
  gender: 'male',
  generation: 20,
  birth_order: 2,
  death_lunar_day: 14,
  death_lunar_month: 3,
  is_deceased: true,
  note: 'Tổ Khởi Lập NGÀNH NHỊ. Hậu thần, kỵ nhật 14 tháng 3 Âm lịch.',
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
  note: 'Tổ bà Ngành Nhị, kỵ nhật 30 tháng Chạp Âm lịch.',
});
addMarriage(id_d20_rong, id_d20_rong_ba);

// Ngành 3
const id_d20_thiem = addPerson({
  id: makeUUID(20, 3, 1),
  full_name: 'Nguyễn Mậu Thiêm (Tự Pháp Uyên)',
  gender: 'male',
  generation: 20,
  birth_order: 3,
  death_lunar_day: 30,
  death_lunar_month: 9,
  is_deceased: true,
  note: 'Tổ Khởi Lập NGÀNH BA. Hậu thần, kỵ nhật 30 tháng 9 Âm lịch.',
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
  note: 'Tổ bà Ngành Ba, kỵ nhật 15 tháng 7 Âm lịch.',
});
addMarriage(id_d20_thiem, id_d20_thiem_ba);

// Ngành 4
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
  note: 'Tổ Khởi Lập NGÀNH TƯ (Ngành 4). Tri huyện Mỹ Lộc, Tá lang, Tri phủ Thiên Trường dũng phủ quân. Tướng công triều Lê. Ban 100 mẫu ruộng cúng tế. Kỵ nhật 12 tháng Giêng Âm lịch.',
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
  note: 'Tổ bà Ngành Tư, kỵ nhật 14 tháng 3 Âm lịch.',
});
addMarriage(id_d20_hoan, id_d20_hoan_ba);

// -----------------------------------------------------------------------------
// ĐỜI 21
// -----------------------------------------------------------------------------
// Ngành 4 - Con cụ Tuấn Hoàn
const id_d21_khoan = addPerson({
  id: makeUUID(21, 4, 1),
  full_name: 'Nguyễn Mậu Khoan (Cụ Cử Khoan)',
  gender: 'male',
  generation: 21,
  birth_order: 1,
  death_lunar_day: 15,
  death_lunar_month: 8,
  is_deceased: true,
  note: 'Con trưởng Tổ Tuấn Hoàn (Ngành 4). Đỗ Cử nhân, làm văn thư phủ Thiên Trường. Đồng giỗ với vợ ngày 15/8 Âm lịch.',
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
  note: 'Vợ cụ Cử Khoan, đồng giỗ 15/8 Âm lịch.',
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
  note: 'Con thứ 2 Tổ Tuấn Hoàn. Giỗ 24/6 Âm lịch.',
});
addParentsChild(id_d20_hoan, id_d20_hoan_ba, id_d21_giao);

const id_d21_giao_ba = addPerson({
  id: makeUUID(21, 4, 33),
  full_name: 'Cụ Bà (Vợ cụ Nguyễn Mậu Giáo)',
  gender: 'female',
  generation: 21,
  is_in_law: true,
  is_deceased: true,
  note: 'Vợ cụ Nguyễn Mậu Giáo.',
});
addMarriage(id_d21_giao, id_d21_giao_ba);

const id_d21_hoi = addPerson({
  id: makeUUID(21, 4, 4),
  full_name: 'Nguyễn Mậu Hợi',
  gender: 'male',
  generation: 21,
  birth_order: 3,
  is_deceased: true,
  note: 'Con thứ 3 Tổ Tuấn Hoàn.',
});
addParentsChild(id_d20_hoan, id_d20_hoan_ba, id_d21_hoi);

const id_d21_bon = addPerson({
  id: makeUUID(21, 4, 5),
  full_name: 'Nguyễn Mậu Bốn (Tuần Bốn)',
  gender: 'male',
  generation: 21,
  birth_order: 4,
  is_deceased: true,
  note: 'Con nuôi Tổ Tuấn Hoàn, đỗ đạt làm quan Tuần phủ.',
});
addChild(id_d20_hoan, id_d21_bon, true);

// -----------------------------------------------------------------------------
// ĐỜI 22
// -----------------------------------------------------------------------------
const id_d22_men = addPerson({
  id: makeUUID(22, 4, 1),
  full_name: 'Nguyễn Mậu Mền',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con cụ Cử Khoan.',
});
addParentsChild(id_d21_khoan, id_d21_khoan_ba, id_d22_men);

const id_d22_viem = addPerson({
  id: makeUUID(22, 4, 2),
  full_name: 'Nguyễn Mậu Việm',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai thứ nhất cụ Mậu Giáo (Ngành 4). Sinh cụ Mậu Kiền và cụ Mậu Lễ.',
});
addParentsChild(id_d21_giao, id_d21_giao_ba, id_d22_viem);

const id_d22_viem_ba = addPerson({
  id: makeUUID(22, 4, 22),
  full_name: 'Cụ Bà (Vợ cụ Nguyễn Mậu Việm)',
  gender: 'female',
  generation: 22,
  is_in_law: true,
  is_deceased: true,
  note: 'Vợ cụ Nguyễn Mậu Việm (Ngành 4). Khuyết danh trong phả cũ.',
});
addMarriage(id_d22_viem, id_d22_viem_ba);

const id_d22_tac = addPerson({
  id: makeUUID(22, 4, 4),
  full_name: 'Nguyễn Mậu Tạc',
  gender: 'male',
  generation: 22,
  birth_order: 3,
  death_lunar_day: 27,
  death_lunar_month: 3,
  is_deceased: true,
  note: 'Con trai thứ 3 cụ Mậu Giáo. Giỗ 27/3 Âm lịch, thọ 49 tuổi. Vợ Nguyễn Thị Bòng giỗ 23/3 Âm lịch.',
});
addParentsChild(id_d21_giao, id_d21_giao_ba, id_d22_tac);

const id_d22_tac_ba = addPerson({
  id: makeUUID(22, 4, 5),
  full_name: 'Nguyễn Thị Bòng',
  gender: 'female',
  generation: 22,
  is_in_law: true,
  death_lunar_day: 23,
  death_lunar_month: 3,
  is_deceased: true,
  note: 'Vợ cụ Nguyễn Mậu Tạc, giỗ 23/3 Âm lịch.',
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
  note: 'Con trưởng cụ Mậu Hợi. Giỗ 14/11 Âm lịch, đồng giỗ vợ Nguyễn Thị Là.',
});
addChild(id_d21_hoi, id_d22_linh);

const id_d22_toi = addPerson({
  id: makeUUID(22, 4, 8),
  full_name: 'Nguyễn Mậu Tợi',
  gender: 'male',
  generation: 22,
  birth_order: 3,
  death_lunar_day: 9,
  death_lunar_month: 5,
  is_deceased: true,
  note: 'Con thứ 3 cụ Mậu Hợi. Giỗ 9/5 Âm lịch. Vợ Nguyễn Thị Tợi giỗ 26/6.',
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
  note: 'Chánh suất đội triều Nguyễn. Giỗ 26/2 Âm lịch. Vợ Nguyễn Thị Lý giỗ 12 tháng Chạp.',
});
addChild(id_d21_bon, id_d22_doi_giang);

// -----------------------------------------------------------------------------
// ĐỜI 23
// -----------------------------------------------------------------------------
const id_d23_ngung = addPerson({
  id: makeUUID(23, 4, 1),
  full_name: 'Nguyễn Mậu Ngung (Cụ Hương Ngung)',
  gender: 'male',
  generation: 23,
  birth_order: 1,
  death_lunar_day: 4,
  death_lunar_month: 4,
  is_deceased: true,
  note: 'Con trai cụ Mậu Mền. Hương hội. Giỗ 4/4 Âm lịch. Vợ Nguyễn Thị Kiêm giỗ 20/6 Âm lịch.',
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
  note: 'Vợ cụ Hương Ngung, giỗ 20/6 Âm lịch.',
});
addMarriage(id_d23_ngung, id_d23_ngung_ba);

const id_d23_kien = addPerson({
  id: makeUUID(23, 4, 11),
  full_name: 'Nguyễn Mậu Kiền',
  gender: 'male',
  generation: 23,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai thứ nhất cụ Mậu Việm (Ngành 4).',
});
addParentsChild(id_d22_viem, id_d22_viem_ba, id_d23_kien);

const id_d23_kien_ba = addPerson({
  id: makeUUID(23, 4, 12),
  full_name: 'Nguyễn Thị Kiền',
  gender: 'female',
  generation: 23,
  is_in_law: true,
  is_deceased: true,
  note: 'Vợ cụ Nguyễn Mậu Kiền.',
});
addMarriage(id_d23_kien, id_d23_kien_ba);

const id_d23_le = addPerson({
  id: makeUUID(23, 4, 6),
  full_name: 'Nguyễn Mậu Lễ',
  gender: 'male',
  generation: 23,
  birth_order: 2,
  death_lunar_day: 27,
  death_lunar_month: 6,
  is_deceased: true,
  note: 'Con trai thứ 2 cụ Mậu Việm. Giỗ 27/6 Âm lịch. Vợ là Nguyễn Thị Nhiên giỗ 27/3 Âm lịch.',
});
addParentsChild(id_d22_viem, id_d22_viem_ba, id_d23_le);

const id_d23_le_ba = addPerson({
  id: makeUUID(23, 4, 13),
  full_name: 'Nguyễn Thị Nhiên',
  gender: 'female',
  generation: 23,
  is_in_law: true,
  death_lunar_day: 27,
  death_lunar_month: 3,
  is_deceased: true,
  note: 'Vợ cụ Nguyễn Mậu Lễ. Giỗ ngày 27 tháng 3 Âm lịch.',
});
addMarriage(id_d23_le, id_d23_le_ba);

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
  note: 'Con trai cụ Mậu Tạc. Sinh 1850 mất 17/4 Nhâm Tý (1912) thọ 53 tuổi. Vợ cả Nguyễn Thị Thận (1851-1930, giỗ 2/7), vợ thứ Hoàng Thị Gái (giỗ 23/7).',
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
  note: 'Chính thất cụ Mậu Yêng, giỗ 2/7 Canh Ngọ (1930) thọ 80 tuổi.',
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
  note: 'Thứ thất cụ Mậu Yêng, làng Vị Hoàng - Nam Định. Giỗ 23/7 Âm lịch.',
});
addMarriage(id_d23_yeng, id_d23_gai);

// -----------------------------------------------------------------------------
// ĐỜI 24
// -----------------------------------------------------------------------------
const id_d24_tram = addPerson({
  id: makeUUID(24, 4, 1),
  full_name: 'Nguyễn Mậu Trắm (Cụ Quản Trắm)',
  gender: 'male',
  generation: 24,
  birth_order: 1,
  death_lunar_day: 27,
  death_lunar_month: 4,
  is_deceased: true,
  note: 'Quản Hội, con cả cụ Hương Ngung. Giỗ 27/4 Âm lịch. Vợ Nguyễn Thị Thân giỗ 11/8 Âm lịch.',
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
  note: 'Vợ cụ Quản Trắm, giỗ 11/8 Âm lịch.',
});
addMarriage(id_d24_tram, id_d24_tram_ba);

const id_d24_nhac = addPerson({
  id: makeUUID(24, 4, 16),
  full_name: 'Nguyễn Mậu Nhạc (Cụ Lý Nhạc)',
  gender: 'male',
  generation: 24,
  birth_order: 1,
  death_lunar_day: 5,
  death_lunar_month: 8,
  is_deceased: true,
  note: 'Con trai cụ Mậu Lễ và cụ bà Nguyễn Thị Nhiên. Làm Lý trưởng nên thường gọi là cụ Lý Nhạc. Giỗ ngày 05/08 Âm lịch. Vợ là cụ Nguyễn Thị Mòi giỗ 30 tháng Chạp.',
});
addParentsChild(id_d23_le, id_d23_le_ba, id_d24_nhac);

const id_d24_moi = addPerson({
  id: makeUUID(24, 4, 17),
  full_name: 'Nguyễn Thị Mòi',
  gender: 'female',
  generation: 24,
  is_in_law: true,
  death_lunar_day: 30,
  death_lunar_month: 12,
  is_deceased: true,
  note: 'Vợ cụ Lý Nhạc. Giỗ ngày 30 tháng Chạp Âm lịch.',
});
addMarriage(id_d24_nhac, id_d24_moi);

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
  note: 'Tác giả Chúc Phả năm 1953. Phó lý. Sinh 1896 mất 8/1 Bính Thân (1956) thọ 61 tuổi.',
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
  note: 'Vợ cụ Phó Huỳnh, sinh 1903 mất 1/5 nhuận Tân Hợi (1971) thọ 69 tuổi.',
});
addMarriage(id_d24_huynh, id_d24_hat);

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
  note: 'Tuần tổng. Sinh 1903 mất 21/4 Tân Dậu (1981) thọ 79 tuổi.',
});
addParentsChild(id_d23_yeng, id_d23_gai, id_d24_hien);

// -----------------------------------------------------------------------------
// ĐỜI 25
// -----------------------------------------------------------------------------
const id_d25_hach = addPerson({
  id: makeUUID(25, 4, 1),
  full_name: 'Nguyễn Mậu Hách',
  gender: 'male',
  generation: 25,
  birth_order: 1,
  birth_year: 1934,
  is_deceased: false,
  note: 'Trưởng nam Ngành 4 Nguyễn Mậu Tộc. Sinh năm Giáp Tuất (1934). Chủ tịch UBMTTQ TT. Cổ Lễ.',
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
  note: 'Vợ cụ Nguyễn Mậu Hách, sinh Quý Dậu (1933).',
});
addMarriage(id_d25_hach, id_d25_hach_ba);

const id_d25_thich = addPerson({
  id: makeUUID(25, 4, 6),
  full_name: 'Nguyễn Mậu Thích (Cụ Tuần Riệp)',
  gender: 'male',
  generation: 25,
  birth_order: 3,
  birth_year: 1916,
  death_year: 1964,
  death_day: 12,
  death_month: 3,
  death_lunar_day: 29,
  death_lunar_month: 1,
  death_lunar_year: 1964,
  is_deceased: true,
  note: 'Tự là Nguyễn Mậu Riệp, làm Tuần Tổng. Con trai cụ Lý Nhạc. Sinh 1916 mất 29/1 Giáp Thìn (1964) thọ 49 tuổi.',
});
addParentsChild(id_d24_nhac, id_d24_moi, id_d25_thich);

const id_d25_nho = addPerson({
  id: makeUUID(25, 4, 61),
  full_name: 'Nguyễn Thị Nhỡ',
  gender: 'female',
  generation: 25,
  birth_year: 1918,
  death_year: 2000,
  death_lunar_day: 5,
  death_lunar_month: 11,
  death_lunar_year: 2000,
  is_in_law: true,
  is_deceased: true,
  note: 'Chính thất cụ Tuần Riệp (Mậu Thích). Sinh 1918 mất 05/11 Canh Thìn (30/11/2000) thọ 83 tuổi.',
});
addMarriage(id_d25_thich, id_d25_nho);

const id_d25_cach = addPerson({
  id: makeUUID(25, 4, 62),
  full_name: 'Đàm Thị Cách (Mẹ VNAH)',
  gender: 'female',
  generation: 25,
  birth_year: 1914,
  is_in_law: true,
  is_deceased: true,
  note: 'Thứ thất cụ Tuần Riệp (Mậu Thích). Bà Mẹ Việt Nam Anh Hùng, thân mẫu Liệt sĩ Nguyễn Mậu Đức.',
});
addMarriage(id_d25_thich, id_d25_cach);

const id_d25_tuong = addPerson({
  id: makeUUID(25, 4, 3),
  full_name: 'Nguyễn Mậu Tường',
  gender: 'male',
  generation: 25,
  birth_order: 7,
  birth_year: 1935,
  is_deceased: false,
  note: 'Trưởng ban biên soạn Ngọc Phả Nguyễn Mậu Tộc năm 2001. Sinh năm Ất Hợi (1935), con thứ cụ Phó Huỳnh.',
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
  note: 'Vợ cụ Nguyễn Mậu Tường, sinh năm Canh Thìn (1940).',
});
addMarriage(id_d25_tuong, id_d25_tuong_ba);

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
  note: 'Huyện ủy viên Trực Ninh. Sinh 1929 mất 17/3 Mậu Dần (1998) thọ 70 tuổi.',
});
addParentsChild(id_d24_huynh, id_d24_hat, id_d25_dien);

const id_d25_dien_ba = addPerson({
  id: makeUUID(25, 4, 55),
  full_name: 'Trần Thị Nhu',
  gender: 'female',
  generation: 25,
  birth_year: 1930,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ cụ Nguyễn Mậu Điển.',
});
addMarriage(id_d25_dien, id_d25_dien_ba);

// -----------------------------------------------------------------------------
// ĐỜI 26 (CON CỤ HÁCH & CON CỤ TUẦN RIỆP)
// -----------------------------------------------------------------------------
// Con cụ Hách
const id_d26_thinh = addPerson({
  id: makeUUID(26, 4, 1),
  full_name: 'Nguyễn Mậu Thịnh',
  gender: 'male',
  generation: 26,
  birth_order: 1,
  birth_year: 1956,
  is_deceased: false,
  note: 'Con trưởng cụ Mậu Hách. Thiếu tá Công an tỉnh Đồng Nai.',
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
  note: 'Vợ ông Nguyễn Mậu Thịnh.',
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
  note: 'Con trai thứ 2 cụ Mậu Hách. Chủ nhiệm HTX May mặc Nghĩa Lợi.',
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
  note: 'Vợ ông Nguyễn Mậu Quân.',
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
  note: 'Con gái cụ Mậu Hách.',
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
  note: 'Con trai thứ 3 cụ Mậu Hách.',
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
  note: 'Vợ ông Nguyễn Mậu Minh.',
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
  note: 'Con trai thứ 4 cụ Mậu Hách. Tiến sĩ Thủy lợi tại Nga, Viện Khoa học Thủy lợi Việt Nam.',
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
  note: 'Con trai thứ 5 cụ Mậu Hách. Cử nhân Quản lý xã hội.',
});
addParentsChild(id_d25_hach, id_d25_hach_ba, id_d26_tuan);

// Con cụ Tuần Riệp (Mậu Thích)
const id_d26_chinh = addPerson({
  id: makeUUID(26, 4, 11),
  full_name: 'Nguyễn Mậu Chính',
  gender: 'male',
  generation: 26,
  birth_order: 1,
  birth_year: 1944,
  is_deceased: false,
  note: 'Con trai trưởng cụ Tuần Riệp (Mậu Thích). Ngành GTVT Cục Công trình 1.',
});
addParentsChild(id_d25_thich, id_d25_nho, id_d26_chinh);

const id_d26_chinh_ba = addPerson({
  id: makeUUID(26, 4, 12),
  full_name: 'Lê Thị Lan',
  gender: 'female',
  generation: 26,
  birth_year: 1949,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Chính, quê TP. Vinh.',
});
addMarriage(id_d26_chinh, id_d26_chinh_ba);

const id_d26_tung = addPerson({
  id: makeUUID(26, 4, 13),
  full_name: 'Nguyễn Mậu Tung',
  gender: 'male',
  generation: 26,
  birth_order: 2,
  birth_year: 1954,
  is_deceased: false,
  note: 'Con trai thứ 2 cụ Tuần Riệp. Cựu chiến binh lái xe tiền phương chiến dịch Hồ Chí Minh.',
});
addParentsChild(id_d25_thich, id_d25_nho, id_d26_tung);

const id_d26_tung_ba = addPerson({
  id: makeUUID(26, 4, 14),
  full_name: 'Bùi Thị Ngân',
  gender: 'female',
  generation: 26,
  birth_year: 1955,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Tung, Y sĩ Bệnh viện huyện Trực Ninh.',
});
addMarriage(id_d26_tung, id_d26_tung_ba);

const id_d26_thieng = addPerson({
  id: makeUUID(26, 4, 15),
  full_name: 'Nguyễn Mậu Thiềng',
  gender: 'male',
  generation: 26,
  birth_order: 3,
  birth_year: 1957,
  is_deceased: false,
  note: 'Con trai thứ 3 cụ Tuần Riệp. Phó ban Văn hóa xã.',
});
addParentsChild(id_d25_thich, id_d25_nho, id_d26_thieng);

const id_d26_thieng_ba = addPerson({
  id: makeUUID(26, 4, 16),
  full_name: 'Mai Thị Chuyển',
  gender: 'female',
  generation: 26,
  birth_year: 1962,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Thiềng, quê thôn An Lãng, Trực Chính.',
});
addMarriage(id_d26_thieng, id_d26_thieng_ba);

const id_d26_tu = addPerson({
  id: makeUUID(26, 4, 17),
  full_name: 'Nguyễn Mậu Tụ',
  gender: 'male',
  generation: 26,
  birth_order: 4,
  birth_year: 1959,
  is_deceased: false,
  note: 'Con trai thứ 4 cụ Tuần Riệp.',
});
addParentsChild(id_d25_thich, id_d25_nho, id_d26_tu);

const id_d26_tu_ba = addPerson({
  id: makeUUID(26, 4, 18),
  full_name: 'Nguyễn Thị Thoa',
  gender: 'female',
  generation: 26,
  birth_year: 1960,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Tụ.',
});
addMarriage(id_d26_tu, id_d26_tu_ba);

const id_d26_duc = addPerson({
  id: makeUUID(26, 4, 19),
  full_name: 'Nguyễn Mậu Đức (Liệt Sĩ)',
  gender: 'male',
  generation: 26,
  birth_order: 5,
  birth_year: 1949,
  death_year: 1969,
  death_day: 11,
  death_month: 8,
  death_lunar_day: 29,
  death_lunar_month: 6,
  death_lunar_year: 1969,
  is_deceased: true,
  note: 'Liệt sĩ chống Mỹ hy sinh ngày 29/6 Kỷ Dậu (11/8/1969) thọ 21 tuổi. Con trai Mẹ VNAH Đàm Thị Cách và cụ Tuần Riệp.',
});
addParentsChild(id_d25_thich, id_d25_cach, id_d26_duc);

// -----------------------------------------------------------------------------
// ĐỜI 27 (CHÁU NỘI CỤ HÁCH, CỤ TUẦN RIỆP, CỤ PHÓ HUỲNH)
// -----------------------------------------------------------------------------
const id_d27_duong = addPerson({
  id: makeUUID(27, 4, 1),
  full_name: 'Nguyễn Thị Thùy Dương',
  gender: 'female',
  generation: 27,
  birth_order: 1,
  birth_year: 1981,
  is_deceased: false,
  note: 'Con gái ông Nguyễn Mậu Thịnh, cháu nội cụ Mậu Hách.',
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
  note: 'Con gái ông Nguyễn Mậu Quân, cháu nội cụ Mậu Hách.',
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
  note: 'Con trai ông Nguyễn Mậu Quân, cháu nội cụ Mậu Hách.',
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
  note: 'Con gái ông Nguyễn Mậu Minh, cháu nội cụ Mậu Hách.',
});
addParentsChild(id_d26_minh, id_d26_minh_ba, id_d27_hien);

const id_d27_nam = addPerson({
  id: makeUUID(27, 4, 5),
  full_name: 'Nguyễn Mậu Nam',
  gender: 'male',
  generation: 27,
  birth_order: 1,
  birth_year: 1974,
  is_deceased: false,
  note: 'Con trai trưởng ông Nguyễn Mậu Chính. Tốt nghiệp ĐH Kinh tế Quốc dân, Kiểm toán Việt Nam.',
});
addParentsChild(id_d26_chinh, id_d26_chinh_ba, id_d27_nam);

const id_d27_giang = addPerson({
  id: makeUUID(27, 4, 6),
  full_name: 'Nguyễn Mậu Giang',
  gender: 'male',
  generation: 27,
  birth_order: 2,
  birth_year: 1976,
  is_deceased: false,
  note: 'Con trai thứ 2 ông Nguyễn Mậu Chính. ĐH Thương mại, Tổng công ty Điện thoại di động VN.',
});
addParentsChild(id_d26_chinh, id_d26_chinh_ba, id_d27_giang);

const id_d27_trung = addPerson({
  id: makeUUID(27, 4, 7),
  full_name: 'Nguyễn Mậu Trung',
  gender: 'male',
  generation: 27,
  birth_order: 1,
  birth_year: 1978,
  is_deceased: false,
  note: 'Con trai ông Nguyễn Mậu Tung. ĐH Xây dựng, Viện Thiết kế Bộ Quốc phòng.',
});
addParentsChild(id_d26_tung, id_d26_tung_ba, id_d27_trung);

const id_d27_thanhlong = addPerson({
  id: makeUUID(27, 4, 8),
  full_name: 'Nguyễn Mậu Thành Long',
  gender: 'male',
  generation: 27,
  birth_order: 1,
  birth_year: 1984,
  is_deceased: false,
  note: 'Con trai trưởng ông Nguyễn Mậu Thiềng.',
});
addParentsChild(id_d26_thieng, id_d26_thieng_ba, id_d27_thanhlong);

const id_d27_congthin = addPerson({
  id: makeUUID(27, 4, 9),
  full_name: 'Nguyễn Mậu Công Thìn',
  gender: 'male',
  generation: 27,
  birth_order: 2,
  birth_year: 1988,
  is_deceased: false,
  note: 'Con trai thứ 2 ông Nguyễn Mậu Thiềng.',
});
addParentsChild(id_d26_thieng, id_d26_thieng_ba, id_d27_congthin);

const id_d27_manhcuong = addPerson({
  id: makeUUID(27, 4, 10),
  full_name: 'Nguyễn Mậu Mạnh Cường',
  gender: 'male',
  generation: 27,
  birth_order: 1,
  birth_year: 1983,
  is_deceased: false,
  note: 'Con trai thứ nhất ông Nguyễn Mậu Tụ.',
});
addParentsChild(id_d26_tu, id_d26_tu_ba, id_d27_manhcuong);

const id_d27_manhhung = addPerson({
  id: makeUUID(27, 4, 11),
  full_name: 'Nguyễn Mậu Mạnh Hùng',
  gender: 'male',
  generation: 27,
  birth_order: 2,
  birth_year: 1988,
  is_deceased: false,
  note: 'Con trai thứ 2 ông Nguyễn Mậu Tụ.',
});
addParentsChild(id_d26_tu, id_d26_tu_ba, id_d27_manhhung);

// -----------------------------------------------------------------------------
// SỰ KIỆN TẾ TỰ DÒNG HỌ NGUYỄN MẬU (CUSTOM EVENTS)
// -----------------------------------------------------------------------------
customEvents.push({
  id: '22222222-2222-2222-2222-000000000001',
  name: 'Giỗ Thủy Tổ Nguyễn Mậu Thái (Phúc Hội)',
  event_date: '2026-07-18',
  content: 'Ngày kỵ nhật Thủy Tổ Họ Nguyễn Mậu tại Cổ Lễ (Mồng 5 tháng 6 Âm lịch). Con cháu toàn họ tề tựu tế lễ tại Từ đường Thượng Đền.',
  location: 'Từ đường Họ Nguyễn Mậu, Thôn Thượng Đền, Cổ Lễ',
});

customEvents.push({
  id: '22222222-2222-2222-2222-000000000002',
  name: 'Giỗ Tổ Tướng Công Nguyễn Mậu Hoàn (Ngành 4)',
  event_date: '2026-02-28',
  content: 'Ngày kỵ nhật Tướng Công Nguyễn Mậu Hoàn (Tự Tuấn Thông / Viết Nghĩa, 12 tháng Giêng Âm lịch). Triều đình cấp 100 mẫu ruộng và dân làng tế tự.',
  location: 'Từ đường Ngành 4, Thôn Thượng Đền, Cổ Lễ',
});

customEvents.push({
  id: '22222222-2222-2222-2222-000000000003',
  name: 'Giỗ Tổ Ngành Nhất Nguyễn Mậu Trường (Phúc Tiên)',
  event_date: '2026-11-09',
  content: 'Ngày kỵ nhật Tổ Ngành Nhất (Mồng 1 tháng 10 Âm lịch). Tế lễ tại Từ đường Ngành Nhất.',
  location: 'Từ đường Ngành Nhất, Thôn Thượng Đền',
});

customEvents.push({
  id: '22222222-2222-2222-2222-000000000004',
  name: 'Lễ Hội Chùa Cổ Lễ & Đền Thượng Lãng',
  event_date: '2026-10-24',
  content: 'Lễ hội truyền thống Chùa Cổ Lễ và Đền Thượng tưởng nhớ Đức Thánh Nguyễn Minh Không (13-16 tháng 9 Âm lịch).',
  location: 'Chùa Cổ Lễ & Đền Thượng Lãng',
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

console.log(`Generated Comprehensive JSON: ${persons.length} persons, ${relationships.length} relationships.`);

// Output SQL Seed
let sql = `-- =============================================================================
-- GIA PHẢ DÒNG HỌ NGUYỄN MẬU (CỔ LỄ, TRỰC NINH, NAM ĐỊNH) - SEED CHUẨN XÁC 100%
-- Trích từ: NGỌC PHẢ NGUYỄN MẬU TỘC (Bản đầy đủ 136 trang)
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
  sql += `INSERT INTO person_details_private (person_id, phone_number, occupation, current_residence) VALUES ('${priv.person_id}', ${sanitize(priv.phone_number)}, ${sanitize(priv.occupation)}, ${sanitize(priv.current_residence)});\n`;
}

sql += `\n-- 5. Thêm Sự kiện Tế tự Dòng họ (custom_events)\n`;
for (const ev of customEvents) {
  const sanitize = (val) => val === null || val === undefined ? 'NULL' : `'${String(val).replace(/'/g, "''")}'`;
  sql += `INSERT INTO custom_events (id, name, event_date, content, location) VALUES ('${ev.id}', ${sanitize(ev.name)}, '${ev.event_date}', ${sanitize(ev.content)}, ${sanitize(ev.location)});\n`;
}

sql += `\nCOMMIT;\n`;

fs.writeFileSync(
  path.join(__dirname, '../docs/seed_nguyen_mau_nganh4.sql'),
  sql,
  'utf8'
);

console.log(`Generated Comprehensive SQL Seed successfully.`);
