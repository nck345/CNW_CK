/**
 * REVIEWS & GUESTBOOK CONTROLLER
 * Xử lý đánh giá du khách, bình chọn số sao và lưu trữ dữ liệu
 */

document.addEventListener('DOMContentLoaded', () => {
    initReviewsSystem();
});

function initReviewsSystem() {
    renderReviews();
    initStarSelector();

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmit);
    }
}

function getStoredReviews() {
    const local = localStorage.getItem('hoian_reviews');
    if (local) {
        try {
            return JSON.parse(local);
        } catch (e) {}
    }
    return HOIAN_DATA.initialReviews;
}

function renderReviews() {
    const container = document.getElementById('reviewsGrid');
    if (!container) return;

    const reviews = getStoredReviews();

    container.innerHTML = reviews.map(rev => `
        <div class="review-card">
            <div class="review-card-header">
                <div>
                    <div class="reviewer-name">${rev.name}</div>
                    <div class="reviewer-origin">📍 ${rev.origin || 'Việt Nam'} • ${rev.date || 'Gần đây'}</div>
                </div>
                <div class="star-rating">
                    ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
                </div>
            </div>
            <p class="review-comment">"${rev.comment}"</p>
        </div>
    `).join('');
}

let selectedRating = 5;

function initStarSelector() {
    const starContainer = document.getElementById('interactiveStarPicker');
    if (!starContainer) return;

    const stars = starContainer.querySelectorAll('.star-pick-item');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.val);
            updateStarDisplay();
        });
    });

    function updateStarDisplay() {
        stars.forEach(s => {
            const val = parseInt(s.dataset.val);
            if (val <= selectedRating) {
                s.textContent = '★';
                s.style.color = '#f59e0b';
            } else {
                s.textContent = '☆';
                s.style.color = '#cbd5e1';
            }
        });
    }

    updateStarDisplay();
}

async function handleReviewSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('revAuthorName');
    const originInput = document.getElementById('revAuthorOrigin');
    const commentInput = document.getElementById('revComment');

    const name = nameInput?.value.trim();
    const origin = originInput?.value.trim() || 'Việt Nam';
    const comment = commentInput?.value.trim();

    if (!name || !comment) {
        alert('Vui lòng nhập họ tên và nội dung cảm nghĩ của bạn!');
        return;
    }

    const newReview = {
        id: Date.now(),
        name,
        origin,
        date: new Date().toLocaleDateString('vi-VN'),
        rating: selectedRating,
        comment
    };

    // Save to local storage
    const currentReviews = getStoredReviews();
    currentReviews.unshift(newReview);
    localStorage.setItem('hoian_reviews', JSON.stringify(currentReviews));

    // Try API POST
    try {
        fetch('api/reviews.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                origin,
                rating: selectedRating,
                comment
            })
        }).catch(() => {});
    } catch (e) {}

    // Re-render
    renderReviews();

    // Reset form
    nameInput.value = '';
    originInput.value = '';
    commentInput.value = '';
    selectedRating = 5;

    alert('Cảm ơn bạn đã gửi cảm nhận về Di sản Hội An!');
}
