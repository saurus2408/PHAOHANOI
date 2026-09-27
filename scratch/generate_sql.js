const fs = require('fs');
const path = require('path');

const parsedScores = JSON.parse(fs.readFileSync(path.join(__dirname, 'parsed_scores.json'), 'utf8'));

let sql = `-- ==============================================================================
-- SUPABASE SQL SCRIPT: RE-CREATE & POPULATE PLAYERS AND PLAYER_SCORES
-- Chạy lệnh này trực tiếp trong Supabase -> SQL Editor -> Run
-- ==============================================================================

-- 1. Tạo hoặc dọn dẹp bảng players và player_scores
CREATE TABLE IF NOT EXISTS public.players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    num INT,
    name TEXT NOT NULL,
    position TEXT DEFAULT 'Hậu vệ',
    hometown TEXT DEFAULT 'VIỆT NAM',
    career TEXT DEFAULT 'Chưa cập nhật',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.player_scores (
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

-- Xóa sạch dữ liệu cũ để cập nhật mới hoàn toàn
TRUNCATE TABLE public.player_scores CASCADE;
TRUNCATE TABLE public.players CASCADE;

-- 2. Tắt RLS hoặc phân quyền công khai (Anon INSERT/UPDATE/SELECT)
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public full access to players" ON public.players;
CREATE POLICY "Allow public full access to players" ON public.players FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public full access to player_scores" ON public.player_scores;
CREATE POLICY "Allow public full access to player_scores" ON public.player_scores FOR ALL USING (true) WITH CHECK (true);

-- 3. Chèn 74 Cầu Thủ và Bảng Điểm Tháng 3 - Tháng 12
DO $$
DECLARE
    p_id UUID;
BEGIN
`;

parsedScores.forEach((p) => {
    const safeName = p.name.replace(/'/g, "''");
    sql += `    -- ${safeName}\n`;
    sql += `    INSERT INTO public.players (num, name) VALUES (${p.num}, '${safeName}') RETURNING id INTO p_id;\n`;
    sql += `    INSERT INTO public.player_scores (player_id, name, m1, a1, m2, a2, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9, m10, a10, m11, a11, m12, a12)\n`;
    sql += `    VALUES (p_id, '${safeName}', ${p.m1}, ${p.a1}, ${p.m2}, ${p.a2}, ${p.m3}, ${p.a3}, ${p.m4}, ${p.a4}, ${p.m5}, ${p.a5}, ${p.m6}, ${p.a6}, ${p.m7}, ${p.a7}, ${p.m8}, ${p.a8}, ${p.m9}, ${p.a9}, ${p.m10}, ${p.a10}, ${p.m11}, ${p.a11}, ${p.m12}, ${p.a12});\n\n`;
});

sql += `END $$;
`;

fs.writeFileSync(path.join(__dirname, 'seed_all_74_players.sql'), sql);
console.log("SQL script generated successfully in scratch/seed_all_74_players.sql");
