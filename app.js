// app.js

// Carousel logic
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const images = Array.from(document.querySelectorAll('.carousel-image'));
let current = 0;
function showSlide(idx) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === idx);
  });
  images.forEach((img, i) => {
    img.classList.toggle('active', i === idx);
  });
}
document.addEventListener('DOMContentLoaded', () => {

  // Mobile swipe support with swipe hint hide
  const carousel = document.querySelector('.feature-carousel-images');
  const swipeHint = document.querySelector('.carousel-swipe-hint');
  let startX = 0;
  let endX = 0;
  let swipeHintHidden = false;
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', () => {
      if (startX && endX) {
        const diff = startX - endX;
        if (Math.abs(diff) > 40) { // swipe threshold
          if (diff > 0) {
            current = (current + 1) % slides.length;
            showSlide(current);
          } else {
            current = (current - 1 + slides.length) % slides.length;
            showSlide(current);
          }
          // Hide swipe hint after first swipe
          if (swipeHint && !swipeHintHidden) {
            swipeHint.style.display = 'none';
            swipeHintHidden = true;
          }
        }
      }
      startX = 0;
      endX = 0;
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.feature-icons-section');
  const icons = document.querySelectorAll('.feature-content-icon');

  // Use Intersection Observer for better scroll detection
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('visible');
        icons.forEach((icon, i) => {
          setTimeout(() => icon.classList.add('visible'), i * 120);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 }); // Adjust threshold for when you want the effect to trigger

  observer.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
  // Overlay button logic
  const overlayPrev = document.getElementById('carousel-overlay-prev');
  const overlayNext = document.getElementById('carousel-overlay-next');
  if (overlayPrev) {
    overlayPrev.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });
  }
  if (overlayNext) {
    overlayNext.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });
  }
});

// Feature icons pop effect for each group
['feature-icons-group-1', 'feature-icons-group-2'].forEach((groupId) => {
  const group = document.getElementById(groupId);
  if (!group) return;
  const icons = group.querySelectorAll('.feature-content-icon');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        icons.forEach((icon, i) => {
          setTimeout(() => icon.classList.add('visible'), i * 120);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(group);
});