// Simple authentication using localStorage
window.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = loginForm.email.value.trim().toLowerCase();
      const password = loginForm.password.value;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'index.html';
      } else {
        showAuthError('Invalid email or password.');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = registerForm.email.value.trim().toLowerCase();
      const password = registerForm.password.value;
      const confirm = registerForm.confirm.value;
      if (password !== confirm) {
        showAuthError('Passwords do not match.');
        return;
      }
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        showAuthError('Email already registered.');
        return;
      }
      const user = { email, password };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = 'index.html';
    });
  }
});

function showAuthError(msg) {
  let err = document.querySelector('.auth-error');
  if (!err) {
    err = document.createElement('div');
    err.className = 'auth-error';
    document.querySelector('.auth-form-wrapper').prepend(err);
  }
  err.textContent = msg;
}

// Utility to get logged in user
window.getLoggedInUser = function() {
  return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
};

// Utility to log out
window.logoutUser = function() {
  localStorage.removeItem('loggedInUser');
  window.location.reload();
}; 