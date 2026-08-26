const fs = require('fs');
const path = require('path');

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

console.log('Generating ALL 4 Branches (Nganh 1, 2, 3, 4) from Ngoc Pha Nguyen Mau Full...');

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
  note: 'Đại Thắng Vương, Hoài Đạo Hiếu Vũ Vương thời Lý - Trần.',
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
  note: 'Tự Tùng Hạc, hiệu Phúc Sơ. Con thứ 6 cụ Nguyễn Trãi. Vua Lê Thánh Tông phong Tri châu.',
});
addParentsChild(id_d11_trai, id_d11_man, id_d12_anhvo);

const id_d13_giam = addPerson({
  id: makeUUID(13, 0, 1),
  full_name: 'Nguyễn Giám (Tự Giác Hiền)',
  gender: 'male',
  generation: 13,
  birth_order: 2,
  is_deceased: true,
  note: 'Đỗ Khảo trường Quốc Tử Giám triều Lê Hiến Tông năm Giáp Tý (1504).',
});
addChild(id_d12_anhvo, id_d13_giam);

const id_d14_truc = addPerson({
  id: makeUUID(14, 0, 1),
  full_name: 'Nguyễn Mậu Trực (Tự Phúc Văn)',
  gender: 'male',
  generation: 14,
  birth_order: 1,
  is_deceased: true,
  note: 'Đỗ Tiến sĩ quan trường khảo triều Mạc (1546).',
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

// =============================================================================
// NGÀNH 1 (PHÚC TIÊN)
// =============================================================================
// Đời 20
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

// Đời 21 (Ngành 1)
const id_d21_khai = addPerson({
  id: makeUUID(21, 1, 1),
  full_name: 'Nguyễn Mậu Khải',
  gender: 'male',
  generation: 21,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai cụ Phúc Tiên (Ngành 1). Sinh cụ Mậu Ngợi.',
});
addParentsChild(id_d20_truong, id_d20_truong_ba, id_d21_khai);

// Đời 22 (Ngành 1)
const id_d22_ngoi = addPerson({
  id: makeUUID(22, 1, 1),
  full_name: 'Nguyễn Mậu Ngợi',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con cụ Mậu Khải (Ngành 1). Sinh cụ Mậu Thân và cụ Mậu Hỗ.',
});
addChild(id_d21_khai, id_d22_ngoi);

// Đời 23 (Ngành 1)
const id_d23_than1 = addPerson({
  id: makeUUID(23, 1, 1),
  full_name: 'Nguyễn Mậu Thân',
  gender: 'male',
  generation: 23,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trưởng cụ Mậu Ngợi (Ngành 1). Sinh cụ Mậu Nhâm.',
});
addChild(id_d22_ngoi, id_d23_than1);

const id_d23_ho1 = addPerson({
  id: makeUUID(23, 1, 2),
  full_name: 'Nguyễn Mậu Hỗ',
  gender: 'male',
  generation: 23,
  birth_order: 2,
  is_deceased: true,
  note: 'Con thứ 2 cụ Mậu Ngợi (Ngành 1). Sinh cụ Mậu Hão.',
});
addChild(id_d22_ngoi, id_d23_ho1);

// Đời 24 (Ngành 1)
const id_d24_nham1 = addPerson({
  id: makeUUID(24, 1, 1),
  full_name: 'Nguyễn Mậu Nhâm',
  gender: 'male',
  generation: 24,
  birth_order: 1,
  is_deceased: true,
  note: 'Con cụ Mậu Thân (Ngành 1). Sinh cụ Mậu Phồn và cụ Mậu Dưỡng.',
});
addChild(id_d23_than1, id_d24_nham1);

const id_d24_hao1 = addPerson({
  id: makeUUID(24, 1, 2),
  full_name: 'Nguyễn Mậu Hão',
  gender: 'male',
  generation: 24,
  birth_order: 1,
  is_deceased: true,
  note: 'Con cụ Mậu Hỗ (Ngành 1). Sinh cụ Mậu Thoại (Mậu Nhận).',
});
addChild(id_d23_ho1, id_d24_hao1);

// Đời 25 (Ngành 1)
const id_d25_nhan1 = addPerson({
  id: makeUUID(25, 1, 1),
  full_name: 'Nguyễn Mậu Nhận (Mậu Thoại)',
  gender: 'male',
  generation: 25,
  birth_order: 1,
  birth_year: 1920,
  is_deceased: false,
  note: 'Con trai cụ Mậu Hão (Ngành 1). Sinh Canh Thân (1920). Vợ 1 Nguyễn Thị Đề, vợ 2 Vũ Thị Mẹ (1918).',
});
addChild(id_d24_hao1, id_d25_nhan1);

const id_d25_me1 = addPerson({
  id: makeUUID(25, 1, 2),
  full_name: 'Vũ Thị Mẹ',
  gender: 'female',
  generation: 25,
  birth_year: 1918,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Nhận (Ngành 1).',
});
addMarriage(id_d25_nhan1, id_d25_me1);

// Đời 26 (Ngành 1 - Con ông Nhận)
const id_d26_ha1 = addPerson({
  id: makeUUID(26, 1, 1),
  full_name: 'Nguyễn Mậu Hà',
  gender: 'male',
  generation: 26,
  birth_order: 1,
  birth_year: 1943,
  death_year: 2000,
  death_day: 4,
  death_month: 5,
  death_lunar_day: 1,
  death_lunar_month: 4,
  is_deceased: true,
  note: 'Con trai cụ Mậu Nhận (Ngành 1). Sinh 1943 mất 1/4 Canh Thìn (2000) thọ 58 tuổi. Vợ Hoàng Thị Là (1944).',
});
addParentsChild(id_d25_nhan1, id_d25_me1, id_d26_ha1);

const id_d26_ha1_ba = addPerson({
  id: makeUUID(26, 1, 2),
  full_name: 'Hoàng Thị Là',
  gender: 'female',
  generation: 26,
  birth_year: 1944,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Hà, quê Thanh Hoá.',
});
addMarriage(id_d26_ha1, id_d26_ha1_ba);

const id_d26_nga1 = addPerson({
  id: makeUUID(26, 1, 3),
  full_name: 'Nguyễn Mậu Nga',
  gender: 'male',
  generation: 26,
  birth_order: 2,
  birth_year: 1952,
  is_deceased: false,
  note: 'Con trai thứ 2 cụ Mậu Nhận (Ngành 1). Cán bộ Sở Tài chính Nam Hà. Vợ Phạm Thị Minh (1958).',
});
addParentsChild(id_d25_nhan1, id_d25_me1, id_d26_nga1);

const id_d26_nga1_ba = addPerson({
  id: makeUUID(26, 1, 4),
  full_name: 'Phạm Thị Minh',
  gender: 'female',
  generation: 26,
  birth_year: 1958,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Nga, quê Ý Yên.',
});
addMarriage(id_d26_nga1, id_d26_nga1_ba);

const id_d26_quang1 = addPerson({
  id: makeUUID(26, 1, 5),
  full_name: 'Nguyễn Mậu Quảng',
  gender: 'male',
  generation: 26,
  birth_order: 3,
  birth_year: 1958,
  is_deceased: false,
  note: 'Con trai thứ 3 cụ Mậu Nhận (Ngành 1). Trông coi quản lý Từ đường Đại tộc họ Nguyễn Mậu. Vợ Nguyễn Thị Loan (1963).',
});
addParentsChild(id_d25_nhan1, id_d25_me1, id_d26_quang1);

const id_d26_quang1_ba = addPerson({
  id: makeUUID(26, 1, 6),
  full_name: 'Nguyễn Thị Loan',
  gender: 'female',
  generation: 26,
  birth_year: 1963,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Quảng, quê Trung Đông.',
});
addMarriage(id_d26_quang1, id_d26_quang1_ba);

const id_d26_nguyet1 = addPerson({
  id: makeUUID(26, 1, 7),
  full_name: 'Nguyễn Thị Nguyệt',
  gender: 'female',
  generation: 26,
  birth_order: 4,
  birth_year: 1954,
  is_deceased: false,
  note: 'Con gái cụ Mậu Nhận. Chồng là Phan Văn Hỉ xóm Đền (xóm 9) Cổ Lễ.',
});
addParentsChild(id_d25_nhan1, id_d25_me1, id_d26_nguyet1);

const id_d26_thiet1 = addPerson({
  id: makeUUID(26, 1, 8),
  full_name: 'Nguyễn Thị Thiết',
  gender: 'female',
  generation: 26,
  birth_order: 5,
  birth_year: 1961,
  is_deceased: false,
  note: 'Con gái cụ Mậu Nhận. Chồng là Lưu Văn Điệp cùng làng.',
});
addParentsChild(id_d25_nhan1, id_d25_me1, id_d26_thiet1);

// Đời 27 (Ngành 1 - Cháu cụ Nhận)
const id_d27_ha1_con = addPerson({
  id: makeUUID(27, 1, 1),
  full_name: 'Nguyễn Mậu Hà',
  gender: 'male',
  generation: 27,
  birth_order: 1,
  birth_year: 1972,
  birth_month: 7,
  birth_day: 18,
  is_deceased: false,
  note: 'Con trai cả ông Nguyễn Mậu Hà (Ngành 1).',
});
addParentsChild(id_d26_ha1, id_d26_ha1_ba, id_d27_ha1_con);

const id_d27_kiem1 = addPerson({
  id: makeUUID(27, 1, 2),
  full_name: 'Nguyễn Mậu Kiềm',
  gender: 'male',
  generation: 27,
  birth_order: 2,
  birth_year: 1977,
  birth_month: 6,
  birth_day: 16,
  is_deceased: false,
  note: 'Con trai thứ 2 ông Nguyễn Mậu Hà (Ngành 1).',
});
addParentsChild(id_d26_ha1, id_d26_ha1_ba, id_d27_kiem1);

const id_d27_kiem1_em = addPerson({
  id: makeUUID(27, 1, 3),
  full_name: 'Nguyễn Mậu Kiệm',
  gender: 'male',
  generation: 27,
  birth_order: 3,
  birth_year: 1985,
  birth_month: 2,
  birth_day: 4,
  is_deceased: false,
  note: 'Con trai thứ 3 ông Nguyễn Mậu Hà (Ngành 1).',
});
addParentsChild(id_d26_ha1, id_d26_ha1_ba, id_d27_kiem1_em);

const id_d27_nguyen1 = addPerson({
  id: makeUUID(27, 1, 4),
  full_name: 'Nguyễn Thị Nguyện',
  gender: 'female',
  generation: 27,
  birth_order: 4,
  birth_year: 1974,
  birth_month: 4,
  birth_day: 4,
  is_deceased: false,
  note: 'Con gái ông Nguyễn Mậu Hà. Chồng ở làng Kênh.',
});
addParentsChild(id_d26_ha1, id_d26_ha1_ba, id_d27_nguyen1);

const id_d27_ngoc1 = addPerson({
  id: makeUUID(27, 1, 5),
  full_name: 'Nguyễn Thị Ngọc',
  gender: 'female',
  generation: 27,
  birth_order: 1,
  birth_year: 1981,
  birth_month: 9,
  birth_day: 19,
  is_deceased: false,
  note: 'Con gái ông Nguyễn Mậu Nga (Ngành 1).',
});
addParentsChild(id_d26_nga1, id_d26_nga1_ba, id_d27_ngoc1);

const id_d27_tuan1 = addPerson({
  id: makeUUID(27, 1, 6),
  full_name: 'Nguyễn Mậu Tuấn',
  gender: 'male',
  generation: 27,
  birth_order: 2,
  birth_year: 1983,
  birth_month: 5,
  birth_day: 3,
  is_deceased: false,
  note: 'Con trai ông Nguyễn Mậu Nga (Ngành 1).',
});
addParentsChild(id_d26_nga1, id_d26_nga1_ba, id_d27_tuan1);

const id_d27_phuong1 = addPerson({
  id: makeUUID(27, 1, 7),
  full_name: 'Nguyễn Thị Phượng',
  gender: 'female',
  generation: 27,
  birth_order: 1,
  birth_year: 1982,
  birth_month: 10,
  birth_day: 6,
  is_deceased: false,
  note: 'Con gái ông Nguyễn Mậu Quảng (Ngành 1).',
});
addParentsChild(id_d26_quang1, id_d26_quang1_ba, id_d27_phuong1);

const id_d27_nam1 = addPerson({
  id: makeUUID(27, 1, 8),
  full_name: 'Nguyễn Mậu Nam',
  gender: 'male',
  generation: 27,
  birth_order: 2,
  birth_year: 1984,
  birth_month: 7,
  birth_day: 1,
  is_deceased: false,
  note: 'Con trai trưởng ông Nguyễn Mậu Quảng (Ngành 1).',
});
addParentsChild(id_d26_quang1, id_d26_quang1_ba, id_d27_nam1);

const id_d27_son1 = addPerson({
  id: makeUUID(27, 1, 9),
  full_name: 'Nguyễn Mậu Sơn',
  gender: 'male',
  generation: 27,
  birth_order: 3,
  birth_year: 1986,
  birth_month: 6,
  birth_day: 17,
  is_deceased: false,
  note: 'Con trai thứ 2 ông Nguyễn Mậu Quảng (Ngành 1).',
});
addParentsChild(id_d26_quang1, id_d26_quang1_ba, id_d27_son1);

const id_d27_huong1 = addPerson({
  id: makeUUID(27, 1, 10),
  full_name: 'Nguyễn Thị Hường',
  gender: 'female',
  generation: 27,
  birth_order: 4,
  birth_year: 1990,
  birth_month: 8,
  birth_day: 24,
  is_deceased: false,
  note: 'Con gái thứ 2 ông Nguyễn Mậu Quảng (Ngành 1).',
});
addParentsChild(id_d26_quang1, id_d26_quang1_ba, id_d27_huong1);

// =============================================================================
// NGÀNH 2 (PHÚC KHOÁN)
// =============================================================================
// Đời 20
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

// Đời 21 (Ngành 2)
const id_d21_oai2 = addPerson({
  id: makeUUID(21, 2, 1),
  full_name: 'Nguyễn Mậu Oai',
  gender: 'male',
  generation: 21,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai cả Tổ Phúc Khoán (Ngành 2). Sinh cụ Mậu Sảng.',
});
addParentsChild(id_d20_rong, id_d20_rong_ba, id_d21_oai2);

// Đời 22 (Ngành 2)
const id_d22_sang2 = addPerson({
  id: makeUUID(22, 2, 1),
  full_name: 'Nguyễn Mậu Sảng',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con cụ Mậu Oai (Ngành 2). Sinh các cụ Mậu Sáng, Mậu Lung, Mậu Khoát, Mậu Ngửng.',
});
addChild(id_d21_oai2, id_d22_sang2);

// Đời 23 (Ngành 2)
const id_d23_khoat2 = addPerson({
  id: makeUUID(23, 2, 1),
  full_name: 'Nguyễn Mậu Khoát',
  gender: 'male',
  generation: 23,
  birth_order: 3,
  is_deceased: true,
  note: 'Con cụ Mậu Sảng (Ngành 2).',
});
addChild(id_d22_sang2, id_d23_khoat2);

// Đời 24 (Ngành 2)
const id_d24_khoay2 = addPerson({
  id: makeUUID(24, 2, 1),
  full_name: 'Nguyễn Mậu Khoáy',
  gender: 'male',
  generation: 24,
  birth_order: 1,
  birth_year: 1896,
  death_year: 1971,
  death_day: 17,
  death_month: 12,
  death_lunar_day: 30,
  death_lunar_month: 10,
  is_deceased: true,
  note: 'Sinh 1896 mất 30/10 Tân Hợi (17/12/1971) thọ 75 tuổi. Vợ 1 Nguyễn Thị Cẩm (1898-1946), vợ 2 Nguyễn Thị Khe (1906-1983).',
});
addChild(id_d23_khoat2, id_d24_khoay2);

const id_d24_cam2_ba = addPerson({
  id: makeUUID(24, 2, 2),
  full_name: 'Nguyễn Thị Cẩm',
  gender: 'female',
  generation: 24,
  birth_year: 1898,
  death_year: 1946,
  death_day: 17,
  death_month: 3,
  death_lunar_day: 14,
  death_lunar_month: 2,
  is_in_law: true,
  is_deceased: true,
  note: 'Chính thất cụ Mậu Khoáy, sinh Kỷ Hợi 1898 mất 14/2 Bính Tuất (1946) thọ 49 tuổi.',
});
addMarriage(id_d24_khoay2, id_d24_cam2_ba);

// Đời 25 (Ngành 2 - Con cụ Khoáy)
const id_d25_bong2 = addPerson({
  id: makeUUID(25, 2, 1),
  full_name: 'Nguyễn Mậu Bổng',
  gender: 'male',
  generation: 25,
  birth_order: 4,
  birth_year: 1920,
  is_deceased: false,
  note: 'Con trai cả cụ Mậu Khoáy (Ngành 2). Vợ Nguyễn Thị Khiếu (1928).',
});
addParentsChild(id_d24_khoay2, id_d24_cam2_ba, id_d25_bong2);

const id_d25_hai2 = addPerson({
  id: makeUUID(25, 2, 2),
  full_name: 'Nguyễn Mậu Hai',
  gender: 'male',
  generation: 25,
  birth_order: 5,
  birth_year: 1926,
  death_year: 1996,
  is_deceased: true,
  note: 'Con trai thứ 2 cụ Mậu Khoáy (Ngành 2). Sinh 1926 mất 1996 thọ 71 tuổi. Vợ 1 Nguyễn Thị Thoa (1926), vợ 2 Nguyễn Thị Nội.',
});
addParentsChild(id_d24_khoay2, id_d24_cam2_ba, id_d25_hai2);

const id_d25_kiem2 = addPerson({
  id: makeUUID(25, 2, 3),
  full_name: 'Nguyễn Mậu Kiểm',
  gender: 'male',
  generation: 25,
  birth_order: 6,
  birth_year: 1930,
  death_year: 1990,
  death_day: 15,
  death_month: 2,
  death_lunar_day: 20,
  death_lunar_month: 1,
  is_deceased: true,
  note: 'Con trai thứ 3 cụ Mậu Khoáy (Ngành 2). Sinh 1930 mất 20/1 Canh Ngọ (1990) thọ 61 tuổi. Vợ Nguyễn Thị Gần (1936).',
});
addParentsChild(id_d24_khoay2, id_d24_cam2_ba, id_d25_kiem2);

const id_d25_tinh2 = addPerson({
  id: makeUUID(25, 2, 4),
  full_name: 'Nguyễn Mậu Tịnh',
  gender: 'male',
  generation: 25,
  birth_order: 7,
  birth_year: 1935,
  death_year: 1992,
  death_day: 2,
  death_month: 7,
  death_lunar_day: 3,
  death_lunar_month: 6,
  is_deceased: true,
  note: 'Con trai thứ 4 cụ Mậu Khoáy (Ngành 2). Sinh 1935 mất 3/6 Nhâm Thân (1992) thọ 58 tuổi. Vợ Nguyễn Thị Làn (1937).',
});
addParentsChild(id_d24_khoay2, id_d24_cam2_ba, id_d25_tinh2);

const id_d25_thoat2 = addPerson({
  id: makeUUID(25, 2, 5),
  full_name: 'Nguyễn Mậu Thoát',
  gender: 'male',
  generation: 25,
  birth_order: 9,
  birth_year: 1943,
  death_year: 1993,
  death_day: 31,
  death_month: 1,
  death_lunar_day: 9,
  death_lunar_month: 1,
  is_deceased: true,
  note: 'Con trai út cụ Mậu Khoáy (Ngành 2). Sinh 1943 mất 9/1 Quý Dậu (1993) thọ 51 tuổi. Vợ Nguyễn Thị Thềm (1946).',
});
addParentsChild(id_d24_khoay2, id_d24_cam2_ba, id_d25_thoat2);

// =============================================================================
// NGÀNH 3 (PHÁP UYÊN)
// =============================================================================
// Đời 20
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

// Đời 21 (Ngành 3)
const id_d21_me3 = addPerson({
  id: makeUUID(21, 3, 1),
  full_name: 'Nguyễn Mậu Mễ',
  gender: 'male',
  generation: 21,
  birth_order: 1,
  is_deceased: true,
  note: 'Con trai cả Tổ Pháp Uyên (Ngành 3). Sinh cụ Mậu Giá.',
});
addParentsChild(id_d20_thiem, id_d20_thiem_ba, id_d21_me3);

// Đời 22 (Ngành 3)
const id_d22_gia3 = addPerson({
  id: makeUUID(22, 3, 1),
  full_name: 'Nguyễn Mậu Giá',
  gender: 'male',
  generation: 22,
  birth_order: 1,
  is_deceased: true,
  note: 'Con cụ Mậu Mễ (Ngành 3). Sinh cụ Mậu Từ.',
});
addChild(id_d21_me3, id_d22_gia3);

// Đời 23 (Ngành 3)
const id_d23_tu3 = addPerson({
  id: makeUUID(23, 3, 1),
  full_name: 'Nguyễn Mậu Từ',
  gender: 'male',
  generation: 23,
  birth_order: 1,
  is_deceased: true,
  note: 'Con cụ Mậu Giá (Ngành 3). Sinh cụ Mậu Uý và cụ Mậu Bi.',
});
addChild(id_d22_gia3, id_d23_tu3);

// Đời 24 (Ngành 3)
const id_d24_bi3 = addPerson({
  id: makeUUID(24, 3, 1),
  full_name: 'Nguyễn Mậu Bi',
  gender: 'male',
  generation: 24,
  birth_order: 2,
  death_lunar_day: 16,
  death_lunar_month: 5,
  is_deceased: true,
  note: 'Con trai thứ cụ Mậu Từ (Ngành 3). Giám tự từ đường Ngành 3. Giỗ 16/5 Âm lịch. Vợ Nguyễn Thị Rậu giỗ 15/6 Âm lịch.',
});
addChild(id_d23_tu3, id_d24_bi3);

const id_d24_bi3_ba = addPerson({
  id: makeUUID(24, 3, 2),
  full_name: 'Nguyễn Thị Rậu',
  gender: 'female',
  generation: 24,
  is_in_law: true,
  death_lunar_day: 15,
  death_lunar_month: 6,
  is_deceased: true,
  note: 'Vợ cụ Nguyễn Mậu Bi (Ngành 3), giỗ 15/6 Âm lịch.',
});
addMarriage(id_d24_bi3, id_d24_bi3_ba);

// Đời 25 (Ngành 3 - Con cụ Bi)
const id_d25_rang3 = addPerson({
  id: makeUUID(25, 3, 1),
  full_name: 'Nguyễn Mậu Rạng',
  gender: 'male',
  generation: 25,
  birth_order: 1,
  birth_year: 1930,
  death_year: 1987,
  death_day: 29,
  death_month: 4,
  death_lunar_day: 2,
  death_lunar_month: 4,
  is_deceased: true,
  note: 'Con trai cả cụ Mậu Bi (Ngành 3). Sinh 1930 mất 2/4 Đinh Mão (1987) thọ 58 tuổi. Vợ Nguyễn Thị Phú (1933).',
});
addParentsChild(id_d24_bi3, id_d24_bi3_ba, id_d25_rang3);

const id_d25_rang3_ba = addPerson({
  id: makeUUID(25, 3, 2),
  full_name: 'Nguyễn Thị Phú',
  gender: 'female',
  generation: 25,
  birth_year: 1933,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Rạng, sinh Quý Dậu (1933).',
});
addMarriage(id_d25_rang3, id_d25_rang3_ba);

const id_d25_sac3 = addPerson({
  id: makeUUID(25, 3, 3),
  full_name: 'Nguyễn Mậu Sắc',
  gender: 'male',
  generation: 25,
  birth_order: 2,
  birth_year: 1935,
  is_deceased: false,
  note: 'Con trai thứ 2 cụ Mậu Bi (Ngành 3). Trung uý QĐNDVN, Huân chương Kháng chiến chống Mỹ hạng Nhất. Vợ Kiều Thị Tứ (1963).',
});
addParentsChild(id_d24_bi3, id_d24_bi3_ba, id_d25_sac3);

const id_d25_khan3 = addPerson({
  id: makeUUID(25, 3, 4),
  full_name: 'Nguyễn Mậu Khẩn',
  gender: 'male',
  generation: 25,
  birth_order: 3,
  birth_year: 1942,
  is_deceased: false,
  note: 'Con trai thứ 3 cụ Mậu Bi (Ngành 3). Thanh niên xung phong Trường Sơn. Vợ Nguyễn Thị Mạch (1944).',
});
addParentsChild(id_d24_bi3, id_d24_bi3_ba, id_d25_khan3);

// Đời 26 (Ngành 3 - Con ông Rạng)
const id_d26_thuc3 = addPerson({
  id: makeUUID(26, 3, 1),
  full_name: 'Nguyễn Mậu Thức',
  gender: 'male',
  generation: 26,
  birth_order: 1,
  birth_year: 1952,
  is_deceased: false,
  note: 'Con trưởng ông Nguyễn Mậu Rạng (Ngành 3). Thiếu tá QĐNDVN, Bí thư Chi bộ kiêm Trưởng thôn Thượng Lãng (2000), Thư ký Ban biên soạn Phả tộc năm 2001. Vợ Phạm Thị Lan (1959).',
});
addParentsChild(id_d25_rang3, id_d25_rang3_ba, id_d26_thuc3);

const id_d26_thuc3_ba = addPerson({
  id: makeUUID(26, 3, 2),
  full_name: 'Phạm Thị Lan',
  gender: 'female',
  generation: 26,
  birth_year: 1959,
  is_in_law: true,
  is_deceased: false,
  note: 'Vợ ông Nguyễn Mậu Thức, thôn Quần Trà, Nam Thanh.',
});
addMarriage(id_d26_thuc3, id_d26_thuc3_ba);

const id_d26_phach3 = addPerson({
  id: makeUUID(26, 3, 3),
  full_name: 'Nguyễn Mậu Phách',
  gender: 'male',
  generation: 26,
  birth_order: 3,
  birth_year: 1957,
  is_deceased: false,
  note: 'Con trai thứ 2 ông Nguyễn Mậu Rạng (Ngành 3). Thiếu tá Công an huyện Nam Trực. Vợ Dương Thị Oanh (1958).',
});
addParentsChild(id_d25_rang3, id_d25_rang3_ba, id_d26_phach3);

const id_d26_dong3 = addPerson({
  id: makeUUID(26, 3, 4),
  full_name: 'Nguyễn Mậu Đông',
  gender: 'male',
  generation: 26,
  birth_order: 4,
  birth_year: 1959,
  is_deceased: false,
  note: 'Con trai thứ 3 ông Nguyễn Mậu Rạng (Ngành 3). Cán bộ Ngân hàng tỉnh Hà Nam. Vợ Nguyễn Thị Dung (1959).',
});
addParentsChild(id_d25_rang3, id_d25_rang3_ba, id_d26_dong3);

// Đời 27 (Ngành 3 - Cháu ông Rạng)
const id_d27_tuan3 = addPerson({
  id: makeUUID(27, 3, 1),
  full_name: 'Nguyễn Mậu Tuấn',
  gender: 'male',
  generation: 27,
  birth_order: 1,
  birth_year: 1983,
  is_deceased: false,
  note: 'Con trai cả ông Nguyễn Mậu Thức (Ngành 3).',
});
addParentsChild(id_d26_thuc3, id_d26_thuc3_ba, id_d27_tuan3);

const id_d27_toan3 = addPerson({
  id: makeUUID(27, 3, 2),
  full_name: 'Nguyễn Mậu Toàn',
  gender: 'male',
  generation: 27,
  birth_order: 2,
  birth_year: 1984,
  is_deceased: false,
  note: 'Con trai thứ 2 ông Nguyễn Mậu Thức (Ngành 3).',
});
addParentsChild(id_d26_thuc3, id_d26_thuc3_ba, id_d27_toan3);

// =============================================================================
// NGÀNH 4 (TƯỚNG CÔNG TUẤN HOÀN)
// =============================================================================
// Đời 20
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

// Đời 21 (Ngành 4)
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

const id_d21_cuchoa = addPerson({
  id: makeUUID(21, 4, 6),
  full_name: 'Nguyễn Thị Cúc Hoa',
  gender: 'female',
  generation: 21,
  birth_order: 5,
  death_lunar_day: 27,
  death_lunar_month: 2,
  is_deceased: true,
  note: 'Con gái Tổ Tuấn Hoàn. Mất sớm niên thiếu. Giỗ 27 tháng 2 Âm lịch.',
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
  note: 'Con gái Tổ Tuấn Hoàn. Mất sớm niên thiếu. Giỗ 27 tháng 2 Âm lịch.',
});
addParentsChild(id_d20_hoan, id_d20_hoan_ba, id_d21_ngochoa);

// Đời 22 (Ngành 4)
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
  note: 'Con trai thứ 1 cụ Mậu Giáo (Ngành 4). Sinh cụ Mậu Kiền và cụ Mậu Lễ.',
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

// Đời 23 (Ngành 4)
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

// Đời 24 (Ngành 4)
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

const id_d24_thuong_em = addPerson({
  id: makeUUID(24, 4, 24),
  full_name: 'Nguyễn Mậu Thường',
  gender: 'male',
  generation: 24,
  birth_order: 4,
  birth_year: 1904,
  death_year: 1945,
  death_lunar_day: 19,
  death_lunar_month: 2,
  death_lunar_year: 1945,
  is_deceased: true,
  note: 'Con trai thứ 3 cụ Quản Trắm. Sinh Giáp Thìn 1904 mất 19/2 Ất Dậu (1/4/1945) thọ 41 tuổi. Thân phụ cụ Trưởng nam Nguyễn Mậu Hách.',
});
addParentsChild(id_d24_tram, id_d24_tram_ba, id_d24_thuong_em);

const id_d24_my = addPerson({
  id: makeUUID(24, 4, 25),
  full_name: 'Vũ Thị Mỵ',
  gender: 'female',
  generation: 24,
  birth_year: 1912,
  death_year: 1990,
  death_lunar_day: 6,
  death_lunar_month: 1,
  death_lunar_year: 1990,
  is_in_law: true,
  is_deceased: true,
  note: 'Vợ cụ Nguyễn Mậu Thường, thân mẫu cụ Nguyễn Mậu Hách. Sinh Nhâm Tý 1912 mất 6/1 Canh Ngọ (1/2/1990) thọ 79 tuổi.',
});
addMarriage(id_d24_thuong_em, id_d24_my);

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
  note: 'Tuần tổng. Sinh 1903 mất 21/4 Tân Dậu (1981) thọ 79 tuổi. Vợ 1 Nguyễn Thị Hột (1905-1981), vợ 2 Nguyễn Thị Hồng (1923-1988).',
});
addParentsChild(id_d23_yeng, id_d23_gai, id_d24_hien);

const id_d24_hot = addPerson({
  id: makeUUID(24, 4, 51),
  full_name: 'Nguyễn Thị Hột',
  gender: 'female',
  generation: 24,
  birth_year: 1905,
  death_year: 1981,
  death_day: 10,
  death_month: 1,
  death_lunar_day: 5,
  death_lunar_month: 12,
  is_in_law: true,
  is_deceased: true,
  note: 'Chính thất cụ Tuần Liễn, mất 5/12 Canh Thân (10/1/1981) thọ 76 tuổi.',
});
addMarriage(id_d24_hien, id_d24_hot);

// Đời 25 (Ngành 4)
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
addParentsChild(id_d24_thuong_em, id_d24_my, id_d25_hach);

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
  birth_order: 6,
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

// 2. Con cụ Phó Huỳnh (Đủ 9 người con: 6 trai, 3 gái)
const id_d25_tuan_huynh = addPerson({
  id: makeUUID(25, 4, 40),
  full_name: 'Nguyễn Mậu Tuân',
  gender: 'male',
  generation: 25,
  birth_order: 1,
  birth_year: 1925,
  death_year: 1928,
  is_deceased: true,
  note: 'Con trai cả cụ Phó Huỳnh. Sinh năm Ất Sửu (1925), mất lúc 3 tuổi.',
});
addParentsChild(id_d24_huynh, id_d24_hat, id_d25_tuan_huynh);

const id_d25_nhi = addPerson({
  id: makeUUID(25, 4, 41),
  full_name: 'Nguyễn Thị Nhị',
  gender: 'female',
  generation: 25,
  birth_order: 2,
  birth_year: 1927,
  death_year: 1927,
  is_deceased: true,
  note: 'Con gái thứ 2 cụ Phó Huỳnh. Sinh năm Đinh Mão (1927), mất lúc 7 tháng tuổi.',
});
addParentsChild(id_d24_huynh, id_d24_hat, id_d25_nhi);

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
  note: 'Huyện ủy viên Trực Ninh. Con trai thứ 3 cụ Phó Huỳnh. Sinh 1929 mất 17/3 Mậu Dần (1998) thọ 70 tuổi.',
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
  note: 'Vợ cụ Nguyễn Mậu Điển, quê xứ Đông Thượng.',
});
addMarriage(id_d25_dien, id_d25_dien_ba);

const id_d25_nho_huynh = addPerson({
  id: makeUUID(25, 4, 42),
  full_name: 'Nguyễn Thị Nho',
  gender: 'female',
  generation: 25,
  birth_order: 4,
  birth_year: 1931,
  is_deceased: false,
  note: 'Con gái thứ 4 cụ Phó Huỳnh. Sinh năm Tân Mùi (1931). Chồng là Vũ Đức Thắng (1930) Nam Định.',
});
addParentsChild(id_d24_huynh, id_d24_hat, id_d25_nho_huynh);

const id_d25_mau_huynh = addPerson({
  id: makeUUID(25, 4, 44),
  full_name: 'Nguyễn Mậu',
  gender: 'male',
  generation: 25,
  birth_order: 5,
  birth_year: 1932,
  death_year: 1932,
  is_deceased: true,
  note: 'Con trai thứ 5 cụ Phó Huỳnh. Sinh năm Nhâm Thân (1932), mất lúc 6 ngày tuổi.',
});
addParentsChild(id_d24_huynh, id_d24_hat, id_d25_mau_huynh);

const id_d25_nhu_huynh = addPerson({
  id: makeUUID(25, 4, 43),
  full_name: 'Nguyễn Thị Nhu',
  gender: 'female',
  generation: 25,
  birth_order: 6,
  birth_year: 1934,
  death_year: 1936,
  is_deceased: true,
  note: 'Con gái thứ 6 cụ Phó Huỳnh. Sinh năm Giáp Tuất (1934), mất lúc 2 tuổi.',
});
addParentsChild(id_d24_huynh, id_d24_hat, id_d25_nhu_huynh);

const id_d25_tuong = addPerson({
  id: makeUUID(25, 4, 3),
  full_name: 'Nguyễn Mậu Tường',
  gender: 'male',
  generation: 25,
  birth_order: 7,
  birth_year: 1935,
  is_deceased: false,
  note: 'Trưởng ban biên soạn Ngọc Phả Nguyễn Mậu Tộc năm 2001. Sinh năm Ất Hợi (1935), con trai thứ 7 cụ Phó Huỳnh.',
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

const id_d25_dam_huynh = addPerson({
  id: makeUUID(25, 4, 45),
  full_name: 'Nguyễn Mậu Đam',
  gender: 'male',
  generation: 25,
  birth_order: 8,
  birth_year: 1941,
  death_year: 1942,
  is_deceased: true,
  note: 'Con trai thứ 8 cụ Phó Huỳnh. Sinh năm Tân Tỵ (1941), mất lúc 10 tháng tuổi.',
});
addParentsChild(id_d24_huynh, id_d24_hat, id_d25_dam_huynh);

const id_d25_ut_huynh = addPerson({
  id: makeUUID(25, 4, 46),
  full_name: 'Nguyễn Mậu Út',
  gender: 'male',
  generation: 25,
  birth_order: 9,
  birth_year: 1944,
  death_year: 1944,
  is_deceased: true,
  note: 'Con trai út thứ 9 cụ Phó Huỳnh. Sinh năm Giáp Thân (1944), mất lúc 6 ngày tuổi.',
});
addParentsChild(id_d24_huynh, id_d24_hat, id_d25_ut_huynh);

// Đời 26 (Ngành 4 - Con cụ Hách)
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
  note: 'Con gái cụ Mậu Hách. Chồng là Đặng Minh Khang ở Liên Tỉnh, Nam Trực.',
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

// Đời 27 (Ngành 4 - Cháu cụ Hách)
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

console.log(`Generated All 4 Branches JSON: ${persons.length} persons, ${relationships.length} relationships.`);

// Output SQL Seed
let sql = `-- =============================================================================
-- GIA PHẢ DÒNG HỌ NGUYỄN MẬU (CỔ LỄ, TRỰC NINH, NAM ĐỊNH) - TOÀN BỘ 4 NGÀNH
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

console.log(`Generated All 4 Branches SQL Seed successfully.`);
