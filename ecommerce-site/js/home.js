// Home Page JavaScript

// Sample product data (in a real application, this would come from an API)
const featuredProducts = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        oldPrice: 129.99,
        image: 'images/products/headphones.jpg',
        rating: 4.5
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        oldPrice: 249.99,
        image: 'images/products/smartwatch.jpg',
        rating: 4.0
    },
    {
        id: 3,
        name: 'Bluetooth Speaker',
        price: 79.99,
        image: 'images/products/speaker.jpg',
        rating: 4.8
    },
    {
        id: 4,
        name: 'Laptop Backpack',
        price: 49.99,
        image: 'images/products/backpack.jpg',
        rating: 4.2
    }
];

// Sample blog posts data
const latestPosts = [
    {
        id: 1,
        title: 'Top 10 Tech Gadgets of 2024',
        excerpt: 'Discover the most innovative and must-have tech gadgets of the year.',
        image: 'images/blog/tech-gadgets.jpg',
        date: '2024-03-15'
    },
    {
        id: 2,
        title: 'Sustainable Shopping Guide',
        excerpt: 'Learn how to make eco-friendly choices while shopping online.',
        image: 'images/blog/sustainable-shopping.jpg',
        date: '2024-03-10'
    },
    {
        id: 3,
        title: 'Home Office Essentials',
        excerpt: 'Must-have items for your productive home office setup.',
        image: 'images/blog/home-office.jpg',
        date: '2024-03-05'
    }
];

// Load featured products
function loadFeaturedProducts() {
    const productsContainer = document.getElementById('featured-products');
    if (productsContainer) {
        productsContainer.innerHTML = featuredProducts
            .map(product => app.createProductCard(product))
            .join('');

        // Add event listeners to product cards
        addProductCardListeners();
    }
}

// Load latest blog posts
function loadLatestPosts() {
    const postsContainer = document.getElementById('latest-posts');
    if (postsContainer) {
        postsContainer.innerHTML = latestPosts
            .map(post => createBlogPostCard(post))
            .join('');
    }
}

// Create blog post card
function createBlogPostCard(post) {
    return `
        <article class="blog-card">
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-meta">
                    <span class="blog-date">${formatDate(post.date)}</span>
                    <a href="blog-post.html?id=${post.id}" class="read-more">Read More</a>
                </div>
            </div>
        </article>
    `;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Add event listeners to product cards
function addProductCardListeners() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Wishlist button
        const wishlistBtn = card.querySelector('.wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = card.dataset.productId;
                toggleWishlist(productId);
            });
        }

        // Compare button
        const compareBtn = card.querySelector('.compare-btn');
        if (compareBtn) {
            compareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = card.dataset.productId;
                toggleCompare(productId);
            });
        }

        // Quick view button
        const quickViewBtn = card.querySelector('.quick-view-btn');
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = card.dataset.productId;
                showQuickView(productId);
            });
        }

        // Add to cart button
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = card.dataset.productId;
                addToCart(productId);
            });
        }
    });
}

// Toggle wishlist
function toggleWishlist(productId) {
    // Here you would typically make an API call to update the wishlist
    wishlistCount = wishlistCount === 0 ? 1 : 0;
    app.updateActionCounts();
    app.showNotification('Product added to wishlist!', 'success');
}

// Toggle compare
function toggleCompare(productId) {
    // Here you would typically make an API call to update the compare list
    compareCount = compareCount === 0 ? 1 : 0;
    app.updateActionCounts();
    app.showNotification('Product added to compare!', 'success');
}

// Show quick view
function showQuickView(productId) {
    const product = featuredProducts.find(p => p.id === parseInt(productId));
    if (product) {
        // Here you would typically show a modal with product details
        console.log('Quick view:', product);
    }
}

// Add to cart
function addToCart(productId) {
    // Here you would typically make an API call to update the cart
    cartCount++;
    app.updateActionCounts();
    app.showNotification('Product added to cart!', 'success');
}

// Initialize home page
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    loadLatestPosts();
}); 