const fs = require('fs');
const path = require('path');

const teamsJsPath = path.join(__dirname, '../js/teams.js');
let teamsJsContent = fs.readFileSync(teamsJsPath, 'utf8');

// Replace all occurrences of 2025 defaults with 2026 in js/teams.js
teamsJsContent = teamsJsContent.replace("STORAGE_PLAYERS_KEY = 'phn_teams_players_v3'", "STORAGE_PLAYERS_KEY = 'phn_teams_players_v4'");
teamsJsContent = teamsJsContent.replace("let currentDivisionYear = '2025';", "let currentDivisionYear = '2026';");
teamsJsContent = teamsJsContent.replace("id: 'hist_default_2025_q3'", "id: 'hist_default_2026_q3'");
teamsJsContent = teamsJsContent.replace("date: '28/09/2025 15:00'", "date: '28/09/2026 15:00'");
teamsJsContent = teamsJsContent.replace("year: '2025'", "year: '2026'");
teamsJsContent = teamsJsContent.replace("periodLabel: 'Quý 3 (Năm 2025)'", "periodLabel: 'Quý 3 (Năm 2026)'");
teamsJsContent = teamsJsContent.replace("const scoreYear = s.year || 2025;", "const scoreYear = s.year || 2026;");
teamsJsContent = teamsJsContent.replace("value || '2025'", "value || '2026'");
teamsJsContent = teamsJsContent.replace("currentDivisionYear || '2025'", "currentDivisionYear || '2026'");
teamsJsContent = teamsJsContent.replace("'Năm 2025'", "'Năm 2026'");

// Update DEFAULT_ROSTER to include year: 2026 in score objects
const rosterRegex = /const DEFAULT_ROSTER = \[([\s\S]*?)\];/;
const match = teamsJsContent.match(rosterRegex);

if (match) {
    const rosterItems = eval('[' + match[1] + ']');
    rosterItems.forEach(p => {
        p.year = 2026;
    });

    const newRosterJs = 'const DEFAULT_ROSTER = [\n' + rosterItems.map(p => {
        const fields = [
            `num: ${p.num}`,
            `name: ${JSON.stringify(p.name)}`,
            `primaryPosition: ${JSON.stringify(p.primaryPosition)}`,
            `skillLevel: ${JSON.stringify(p.skillLevel)}`,
            `overall: ${p.overall}`,
            `year: 2026`
        ];
        ['m3', 'a3', 'm4', 'a4', 'm5', 'a5', 'm6', 'a6', 'm7', 'a7', 'm8', 'a8', 'm9', 'a9', 'm10', 'a10', 'm11', 'a11', 'm12', 'a12'].forEach(m => {
            if (p[m] !== undefined) fields.push(`${m}: ${p[m]}`);
        });
        return '        { ' + fields.join(', ') + ' }';
    }).join(',\n') + '\n    ];';

    teamsJsContent = teamsJsContent.replace(rosterRegex, newRosterJs);
}

fs.writeFileSync(teamsJsPath, teamsJsContent, 'utf8');
console.log('Updated js/teams.js to 2026!');

// Update teams.html dropdowns
const teamsHtmlPath = path.join(__dirname, '../teams.html');
let teamsHtmlContent = fs.readFileSync(teamsHtmlPath, 'utf8');

teamsHtmlContent = teamsHtmlContent.replace(
    '<option value="2025" selected>Năm 2025</option>\n                            <option value="2026">Năm 2026</option>',
    '<option value="2025">Năm 2025</option>\n                            <option value="2026" selected>Năm 2026</option>'
);

teamsHtmlContent = teamsHtmlContent.replace(
    '<option value="2025" selected>Năm 2025</option>\n                            <option value="2026">Năm 2026</option>',
    '<option value="2025">Năm 2025</option>\n                            <option value="2026" selected>Năm 2026</option>'
);

fs.writeFileSync(teamsHtmlPath, teamsHtmlContent, 'utf8');
console.log('Updated teams.html dropdowns to 2026!');
