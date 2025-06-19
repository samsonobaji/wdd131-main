// Main JavaScript File

// DOM Elements
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const backToTopButton = document.getElementById('back-to-top');

// Cart, Wishlist, and Compare Counts
let cartCount = 0;
let wishlistCount = 0;
let compareCount = 0;

// Update action counts
function updateActionCounts() {
    document.querySelector('.cart-count').textContent = cartCount;
    document.querySelector('.wishlist-count').textContent = wishlistCount;
    document.querySelector('.compare-count').textContent = compareCount;
}

// Mobile Navigation Toggle
if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbarCollapse && navbarCollapse.classList.contains('show') && 
        !e.target.closest('.navbar-collapse') && 
        !e.target.closest('.navbar-toggler')) {
        navbarCollapse.classList.remove('show');
    }
});

// Back to Top Button
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your backend
        console.log('Newsletter subscription:', email);
        
        // Show success message
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        newsletterForm.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close">&times;</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Theme Switcher
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
    updateHeaderUser();
    setupSearchBar();
    setupMegaMenu();
    setupMobileMenu();
});

function updateHeaderUser() {
    const user = window.getLoggedInUser && window.getLoggedInUser();
    const actions = document.querySelector('.navbar-actions');
    if (!actions) return;
    let userEl = actions.querySelector('.user-info');
    if (user) {
        if (!userEl) {
            userEl = document.createElement('div');
            userEl.className = 'user-info';
            actions.appendChild(userEl);
        }
        userEl.innerHTML = `<span class="user-email"><i class="fas fa-user"></i> ${user.email}</span> <button class="logout-btn">Logout</button>`;
        userEl.querySelector('.logout-btn').onclick = window.logoutUser;
    } else {
        if (userEl) userEl.remove();
        // Optionally add login/register links
        let loginLink = actions.querySelector('.login-link');
        if (!loginLink) {
            loginLink = document.createElement('a');
            loginLink.className = 'login-link';
            loginLink.href = 'login.html';
            loginLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            actions.appendChild(loginLink);
        }
        let registerLink = actions.querySelector('.register-link');
        if (!registerLink) {
            registerLink = document.createElement('a');
            registerLink.className = 'register-link';
            registerLink.href = 'register.html';
            registerLink.innerHTML = '<i class="fas fa-user-plus"></i> Register';
            actions.appendChild(registerLink);
        }
    }
}

// Product Card Template
function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="action-btn wishlist-btn" aria-label="Add to wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn compare-btn" aria-label="Add to compare">
                        <i class="fas fa-exchange-alt"></i>
                    </button>
                    <button class="action-btn quick-view-btn" aria-label="Quick view">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}
                    <span class="current-price">$${product.price}</span>
                </div>
                <div class="product-rating">
                    ${createRatingStars(product.rating)}
                </div>
                <button class="btn btn-primary add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    `;
}

// Create rating stars
function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Format price
function formatPrice(price) {
    return price.toFixed(2);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions and variables that might be needed in other files
window.app = {
    updateActionCounts,
    showNotification,
    toggleTheme,
    createProductCard,
    formatPrice,
    debounce,
    throttle
};

function setupSearchBar() {
    // Add search bar to header if not present
    let navbar = document.querySelector('.navbar .container');
    if (!navbar) return;
    let searchForm = document.querySelector('.navbar-search');
    if (!searchForm) {
        searchForm = document.createElement('form');
        searchForm.className = 'navbar-search';
        searchForm.innerHTML = `
            <input type="text" class="search-input" placeholder="Search products..." autocomplete="off">
            <button type="submit" class="search-btn"><i class="fas fa-search"></i></button>
            <div class="search-suggestions"></div>
        `;
        navbar.appendChild(searchForm);
    }
    const input = searchForm.querySelector('.search-input');
    const suggestions = searchForm.querySelector('.search-suggestions');
    input.addEventListener('input', function() {
        const val = input.value.trim().toLowerCase();
        if (!val) {
            suggestions.innerHTML = '';
            suggestions.style.display = 'none';
            return;
        }
        let matches = [];
        if (typeof productsData !== 'undefined') {
            matches = productsData.filter(p => p.name.toLowerCase().includes(val));
        }
        if (matches.length) {
            suggestions.innerHTML = matches.slice(0, 5).map(p => `<div class="suggestion-item" data-id="${p.id}">${p.name}</div>`).join('');
            suggestions.style.display = 'block';
        } else {
            suggestions.innerHTML = '<div class="suggestion-item">No results</div>';
            suggestions.style.display = 'block';
        }
    });
    suggestions.addEventListener('click', function(e) {
        if (e.target.classList.contains('suggestion-item') && e.target.dataset.id) {
            window.location.href = `product.html?id=${e.target.dataset.id}`;
        }
    });
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const val = input.value.trim();
        if (val) {
            window.location.href = `search.html?q=${encodeURIComponent(val)}`;
        }
    });
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target)) {
            suggestions.style.display = 'none';
        }
    });
}

function setupMegaMenu() {
    let navbar = document.querySelector('.navbar .container');
    if (!navbar) return;
    let menu = document.querySelector('.navbar-categories');
    if (!menu) {
        menu = document.createElement('div');
        menu.className = 'navbar-categories';
        menu.innerHTML = `
            <div class="categories-toggle"><i class="fas fa-bars"></i> <span>Categories</span></div>
            <div class="categories-dropdown"></div>
        `;
        navbar.insertBefore(menu, navbar.firstChild.nextSibling);
    }
    const dropdown = menu.querySelector('.categories-dropdown');
    const toggle = menu.querySelector('.categories-toggle');
    // Populate categories
    if (typeof productsData !== 'undefined') {
        const cats = Array.from(new Set(productsData.map(p => p.category)));
        dropdown.innerHTML = cats.map(cat => `<div class="category-item" data-cat="${cat}">${cat}</div>`).join('');
    }
    // Show/hide dropdown
    toggle.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });
    // Navigate to category page
    dropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('category-item')) {
            window.location.href = `category.html?cat=${encodeURIComponent(e.target.dataset.cat)}`;
        }
    });
    // Hide dropdown on outside click
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

function setupMobileMenu() {
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.querySelector('.navbar-collapse');
    if (!toggler || !collapse) return;
    toggler.addEventListener('click', () => {
        collapse.classList.toggle('show');
    });
    document.addEventListener('click', function(e) {
        if (!collapse.contains(e.target) && !toggler.contains(e.target)) {
            collapse.classList.remove('show');
        }
    });
    collapse.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            collapse.classList.remove('show');
        });
    });
} 