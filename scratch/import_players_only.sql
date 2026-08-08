-- ============================================================
-- LỆNH BƯỚC 1: XÓA CŨ & TẠO MỚI DANH SÁCH 41 CẦU THỦ (TABLE: players)
-- Copy toàn bộ đoạn script này dán vào SQL Editor và nhấn RUN
-- ============================================================

-- 1. Xóa hoàn toàn bảng players cũ
DROP TABLE IF EXISTS public.players CASCADE;

-- 2. Tạo mới bảng players chuẩn Supabase
CREATE TABLE public.players (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    num INT,
    name TEXT,
    img TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tắt RLS để ứng dụng trên Chrome đọc dữ liệu công khai không bị Supabase chặn
ALTER TABLE public.players DISABLE ROW LEVEL SECURITY;

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

-- 5. Kiểm tra kết quả trực tiếp ngay trên Supabase
SELECT * FROM public.players ORDER BY num ASC;
