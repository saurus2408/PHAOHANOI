-- ==============================================================================
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
    -- 1. Vũ Tấn Lộc
    INSERT INTO public.players (num, name, position) VALUES (1, 'Vũ Tấn Lộc', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9) VALUES (p_id, 'Vũ Tấn Lộc', 6, 3, 1, 2, 5, 0, 7, 1, 3, 0, 7, 2, 8, 0);

    -- 2. Phùng Đức Huỳnh
    INSERT INTO public.players (num, name, position) VALUES (2, 'Phùng Đức Huỳnh', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9) VALUES (p_id, 'Phùng Đức Huỳnh', 3, 0, 5, 4, 6, 0, 4, 1, 3, 4, 0, 4);

    -- 3. Đinh Phạm Kiên
    INSERT INTO public.players (num, name, position) VALUES (3, 'Đinh Phạm Kiên', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9) VALUES (p_id, 'Đinh Phạm Kiên', 2, 0, 1, 2, 3, 2, 5, 1, 6, 0, 7, 0, 7, 1);

    -- 4. Phạm Hồng Quân
    INSERT INTO public.players (num, name, position) VALUES (4, 'Phạm Hồng Quân', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9) VALUES (p_id, 'Phạm Hồng Quân', 1, 3, 3, 0, 5, 2, 1, 1, 3, 0, 1, 1, 1, 0);

    -- 5. Lại Anh Đức
    INSERT INTO public.players (num, name, position) VALUES (5, 'Lại Anh Đức', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9) VALUES (p_id, 'Lại Anh Đức', 1, 0, 7, 1, 2, 3, 0, 5, 0, 2, 0, 1);

    -- 6. Nguyễn Tiến
    INSERT INTO public.players (num, name, position) VALUES (6, 'Nguyễn Tiến', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m7, a7, m8, a8, m9, a9) VALUES (p_id, 'Nguyễn Tiến', 2, 2, 3, 1, 2, 1, 3, 2, 7, 0, 0, 1);

    -- 7. Hồng Viết Hiệp
    INSERT INTO public.players (num, name, position) VALUES (7, 'Hồng Viết Hiệp', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m5, a5, m6, a6, m7, a7, m8, a8) VALUES (p_id, 'Hồng Viết Hiệp', 4, 3, 3, 1, 1, 1, 1, 1, 0, 1);

    -- 8. Nguyễn Duy Tiên
    INSERT INTO public.players (num, name, position) VALUES (8, 'Nguyễn Duy Tiên', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8) VALUES (p_id, 'Nguyễn Duy Tiên', 3, 0, 1, 0, 3, 1, 2, 0, 2, 1);

    -- 9. Bùi Văn Chiều
    INSERT INTO public.players (num, name, position) VALUES (9, 'Bùi Văn Chiều', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8) VALUES (p_id, 'Bùi Văn Chiều', 4, 0, 1, 0, 0, 1, 1, 0, 2, 1, 3, 0);

    -- 10. Đỗ Việt Hoàng
    INSERT INTO public.players (num, name, position) VALUES (10, 'Đỗ Việt Hoàng', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9) VALUES (p_id, 'Đỗ Việt Hoàng', 1, 0, 2, 1, 2, 2, 1, 0, 1, 4, 2, 1, 0, 1);

    -- 11. Nguyễn Duy Nam
    INSERT INTO public.players (num, name, position) VALUES (11, 'Nguyễn Duy Nam', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m5, a5, m6, a6) VALUES (p_id, 'Nguyễn Duy Nam', 3, 5, 2, 1, 2, 0);

    -- 12. Phạm Thế Duy
    INSERT INTO public.players (num, name, position) VALUES (12, 'Phạm Thế Duy', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m6, a6, m7, a7, m8, a8) VALUES (p_id, 'Phạm Thế Duy', 2, 1, 3, 6, 1, 4, 0, 2);

    -- 13. Đàm Minh Tuấn
    INSERT INTO public.players (num, name, position) VALUES (13, 'Đàm Minh Tuấn', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7) VALUES (p_id, 'Đàm Minh Tuấn', 1, 0, 2, 4, 1, 3, 1, 0, 0, 2);

    -- 14. Nguyễn Viết Tú
    INSERT INTO public.players (num, name, position) VALUES (14, 'Nguyễn Viết Tú', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7) VALUES (p_id, 'Nguyễn Viết Tú', 2, 0, 0, 1, 0, 1, 2, 0, 1, 0);

    -- 15. Nguyễn Trung Kiên
    INSERT INTO public.players (num, name, position) VALUES (15, 'Nguyễn Trung Kiên', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m5, a5, m6, a6) VALUES (p_id, 'Nguyễn Trung Kiên', 1, 0, 0, 1, 2, 0);

    -- 16. Lê Bá Tùng
    INSERT INTO public.players (num, name, position) VALUES (16, 'Lê Bá Tùng', 'GK') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7, m8, a8, m9, a9) VALUES (p_id, 'Lê Bá Tùng', 0, 2, 0, 3, 0, 1, 1, 0, 0, 2, 2, 0, 0, 1);

    -- 17. Bùi Đức Hạnh
    INSERT INTO public.players (num, name, position) VALUES (17, 'Bùi Đức Hạnh', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m7, a7) VALUES (p_id, 'Bùi Đức Hạnh', 1, 1, 1, 1);

    -- 18. Nguyễn Thái
    INSERT INTO public.players (num, name, position) VALUES (18, 'Nguyễn Thái', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m5, a5, m8, a8, m9, a9) VALUES (p_id, 'Nguyễn Thái', 0, 1, 0, 1, 1, 0, 1, 0);

    -- 19. Bùi Văn Niêm
    INSERT INTO public.players (num, name, position) VALUES (19, 'Bùi Văn Niêm', 'GK') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m6, a6, m7, a7) VALUES (p_id, 'Bùi Văn Niêm', 1, 0, 0, 1, 1, 0);

    -- 20. Trần Quang Thái
    INSERT INTO public.players (num, name, position) VALUES (20, 'Trần Quang Thái', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m6, a6, m7, a7, m9, a9) VALUES (p_id, 'Trần Quang Thái', 0, 1, 0, 1, 1, 0, 1, 0);

    -- 21. Hoàng Xuân Giao
    INSERT INTO public.players (num, name, position) VALUES (21, 'Hoàng Xuân Giao', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m9, a9) VALUES (p_id, 'Hoàng Xuân Giao', 2, 0, 0, 1);

    -- 22. Tô Minh Tuấn
    INSERT INTO public.players (num, name, position) VALUES (22, 'Tô Minh Tuấn', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3) VALUES (p_id, 'Tô Minh Tuấn', 2, 0);

    -- 23. Lê Hiếu
    INSERT INTO public.players (num, name, position) VALUES (23, 'Lê Hiếu', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m5, a5) VALUES (p_id, 'Lê Hiếu', 1, 0, 1, 0);

    -- 24. Đặng Hùng Lĩnh
    INSERT INTO public.players (num, name, position) VALUES (24, 'Đặng Hùng Lĩnh', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m5, a5) VALUES (p_id, 'Đặng Hùng Lĩnh', 0, 1, 1, 2);

    -- 25. Nguyễn Công Minh
    INSERT INTO public.players (num, name, position) VALUES (25, 'Nguyễn Công Minh', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m9, a9) VALUES (p_id, 'Nguyễn Công Minh', 1, 1, 1, 1);

    -- 26. Nguyễn Xuân Đạt
    INSERT INTO public.players (num, name, position) VALUES (26, 'Nguyễn Xuân Đạt', 'LB/RB') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3) VALUES (p_id, 'Nguyễn Xuân Đạt', 1, 0);

    -- 27. Nguyễn Đức Anh
    INSERT INTO public.players (num, name, position) VALUES (27, 'Nguyễn Đức Anh', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5) VALUES (p_id, 'Nguyễn Đức Anh', 1, 0);

    -- 28. Dương Việt Anh
    INSERT INTO public.players (num, name, position) VALUES (28, 'Dương Việt Anh', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m6, a6) VALUES (p_id, 'Dương Việt Anh', 1, 0);

    -- 29. Nguyễn Tiến Mạnh
    INSERT INTO public.players (num, name, position) VALUES (29, 'Nguyễn Tiến Mạnh', 'GK') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m5, a5, m8, a8) VALUES (p_id, 'Nguyễn Tiến Mạnh', 0, 2, 0, 4, 1, 1);

    -- 30. Thạc Bảo
    INSERT INTO public.players (num, name, position) VALUES (30, 'Thạc Bảo', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m7, a7) VALUES (p_id, 'Thạc Bảo', 0, 3, 0, 1);

    -- 31. Vũ Thế Hùng
    INSERT INTO public.players (num, name, position) VALUES (31, 'Vũ Thế Hùng', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m6, a6) VALUES (p_id, 'Vũ Thế Hùng', 0, 1, 0, 1);

    -- 32. Trần Anh Tuấn
    INSERT INTO public.players (num, name, position) VALUES (32, 'Trần Anh Tuấn', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m4, a4, m8, a8) VALUES (p_id, 'Trần Anh Tuấn', 0, 1, 1, 2);

    -- 33. Phạm Quang Phương
    INSERT INTO public.players (num, name, position) VALUES (33, 'Phạm Quang Phương', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m3, a3, m8, a8, m9, a9) VALUES (p_id, 'Phạm Quang Phương', 0, 1, 0, 1, 0, 1);

    -- 34. Phạm Hải Phong
    INSERT INTO public.players (num, name, position) VALUES (34, 'Phạm Hải Phong', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m6, a6) VALUES (p_id, 'Phạm Hải Phong', 0, 1);

    -- 35. Đặng Hoàng Nam
    INSERT INTO public.players (num, name, position) VALUES (35, 'Đặng Hoàng Nam', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m5, a5, m7, a7) VALUES (p_id, 'Đặng Hoàng Nam', 0, 1, 0, 1);

    -- 36. Nguyễn Hoàng Anh
    INSERT INTO public.players (num, name, position) VALUES (36, 'Nguyễn Hoàng Anh', 'GK') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m7, a7, m9, a9) VALUES (p_id, 'Nguyễn Hoàng Anh', 0, 1, 0, 1);

    -- 37. Lê Gia Linh
    INSERT INTO public.players (num, name, position) VALUES (37, 'Lê Gia Linh', 'GK') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lê Gia Linh');

    -- 38. Lưu Việt Hưng
    INSERT INTO public.players (num, name, position) VALUES (38, 'Lưu Việt Hưng', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m6, a6) VALUES (p_id, 'Lưu Việt Hưng', 1, 0);

    -- 39. Lê Đức
    INSERT INTO public.players (num, name, position) VALUES (39, 'Lê Đức', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lê Đức');

    -- 40. Võ Phi Thức
    INSERT INTO public.players (num, name, position) VALUES (40, 'Võ Phi Thức', 'LB/RB') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Võ Phi Thức');

    -- 41. Đàm Hải Yến
    INSERT INTO public.players (num, name, position) VALUES (41, 'Đàm Hải Yến', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Đàm Hải Yến');

    -- 42. Nguyễn Hồng Quân
    INSERT INTO public.players (num, name, position) VALUES (42, 'Nguyễn Hồng Quân', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m8, a8) VALUES (p_id, 'Nguyễn Hồng Quân', 0, 1);

    -- 43. Lê Quang Đạo
    INSERT INTO public.players (num, name, position) VALUES (43, 'Lê Quang Đạo', 'GK') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lê Quang Đạo');

    -- 44. Đỗ Huy Anh Tú
    INSERT INTO public.players (num, name, position) VALUES (44, 'Đỗ Huy Anh Tú', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m8, a8) VALUES (p_id, 'Đỗ Huy Anh Tú', 0, 1);

    -- 45. Đặng Quốc Anh
    INSERT INTO public.players (num, name, position) VALUES (45, 'Đặng Quốc Anh', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name, m8, a8) VALUES (p_id, 'Đặng Quốc Anh', 1, 1);

    -- 46. Đinh Thế
    INSERT INTO public.players (num, name, position) VALUES (46, 'Đinh Thế', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Đinh Thế');

    -- 47. Nguyễn Anh Tuấn
    INSERT INTO public.players (num, name, position) VALUES (47, 'Nguyễn Anh Tuấn', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Anh Tuấn');

    -- 48. Lương Văn Hoà
    INSERT INTO public.players (num, name, position) VALUES (48, 'Lương Văn Hoà', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lương Văn Hoà');

    -- 49. Phạm Thành Mạnh
    INSERT INTO public.players (num, name, position) VALUES (49, 'Phạm Thành Mạnh', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Phạm Thành Mạnh');

    -- 50. Lương Hữu Tân
    INSERT INTO public.players (num, name, position) VALUES (50, 'Lương Hữu Tân', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lương Hữu Tân');

    -- 51. Trần Văn Minh
    INSERT INTO public.players (num, name, position) VALUES (51, 'Trần Văn Minh', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Trần Văn Minh');

    -- 52. Nguyễn Văn Bình
    INSERT INTO public.players (num, name, position) VALUES (52, 'Nguyễn Văn Bình', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Văn Bình');

    -- 53. Lương khánh Tùng
    INSERT INTO public.players (num, name, position) VALUES (53, 'Lương khánh Tùng', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lương khánh Tùng');

    -- 54. Lê Hữu Minh
    INSERT INTO public.players (num, name, position) VALUES (54, 'Lê Hữu Minh', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Lê Hữu Minh');

    -- 55. Trần Hữu Bảo
    INSERT INTO public.players (num, name, position) VALUES (55, 'Trần Hữu Bảo', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Trần Hữu Bảo');

    -- 56. Đỗ Tuấn Anh
    INSERT INTO public.players (num, name, position) VALUES (56, 'Đỗ Tuấn Anh', 'GK') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Đỗ Tuấn Anh');

    -- 57. Nguyễn Tiến Nam
    INSERT INTO public.players (num, name, position) VALUES (57, 'Nguyễn Tiến Nam', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Tiến Nam');

    -- 58. lê minh Công
    INSERT INTO public.players (num, name, position) VALUES (58, 'lê minh Công', 'GK') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'lê minh Công');

    -- 59. Nguyễn Quang Huy
    INSERT INTO public.players (num, name, position) VALUES (59, 'Nguyễn Quang Huy', 'GK') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Quang Huy');

    -- 60. Hà Văn Hiệu
    INSERT INTO public.players (num, name, position) VALUES (60, 'Hà Văn Hiệu', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Hà Văn Hiệu');

    -- 61. Hoàng Trung Kiên
    INSERT INTO public.players (num, name, position) VALUES (61, 'Hoàng Trung Kiên', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Hoàng Trung Kiên');

    -- 62. Trác Phong
    INSERT INTO public.players (num, name, position) VALUES (62, 'Trác Phong', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Trác Phong');

    -- 63. Phùng Tiến Đạt
    INSERT INTO public.players (num, name, position) VALUES (63, 'Phùng Tiến Đạt', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Phùng Tiến Đạt');

    -- 64. Trần Hoàng Dương
    INSERT INTO public.players (num, name, position) VALUES (64, 'Trần Hoàng Dương', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Trần Hoàng Dương');

    -- 65. Vũ Ngọc Duy
    INSERT INTO public.players (num, name, position) VALUES (65, 'Vũ Ngọc Duy', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Vũ Ngọc Duy');

    -- 66. Ngô Mạnh Quí
    INSERT INTO public.players (num, name, position) VALUES (66, 'Ngô Mạnh Quí', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Ngô Mạnh Quí');

    -- 67. Nguyễn Ngọc Sơn
    INSERT INTO public.players (num, name, position) VALUES (67, 'Nguyễn Ngọc Sơn', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Ngọc Sơn');

    -- 68. Nguyễn Tiến Dũng
    INSERT INTO public.players (num, name, position) VALUES (68, 'Nguyễn Tiến Dũng', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Tiến Dũng');

    -- 69. Hoàng Quốc Dũng
    INSERT INTO public.players (num, name, position) VALUES (69, 'Hoàng Quốc Dũng', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Hoàng Quốc Dũng');

    -- 70. Nguyễn Thương Tín
    INSERT INTO public.players (num, name, position) VALUES (70, 'Nguyễn Thương Tín', 'CB/TH') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Thương Tín');

    -- 71. Đỗ Việt Minh Khôi
    INSERT INTO public.players (num, name, position) VALUES (71, 'Đỗ Việt Minh Khôi', 'CM') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Đỗ Việt Minh Khôi');

    -- 72. Nguyễn Huy Cương
    INSERT INTO public.players (num, name, position) VALUES (72, 'Nguyễn Huy Cương', 'W') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Huy Cương');

    -- 73. Bùi Mạnh Hùng
    INSERT INTO public.players (num, name, position) VALUES (73, 'Bùi Mạnh Hùng', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Bùi Mạnh Hùng');

    -- 74. Nguyễn Mạnh Thanh
    INSERT INTO public.players (num, name, position) VALUES (74, 'Nguyễn Mạnh Thanh', 'ST') RETURNING id INTO p_id;
    INSERT INTO public.player_scores (player_id, name) VALUES (p_id, 'Nguyễn Mạnh Thanh');

END $$;
