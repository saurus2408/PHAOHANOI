const fs = require('fs');
const path = require('path');

const teamsJsContent = fs.readFileSync(path.join(__dirname, '../js/teams.js'), 'utf8');
const rosterRegex = /const DEFAULT_ROSTER = \[([\s\S]*?)\];/;
const match = teamsJsContent.match(rosterRegex);

const rosterItems = eval('[' + match[1] + ']');
console.log('Total players in roster:', rosterItems.length);

const sampleCheck = [
    "Lê Quang Đạo", "Nguyễn Mạnh Thanh", "Bùi Văn Niêm", "Phùng Đức Huỳnh", 
    "Vũ Tấn Lộc", "Lê Bá Tùng", "Nguyễn Quang Huy", "Vũ Ngọc Duy"
];

rosterItems.forEach(p => {
    if (sampleCheck.includes(p.name)) {
        console.log(`- ${p.name}: Vị trí = ${p.primaryPosition}, Trình độ = ${p.skillLevel}, Overall = ${p.overall}`);
    }
});
