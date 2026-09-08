document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    const siteHeader = document.getElementById('siteHeader');
    const headerProgress = document.getElementById('headerProgress');

    // Mobile Navigation Toggle
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mainNav.classList.toggle('is-open');
            navToggle.classList.toggle('is-open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close when clicking nav links
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                navToggle.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
                mainNav.classList.remove('is-open');
                navToggle.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Scroll reading progress & header shadow
    function handleScroll() {
        const scrollY = window.scrollY;
        if (headerProgress) {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const pct = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
            headerProgress.style.width = pct + '%';
        }
        if (siteHeader && !siteHeader.classList.contains('is-cover-mode')) {
            if (scrollY > 20) {
                siteHeader.classList.add('is-scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
});

