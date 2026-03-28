// ===== LOADING SCREEN =====
window.addEventListener('load', function() {
    const container = document.getElementById('loadingContainer');
    const pctEl     = document.getElementById('loaderPct');
    const bigNumEl  = document.getElementById('loaderBigNum');
    const barFill   = document.getElementById('loaderBarFill');
    if (!container || !pctEl || !barFill) return;

    barFill.classList.add('active');
    const duration = 2400, startTime = performance.now();
    let lastRounded = -1;

    function easeOut(t) { return 1 - Math.pow(1 - t, 2.8); }

    function tick(now) {
        const t      = Math.min((now - startTime) / duration, 1);
        const eased  = easeOut(t);
        const jitter = t < 0.9 ? (Math.random() * 2 - 1) * 0.35 : 0;
        const pct    = Math.min(eased * 100 + jitter, t >= 1 ? 100 : 99);
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
                document.body.classList.remove('loading');
                setTimeout(() => container.style.display = 'none', 900);
            }, 400);
        }
    }
    requestAnimationFrame(tick);
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===== MOBILE MENU =====
(function() {
    const btn  = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    function open() {
        menu.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        // swap icon
        const icon = btn.querySelector('i');
        if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-xmark'); }
    }

    function close() {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        const icon = btn.querySelector('i');
        if (icon) { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars'); }
    }

    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.contains('open') ? close() : open();
    });

    // Close when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                close();
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                }, 350);
            } else {
                close();
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !btn.contains(e.target)) close();
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') close();
    });
})();

// ===== THEME TOGGLE =====
(function() {
    const toggles = [
        document.getElementById('theme-toggle-desktop'),
        document.getElementById('theme-toggle-mobile'),
        document.getElementById('theme-toggle-mobile-menu')
    ];
    const moonHTML = '<i class="fa-solid fa-moon"></i>';
    const sunHTML  = '<i class="fa-solid fa-sun"></i>';

    function setTheme(mode) {
        if (mode === 'light') {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        }
        localStorage.setItem('theme', mode);
        toggles.forEach(t => { if (t) t.innerHTML = mode === 'dark' ? moonHTML : sunHTML; });
    }

    // Init
    setTheme(localStorage.getItem('theme') === 'light' ? 'light' : 'dark');

    toggles.forEach(t => {
        if (!t) return;
        t.addEventListener('click', () => {
            setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
        });
    });
})();

// ===== SCROLL ANIMATIONS =====
(function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
})();

// ===== SCROLL TO TOP =====
(function() {
    const btn = document.getElementById('scroll-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        const show = window.scrollY > 500;
        btn.style.opacity     = show ? '1' : '0';
        btn.style.visibility  = show ? 'visible' : 'hidden';
        btn.style.pointerEvents = show ? 'auto' : 'none';
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ===== SMOOTH SCROLL (desktop nav links) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.closest('#mobile-menu')) return;
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== MORE DROPDOWN =====
(function() {
    const btn     = document.getElementById('more-dropdown-btn');
    const menu    = document.getElementById('more-dropdown-menu');
    const chevron = document.getElementById('more-chevron');
    const wrap    = document.getElementById('more-dropdown-wrap');
    if (!btn || !menu) return;

    function open() {
        menu.classList.remove('hidden');
        requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('open')));
        if (chevron) chevron.classList.add('rotated');
        btn.setAttribute('aria-expanded', 'true');
    }

    function close() {
        menu.classList.remove('open');
        if (chevron) chevron.classList.remove('rotated');
        btn.setAttribute('aria-expanded', 'false');
        setTimeout(() => { if (!menu.classList.contains('open')) menu.classList.add('hidden'); }, 260);
    }

    btn.addEventListener('click', e => { e.stopPropagation(); menu.classList.contains('open') ? close() : open(); });
    document.addEventListener('click', e => { if (wrap && !wrap.contains(e.target)) close(); });
    menu.querySelectorAll('a').forEach(l => l.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

// ===== CONTACT FORM =====
(function() {
    const form    = document.getElementById('contactForm');
    const msg     = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;

    function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const first   = document.getElementById('firstName')?.value.trim();
        const last    = document.getElementById('lastName')?.value.trim();
        const email   = document.getElementById('email')?.value.trim();
        const country = document.getElementById('country')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        const terms   = document.getElementById('terms')?.checked;

        if (!first || !last || !email || !country || !message || !terms) {
            msg.textContent = 'Please fill in all fields and accept terms';
            msg.className = 'text-center text-sm text-red-400';
            return;
        }
        if (!isEmail(email)) {
            msg.textContent = 'Please enter a valid email address';
            msg.className = 'text-center text-sm text-red-400';
            return;
        }
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        setTimeout(() => {
            msg.textContent = 'Thank you! Your inquiry has been sent.';
            msg.className = 'text-center text-sm text-green-400';
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Inquiry';
        }, 1500);
    });
})();

// ===== NEWSLETTER =====
(function() {
    const btn   = document.getElementById('newsletterBtn');
    const input = document.getElementById('newsletterEmail');
    const msg   = document.getElementById('newsletterMessage');
    if (!btn || !input) return;

    function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    btn.addEventListener('click', function() {
        const email = input.value.trim();
        if (!email || !isEmail(email)) {
            msg.textContent = 'Please enter a valid email address';
            msg.className = 'text-sm mt-2 text-red-400';
            return;
        }
        btn.disabled = true;
        btn.textContent = 'Subscribing...';
        setTimeout(() => {
            msg.textContent = 'Thank you for subscribing!';
            msg.className = 'text-sm mt-2 text-green-400';
            input.value = '';
            btn.disabled = false;
            btn.textContent = 'Subscribe';
        }, 1000);
    });
})();

// ===== PORTFOLIO FILTER & SEARCH =====
document.addEventListener('DOMContentLoaded', function() {
    const grid            = document.getElementById('all-projects');
    const showMoreCont    = document.getElementById('portfolio-button-container');
    const searchInput     = document.getElementById('search-input');
    const clearBtn        = document.getElementById('clear-search');
    const noResultsMsg    = document.getElementById('no-results-message');
    const searchTermEl    = document.getElementById('search-term-display');
    const filterBtns      = document.querySelectorAll('.filter-btn');
    if (!grid) return;

    const LIMIT = 6;
    let filter = 'all', search = '', showAll = false;
    const allCards = Array.from(grid.querySelectorAll('.project-card'));

    let showMoreBtn, showLessBtn;
    if (showMoreCont) {
        showMoreCont.innerHTML = '';
        showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'px-8 py-3 bg-gradient-to-r from-[#00bbff] to-[#0066ff] text-white rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer';
        showMoreBtn.innerHTML = 'Show More <i class="fa-solid fa-arrow-down ml-2"></i>';

        showLessBtn = document.createElement('button');
        showLessBtn.className = 'px-8 py-3 bg-gradient-to-r from-[#00bbff] to-[#0066ff] text-white rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer hidden';
        showLessBtn.innerHTML = 'Show Less <i class="fa-solid fa-arrow-up ml-2"></i>';

        showMoreCont.appendChild(showMoreBtn);
        showMoreCont.appendChild(showLessBtn);

        showMoreBtn.addEventListener('click', () => { showAll = true; render(); });
        showLessBtn.addEventListener('click', () => {
            showAll = false; render();
            document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    function render() {
        let count = 0, shown = 0;
        allCards.forEach(card => {
            const cat  = card.getAttribute('data-category');
            const text = card.textContent.toLowerCase();
            const ok   = (filter === 'all' || cat === filter) && (search === '' || text.includes(search));
            if (ok) {
                count++;
                const limited = filter === 'all';
                if (!limited || showAll || shown < LIMIT) {
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
            if (filter !== 'all') { showMoreBtn.classList.add('hidden'); showLessBtn.classList.add('hidden'); }
            else if (count > LIMIT) {
                showMoreBtn.classList.toggle('hidden', showAll);
                showLessBtn.classList.toggle('hidden', !showAll);
            } else { showMoreBtn.classList.add('hidden'); showLessBtn.classList.add('hidden'); }
        }

        if (noResultsMsg) {
            noResultsMsg.classList.toggle('hidden', !(count === 0 && search !== ''));
            if (searchTermEl) searchTermEl.textContent = search;
        }
    }

    filterBtns.forEach(btn => btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filter = this.getAttribute('data-filter');
        showAll = false;
        render();
    }));

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            search = this.value.trim().toLowerCase();
            showAll = false;
            render();
            if (clearBtn) clearBtn.classList.toggle('hidden', search === '');
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = ''; search = '';
            render(); clearBtn.classList.add('hidden');
            searchInput.focus();
        });
    }

    render();
});

// ===== TECH STACK TABS =====
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.ts-tab-btn');
    const tsCards = document.querySelectorAll('.ts-card');
    if (!tabBtns.length || !tsCards.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); });
    }, { threshold: 0.15 });
    tsCards.forEach(c => obs.observe(c));

    tabBtns.forEach(btn => btn.addEventListener('click', function() {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const f = this.getAttribute('data-ts');
        let i = 0;
        tsCards.forEach(card => {
            const match = f === 'all' || card.getAttribute('data-ts') === f;
            if (match) {
                card.classList.remove('ts-hidden');
                const delay = i++ * 50;
                card.style.opacity = '0'; card.style.transform = 'translateY(16px) scale(0.95)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                    card.style.opacity = '1'; card.style.transform = 'translateY(0) scale(1)';
                    card.classList.remove('animated');
                    setTimeout(() => card.classList.add('animated'), 50);
                }, delay);
            } else {
                card.classList.add('ts-hidden');
                card.style.opacity = ''; card.style.transform = ''; card.style.transition = '';
            }
        });
    }));
});

// ===== TESTIMONIAL CAROUSEL =====
(function() {
    const track     = document.getElementById('testimonialTrack');
    const prevBtn   = document.getElementById('testimonialPrev');
    const nextBtn   = document.getElementById('testimonialNext');
    const dotsCont  = document.getElementById('testimonialDots');
    if (!track || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    let current = 0, timer;

    function visible() { return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3; }
    function max()     { return Math.max(0, cards.length - visible()); }

    function cardW() {
        const w = track.parentElement.offsetWidth;
        const v = visible(), gap = v > 1 ? 24 : 20;
        return (w - gap * (v - 1)) / v + gap;
    }

    function buildDots() {
        if (!dotsCont) return;
        dotsCont.innerHTML = '';
        for (let i = 0; i <= max(); i++) {
            const d = document.createElement('button');
            d.className = 'testimonial-dot' + (i === current ? ' active' : '');
            d.setAttribute('aria-label', 'Slide ' + (i + 1));
            d.addEventListener('click', () => { goTo(i); startAuto(); });
            dotsCont.appendChild(d);
        }
    }

    function updateDots() {
        dotsCont?.querySelectorAll('.testimonial-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goTo(i) {
        current = Math.max(0, Math.min(i, max()));
        track.style.transform = `translateX(-${cardW() * current}px)`;
        updateDots();
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= max();
    }

    function next() { goTo(current >= max() ? 0 : current + 1); }
    function prev() { goTo(current <= 0 ? max() : current - 1); }
    function startAuto() { clearInterval(timer); timer = setInterval(next, 4500); }

    prevBtn.addEventListener('click', () => { prev(); startAuto(); });
    nextBtn.addEventListener('click', () => { next(); startAuto(); });
    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', startAuto);

    let tx = 0;
    track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const d = tx - e.changedTouches[0].clientX;
        if (Math.abs(d) > 50) d > 0 ? next() : prev();
        startAuto();
    }, { passive: true });

    let resizeT;
    window.addEventListener('resize', () => {
        clearTimeout(resizeT);
        resizeT = setTimeout(() => { current = Math.min(current, max()); buildDots(); goTo(current); }, 150);
    });

    buildDots();
    if (document.readyState === 'complete') { goTo(0); startAuto(); }
    else window.addEventListener('load', () => { goTo(0); startAuto(); });
})();

// ===== NAVBAR ACTIVE ON SCROLL =====
(function() {
    const sections = ['hero','about','techstack','services','portfolio','testimonials','contact','documentation'];
    const moreSections = ['techstack','services','documentation','testimonials'];
    const moreBtn = document.getElementById('more-dropdown-btn');

    function setActive(id) {
        document.querySelectorAll('.nav-link[href^="#"]').forEach(l =>
            l.classList.toggle('active', l.getAttribute('href') === '#' + id));
        document.querySelectorAll('.mobile-nav-link[href^="#"]').forEach(l =>
            l.classList.toggle('active', l.getAttribute('href') === '#' + id));
        document.querySelectorAll('.more-dropdown-item').forEach(l =>
            l.classList.toggle('active', l.getAttribute('href') === '#' + id));
        if (moreBtn) moreBtn.classList.toggle('active', moreSections.includes(id));
    }

    function onScroll() {
        const scrollY = window.scrollY + 100;
        let cur = sections[0];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= scrollY) cur = id;
        });
        setActive(cur);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ===== LAZY IMAGE FALLBACK =====
(function() {
    if ('loading' in HTMLImageElement.prototype) return;
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    if (!imgs.length) return;
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const img = e.target;
                    if (img.dataset.src) img.src = img.dataset.src;
                    o.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });
        imgs.forEach(img => {
            if (img.src) { img.dataset.src = img.src; img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; }
            obs.observe(img);
        });
    }
})();