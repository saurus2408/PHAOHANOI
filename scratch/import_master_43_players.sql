-- ============================================================
-- SCRIPT TỔNG HỢP SUPABASE CHUẨN 100%: 43 CẦU THỦ VỚI SỐ ÁO, NGÀY SINH, QUÊ QUÁN, NGHỀ NGHIỆP
-- (Copy toàn bộ dán vào Supabase SQL Editor và nhấn RUN)
-- ============================================================

-- 1. Xóa sạch các bảng cũ nếu tồn tại
DROP TABLE IF EXISTS public.player_scores CASCADE;
DROP TABLE IF EXISTS public.players CASCADE;

-- 2. Tạo bảng `players` chuẩn
CREATE TABLE public.players (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    num INT,
    name TEXT,
    img TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tạo bảng `player_scores` chuẩn
CREATE TABLE public.player_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_id UUID,
    name TEXT UNIQUE,
    m1 INT DEFAULT 0, m2 INT DEFAULT 0, m3 INT DEFAULT 0, m4 INT DEFAULT 0, m5 INT DEFAULT 0, m6 INT DEFAULT 0,
    m7 INT DEFAULT 0, m8 INT DEFAULT 0, m9 INT DEFAULT 0, m10 INT DEFAULT 0, m11 INT DEFAULT 0, m12 INT DEFAULT 0,
    a1 INT DEFAULT 0, a2 INT DEFAULT 0, a3 INT DEFAULT 0, a4 INT DEFAULT 0, a5 INT DEFAULT 0, a6 INT DEFAULT 0,
    a7 INT DEFAULT 0, a8 INT DEFAULT 0, a9 INT DEFAULT 0, a10 INT DEFAULT 0, a11 INT DEFAULT 0, a12 INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tắt RLS để trang web đọc/ghi không bị Supabase âm thầm chặn
ALTER TABLE public.players DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_scores DISABLE ROW LEVEL SECURITY;

-- 5. Nạp danh sách 43 Cầu thủ chi tiết (Số áo, Tên, Ngày sinh, Quê quán, Nghề nghiệp) vào bảng `players`
INSERT INTO public.players (num, name) VALUES
(5, '{"name":"NGUYÊN MẠNH","position":"Hậu vệ","dob":"1998-03-16","hometown":"THÁI NGUYÊN","career":"BÁN CHÈ"}'),
(12, '{"name":"NGUYỄN THÁI","position":"Hậu vệ","dob":"2004-02-01","hometown":"HÀ NỘI","career":"SINH VIÊN IT"}'),
(58, '{"name":"BÙI","position":"Hậu vệ","dob":"1998-02-23","hometown":"HÒA BÌNH","career":"HÀN QUỐC"}'),
(14, '{"name":"HIỆP VIẾT HIỆP","position":"Hậu vệ","dob":"1996-03-07","hometown":"LÀO CAI","career":"THỢ ẢNH"}'),
(19, '{"name":"PHẠM HỒNG QUÂN","position":"Hậu vệ","dob":"2004-03-01","hometown":"NGHỆ AN","career":"SINH VIÊN MT"}'),
(48, '{"name":"VŨ HÙNG","position":"Hậu vệ","dob":"1997-01-28","hometown":"HÀ NỘI","career":"Chưa cập nhật"}'),
(29, '{"name":"DUY TIÊN","position":"Hậu vệ","dob":"2000-01-01","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(11, '{"name":"NGUYỄN TRUNG KIÊN","position":"Hậu vệ","dob":"1985-04-29","hometown":"HẢI PHÒNG","career":"BÁN LOA"}'),
(16, '{"name":"QUANG PHƯƠNG","position":"Hậu vệ","dob":"1996-06-07","hometown":"VIỆT NAM","career":"KTV MÁY TÍNH"}'),
(4, '{"name":"ĐÀM MINH TUẤN","position":"Hậu vệ","dob":"1987-04-01","hometown":"HÀ NỘI","career":"KINH DOANH"}'),
(3, '{"name":"LÊ HƯNG","position":"Hậu vệ","dob":"1994-09-17","hometown":"HÀ NỘI","career":"Chưa cập nhật"}'),
(66, '{"name":"NGUYỄN XUÂN ĐẠT","position":"Hậu vệ","dob":"1992-07-11","hometown":"VIỆT NAM","career":"LÁI XE"}'),
(8, '{"name":"ĐỖ VIỆT HOÀNG","position":"Hậu vệ","dob":"2000-08-21","hometown":"PHÚ THỌ","career":"BÁC SĨ ĐẺ"}'),
(92, '{"name":"NGUYỄN TÚ","position":"Hậu vệ","dob":"1992-08-21","hometown":"THÁI NGUYÊN","career":"IN ẤN"}'),
(2, '{"name":"NGUYỄN TIẾN THÀNH","position":"Hậu vệ","dob":"1996-10-06","hometown":"THÁI NGUYÊN","career":"BÁN MÁY"}'),
(6, '{"name":"TUẤN","position":"Hậu vệ","dob":"1900-09-06","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(0, '{"name":"HOÀNG XUÂN GIAO","position":"Hậu vệ","dob":"2006-08-24","hometown":"HÀ NỘI","career":"SINH VIÊN IT"}'),
(7, '{"name":"LÊ HIẾU","position":"Hậu vệ","dob":"1994-08-19","hometown":"LÀO CAI","career":"BÁC SĨ TRẤN THƯƠNG"}'),
(34, '{"name":"PHÙNG ĐỨC HUỲNH","position":"Hậu vệ","dob":"1997-07-06","hometown":"VIỆT NAM","career":"NGÂN HÀNG"}'),
(15, '{"name":"LÊ ĐỨC","position":"Hậu vệ","dob":"2006-10-03","hometown":"VIỆT NAM","career":"SINH VIÊN"}'),
(20, '{"name":"VŨ TẤN LỘC","position":"Hậu vệ","dob":"2004-10-10","hometown":"HÀ NỘI","career":"SINH VIÊN MT"}'),
(10, '{"name":"DUY NAM","position":"Hậu vệ","dob":"1998-12-01","hometown":"HÀ NỘI","career":"BÁN ÁO"}'),
(25, '{"name":"PHẠM KIÊN","position":"Hậu vệ","dob":"2004-10-18","hometown":"HÀ NỘI","career":"SINH VIÊN MT"}'),
(33, '{"name":"TÔ MINH TUẤN","position":"Hậu vệ","dob":"1992-12-30","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(9, '{"name":"LÊ BÁ TÙNG","position":"Hậu vệ","dob":"1994-12-08","hometown":"VIỆT NAM","career":"VĂN PHÒNG"}'),
(28, '{"name":"CHIỀU","position":"Hậu vệ","dob":"1997-12-01","hometown":"HÒA BÌNH","career":"Chưa cập nhật"}'),
(82, '{"name":"ANH ĐỨC","position":"Hậu vệ","dob":"2002-10-28","hometown":"HÒA BÌNH","career":"Chưa cập nhật"}'),
(23, '{"name":"ĐẶNG HÙNG LĨNH","position":"Hậu vệ","dob":"1994-12-30","hometown":"HÒA BÌNH","career":"Chưa cập nhật"}'),
(83, '{"name":"TRẦN QUANG THÁI","position":"Hậu vệ","dob":"1983-10-01","hometown":"VIỆT NAM","career":"NHÀ BÁO"}'),
(26, '{"name":"PHẠM HẢI PHONG","position":"Hậu vệ","dob":"2003-12-23","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(30, '{"name":"VIỆT ANH","position":"Hậu vệ","dob":"2000-12-24","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(35, '{"name":"ĐẶNG HOÀNG NAM","position":"Hậu vệ","dob":"1992-11-11","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(18, '{"name":"HẠNH","position":"Hậu vệ","dob":"2004-11-22","hometown":"THANH HÓA","career":"Chưa cập nhật"}'),
(98, '{"name":"NGUYỄN HỒNG QUÂN","position":"Hậu vệ","dob":"1998-11-15","hometown":"HÀ NAM","career":"Chưa cập nhật"}'),
(27, '{"name":"PHẠM THẾ DUY","position":"Hậu vệ","dob":"1997-10-27","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(22, '{"name":"NGUYỄN ĐỨC ANH","position":"Hậu vệ","dob":"2004-11-22","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(33, '{"name":"LÊ GIA LINH","position":"Hậu vệ","dob":"2003-12-18","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(97, '{"name":"NGUYỄN CÔNG MINH","position":"Hậu vệ","dob":"1997-04-07","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(37, '{"name":"VÕ PHI THỨC","position":"Hậu vệ","dob":"2004-05-19","hometown":"NGHỆ AN","career":"SINH VIÊN KT"}'),
(41, '{"name":"THẠC BẢO","position":"Hậu vệ","dob":"Chưa cập nhật","hometown":"NGHỆ AN","career":"SINH VIÊN"}'),
(0, '{"name":"HOÀNG ANH","position":"Hậu vệ","dob":"Chưa cập nhật","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(0, '{"name":"QUANG ĐẠO","position":"Hậu vệ","dob":"Chưa cập nhật","hometown":"VIỆT NAM","career":"Chưa cập nhật"}'),
(93, '{"name":"ĐÀM HẢI YẾN","position":"Hậu vệ","dob":"Chưa cập nhật","hometown":"HÀ NỘI","career":"Chưa cập nhật"}');

-- 6. Nạp Bàn thắng (m) & Kiến tạo (a) Tháng 3 -> Tháng 7 vào bảng `player_scores`
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
('NGUYỄN THÁI', 0, 1, 0, 0, 1, 0, 0, 0, 1, 0),
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
('BÙI', 0, 0, 0, 0, 1, 0, 1, 1, 0, 0),
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

-- 7. Kiểm tra kết quả trả về 43 cầu thủ
SELECT * FROM public.players ORDER BY num ASC;
