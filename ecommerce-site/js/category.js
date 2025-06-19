window.addEventListener('DOMContentLoaded', () => {
  renderCategoryResults();
  setupCategoryFilters();
});

function renderCategoryResults() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat') || '';
  document.getElementById('category-title').textContent = cat ? cat : 'Category';
  let results = [];
  if (typeof productsData !== 'undefined') {
    results = productsData.filter(p => p.category === cat);
  }
  // Apply price filters
  const min = parseFloat(document.getElementById('cat-min-price')?.value) || 0;
  const max = parseFloat(document.getElementById('cat-max-price')?.value) || Infinity;
  results = results.filter(p => p.price >= min && p.price <= max);
  // Render
  const grid = document.getElementById('category-results');
  if (!grid) return;
  if (!results.length) {
    grid.innerHTML = '<p>No products found in this category.</p>';
    return;
  }
  grid.innerHTML = results.map(product => `
    <div class="product-card">
      <div class="product-image">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}">
        </a>
      </div>
      <div class="product-details">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-price">
          <span class="current-price">$${product.price}</span>
          ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}
        </div>
        <div class="product-rating">
          <div class="rating-stars">${createStarRating(product.rating)}</div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <button class="btn add-to-cart">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function setupCategoryFilters() {
  document.getElementById('cat-apply-filters')?.addEventListener('click', renderCategoryResults);
}

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