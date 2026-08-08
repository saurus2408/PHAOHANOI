const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hiykohhpxogniosdowjo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const players = [
    {num: 1, name: 'LÊ GIA LINH'}, {num: 2, name: 'HOÀNG XUÂN GIAO'}, {num: 3, name: 'NGUYỄN TIẾN THÀNH'},
    {num: 4, name: 'LÊ HƯNG'}, {num: 5, name: 'ĐÀM MINH TUẤN'}, {num: 6, name: 'NGUYÊN MẠNH'},
    {num: 7, name: 'TUẤN'}, {num: 8, name: 'NGUYỄN XUÂN ĐẠT'}, {num: 9, name: 'ĐỖ VIỆT HOÀNG'},
    {num: 10, name: 'LÊ BÁ TÙNG'}, {num: 11, name: 'DUY NAM'}, {num: 12, name: 'NGUYỄN TRUNG KIÊN'},
    {num: 13, name: 'NGUYỄN THÁI ĐỨC'}, {num: 14, name: 'HIỆP VIẾT HIỆP'}, {num: 15, name: 'LÊ ĐỨC'},
    {num: 16, name: 'QUANG PHƯƠNG'}, {num: 17, name: 'HẠNH'}, {num: 18, name: 'PHẠM HỒNG QUÂN'},
    {num: 19, name: 'VŨ TẤN LỘC'}, {num: 20, name: 'NGUYỄN ĐỨC ANH'}, {num: 21, name: 'ĐẶNG HÙNG LĨNH'},
    {num: 22, name: 'PHẠM HẢI PHONG'}, {num: 23, name: 'PHẠM KIÊN'}, {num: 24, name: 'PHẠM THẾ DUY'},
    {num: 25, name: 'CHIỀU'}, {num: 26, name: 'DUY TIÊN'}, {num: 27, name: 'VIỆT ANH'},
    {num: 28, name: 'TÔ MINH TUẤN'}, {num: 29, name: 'PHÙNG ĐỨC HUỲNH'}, {num: 30, name: 'ĐẶNG HOÀNG NAM'},
    {num: 31, name: 'VÕ PHI THỨC'}, {num: 32, name: 'VŨ HÙNG'}, {num: 33, name: 'BÙI NIÊM'},
    {num: 35, name: 'ANH ĐỨC'}, {num: 36, name: 'TRẦN QUANG THÁI'}, {num: 37, name: 'ĐÀM HẢI YẾN'},
    {num: 38, name: 'NGUYỄN TÚ'}, {num: 39, name: 'NGUYỄN CÔNG MINH'}, {num: 40, name: 'NGUYỄN HỒNG QUÂN'},
    {num: 41, name: 'HOÀNG ANH'}, {num: 42, name: 'THẠC BẢO'}, {num: 43, name: 'QUANG ĐẠO'}
];

async function seed() {
    console.log("Seeding players to Supabase directly...");
    // Clear old data first if needed
    const { error: delErr } = await supabase.from('players').delete().neq('num', -999);
    if (delErr) console.log("Delete info:", delErr.message);

    const { data, error } = await supabase.from('players').insert(players).select();
    if (error) {
        console.error("INSERT ERROR:", error.message);
    } else {
        console.log("SUCCESSFULLY INSERTED", data.length, "PLAYERS INTO SUPABASE!");
    }
}

seed();
