window.addEventListener('DOMContentLoaded', () => {
  enforceAuth();
  renderProfile();
  renderOrderHistory();
});

function renderProfile() {
  const user = window.getLoggedInUser && window.getLoggedInUser();
  if (!user) return;
  const form = document.getElementById('profileForm');
  if (!form) return;
  form.email.value = user.email;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newEmail = form.email.value.trim().toLowerCase();
    const newPassword = form.password.value;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx].email = newEmail;
      if (newPassword) users[idx].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', JSON.stringify(users[idx]));
      showProfileMsg('Profile updated!');
    }
  });
}

function renderOrderHistory() {
  const user = window.getLoggedInUser && window.getLoggedInUser();
  if (!user) return;
  const historyEl = document.querySelector('.order-history');
  const orders = JSON.parse(localStorage.getItem('orders_' + user.email) || '[]');
  if (!orders.length) {
    historyEl.innerHTML = '<p>No orders yet.</p>';
    return;
  }
  historyEl.innerHTML = orders.map(order => `
    <div class="order-item">
      <div><strong>Date:</strong> ${order.date || ''}</div>
      <div><strong>Total:</strong> ${order.total || ''}</div>
      <div><strong>Items:</strong> ${(order.cart || []).map(i => i.name + ' (x' + (i.qty || 1) + ')').join(', ')}</div>
    </div>
  `).join('');
}

function showProfileMsg(msg) {
  let el = document.querySelector('.profile-msg');
  if (!el) {
    el = document.createElement('div');
    el.className = 'profile-msg';
    document.querySelector('.profile-section').prepend(el);
  }
  el.textContent = msg;
  setTimeout(() => el.remove(), 2000);
}

function enforceAuth() {
  if (!window.getLoggedInUser || !window.getLoggedInUser()) {
    window.location.href = 'login.html';
  }
} 