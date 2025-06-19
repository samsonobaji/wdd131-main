// Get the current year
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Get the last modified date
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;

// Hamburger menu functionality
const hamburgerBtn = document.getElementById('hamburgerBtn');
const nav = document.querySelector('nav');

hamburgerBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburgerBtn.textContent = nav.classList.contains('open') ? '✕' : '☰';
}); 