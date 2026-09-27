const fs = require('fs');
const path = require('path');

const rawData = `Vũ Tấn Lộc	6	3	1	2	5		7	1	3		7	2	8								37	8
Phùng Đức Huỳnh			3		5	4	6		4	1	3	4		4							21	13
Đinh Phạm Kiên	2		1	2	3	2	5	1	6		7		7	1							31	6
Phạm Hồng Quân	1	3	3		5	2	1	1	3		1	1	1								21	7
Lại Anh Đức			1		7	1	2	3		5		2		1							10	12
Nguyễn Tiến 	2	2	3	1	2	1			3	2	7			1							17	7
Hồng Viết Hiệp	4	3			3	1	1	1	1	1		1									9	7
Nguyễn Duy Tiên			3		1		3	1	2		2	1									11	2
Bùi Văn Chiều	4		1			1	1		2	1	3										11	2
Đỗ Việt Hoàng	1		2	1	2	2	1		1	4	2	1		1							9	9
Nguyễn Duy Nam	3	5			2	1	2														7	6
Phạm Thế Duy					2	1	3	6	1	4		2									6	13
Đàm Minh Tuấn	1		2	4	1	3	1					2									5	9
Nguyễn Viết Tú	2			1		1	2		1												5	2
Nguyễn Trung Kiên	1					1	2														3	1
Lê Bá Tùng		2		3		1	1		2	2		1									3	9
Bùi Đức Hạnh					1	1		1	1												2	2
Nguyễn Thái 		1			1				1			1									2	2
Bùi Văn Niêm					1		1	1													2	1
Trần Quang Thái				1			1		1			1									2	2
Hoàng Xuân Giao	2											1									2	1
Tô Minh Tuấn	2																				2	0
Lê Hiếu			1		1																2	0
Đặng Hùng Lĩnh				1	1	2															1	3
Nguyễn Công Minh					1	1					1	1									2	2
Nguyễn Xuân Đạt	1																				1	0
Nguyễn Đức Anh					1																1	0
Dương Việt Anh 									1												1	0
Nguyễn Tiến Mạnh		2				4						1	1								1	7
Thạc Bảo		3								1											0	4
Vũ Thế Hùng						1		1													0	2
Trần Anh Tuấn 				1								2	1								1	3
Phạm Quang Phương		1										1		1							0	3
Phạm Hải Phong 								1													0	1
Đặng Hoàng Nam						1				1											0	2
Nguyễn Hoàng Anh										1				1							0	2
Lê Gia Linh 																					0	0
Lưu Việt Hưng 											1										1	0
Lê Đức																					0	0
Võ Phi Thức																					0	0
Đàm Hải Yến																					0	0
Nguyễn Hồng Quân												1									0	1
Lê Quang Đạo													1								0	0
Đỗ Huy Anh Tú													2	1							0	1
Đặng Quốc Anh													1	1							1	1
Đinh Thế																					0	0
Nguyễn Anh Tuấn 																					0	0
Lương Văn Hoà																					0	0
Phạm Thành Mạnh																					0	0
Lương Hữu Tân																					0	0
Trần Văn Minh																					0	0
Nguyễn Văn Bình																					0	0
Lương khánh Tùng																					0	0
Lê Hữu Minh																					0	0
Trần Hữu Bảo																					0	0
Đỗ Tuấn Anh																					0	0
Nguyễn Tiến Nam																					0	0
lê minh Công																					0	0
Nguyễn Quang Huy																					0	0
Hà Văn Hiệu																					0	0
Hoàng Trung Kiên																					0	0
Trác Phong																					0	0
Phùng Tiến Đạt																					0	0
Trần Hoàng Dương																					0	0
Vũ Ngọc Duy																					0	0
Ngô Mạnh Quí																					0	0
Nguyễn Ngọc Sơn																					0	0
Nguyễn Tiến Dũng																					0	0
Hoàng Quốc Dũng																					0	0
Nguyễn Thương Tín																					0	0
Đỗ Việt Minh Khôi																					0	0
Nguyễn Huy Cương																					0	0
Bùi Mạnh Hùng																					0	0
Nguyễn Mạnh Thanh																					0	0`;

function parse() {
    const lines = rawData.split('\n').filter(l => l.trim().length > 0);
    const parsedRows = [];

    lines.forEach((line, idx) => {
        const parts = line.split('\t');
        const name = parts[0].trim();
        if (!name) return;

        const parseVal = (v) => {
            if (!v || v.trim() === '') return 0;
            const n = parseInt(v.trim());
            return isNaN(n) ? 0 : n;
        };

        const m3 = parseVal(parts[1]);
        const a3 = parseVal(parts[2]);
        const m4 = parseVal(parts[3]);
        const a4 = parseVal(parts[4]);
        const m5 = parseVal(parts[5]);
        const a5 = parseVal(parts[6]);
        const m6 = parseVal(parts[7]);
        const a6 = parseVal(parts[8]);
        const m7 = parseVal(parts[9]);
        const a7 = parseVal(parts[10]);
        const m8 = parseVal(parts[11]);
        const a8 = parseVal(parts[12]);
        const m9 = parseVal(parts[13]);
        const a9 = parseVal(parts[14]);
        const m10 = parseVal(parts[15]);
        const a10 = parseVal(parts[16]);
        const m11 = parseVal(parts[17]);
        const a11 = parseVal(parts[18]);
        const m12 = parseVal(parts[19]);
        const a12 = parseVal(parts[20]);

        parsedRows.push({
            num: idx + 1,
            name: name,
            m1: 0, a1: 0,
            m2: 0, a2: 0,
            m3, a3,
            m4, a4,
            m5, a5,
            m6, a6,
            m7, a7,
            m8, a8,
            m9, a9,
            m10, a10,
            m11, a11,
            m12, a12
        });
    });
    return parsedRows;
}

const parsed = parse();

// 1. Build SQL Script
let sql = `-- ==============================================================================
-- LỆNH SQL CẬP NHẬT HOÀN CHỈNH BẢNG PLAYERS VÀ PLAYER_SCORES TRÊN SUPABASE
-- Cách dùng: Copy toàn bộ nội dung file này -> Dán vào Supabase SQL Editor -> Bấm Run
-- ==============================================================================

-- BƯỚC 1: Xóa dữ liệu cũ và tạo bảng nếu chưa có
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

-- Xóa dữ liệu cũ
TRUNCATE TABLE public.player_scores CASCADE;
TRUNCATE TABLE public.players CASCADE;

-- BƯỚC 2: Cấp quyền RLS cho người dùng public (anon)
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public full access to players" ON public.players;
CREATE POLICY "Allow public full access to players" ON public.players FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public full access to player_scores" ON public.player_scores;
CREATE POLICY "Allow public full access to player_scores" ON public.player_scores FOR ALL USING (true) WITH CHECK (true);

-- BƯỚC 3: Nạp 74 cầu thủ và điểm chỉ số bàn thắng / kiến tạo từ Tháng 3 -> Tháng 12
DO $$
DECLARE
    p_id UUID;
BEGIN
`;

parsed.forEach((p) => {
    const safeName = p.name.replace(/'/g, "''");
    sql += `    -- Cầu thủ: ${safeName}\n`;
    sql += `    INSERT INTO public.players (num, name) VALUES (${p.num}, '${safeName}') RETURNING id INTO p_id;\n`;
    sql += `    INSERT INTO public.player_scores (player_id, name, m1, a1, m2, a2, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9, m10, a10, m11, a11, m12, a12)\n`;
    sql += `    VALUES (p_id, '${safeName}', ${p.m1}, ${p.a1}, ${p.m2}, ${p.a2}, ${p.m3}, ${p.a3}, ${p.m4}, ${p.a4}, ${p.m5}, ${p.a5}, ${p.m6}, ${p.a6}, ${p.m7}, ${p.a7}, ${p.m8}, ${p.a8}, ${p.m9}, ${p.a9}, ${p.m10}, ${p.a10}, ${p.m11}, ${p.a11}, ${p.m12}, ${p.a12});\n\n`;
});

sql += `END $$;
`;

const sqlPath = path.join(__dirname, 'seed_all_74_players.sql');
fs.writeFileSync(sqlPath, sql, 'utf8');
console.log('Saved SQL script to:', sqlPath);

// 2. Build JS array representation for DEFAULT_SCORES in rankings.html
const defaultScoresJs = parsed.map(p => {
    return `        { name: '${p.name.replace(/'/g, "\\'")}', m1: 0, a1: 0, m2: 0, a2: 0, m3: ${p.m3}, a3: ${p.a3}, m4: ${p.m4}, a4: ${p.a4}, m5: ${p.m5}, a5: ${p.a5}, m6: ${p.m6}, a6: ${p.a6}, m7: ${p.m7}, a7: ${p.a7}, m8: ${p.m8}, a8: ${p.a8}, m9: ${p.m9}, a9: ${p.a9}, m10: ${p.m10}, a10: ${p.a10}, m11: ${p.m11}, a11: ${p.a11}, m12: ${p.m12}, a12: ${p.a12} }`;
}).join(',\n');

fs.writeFileSync(path.join(__dirname, 'default_scores_snippet.js'), defaultScoresJs, 'utf8');
console.log('Done!');
