window.addEventListener('DOMContentLoaded', () => {
  enforceAuth();
  renderCheckoutSummary();
  updateHeaderCounts();
  setupCheckoutForm();
});

function enforceAuth() {
  if (!window.getLoggedInUser || !window.getLoggedInUser()) {
    window.location.href = 'login.html';
  }
}

function renderCheckoutSummary() {
  const cartItems = CartUtils.getList('cart');
  const summaryContainer = document.querySelector('.checkout-summary') || document.getElementById('checkout-summary');
  const totalContainer = document.querySelector('.checkout-total') || document.getElementById('checkout-total');
  if (!summaryContainer) return;
  if (cartItems.length === 0) {
    summaryContainer.innerHTML = '<p>Your cart is empty.</p>';
    if (totalContainer) totalContainer.textContent = '';
    return;
  }
  let total = 0;
  summaryContainer.innerHTML = cartItems.map(item => `
    <div class="checkout-item">
      <img src="${item.image || ''}" alt="${item.name}" class="checkout-item-image">
      <div class="checkout-item-info">
        <h4 class="checkout-item-name">${item.name}</h4>
        <div class="checkout-item-qty">Qty: ${item.qty || 1}</div>
        <div class="checkout-item-price">$${item.price}</div>
      </div>
    </div>
  `).join('');
  cartItems.forEach(item => {
    total += (item.price * (item.qty || 1));
  });
  if (totalContainer) totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

function setupCheckoutForm() {
  const form = document.querySelector('.checkout-form') || document.getElementById('checkout-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Collect address and payment info (mock)
    const formData = new FormData(form);
    const user = window.getLoggedInUser && window.getLoggedInUser();
    const order = {
      name: formData.get('name') || formData.get('firstName') + ' ' + formData.get('lastName'),
      email: formData.get('email'),
      address: formData.get('address'),
      city: formData.get('city'),
      phone: formData.get('phone'),
      payment: formData.get('payment') || formData.get('paymentMethod'),
      cart: CartUtils.getList('cart'),
      total: document.querySelector('.checkout-total')?.textContent || '',
      date: new Date().toLocaleString()
    };
    // Save order to localStorage for confirmation page
    localStorage.setItem('lastOrder', JSON.stringify(order));
    // Save to user order history
    if (user && user.email) {
      let orders = JSON.parse(localStorage.getItem('orders_' + user.email) || '[]');
      orders.push(order);
      localStorage.setItem('orders_' + user.email, JSON.stringify(orders));
    }
    // Clear cart
    CartUtils.clearList('cart');
    // Redirect to confirmation
    window.location.href = 'confirmation.html';
  });
}

function updateHeaderCounts() {
  document.querySelector('.cart-count').textContent = CartUtils.getCount('cart');
  document.querySelector('.wishlist-count').textContent = CartUtils.getCount('wishlist');
  document.querySelector('.compare-count').textContent = CartUtils.getCount('compare');
} 