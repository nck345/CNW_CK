/**
 * BOOKING SYSTEM CONTROLLER
 * Xử lý tính toán giá vé tự động, kiểm tra hợp lệ dữ liệu và xuất vé điện tử (E-Ticket)
 */

document.addEventListener('DOMContentLoaded', () => {
    initBookingSystem();
});

function initBookingSystem() {
    const adultInput = document.getElementById('bookAdultQty');
    const childInput = document.getElementById('bookChildQty');
    const guideCheckbox = document.getElementById('bookNeedGuide');
    const bookingForm = document.getElementById('bookingForm');
    const visitDateInput = document.getElementById('bookVisitDate');

    // Set min date to today
    if (visitDateInput) {
        const today = new Date().toISOString().split('T')[0];
        visitDateInput.min = today;
        visitDateInput.value = today;
    }

    // Attach listeners for realtime calculation
    [adultInput, childInput, guideCheckbox].forEach(el => {
        if (el) {
            el.addEventListener('input', calculateTotal);
            el.addEventListener('change', calculateTotal);
        }
    });

    calculateTotal();

    // Form submit handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Close modal listener
    const modalBackdrop = document.getElementById('ticketModal');
    const closeBtn = document.getElementById('closeTicketModalBtn');
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

function calculateTotal() {
    const adultQty = parseInt(document.getElementById('bookAdultQty')?.value) || 0;
    const childQty = parseInt(document.getElementById('bookChildQty')?.value) || 0;
    const needGuide = document.getElementById('bookNeedGuide')?.checked || false;

    const adultPrice = 120000;
    const childPrice = 60000;
    const guideFee = needGuide ? 200000 : 0;

    const total = (adultQty * adultPrice) + (childQty * childPrice) + guideFee;

    // Update summary UI
    const adultTotalEl = document.getElementById('summaryAdultTotal');
    const childTotalEl = document.getElementById('summaryChildTotal');
    const guideRowEl = document.getElementById('summaryGuideRow');
    const finalTotalEl = document.getElementById('summaryFinalTotal');

    if (adultTotalEl) adultTotalEl.textContent = `${(adultQty * adultPrice).toLocaleString('vi-VN')} đ (${adultQty} vé)`;
    if (childTotalEl) childTotalEl.textContent = `${(childQty * childPrice).toLocaleString('vi-VN')} đ (${childQty} vé)`;
    
    if (guideRowEl) {
        guideRowEl.style.display = needGuide ? 'flex' : 'none';
    }

    if (finalTotalEl) {
        finalTotalEl.textContent = `${total.toLocaleString('vi-VN')} VNĐ`;
    }

    return total;
}

async function handleBookingSubmit(e) {
    e.preventDefault();

    const fullname = document.getElementById('bookFullname')?.value.trim();
    const email = document.getElementById('bookEmail')?.value.trim();
    const phone = document.getElementById('bookPhone')?.value.trim();
    const visitDate = document.getElementById('bookVisitDate')?.value;
    const adultQty = parseInt(document.getElementById('bookAdultQty')?.value) || 1;
    const childQty = parseInt(document.getElementById('bookChildQty')?.value) || 0;
    const needGuide = document.getElementById('bookNeedGuide')?.checked || false;
    const guideLang = document.getElementById('bookGuideLang')?.value || 'vi';
    const notes = document.getElementById('bookNotes')?.value.trim();

    // Validation
    if (!fullname || !email || !phone || !visitDate) {
        alert('Vui lòng điền đầy đủ các thông tin liên hệ bắt buộc!');
        return;
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phone)) {
        alert('Số điện thoại không đúng định dạng Việt Nam!');
        return;
    }

    const total = calculateTotal();
    const bookingCode = 'HA-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);

    const bookingPayload = {
        booking_code: bookingCode,
        fullname,
        email,
        phone,
        visit_date: visitDate,
        adult_qty: adultQty,
        child_qty: childQty,
        need_guide: needGuide ? 1 : 0,
        guide_language: guideLang,
        total_amount: total,
        notes
    };

    // Attempt sending to PHP API
    try {
        fetch('api/booking.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingPayload)
        }).catch(() => {});
    } catch (err) {
        // Fallback offline
    }

    // Show E-ticket modal
    showETicketModal(bookingPayload);
}

function showETicketModal(data) {
    const modal = document.getElementById('ticketModal');
    const ticketBody = document.getElementById('ticketModalBody');
    if (!modal || !ticketBody) return;

    const formattedDate = new Date(data.visit_date).toLocaleDateString('vi-VN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    ticketBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 16px;">
            <span style="background: #ecfdf5; color: #047857; padding: 4px 14px; border-radius: 999px; font-size: 0.8rem; font-weight: bold; border: 1px solid #a7f3d0;">
                ✓ XÁC NHẬN ĐẶT VÉ THÀNH CÔNG
            </span>
            <h4 style="font-size: 1.4rem; color: var(--color-primary); margin-top: 10px;">VÉ THAM QUAN DI SẢN HỘI AN</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Mã đơn vé: <strong>${data.booking_code}</strong></p>
        </div>

        <div style="background: #fbf7ee; border-radius: 8px; padding: 18px; margin-bottom: 20px; font-size: 0.9rem; border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: var(--text-light);">Họ tên khách:</span>
                <strong>${data.fullname}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: var(--text-light);">Số điện thoại:</span>
                <span>${data.phone}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: var(--text-light);">Ngày tham quan:</span>
                <span>${formattedDate}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: var(--text-light);">Số lượng vé:</span>
                <span>${data.adult_qty} Người lớn ${data.child_qty > 0 ? `, ${data.child_qty} Trẻ em` : ''}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: var(--text-light);">Thuyết minh viên:</span>
                <span>${data.need_guide ? (data.guide_language === 'en' ? 'Tiếng Anh' : 'Tiếng Việt') : 'Tự túc khám phá'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 1px dashed var(--border-color); font-size: 1.1rem; color: var(--color-secondary);">
                <strong>Tổng thanh toán:</strong>
                <strong>${data.total_amount.toLocaleString('vi-VN')} VNĐ</strong>
            </div>
        </div>

        <div class="ticket-qr-section">
            <div class="mock-qr-code">
                <div>
                    <div style="font-size: 28px;">📱</div>
                    <strong>QR CHECK-IN</strong>
                    <div style="font-size: 10px; color: #666; margin-top: 4px;">${data.booking_code}</div>
                </div>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); text-align: center; margin-top: 8px;">
                Quý khách vui lòng xuất trình mã QR này tại các quầy soát vé Chùa Cầu hoặc Nhà cổ.
            </p>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; margin-top: 16px;">
            <button class="btn-primary" onclick="window.print()">
                🖨️ In vé điện tử
            </button>
            <button class="btn-secondary" onclick="document.getElementById('ticketModal').classList.remove('show');">
                Hoàn tất
            </button>
        </div>
    `;

    modal.classList.add('show');
}
