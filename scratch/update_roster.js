const fs = require('fs');
const path = require('path');

const userUpdatesRaw = `Lê Quang Đạo	Thủ Môn	Trung Bình Khá
Nguyễn Mạnh Thanh	Tiền Đạo	Trung Bình Yếu
Bùi Văn Niêm	Thủ Môn	Yếu +
Phùng Đức Huỳnh	Giữa	Trung Bình Yếu
Bùi Mạnh Hùng	Tiền Đạo	Khá
Đàm Minh Tuấn	Giữa	Trung Bình
Bùi Văn Chiều	Tiền Đạo	Yếu
Nguyễn Huy Cương	Cánh	Trung Bình Yếu
Bùi Đức Hạnh	Cánh	Trung Bình Yếu
Nguyễn Công Minh	Cánh	Yếu +
Đỗ Huy Anh Tú	Giữa	Trung Bình Yếu
Hoàng Quốc Dũng	Tiền Đạo	Trung Bình Yếu
Nguyễn Thương Tín	Thòng	Trung Bình Khá
Đỗ Việt Minh Khôi	Giữa	Khá
Vũ Thế Hùng	Cánh	Trung Bình Yếu
Nguyễn Duy Nam	Giữa	Trung Bình Yếu
Nguyễn Tiến Dũng	Giữa	Trung Bình
Nguyễn Hoàng Anh	Thủ Môn	Yếu +
Đặng Quốc Anh	Giữa	Trung Bình
Nguyễn Ngọc Sơn	Tiền Đạo	Trung Bình
Nguyễn Hồng Quân	Cánh	Yếu
Nguyễn Duy Tiên	Giữa	Trung Bình
Đặng Hùng Lĩnh	Cánh	Trung Bình
Phạm Quang Phương	Cánh	Yếu -
Phạm Hồng Quân	Cánh	Yếu
Hồng Viết Hiệp	Cánh	Trung Bình
Trần Anh Tuấn	Cánh	Trung Bình Khá
Đặng Hoàng Nam	Cánh	Yếu
Đỗ Việt Hoàng	Giữa	Khá
Dương Việt Anh	Tiền Đạo	Trung Bình
Lại Anh Đức	Giữa	Trung Bình
Vũ Tấn Lộc	Tiền Đạo	Khá
Đinh Phạm Kiên	Tiền Đạo	Trung Bình Yếu
Nguyễn Viết Tú	Cánh	Yếu
Lê Đức	Cánh	Trung Bình Yếu
Ngô Mạnh Quí	Tiền Đạo	Trung Bình Khá
Nguyễn Thái Đức	Giữa	Trung Bình
Nguyễn Tiến Mạnh	Thủ Môn	Trung Bình
Đinh Thế	Cánh	Trung Bình Yếu
Nguyễn Anh Tuấn 	Tiền Đạo	Trung Bình
Lương Văn Hoà	Tiền Đạo	Trung Bình Khá
Phạm Thành Mạnh	Thòng	Yếu +
Lương Hữu Tân	Giữa	Trung Bình
Trần Văn Minh	Thòng	Khá
Nguyễn Văn Bình	Thòng	Trung Bình
Lương khánh Tùng	Thòng	Trung Bình
Lê Hữu Minh	Giữa	Trung Bình Khá
Trần Hữu Bảo	Thòng	Trung Bình Khá
Đỗ Tuấn Anh	Thủ Môn	Trung Bình
Nguyễn Tiến Nam	Thòng	Trung Bình Yếu
lê minh Công	Thủ Môn	Trung Bình
Nguyễn Quang Huy	Thủ Môn	Khá
Hà Văn Hiệu	Giữa	Trung Bình Khá
Trần Quang Thái	Cánh	Yếu
Hoàng Trung Kiên	Tiền Đạo	Khá
Trác Phong	Giữa	Trung Bình Yếu
Lê Bá Tùng	Thủ Môn	Yếu +
Phùng Tiến Đạt	Thòng	Trung Bình Yếu
Trần Hoàng Dương	Thòng	Trung Bình
Vũ Ngọc Duy	Giữa	Trung Bình Khá`;

const posMap = {
    'thủ môn': 'GK',
    'thòng': 'CB/TH',
    'giữa': 'CM',
    'cánh': 'W',
    'tiền đạo': 'ST'
};

const skillNormMap = {
    'yếu': 'Yếu',
    'yếu -': 'Yếu',
    'yếu-': 'Yếu',
    'yếu+': 'Yếu+',
    'yếu +': 'Yếu+',
    'trung bình yếu': 'Trung bình yếu',
    'trung bình': 'Trung bình',
    'trung bình khá': 'Trung bình khá',
    'khá': 'Khá',
    'khá+': 'Khá+',
    'bán chuyên': 'Bán Chuyên',
    'chuyên nghiệp': 'Chuyên Nghiệp'
};

const skillOverallMap = {
    'Yếu': 42,
    'Yếu+': 48,
    'Trung bình yếu': 52,
    'Trung bình': 55,
    'Trung bình khá': 60,
    'Khá': 68,
    'Khá+': 74,
    'Bán Chuyên': 82,
    'Chuyên Nghiệp': 92
};

const updates = {};
userUpdatesRaw.split('\n').forEach(line => {
    const parts = line.split('\t');
    if (parts.length >= 3) {
        const name = parts[0].trim();
        const posRaw = parts[1].trim().toLowerCase();
        const skillRaw = parts[2].trim().toLowerCase();

        const posCode = posMap[posRaw] || 'CM';
        const skillLevel = skillNormMap[skillRaw] || 'Trung bình';
        const overall = skillOverallMap[skillLevel] || 55;

        updates[name.toLowerCase()] = {
            rawName: name,
            primaryPosition: posCode,
            skillLevel: skillLevel,
            overall: overall
        };
    }
});

console.log('Parsed updates count:', Object.keys(updates).length);

const teamsJsPath = path.join(__dirname, '../js/teams.js');
let teamsJsContent = fs.readFileSync(teamsJsPath, 'utf8');

// Match DEFAULT_ROSTER = [ ... ];
const rosterRegex = /const DEFAULT_ROSTER = \[([\s\S]*?)\];/;
const match = teamsJsContent.match(rosterRegex);

if (!match) {
    console.error('Could not find DEFAULT_ROSTER in teams.js');
    process.exit(1);
}

// Parse existing array items safely
const arrayStr = '[' + match[1] + ']';
// We can evaluate or parse object definitions in string
const rosterItems = eval(arrayStr);

let updatedCount = 0;
rosterItems.forEach(item => {
    let key = item.name.trim().toLowerCase();
    // Handle special name aliases
    if (key === 'nguyễn thái') {
        if (updates['nguyễn thái đức']) key = 'nguyễn thái đức';
    }
    if (updates[key]) {
        const u = updates[key];
        item.primaryPosition = u.primaryPosition;
        item.skillLevel = u.skillLevel;
        item.overall = u.overall;
        updatedCount++;
        delete updates[key];
    }
});

console.log(`Updated ${updatedCount} players in DEFAULT_ROSTER.`);
console.log('Remaining unmapped user updates:', Object.keys(updates));

// Format updated DEFAULT_ROSTER back to JS string
const newRosterJs = 'const DEFAULT_ROSTER = [\n' + rosterItems.map(p => {
    const fields = [
        `num: ${p.num}`,
        `name: ${JSON.stringify(p.name)}`,
        `primaryPosition: ${JSON.stringify(p.primaryPosition)}`,
        `skillLevel: ${JSON.stringify(p.skillLevel)}`,
        `overall: ${p.overall}`
    ];
    ['m3', 'a3', 'm4', 'a4', 'm5', 'a5', 'm6', 'a6', 'm7', 'a7', 'm8', 'a8', 'm9', 'a9', 'm10', 'a10', 'm11', 'a11', 'm12', 'a12'].forEach(m => {
        if (p[m] !== undefined) fields.push(`${m}: ${p[m]}`);
    });
    return '        { ' + fields.join(', ') + ' }';
}).join(',\n') + '\n    ];';

teamsJsContent = teamsJsContent.replace(rosterRegex, newRosterJs);

// Update STORAGE_PLAYERS_KEY to v2 so client storage updates
teamsJsContent = teamsJsContent.replace("STORAGE_PLAYERS_KEY = 'phn_teams_players_v1'", "STORAGE_PLAYERS_KEY = 'phn_teams_players_v2'");

fs.writeFileSync(teamsJsPath, teamsJsContent, 'utf8');
console.log('Successfully updated js/teams.js!');
