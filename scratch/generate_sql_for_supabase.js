const fs = require('fs');
const path = require('path');

const teamsJsContent = fs.readFileSync(path.join(__dirname, '../js/teams.js'), 'utf8');
const rosterRegex = /const DEFAULT_ROSTER = \[([\s\S]*?)\];/;
const match = teamsJsContent.match(rosterRegex);

const rosterItems = eval('[' + match[1] + ']');
console.log('Roster count:', rosterItems.length);

let sql = `-- ==============================================================================
-- LỆNH SQL CẬP NHẬT GHI ĐÈ 74 CẦU THỦ & 60 VỊ TRÍ + TRÌNH ĐỘ MỚI LÊN SUPABASE (FIXED DROP TABLE)
-- Hướng dẫn: Copy toàn bộ script này -> Dán vào Supabase SQL Editor -> Nhấn RUN
-- ==============================================================================

-- 1. Xóa hoàn toàn bảng cũ để tạo mới cấu trúc chuẩn 100% có cột position
DROP TABLE IF EXISTS public.player_scores CASCADE;
DROP TABLE IF EXISTS public.players CASCADE;

-- 2. Tạo mới bảng players & player_scores
CREATE TABLE public.players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    num INT,
    name TEXT NOT NULL,
    position TEXT DEFAULT 'CM',
    skill_level TEXT DEFAULT 'Khá',
    overall INT DEFAULT 65,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.player_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    m1 INT DEFAULT 0, a1 INT DEFAULT 0,
    m2 INT DEFAULT 0, a2 INT DEFAULT 0,
    m3 INT DEFAULT 0, a3 INT DEFAULT 0,
    m4 INT DEFAULT 0, a4 INT DEFAULT 0,
    m5 INT DEFAULT 0, a5 INT DEFAULT 0,
    m6 INT DEFAULT 0, a6 INT DEFAULT 0,
    m7 INT DEFAULT 0, a7 INT DEFAULT 0,
    m8 INT DEFAULT 0, a8 INT DEFAULT 0,
    m9 INT DEFAULT 0, a9 INT DEFAULT 0,
    m10 INT DEFAULT 0, a10 INT DEFAULT 0,
    m11 INT DEFAULT 0, a11 INT DEFAULT 0,
    m12 INT DEFAULT 0, a12 INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Mở quyền truy cập RLS public
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public full access to players" ON public.players;
CREATE POLICY "Allow public full access to players" ON public.players FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public full access to player_scores" ON public.player_scores;
CREATE POLICY "Allow public full access to player_scores" ON public.player_scores FOR ALL USING (true) WITH CHECK (true);

-- 4. Thêm lại 74 Cầu thủ với Vị trí & Trình độ đã được cập nhật
DO $$
DECLARE
    p_id UUID;
BEGIN
`;

rosterItems.forEach((p, idx) => {
    const escName = p.name.replace(/'/g, "''");
    const pos = p.primaryPosition || 'CM';
    const skill = p.skillLevel || 'Khá';
    const overall = p.overall || 65;
    
    sql += `    -- ${p.num}. ${p.name}\n`;
    sql += `    INSERT INTO public.players (num, name, position) VALUES (${p.num}, '${escName}', '${pos}') RETURNING id INTO p_id;\n`;
    
    // Check monthly scores
    const scoreCols = [];
    const scoreVals = [];
    for (let i = 1; i <= 12; i++) {
        if (p['m' + i] !== undefined || p['a' + i] !== undefined) {
            scoreCols.push(`m${i}`, `a${i}`);
            scoreVals.push(p['m' + i] || 0, p['a' + i] || 0);
        }
    }
    
    if (scoreCols.length > 0) {
        sql += `    INSERT INTO public.player_scores (player_id, name, ${scoreCols.join(', ')}) VALUES (p_id, '${escName}', ${scoreVals.join(', ')});\n`;
    } else {
        sql += `    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, '${escName}');\n`;
    }
    sql += `\n`;
});

sql += `END $$;\n`;

fs.writeFileSync(path.join(__dirname, '../scratch/update_supabase_74_players.sql'), sql, 'utf8');
console.log('Regenerated scratch/update_supabase_74_players.sql successfully!');
