const fs = require('fs');
const path = require('path');

const teamsJsContent = fs.readFileSync(path.join(__dirname, '../js/teams.js'), 'utf8');
const rosterRegex = /const DEFAULT_ROSTER = \[([\s\S]*?)\];/;
const match = teamsJsContent.match(rosterRegex);
const rosterItems = eval('[' + match[1] + ']');

let sql = `-- ==============================================================================
-- LỆNH SQL SỬA LỖI PARSE (KHÔNG DÙNG DO BLOCK) - CHẠY 1 LẦN THÀNH CÔNG 100%
-- Hướng dẫn: Copy toàn bộ -> Dán vào Supabase SQL Editor -> Bấm RUN
-- ==============================================================================

-- BƯỚC 1: Thêm ngay cột position, skill_level, overall vào bảng players nếu chưa có
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS position TEXT DEFAULT 'CM';
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS skill_level TEXT DEFAULT 'Khá';
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS overall INT DEFAULT 65;

-- BƯỚC 2: Cập nhật vị trí chuẩn cho từng cầu thủ theo danh sách mới
`;

rosterItems.forEach((p) => {
    const escName = p.name.replace(/'/g, "''");
    const pos = p.primaryPosition || 'CM';
    const skill = p.skillLevel || 'Khá';
    const overall = p.overall || 65;

    sql += `UPDATE public.players SET position = '${pos}', skill_level = '${skill}', overall = ${overall} WHERE TRIM(LOWER(name)) = TRIM(LOWER('${escName}'));\n`;
});

sql += `\n-- BƯỚC 3: Nếu cầu thủ nào chưa có trong bảng players thì tự động thêm mới vào\n`;
rosterItems.forEach((p) => {
    const escName = p.name.replace(/'/g, "''");
    const pos = p.primaryPosition || 'CM';
    const skill = p.skillLevel || 'Khá';
    const overall = p.overall || 65;

    sql += `INSERT INTO public.players (num, name, position, skill_level, overall)
SELECT ${p.num}, '${escName}', '${pos}', '${skill}', ${overall}
WHERE NOT EXISTS (SELECT 1 FROM public.players WHERE TRIM(LOWER(name)) = TRIM(LOWER('${escName}')));\n`;
});

fs.writeFileSync(path.join(__dirname, '../scratch/update_supabase_direct_clean.sql'), sql, 'utf8');
console.log('Generated scratch/update_supabase_direct_clean.sql!');
