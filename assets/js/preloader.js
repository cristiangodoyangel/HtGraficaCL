// Preloader logic
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    const preloader = document.getElementById('preloader-bg');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 500);
    }
  }, 1800); // Tiempo en ms (1.8 segundos)
});
