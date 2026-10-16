/**
 * MAIN JAVASCRIPT CONTROLLER
 * Xử lý tương tác giao diện, chuyển đổi chế độ Ngày/Đêm, Audio Guide, Bản đồ di tích & Canvas hoa đăng
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initRelics();
    initMap();
    initCulinaryAndTours();
    initAudioGuide();
    initRealtimeClock();
    initLanternCanvas();
});

/* ==============================================================
   1. THEME CONTROLLER (BAN NGÀY & ĐÊM HOA ĐĂNG)
   ============================================================== */
function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');
    
    // Check saved preference
    const savedTheme = localStorage.getItem('hoian_theme') || 'day';
    if (savedTheme === 'night') {
        document.body.classList.add('night-mode');
        updateThemeUI('night');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('night-mode');
            const isNight = document.body.classList.contains('night-mode');
            localStorage.setItem('hoian_theme', isNight ? 'night' : 'day');
            updateThemeUI(isNight ? 'night' : 'day');
        });
    }

    function updateThemeUI(theme) {
        if (!themeIcon || !themeLabel) return;
        if (theme === 'night') {
            themeIcon.textContent = '🏮';
            themeLabel.textContent = 'Đêm Phố Cổ';
        } else {
            themeIcon.textContent = '☀️';
            themeLabel.textContent = 'Ban Ngày';
        }
    }
}

/* ==============================================================
   2. NAVBAR & MOBILE NAVIGATION
   ============================================================== */
function initNavbar() {
    const header = document.querySelector('.site-header');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Close on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }
}

/* ==============================================================
   3. RELICS CATALOG (SEARCH & FILTER & MODAL)
   ============================================================== */
let currentCategory = 'all';
let currentSearch = '';

function initRelics() {
    renderRelics();

    // Category tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderRelics();
        });
    });

    // Live search input
    const searchInput = document.getElementById('relicSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            renderRelics();
        });
    }

    // Modal close listener
    const modalBackdrop = document.getElementById('relicModal');
    const closeBtn = document.getElementById('closeRelicModalBtn');
    if (modalBackdrop && closeBtn) {
        closeBtn.addEventListener('click', () => {
            modalBackdrop.classList.remove('show');
        });
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.classList.remove('show');
            }
        });
    }
}

function renderRelics() {
    const grid = document.getElementById('relicsGrid');
    if (!grid) return;

    const filtered = HOIAN_DATA.relics.filter(relic => {
        const matchesCategory = (currentCategory === 'all') || (relic.category === currentCategory);
        const matchesSearch = !currentSearch || 
            relic.name.toLowerCase().includes(currentSearch) ||
            relic.address.toLowerCase().includes(currentSearch) ||
            relic.shortDesc.toLowerCase().includes(currentSearch);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 48px; background: var(--bg-surface); border-radius: 12px; border: 1px dashed var(--border-color);">
                <p style="font-size: 1.1rem; color: var(--text-muted);">Không tìm thấy di tích nào phù hợp với từ khóa "${currentSearch}".</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(relic => `
        <div class="relic-card" data-id="${relic.id}">
            <div class="relic-thumb">
                <img src="${relic.image}" alt="${relic.name}" loading="lazy">
                <span class="relic-tag">${relic.tag}</span>
            </div>
            <div class="relic-body">
                <div class="relic-meta">
                    <span>Niên đại: ${relic.year}</span>
                    <span>⭐ 4.9</span>
                </div>
                <h3 class="relic-card-title">${relic.name}</h3>
                <p class="relic-card-desc">${relic.shortDesc}</p>
                <div class="relic-footer">
                    <span style="font-size: 0.82rem; color: var(--text-light);">📍 ${relic.categoryName}</span>
                    <button class="btn-card-detail" onclick="openRelicDetail(${relic.id})">
                        Chi tiết di tích →
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

window.openRelicDetail = function(id) {
    const relic = HOIAN_DATA.relics.find(r => r.id === id);
    if (!relic) return;

    const modal = document.getElementById('relicModal');
    const modalContent = document.getElementById('relicModalBody');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <div style="position: relative; height: 300px; overflow: hidden; border-radius: 12px 12px 0 0;">
            <img src="${relic.image}" alt="${relic.name}" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 24px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); color: #fff;">
                <span style="background: var(--color-primary); color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase;">${relic.tag}</span>
                <h2 style="color: #fff; font-size: 1.8rem; margin-top: 8px;">${relic.name}</h2>
                <p style="font-size: 0.85rem; opacity: 0.9;">📍 ${relic.address}</p>
            </div>
        </div>
        <div style="padding: 28px; max-height: 55vh; overflow-y: auto;">
            <div style="display: flex; gap: 20px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color); font-size: 0.88rem;">
                <div><strong>Niên đại:</strong> ${relic.year}</div>
                <div><strong>Giờ mở cửa:</strong> ${relic.openHours}</div>
                <div><strong>Vé tham quan:</strong> ${relic.ticket}</div>
            </div>
            
            <h4 style="font-size: 1.15rem; color: var(--color-primary); margin-bottom: 8px;">1. Lịch sử hình thành</h4>
            <p style="font-size: 0.92rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 20px;">${relic.history}</p>
            
            <h4 style="font-size: 1.15rem; color: var(--color-primary); margin-bottom: 8px;">2. Đặc trưng kiến trúc</h4>
            <p style="font-size: 0.92rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 20px;">${relic.architecture}</p>

            <h4 style="font-size: 1.15rem; color: var(--color-primary); margin-bottom: 8px;">3. Điểm nhấn không thể bỏ lỡ</h4>
            <ul style="padding-left: 20px; font-size: 0.9rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 20px;">
                ${relic.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>

            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
                <a href="#bookingSection" onclick="document.getElementById('relicModal').classList.remove('show');" class="btn-primary" style="padding: 8px 18px; font-size: 0.88rem;">
                    Đặt vé tham quan ngay
                </a>
            </div>
        </div>
    `;

    modal.classList.add('show');
};

/* ==============================================================
   4. INTERACTIVE HERITAGE MAP
   ============================================================== */
function initMap() {
    const mapContainer = document.getElementById('interactiveMapContainer');
    if (!mapContainer) return;

    HOIAN_DATA.relics.forEach(relic => {
        const pin = document.createElement('div');
        pin.className = 'map-pin';
        pin.style.left = relic.mapX + '%';
        pin.style.top = relic.mapY + '%';
        pin.title = relic.name;
        pin.innerHTML = `
            <div class="pin-pulse"></div>
            <div class="pin-marker"><span>🏛️</span></div>
        `;

        pin.addEventListener('click', () => {
            document.querySelectorAll('.map-pin').forEach(p => p.classList.remove('active'));
            pin.classList.add('active');
            updateMapSidebar(relic);
        });

        mapContainer.appendChild(pin);
    });

    // Default select first relic
    if (HOIAN_DATA.relics.length > 0) {
        updateMapSidebar(HOIAN_DATA.relics[0]);
    }
}

function updateMapSidebar(relic) {
    const sidebar = document.getElementById('mapSidebarPreview');
    if (!sidebar) return;

    sidebar.innerHTML = `
        <img src="${relic.image}" alt="${relic.name}">
        <span style="font-size: 0.72rem; font-weight: bold; color: var(--color-primary); text-transform: uppercase;">${relic.categoryName}</span>
        <h4>${relic.name}</h4>
        <p>${relic.shortDesc}</p>
        <div style="font-size: 0.82rem; color: var(--text-light); margin-bottom: 16px;">
            <div>📍 ${relic.address}</div>
            <div>⏰ ${relic.openHours}</div>
        </div>
        <button class="btn-secondary" style="width: 100%; justify-content: center;" onclick="openRelicDetail(${relic.id})">
            Xem hồ sơ kiến trúc
        </button>
    `;
}

/* ==============================================================
   5. CULINARY & TOURS RENDERER
   ============================================================== */
function initCulinaryAndTours() {
    const culinaryGrid = document.getElementById('culinaryGrid');
    if (culinaryGrid) {
        culinaryGrid.innerHTML = HOIAN_DATA.culinary.map(item => `
            <div class="culinary-card">
                <span class="culinary-badge">${item.badge}</span>
                <h3 class="culinary-title">${item.name}</h3>
                <p class="culinary-desc">${item.desc}</p>
                <div class="culinary-info">
                    <div><strong>Quán gợi ý:</strong> ${item.famousSpot}</div>
                    <div style="margin-top: 4px; color: var(--color-secondary); font-weight: 700;">Giá: ${item.price}</div>
                </div>
            </div>
        `).join('');
    }

    const toursGrid = document.getElementById('toursGrid');
    if (toursGrid) {
        toursGrid.innerHTML = HOIAN_DATA.tours.map(tour => `
            <div class="tour-card">
                <div class="tour-duration">⏱️ ${tour.duration}</div>
                <h3 class="tour-title">${tour.title}</h3>
                <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 12px;">Đối tượng: ${tour.target}</p>
                <ul class="tour-steps">
                    ${tour.itinerary.map(step => `<li class="tour-step-item">${step}</li>`).join('')}
                </ul>
                <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary); margin-top: auto;">
                    ${tour.ticketSuggestion}
                </div>
            </div>
        `).join('');
    }
}

/* ==============================================================
   6. AUDIO GUIDE SIMULATOR
   ============================================================== */
function initAudioGuide() {
    const toggleBtn = document.getElementById('audioPlayToggle');
    const audioTime = document.getElementById('audioTimeDisplay');
    const progressFill = document.getElementById('audioProgressFill');
    let isPlaying = false;
    let timer = null;
    let seconds = 38;
    const totalSeconds = 245;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            toggleBtn.innerHTML = isPlaying ? '❚❚' : '▶';

            if (isPlaying) {
                timer = setInterval(() => {
                    if (seconds < totalSeconds) {
                        seconds++;
                        updateProgress();
                    } else {
                        seconds = 0;
                        isPlaying = false;
                        toggleBtn.innerHTML = '▶';
                        clearInterval(timer);
                    }
                }, 1000);
            } else {
                clearInterval(timer);
            }
        });
    }

    function updateProgress() {
        const curMin = String(Math.floor(seconds / 60)).padStart(2, '0');
        const curSec = String(seconds % 60).padStart(2, '0');
        const totMin = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const totSec = String(totalSeconds % 60).padStart(2, '0');
        
        if (audioTime) audioTime.textContent = `${curMin}:${curSec} / ${totMin}:${totSec}`;
        if (progressFill) progressFill.style.width = ((seconds / totalSeconds) * 100) + '%';
    }
}

/* ==============================================================
   7. REALTIME CLOCK & WEATHER WIDGET
   ============================================================== */
function initRealtimeClock() {
    const timeEl = document.getElementById('hoianClock');
    function updateClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        if (timeEl) timeEl.textContent = `${timeStr} (GMT+7)`;
    }
    updateClock();
    setInterval(updateClock, 1000);
}

/* ==============================================================
   8. CANVAS FLOATING LANTERNS PARTICLES
   ============================================================== */
function initLanternCanvas() {
    const canvas = document.getElementById('lanternCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 18;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 4 + 2,
            speedY: Math.random() * -0.5 - 0.2,
            speedX: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.6 + 0.3,
            color: ['#f59e0b', '#ef4444', '#fbbf24'][Math.floor(Math.random() * 3)]
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        const isNight = document.body.classList.contains('night-mode');
        if (!isNight) {
            // Draw very soft or return
            requestAnimationFrame(draw);
            return;
        }

        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.shadowBlur = 12;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(draw);
    }

    draw();
}
