// User Preferences Management
const userPreferences = {
    theme: localStorage.getItem('theme') || 'light',
    fontSize: localStorage.getItem('fontSize') || 'medium',
    notifications: localStorage.getItem('notifications') === 'true',
    currency: localStorage.getItem('currency') || 'USD'
};

// Theme Management
function toggleTheme() {
    userPreferences.theme = userPreferences.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', userPreferences.theme);
}

// Font Size Management
function setFontSize(size) {
    const sizes = {
        small: '14px',
        medium: '16px',
        large: '18px'
    };
    
    document.documentElement.style.fontSize = sizes[size];
    userPreferences.fontSize = size;
    localStorage.setItem('fontSize', size);
}

// Notification Preferences
function toggleNotifications() {
    userPreferences.notifications = !userPreferences.notifications;
    localStorage.setItem('notifications', userPreferences.notifications);
}

// Currency Management
function setCurrency(currency) {
    userPreferences.currency = currency;
    localStorage.setItem('currency', currency);
    // Update prices across the site
    updatePrices();
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else {
            clearError(input);
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid email address');
            }
        }

        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!phoneRegex.test(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid phone number');
            }
        }
    });

    return isValid;
}

// Show error message
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    
    input.classList.add('error');
}

// Clear error message
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.classList.remove('error');
}

// Update prices based on currency
function updatePrices() {
    const exchangeRates = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.0
    };

    const rate = exchangeRates[userPreferences.currency];
    const currencySymbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥'
    };

    document.querySelectorAll('.price').forEach(priceElement => {
        const basePrice = parseFloat(priceElement.dataset.basePrice || priceElement.textContent.replace(/[^0-9.-]+/g, ''));
        const convertedPrice = (basePrice * rate).toFixed(2);
        priceElement.textContent = `${currencySymbols[userPreferences.currency]}${convertedPrice}`;
    });
}

// Initialize user preferences
function initializeUserPreferences() {
    // Apply theme
    if (userPreferences.theme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Apply font size
    setFontSize(userPreferences.fontSize);

    // Update prices
    updatePrices();

    // Add event listeners for preference changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    const fontSizeSelect = document.getElementById('font-size');
    if (fontSizeSelect) {
        fontSizeSelect.value = userPreferences.fontSize;
        fontSizeSelect.addEventListener('change', (e) => setFontSize(e.target.value));
    }

    const notificationToggle = document.getElementById('notification-toggle');
    if (notificationToggle) {
        notificationToggle.checked = userPreferences.notifications;
        notificationToggle.addEventListener('change', toggleNotifications);
    }

    const currencySelect = document.getElementById('currency-select');
    if (currencySelect) {
        currencySelect.value = userPreferences.currency;
        currencySelect.addEventListener('change', (e) => setCurrency(e.target.value));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeUserPreferences); 