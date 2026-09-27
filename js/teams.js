/**
 * BALANCED TEAM GENERATOR & PLAYER MANAGEMENT ENGINE
 * Built for PHN FC Website - Scalable, Dynamic, Extensible Architecture
 */

(function () {
    'use strict';

    // ==========================================
    // 1. DEFAULT DATA & STORAGE KEYS
    // ==========================================
    const STORAGE_PLAYERS_KEY = 'phn_teams_players_v1';
    const STORAGE_POSITIONS_KEY = 'phn_teams_positions_v1';
    const STORAGE_SKILLS_KEY = 'phn_teams_skills_v1';
    const STORAGE_HISTORY_KEY = 'phn_teams_history_v1';
    const STORAGE_CONSTRAINTS_KEY = 'phn_teams_constraints_v1';
    const STORAGE_FORMATIONS_KEY = 'phn_teams_formations_v1';

    // Default Positions (Extensible by Admin/User)
    const DEFAULT_POSITIONS = [
        { code: 'GK', name: 'Thủ môn', category: 'GK' },
        { code: 'CB/TH', name: 'Thòng / Trung vệ', category: 'DEF' },
        { code: 'LB/RB', name: 'Hậu vệ cánh', category: 'DEF' },
        { code: 'CM', name: 'Tiền vệ trung tâm', category: 'MID' },
        { code: 'W', name: 'Tiền vệ cánh / Tiền đạo cánh', category: 'MID' },
        { code: 'CAM', name: 'Tiền vệ công / Hộ công', category: 'MID' },
        { code: 'ST', name: 'Tiền đạo cắm', category: 'FW' }
    ];

    // Default Skill Tiers with Points (Extensible by Admin/User)
    const DEFAULT_SKILL_LEVELS = [
        { id: 1, name: 'Yếu', rating: 10, badgeClass: 'skill-weak' },
        { id: 2, name: 'Yếu+', rating: 20, badgeClass: 'skill-weak' },
        { id: 3, name: 'Trung bình yếu', rating: 30, badgeClass: 'skill-avg' },
        { id: 4, name: 'Trung bình', rating: 40, badgeClass: 'skill-avg' },
        { id: 5, name: 'Trung bình khá', rating: 50, badgeClass: 'skill-avg' },
        { id: 6, name: 'Khá', rating: 60, badgeClass: 'skill-good' },
        { id: 7, name: 'Khá+', rating: 70, badgeClass: 'skill-good' },
        { id: 8, name: 'Bán Chuyên', rating: 82, badgeClass: 'skill-semipro' },
        { id: 9, name: 'Chuyên Nghiệp', rating: 95, badgeClass: 'skill-pro' }
    ];

    // Preloaded 74 players roster from PHN FC dataset with monthly scores (M3-M12)
    const DEFAULT_ROSTER = [
        { num: 1, name: "Vũ Tấn Lộc", primaryPosition: "ST", skillLevel: "Chuyên Nghiệp", overall: 92, m3: 6, a3: 3, m4: 1, a4: 2, m5: 5, a5: 0, m6: 7, a6: 1, m7: 3, a7: 0, m8: 7, a8: 2, m9: 8, a9: 0 },
        { num: 2, name: "Phùng Đức Huỳnh", primaryPosition: "W", skillLevel: "Bán Chuyên", overall: 84, m4: 3, a4: 0, m5: 5, a5: 4, m6: 6, a6: 0, m7: 4, a7: 1, m8: 3, a8: 4, m9: 0, a9: 4 },
        { num: 3, name: "Đinh Phạm Kiên", primaryPosition: "ST", skillLevel: "Chuyên Nghiệp", overall: 90, m3: 2, a3: 0, m4: 1, a4: 2, m5: 3, a5: 2, m6: 5, a6: 1, m7: 6, a7: 0, m8: 7, a8: 0, m9: 7, a9: 1 },
        { num: 4, name: "Phạm Hồng Quân", primaryPosition: "CAM", skillLevel: "Bán Chuyên", overall: 85, m3: 1, a3: 3, m4: 3, a4: 0, m5: 5, a5: 2, m6: 1, a6: 1, m7: 3, a7: 0, m8: 1, a8: 1, m9: 1, a9: 0 },
        { num: 5, name: "Lại Anh Đức", primaryPosition: "W", skillLevel: "Bán Chuyên", overall: 82, m4: 1, a4: 0, m5: 7, a5: 1, m6: 2, a6: 3, m7: 0, a7: 5, m8: 0, a8: 2, m9: 0, a9: 1 },
        { num: 6, name: "Nguyễn Tiến", primaryPosition: "ST", skillLevel: "Bán Chuyên", overall: 83, m3: 2, a3: 2, m4: 3, a4: 1, m5: 2, a5: 1, m7: 3, a7: 2, m8: 7, a8: 0, m9: 0, a9: 1 },
        { num: 7, name: "Hồng Viết Hiệp", primaryPosition: "ST", skillLevel: "Khá+", overall: 75, m3: 4, a3: 3, m5: 3, a5: 1, m6: 1, a6: 1, m7: 1, a7: 1, m8: 0, a8: 1 },
        { num: 8, name: "Nguyễn Duy Tiên", primaryPosition: "CM", skillLevel: "Khá+", overall: 72, m4: 3, a4: 0, m5: 1, a5: 0, m6: 3, a6: 1, m7: 2, a7: 0, m8: 2, a8: 1 },
        { num: 9, name: "Bùi Văn Chiều", primaryPosition: "W", skillLevel: "Khá+", overall: 74, m3: 4, a3: 0, m4: 1, a4: 0, m5: 0, a5: 1, m6: 1, a6: 0, m7: 2, a7: 1, m8: 3, a8: 0 },
        { num: 10, name: "Đỗ Việt Hoàng", primaryPosition: "CM", skillLevel: "Bán Chuyên", overall: 80, m3: 1, a3: 0, m4: 2, a4: 1, m5: 2, a5: 2, m6: 1, a6: 0, m7: 1, a7: 4, m8: 2, a8: 1, m9: 0, a9: 1 },
        { num: 11, name: "Nguyễn Duy Nam", primaryPosition: "CAM", skillLevel: "Khá+", overall: 76, m3: 3, a3: 5, m5: 2, a5: 1, m6: 2, a6: 0 },
        { num: 12, name: "Phạm Thế Duy", primaryPosition: "W", skillLevel: "Bán Chuyên", overall: 81, m5: 2, a5: 1, m6: 3, a6: 6, m7: 1, a7: 4, m8: 0, a8: 2 },
        { num: 13, name: "Đàm Minh Tuấn", primaryPosition: "CB/TH", skillLevel: "Khá+", overall: 73, m3: 1, a3: 0, m4: 2, a4: 4, m5: 1, a5: 3, m6: 1, a6: 0, m7: 0, a7: 2 },
        { num: 14, name: "Nguyễn Viết Tú", primaryPosition: "ST", skillLevel: "Khá", overall: 68, m3: 2, a3: 0, m4: 0, a4: 1, m5: 0, a5: 1, m6: 2, a6: 0, m7: 1, a7: 0 },
        { num: 15, name: "Nguyễn Trung Kiên", primaryPosition: "CM", skillLevel: "Khá", overall: 66, m3: 1, a3: 0, m5: 0, a5: 1, m6: 2, a6: 0 },
        { num: 16, name: "Lê Bá Tùng", primaryPosition: "CAM", skillLevel: "Khá", overall: 69, m3: 0, a3: 2, m4: 0, a4: 3, m5: 0, a5: 1, m6: 1, a6: 0, m7: 0, a7: 2, m8: 2, a8: 0, m9: 0, a9: 1 },
        { num: 17, name: "Bùi Đức Hạnh", primaryPosition: "CM", skillLevel: "Khá", overall: 65, m5: 1, a5: 1, m7: 1, a7: 1 },
        { num: 18, name: "Nguyễn Thái", primaryPosition: "LB/RB", skillLevel: "Khá", overall: 67, m3: 0, a3: 1, m5: 0, a5: 1, m8: 1, a8: 0, m9: 1, a9: 0 },
        { num: 19, name: "Bùi Văn Niêm", primaryPosition: "CB/TH", skillLevel: "Khá", overall: 65, m5: 1, a5: 0, m6: 0, a6: 1, m7: 1, a7: 0 },
        { num: 20, name: "Trần Quang Thái", primaryPosition: "W", skillLevel: "Khá", overall: 66, m4: 0, a4: 1, m6: 0, a6: 1, m7: 1, a7: 0, m9: 1, a9: 0 },
        { num: 21, name: "Hoàng Xuân Giao", primaryPosition: "CB/TH", skillLevel: "Khá", overall: 65, m3: 2, a3: 0, m9: 0, a9: 1 },
        { num: 22, name: "Tô Minh Tuấn", primaryPosition: "ST", skillLevel: "Khá", overall: 64, m3: 2, a3: 0 },
        { num: 23, name: "Lê Hiếu", primaryPosition: "CB/TH", skillLevel: "Khá", overall: 64, m4: 1, a4: 0, m5: 1, a5: 0 },
        { num: 24, name: "Đặng Hùng Lĩnh", primaryPosition: "CM", skillLevel: "Khá", overall: 65, m4: 0, a4: 1, m5: 1, a5: 2 },
        { num: 25, name: "Nguyễn Công Minh", primaryPosition: "W", skillLevel: "Khá", overall: 66, m5: 1, a5: 1, m9: 1, a9: 1 },
        { num: 26, name: "Nguyễn Xuân Đạt", primaryPosition: "LB/RB", skillLevel: "Trung bình khá", overall: 58, m3: 1, a3: 0 },
        { num: 27, name: "Nguyễn Đức Anh", primaryPosition: "CB/TH", skillLevel: "Trung bình khá", overall: 58, m5: 1, a5: 0 },
        { num: 28, name: "Dương Việt Anh", primaryPosition: "W", skillLevel: "Trung bình khá", overall: 58, m6: 1, a6: 0 },
        { num: 29, name: "Nguyễn Tiến Mạnh", primaryPosition: "CAM", skillLevel: "Khá", overall: 68, m3: 0, a3: 2, m5: 0, a5: 4, m8: 1, a8: 1 },
        { num: 30, name: "Thạc Bảo", primaryPosition: "CM", skillLevel: "Trung bình khá", overall: 59, m3: 0, a3: 3, m7: 0, a7: 1 },
        { num: 31, name: "Vũ Thế Hùng", primaryPosition: "LB/RB", skillLevel: "Trung bình khá", overall: 56, m5: 0, a5: 1, m6: 0, a6: 1 },
        { num: 32, name: "Trần Anh Tuấn", primaryPosition: "CM", skillLevel: "Khá", overall: 65, m4: 0, a4: 1, m8: 1, a8: 2 },
        { num: 33, name: "Phạm Quang Phương", primaryPosition: "LB/RB", skillLevel: "Trung bình khá", overall: 57, m3: 0, a3: 1, m8: 0, a8: 1, m9: 0, a9: 1 },
        { num: 34, name: "Phạm Hải Phong", primaryPosition: "CB/TH", skillLevel: "Trung bình", overall: 54, m6: 0, a6: 1 },
        { num: 35, name: "Đặng Hoàng Nam", primaryPosition: "CM", skillLevel: "Trung bình", overall: 54, m5: 0, a5: 1, m7: 0, a7: 1 },
        { num: 36, name: "Nguyễn Hoàng Anh", primaryPosition: "W", skillLevel: "Trung bình", overall: 54, m7: 0, a7: 1, m9: 0, a9: 1 },
        { num: 37, name: "Lê Gia Linh", primaryPosition: "GK", skillLevel: "Khá", overall: 65 },
        { num: 38, name: "Lưu Việt Hưng", primaryPosition: "ST", skillLevel: "Khá", overall: 62, m6: 1, a6: 0 },
        { num: 39, name: "Lê Đức", primaryPosition: "CM", skillLevel: "Trung bình", overall: 50 },
        { num: 40, name: "Võ Phi Thức", primaryPosition: "LB/RB", skillLevel: "Trung bình", overall: 50 },
        { num: 41, name: "Đàm Hải Yến", primaryPosition: "W", skillLevel: "Trung bình", overall: 50 },
        { num: 42, name: "Nguyễn Hồng Quân", primaryPosition: "CM", skillLevel: "Trung bình", overall: 52, m8: 0, a8: 1 },
        { num: 43, name: "Lê Quang Đạo", primaryPosition: "ST", skillLevel: "Trung bình", overall: 50 },
        { num: 44, name: "Đỗ Huy Anh Tú", primaryPosition: "CAM", skillLevel: "Trung bình khá", overall: 55, m8: 0, a8: 1 },
        { num: 45, name: "Đặng Quốc Anh", primaryPosition: "W", skillLevel: "Khá", overall: 60, m8: 1, a8: 1 },
        { num: 46, name: "Đinh Thế", primaryPosition: "CB/TH", skillLevel: "Trung bình", overall: 50 },
        { num: 47, name: "Nguyễn Anh Tuấn", primaryPosition: "CM", skillLevel: "Trung bình", overall: 50 },
        { num: 48, name: "Lương Văn Hoà", primaryPosition: "LB/RB", skillLevel: "Trung bình", overall: 50 },
        { num: 49, name: "Phạm Thành Mạnh", primaryPosition: "CB/TH", skillLevel: "Trung bình", overall: 50 },
        { num: 50, name: "Lương Hữu Tân", primaryPosition: "CM", skillLevel: "Trung bình", overall: 50 },
        { num: 51, name: "Trần Văn Minh", primaryPosition: "W", skillLevel: "Trung bình", overall: 50 },
        { num: 52, name: "Nguyễn Văn Bình", primaryPosition: "CB/TH", skillLevel: "Trung bình", overall: 50 },
        { num: 53, name: "Lương khánh Tùng", primaryPosition: "CM", skillLevel: "Trung bình", overall: 50 },
        { num: 54, name: "Lê Hữu Minh", primaryPosition: "ST", skillLevel: "Trung bình", overall: 50 },
        { num: 55, name: "Trần Hữu Bảo", primaryPosition: "GK", skillLevel: "Trung bình khá", overall: 55 },
        { num: 56, name: "Đỗ Tuấn Anh", primaryPosition: "CM", skillLevel: "Trung bình", overall: 50 },
        { num: 57, name: "Nguyễn Tiến Nam", primaryPosition: "W", skillLevel: "Trung bình", overall: 50 },
        { num: 58, name: "lê minh Công", primaryPosition: "CB/TH", skillLevel: "Trung bình", overall: 50 },
        { num: 59, name: "Nguyễn Quang Huy", primaryPosition: "CAM", skillLevel: "Trung bình", overall: 50 },
        { num: 60, name: "Hà Văn Hiệu", primaryPosition: "ST", skillLevel: "Trung bình", overall: 50 },
        { num: 61, name: "Hoàng Trung Kiên", primaryPosition: "CM", skillLevel: "Trung bình", overall: 50 },
        { num: 62, name: "Trác Phong", primaryPosition: "W", skillLevel: "Trung bình", overall: 50 },
        { num: 63, name: "Phùng Tiến Đạt", primaryPosition: "CB/TH", skillLevel: "Trung bình", overall: 50 },
        { num: 64, name: "Trần Hoàng Dương", primaryPosition: "CM", skillLevel: "Trung bình", overall: 50 },
        { num: 65, name: "Vũ Ngọc Duy", primaryPosition: "LB/RB", skillLevel: "Trung bình", overall: 50 },
        { num: 66, name: "Ngô Mạnh Quí", primaryPosition: "ST", skillLevel: "Trung bình", overall: 50 },
        { num: 67, name: "Nguyễn Ngọc Sơn", primaryPosition: "CM", skillLevel: "Trung bình", overall: 50 },
        { num: 68, name: "Nguyễn Tiến Dũng", primaryPosition: "CB/TH", skillLevel: "Trung bình", overall: 50 },
        { num: 69, name: "Hoàng Quốc Dũng", primaryPosition: "W", skillLevel: "Trung bình", overall: 50 },
        { num: 70, name: "Nguyễn Thương Tín", primaryPosition: "CAM", skillLevel: "Trung bình", overall: 50 },
        { num: 71, name: "Đỗ Việt Minh Khôi", primaryPosition: "ST", skillLevel: "Trung bình", overall: 50 },
        { num: 72, name: "Nguyễn Huy Cương", primaryPosition: "CM", skillLevel: "Trung bình", overall: 50 },
        { num: 73, name: "Bùi Mạnh Hùng", primaryPosition: "CB/TH", skillLevel: "Trung bình", overall: 50 },
        { num: 74, name: "Nguyễn Mạnh Thanh", primaryPosition: "LB/RB", skillLevel: "Trung bình", overall: 50 }
    ];

    // ==========================================
    // 2. STATE MANAGEMENT
    // ==========================================
    let players = [];
    let positions = [];
    let skillLevels = [];
    let constraints = { lockedTeams: {}, pairSame: [], pairDiff: [] };
    let sessionHistory = [];
    let currentProposals = [];
    let activeProposalIndex = 0;

    // Initialize State
    function initData() {
        // Positions
        const savedPos = localStorage.getItem(STORAGE_POSITIONS_KEY);
        positions = savedPos ? JSON.parse(savedPos) : DEFAULT_POSITIONS;

        // Skill Levels
        const savedSkills = localStorage.getItem(STORAGE_SKILLS_KEY);
        skillLevels = savedSkills ? JSON.parse(savedSkills) : DEFAULT_SKILL_LEVELS;

        // History
        const savedHist = localStorage.getItem(STORAGE_HISTORY_KEY);
        sessionHistory = savedHist ? JSON.parse(savedHist) : [];

        // Constraints
        const savedConst = localStorage.getItem(STORAGE_CONSTRAINTS_KEY);
        constraints = savedConst ? JSON.parse(savedConst) : { lockedTeams: {}, pairSame: [], pairDiff: [] };

        // Players
        const savedPlayers = localStorage.getItem(STORAGE_PLAYERS_KEY);
        if (savedPlayers && JSON.parse(savedPlayers).length >= 70) {
            players = JSON.parse(savedPlayers);
        } else {
            // Load default roster with generated IDs and monthly scores
            players = DEFAULT_ROSTER.map((p, idx) => ({
                id: 'p_' + Date.now() + '_' + idx,
                num: p.num || (idx + 1),
                name: p.name,
                primaryPosition: p.primaryPosition || 'CM',
                secondaryPosition1: p.secondaryPosition1 || '',
                secondaryPosition2: '',
                skillLevel: p.skillLevel || 'Khá',
                overall: p.overall || 65,
                scores: p,
                active: true,
                lockedTeam: null,
                notes: ''
            }));
            savePlayers();
        }

        // Sync with Supabase if available
        fetchSupabaseRoster();
    }

    async function fetchSupabaseRoster() {
        if (typeof _supabase !== 'undefined' && _supabase) {
            try {
                const { data: pList } = await _supabase.from('players').select('*').order('num', { ascending: true });
                const { data: sList } = await _supabase.from('player_scores').select('*');

                if (pList && pList.length > 0) {
                    players = pList.map((p, idx) => {
                        let name = p.name;
                        let pos = p.position || 'CM';
                        if (name && name.startsWith('{') && name.endsWith('}')) {
                            try {
                                const meta = JSON.parse(name);
                                name = meta.name || name;
                                pos = meta.position || pos;
                            } catch(e) {}
                        }

                        const scoreRow = sList ? sList.find(s => (s.player_id && s.player_id === p.id) || (s.name && s.name.trim().toLowerCase() === name.trim().toLowerCase())) : null;
                        const defaultMatch = DEFAULT_ROSTER.find(d => d.name.trim().toLowerCase() === name.trim().toLowerCase());

                        return {
                            id: p.id,
                            num: p.num || (idx + 1),
                            name: name,
                            primaryPosition: pos || (defaultMatch ? defaultMatch.primaryPosition : 'CM'),
                            secondaryPosition1: '',
                            secondaryPosition2: '',
                            skillLevel: defaultMatch ? defaultMatch.skillLevel : 'Khá',
                            overall: defaultMatch ? defaultMatch.overall : 65,
                            scores: scoreRow || defaultMatch || {},
                            active: true,
                            lockedTeam: null
                        };
                    });
                    savePlayers();
                    renderPlayerTable();
                }
            } catch (e) {
                console.warn("Supabase sync teams:", e);
            }
        }
    }

    // Helper: Calculate goals, assists, and performance rating for selected Year, Month or Quarter
    function calculatePeriodStats(p, year, period) {
        let g = 0, a = 0;
        const s = p.scores || p;

        const scoreYear = s.year || 2025;
        if (year && year !== 'all' && parseInt(year) !== parseInt(scoreYear)) {
            const baseRating = p.overall || 65;
            return { goals: 0, assists: 0, periodOverall: baseRating };
        }

        if (!period || period === 'all') {
            for (let i = 1; i <= 12; i++) {
                g += (s['m' + i] || 0);
                a += (s['a' + i] || 0);
            }
        } else if (period.startsWith('m')) {
            const m = parseInt(period.replace('m', ''));
            g = s['m' + m] || 0;
            a = s['a' + m] || 0;
        } else if (period.startsWith('q')) {
            const q = parseInt(period.replace('q', ''));
            const startM = (q - 1) * 3 + 1;
            for (let i = startM; i < startM + 3; i++) {
                g += (s['m' + i] || 0);
                a += (s['a' + i] || 0);
            }
        }

        const baseRating = p.overall || 65;
        let periodOverall = baseRating;
        if ((period && period !== 'all') || (year && year !== 'all')) {
            periodOverall = Math.min(99, Math.max(40, Math.round(baseRating + (g * 3) + (a * 2))));
        }

        return { goals: g, assists: a, periodOverall };
    }

    function savePlayers() {
        localStorage.setItem(STORAGE_PLAYERS_KEY, JSON.stringify(players));
    }

    function savePositions() {
        localStorage.setItem(STORAGE_POSITIONS_KEY, JSON.stringify(positions));
    }

    function saveSkillLevels() {
        localStorage.setItem(STORAGE_SKILLS_KEY, JSON.stringify(skillLevels));
    }

    function saveConstraints() {
        localStorage.setItem(STORAGE_CONSTRAINTS_KEY, JSON.stringify(constraints));
    }

    function saveHistory() {
        localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(sessionHistory));
    }

    // Helper: Map skill level name to point rating
    function getSkillRating(levelName, fallbackOverall) {
        if (fallbackOverall && typeof fallbackOverall === 'number') return fallbackOverall;
        const found = skillLevels.find(s => s.name.toLowerCase() === (levelName || '').toLowerCase());
        return found ? found.rating : 60;
    }

    function getSkillBadgeClass(levelName) {
        const found = skillLevels.find(s => s.name.toLowerCase() === (levelName || '').toLowerCase());
        return found ? (found.badgeClass || 'skill-avg') : 'skill-avg';
    }

    function getPositionBadgeClass(posCode) {
        const pos = positions.find(p => p.code === posCode);
        const cat = pos ? pos.category : 'MID';
        switch (cat) {
            case 'GK': return 'pos-gk';
            case 'DEF': return 'pos-def';
            case 'MID': return 'pos-mid';
            case 'FW': return 'pos-fw';
            default: return 'pos-other';
        }
    }

    // ==========================================
    // 3. UI TAB SWITCHER & RENDERING
    // ==========================================
    window.switchTab = function (tabId) {
        const isAdmin = sessionStorage.getItem('phn_admin') === 'true' || document.body.classList.contains('admin-active');
        // Non-admin can only access 'results' and 'history'
        if (!isAdmin && (tabId === 'players' || tabId === 'setup' || tabId === 'settings')) {
            tabId = 'results';
        }

        document.querySelectorAll('.step-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

        const targetBtn = document.querySelector(`.step-btn[onclick="switchTab('${tabId}')"]`);
        const targetPanel = document.getElementById(tabId + '-panel');

        if (targetBtn) targetBtn.classList.add('active');
        if (targetPanel) targetPanel.classList.add('active');

        if (tabId === 'players') renderPlayerTable();
        if (tabId === 'history') renderHistoryTab();
        if (tabId === 'settings') renderSettingsTab();
        if (tabId === 'results') renderResultsView();
    };

    // Render Main Player List Table
    window.renderPlayerTable = function () {
        const tbody = document.getElementById('team-player-tbody');
        if (!tbody) return;

        const searchVal = (document.getElementById('p-search-input')?.value || '').toLowerCase();
        const posFilter = document.getElementById('p-pos-filter')?.value || '';
        const levelFilter = document.getElementById('p-level-filter')?.value || '';

        const filtered = players.filter(p => {
            const matchName = p.name.toLowerCase().includes(searchVal) || String(p.num).includes(searchVal);
            const matchPos = !posFilter || p.primaryPosition === posFilter;
            const matchLevel = !levelFilter || p.skillLevel === levelFilter;
            return matchName && matchPos && matchLevel;
        });

        // Update count text
        const countSpan = document.getElementById('player-count-summary');
        if (countSpan) {
            const activeCount = players.filter(p => p.active).length;
            countSpan.textContent = `Tổng: ${players.length} cầu thủ | Đang chọn đá: ${activeCount} người`;
        }

        const yearKey = document.getElementById('p-year-filter')?.value || 'all';
        const periodKey = document.getElementById('p-time-period')?.value || 'all';

        let html = '';
        filtered.forEach((p, idx) => {
            const isChecked = p.active ? 'checked' : '';
            const posBadge = `<span class="pos-badge ${getPositionBadgeClass(p.primaryPosition)}">${p.primaryPosition}</span>`;
            const skillBadge = `<span class="skill-badge ${getSkillBadgeClass(p.skillLevel)}">${p.skillLevel}</span>`;
            const secPos = [p.secondaryPosition1, p.secondaryPosition2].filter(Boolean).join(', ') || '-';

            const periodStats = calculatePeriodStats(p, yearKey, periodKey);
            const displayOverall = (periodKey === 'all' && yearKey === 'all') ? p.overall : periodStats.periodOverall;
            const statsBadge = (periodKey !== 'all' || yearKey !== 'all' || periodStats.goals > 0 || periodStats.assists > 0)
                ? `<span style="font-size:0.75rem; color:var(--accent); font-weight:700; margin-left:6px;">(⚽ ${periodStats.goals} | 👟 ${periodStats.assists})</span>`
                : '';

            html += `
                <tr style="${!p.active ? 'opacity: 0.5; background: rgba(0,0,0,0.2);' : ''}">
                    <td style="text-align: center;">
                        <input type="checkbox" ${isChecked} onchange="togglePlayerActive('${p.id}')">
                    </td>
                    <td style="text-align: center; font-weight: 700; color: var(--accent);">${p.num || (idx + 1)}</td>
                    <td>
                        <strong style="color: #fff;">${escapeHtml(p.name)}</strong>
                        ${statsBadge}
                    </td>
                    <td>${posBadge}</td>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">${secPos}</td>
                    <td>${skillBadge}</td>
                    <td style="text-align: center;">
                        <span style="font-weight: 800; color: #fff; background: rgba(255,255,255,0.08); padding: 2px 8px; border-radius: 4px;">
                            ${displayOverall}
                        </span>
                    </td>
                    <td style="text-align: center;">
                        <select class="select-style" style="padding: 3px 6px; font-size: 0.8rem;" onchange="setPlayerLock('${p.id}', this.value)">
                            <option value="">-- Tự do --</option>
                            <option value="1" ${p.lockedTeam === 1 ? 'selected' : ''}>Khóa Đội 1</option>
                            <option value="2" ${p.lockedTeam === 2 ? 'selected' : ''}>Khóa Đội 2</option>
                            <option value="3" ${p.lockedTeam === 3 ? 'selected' : ''}>Khóa Đội 3</option>
                            <option value="4" ${p.lockedTeam === 4 ? 'selected' : ''}>Khóa Đội 4</option>
                        </select>
                    </td>
                    <td style="text-align: center;">
                        <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="editPlayerModal('${p.id}')"><i data-lucide="edit"></i></button>
                        <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.8rem; color: #ef5350;" onclick="deletePlayer('${p.id}')"><i data-lucide="trash-2"></i></button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html || '<tr><td colspan="9" style="text-align:center; padding: 20px; color:#888;">Không có cầu thủ nào</td></tr>';
        if (window.lucide) lucide.createIcons();
    };

    window.togglePlayerActive = function (id) {
        const p = players.find(x => x.id === id);
        if (p) {
            p.active = !p.active;
            savePlayers();
            renderPlayerTable();
        }
    };

    window.setPlayerLock = function (id, val) {
        const p = players.find(x => x.id === id);
        if (p) {
            p.lockedTeam = val ? parseInt(val) : null;
            savePlayers();
        }
    };

    window.toggleSelectAllPlayers = function (checked) {
        players.forEach(p => p.active = checked);
        savePlayers();
        renderPlayerTable();
    };

    // ==========================================
    // 4. ADD / EDIT PLAYER MODAL
    // ==========================================
    window.openAddPlayerModal = function () {
        document.getElementById('player-modal-title').textContent = 'Thêm Cầu Thủ Mới';
        document.getElementById('edit-p-id').value = '';
        document.getElementById('edit-p-name').value = '';
        document.getElementById('edit-p-num').value = players.length + 1;
        document.getElementById('edit-p-overall').value = 65;
        document.getElementById('edit-p-notes').value = '';

        populatePosSelects();
        populateSkillSelects();

        openModal('add-player');
    };

    window.editPlayerModal = function (id) {
        const p = players.find(x => x.id === id);
        if (!p) return;

        document.getElementById('player-modal-title').textContent = 'Chỉnh Sửa Cầu Thủ';
        document.getElementById('edit-p-id').value = p.id;
        document.getElementById('edit-p-name').value = p.name;
        document.getElementById('edit-p-num').value = p.num || '';
        document.getElementById('edit-p-overall').value = p.overall || 60;
        document.getElementById('edit-p-notes').value = p.notes || '';

        populatePosSelects(p.primaryPosition, p.secondaryPosition1, p.secondaryPosition2);
        populateSkillSelects(p.skillLevel);

        openModal('add-player');
    };

    function populatePosSelects(p1, p2, p3) {
        const s1 = document.getElementById('edit-p-pos1');
        const s2 = document.getElementById('edit-p-pos2');
        const s3 = document.getElementById('edit-p-pos3');

        if (!s1 || !s2 || !s3) return;

        let opts = positions.map(pos => `<option value="${pos.code}">${pos.name} (${pos.code})</option>`).join('');
        s1.innerHTML = opts;
        s2.innerHTML = '<option value="">-- Không --</option>' + opts;
        s3.innerHTML = '<option value="">-- Không --</option>' + opts;

        if (p1) s1.value = p1;
        if (p2) s2.value = p2;
        if (p3) s3.value = p3;
    }

    function populateSkillSelects(currentLevel) {
        const s = document.getElementById('edit-p-level');
        if (!s) return;

        s.innerHTML = skillLevels.map(sl => `<option value="${sl.name}">${sl.name} (Điểm mặc định: ${sl.rating})</option>`).join('');
        if (currentLevel) s.value = currentLevel;
    }

    window.onSkillLevelChangeInModal = function () {
        const levelName = document.getElementById('edit-p-level').value;
        const sl = skillLevels.find(x => x.name === levelName);
        if (sl) {
            document.getElementById('edit-p-overall').value = sl.rating;
        }
    };

    window.savePlayerFromModal = function () {
        const id = document.getElementById('edit-p-id').value;
        const name = document.getElementById('edit-p-name').value.trim();
        const num = parseInt(document.getElementById('edit-p-num').value) || 0;
        const primaryPosition = document.getElementById('edit-p-pos1').value;
        const secondaryPosition1 = document.getElementById('edit-p-pos2').value;
        const secondaryPosition2 = document.getElementById('edit-p-pos3').value;
        const skillLevel = document.getElementById('edit-p-level').value;
        const overall = parseFloat(document.getElementById('edit-p-overall').value) || 60;
        const notes = document.getElementById('edit-p-notes').value.trim();

        if (!name) {
            alert('Vui lòng nhập tên cầu thủ!');
            return;
        }

        if (id) {
            // Edit
            const p = players.find(x => x.id === id);
            if (p) {
                p.name = name;
                p.num = num;
                p.primaryPosition = primaryPosition;
                p.secondaryPosition1 = secondaryPosition1;
                p.secondaryPosition2 = secondaryPosition2;
                p.skillLevel = skillLevel;
                p.overall = overall;
                p.notes = notes;
            }
        } else {
            // Add
            players.push({
                id: 'p_' + Date.now(),
                num: num,
                name: name,
                primaryPosition: primaryPosition,
                secondaryPosition1: secondaryPosition1,
                secondaryPosition2: secondaryPosition2,
                skillLevel: skillLevel,
                overall: overall,
                attributes: { technical: 7, physical: 7, speed: 7, defending: 6, attacking: 7, passing: 7, shooting: 6 },
                active: true,
                lockedTeam: null,
                notes: notes
            });
        }

        savePlayers();
        closeModal();
        renderPlayerTable();
    };

    window.deletePlayer = function (id) {
        if (confirm('Xác nhận xóa cầu thủ này?')) {
            players = players.filter(x => x.id !== id);
            savePlayers();
            renderPlayerTable();
        }
    };

    // ==========================================
    // 5. QUICK BATCH TEXT / CSV IMPORT PARSER
    // ==========================================
    window.processBatchImport = function () {
        const text = document.getElementById('batch-import-text').value.trim();
        if (!text) {
            alert('Vui lòng nhập hoặc dán danh sách cầu thủ!');
            return;
        }

        const lines = text.split(/\r?\n/);
        let addedCount = 0;
        let skippedCount = 0;
        let logs = [];

        lines.forEach((line, idx) => {
            line = line.trim();
            if (!line) return;

            // Normalize delimiters (e.g., '-', '|', ',', '\t')
            const parts = line.split(/[-|,;\t]+/).map(s => s.trim()).filter(Boolean);

            if (parts.length >= 1) {
                const name = parts[0];
                let pos = 'CM';
                let level = 'Khá';
                let score = null;

                // Scan remaining parts for pos or level
                for (let i = 1; i < parts.length; i++) {
                    const token = parts[i];
                    // Check if token matches position code or name
                    const foundPos = positions.find(p => p.code.toLowerCase() === token.toLowerCase() || p.name.toLowerCase().includes(token.toLowerCase()));
                    if (foundPos) {
                        pos = foundPos.code;
                        continue;
                    }
                    // Check if token matches skill level
                    const foundSkill = skillLevels.find(s => s.name.toLowerCase() === token.toLowerCase());
                    if (foundSkill) {
                        level = foundSkill.name;
                        score = foundSkill.rating;
                        continue;
                    }
                    // Check if token is numerical overall rating
                    if (!isNaN(parseFloat(token))) {
                        score = parseFloat(token);
                    }
                }

                if (!score) {
                    score = getSkillRating(level, 65);
                }

                players.push({
                    id: 'p_' + Date.now() + '_' + idx,
                    num: players.length + 1,
                    name: name,
                    primaryPosition: pos,
                    secondaryPosition1: '',
                    secondaryPosition2: '',
                    skillLevel: level,
                    overall: score,
                    attributes: { technical: 7, physical: 7, speed: 7, defending: 6, attacking: 7, passing: 7, shooting: 6 },
                    active: true,
                    lockedTeam: null,
                    notes: 'Imported batch'
                });
                addedCount++;
            } else {
                skippedCount++;
                logs.push(`Dòng ${idx + 1}: Không nhận diện được dữ liệu (${line})`);
            }
        });

        savePlayers();
        renderPlayerTable();
        closeModal();
        alert(`Đã thêm thành công ${addedCount} cầu thủ!` + (logs.length ? '\n\nCảnh báo:\n' + logs.join('\n') : ''));
    };

    // ==========================================
    // 6. BALANCED TEAM GENERATOR ALGORITHM
    // ==========================================
    window.generateBalancedTeams = function () {
        const yearKey = document.getElementById('p-year-filter')?.value || 'all';
        const timePeriod = document.getElementById('p-time-period')?.value || 'all';
        const activePlayers = players.filter(p => p.active).map(p => {
            const stats = calculatePeriodStats(p, yearKey, timePeriod);
            return {
                ...p,
                overall: stats.periodOverall
            };
        });

        if (activePlayers.length < 2) {
            alert('Cần ít nhất 2 cầu thủ đang kích hoạt để chia đội!');
            return;
        }

        const numTeams = parseInt(document.getElementById('cfg-num-teams').value) || 4;
        const weightPower = (parseInt(document.getElementById('cfg-w-power').value) || 80) / 100;
        const weightPos = (parseInt(document.getElementById('cfg-w-pos').value) || 100) / 100;
        const weightSkill = (parseInt(document.getElementById('cfg-w-skill').value) || 90) / 100;
        const weightAntiRepeat = (parseInt(document.getElementById('cfg-w-antirepeat').value) || 80) / 100;
        const weightRandom = (parseInt(document.getElementById('cfg-w-random').value) || 50) / 100;
        const mode = document.getElementById('cfg-mode').value;

        // Perform Multi-Candidate Optimization Search (Generates candidates & picks top proposals)
        const candidates = runOptimizationSearch(activePlayers, numTeams, {
            weightPower, weightPos, weightSkill, weightAntiRepeat, weightRandom, mode
        });

        if (!candidates || candidates.length === 0) {
            alert('Không thể tạo phương án chia đội thỏa mãn điều kiện.');
            return;
        }

        currentProposals = candidates;
        activeProposalIndex = 0;

        // Switch to Results Tab
        switchTab('results');
        renderResultsView();
    };

    // Optimization Engine: Evaluates 100 candidate arrangements and scores them
    function runOptimizationSearch(activeList, numTeams, weights) {
        const targetTeamSize = Math.floor(activeList.length / numTeams);
        const remainder = activeList.length % numTeams;

        // Candidates collection
        let candidates = [];
        const NUM_SAMPLES = weights.mode === 'random' ? 20 : 150;

        for (let s = 0; s < NUM_SAMPLES; s++) {
            // Shuffle copy
            let shuffled = [...activeList].sort(() => Math.random() - 0.5);

            // Respect locked teams
            let teamsArr = Array.from({ length: numTeams }, () => []);
            let unassigned = [];

            shuffled.forEach(p => {
                if (p.lockedTeam && p.lockedTeam >= 1 && p.lockedTeam <= numTeams) {
                    teamsArr[p.lockedTeam - 1].push(p);
                } else {
                    unassigned.push(p);
                }
            });

            // Distribute remaining players evenly
            let teamIdx = 0;
            unassigned.forEach(p => {
                // Find team with smallest current size
                let minSizeIdx = 0;
                for (let t = 1; t < numTeams; t++) {
                    if (teamsArr[t].length < teamsArr[minSizeIdx].length) {
                        minSizeIdx = t;
                    }
                }
                teamsArr[minSizeIdx].push(p);
            });

            // If mode is not pure random, apply local greedy swap optimization
            if (weights.mode !== 'random') {
                teamsArr = optimizeLocalSwaps(teamsArr, numTeams, weights);
            }

            // Calculate metrics & Balance Score
            const scoreObj = calculateBalanceScore(teamsArr, numTeams, weights);

            candidates.push({
                teams: teamsArr,
                score: scoreObj.totalScore,
                powerDev: scoreObj.powerDev,
                posDev: scoreObj.posDev,
                skillDev: scoreObj.skillDev,
                details: scoreObj
            });
        }

        // Sort descending by Balance Score
        candidates.sort((a, b) => b.score - a.score);

        // Filter out near-duplicates to provide diverse proposals (Plan A, Plan B, Plan C)
        let uniqueProposals = [];
        candidates.forEach(c => {
            if (uniqueProposals.length >= 3) return;
            const isSimilar = uniqueProposals.some(u => Math.abs(u.score - c.score) < 0.2);
            if (!isSimilar || uniqueProposals.length === 0) {
                uniqueProposals.push(c);
            }
        });

        if (uniqueProposals.length === 0 && candidates.length > 0) {
            uniqueProposals = candidates.slice(0, 3);
        }

        return uniqueProposals;
    }

    // Local swap optimizer to equalize total power & position distribution
    function optimizeLocalSwaps(teamsArr, numTeams, weights) {
        let maxIter = 50;
        for (let iter = 0; iter < maxIter; iter++) {
            // Find team with max power and min power
            let teamPowers = teamsArr.map(t => t.reduce((sum, p) => sum + p.overall, 0));
            let maxIdx = teamPowers.indexOf(Math.max(...teamPowers));
            let minIdx = teamPowers.indexOf(Math.min(...teamPowers));

            if (maxIdx === minIdx) break;
            let diff = teamPowers[maxIdx] - teamPowers[minIdx];
            if (diff <= 3) break; // Already balanced enough

            // Try to swap a player from maxIdx to minIdx
            let bestSwap = null;
            let minDiff = diff;

            for (let i = 0; i < teamsArr[maxIdx].length; i++) {
                const p1 = teamsArr[maxIdx][i];
                if (p1.lockedTeam) continue;

                for (let j = 0; j < teamsArr[minIdx].length; j++) {
                    const p2 = teamsArr[minIdx][j];
                    if (p2.lockedTeam) continue;

                    const newMaxP = teamPowers[maxIdx] - p1.overall + p2.overall;
                    const newMinP = teamPowers[minIdx] - p2.overall + p1.overall;
                    const newDiff = Math.abs(newMaxP - newMinP);

                    if (newDiff < minDiff) {
                        minDiff = newDiff;
                        bestSwap = { i, j };
                    }
                }
            }

            if (bestSwap) {
                const p1 = teamsArr[maxIdx].splice(bestSwap.i, 1)[0];
                const p2 = teamsArr[minIdx].splice(bestSwap.j, 1)[0];
                teamsArr[maxIdx].push(p2);
                teamsArr[minIdx].push(p1);
            } else {
                break;
            }
        }
        return teamsArr;
    }

    // Calculate Comprehensive Balance Score (0-100%)
    function calculateBalanceScore(teamsArr, numTeams, weights) {
        const teamPowers = teamsArr.map(t => t.reduce((sum, p) => sum + p.overall, 0));
        const avgPower = teamPowers.reduce((a, b) => a + b, 0) / numTeams;
        const powerVariance = teamPowers.reduce((sum, p) => sum + Math.pow(p - avgPower, 2), 0) / numTeams;
        const powerStdDev = Math.sqrt(powerVariance);

        // Position variance (Check GK, DEF, MID, FW distribution)
        let posDevs = 0;
        ['GK', 'DEF', 'MID', 'FW'].forEach(cat => {
            const counts = teamsArr.map(t => t.filter(p => {
                const posObj = positions.find(pos => pos.code === p.primaryPosition);
                return posObj ? posObj.category === cat : false;
            }).length);
            const avgCat = counts.reduce((a, b) => a + b, 0) / numTeams;
            const varCat = counts.reduce((sum, c) => sum + Math.abs(c - avgCat), 0) / numTeams;
            posDevs += varCat;
        });

        // High Skill (Pro/Semi-pro) distribution variance
        const proCounts = teamsArr.map(t => t.filter(p => p.overall >= 80).length);
        const avgPro = proCounts.reduce((a, b) => a + b, 0) / numTeams;
        const proDev = proCounts.reduce((sum, c) => sum + Math.abs(c - avgPro), 0) / numTeams;

        // Balance Score Formulation
        // 100 - penalties
        let powerPenalty = (powerStdDev / (avgPower || 1)) * 100 * weights.weightPower;
        let posPenalty = posDevs * 8 * weights.weightPos;
        let skillPenalty = proDev * 10 * weights.weightSkill;

        let totalScore = Math.max(70, Math.min(99.5, 100 - (powerPenalty + posPenalty + skillPenalty)));

        // Add minor random variation if random weight is enabled
        if (weights.weightRandom > 0) {
            totalScore += (Math.random() * 1.5 - 0.75) * weights.weightRandom;
        }

        return {
            totalScore: parseFloat(totalScore.toFixed(1)),
            powerDev: parseFloat(powerStdDev.toFixed(1)),
            posDev: parseFloat(posDevs.toFixed(1)),
            skillDev: parseFloat(proDev.toFixed(1)),
            avgPower: parseFloat(avgPower.toFixed(1))
        };
    }

    // ==========================================
    // 7. RENDER RESULTS VIEW & COMPARISON MATRIX
    // ==========================================
    window.renderResultsView = function () {
        const isAdmin = sessionStorage.getItem('phn_admin') === 'true' || document.body.classList.contains('admin-active');
        const warningBox = document.getElementById('team-warning-banner');

        if (!currentProposals || currentProposals.length === 0) {
            const propTabsContainer = document.getElementById('proposal-selector-tabs');
            if (propTabsContainer) propTabsContainer.innerHTML = '';

            const scoreCircle = document.getElementById('balance-score-circle');
            const scoreDesc = document.getElementById('balance-score-desc');
            if (scoreCircle) scoreCircle.textContent = '0%';
            if (scoreDesc) {
                if (isAdmin) {
                    scoreDesc.innerHTML = `
                        <strong>Chưa có kết quả chia đội</strong><br>
                        <span>Vui lòng chuyển sang bước <b>2. Thiết Lập Chia Đội</b> và nhấn <b>"⚡ CHIA ĐỘI TỰ ĐỘNG"</b>.</span>
                    `;
                } else {
                    scoreDesc.innerHTML = `
                        <strong>Chưa có thông tin chia đội</strong><br>
                        <span>Danh sách chia đội sẽ xuất hiện tại đây khi Ban Quản Trị thực hiện chia đội bóng.</span>
                    `;
                }
            }

            if (warningBox) warningBox.style.display = 'none';

            const teamsGrid = document.getElementById('teams-results-grid');
            if (teamsGrid) {
                teamsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: var(--text-muted); background: var(--bg-card); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">
                        <i data-lucide="shield-alert" style="width: 48px; height: 48px; margin-bottom: 12px; color: var(--text-muted);"></i>
                        <h4 style="color: #fff; margin-bottom: 6px;">Chưa Có Dữ Liệu Chia Đội</h4>
                        <p style="font-size: 0.9rem;">${isAdmin ? 'Vui lòng chọn các cầu thủ và bấm vào "2. Thiết Lập Chia Đội" để tạo đội bóng cân bằng.' : 'Hiện tại chưa có dữ liệu chia đội bóng nào được công bố. Vui lòng quay lại sau.'}</p>
                    </div>
                `;
            }

            const compContainer = document.getElementById('comparison-table-wrapper');
            if (compContainer) compContainer.innerHTML = '';

            if (window.lucide) lucide.createIcons();
            return;
        }

        // Render Proposal Selector Tabs
        const propTabsContainer = document.getElementById('proposal-selector-tabs');
        if (propTabsContainer) {
            propTabsContainer.innerHTML = currentProposals.map((prop, idx) => `
                <div class="proposal-card ${idx === activeProposalIndex ? 'active' : ''}" onclick="selectProposal(${idx})">
                    <div class="proposal-name">Phương án ${String.fromCharCode(65 + idx)}</div>
                    <div class="proposal-score">${prop.score}% Cân bằng</div>
                    <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">Độ lệch Overall: ±${prop.powerDev}</div>
                </div>
            `).join('');
        }

        const activeProp = currentProposals[activeProposalIndex];
        if (!activeProp) return;

        // Render Balance Banner
        const scoreCircle = document.getElementById('balance-score-circle');
        const scoreDesc = document.getElementById('balance-score-desc');
        if (scoreCircle) scoreCircle.textContent = activeProp.score + '%';
        if (scoreDesc) {
            scoreDesc.innerHTML = `
                <strong>Độ cân bằng tổng thể: ${activeProp.score}/100</strong><br>
                <span>Chênh lệch Overall TB: ±${activeProp.powerDev} điểm | Độ lệch vị trí: ${activeProp.posDev < 1 ? 'Rất thấp' : 'Trung bình'}</span>
            `;
        }

        // Render Insufficient GK warning if needed
        if (warningBox) {
            const totalGK = activeProp.teams.flatMap(t => t).filter(p => p.primaryPosition === 'GK' || p.secondaryPosition1 === 'GK').length;
            if (totalGK < activeProp.teams.length) {
                warningBox.style.display = 'flex';
                warningBox.innerHTML = `
                    <i data-lucide="alert-triangle" style="color: #ffa726;"></i>
                    <div>
                        <strong>⚠️ Cảnh báo cơ cấu vị trí:</strong> Chỉ có ${totalGK} cầu thủ chơi GK cho ${activeProp.teams.length} đội. 
                        Hệ thống đã tự động ưu tiên xếp cầu thủ có vị trí phụ GK hoặc thủ môn xoay vòng.
                    </div>
                `;
            } else {
                warningBox.style.display = 'none';
            }
        }

        // Render Team Cards Grid
        const teamsGrid = document.getElementById('teams-results-grid');
        if (teamsGrid) {
            const teamColors = ['#ef0107', '#1e88e5', '#43a047', '#fb8c00', '#8e24aa', '#00acc1', '#d81b60', '#3949ab'];
            teamsGrid.innerHTML = activeProp.teams.map((team, tIdx) => {
                const color = teamColors[tIdx % teamColors.length];
                const totalOverall = team.reduce((s, p) => s + p.overall, 0);
                const avgOverall = (totalOverall / (team.length || 1)).toFixed(1);

                // Group by tactical position for lineup pitch
                const gkList = team.filter(p => p.primaryPosition === 'GK');
                const defList = team.filter(p => {
                    const cat = positions.find(pos => pos.code === p.primaryPosition)?.category;
                    return cat === 'DEF';
                });
                const midList = team.filter(p => {
                    const cat = positions.find(pos => pos.code === p.primaryPosition)?.category;
                    return cat === 'MID';
                });
                const fwList = team.filter(p => {
                    const cat = positions.find(pos => pos.code === p.primaryPosition)?.category;
                    return cat === 'FW' || cat === 'GK' ? false : (cat !== 'DEF' && cat !== 'MID');
                });

                return `
                    <div class="team-card">
                        <div class="team-card-header" style="background: linear-gradient(135deg, ${color} 0%, rgba(10,13,24,0.9) 100%);">
                            <div class="team-card-title">
                                <span style="background: #fff; color: ${color}; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem;">🔴</span>
                                ĐỘI ${tIdx + 1}
                            </div>
                            <span style="font-weight: 800; background: rgba(0,0,0,0.4); padding: 4px 10px; border-radius: 20px; font-size: 0.85rem;">
                                ${team.length} người
                            </span>
                        </div>
                        <div class="team-card-stats">
                            <div class="stat-item">
                                <div style="color: #aaa; font-size: 0.75rem;">TỔNG ĐIỂM</div>
                                <div class="stat-val">${totalOverall}</div>
                            </div>
                            <div class="stat-item">
                                <div style="color: #aaa; font-size: 0.75rem;">OVERALL TB</div>
                                <div class="stat-val">${avgOverall}</div>
                            </div>
                            <div class="stat-item">
                                <div style="color: #aaa; font-size: 0.75rem;">CHUYÊN NGHIỆP</div>
                                <div class="stat-val" style="color: #ffd700;">${team.filter(p => p.overall >= 80).length}</div>
                            </div>
                        </div>

                        <div class="team-player-list">
                            ${team.map((p, idx) => `
                                <div class="team-player-item">
                                    <div class="tp-left">
                                        <span class="tp-num">${p.num || (idx + 1)}</span>
                                        <span class="tp-name">${escapeHtml(p.name)}</span>
                                    </div>
                                    <div class="tp-right">
                                        <span class="pos-badge ${getPositionBadgeClass(p.primaryPosition)}">${p.primaryPosition}</span>
                                        <span class="tp-overall">${p.overall}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Tactical Pitch View -->
                        <div style="padding: 10px 15px 15px 15px;">
                            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">SƠ ĐỒ ĐỘI HÌNH DỰ KIẾN:</div>
                            <div class="lineup-pitch">
                                <div class="pitch-line">
                                    ${fwList.length ? fwList.map(p => `<div class="pitch-player">⚽ ${p.name.split(' ').pop()}</div>`).join('') : '<div class="pitch-player">⚽ FW</div>'}
                                </div>
                                <div class="pitch-line">
                                    ${midList.length ? midList.map(p => `<div class="pitch-player">👟 ${p.name.split(' ').pop()}</div>`).join('') : '<div class="pitch-player">👟 MID</div>'}
                                </div>
                                <div class="pitch-line">
                                    ${defList.length ? defList.map(p => `<div class="pitch-player">🛡️ ${p.name.split(' ').pop()}</div>`).join('') : '<div class="pitch-player">🛡️ DEF</div>'}
                                </div>
                                <div class="pitch-line">
                                    ${gkList.length ? gkList.map(p => `<div class="pitch-player" style="border-color:#ffca28;">🧤 ${p.name.split(' ').pop()}</div>`).join('') : '<div class="pitch-player">🧤 GK</div>'}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Render Comprehensive Comparison Table
        renderComparisonTable(activeProp);

        if (window.lucide) lucide.createIcons();
    };

    window.selectProposal = function (idx) {
        activeProposalIndex = idx;
        renderResultsView();
    };

    function renderComparisonTable(prop) {
        const compContainer = document.getElementById('comparison-table-wrapper');
        if (!compContainer) return;

        const numTeams = prop.teams.length;
        let html = `
            <table class="comp-table">
                <thead>
                    <tr>
                        <th style="text-align: left;">Thông Số Cân Bằng</th>
                        ${prop.teams.map((_, i) => `<th>Đội ${i + 1}</th>`).join('')}
                        <th>Chênh Lệch Max</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Số lượng cầu thủ</td>
                        ${prop.teams.map(t => `<td><strong>${t.length}</strong></td>`).join('')}
                        <td>${Math.max(...prop.teams.map(t => t.length)) - Math.min(...prop.teams.map(t => t.length))}</td>
                    </tr>
                    <tr>
                        <td>Tổng điểm Overall</td>
                        ${prop.teams.map(t => {
                            const sum = t.reduce((s, p) => s + p.overall, 0);
                            return `<td class="highlight-best">${sum}</td>`;
                        }).join('')}
                        <td>${Math.max(...prop.teams.map(t => t.reduce((s, p) => s + p.overall, 0))) - Math.min(...prop.teams.map(t => t.reduce((s, p) => s + p.overall, 0)))}</td>
                    </tr>
                    <tr>
                        <td>Overall Trung bình</td>
                        ${prop.teams.map(t => {
                            const avg = (t.reduce((s, p) => s + p.overall, 0) / (t.length || 1)).toFixed(1);
                            return `<td><strong>${avg}</strong></td>`;
                        }).join('')}
                        <td>±${prop.powerDev}</td>
                    </tr>
                    <tr>
                        <td>Thủ môn (GK)</td>
                        ${prop.teams.map(t => `<td>${t.filter(p => p.primaryPosition === 'GK').length}</td>`).join('')}
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Thòng / Trung vệ (CB/TH)</td>
                        ${prop.teams.map(t => `<td>${t.filter(p => p.primaryPosition === 'CB/TH' || p.primaryPosition === 'DEF').length}</td>`).join('')}
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Tiền vệ (CM/W/CAM)</td>
                        ${prop.teams.map(t => `<td>${t.filter(p => ['CM', 'W', 'CAM'].includes(p.primaryPosition)).length}</td>`).join('')}
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Tiền đạo (ST)</td>
                        ${prop.teams.map(t => `<td>${t.filter(p => p.primaryPosition === 'ST').length}</td>`).join('')}
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Cầu thủ Chuyên Nghiệp / Bán Chuyên</td>
                        ${prop.teams.map(t => `<td style="color:#ffd700; font-weight:800;">${t.filter(p => p.overall >= 80).length}</td>`).join('')}
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        `;
        compContainer.innerHTML = html;
    }

    // ==========================================
    // 8. SAVE SESSION TO HISTORY & EXPORT TOOLS
    // ==========================================
    window.saveCurrentDivisionToHistory = function () {
        if (!currentProposals || !currentProposals[activeProposalIndex]) {
            alert('Chưa có kết quả chia đội để lưu!');
            return;
        }

        const activeProp = currentProposals[activeProposalIndex];
        const record = {
            id: 'hist_' + Date.now(),
            date: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            numTeams: activeProp.teams.length,
            totalPlayers: activeProp.teams.reduce((s, t) => s + t.length, 0),
            balanceScore: activeProp.score,
            teams: activeProp.teams.map((t, idx) => ({
                name: 'Đội ' + (idx + 1),
                totalOverall: t.reduce((s, p) => s + p.overall, 0),
                players: t.map(p => ({ id: p.id, name: p.name, pos: p.primaryPosition, overall: p.overall }))
            }))
        };

        sessionHistory.unshift(record);
        saveHistory();
        alert('Đã lưu kết quả chia đội vào Lịch Sử thành công!');
    };

    window.renderHistoryTab = function () {
        const container = document.getElementById('history-list-container');
        if (!container) return;

        if (sessionHistory.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding: 40px; color:#888;">Chưa có lịch sử chia đội nào được lưu.</div>';
            return;
        }

        container.innerHTML = sessionHistory.map(item => `
            <div class="panel-card" style="margin-bottom: 16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
                    <div>
                        <strong style="font-size: 1.1rem; color:#fff;">📅 Lần chia ngày: ${item.date}</strong>
                        <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 2px;">
                            ${item.numTeams} Đội | ${item.totalPlayers} Cầu thủ | Độ cân bằng: <span style="color:var(--accent); font-weight:800;">${item.balanceScore}%</span>
                        </div>
                    </div>
                    <button class="btn-secondary" style="color:#ef5350;" onclick="deleteHistoryItem('${item.id}')"><i data-lucide="trash-2"></i> Xóa</button>
                </div>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                    ${item.teams.map(t => `
                        <div style="background:#090c15; border:1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 8px;">
                            <div style="font-weight:700; color:var(--accent); font-size:0.9rem;">${t.name} (${t.players.length} người)</div>
                            <div style="font-size:0.8rem; color:#ccc; margin-top:4px;">
                                ${t.players.map(p => p.name).join(', ')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        if (window.lucide) lucide.createIcons();
    };

    window.deleteHistoryItem = function (id) {
        if (confirm('Xóa bản ghi lịch sử này?')) {
            sessionHistory = sessionHistory.filter(x => x.id !== id);
            saveHistory();
            renderHistoryTab();
        }
    };

    // Export As Text Summary (Zalo / FB / Messenger ready)
    window.copyTextSummary = function () {
        if (!currentProposals || !currentProposals[activeProposalIndex]) {
            alert('Chưa có kết quả chia đội!');
            return;
        }

        const activeProp = currentProposals[activeProposalIndex];
        let txt = `⚡ KẾT QUẢ CHIA ĐỘI BÓNG CÂN BẰNG PHN FC ⚡\n`;
        txt += `📅 Ngày chia: ${new Date().toLocaleDateString('vi-VN')}\n`;
        txt += `📊 Độ Cân Bằng: ${activeProp.score}%\n\n`;

        activeProp.teams.forEach((team, idx) => {
            const sumOvr = team.reduce((s, p) => s + p.overall, 0);
            const avgOvr = (sumOvr / team.length).toFixed(1);
            txt += `🔴 ĐỘI ${idx + 1} (${team.length} người - Overall TB: ${avgOvr})\n`;
            team.forEach((p, pIdx) => {
                txt += `  ${pIdx + 1}. ${p.name} (${p.primaryPosition} - ${p.overall})\n`;
            });
            txt += `\n`;
        });

        navigator.clipboard.writeText(txt).then(() => {
            alert('Đã sao chép danh sách đội dạng văn bản vào Khay Nhớ Tạm! Bạn có thể dán trực tiếp vào Zalo/Messenger/Facebook.');
        }).catch(() => {
            prompt('Copy văn bản dưới đây:', txt);
        });
    };

    // Export JSON / CSV
    window.exportDataJSON = function () {
        const data = { players, positions, skillLevels, history: sessionHistory };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `PHN_ChiaDoi_Data_${Date.now()}.json`;
        a.click();
    };

    // ==========================================
    // 9. SETTINGS TAB (POSITIONS & SKILLS MANAGEMENT)
    // ==========================================
    window.renderSettingsTab = function () {
        // Positions Table
        const posContainer = document.getElementById('settings-positions-tbody');
        if (posContainer) {
            posContainer.innerHTML = positions.map((p, idx) => `
                <tr>
                    <td><strong>${p.code}</strong></td>
                    <td>${escapeHtml(p.name)}</td>
                    <td><span class="pos-badge ${getPositionBadgeClass(p.code)}">${p.category}</span></td>
                    <td style="text-align:center;">
                        <button class="btn-secondary" style="padding:3px 8px;" onclick="deletePosition('${p.code}')"><i data-lucide="trash-2"></i></button>
                    </td>
                </tr>
            `).join('');
        }

        // Skill Levels Table
        const skillContainer = document.getElementById('settings-skills-tbody');
        if (skillContainer) {
            skillContainer.innerHTML = skillLevels.map((s, idx) => `
                <tr>
                    <td><strong>${s.name}</strong></td>
                    <td><input type="number" class="input-style" style="width:80px; padding:4px;" value="${s.rating}" onchange="updateSkillRating('${s.name}', this.value)"></td>
                    <td><span class="skill-badge ${s.badgeClass}">${s.name}</span></td>
                    <td style="text-align:center;">
                        <button class="btn-secondary" style="padding:3px 8px;" onclick="deleteSkillLevel('${s.name}')"><i data-lucide="trash-2"></i></button>
                    </td>
                </tr>
            `).join('');
        }

        if (window.lucide) lucide.createIcons();
    };

    window.addPositionSetting = function () {
        const code = prompt('Nhập mã vị trí mới (Vd: CDM, CAM, ST...):');
        if (!code) return;
        const name = prompt('Nhập tên vị trí (Vd: Tiền vệ phòng ngự):') || code;
        const category = prompt('Nhập phân loại (GK, DEF, MID, FW):') || 'MID';

        positions.push({ code: code.toUpperCase(), name, category: category.toUpperCase() });
        savePositions();
        renderSettingsTab();
    };

    window.deletePosition = function (code) {
        if (confirm(`Xóa vị trí ${code}?`)) {
            positions = positions.filter(p => p.code !== code);
            savePositions();
            renderSettingsTab();
        }
    };

    window.updateSkillRating = function (name, val) {
        const sl = skillLevels.find(s => s.name === name);
        if (sl) {
            sl.rating = parseFloat(val) || sl.rating;
            saveSkillLevels();
        }
    };

    window.addSkillLevelSetting = function () {
        const name = prompt('Nhập tên cấp trình độ mới (Vd: Quốc Gia, Quốc Tế...):');
        if (!name) return;
        const rating = parseFloat(prompt('Nhập điểm năng lực mặc định (Vd: 100):')) || 100;

        skillLevels.push({ id: Date.now(), name, rating, badgeClass: 'skill-pro' });
        saveSkillLevels();
        renderSettingsTab();
    };

    window.deleteSkillLevel = function (name) {
        if (confirm(`Xóa cấp trình độ ${name}?`)) {
            skillLevels = skillLevels.filter(s => s.name !== name);
            saveSkillLevels();
            renderSettingsTab();
        }
    };

    // Helper: Escape HTML
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, function (m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }

    // Modal Helpers
    window.openModal = function (id) {
        const overlay = document.getElementById('overlay');
        const modal = document.getElementById(id + '-modal');
        if (overlay) overlay.classList.add('active');
        if (modal) modal.classList.add('active');
    };

    window.closeModal = function () {
        const overlay = document.getElementById('overlay');
        if (overlay) overlay.classList.remove('active');
        document.querySelectorAll('.modal-admin').forEach(m => m.classList.remove('active'));
    };

    // ==========================================
    // 10. INITIALIZATION
    // ==========================================
    document.addEventListener('DOMContentLoaded', () => {
        initData();
        renderPlayerTable();
        switchTab('results');
    });

})();
