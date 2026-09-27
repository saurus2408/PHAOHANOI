-- ==============================================================================
-- LỆNH SQL CẬP NHẬT HOÀN CHỈNH BẢNG PLAYERS VÀ PLAYER_SCORES TRÊN SUPABASE
-- Cách dùng: Copy toàn bộ nội dung file này -> Dán vào Supabase SQL Editor -> Bấm Run
-- ==============================================================================

-- BƯỚC 1: Xóa dữ liệu cũ và tạo lại cấu trúc bảng chuẩn
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

-- Xóa sạch dữ liệu cũ để cập nhật 74 cầu thủ mới nhất
TRUNCATE TABLE public.player_scores CASCADE;
TRUNCATE TABLE public.players CASCADE;

-- BƯỚC 2: Mở quyền truy cập công khai (RLS Policies)
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public full access to players" ON public.players;
CREATE POLICY "Allow public full access to players" ON public.players FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public full access to player_scores" ON public.player_scores;
CREATE POLICY "Allow public full access to player_scores" ON public.player_scores FOR ALL USING (true) WITH CHECK (true);

-- BƯỚC 3: Thêm 74 cầu thủ và dữ liệu Bàn Thắng / Kiến Tạo từ Tháng 3 đến Tháng 12
DO $$
DECLARE
    p_id UUID;
BEGIN
    -- 1. Vũ Tấn Lộc
    INSERT INTO public.players (num, name) VALUES (1, 'Vũ Tấn Lộc') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9)
    VALUES (p_id, 'Vũ Tấn Lộc', 6, 3, 1, 2, 5, 0, 7, 1, 3, 0, 7, 2, 8, 0);

    -- 2. Phùng Đức Huỳnh
    INSERT INTO public.players (num, name) VALUES (2, 'Phùng Đức Huỳnh') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9)
    VALUES (p_id, 'Phùng Đức Huỳnh', 3, 0, 5, 4, 6, 0, 4, 1, 3, 4, 0, 4);

    -- 3. Đinh Phạm Kiên
    INSERT INTO public.players (num, name) VALUES (3, 'Đinh Phạm Kiên') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9)
    VALUES (p_id, 'Đinh Phạm Kiên', 2, 0, 1, 2, 3, 2, 5, 1, 6, 0, 7, 0, 7, 1);

    -- 4. Phạm Hồng Quân
    INSERT INTO public.players (num, name) VALUES (4, 'Phạm Hồng Quân') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9)
    VALUES (p_id, 'Phạm Hồng Quân', 1, 3, 3, 0, 5, 2, 1, 1, 3, 0, 1, 1, 1, 0);

    -- 5. Lại Anh Đức
    INSERT INTO public.players (num, name) VALUES (5, 'Lại Anh Đức') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9)
    VALUES (p_id, 'Lại Anh Đức', 1, 0, 7, 1, 2, 3, 0, 5, 0, 2, 0, 1);

    -- 6. Nguyễn Tiến
    INSERT INTO public.players (num, name) VALUES (6, 'Nguyễn Tiến') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m7, a7, m8, a8, m9, a9)
    VALUES (p_id, 'Nguyễn Tiến', 2, 2, 3, 1, 2, 1, 3, 2, 7, 0, 0, 1);

    -- 7. Hồng Viết Hiệp
    INSERT INTO public.players (num, name) VALUES (7, 'Hồng Viết Hiệp') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m5, a5, m6, a6, m7, a7, m8, a8)
    VALUES (p_id, 'Hồng Viết Hiệp', 4, 3, 3, 1, 1, 1, 1, 1, 0, 1);

    -- 8. Nguyễn Duy Tiên
    INSERT INTO public.players (num, name) VALUES (8, 'Nguyễn Duy Tiên') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8)
    VALUES (p_id, 'Nguyễn Duy Tiên', 3, 0, 1, 0, 3, 1, 2, 0, 2, 1);

    -- 9. Bùi Văn Chiều
    INSERT INTO public.players (num, name) VALUES (9, 'Bùi Văn Chiều') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8)
    VALUES (p_id, 'Bùi Văn Chiều', 4, 0, 1, 0, 0, 1, 1, 0, 2, 1, 3, 0);

    -- 10. Đỗ Việt Hoàng
    INSERT INTO public.players (num, name) VALUES (10, 'Đỗ Việt Hoàng') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9)
    VALUES (p_id, 'Đỗ Việt Hoàng', 1, 0, 2, 1, 2, 2, 1, 0, 1, 4, 2, 1, 0, 1);

    -- 11. Nguyễn Duy Nam
    INSERT INTO public.players (num, name) VALUES (11, 'Nguyễn Duy Nam') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m5, a5, m6, a6)
    VALUES (p_id, 'Nguyễn Duy Nam', 3, 5, 2, 1, 2, 0);

    -- 12. Phạm Thế Duy
    INSERT INTO public.players (num, name) VALUES (12, 'Phạm Thế Duy') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m6, a6, m7, a7, m8, a8)
    VALUES (p_id, 'Phạm Thế Duy', 2, 1, 3, 6, 1, 4, 0, 2);

    -- 13. Đàm Minh Tuấn
    INSERT INTO public.players (num, name) VALUES (13, 'Đàm Minh Tuấn') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7)
    VALUES (p_id, 'Đàm Minh Tuấn', 1, 0, 2, 4, 1, 3, 1, 0, 0, 2);

    -- 14. Nguyễn Viết Tú
    INSERT INTO public.players (num, name) VALUES (14, 'Nguyễn Viết Tú') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7)
    VALUES (p_id, 'Nguyễn Viết Tú', 2, 0, 0, 1, 0, 1, 2, 0, 1, 0);

    -- 15. Nguyễn Trung Kiên
    INSERT INTO public.players (num, name) VALUES (15, 'Nguyễn Trung Kiên') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m5, a5, m6, a6)
    VALUES (p_id, 'Nguyễn Trung Kiên', 1, 0, 0, 1, 2, 0);

    -- 16. Lê Bá Tùng
    INSERT INTO public.players (num, name) VALUES (16, 'Lê Bá Tùng') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9)
    VALUES (p_id, 'Lê Bá Tùng', 0, 2, 0, 3, 0, 1, 1, 0, 0, 2, 2, 0, 0, 1);

    -- 17. Bùi Đức Hạnh
    INSERT INTO public.players (num, name) VALUES (17, 'Bùi Đức Hạnh') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m7, a7)
    VALUES (p_id, 'Bùi Đức Hạnh', 1, 1, 1, 1);

    -- 18. Nguyễn Thái
    INSERT INTO public.players (num, name) VALUES (18, 'Nguyễn Thái') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m5, a5, m8, a8, m9, a9)
    VALUES (p_id, 'Nguyễn Thái', 0, 1, 0, 1, 1, 0, 1, 0);

    -- 19. Bùi Văn Niêm
    INSERT INTO public.players (num, name) VALUES (19, 'Bùi Văn Niêm') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m6, a6, m7, a7)
    VALUES (p_id, 'Bùi Văn Niêm', 1, 0, 0, 1, 1, 0);

    -- 20. Trần Quang Thái
    INSERT INTO public.players (num, name) VALUES (20, 'Trần Quang Thái') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m6, a6, m7, a7, m9, a9)
    VALUES (p_id, 'Trần Quang Thái', 0, 1, 0, 1, 1, 0, 1, 0);

    -- 21. Hoàng Xuân Giao
    INSERT INTO public.players (num, name) VALUES (21, 'Hoàng Xuân Giao') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m9, a9)
    VALUES (p_id, 'Hoàng Xuân Giao', 2, 0, 0, 1);

    -- 22. Tô Minh Tuấn
    INSERT INTO public.players (num, name) VALUES (22, 'Tô Minh Tuấn') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3)
    VALUES (p_id, 'Tô Minh Tuấn', 2, 0);

    -- 23. Lê Hiếu
    INSERT INTO public.players (num, name) VALUES (23, 'Lê Hiếu') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m5, a5)
    VALUES (p_id, 'Lê Hiếu', 1, 0, 1, 0);

    -- 24. Đặng Hùng Lĩnh
    INSERT INTO public.players (num, name) VALUES (24, 'Đặng Hùng Lĩnh') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m5, a5)
    VALUES (p_id, 'Đặng Hùng Lĩnh', 0, 1, 1, 2);

    -- 25. Nguyễn Công Minh
    INSERT INTO public.players (num, name) VALUES (25, 'Nguyễn Công Minh') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m9, a9)
    VALUES (p_id, 'Nguyễn Công Minh', 1, 1, 1, 1);

    -- 26. Nguyễn Xuân Đạt
    INSERT INTO public.players (num, name) VALUES (26, 'Nguyễn Xuân Đạt') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3)
    VALUES (p_id, 'Nguyễn Xuân Đạt', 1, 0);

    -- 27. Nguyễn Đức Anh
    INSERT INTO public.players (num, name) VALUES (27, 'Nguyễn Đức Anh') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5)
    VALUES (p_id, 'Nguyễn Đức Anh', 1, 0);

    -- 28. Dương Việt Anh
    INSERT INTO public.players (num, name) VALUES (28, 'Dương Việt Anh') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m6, a6)
    VALUES (p_id, 'Dương Việt Anh', 1, 0);

    -- 29. Nguyễn Tiến Mạnh
    INSERT INTO public.players (num, name) VALUES (29, 'Nguyễn Tiến Mạnh') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m5, a5, m8, a8)
    VALUES (p_id, 'Nguyễn Tiến Mạnh', 0, 2, 0, 4, 1, 1);

    -- 30. Thạc Bảo
    INSERT INTO public.players (num, name) VALUES (30, 'Thạc Bảo') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m7, a7)
    VALUES (p_id, 'Thạc Bảo', 0, 3, 0, 1);

    -- 31. Vũ Thế Hùng
    INSERT INTO public.players (num, name) VALUES (31, 'Vũ Thế Hùng') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m6, a6)
    VALUES (p_id, 'Vũ Thế Hùng', 0, 1, 0, 1);

    -- 32. Trần Anh Tuấn
    INSERT INTO public.players (num, name) VALUES (32, 'Trần Anh Tuấn') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m8, a8)
    VALUES (p_id, 'Trần Anh Tuấn', 0, 1, 1, 2);

    -- 33. Phạm Quang Phương
    INSERT INTO public.players (num, name) VALUES (33, 'Phạm Quang Phương') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m8, a8, m9, a9)
    VALUES (p_id, 'Phạm Quang Phương', 0, 1, 0, 1, 0, 1);

    -- 34. Phạm Hải Phong
    INSERT INTO public.players (num, name) VALUES (34, 'Phạm Hải Phong') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m6, a6)
    VALUES (p_id, 'Phạm Hải Phong', 0, 1);

    -- 35. Đặng Hoàng Nam
    INSERT INTO public.players (num, name) VALUES (35, 'Đặng Hoàng Nam') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m7, a7)
    VALUES (p_id, 'Đặng Hoàng Nam', 0, 1, 0, 1);

    -- 36. Nguyễn Hoàng Anh
    INSERT INTO public.players (num, name) VALUES (36, 'Nguyễn Hoàng Anh') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m7, a7, m9, a9)
    VALUES (p_id, 'Nguyễn Hoàng Anh', 0, 1, 0, 1);

    -- 37. Lê Gia Linh
    INSERT INTO public.players (num, name) VALUES (37, 'Lê Gia Linh') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lê Gia Linh');

    -- 38. Lưu Việt Hưng
    INSERT INTO public.players (num, name) VALUES (38, 'Lưu Việt Hưng') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m6, a6) VALUES (p_id, 'Lưu Việt Hưng', 1, 0);

    -- 39. Lê Đức
    INSERT INTO public.players (num, name) VALUES (39, 'Lê Đức') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lê Đức');

    -- 40. Võ Phi Thức
    INSERT INTO public.players (num, name) VALUES (40, 'Võ Phi Thức') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Võ Phi Thức');

    -- 41. Đàm Hải Yến
    INSERT INTO public.players (num, name) VALUES (41, 'Đàm Hải Yến') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Đàm Hải Yến');

    -- 42. Nguyễn Hồng Quân
    INSERT INTO public.players (num, name) VALUES (42, 'Nguyễn Hồng Quân') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m8, a8) VALUES (p_id, 'Nguyễn Hồng Quân', 0, 1);

    -- 43. Lê Quang Đạo
    INSERT INTO public.players (num, name) VALUES (43, 'Lê Quang Đạo') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m8, a8) VALUES (p_id, 'Lê Quang Đạo', 0, 0);

    -- 44. Đỗ Huy Anh Tú
    INSERT INTO public.players (num, name) VALUES (44, 'Đỗ Huy Anh Tú') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m8, a8) VALUES (p_id, 'Đỗ Huy Anh Tú', 0, 1);

    -- 45. Đặng Quốc Anh
    INSERT INTO public.players (num, name) VALUES (45, 'Đặng Quốc Anh') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m8, a8) VALUES (p_id, 'Đặng Quốc Anh', 1, 1);

    -- Các cầu thủ khác (46-74)
    INSERT INTO public.players (num, name) VALUES (46, 'Đinh Thế') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Đinh Thế');
    INSERT INTO public.players (num, name) VALUES (47, 'Nguyễn Anh Tuấn') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Anh Tuấn');
    INSERT INTO public.players (num, name) VALUES (48, 'Lương Văn Hoà') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lương Văn Hoà');
    INSERT INTO public.players (num, name) VALUES (49, 'Phạm Thành Mạnh') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Phạm Thành Mạnh');
    INSERT INTO public.players (num, name) VALUES (50, 'Lương Hữu Tân') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lương Hữu Tân');
    INSERT INTO public.players (num, name) VALUES (51, 'Trần Văn Minh') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Trần Văn Minh');
    INSERT INTO public.players (num, name) VALUES (52, 'Nguyễn Văn Bình') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Văn Bình');
    INSERT INTO public.players (num, name) VALUES (53, 'Lương khánh Tùng') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lương khánh Tùng');
    INSERT INTO public.players (num, name) VALUES (54, 'Lê Hữu Minh') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lê Hữu Minh');
    INSERT INTO public.players (num, name) VALUES (55, 'Trần Hữu Bảo') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Trần Hữu Bảo');
    INSERT INTO public.players (num, name) VALUES (56, 'Đỗ Tuấn Anh') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Đỗ Tuấn Anh');
    INSERT INTO public.players (num, name) VALUES (57, 'Nguyễn Tiến Nam') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Tiến Nam');
    INSERT INTO public.players (num, name) VALUES (58, 'lê minh Công') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'lê minh Công');
    INSERT INTO public.players (num, name) VALUES (59, 'Nguyễn Quang Huy') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Quang Huy');
    INSERT INTO public.players (num, name) VALUES (60, 'Hà Văn Hiệu') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Hà Văn Hiệu');
    INSERT INTO public.players (num, name) VALUES (61, 'Hoàng Trung Kiên') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Hoàng Trung Kiên');
    INSERT INTO public.players (num, name) VALUES (62, 'Trác Phong') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Trác Phong');
    INSERT INTO public.players (num, name) VALUES (63, 'Phùng Tiến Đạt') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Phùng Tiến Đạt');
    INSERT INTO public.players (num, name) VALUES (64, 'Trần Hoàng Dương') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Trần Hoàng Dương');
    INSERT INTO public.players (num, name) VALUES (65, 'Vũ Ngọc Duy') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Vũ Ngọc Duy');
    INSERT INTO public.players (num, name) VALUES (66, 'Ngô Mạnh Quí') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Ngô Mạnh Quí');
    INSERT INTO public.players (num, name) VALUES (67, 'Nguyễn Ngọc Sơn') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Ngọc Sơn');
    INSERT INTO public.players (num, name) VALUES (68, 'Nguyễn Tiến Dũng') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Tiến Dũng');
    INSERT INTO public.players (num, name) VALUES (69, 'Hoàng Quốc Dũng') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Hoàng Quốc Dũng');
    INSERT INTO public.players (num, name) VALUES (70, 'Nguyễn Thương Tín') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Thương Tín');
    INSERT INTO public.players (num, name) VALUES (71, 'Đỗ Việt Minh Khôi') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Đỗ Việt Minh Khôi');
    INSERT INTO public.players (num, name) VALUES (72, 'Nguyễn Huy Cương') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Huy Cương');
    INSERT INTO public.players (num, name) VALUES (73, 'Bùi Mạnh Hùng') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Bùi Mạnh Hùng');
    INSERT INTO public.players (num, name) VALUES (74, 'Nguyễn Mạnh Thanh') RETURNING id INTO p_id; INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Mạnh Thanh');

END $$;
