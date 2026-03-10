// Loading Animation
window.addEventListener('load', function() {
    const loadingContainer = document.getElementById('loadingContainer');
    const body = document.body;
    
    let progress = 0;
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingProgress = document.getElementById('loadingProgress');
    
    const interval = setInterval(function() {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingPercentage.textContent = Math.round(progress) + '%';
        loadingProgress.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(interval);
            
            body.classList.remove('loading');
            
            setTimeout(() => {
                loadingContainer.classList.add('fade-out');
                
                setTimeout(() => {
                    loadingContainer.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 100);
});

// Navbar Scroll Effect
window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
});

// Mobile Menu
const mobileBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        mobileBtn.setAttribute('aria-expanded', isHidden);
    });
}

const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
    });
});

// Theme Toggle
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

document.addEventListener("DOMContentLoaded", function () {
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

// Scroll to Top
const scrollTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form Validation
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

        // Simulate form submission
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

// Newsletter
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// ============================================
// PORTFOLIO: Show More/Less + Filter + Search
// ============================================
document.addEventListener('DOMContentLoaded', function () {
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

    // Create Show More / Show Less buttons
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

        showMoreBtn.addEventListener('click', function () {
            showAll = true;
            renderCards();
        });

        showLessBtn.addEventListener('click', function () {
            showAll = false;
            renderCards();
            document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                // Jika filter bukan 'all', tampilkan semua tanpa batasan
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

        // Kelola tombol Show More / Show Less
        if (showMoreBtn && showLessBtn) {
            if (currentFilter !== 'all') {
                // Filter spesifik: sembunyikan kedua tombol
                showMoreBtn.classList.add('hidden');
                showLessBtn.classList.add('hidden');
            } else {
                // Filter 'all': tampilkan tombol sesuai kondisi
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

        // Pesan tidak ada hasil
        if (noResultsMsg) {
            if (matchCount === 0 && currentSearch !== '') {
                noResultsMsg.classList.remove('hidden');
                if (searchTermDisplay) searchTermDisplay.textContent = currentSearch;
            } else {
                noResultsMsg.classList.add('hidden');
            }
        }
    }

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            showAll = false;
            renderCards();
        });
    });

    // Search
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            currentSearch = this.value.trim().toLowerCase();
            showAll = false;
            renderCards();
            if (clearButton) {
                clearButton.classList.toggle('hidden', currentSearch === '');
            }
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', function () {
            searchInput.value = '';
            currentSearch = '';
            renderCards();
            clearButton.classList.add('hidden');
            searchInput.focus();
        });
    }

    // Initial render
    renderCards();
});
// ============================================
// MORE DROPDOWN - Navbar
// ============================================
(function () {
    const btn     = document.getElementById('more-dropdown-btn');
    const menu    = document.getElementById('more-dropdown-menu');
    const chevron = document.getElementById('more-chevron');
    const wrap    = document.getElementById('more-dropdown-wrap');

    if (!btn || !menu) return;

    function openMenu() {
        menu.classList.remove('hidden');
        // Trigger reflow so transition plays
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
        // Hide after transition
        setTimeout(() => {
            if (!menu.classList.contains('open')) {
                menu.classList.add('hidden');
            }
        }, 250);
    }

    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
        if (!wrap.contains(e.target)) closeMenu();
    });

    // Close when a link inside is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });
})();
// ============================================
// TECH STACK - Tab Filter + Scroll Animation
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('.ts-tab-btn');
    const tsCards = document.querySelectorAll('.ts-card');
    if (!tabBtns.length || !tsCards.length) return;

    const tsObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); });
    }, { threshold: 0.15 });
    tsCards.forEach(card => tsObserver.observe(card));

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
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