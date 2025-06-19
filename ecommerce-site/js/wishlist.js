window.addEventListener('DOMContentLoaded', () => {
  renderWishlist();
  updateHeaderCounts();
});

function renderWishlist() {
  const wishlistItems = CartUtils.getList('wishlist');
  const wishlistContainer = document.querySelector('.wishlist-items') || document.getElementById('wishlist-items');
  if (!wishlistContainer) return;
  if (wishlistItems.length === 0) {
    wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
    return;
  }
  wishlistContainer.innerHTML = wishlistItems.map(item => `
    <div class="wishlist-item" data-id="${item.id}">
      <img src="${item.image || ''}" alt="${item.name}" class="wishlist-item-image">
      <div class="wishlist-item-info">
        <h4 class="wishlist-item-name">${item.name}</h4>
        <div class="wishlist-item-price">$${item.price}</div>
        <button class="remove-btn">Remove</button>
      </div>
    </div>
  `).join('');
  setupWishlistActions();
}

function setupWishlistActions() {
  document.querySelectorAll('.wishlist-item').forEach(itemEl => {
    const id = itemEl.getAttribute('data-id');
    itemEl.querySelector('.remove-btn').addEventListener('click', () => {
      CartUtils.removeItem('wishlist', id);
      renderWishlist();
      updateHeaderCounts();
    });
  });
}

function updateHeaderCounts() {
  document.querySelector('.cart-count').textContent = CartUtils.getCount('cart');
  document.querySelector('.wishlist-count').textContent = CartUtils.getCount('wishlist');
  document.querySelector('.compare-count').textContent = CartUtils.getCount('compare');
} 