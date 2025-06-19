// Utility for Cart, Wishlist, and Compare using localStorage
const STORAGE_KEYS = {
  cart: 'cartItems',
  wishlist: 'wishlistItems',
  compare: 'compareItems'
};

function getList(type) {
  const key = STORAGE_KEYS[type];
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function setList(type, items) {
  const key = STORAGE_KEYS[type];
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(items));
}

function addItem(type, product) {
  const items = getList(type);
  if (!items.find(item => item.id === product.id)) {
    items.push(product);
    setList(type, items);
  }
}

function removeItem(type, productId) {
  let items = getList(type);
  items = items.filter(item => item.id !== productId);
  setList(type, items);
}

function isInList(type, productId) {
  const items = getList(type);
  return items.some(item => item.id === productId);
}

function getCount(type) {
  return getList(type).length;
}

function clearList(type) {
  setList(type, []);
}

// Expose globally for use in other scripts
window.CartUtils = {
  getList,
  setList,
  addItem,
  removeItem,
  isInList,
  getCount,
  clearList
}; 