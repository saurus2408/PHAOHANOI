-- ============================================================
-- SCRIPT KHÁC PHỤC TRIỆT ĐỂ LỖI RLS (ROW LEVEL SECURITY) SUPABASE
-- ============================================================

-- 1. Tắt tính năng bảo mật RLS làm chặn truy vấn công khai
ALTER TABLE IF EXISTS public.players DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.player_scores DISABLE ROW LEVEL SECURITY;

-- 2. Thêm policy cấp quyền đọc/ghi công khai (Phòng trường hợp Supabase ép bật RLS)
DROP POLICY IF EXISTS "Allow All Players" ON public.players;
CREATE POLICY "Allow All Players" ON public.players FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow All Scores" ON public.player_scores;
CREATE POLICY "Allow All Scores" ON public.player_scores FOR ALL USING (true) WITH CHECK (true);

-- 3. Xóa dữ liệu cũ của bảng players để làm mới 100%
TRUNCATE TABLE public.players CASCADE;

-- 4. Thêm danh sách 41 Cầu thủ
INSERT INTO public.players (num, name) VALUES
(1, 'LÊ GIA LINH'),
(2, 'HOÀNG XUÂN GIAO'),
(3, 'NGUYỄN TIẾN THÀNH'),
(4, 'LÊ HƯNG'),
(5, 'ĐÀM MINH TUẤN'),
(6, 'NGUYÊN MẠNH'),
(7, 'TUẤN'),
(8, 'NGUYỄN XUÂN ĐẠT'),
(9, 'ĐỖ VIỆT HOÀNG'),
(10, 'LÊ BÁ TÙNG'),
(11, 'DUY NAM'),
(12, 'NGUYỄN TRUNG KIÊN'),
(13, 'NGUYỄN THÁI ĐỨC'),
(14, 'HIỆP VIẾT HIỆP'),
(15, 'LÊ ĐỨC'),
(16, 'QUANG PHƯƠNG'),
(17, 'HẠNH'),
(18, 'PHẠM HỒNG QUÂN'),
(19, 'VŨ TẤN LỘC'),
(20, 'NGUYỄN ĐỨC ANH'),
(21, 'ĐẶNG HÙNG LĨNH'),
(22, 'PHẠM HẢI PHONG'),
(23, 'PHẠM KIÊN'),
(24, 'PHẠM THẾ DUY'),
(25, 'CHIỀU'),
(26, 'DUY TIÊN'),
(27, 'VIỆT ANH'),
(28, 'TÔ MINH TUẤN'),
(29, 'PHÙNG ĐỨC HUỲNH'),
(30, 'ĐẶNG HOÀNG NAM'),
(31, 'VÕ PHI THỨC'),
(32, 'VŨ HÙNG'),
(33, 'BÙI NIÊM'),
(35, 'ANH ĐỨC'),
(36, 'TRẦN QUANG THÁI'),
(37, 'ĐÀM HẢI YẾN'),
(38, 'NGUYỄN TÚ'),
(39, 'NGUYỄN CÔNG MINH'),
(40, 'NGUYỄN HỒNG QUÂN'),
(41, 'HOÀNG ANH'),
(42, 'THẠC BẢO'),
(43, 'QUANG ĐẠO');
