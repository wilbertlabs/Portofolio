window.addEventListener('load', function() {
    const container = document.getElementById('loadingContainer');
    const pctEl = document.getElementById('loaderPct');
    const bigNumEl = document.getElementById('loaderBigNum');
    const barFill = document.getElementById('loaderBarFill');
    const body = document.body;

    if (!container || !pctEl || !barFill) return;

    barFill.classList.add('active');

    const duration = 2400;
    const startTime = performance.now();
    let lastRounded = -1;

    function easeOut(t) {
        return 1 - Math.pow(1 - t, 2.8);
    }

    function tick(now) {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = easeOut(t);
        const jitter = t < 0.9 ? (Math.random() * 2 - 1) * 0.35 : 0;
        const pct = Math.min(eased * 100 + jitter, t >= 1 ? 100 : 99);
        const rounded = Math.round(pct);

        if (rounded !== lastRounded) {
            lastRounded = rounded;
            pctEl.textContent = rounded + '%';
            if (bigNumEl) bigNumEl.textContent = rounded;
        }
        barFill.style.width = pct + '%';

        if (t < 1) {
            requestAnimationFrame(tick);
        } else {
            pctEl.textContent = '100%';
            if (bigNumEl) bigNumEl.textContent = '100';
            barFill.style.width = '100%';
            setTimeout(() => {
                barFill.classList.remove('active');
                container.classList.add('fade-out');
                body.classList.remove('loading');
                setTimeout(() => {
                    container.style.display = 'none';
                }, 900);
            }, 400);
        }
    }

    requestAnimationFrame(tick);
});

window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const mobileBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
    if (!mobileMenu || !mobileBtn) return;
    mobileMenu.classList.remove('open');
    mobileBtn.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', 'false');
    // Restore hidden after transition ends so CSS display:none kicks in cleanly
    mobileMenu.addEventListener('transitionend', function handler() {
        if (!mobileMenu.classList.contains('open')) {
            mobileMenu.classList.add('hidden');
        }
        mobileMenu.removeEventListener('transitionend', handler);
    });
}

function openMobileMenu() {
    if (!mobileMenu || !mobileBtn) return;
    mobileMenu.classList.remove('hidden');
    // Small rAF so browser registers display change before transition starts
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            mobileMenu.classList.add('open');
            mobileBtn.classList.add('open');
            mobileBtn.setAttribute('aria-expanded', 'true');
        });
    });
}

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
    });
}

const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // If it's an anchor link, close menu first then scroll after transition
        if (href && href.startsWith('#')) {
            e.preventDefault();
            closeMobileMenu();
            setTimeout(() => {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 320); // matches transition duration
        } else {
            closeMobileMenu();
        }
    });
});

const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeToggleMobileMenu = document.getElementById('theme-toggle-mobile-menu');
const body = document.body;

const moonIcon = '<i class="fa-solid fa-moon"></i>';
const sunIcon = '<i class="fa-solid fa-sun"></i>';

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    updateThemeIcons('light');
} else {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    updateThemeIcons('dark');
}

function updateThemeIcons(mode) {
    const icon = mode === 'dark' ? moonIcon : sunIcon;
    if (themeToggleDesktop) themeToggleDesktop.innerHTML = icon;
    if (themeToggleMobile) themeToggleMobile.innerHTML = icon;
    if (themeToggleMobileMenu) themeToggleMobileMenu.innerHTML = icon;
}

function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcons('light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcons('dark');
    }
}

if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
if (themeToggleMobileMenu) themeToggleMobileMenu.addEventListener('click', toggleTheme);

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll(".scroll-animate");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach((el) => {
        observer.observe(el);
    });
});

const scrollTopBtn = document.getElementById('scroll-to-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const country = document.getElementById('country').value.trim();
        const message = document.getElementById('message').value.trim();
        const terms = document.getElementById('terms').checked;

        if (!firstName || !lastName || !email || !country || !message || !terms) {
            formMessage.textContent = 'Please fill in all fields and accept terms';
            formMessage.classList.remove('hidden', 'text-green-400');
            formMessage.classList.add('text-red-400');
            return;
        }

        if (!isValidEmail(email)) {
            formMessage.textContent = 'Please enter a valid email address';
            formMessage.classList.remove('hidden', 'text-green-400');
            formMessage.classList.add('text-red-400');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            formMessage.textContent = 'Thank you! Your inquiry has been sent.';
            formMessage.classList.remove('hidden', 'text-red-400');
            formMessage.classList.add('text-green-400');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Inquiry';
        }, 1500);
    });
}

const newsletterBtn = document.getElementById('newsletterBtn');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMessage = document.getElementById('newsletterMessage');

if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function() {
        const email = newsletterEmail.value.trim();

        if (!email || !isValidEmail(email)) {
            newsletterMessage.textContent = 'Please enter a valid email address';
            newsletterMessage.classList.remove('hidden', 'text-green-400');
            newsletterMessage.classList.add('text-red-400');
            return;
        }

        newsletterBtn.disabled = true;
        newsletterBtn.textContent = 'Subscribing...';

        setTimeout(() => {
            newsletterMessage.textContent = 'Thank you for subscribing!';
            newsletterMessage.classList.remove('hidden', 'text-red-400');
            newsletterMessage.classList.add('text-green-400');
            newsletterEmail.value = '';
            newsletterBtn.disabled = false;
            newsletterBtn.textContent = 'Subscribe';
        }, 1000);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip mobile-nav-link — handled separately with menu-close delay
    if (anchor.closest('#mobile-menu')) return;
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Lazy loading — native support + IntersectionObserver fallback for older browsers
(function() {
    const lazyImgs = Array.from(document.querySelectorAll('img[loading="lazy"]'));
    if (!lazyImgs.length) return;

    // Modern browsers support native lazy loading natively — nothing extra needed
    if ('loading' in HTMLImageElement.prototype) return;

    // Fallback: use IntersectionObserver for browsers without native support
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('lazy-loaded');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '200px 0px' });

        lazyImgs.forEach(img => {
            // Move src to data-src so we can control when it loads
            if (img.src && !img.dataset.src) {
                img.dataset.src = img.src;
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            }
            imgObserver.observe(img);
        });
    } else {
        // Last resort: load all images immediately
        lazyImgs.forEach(img => {
            if (img.dataset.src) img.src = img.dataset.src;
        });
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('all-projects');
    const showMoreContainer = document.getElementById('portfolio-button-container');
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-search');
    const noResultsMsg = document.getElementById('no-results-message');
    const searchTermDisplay = document.getElementById('search-term-display');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!grid) return;

    const ITEMS_PER_PAGE = 6;
    let currentFilter = 'all';
    let currentSearch = '';
    let showAll = false;

    const allCards = Array.from(grid.querySelectorAll('.project-card'));

    let showMoreBtn, showLessBtn;
    if (showMoreContainer) {
        showMoreContainer.innerHTML = '';

        showMoreBtn = document.createElement('button');
        showMoreBtn.id = 'show-more-btn';
        showMoreBtn.className = 'px-8 py-3 bg-gradient-to-r from-[#00bbff] to-[#0066ff] text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer';
        showMoreBtn.innerHTML = 'Show More <i class="fa-solid fa-arrow-down ml-2"></i>';

        showLessBtn = document.createElement('button');
        showLessBtn.id = 'show-less-btn';
        showLessBtn.className = 'px-8 py-3 bg-gradient-to-r from-[#00bbff] to-[#0066ff] text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer hidden';
        showLessBtn.innerHTML = 'Show Less <i class="fa-solid fa-arrow-up ml-2"></i>';

        showMoreContainer.appendChild(showMoreBtn);
        showMoreContainer.appendChild(showLessBtn);

        showMoreBtn.addEventListener('click', function() {
            showAll = true;
            renderCards();
        });

        showLessBtn.addEventListener('click', function() {
            showAll = false;
            renderCards();
            document.querySelector('#portfolio').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    function renderCards() {
        let matchCount = 0;
        let shown = 0;

        allCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const titleEl = card.querySelector('h3');
            const catEl = card.querySelector('p');
            const text = ((titleEl ? titleEl.textContent : '') + ' ' + (catEl ? catEl.textContent : '')).toLowerCase();

            const matchFilter = currentFilter === 'all' || category === currentFilter;
            const matchSearch = currentSearch === '' || text.includes(currentSearch);

            if (matchFilter && matchSearch) {
                matchCount++;
                const limitApplied = currentFilter === 'all';
                if (!limitApplied || showAll || shown < ITEMS_PER_PAGE) {
                    card.style.display = 'block';
                    shown++;
                    setTimeout(() => card.classList.add('animated'), 50);
                } else {
                    card.style.display = 'none';
                }
            } else {
                card.style.display = 'none';
            }
        });

        if (showMoreBtn && showLessBtn) {
            if (currentFilter !== 'all') {
                showMoreBtn.classList.add('hidden');
                showLessBtn.classList.add('hidden');
            } else {
                if (matchCount > ITEMS_PER_PAGE) {
                    if (showAll) {
                        showMoreBtn.classList.add('hidden');
                        showLessBtn.classList.remove('hidden');
                    } else {
                        showMoreBtn.classList.remove('hidden');
                        showLessBtn.classList.add('hidden');
                    }
                } else {
                    showMoreBtn.classList.add('hidden');
                    showLessBtn.classList.add('hidden');
                }
            }
        }

        if (noResultsMsg) {
            if (matchCount === 0 && currentSearch !== '') {
                noResultsMsg.classList.remove('hidden');
                if (searchTermDisplay) searchTermDisplay.textContent = currentSearch;
            } else {
                noResultsMsg.classList.add('hidden');
            }
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            showAll = false;
            renderCards();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value.trim().toLowerCase();
            showAll = false;
            renderCards();
            if (clearButton) {
                clearButton.classList.toggle('hidden', currentSearch === '');
            }
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            currentSearch = '';
            renderCards();
            clearButton.classList.add('hidden');
            searchInput.focus();
        });
    }

    renderCards();
});

(function() {
    const btn = document.getElementById('more-dropdown-btn');
    const menu = document.getElementById('more-dropdown-menu');
    const chevron = document.getElementById('more-chevron');
    const wrap = document.getElementById('more-dropdown-wrap');

    if (!btn || !menu) return;

    function openMenu() {
        menu.classList.remove('hidden');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => menu.classList.add('open'));
        });
        chevron.classList.add('rotated');
        btn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        menu.classList.remove('open');
        chevron.classList.remove('rotated');
        btn.setAttribute('aria-expanded', 'false');
        setTimeout(() => {
            if (!menu.classList.contains('open')) {
                menu.classList.add('hidden');
            }
        }, 250);
    }

    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    document.addEventListener('click', function(e) {
        if (!wrap.contains(e.target)) closeMenu();
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.ts-tab-btn');
    const tsCards = document.querySelectorAll('.ts-card');
    if (!tabBtns.length || !tsCards.length) return;

    const tsObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('animated');
        });
    }, {
        threshold: 0.15
    });
    tsCards.forEach(card => tsObserver.observe(card));

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-ts');
            let i = 0;
            tsCards.forEach(card => {
                const match = filter === 'all' || card.getAttribute('data-ts') === filter;
                if (match) {
                    card.classList.remove('ts-hidden');
                    const delay = i++ * 50;
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(16px) scale(0.95)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                        card.classList.remove('animated');
                        setTimeout(() => card.classList.add('animated'), 50);
                    }, delay);
                } else {
                    card.classList.add('ts-hidden');
                    card.style.opacity = '';
                    card.style.transform = '';
                    card.style.transition = '';
                }
            });
        });
    });
});
// ===== TESTIMONIAL CAROUSEL =====
(function() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    const total = cards.length;
    let current = 0;
    let autoPlayTimer;

    function getVisible() {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }

    function maxIndex() {
        return Math.max(0, total - getVisible());
    }

    function getCardWidth() {
        // Width of one card including its right margin, as % of track container
        const wrapper = track.parentElement;
        const wrapperW = wrapper.offsetWidth;
        const vis = getVisible();
        const gap = vis > 1 ? 24 : 20;
        const totalGap = gap * (vis - 1);
        return (wrapperW - totalGap) / vis + gap;
    }

    function buildDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const n = maxIndex() + 1;
        for (let i = 0; i <= maxIndex(); i++) {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot' + (i === current ? ' active' : '');
            dot.setAttribute('aria-label', 'Slide ' + (i + 1));
            dot.addEventListener('click', () => { goTo(i); startAutoPlay(); });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.querySelectorAll('.testimonial-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    function updateBtns() {
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= maxIndex();
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, maxIndex()));
        const offset = getCardWidth() * current;
        track.style.transform = `translateX(-${offset}px)`;
        updateDots();
        updateBtns();
    }

    function next() {
        goTo(current >= maxIndex() ? 0 : current + 1);
    }

    function prev() {
        goTo(current <= 0 ? maxIndex() : current - 1);
    }

    function startAutoPlay() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(next, 4500);
    }

    prevBtn.addEventListener('click', () => { prev(); startAutoPlay(); });
    nextBtn.addEventListener('click', () => { next(); startAutoPlay(); });

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    track.addEventListener('mouseleave', startAutoPlay);

    // Touch swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        startAutoPlay();
    }, { passive: true });

    // Recalc on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            current = Math.min(current, maxIndex());
            buildDots();
            goTo(current);
        }, 150);
    });

    buildDots();

    // Wait for layout to fully render before calculating card width
    // so goTo(0) always starts from the first slide correctly
    if (document.readyState === 'complete') {
        goTo(0);
        startAutoPlay();
    } else {
        window.addEventListener('load', function() {
            current = 0;
            goTo(0);
            startAutoPlay();
        });
    }
})();

// ===== NAVBAR ACTIVE ON SCROLL =====
(function() {
    const sections = ['hero', 'about', 'techstack', 'services', 'portfolio', 'testimonials', 'contact', 'documentation'];

    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[href^="#"]');

    function setActive(id) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + id);
        });
        mobileNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + id);
        });
        // Also highlight More dropdown items
        document.querySelectorAll('.more-dropdown-item').forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + id);
        });
    }

    function onScroll() {
        const scrollY = window.scrollY + 120;
        let current = sections[0];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= scrollY) current = id;
        });
        setActive(current);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();