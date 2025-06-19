document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let current = 0;
  let interval = null;

  function showSlide(idx) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
      dots[i].classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function startAuto() {
    interval = setInterval(nextSlide, 5000);
  }
  function stopAuto() {
    clearInterval(interval);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      stopAuto();
      startAuto();
    });
  });

  document.querySelector('.hero-carousel').addEventListener('mouseenter', stopAuto);
  document.querySelector('.hero-carousel').addEventListener('mouseleave', startAuto);

  showSlide(0);
  startAuto();
}); 