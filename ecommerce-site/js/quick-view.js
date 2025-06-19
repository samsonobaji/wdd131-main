// Quick View Modal Functionality
class QuickView {
    constructor() {
        this.modal = null;
        this.init();
    }

    init() {
        // Create modal structure
        this.modal = document.createElement('div');
        this.modal.className = 'quick-view-modal';
        this.modal.innerHTML = `
            <div class="quick-view-content">
                <button class="close-modal">&times;</button>
                <div class="quick-view-body">
                    <div class="product-gallery"></div>
                    <div class="product-details">
                        <h2 class="product-title"></h2>
                        <div class="product-rating"></div>
                        <p class="product-price"></p>
                        <p class="product-description"></p>
                        <div class="product-colors"></div>
                        <div class="product-features"></div>
                        <div class="product-actions">
                            <div class="quantity-selector">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" value="1" min="1" max="10">
                                <button class="quantity-btn plus">+</button>
                            </div>
                            <button class="add-to-cart-btn">Add to Cart</button>
                            <button class="add-to-wishlist-btn">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);

        // Add event listeners
        this.modal.querySelector('.close-modal').addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        // Quantity selector functionality
        const quantityInput = this.modal.querySelector('.quantity-selector input');
        this.modal.querySelector('.minus').addEventListener('click', () => {
            if (quantityInput.value > 1) quantityInput.value--;
        });
        this.modal.querySelector('.plus').addEventListener('click', () => {
            if (quantityInput.value < 10) quantityInput.value++;
        });

        // Add to cart functionality
        this.modal.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            const productId = this.modal.dataset.productId;
            addToCart(productId, quantity);
            this.close();
        });

        // Add to wishlist functionality
        this.modal.querySelector('.add-to-wishlist-btn').addEventListener('click', (e) => {
            const btn = e.currentTarget;
            btn.classList.toggle('active');
            const productId = this.modal.dataset.productId;
            toggleWishlist(productId);
        });
    }

    open(product) {
        this.modal.dataset.productId = product.id;
        
        // Update modal content
        this.modal.querySelector('.product-title').textContent = product.name;
        this.modal.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
        this.modal.querySelector('.product-description').textContent = product.description;
        
        // Update rating
        const rating = generateStarRating(product.rating);
        this.modal.querySelector('.product-rating').innerHTML = rating;
        
        // Update colors
        const colorsContainer = this.modal.querySelector('.product-colors');
        colorsContainer.innerHTML = product.colors.map(color => `
            <span class="color-option" style="background-color: ${color.toLowerCase()}" 
                  data-tooltip="${color}"></span>
        `).join('');
        
        // Update features
        const featuresContainer = this.modal.querySelector('.product-features');
        featuresContainer.innerHTML = product.features.map(feature => `
            <span class="feature-tag">${feature}</span>
        `).join('');
        
        // Update gallery
        const galleryContainer = this.modal.querySelector('.product-gallery');
        galleryContainer.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
        `;
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize Quick View
const quickView = new QuickView();

// Add quick view buttons to product cards
function addQuickViewButtons() {
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = card.dataset.productId;
        const product = products.find(p => p.id === parseInt(productId));
        
        if (product) {
            const quickViewBtn = document.createElement('button');
            quickViewBtn.className = 'quick-view-btn';
            quickViewBtn.innerHTML = '<i class="fas fa-eye"></i> Quick View';
            quickViewBtn.addEventListener('click', () => quickView.open(product));
            
            card.querySelector('.product-info').appendChild(quickViewBtn);
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', addQuickViewButtons); 