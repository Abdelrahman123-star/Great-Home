// ========== OPTIMIZED VERSION - PERFORMANCE FOCUSED ==========

// Navbar scroll effect with throttling
let lastScrollTime = 0;
const scrollThrottleDelay = 16; // ~60fps

window.addEventListener('scroll', function () {
  const now = Date.now();
  if (now - lastScrollTime < scrollThrottleDelay) return;
  lastScrollTime = now;

  const scrollY = window.scrollY;
  const navbar = document.querySelector('.navbar');
  const logoNav = document.querySelector('.logo-nav');

  if (scrollY > 50) {
    navbar.classList.add('scrolled');
    logoNav.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
    logoNav.classList.remove('scrolled');
  }
}, { passive: true });

// Text animation effect
document.addEventListener('DOMContentLoaded', function () {
  const heroTitle = document.querySelector('.hero-title');
  const heroButtons = document.querySelectorAll('.btn-custom');

  if (heroTitle) {
    requestAnimationFrame(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    });
  }

  if (heroButtons.length) {
    setTimeout(() => {
      requestAnimationFrame(() => {
        heroButtons.forEach(button => {
          button.style.opacity = '1';
          button.style.transform = 'translateY(0)';
        });
      });
    }, 600);
  }
});

// About Section Parallax Effect with throttling
let lastParallaxTime = 0;
window.addEventListener('scroll', function () {
  const now = Date.now();
  if (now - lastParallaxTime < 32) return; // ~30fps for parallax
  lastParallaxTime = now;

  const parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxBg) {
    const scrolled = window.pageYOffset;
    requestAnimationFrame(() => {
      parallaxBg.style.transform = `translateY(${scrolled * 0.45}px)`;
    });
  }
}, { passive: true });

// Optimized stats animation with Intersection Observer
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'), 10);
    const duration = 1500; // Reduced duration
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const current = Math.floor(easeProgress * target);
      stat.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        stat.textContent = target;
      }
    };

    requestAnimationFrame(animate);
  });
}

// Create Intersection Observers for scroll animations
const createIntersectionObserver = (elements, callback, options = {}) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '20px',
    threshold: 0.1,
    ...options
  });

  elements.forEach(el => observer.observe(el));
  return observer;
};

// Initialize all scroll-based animations
document.addEventListener('DOMContentLoaded', function () {
  // Stats animation with Intersection Observer
  const statsContainer = document.querySelector('.stats-container');
  if (statsContainer) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsContainer);
  }

  // Timeline animation
  const timelineItems = document.querySelectorAll('.exp-fade-in');
  if (timelineItems.length) {
    createIntersectionObserver(timelineItems, (item) => {
      item.classList.add('exp-visible');
    });
  }

  // Project cards animation
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length) {
    createIntersectionObserver(projectCards, (card) => {
      card.classList.add('visible');
    });
  }

  // Navbar active link with Intersection Observer (optimized)
  initNavbarScroll();
});

// Navbar active link with Intersection Observer (optimized)
function initNavbarScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  // Cache section positions
  const sectionPositions = new Map();

  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 100; // Offset

    // Find current section
    let currentSection = '';
    let minDistance = Infinity;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;
      const distance = Math.abs(scrollPosition - top);

      if (scrollPosition >= top && scrollPosition <= bottom) {
        currentSection = section.id;
      } else if (distance < minDistance) {
        minDistance = distance;
        if (!currentSection) currentSection = section.id;
      }
    });

    // Update nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  };

  // Throttled scroll handler
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      updateActiveLink();
      scrollTimeout = null;
    }, 100);
  }, { passive: true });

  // Initial update
  updateActiveLink();
}

// Optimized Carousel
(function () {
  const track = document.getElementById('carouselTrack');
  const leftBtn = document.getElementById('btnLeft');
  const rightBtn = document.getElementById('btnRight');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track || !leftBtn || !rightBtn || !dotsContainer) return;

  let cards = Array.from(track.children);
  const gap = 20; // Use fixed gap for better performance

  let visibleCount = 3;
  let cardWidth = 0;

  // Settings
  const autoplayDelay = 2800;
  let autoplayTimer = null;
  let index = 0;
  let isTransitioning = false;

  // Pre-computed positions
  const positions = [];

  function calcVisibleCount() {
    const viewport = track.parentElement.clientWidth;
    if (viewport <= 520) return 1;
    if (viewport <= 900) return 2;
    return 3;
  }

  function buildClones() {
    // Remove existing clones
    track.querySelectorAll('.clone').forEach(n => n.remove());

    visibleCount = calcVisibleCount();
    const originalCards = cards.filter(card => !card.classList.contains('clone'));
    const originalCount = originalCards.length;

    if (originalCount === 0) return;

    // Front clones
    const frontClones = originalCards.slice(-visibleCount).map(el => el.cloneNode(true));
    frontClones.forEach(c => {
      c.classList.add('clone');
      track.insertBefore(c, track.firstChild);
    });

    // End clones
    const endClones = originalCards.slice(0, visibleCount).map(el => el.cloneNode(true));
    endClones.forEach(c => {
      c.classList.add('clone');
      track.appendChild(c);
    });

    // Refresh cards array
    cards = Array.from(track.children);
  }

  function setTrackInitialPosition() {
    if (cards.length === 0) return;

    cardWidth = cards[0].offsetWidth + gap;
    const offset = visibleCount * cardWidth;

    track.style.transition = 'none';
    track.style.transform = `translateX(-${offset}px)`;
    index = 0;

    // Force reflow
    void track.offsetWidth;

    track.style.transition = 'transform 0.4s cubic-bezier(.2,.9,.2,1)';

    // Pre-calc positions
    updatePositions();
  }

  function updatePositions() {
    positions.length = 0;
    const pages = Math.max(1, cards.length - (2 * visibleCount));

    for (let i = 0; i < pages; i++) {
      positions.push(-(visibleCount * cardWidth + (i * cardWidth)));
    }
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    const originalCount = cards.filter(card => !card.classList.contains('clone')).length;
    const pages = Math.max(1, originalCount - (visibleCount - 1));

    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      dot.addEventListener('click', () => {
        jumpTo(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.children;
    for (let d = 0; d < dots.length; d++) {
      dots[d].classList.toggle('active', d === index);
    }
  }

  function moveToNext() {
    if (isTransitioning) return;
    isTransitioning = true;

    const originalCount = cards.filter(card => !card.classList.contains('clone')).length;
    const pages = originalCount - (visibleCount - 1);
    index = (index + 1) % pages;

    slideToIndex(index);
  }

  function moveToPrev() {
    if (isTransitioning) return;
    isTransitioning = true;

    const originalCount = cards.filter(card => !card.classList.contains('clone')).length;
    const pages = originalCount - (visibleCount - 1);
    index = (index - 1 + pages) % pages;

    slideToIndex(index);
  }

  function slideToIndex(i) {
    if (positions[i] !== undefined) {
      track.style.transform = `translateX(${positions[i]}px)`;
      updateDots();
    }
  }

  function handleTransitionEnd() {
    isTransitioning = false;
  }

  function jumpTo(i) {
    const originalCount = cards.filter(card => !card.classList.contains('clone')).length;
    const pages = originalCount - (visibleCount - 1);

    if (i < 0) i = 0;
    if (i >= pages) i = pages - 1;

    index = i;
    slideToIndex(index);
  }

  // Autoplay functions
  function startAutoplay() {
    if (autoplayTimer) return;
    autoplayTimer = setInterval(moveToNext, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  function init() {
    buildClones();
    setTrackInitialPosition();
    createDots();

    // Event listeners
    rightBtn.addEventListener('click', () => { moveToNext(); resetAutoplay(); });
    leftBtn.addEventListener('click', () => { moveToPrev(); resetAutoplay(); });
    track.addEventListener('transitionend', handleTransitionEnd);

    // Pause on hover
    track.parentElement.addEventListener('mouseenter', stopAutoplay);
    track.parentElement.addEventListener('mouseleave', resetAutoplay);

    // Throttled resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      if (resizeTimeout) return;
      resizeTimeout = setTimeout(() => {
        const newVisible = calcVisibleCount();
        if (newVisible !== visibleCount) {
          buildClones();
          setTrackInitialPosition();
          createDots();
          updateDots();
        }
        resizeTimeout = null;
      }, 250);
    });

    startAutoplay();
  }

  // Initialize
  init();
})();

// Optimized Image Slider
const sliderInit = () => {
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const slide = document.querySelector('.slide');

  if (!nextBtn || !prevBtn || !slide) return;

  let autoSlideInterval;

  function nextSlide() {
    const items = document.querySelectorAll('.item');
    if (items.length === 0) return;

    requestAnimationFrame(() => {
      slide.appendChild(items[0]);
    });
  }

  function prevSlide() {
    const items = document.querySelectorAll('.item');
    if (items.length === 0) return;

    requestAnimationFrame(() => {
      slide.prepend(items[items.length - 1]);
    });
  }

  // Button functionality
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 8000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Start autoplay
  startAutoSlide();

  // Pause on hover
  slide.parentElement.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  slide.parentElement.addEventListener('mouseleave', () => {
    startAutoSlide();
  });
};

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', sliderInit);