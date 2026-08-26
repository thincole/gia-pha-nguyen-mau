import json

with open('data/gia_pha_nguyen_mau_nganh4.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

persons = data['persons']
relationships = data['relationships']
existing_ids = {p['id'] for p in persons}
rel_count = len(relationships) + 1

def make_uuid(gen, branch, index, sub=0):
    return f'00000000-0000-{gen:02d}{branch:02d}-{index:04d}-{sub:04d}00000000'

def add_person(p_dict):
    if p_dict['id'] in existing_ids:
        return p_dict['id']
    p = {
        'id': p_dict['id'],
        'full_name': p_dict['full_name'],
        'gender': p_dict.get('gender', 'male'),
        'generation': p_dict.get('generation', 1),
        'birth_order': p_dict.get('birth_order', None),
        'is_in_law': p_dict.get('is_in_law', False),
        'is_deceased': p_dict.get('is_deceased', False),
        'birth_year': p_dict.get('birth_year', None),
        'birth_month': p_dict.get('birth_month', None),
        'birth_day': p_dict.get('birth_day', None),
        'death_year': p_dict.get('death_year', None),
        'death_month': p_dict.get('death_month', None),
        'death_day': p_dict.get('death_day', None),
        'death_lunar_day': p_dict.get('death_lunar_day', None),
        'death_lunar_month': p_dict.get('death_lunar_month', None),
        'death_lunar_year': p_dict.get('death_lunar_year', None),
        'death_lunar_is_leap': p_dict.get('death_lunar_is_leap', False),
        'note': p_dict.get('note', ''),
        'avatar_url': None
    }
    persons.append(p)
    existing_ids.add(p['id'])
    return p['id']

def add_marriage(pA, pB):
    global rel_count
    relationships.append({
        'id': f'11111111-1111-1111-1111-{rel_count:012d}',
        'person_a': pA,
        'person_b': pB,
        'type': 'marriage'
    })
    rel_count += 1

def add_child(pParent, pChild, is_adopted=False):
    global rel_count
    relationships.append({
        'id': f'11111111-1111-1111-1111-{rel_count:012d}',
        'person_a': pParent,
        'person_b': pChild,
        'type': 'adopted_child' if is_adopted else 'biological_child'
    })
    rel_count += 1

def add_parents_child(pHusb, pWife, pChild, is_adopted=False):
    if pHusb: add_child(pHusb, pChild, is_adopted)
    if pWife: add_child(pWife, pChild, is_adopted)

id_d24_phuc = make_uuid(24, 4, 71)
id_d24_che = make_uuid(24, 4, 711)
id_d24_khanh = make_uuid(24, 4, 72)
id_d24_chuan = make_uuid(24, 4, 721)
id_d24_khuong = make_uuid(24, 4, 73)
id_d24_huong = make_uuid(24, 4, 74)
id_d24_phong = make_uuid(24, 4, 741)
id_d24_ruan = make_uuid(24, 4, 75)
id_d24_son_ruan = make_uuid(24, 4, 751)
id_d24_loan = make_uuid(24, 4, 90)
id_d24_coc = make_uuid(24, 4, 91)
id_d24_cuulinh = make_uuid(24, 4, 92)
id_d24_do = make_uuid(24, 4, 93)
id_d24_phung = make_uuid(24, 4, 94)
id_d24_chuyen = make_uuid(24, 4, 80)
id_d24_lac = make_uuid(24, 4, 81)
id_d24_tich = make_uuid(24, 4, 82)
id_d24_muc = make_uuid(24, 4, 83)
id_d24_gai_muc = make_uuid(24, 4, 84)
id_d24_mac = make_uuid(24, 4, 85)
id_d24_quyen_mac = make_uuid(24, 4, 86)
id_d24_tien = make_uuid(24, 4, 87)
id_d24_nhuan = make_uuid(24, 4, 88)
id_d24_ke3 = make_uuid(24, 3, 20)
id_d24_nay3 = make_uuid(24, 3, 21)

# Ngành 3
add_parents_child(id_d24_ke3, id_d24_nay3, add_person({'id': make_uuid(25, 3, 201), 'full_name': 'Nguyễn Thị Hen', 'gender': 'female', 'generation': 25, 'birth_order': 1, 'is_deceased': True, 'note': 'Con gái cụ Mậu Kế.'}))
add_parents_child(id_d24_ke3, id_d24_nay3, add_person({'id': make_uuid(25, 3, 202), 'full_name': 'Nguyễn Thị Nhài', 'gender': 'female', 'generation': 25, 'birth_order': 2, 'is_deceased': True, 'note': 'Con gái cụ Mậu Kế. Lấy ông Nguyễn Gia Hãnh.'}))
add_parents_child(id_d24_ke3, id_d24_nay3, add_person({'id': make_uuid(25, 3, 203), 'full_name': 'Nguyễn Thị Khởi', 'gender': 'female', 'generation': 25, 'birth_order': 3, 'is_deceased': True, 'note': 'Con gái cụ Mậu Kế.'}))
add_parents_child(id_d24_ke3, id_d24_nay3, add_person({'id': make_uuid(25, 3, 204), 'full_name': 'Nguyễn Mậu Khuyến', 'gender': 'male', 'generation': 25, 'birth_order': 4, 'is_deceased': True, 'note': 'Con trai cụ Mậu Kế, mất nhỏ.'}))

# Ngành 4 - Chuyên, Lạc, Tích, Mục
add_child(id_d24_chuyen, add_person({'id': make_uuid(25, 4, 801), 'full_name': 'Nguyễn Mậu Đoàn', 'gender': 'male', 'generation': 25, 'birth_order': 1, 'is_deceased': True, 'note': 'Con trai cụ Mậu Chuyên.'}))
add_child(id_d24_chuyen, add_person({'id': make_uuid(25, 4, 802), 'full_name': 'Nguyễn Thị Được', 'gender': 'female', 'generation': 25, 'birth_order': 2, 'is_deceased': True, 'note': 'Con gái cụ Mậu Chuyên.'}))
add_child(id_d24_lac, add_person({'id': make_uuid(25, 4, 811), 'full_name': 'Nguyễn Mậu Hỉ', 'gender': 'male', 'generation': 25, 'birth_order': 1, 'birth_year': 1922, 'is_deceased': True, 'note': 'Con trai cả cụ Mậu Lạc.'}))
add_child(id_d24_lac, add_person({'id': make_uuid(25, 4, 812), 'full_name': 'Nguyễn Mậu Lộ', 'gender': 'male', 'generation': 25, 'birth_order': 2, 'birth_year': 1924, 'is_deceased': True, 'note': 'Con trai thứ 2 cụ Mậu Lạc.'}))
add_child(id_d24_lac, add_person({'id': make_uuid(25, 4, 813), 'full_name': 'Nguyễn Mậu Bội', 'gender': 'male', 'generation': 25, 'birth_order': 3, 'birth_year': 1928, 'is_deceased': True, 'note': 'Con trai thứ 3 cụ Mậu Lạc.'}))
add_child(id_d24_tich, add_person({'id': make_uuid(25, 4, 821), 'full_name': 'Nguyễn Mậu Chức', 'gender': 'male', 'generation': 25, 'birth_order': 1, 'is_deceased': True, 'note': 'Con trai cụ Mậu Tích.'}))
add_parents_child(id_d24_muc, id_d24_gai_muc, add_person({'id': make_uuid(25, 4, 831), 'full_name': 'Nguyễn Mậu Muôn', 'gender': 'male', 'generation': 25, 'birth_order': 1, 'is_deceased': True, 'note': 'Con trai cả cụ Mậu Mục.'}))
add_parents_child(id_d24_muc, id_d24_gai_muc, add_person({'id': make_uuid(25, 4, 832), 'full_name': 'Nguyễn Mậu Vạn', 'gender': 'male', 'generation': 25, 'birth_order': 2, 'is_deceased': True, 'note': 'Con trai thứ 2 cụ Mậu Mục.'}))
add_parents_child(id_d24_muc, id_d24_gai_muc, add_person({'id': make_uuid(25, 4, 833), 'full_name': 'Nguyễn Thị Chẵn', 'gender': 'female', 'generation': 25, 'birth_order': 3, 'is_deceased': True, 'note': 'Con gái cụ Mậu Mục.'}))
add_parents_child(id_d24_muc, id_d24_gai_muc, add_person({'id': make_uuid(25, 4, 834), 'full_name': 'Nguyễn Thị Lẻ', 'gender': 'female', 'generation': 25, 'birth_order': 4, 'is_deceased': True, 'note': 'Con gái cụ Mậu Mục.'}))

# Mạc
id_nhien = add_person({'id': make_uuid(25, 4, 854), 'full_name': 'Nguyễn Mậu Nhiên', 'gender': 'male', 'generation': 25, 'birth_order': 4, 'birth_year': 1939, 'death_year': 1995, 'is_deceased': True, 'note': 'Con trai cụ Mậu Mạc.'})
add_parents_child(id_d24_mac, id_d24_quyen_mac, id_nhien)
id_huyen = add_person({'id': make_uuid(26, 4, 8541), 'full_name': 'Nguyễn Mậu Huyên', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'birth_year': 1968, 'is_deceased': False, 'note': 'Con trai cả cụ Mậu Nhiên.'})
id_binh_h = add_person({'id': make_uuid(26, 4, 8542), 'full_name': 'Nguyễn Thị Bình', 'gender': 'female', 'generation': 26, 'birth_year': 1971, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Huyên.'})
add_child(id_nhien, id_huyen)
add_marriage(id_huyen, id_binh_h)
add_parents_child(id_huyen, id_binh_h, add_person({'id': make_uuid(27, 4, 85411), 'full_name': 'Nguyễn Thị Linh', 'gender': 'female', 'generation': 27, 'birth_order': 1, 'birth_year': 1990, 'is_deceased': False, 'note': 'Con gái ông Huyên.'}))
add_parents_child(id_huyen, id_binh_h, add_person({'id': make_uuid(27, 4, 85412), 'full_name': 'Nguyễn Mậu Anh', 'gender': 'male', 'generation': 27, 'birth_order': 2, 'birth_year': 1994, 'is_deceased': False, 'note': 'Con trai ông Huyên.'}))

id_thuyet = add_person({'id': make_uuid(26, 4, 8543), 'full_name': 'Nguyễn Mậu Thuyết', 'gender': 'male', 'generation': 26, 'birth_order': 2, 'birth_year': 1970, 'is_deceased': False, 'note': 'Con trai thứ 2 cụ Mậu Nhiên.'})
id_tuoi_t = add_person({'id': make_uuid(26, 4, 8544), 'full_name': 'Trần Thị Tươi', 'gender': 'female', 'generation': 26, 'birth_year': 1970, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Thuyết.'})
add_child(id_nhien, id_thuyet)
add_marriage(id_thuyet, id_tuoi_t)
add_parents_child(id_thuyet, id_tuoi_t, add_person({'id': make_uuid(27, 4, 85431), 'full_name': 'Nguyễn Mậu Thành', 'gender': 'male', 'generation': 27, 'birth_order': 1, 'birth_year': 1993, 'is_deceased': False, 'note': 'Con trai ông Thuyết.'}))

id_be = add_person({'id': make_uuid(26, 4, 8545), 'full_name': 'Nguyễn Mậu Bé (Minh)', 'gender': 'male', 'generation': 26, 'birth_order': 3, 'birth_year': 1972, 'is_deceased': False, 'note': 'Con trai thứ 3 cụ Mậu Nhiên.'})
id_tam_b = add_person({'id': make_uuid(26, 4, 8546), 'full_name': 'Nguyễn Thị Tâm (Vợ ông Bé)', 'gender': 'female', 'generation': 26, 'birth_year': 1976, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Bé.'})
add_child(id_nhien, id_be)
add_marriage(id_be, id_tam_b)
add_parents_child(id_be, id_tam_b, add_person({'id': make_uuid(27, 4, 85451), 'full_name': 'Nguyễn Mậu Minh', 'gender': 'male', 'generation': 27, 'birth_order': 1, 'birth_year': 2001, 'is_deceased': False, 'note': 'Con trai ông Bé.'}))

# Tiến
id_thi = add_person({'id': make_uuid(25, 4, 871), 'full_name': 'Nguyễn Mậu Thi', 'gender': 'male', 'generation': 25, 'birth_order': 1, 'birth_year': 1937, 'is_deceased': True, 'note': 'Con trai cụ Mậu Tiến.'})
add_parents_child(id_d24_tien, id_d24_nhuan, id_thi)
id_tuan_thi = add_person({'id': make_uuid(26, 4, 8711), 'full_name': 'Nguyễn Mậu Tuấn', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'birth_year': 1959, 'is_deceased': False, 'note': 'Con trai cả cụ Mậu Thi.'})
add_child(id_thi, id_tuan_thi)
add_child(id_tuan_thi, add_person({'id': make_uuid(27, 4, 87111), 'full_name': 'Nguyễn Mậu Tú', 'gender': 'male', 'generation': 27, 'birth_order': 1, 'birth_year': 1981, 'is_deceased': False, 'note': 'Con trai ông Tuấn.'}))
add_child(id_tuan_thi, add_person({'id': make_uuid(27, 4, 87112), 'full_name': 'Nguyễn Thị Trà My', 'gender': 'female', 'generation': 27, 'birth_order': 2, 'birth_year': 1992, 'is_deceased': False, 'note': 'Con gái ông Tuấn.'}))

id_hung_thi = add_person({'id': make_uuid(26, 4, 8712), 'full_name': 'Nguyễn Mậu Hùng', 'gender': 'male', 'generation': 26, 'birth_order': 2, 'birth_year': 1964, 'is_deceased': False, 'note': 'Con trai thứ 2 cụ Mậu Thi.'})
id_oanh_h = add_person({'id': make_uuid(26, 4, 8713), 'full_name': 'Trần Thị Oanh', 'gender': 'female', 'generation': 26, 'birth_year': 1965, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Hùng.'})
add_child(id_thi, id_hung_thi)
add_marriage(id_hung_thi, id_oanh_h)
add_parents_child(id_hung_thi, id_oanh_h, add_person({'id': make_uuid(27, 4, 87121), 'full_name': 'Nguyễn Thị Như Nga', 'gender': 'female', 'generation': 27, 'birth_order': 1, 'birth_year': 1991, 'is_deceased': False, 'note': 'Con gái ông Hùng.'}))
add_parents_child(id_hung_thi, id_oanh_h, add_person({'id': make_uuid(27, 4, 87122), 'full_name': 'Nguyễn Mậu Huy (con ông Hùng)', 'gender': 'male', 'generation': 27, 'birth_order': 2, 'birth_year': 2001, 'is_deceased': False, 'note': 'Con trai ông Hùng.'}))

# Phúc
add_parents_child(id_d24_phuc, id_d24_che, add_person({'id': make_uuid(25, 4, 712), 'full_name': 'Nguyễn Thị Mão', 'gender': 'female', 'generation': 25, 'birth_order': 1, 'birth_year': 1939, 'is_deceased': False, 'note': 'Con gái cả cụ Mậu Phúc.'}))
id_loc = add_person({'id': make_uuid(25, 4, 713), 'full_name': 'Nguyễn Mậu Lộc', 'gender': 'male', 'generation': 25, 'birth_order': 2, 'birth_year': 1940, 'is_deceased': False, 'note': 'Con trai cả cụ Mậu Phúc.'})
id_sen_l = add_person({'id': make_uuid(25, 4, 714), 'full_name': 'Vũ Thị Sen (Vợ ông Lộc)', 'gender': 'female', 'generation': 25, 'birth_year': 1972, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Lộc.'})
add_parents_child(id_d24_phuc, id_d24_che, id_loc)
add_marriage(id_loc, id_sen_l)
add_parents_child(id_loc, id_sen_l, add_person({'id': make_uuid(26, 4, 7131), 'full_name': 'Nguyễn Mậu An', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'birth_year': 1997, 'is_deceased': False, 'note': 'Con trai ông Lộc.'}))

id_uong = add_person({'id': make_uuid(25, 4, 715), 'full_name': 'Nguyễn Mậu Ương', 'gender': 'male', 'generation': 25, 'birth_order': 3, 'birth_year': 1946, 'is_deceased': False, 'note': 'Con trai thứ 2 cụ Mậu Phúc.'})
id_hai_u = add_person({'id': make_uuid(25, 4, 716), 'full_name': 'Đinh Thị Hải', 'gender': 'female', 'generation': 25, 'birth_year': 1981, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Ương.'})
add_parents_child(id_d24_phuc, id_d24_che, id_uong)
add_marriage(id_uong, id_hai_u)
add_parents_child(id_uong, id_hai_u, add_person({'id': make_uuid(26, 4, 7151), 'full_name': 'Nguyễn Mậu Dương (con ông Ương)', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'birth_year': 1978, 'is_deceased': False, 'note': 'Con trai ông Ương.'}))

id_bao = add_person({'id': make_uuid(25, 4, 718), 'full_name': 'Nguyễn Mậu Bảo', 'gender': 'male', 'generation': 25, 'birth_order': 5, 'birth_year': 1954, 'is_deceased': False, 'note': 'Con trai thứ 3 cụ Mậu Phúc.'})
add_parents_child(id_d24_phuc, id_d24_che, id_bao)
add_child(id_bao, add_person({'id': make_uuid(26, 4, 7181), 'full_name': 'Nguyễn Mậu Bột', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'birth_year': 1980, 'is_deceased': False, 'note': 'Con trai ông Bảo.'}))

# Khanh
id_tuan_k = add_person({'id': make_uuid(25, 4, 722), 'full_name': 'Nguyễn Mậu Tuấn (con cụ Khanh)', 'gender': 'male', 'generation': 25, 'birth_order': 1, 'is_deceased': False, 'note': 'Con trai cụ Mậu Khanh.'})
add_parents_child(id_d24_khanh, id_d24_chuan, id_tuan_k)
add_child(id_tuan_k, add_person({'id': make_uuid(26, 4, 7221), 'full_name': 'Nguyễn Mậu Thọ', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'birth_year': 1981, 'is_deceased': False, 'note': 'Con trai cả ông Tuấn.'}))
add_child(id_tuan_k, add_person({'id': make_uuid(26, 4, 7222), 'full_name': 'Nguyễn Mậu Dương (con ông Tuấn)', 'gender': 'male', 'generation': 26, 'birth_order': 2, 'birth_year': 1983, 'is_deceased': False, 'note': 'Con trai thứ 2 ông Tuấn.'}))

# Hưởng
id_tuong_h = add_person({'id': make_uuid(25, 4, 742), 'full_name': 'Nguyễn Mậu Tưởng', 'gender': 'male', 'generation': 25, 'birth_order': 1, 'birth_year': 1941, 'is_deceased': False, 'note': 'Con trai cả cụ Mậu Hưởng.'})
id_van_t = add_person({'id': make_uuid(25, 4, 743), 'full_name': 'Dương Thị Vân', 'gender': 'female', 'generation': 25, 'birth_year': 1947, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Tưởng.'})
add_parents_child(id_d24_huong, id_d24_phong, id_tuong_h)
add_marriage(id_tuong_h, id_van_t)
add_parents_child(id_tuong_h, id_van_t, add_person({'id': make_uuid(26, 4, 7421), 'full_name': 'Nguyễn Thị Vị', 'gender': 'female', 'generation': 26, 'birth_order': 1, 'birth_year': 1969, 'is_deceased': False, 'note': 'Con gái ông Tưởng.'}))
id_thang_t = add_person({'id': make_uuid(26, 4, 7422), 'full_name': 'Nguyễn Mậu Thắng (con ông Tưởng)', 'gender': 'male', 'generation': 26, 'birth_order': 2, 'birth_year': 1971, 'is_deceased': False, 'note': 'Con trai ông Tưởng.'})
id_thai_t = add_person({'id': make_uuid(26, 4, 7423), 'full_name': 'Nguyễn Thị Thái', 'gender': 'female', 'generation': 26, 'birth_year': 1973, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Thắng.'})
add_parents_child(id_tuong_h, id_van_t, id_thang_t)
add_marriage(id_thang_t, id_thai_t)

id_dinh_h = add_person({'id': make_uuid(25, 4, 746), 'full_name': 'Nguyễn Mậu Đỉnh', 'gender': 'male', 'generation': 25, 'birth_order': 5, 'birth_year': 1952, 'is_deceased': False, 'note': 'Con trai thứ 3 cụ Mậu Hưởng.'})
id_thanh_d = add_person({'id': make_uuid(25, 4, 747), 'full_name': 'Tạ Thị Thanh', 'gender': 'female', 'generation': 25, 'birth_year': 1952, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Đỉnh.'})
add_parents_child(id_d24_huong, id_d24_phong, id_dinh_h)
add_marriage(id_dinh_h, id_thanh_d)
add_parents_child(id_dinh_h, id_thanh_d, add_person({'id': make_uuid(26, 4, 7461), 'full_name': 'Nguyễn Mậu Hùng (con ông Đỉnh)', 'gender': 'male', 'generation': 26, 'birth_order': 4, 'birth_year': 1990, 'is_deceased': False, 'note': 'Con trai ông Đỉnh.'}))

id_ngu_h = add_person({'id': make_uuid(25, 4, 748), 'full_name': 'Nguyễn Mậu Ngũ (con cụ Hưởng)', 'gender': 'male', 'generation': 25, 'birth_order': 6, 'birth_year': 1954, 'is_deceased': False, 'note': 'Con trai thứ 4 cụ Mậu Hưởng.'})
id_tuyet_n = add_person({'id': make_uuid(25, 4, 749), 'full_name': 'Trần Thị Tuyết (Vợ ông Ngũ)', 'gender': 'female', 'generation': 25, 'birth_year': 1960, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Ngũ.'})
add_parents_child(id_d24_huong, id_d24_phong, id_ngu_h)
add_marriage(id_ngu_h, id_tuyet_n)
add_parents_child(id_ngu_h, id_tuyet_n, add_person({'id': make_uuid(26, 4, 7481), 'full_name': 'Nguyễn Mậu Tứ (con ông Ngũ)', 'gender': 'male', 'generation': 26, 'birth_order': 3, 'birth_year': 1994, 'is_deceased': False, 'note': 'Con trai ông Ngũ.'}))

id_bay_h = add_person({'id': make_uuid(25, 4, 750), 'full_name': 'Nguyễn Mậu Bảy (con cụ Hưởng)', 'gender': 'male', 'generation': 25, 'birth_order': 8, 'birth_year': 1962, 'is_deceased': False, 'note': 'Con trai thứ 5 cụ Mậu Hưởng.'})
id_luong_b = add_person({'id': make_uuid(25, 4, 7511), 'full_name': 'Vũ Thị Lương', 'gender': 'female', 'generation': 25, 'birth_year': 1964, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Bảy.'})
add_parents_child(id_d24_huong, id_d24_phong, id_bay_h)
add_marriage(id_bay_h, id_luong_b)
add_parents_child(id_bay_h, id_luong_b, add_person({'id': make_uuid(26, 4, 7501), 'full_name': 'Nguyễn Mậu Công Văn', 'gender': 'male', 'generation': 26, 'birth_order': 2, 'birth_year': 1988, 'is_deceased': False, 'note': 'Con trai ông Bảy.'}))

# Ruân
id_thinh_r = add_person({'id': make_uuid(25, 4, 752), 'full_name': 'Nguyễn Mậu Thịnh (Liệt Sĩ)', 'gender': 'male', 'generation': 25, 'birth_order': 2, 'birth_year': 1946, 'death_year': 1969, 'is_deceased': True, 'note': 'Liệt sĩ con cụ Mậu Ruân.'})
add_parents_child(id_d24_ruan, id_d24_son_ruan, id_thinh_r)
id_quat_r = add_person({'id': make_uuid(25, 4, 753), 'full_name': 'Nguyễn Mậu Quát', 'gender': 'male', 'generation': 25, 'birth_order': 3, 'birth_year': 1951, 'is_deceased': False, 'note': 'Con trai thứ 2 cụ Mậu Ruân.'})
id_hi_q = add_person({'id': make_uuid(25, 4, 754), 'full_name': 'Nguyễn Thị Hỉ', 'gender': 'female', 'generation': 25, 'birth_year': 1960, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Quát.'})
add_parents_child(id_d24_ruan, id_d24_son_ruan, id_quat_r)
add_marriage(id_quat_r, id_hi_q)
add_parents_child(id_quat_r, id_hi_q, add_person({'id': make_uuid(26, 4, 7531), 'full_name': 'Nguyễn Mậu Hiển (Hải)', 'gender': 'male', 'generation': 26, 'birth_order': 3, 'birth_year': 1986, 'is_deceased': False, 'note': 'Con trai ông Quát.'}))

id_dan_r = add_person({'id': make_uuid(25, 4, 755), 'full_name': 'Nguyễn Mậu Đan', 'gender': 'male', 'generation': 25, 'birth_order': 5, 'birth_year': 1958, 'is_deceased': False, 'note': 'Con trai thứ 3 cụ Mậu Ruân.'})
id_thanh_dan = add_person({'id': make_uuid(25, 4, 756), 'full_name': 'Nguyễn Thị Thanh (Vợ ông Đan)', 'gender': 'female', 'generation': 25, 'birth_year': 1966, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Đan.'})
add_parents_child(id_d24_ruan, id_d24_son_ruan, id_dan_r)
add_marriage(id_dan_r, id_thanh_dan)
add_parents_child(id_dan_r, id_thanh_dan, add_person({'id': make_uuid(26, 4, 7551), 'full_name': 'Nguyễn Mậu Hùng (Đức)', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'is_deceased': False, 'note': 'Con trai ông Đan ở Đức.'}))

# Cửu Linh
id_lekhanh = add_person({'id': make_uuid(25, 4, 921), 'full_name': 'Nguyễn Mậu Lê Khanh', 'gender': 'male', 'generation': 25, 'birth_order': 3, 'birth_year': 1927, 'is_deceased': True, 'note': 'Con trai cả cụ Cửu Linh.'})
id_lien_lk = add_person({'id': make_uuid(25, 4, 922), 'full_name': 'Đoàn Thị Kim Liên', 'gender': 'female', 'generation': 25, 'birth_year': 1928, 'is_in_law': True, 'is_deceased': True, 'note': 'Vợ cụ Lê Khanh.'})
add_parents_child(id_d24_cuulinh, id_d24_do, id_lekhanh)
add_marriage(id_lekhanh, id_lien_lk)

id_thanhbinh = add_person({'id': make_uuid(26, 4, 9211), 'full_name': 'Nguyễn Mậu Thanh Bình', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'birth_year': 1953, 'is_deceased': False, 'note': 'Con trai cụ Lê Khanh.'})
id_loan_tb = add_person({'id': make_uuid(26, 4, 9212), 'full_name': 'Phạm Thị Phương Loan', 'gender': 'female', 'generation': 26, 'birth_year': 1959, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Thanh Bình.'})
add_parents_child(id_lekhanh, id_lien_lk, id_thanhbinh)
add_marriage(id_thanhbinh, id_loan_tb)
add_parents_child(id_thanhbinh, id_loan_tb, add_person({'id': make_uuid(27, 4, 92111), 'full_name': 'Nguyễn Mậu Trung Kiên', 'gender': 'male', 'generation': 27, 'birth_order': 1, 'birth_year': 1983, 'is_deceased': False, 'note': 'Con trai ông Thanh Bình.'}))
add_parents_child(id_thanhbinh, id_loan_tb, add_person({'id': make_uuid(27, 4, 92112), 'full_name': 'Nguyễn Thị Phương Mai', 'gender': 'female', 'generation': 27, 'birth_order': 2, 'birth_year': 1984, 'is_deceased': False, 'note': 'Con gái ông Thanh Bình.'}))

id_lelong = add_person({'id': make_uuid(25, 4, 923), 'full_name': 'Nguyễn Mậu Lê Long', 'gender': 'male', 'generation': 25, 'birth_order': 9, 'birth_year': 1940, 'is_deceased': False, 'note': 'Con trai thứ cụ Cửu Linh.'})
add_parents_child(id_d24_cuulinh, id_d24_phung, id_lelong)
add_child(id_lelong, add_person({'id': make_uuid(26, 4, 9231), 'full_name': 'Nguyễn Mậu Lê Minh', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'birth_year': 1964, 'is_deceased': False, 'note': 'Con trai cả ông Lê Long.'}))
add_child(id_lelong, add_person({'id': make_uuid(26, 4, 9232), 'full_name': 'Nguyễn Mậu Lê Sơn', 'gender': 'male', 'generation': 26, 'birth_order': 2, 'birth_year': 1969, 'is_deceased': False, 'note': 'Con trai thứ 2 ông Lê Long.'}))
add_child(id_lelong, add_person({'id': make_uuid(26, 4, 9233), 'full_name': 'Nguyễn Mậu Lê Quyền', 'gender': 'male', 'generation': 26, 'birth_order': 3, 'birth_year': 1979, 'is_deceased': False, 'note': 'Con trai thứ 3 ông Lê Long.'}))

id_lebang = add_person({'id': make_uuid(25, 4, 924), 'full_name': 'Nguyễn Mậu Lê Bằng', 'gender': 'male', 'generation': 25, 'birth_order': 10, 'birth_year': 1944, 'is_deceased': False, 'note': 'Con trai thứ 3 cụ Cửu Linh.'})
add_parents_child(id_d24_cuulinh, id_d24_phung, id_lebang)
add_child(id_lebang, add_person({'id': make_uuid(26, 4, 9241), 'full_name': 'Nguyễn Mậu Lê Hùng', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'birth_year': 1975, 'is_deceased': False, 'note': 'Con trai ông Lê Bằng.'}))

# Ngành 2 (Ngoãn & Viễn)
id_d25_ngoan2 = add_person({'id': make_uuid(25, 2, 80), 'full_name': 'Nguyễn Mậu Ngoãn', 'gender': 'male', 'generation': 25, 'birth_order': 1, 'is_deceased': True, 'note': 'Chi cụ Nguyễn Mậu Ngoãn.'})
id_dien_n = add_person({'id': make_uuid(26, 2, 801), 'full_name': 'Nguyễn Mậu Điện (Ngành 2)', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'birth_year': 1954, 'is_deceased': False, 'note': 'Con trai trưởng cụ Mậu Ngoãn.'})
id_gai_d = add_person({'id': make_uuid(26, 2, 802), 'full_name': 'Nguyễn Thị Gái (Vợ ông Điện)', 'gender': 'female', 'generation': 26, 'birth_year': 1955, 'is_in_law': True, 'is_deceased': False, 'note': 'Vợ ông Điện.'})
add_child(id_d25_ngoan2, id_dien_n)
add_marriage(id_dien_n, id_gai_d)
add_parents_child(id_dien_n, id_gai_d, add_person({'id': make_uuid(27, 2, 8011), 'full_name': 'Nguyễn Mậu Điền', 'gender': 'male', 'generation': 27, 'birth_order': 1, 'birth_year': 1983, 'is_deceased': False, 'note': 'Con trai cả ông Điện.'}))
add_parents_child(id_dien_n, id_gai_d, add_person({'id': make_uuid(27, 2, 8012), 'full_name': 'Nguyễn Mậu Tuấn (con ông Điện)', 'gender': 'male', 'generation': 27, 'birth_order': 2, 'birth_year': 1985, 'is_deceased': False, 'note': 'Con trai thứ 2 ông Điện.'}))

id_d25_vien2 = add_person({'id': make_uuid(25, 2, 81), 'full_name': 'Nguyễn Mậu Viễn', 'gender': 'male', 'generation': 25, 'birth_order': 2, 'is_deceased': True, 'note': 'Chi cụ Nguyễn Mậu Viễn.'})
id_hai_v = add_person({'id': make_uuid(26, 2, 811), 'full_name': 'Nguyễn Mậu Hải (Ngành 2)', 'gender': 'male', 'generation': 26, 'birth_order': 1, 'birth_year': 1962, 'is_deceased': False, 'note': 'Con trai cả cụ Viễn.'})
id_phong_v = add_person({'id': make_uuid(26, 2, 812), 'full_name': 'Nguyễn Mậu Phong', 'gender': 'male', 'generation': 26, 'birth_order': 2, 'birth_year': 1966, 'is_deceased': False, 'note': 'Con trai thứ 2 cụ Viễn.'})
id_huy_v = add_person({'id': make_uuid(26, 2, 813), 'full_name': 'Nguyễn Mậu Huy', 'gender': 'male', 'generation': 26, 'birth_order': 3, 'birth_year': 1974, 'is_deceased': False, 'note': 'Con trai thứ 3 cụ Viễn.'})
add_child(id_d25_vien2, id_hai_v)
add_child(id_d25_vien2, id_phong_v)
add_child(id_d25_vien2, id_huy_v)
add_child(id_huy_v, add_person({'id': make_uuid(27, 2, 8131), 'full_name': 'Nguyễn Mậu Duy Anh', 'gender': 'male', 'generation': 27, 'birth_order': 1, 'birth_year': 1998, 'is_deceased': False, 'note': 'Con trai ông Huy.'}))

data['persons'] = persons
data['relationships'] = relationships

with open('data/gia_pha_nguyen_mau_nganh4.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Done! Total persons: {len(persons)}, relationships: {len(relationships)}')
