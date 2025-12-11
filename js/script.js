
// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const logoNav = document.querySelector('.logo-nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        logoNav.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        logoNav.classList.remove('scrolled');
    }
});

// Text animation effect
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelectorAll('.btn-custom');

    // Add animation class after a short delay
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
    setTimeout(() => {
        heroButtons.forEach(button => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        });
    }, 900);
});

// About Section Parallax Effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        const speed = 0.45;
        parallaxBg.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Animate stats numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}



// Scroll animation for about section elements
function checkAboutScroll() {
    // Check if stats are in view
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        const statsTop = statsContainer.getBoundingClientRect().top;
        const statsVisible = 200;
        
        if (statsTop < window.innerHeight - statsVisible) {
            animateStats();
            // Remove event listener after animating once to improve performance
            window.removeEventListener('scroll', checkAboutScroll);
        }
    }
}


// Initialize about section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Add scroll event listener for about section animations
    window.addEventListener('scroll', checkAboutScroll);
    
    // Initial check in case elements are already in view
    checkAboutScroll();
});

// Timeline scroll animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.exp-fade-in');
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemVisible = 150;
        
        if (itemTop < window.innerHeight - itemVisible) {
            item.classList.add('exp-visible');
        }
    });
}

// Add to your existing DOMContentLoaded or scroll event
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', animateTimeline);
    animateTimeline(); // Initial check
});


// Navbar active link with Intersection Observer
function initNavbarScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Adjust these values to control when section becomes active
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeSection = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href').substring(1); // Remove the #
                    if (href === activeSection) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initNavbarScroll);







    // Scroll animation for project cards
    const animateOnScroll = function() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(function(card) {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 150;

            if (cardTop < window.innerHeight - cardVisible) {
                card.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Initial check in case elements are already in view
    animateOnScroll();

    // Form Submission







    
(function(){
  const track = document.getElementById('carouselTrack');
  const leftBtn = document.getElementById('btnLeft');
  const rightBtn = document.getElementById('btnRight');
  const dotsContainer = document.getElementById('carouselDots');

  let cards = Array.from(track.children);
  const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap')) || 20;

  let visibleCount = calcVisibleCount(); // 3 on desktop, 2 or 1 on smaller widths
  let cardWidth = cards[0].getBoundingClientRect().width + gap;

  // settings
  const autoplayDelay = 2800;
  let autoplayTimer = null;
  const transitionMs = 400;
  let index = 0; // logical index (0..n-1 where n = originalCardsCount)
  let isTransitioning = false;
  let isDragging = false;
  let startX = 0, currentTranslate = 0, prevTranslate = 0, animationID = 0;

  // Keep original array length handy
  const originalCards = cards.slice();
  const originalCount = originalCards.length;

  // clone last visibleCount items to front and first visibleCount to end
  function buildClones(){
    // clean clones if exist
    track.querySelectorAll('.clone').forEach(n => n.remove());

    visibleCount = calcVisibleCount();
    // clones at front (last visibleCount)
    const frontClones = originalCards.slice(-visibleCount).map(el => el.cloneNode(true));
    frontClones.forEach(c => {
      c.classList.add('clone');
      track.insertBefore(c, track.firstChild);
    });
    // clones at end (first visibleCount)
    const endClones = originalCards.slice(0, visibleCount).map(el => el.cloneNode(true));
    endClones.forEach(c => {
      c.classList.add('clone');
      track.appendChild(c);
    });

    // refresh cards array
    cards = Array.from(track.children);
  }

  function calcVisibleCount(){
    const viewport = track.parentElement.clientWidth;
    // read min-width from CSS computed style of a card
    const dummy = track.children[0];
    const style = window.getComputedStyle(dummy);
    const minW = parseFloat(style.minWidth) || (viewport / 3);
    // decide visible items by checking computed widths
    // fallback to 3 for large screens
    if (viewport <= 520) return 1;
    if (viewport <= 900) return 2;
    return 3;
  }

  function setTrackInitialPosition(){
    cardWidth = cards[0].getBoundingClientRect().width + gap;
    // start at the first original item (index 0) — but because of front clones, offset by visibleCount clones
    const offset = visibleCount * cardWidth;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${offset}px)`;
    // set logical index 0
    index = 0;
    prevTranslate = -offset;
    currentTranslate = prevTranslate;
    setTimeout(()=> track.style.transition = `transform ${transitionMs}ms cubic-bezier(.2,.9,.2,1)`, 10);
  }

  function createDots(){
    dotsContainer.innerHTML = '';
    const pages = Math.max(1, originalCount - (visibleCount - 1)); // number of selectable positions
    for(let i=0;i<pages;i++){
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (i===0 ? ' active':'');
      dot.dataset.index = i;
      dot.addEventListener('click', ()=> {
        jumpTo(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots(){
    const dots = dotsContainer.children;
    for(let d=0; d<dots.length; d++){
      dots[d].classList.toggle('active', d === index);
    }
  }

  // move to next logical index
  function moveToNext(){
    if (isTransitioning) return;
    isTransitioning = true;
    index = (index + 1) % (originalCount - (visibleCount - 1));
    slideToIndex(index);
  }

  function moveToPrev(){
    if (isTransitioning) return;
    isTransitioning = true;
    const pages = originalCount - (visibleCount - 1);
    index = (index - 1 + pages) % pages;
    slideToIndex(index);
  }

  function slideToIndex(i){
    // compute translate: offset clones at front + i * cardWidth
    const offset = visibleCount * cardWidth + (i * cardWidth);
    track.style.transform = `translateX(-${offset}px)`;
    currentTranslate = -offset;
    prevTranslate = currentTranslate;
    updateDots();
  }

  // After sliding, if we are on cloned region, jump without animation
  function handleTransitionEnd(){
    isTransitioning = false;
    const pages = originalCount - (visibleCount - 1);
    // if index in bounds do nothing (we always set index modulo)
    // but because we used clones and index wraps logically, we rarely need to jump; still ensure position sanity:
    const offset = visibleCount * cardWidth + (index * cardWidth);
    track.style.transition = 'none';
    track.style.transform = `translateX(-${offset}px)`;
    // force reflow then restore transition
    void track.offsetWidth;
    track.style.transition = `transform ${transitionMs}ms cubic-bezier(.2,.9,.2,1)`;
  }

  // Jump to a specific logical index
  function jumpTo(i){
    if (i < 0) i = 0;
    const pages = originalCount - (visibleCount - 1);
    if (i >= pages) i = pages - 1;
    index = i;
    slideToIndex(index);
  }

  /* ------------- Drag / Swipe support ------------- */
  function pointerDown(event){
    isDragging = true;
    track.style.transition = 'none';
    startX = (event.type.includes('touch')) ? event.touches[0].clientX : event.clientX;
    animationID = requestAnimationFrame(animation);
    // stop autoplay while dragging
    stopAutoplay();
  }

  function pointerMove(event){
    if (!isDragging) return;
    const clientX = (event.type.includes('touch')) ? event.touches[0].clientX : event.clientX;
    const dx = clientX - startX;
    currentTranslate = prevTranslate + dx;
  }

  function pointerUp(){
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;
    const threshold = cardWidth * 0.25; // need to move at least 25% to change slide
    // if moved left (negative) => next; moved right (positive) => prev
    if (movedBy < -threshold){
      // next
      moveToNext();
    } else if (movedBy > threshold){
      // prev
      moveToPrev();
    } else {
      // restore
      track.style.transition = `transform ${transitionMs}ms cubic-bezier(.2,.9,.2,1)`;
      track.style.transform = `translateX(${prevTranslate}px)`;
    }
    // prepare prevTranslate for next drag
    prevTranslate = parseFloat(track.style.transform.replace('translateX(','').replace('px)','')) || prevTranslate;
    resetAutoplay();
  }

  function animation(){
    if (isDragging){
      track.style.transform = `translateX(${currentTranslate}px)`;
      requestAnimationFrame(animation);
    }
  }

  /* ------------- Autoplay ------------- */
  function startAutoplay(){
    if (autoplayTimer) return;
    autoplayTimer = setInterval(()=> {
      moveToNext();
    }, autoplayDelay);
  }
  function stopAutoplay(){
    if (autoplayTimer){ clearInterval(autoplayTimer); autoplayTimer = null; }
  }
  function resetAutoplay(){
    stopAutoplay();
    startAutoplay();
  }

  /* ------------- Event Listeners ------------- */
  function attachListeners(){
    // arrow clicks
    rightBtn.addEventListener('click', ()=> { moveToNext(); resetAutoplay(); });
    leftBtn.addEventListener('click', ()=> { moveToPrev(); resetAutoplay(); });

    // transition end to fix clones position
    track.addEventListener('transitionend', handleTransitionEnd);

    // pointer events for drag/swipe
    track.addEventListener('pointerdown', (e) => {
      // only left button or touch
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      track.setPointerCapture(e.pointerId);
      pointerDown(e);
    });

    // pointer move/up/cancel
    track.addEventListener('pointermove', pointerMove);
    track.addEventListener('pointerup', (e) => { pointerUp(); track.releasePointerCapture(e.pointerId); });
    track.addEventListener('pointercancel', pointerUp);
    track.addEventListener('pointerleave', (e) => { if (isDragging) pointerUp(); });

    // pause on hover/focus
    track.parentElement.addEventListener('mouseenter', stopAutoplay);
    track.parentElement.addEventListener('mouseleave', resetAutoplay);

    // touch support: also pause autoplay on touchstart
    track.addEventListener('touchstart', stopAutoplay, { passive: true });
    track.addEventListener('touchend', resetAutoplay, { passive: true });

    // resize handling
    window.addEventListener('resize', onResize);
  }

  function onResize(){
    // rebuild clones if visibleCount changed
    const newVisible = calcVisibleCount();
    if (newVisible !== visibleCount){
      // rebuild clones and dots
      buildClones();
      setTrackInitialPosition();
      createDots();
      updateDots();
    } else {
      // just recompute sizes
      cardWidth = cards[0].getBoundingClientRect().width + gap;
      setTrackInitialPosition();
      updateDots();
    }
  }

  /* ------------- Initialization ------------- */
  function init(){
    // initial clones + numbers
    originalCards.length === 0 && console.warn('No cards found in carousel.');
    buildClones();
    // recompute cardWidth after clones
    cards = Array.from(track.children);
    cardWidth = cards[0].getBoundingClientRect().width + gap;

    createDots();
    setTrackInitialPosition();
    attachListeners();
    startAutoplay();
  }

  // Start
  init();

})();







let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slide = document.querySelector('.slide');

function nextSlide() {
    let items = document.querySelectorAll('.item');
    slide.appendChild(items[0]);
}

function prevSlide() {
    let items = document.querySelectorAll('.item');
    slide.prepend(items[items.length - 1]);
}

// Button functionality
next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

// Automatic swap every 8 seconds
setInterval(nextSlide, 8000);
