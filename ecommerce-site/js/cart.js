// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            alert('Sorry, this item is out of stock!');
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showNotification('Item added to cart!');
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showNotification('Item removed from cart!');
}

// Function to update item quantity
function updateQuantity(productId, newQuantity) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return;

    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    if (newQuantity > product.stock) {
        alert('Sorry, we don\'t have enough stock!');
        return;
    }

    cartItem.quantity = newQuantity;
    saveCart();
    updateCartUI();
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to calculate cart totals
function calculateTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    return {
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };
}

// Function to update cart UI
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    if (cartContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            if (cartTotal) cartTotal.innerHTML = '';
            return;
        }

        const totals = calculateTotals();
        
        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        if (cartTotal) {
            cartTotal.innerHTML = `
                <div class="cart-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>$${totals.subtotal}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping:</span>
                        <span>$${totals.shipping}</span>
                    </div>
                    <div class="summary-row">
                        <span>Tax:</span>
                        <span>$${totals.tax}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total:</span>
                        <span>$${totals.total}</span>
                    </div>
                    <button class="checkout-btn" onclick="proceedToCheckout()">
                        Proceed to Checkout
                    </button>
                </div>
            `;
        }
    }
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Function to proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Here you would typically redirect to a checkout page
    // For now, we'll just show a message
    alert('Proceeding to checkout...');
}

// Initialize cart when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateHeaderCounts();
});

function renderCart() {
    const cartItems = CartUtils.getList('cart');
    const cartContainer = document.querySelector('.cart-items') || document.getElementById('cart-items');
    const totalContainer = document.querySelector('.cart-total') || document.getElementById('cart-total');
    if (!cartContainer) return;
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        if (totalContainer) totalContainer.textContent = '';
        return;
    }
    let total = 0;
    cartContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image || ''}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn minus">-</button>
                    <input type="number" value="${item.qty || 1}" min="1" max="10">
                    <button class="qty-btn plus">+</button>
                </div>
                <button class="remove-btn">Remove</button>
            </div>
        </div>
    `).join('');
    // Calculate total
    cartItems.forEach(item => {
        total += (item.price * (item.qty || 1));
    });
    if (totalContainer) totalContainer.textContent = `Total: $${total.toFixed(2)}`;
    setupCartActions();
}

function setupCartActions() {
    document.querySelectorAll('.cart-item').forEach(itemEl => {
        const id = itemEl.getAttribute('data-id');
        // Remove
        itemEl.querySelector('.remove-btn').addEventListener('click', () => {
            CartUtils.removeItem('cart', id);
            renderCart();
            updateHeaderCounts();
        });
        // Quantity
        const input = itemEl.querySelector('input[type="number"]');
        const minus = itemEl.querySelector('.qty-btn.minus');
        const plus = itemEl.querySelector('.qty-btn.plus');
        minus.addEventListener('click', () => {
            let val = parseInt(input.value);
            if (val > 1) input.value = val - 1;
            updateQty(id, parseInt(input.value));
        });
        plus.addEventListener('click', () => {
            let val = parseInt(input.value);
            if (val < 10) input.value = val + 1;
            updateQty(id, parseInt(input.value));
        });
        input.addEventListener('change', () => {
            let val = parseInt(input.value);
            if (val < 1) val = 1;
            if (val > 10) val = 10;
            input.value = val;
            updateQty(id, val);
        });
    });
}

function updateQty(id, qty) {
    const items = CartUtils.getList('cart');
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) {
        items[idx].qty = qty;
        CartUtils.setList('cart', items);
        renderCart();
        updateHeaderCounts();
    }
}

function updateHeaderCounts() {
    document.querySelector('.cart-count').textContent = CartUtils.getCount('cart');
    document.querySelector('.wishlist-count').textContent = CartUtils.getCount('wishlist');
    document.querySelector('.compare-count').textContent = CartUtils.getCount('compare');
} 