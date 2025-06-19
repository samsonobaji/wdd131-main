// Product Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initializeGallery();
    initializeQuantityInput();
    initializeTabs();
    initializeCountdown();
    initializeZoom();
    loadRelatedProducts();
    loadRecentlyViewed();
});

// Gallery functionality
function initializeGallery() {
    const mainImage = document.getElementById('main-image');
    const thumbs = document.querySelectorAll('.thumb');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Update active state
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            // Update main image
            const newSrc = thumb.querySelector('img').src;
            mainImage.src = newSrc;
        });
    });
}

// Quantity input functionality
function initializeQuantityInput() {
    const input = document.querySelector('.quantity-input input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value);
        if (currentValue > parseInt(input.min)) {
            input.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value);
        if (currentValue < parseInt(input.max)) {
            input.value = currentValue + 1;
        }
    });

    input.addEventListener('change', () => {
        const value = parseInt(input.value);
        const min = parseInt(input.min);
        const max = parseInt(input.max);

        if (value < min) input.value = min;
        if (value > max) input.value = max;
    });
}

// Tabs functionality
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update active states
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Countdown timer functionality
function initializeCountdown() {
    const countdownElement = document.querySelector('.countdown');
    let timeLeft = {
        hours: 5,
        minutes: 45,
        seconds: 22
    };

    function updateCountdown() {
        if (timeLeft.seconds > 0) {
            timeLeft.seconds--;
        } else {
            if (timeLeft.minutes > 0) {
                timeLeft.minutes--;
                timeLeft.seconds = 59;
            } else {
                if (timeLeft.hours > 0) {
                    timeLeft.hours--;
                    timeLeft.minutes = 59;
                    timeLeft.seconds = 59;
                } else {
                    // Timer finished
                    clearInterval(countdownInterval);
                    return;
                }
            }
        }

        // Update display
        countdownElement.textContent = `${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Image zoom functionality
function initializeZoom() {
    const zoomBtn = document.querySelector('.zoom-btn');
    const modal = document.getElementById('zoom-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const zoomedImage = document.getElementById('zoomed-image');
    const mainImage = document.getElementById('main-image');

    zoomBtn.addEventListener('click', () => {
        modal.classList.add('active');
        zoomedImage.src = mainImage.src;
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Load related products
function loadRelatedProducts() {
    const relatedProductsGrid = document.querySelector('.related-products .product-grid');
    // Simulated related products data
    const products = [
        {
            name: 'Samsung Galaxy S21',
            price: 799.99,
            image: 'https://source.unsplash.com/featured/?smartphone-1',
            rating: 4.5
        },
        {
            name: 'iPhone 13 Pro',
            price: 999.99,
            image: 'https://source.unsplash.com/featured/?smartphone-2',
            rating: 4.8
        },
        {
            name: 'Google Pixel 6',
            price: 699.99,
            image: 'https://source.unsplash.com/featured/?smartphone-3',
            rating: 4.6
        }
    ];

    products.forEach(product => {
        relatedProductsGrid.innerHTML += createProductCard(product);
    });
}

// Load recently viewed products
function loadRecentlyViewed() {
    const recentlyViewedGrid = document.querySelector('.recently-viewed .product-grid');
    // Simulated recently viewed products data
    const products = [
        {
            name: 'OnePlus 9 Pro',
            price: 899.99,
            image: 'https://source.unsplash.com/featured/?smartphone-4',
            rating: 4.7
        },
        {
            name: 'Xiaomi Mi 11',
            price: 749.99,
            image: 'https://source.unsplash.com/featured/?smartphone-5',
            rating: 4.4
        },
        {
            name: 'Huawei P40 Pro',
            price: 849.99,
            image: 'https://source.unsplash.com/featured/?smartphone-6',
            rating: 4.3
        }
    ];

    products.forEach(product => {
        recentlyViewedGrid.innerHTML += createProductCard(product);
    });
}

// Helper function to create product cards
function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="action-btn wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn quick-view">
                        <i class="far fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">
                    ${createStarRating(product.rating)}
                    <span class="rating-value">${product.rating}</span>
                </div>
            </div>
        </div>
    `;
}

// Helper function to create star rating
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }

    return stars;
}

// Add to Cart functionality
document.querySelector('.add-to-cart').addEventListener('click', () => {
    const product = {
        id: 'SM-G998B',
        name: 'Samsung Galaxy S21 Ultra',
        price: 999.99,
        quantity: parseInt(document.querySelector('.quantity-input input').value),
        color: document.querySelector('.color-option.active').getAttribute('title'),
        storage: document.querySelector('.storage-option.active').textContent
    };

    // Add to cart logic here
    console.log('Adding to cart:', product);
    // Show success message
    showNotification('Product added to cart successfully!');
});

// Buy Now functionality
document.querySelector('.buy-now').addEventListener('click', () => {
    // Redirect to checkout
    window.location.href = 'checkout.html';
});

// Notification helper
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Load product data dynamically
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function populateProductPage(product) {
    // Gallery
    document.getElementById('main-image').src = product.images[0];
    document.getElementById('main-image').alt = product.name;
    const thumbs = product.images.map((img, i) => `
        <button class="thumb${i === 0 ? ' active' : ''}"><img src="${img}" alt="${product.name} image ${i+1}"></button>
    `).join('');
    document.getElementById('gallery-thumbs').innerHTML = thumbs;

    // Info
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-brand').textContent = product.brand;
    document.getElementById('product-sku').textContent = product.sku;
    document.getElementById('product-price').textContent = `$${product.price}`;
    document.getElementById('product-old-price').textContent = `$${product.oldPrice}`;
    document.getElementById('product-discount').textContent = `-${product.discount}%`;
    document.getElementById('product-reviews').textContent = `(${product.reviews} Reviews)`;
    document.getElementById('reviews-count').textContent = product.reviews;
    document.getElementById('total-reviews').textContent = product.reviews;
    document.getElementById('average-rating').textContent = product.rating;
    document.getElementById('product-description').textContent = product.description;
    // Stars
    document.getElementById('product-stars').innerHTML = createStarRating(product.rating);
    document.getElementById('average-stars').innerHTML = createStarRating(product.rating);

    // Features list (optional)
    document.getElementById('product-features-list').innerHTML = '';

    // Specs
    const specsTable = document.getElementById('specs-table');
    specsTable.innerHTML = Object.entries(product.specs).map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('');
}

// On DOMContentLoaded, load product
window.addEventListener('DOMContentLoaded', () => {
    // Load productsData if not already loaded
    if (typeof productsData === 'undefined') {
        console.error('productsData not loaded!');
        return;
    }
    const productId = getProductIdFromUrl();
    const product = productsData.find(p => p.id === productId);
    if (!product) {
        document.querySelector('.product-page .container').innerHTML = '<h2>Product not found</h2>';
        return;
    }
    populateProductPage(product);
    updateHeaderCounts();
    setupProductDetailActions(product);
    renderReviews(product.id);
    setupReviewForm(product.id);
    // Re-initialize gallery, tabs, etc.
    initializeGallery();
    initializeTabs();
    initializeQuantityInput();
    initializeCountdown();
    initializeZoom();
    loadRelatedProducts();
    loadRecentlyViewed();
});

function updateHeaderCounts() {
    document.querySelector('.cart-count').textContent = CartUtils.getCount('cart');
    document.querySelector('.wishlist-count').textContent = CartUtils.getCount('wishlist');
    document.querySelector('.compare-count').textContent = CartUtils.getCount('compare');
}

function setupProductDetailActions(product) {
    // Cart
    document.querySelector('.add-to-cart').addEventListener('click', () => {
        CartUtils.addItem('cart', product);
        updateHeaderCounts();
        showNotification('Added to cart!');
    });
    // Wishlist
    document.querySelector('.wishlist').addEventListener('click', () => {
        if (CartUtils.isInList('wishlist', product.id)) {
            CartUtils.removeItem('wishlist', product.id);
            showNotification('Removed from wishlist!');
        } else {
            CartUtils.addItem('wishlist', product);
            showNotification('Added to wishlist!');
        }
        updateHeaderCounts();
    });
    // Compare
    document.querySelector('.compare').addEventListener('click', () => {
        if (CartUtils.isInList('compare', product.id)) {
            CartUtils.removeItem('compare', product.id);
            showNotification('Removed from compare!');
        } else {
            CartUtils.addItem('compare', product);
            showNotification('Added to compare!');
        }
        updateHeaderCounts();
    });
}

function renderReviews(productId) {
    const reviews = JSON.parse(localStorage.getItem('reviews_' + productId) || '[]');
    const reviewsList = document.querySelector('#reviews .reviews-list');
    const reviewsCount = document.getElementById('reviews-count');
    const avgRatingEl = document.getElementById('average-rating');
    const avgStarsEl = document.getElementById('average-stars');
    if (!reviewsList) return;
    if (!reviews.length) {
        reviewsList.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
        if (reviewsCount) reviewsCount.textContent = '0';
        if (avgRatingEl) avgRatingEl.textContent = '0.0';
        if (avgStarsEl) avgStarsEl.innerHTML = createStarRating(0);
        return;
    }
    reviewsList.innerHTML = reviews.map(r => `
        <div class="review-item">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar"><i class="fas fa-user"></i></div>
                    <div class="reviewer-meta">
                        <h4 class="reviewer-name">${r.name}</h4>
                        <div class="review-date">${r.date}</div>
                    </div>
                </div>
                <div class="review-rating">
                    <div class="stars">${createStarRating(r.rating)}</div>
                </div>
            </div>
            <div class="review-content">
                <p>${r.text}</p>
            </div>
        </div>
    `).join('');
    if (reviewsCount) reviewsCount.textContent = reviews.length;
    // Average rating
    const avg = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
    if (avgRatingEl) avgRatingEl.textContent = avg;
    if (avgStarsEl) avgStarsEl.innerHTML = createStarRating(avg);
}

function setupReviewForm(productId) {
    const reviewsTab = document.getElementById('reviews');
    if (!reviewsTab) return;
    let form = document.getElementById('reviewForm');
    if (!form) {
        form = document.createElement('form');
        form.id = 'reviewForm';
        form.innerHTML = `
            <h4>Leave a Review</h4>
            <div class="form-group">
                <label for="reviewRating">Rating:</label>
                <select id="reviewRating" name="rating" required>
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Terrible</option>
                </select>
            </div>
            <div class="form-group">
                <label for="reviewText">Review:</label>
                <textarea id="reviewText" name="text" rows="3" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit Review</button>
        `;
        reviewsTab.appendChild(form);
    }
    form.onsubmit = function(e) {
        e.preventDefault();
        const user = window.getLoggedInUser && window.getLoggedInUser();
        if (!user) {
            alert('You must be logged in to leave a review.');
            return;
        }
        const rating = parseInt(form.rating.value);
        const text = form.text.value.trim();
        if (!text) return;
        const reviews = JSON.parse(localStorage.getItem('reviews_' + productId) || '[]');
        reviews.unshift({
            name: user.email,
            rating,
            text,
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem('reviews_' + productId, JSON.stringify(reviews));
        form.reset();
        renderReviews(productId);
    };
} 