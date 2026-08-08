-- ============================================================
-- SCRIPT CHUẨN 43 CẦU THỦ: BÀN THẮNG & KIẾN TẠO THÁNG 3 -> THÁNG 7
-- (Copy toàn bộ dán vào Supabase SQL Editor và nhấn RUN)
-- ============================================================

-- 1. Tạo bảng `player_scores` nếu chưa có
CREATE TABLE IF NOT EXISTS public.player_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_id UUID,
    name TEXT UNIQUE,
    m1 INT DEFAULT 0, m2 INT DEFAULT 0, m3 INT DEFAULT 0, m4 INT DEFAULT 0, m5 INT DEFAULT 0, m6 INT DEFAULT 0,
    m7 INT DEFAULT 0, m8 INT DEFAULT 0, m9 INT DEFAULT 0, m10 INT DEFAULT 0, m11 INT DEFAULT 0, m12 INT DEFAULT 0,
    a1 INT DEFAULT 0, a2 INT DEFAULT 0, a3 INT DEFAULT 0, a4 INT DEFAULT 0, a5 INT DEFAULT 0, a6 INT DEFAULT 0,
    a7 INT DEFAULT 0, a8 INT DEFAULT 0, a9 INT DEFAULT 0, a10 INT DEFAULT 0, a11 INT DEFAULT 0, a12 INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tắt RLS để truy vấn công khai mượt mà
ALTER TABLE public.player_scores DISABLE ROW LEVEL SECURITY;

-- 3. Xóa dữ liệu cũ của bảng player_scores để làm sạch
TRUNCATE TABLE public.player_scores CASCADE;

-- 4. Thêm đầy đủ số liệu 43 Cầu thủ (Bàn thắng m & Kiến tạo a từ Tháng 3 -> Tháng 7)
INSERT INTO public.player_scores (name, m3, a3, m4, a4, m5, a5, m6, a6, m7, a7) VALUES
('LÊ GIA LINH', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('HOÀNG XUÂN GIAO', 2, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('NGUYỄN TIẾN THÀNH', 2, 2, 3, 1, 2, 1, 0, 0, 2, 2),
('LÊ HƯNG', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('ĐÀM MINH TUẤN', 1, 0, 2, 4, 1, 3, 1, 0, 0, 1),
('NGUYÊN MẠNH', 0, 2, 0, 0, 0, 4, 0, 0, 0, 0),
('TUẤN', 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
('NGUYỄN XUÂN ĐẠT', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('ĐỖ VIỆT HOÀNG', 1, 0, 2, 1, 2, 2, 1, 0, 1, 3),
('LÊ BÁ TÙNG', 0, 2, 0, 3, 0, 1, 1, 0, 1, 2),
('DUY NAM', 3, 5, 0, 0, 2, 1, 2, 0, 0, 0),
('NGUYỄN TRUNG KIÊN', 1, 0, 0, 0, 0, 1, 2, 0, 0, 0),
('NGUYỄN THÁI ĐỨC', 0, 1, 0, 0, 1, 0, 0, 0, 1, 0),
('HIỆP VIẾT HIỆP', 4, 3, 0, 0, 3, 1, 1, 1, 1, 1),
('LÊ ĐỨC', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('QUANG PHƯƠNG', 0, 1, 0, 0, 0, 0, 0, 0, 0, 0),
('HẠNH', 0, 0, 0, 0, 1, 1, 0, 1, 1, 0),
('PHẠM HỒNG QUÂN', 1, 3, 3, 0, 5, 2, 1, 1, 2, 0),
('VŨ TẤN LỘC', 6, 3, 1, 2, 5, 0, 7, 1, 3, 0),
('NGUYỄN ĐỨC ANH', 0, 0, 0, 0, 1, 0, 0, 0, 0, 0),
('ĐẶNG HÙNG LĨNH', 0, 0, 0, 1, 1, 2, 0, 0, 0, 0),
('PHẠM HẢI PHONG', 0, 0, 0, 0, 0, 0, 0, 1, 0, 0),
('PHẠM KIÊN', 2, 0, 1, 2, 3, 2, 5, 1, 4, 0),
('PHẠM THẾ DUY', 0, 0, 0, 0, 2, 1, 3, 6, 1, 4),
('CHIỀU', 4, 0, 1, 0, 0, 1, 1, 0, 2, 0),
('DUY TIÊN', 0, 0, 3, 0, 1, 0, 3, 1, 2, 0),
('VIỆT ANH', 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
('TÔ MINH TUẤN', 2, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('PHÙNG ĐỨC HUỲNH', 0, 0, 3, 0, 5, 4, 6, 0, 3, 1),
('ĐẶNG HOÀNG NAM', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0),
('VÕ PHI THỨC', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('VŨ HÙNG', 0, 0, 0, 0, 0, 1, 0, 1, 0, 0),
('BÙI NIÊM', 0, 0, 0, 0, 1, 0, 1, 1, 0, 0),
('LÊ HIẾU', 0, 0, 1, 0, 1, 0, 0, 0, 0, 0),
('ANH ĐỨC', 0, 0, 1, 0, 7, 1, 2, 3, 0, 1),
('TRẦN QUANG THÁI', 0, 0, 0, 1, 0, 0, 1, 0, 1, 0),
('ĐÀM HẢI YẾN', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('NGUYỄN TÚ', 0, 2, 0, 1, 0, 1, 2, 0, 0, 0),
('NGUYỄN CÔNG MINH', 0, 0, 0, 0, 1, 1, 0, 0, 0, 0),
('NGUYỄN HỒNG QUÂN', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('HOÀNG ANH', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
('THẠC BẢO', 0, 3, 0, 0, 0, 0, 0, 0, 0, 1),
('QUANG ĐẠO', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- 5. Xem kết quả số liệu vừa cập nhật
SELECT * FROM public.player_scores;
