
// --- Supabase Config ---
const SUPABASE_URL = 'https://hiykohhpxogniosdowjo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_';

let _supabase = null;
if (typeof supabase !== 'undefined') {
    _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// --- Admin Logic ---
let isAdmin = sessionStorage.getItem('phn_admin') === 'true';

function toggleAdmin() {
    if (!isAdmin) {
        const pass = prompt("Nhập mật khẩu quản lý:");
        if (pass === 'Giao240806') {
            isAdmin = true;
            sessionStorage.setItem('phn_admin', 'true');
            document.body.classList.add('admin-active');
            updateAdminUI();
            alert("Chế độ Admin đã được kích hoạt!");
            if (typeof renderAll === 'function') renderAll();
        } else {
            alert("Sai mật khẩu!");
        }
    } else {
        isAdmin = false;
        sessionStorage.removeItem('phn_admin');
        document.body.classList.remove('admin-active');
        updateAdminUI();
        if (typeof renderAll === 'function') renderAll();
    }
}

function updateAdminUI() {
    const adminLink = document.getElementById('header-admin-btn');
    if (adminLink) {
        // Use custom image instead of icons
        adminLink.innerHTML = '<img src="assets/images/icondn.jpg" alt="Admin">';
    }
}

// Initialize Admin UI on load
document.addEventListener('DOMContentLoaded', () => {
    if (isAdmin) document.body.classList.add('admin-active');
    updateAdminUI();
    lucide.createIcons();
});

// --- Common UI Functions ---
function openModal(type) {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById(type + '-modal');
    if (overlay) overlay.classList.add('active');
    if (modal) modal.classList.add('active');
}

function closeModal() {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.classList.remove('active');
    document.querySelectorAll('.modal-admin').forEach(m => m.classList.remove('active'));
}

async function deleteItem(table, id) {
    if (!isAdmin) {
        alert("Bạn không có quyền thực hiện hành động này!");
        return;
    }
    if (confirm("Xác nhận xóa?")) {
        const { error } = await _supabase.from(table).delete().eq('id', id);
        if (!error) {
            alert("Đã xóa!");
            if (typeof renderAll === 'function') renderAll();
        } else {
            alert("Lỗi khi xóa: " + error.message);
        }
    }
}

// --- Mobile Menu ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    });
});
