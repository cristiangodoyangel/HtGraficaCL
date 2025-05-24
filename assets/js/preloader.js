// Preloader logic
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    const preloader = document.getElementById('preloader-bg');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 500);
    }
  }, 1900); // Tiempo en ms (3.2 segundos)
});
