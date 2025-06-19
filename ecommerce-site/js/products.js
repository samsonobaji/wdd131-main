// Use productsData from products-data.js
const products = productsData;

// User preferences
let userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {
    sortBy: 'default',
    itemsPerPage: 8,
    viewMode: 'grid'
};

// Function to create product card HTML with enhanced features
function createProductCard(product) {
    const stars = generateStarRating(product.rating);
    const discount = product.discount || Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    const mainImage = product.images[0];
    
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <a href="product.html?id=${product.id}">
                    <img src="${mainImage}" alt="${product.name}">
                </a>
                ${discount ? `<span class="product-badge">-${discount}%</span>` : ''}
                <div class="product-actions">
                    <button class="action-btn" title="Add to Wishlist" onclick="addToWishlist('${product.id}')">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn" title="Quick View" onclick="quickView('${product.id}')">
                        <i class="far fa-eye"></i>
                    </button>
                    <button class="action-btn" title="Add to Compare" onclick="addToCompare('${product.id}')">
                        <i class="fas fa-exchange-alt"></i>
                    </button>
                </div>
            </div>
            <div class="product-details">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="rating-stars">${stars}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <button class="btn add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
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

// Function to sort products
function sortProducts(products, sortBy) {
    switch(sortBy) {
        case 'price-low':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-high':
            return [...products].sort((a, b) => b.price - a.price);
        case 'rating':
            return [...products].sort((a, b) => b.rating - a.rating);
        case 'name':
            return [...products].sort((a, b) => a.name.localeCompare(b.name));
        default:
            return products;
    }
}

// Function to filter products
function filterProducts(category, searchTerm = '') {
    let filtered = products;
    
    if (category && category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }
    
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term)
        );
    }
    
    return filtered;
}

// Function to display products with pagination
function displayProducts(products, page = 1) {
    const productsContainer = document.getElementById('products-grid');
    if (!productsContainer) return;

    const start = (page - 1) * userPreferences.itemsPerPage;
    const end = start + userPreferences.itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    productsContainer.innerHTML = paginatedProducts
        .map(product => createProductCard(product))
        .join('');

    // Add pagination controls
    const totalPages = Math.ceil(products.length / userPreferences.itemsPerPage);
    if (totalPages > 1) {
        addPaginationControls(totalPages, page);
    }
}

// Add pagination controls
function addPaginationControls(totalPages, currentPage) {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentPage ? 'active' : '';
        button.onclick = () => {
            const filteredProducts = filterProducts(
                document.getElementById('category-filter').value,
                document.getElementById('search-input').value
            );
            displayProducts(filteredProducts, i);
        };
        pagination.appendChild(button);
    }
    
    document.getElementById('products-grid').after(pagination);
}

// Search functionality
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value;
    const category = document.getElementById('category-filter').value;
    const filteredProducts = filterProducts(category, searchTerm);
    const sortedProducts = sortProducts(filteredProducts, userPreferences.sortBy);
    displayProducts(sortedProducts);
}

// Save user preferences
function saveUserPreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
}

// Initialize products display when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            const filteredProducts = filterProducts(categoryFilter.value, searchInput.value);
            const sortedProducts = sortProducts(filteredProducts, userPreferences.sortBy);
            displayProducts(sortedProducts);
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            const filteredProducts = filterProducts(categoryFilter.value, searchInput.value);
            const sortedProducts = sortProducts(filteredProducts, userPreferences.sortBy);
            displayProducts(sortedProducts);
        }, 300));
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            userPreferences.sortBy = e.target.value;
            saveUserPreferences();
            const filteredProducts = filterProducts(categoryFilter.value, searchInput.value);
            const sortedProducts = sortProducts(filteredProducts, userPreferences.sortBy);
            displayProducts(sortedProducts);
        });
    }

    // Initial display
    const filteredProducts = filterProducts('all');
    const sortedProducts = sortProducts(filteredProducts, userPreferences.sortBy);
    displayProducts(sortedProducts);

    updateHeaderCounts();
    setupProductCardActions();
});

// Utility function for debouncing search
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

function updateHeaderCounts() {
    document.querySelector('.cart-count').textContent = CartUtils.getCount('cart');
    document.querySelector('.wishlist-count').textContent = CartUtils.getCount('wishlist');
    document.querySelector('.compare-count').textContent = CartUtils.getCount('compare');
}

function setupProductCardActions() {
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.querySelector('.product-name a')?.textContent.trim();
        const productId = getProductIdFromCard(card);
        const product = getProductDataById(productId) || { id: productId, name: productName };

        // Cart
        const cartBtn = card.querySelector('.add-to-cart');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                CartUtils.addItem('cart', product);
                updateHeaderCounts();
                showNotification('Added to cart!');
            });
        }
        // Wishlist
        const wishlistBtn = card.querySelector('.action-btn[title="Add to Wishlist"]');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                if (CartUtils.isInList('wishlist', product.id)) {
                    CartUtils.removeItem('wishlist', product.id);
                    showNotification('Removed from wishlist!');
                } else {
                    CartUtils.addItem('wishlist', product);
                    showNotification('Added to wishlist!');
                }
                updateHeaderCounts();
            });
        }
        // Compare
        const compareBtn = card.querySelector('.action-btn[title="Add to Compare"]');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => {
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
    });
}

function getProductIdFromCard(card) {
    // Try to get from link href (e.g., product.html?id=xxx)
    const link = card.querySelector('.product-name a');
    if (link && link.href.includes('id=')) {
        return new URL(link.href).searchParams.get('id');
    }
    // Fallback: use name as id
    return card.querySelector('.product-name a')?.textContent.trim().toLowerCase().replace(/\s+/g, '');
}

function getProductDataById(id) {
    if (typeof productsData !== 'undefined') {
        return productsData.find(p => p.id === id);
    }
    return null;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;
    // Use CartUtils for consistency
    if (window.CartUtils) {
        CartUtils.addItem('cart', {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1
        });
        updateHeaderCounts();
        showNotification('Added to cart!');
    } else {
        alert('Cart functionality not available.');
    }
} 