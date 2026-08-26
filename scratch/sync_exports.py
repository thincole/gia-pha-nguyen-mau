import json

with open('data/gia_pha_nguyen_mau_nganh4.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

lines = [
    '-- =============================================================================',
    '-- GIA PHẢ DÒNG HỌ NGUYỄN MẬU (CỔ LỄ, TRỰC NINH, NAM ĐỊNH) - FULL 514 THÀNH VIÊN',
    '-- =============================================================================',
    'BEGIN;',
    'DELETE FROM custom_events;',
    'DELETE FROM relationships;',
    'DELETE FROM person_details_private;',
    'DELETE FROM persons;',
    ''
]

for p in data['persons']:
    def s(v):
        if v is None: return 'NULL'
        return chr(39) + str(v).replace(chr(39), chr(39)+chr(39)) + chr(39)
    def n(v):
        return 'NULL' if v is None else str(v)
    b_val = 'true' if p.get('is_in_law') else 'false'
    d_val = 'true' if p.get('is_deceased') else 'false'
    leap_val = 'true' if p.get('death_lunar_is_leap') else 'false'

    lines.append('INSERT INTO persons (id, full_name, gender, generation, birth_order, is_in_law, is_deceased, birth_day, birth_month, birth_year, death_day, death_month, death_year, death_lunar_day, death_lunar_month, death_lunar_year, death_lunar_is_leap, note) VALUES (' + s(p['id']) + ', ' + s(p['full_name']) + ', ' + s(p['gender']) + ', ' + str(p['generation']) + ', ' + n(p.get('birth_order')) + ', ' + b_val + ', ' + d_val + ', ' + n(p.get('birth_day')) + ', ' + n(p.get('birth_month')) + ', ' + n(p.get('birth_year')) + ', ' + n(p.get('death_day')) + ', ' + n(p.get('death_month')) + ', ' + n(p.get('death_year')) + ', ' + n(p.get('death_lunar_day')) + ', ' + n(p.get('death_lunar_month')) + ', ' + n(p.get('death_lunar_year')) + ', ' + leap_val + ', ' + s(p.get('note')) + ');')

lines.append('')
lines.append('-- relationships')
for r in data['relationships']:
    def s(v):
        return chr(39) + str(v).replace(chr(39), chr(39)+chr(39)) + chr(39)
    lines.append('INSERT INTO relationships (id, person_a, person_b, type) VALUES (' + s(r['id']) + ', ' + s(r['person_a']) + ', ' + s(r['person_b']) + ', ' + s(r['type']) + ');')

if data.get('custom_events'):
    lines.append('')
    lines.append('-- custom_events')
    for ev in data['custom_events']:
        def s(v):
            if v is None: return 'NULL'
            return chr(39) + str(v).replace(chr(39), chr(39)+chr(39)) + chr(39)
        lines.append('INSERT INTO custom_events (id, name, event_date, content, location) VALUES (' + s(ev['id']) + ', ' + s(ev['name']) + ', ' + s(ev['event_date']) + ', ' + s(ev.get('content')) + ', ' + s(ev.get('location')) + ');')

lines.append('')
lines.append('COMMIT;')
lines.append('')

with open('docs/seed_nguyen_mau_nganh4.sql', 'w', encoding='utf-8') as f:
    f.write(chr(10).join(lines))

print('SQL Seed generated successfully! Persons: ' + str(len(data['persons'])))
