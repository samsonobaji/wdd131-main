window.addEventListener('DOMContentLoaded', () => {
  renderConfirmation();
  updateHeaderCounts();
});

function renderConfirmation() {
  const order = JSON.parse(localStorage.getItem('lastOrder') || 'null');
  const container = document.querySelector('.confirmation-content') || document.getElementById('confirmation-content');
  if (!container) return;
  if (!order) {
    container.innerHTML = '<h2>No recent order found.</h2>';
    return;
  }
  container.innerHTML = `
    <div class="confirmation-message">
      <i class="fas fa-check-circle"></i>
      <h2>Thank you for your order!</h2>
      <p>Your order has been placed successfully. A confirmation email will be sent to <strong>${order.email || ''}</strong>.</p>
    </div>
    <div class="order-summary">
      <h3>Order Summary</h3>
      <div class="order-info">
        <p><strong>Name:</strong> ${order.name || order.firstName + ' ' + order.lastName || ''}</p>
        <p><strong>Address:</strong> ${order.address || ''}, ${order.city || ''}</p>
        <p><strong>Phone:</strong> ${order.phone || ''}</p>
        <p><strong>Payment:</strong> ${order.payment || order.paymentMethod || ''}</p>
      </div>
      <div class="order-items">
        ${(order.cart || []).map(item => `
          <div class="order-item">
            <img src="${item.image || ''}" alt="${item.name}" class="order-item-image">
            <div class="order-item-info">
              <h4 class="order-item-name">${item.name}</h4>
              <div class="order-item-qty">Qty: ${item.qty || 1}</div>
              <div class="order-item-price">$${item.price}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="order-total">
        <strong>${order.total || ''}</strong>
      </div>
    </div>
  `;
}

function updateHeaderCounts() {
  document.querySelector('.cart-count').textContent = CartUtils.getCount('cart');
  document.querySelector('.wishlist-count').textContent = CartUtils.getCount('wishlist');
  document.querySelector('.compare-count').textContent = CartUtils.getCount('compare');
} 