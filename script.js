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

// Show More / Show Less functionality for Portfolio
document.addEventListener('DOMContentLoaded', function() {
    const hiddenProjects = document.getElementById('hidden-projects');
    const showMoreContainer = document.getElementById('portfolio-button-container');
    
    if (!hiddenProjects || !showMoreContainer) return;
    
    // Clear container
    showMoreContainer.innerHTML = '';
    
    // Create Show More button
    const showMoreBtn = document.createElement('button');
    showMoreBtn.className = 'px-8 py-3 bg-gradient-to-r from-[#00bbff] to-[#0066ff] text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer';
    showMoreBtn.innerHTML = 'Show More <i class="fa-solid fa-arrow-down ml-2" aria-hidden="true"></i>';
    
    // Create Show Less button
    const showLessBtn = document.createElement('button');
    showLessBtn.className = 'px-8 py-3 bg-gradient-to-r from-[#00bbff] to-[#0066ff] text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer hidden';
    showLessBtn.innerHTML = 'Show Less <i class="fa-solid fa-arrow-up ml-2" aria-hidden="true"></i>';
    
    // Add buttons to container
    showMoreContainer.appendChild(showMoreBtn);
    showMoreContainer.appendChild(showLessBtn);
    
    // Toggle functionality
    showMoreBtn.addEventListener('click', function() {
        hiddenProjects.classList.remove('hidden');
        showMoreBtn.classList.add('hidden');
        showLessBtn.classList.remove('hidden');
        
        // Trigger scroll animation for new elements
        setTimeout(() => {
            const newElements = hiddenProjects.querySelectorAll('.scroll-animate');
            newElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight - 100) {
                    el.classList.add('animated');
                }
            });
        }, 100);
    });
    
    showLessBtn.addEventListener('click', function() {
        hiddenProjects.classList.add('hidden');
        showLessBtn.classList.add('hidden');
        showMoreBtn.classList.remove('hidden');
        
        // Scroll back to portfolio section smoothly
        document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    // Make sure the scroll animation works for new elements
    window.addEventListener('scroll', function checkNewElements() {
        if (!hiddenProjects.classList.contains('hidden')) {
            const newElements = hiddenProjects.querySelectorAll('.scroll-animate:not(.animated)');
            newElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight - 100) {
                    el.classList.add('animated');
                }
            });
        }
    });
});

// ============================================
// FUNGSI PENCARIAN PORTFOLIO - VERSI FIX DENGAN PESAN TIDAK ADA HASIL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-search');
    const resultCount = document.getElementById('search-result-count');
    const noResultsMsg = document.getElementById('no-results-message');
    const searchTermDisplay = document.getElementById('search-term-display');
    
    // Gabungkan semua project dari main-projects dan hidden-projects
    const mainProjects = document.getElementById('main-projects');
    const hiddenProjects = document.getElementById('hidden-projects');
    
    if (!searchInput || !mainProjects) return;
    
    // Fungsi untuk mendapatkan semua project card
    function getAllProjectCards() {
        const mainCards = mainProjects ? Array.from(mainProjects.querySelectorAll('.group')) : [];
        const hiddenCards = hiddenProjects ? Array.from(hiddenProjects.querySelectorAll('.group')) : [];
        return [...mainCards, ...hiddenCards];
    }
    
    // Fungsi untuk mendapatkan teks dari project (judul + kategori)
    function getProjectText(projectCard) {
        const title = projectCard.querySelector('h3')?.textContent || '';
        const category = projectCard.querySelector('.text-white\\/60')?.textContent || '';
        return (title + ' ' + category).toLowerCase();
    }
    
    // Fungsi untuk melakukan pencarian
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const allProjects = getAllProjectCards();
        
        if (searchTerm === '') {
            // Tampilkan semua project
            allProjects.forEach(project => {
                project.style.display = 'block';
            });
            
            if (resultCount) {
                resultCount.textContent = `Menampilkan semua project (${allProjects.length} project)`;
            }
            
            if (clearButton) clearButton.classList.add('hidden');
            if (noResultsMsg) noResultsMsg.classList.add('hidden');
            
        } else {
            // Filter berdasarkan search term
            let visibleCount = 0;
            
            allProjects.forEach(project => {
                const text = getProjectText(project);
                if (text.includes(searchTerm)) {
                    project.style.display = 'block';
                    visibleCount++;
                } else {
                    project.style.display = 'none';
                }
            });
            
            if (resultCount) {
                resultCount.textContent = `Menampilkan ${visibleCount} project dari ${allProjects.length} project`;
            }
            
            // TAMPILKAN PESAN JIKA TIDAK ADA HASIL
            if (visibleCount === 0) {
                if (noResultsMsg) {
                    noResultsMsg.classList.remove('hidden');
                    if (searchTermDisplay) {
                        searchTermDisplay.textContent = searchTerm;
                    }
                }
            } else {
                if (noResultsMsg) {
                    noResultsMsg.classList.add('hidden');
                }
            }
            
            if (clearButton) clearButton.classList.remove('hidden');
        }
    }
    
    // Event listener untuk input search
    searchInput.addEventListener('input', performSearch);
    
    // Clear search
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            performSearch();
            searchInput.focus();
        });
    }
    
    // Update result count saat show more/less
    function updateSearchAfterToggle() {
        if (searchInput.value.trim() !== '') {
            performSearch();
        }
    }
    
    // Observasi perubahan pada hidden projects (saat show more/less)
    if (hiddenProjects) {
        const observer = new MutationObserver(updateSearchAfterToggle);
        observer.observe(hiddenProjects, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
    }
    
    // Tambahkan event listener untuk show more/less buttons
    const showMoreBtn = document.querySelector('#portfolio-button-container button:first-child');
    const showLessBtn = document.querySelector('#portfolio-button-container button:last-child');
    
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            setTimeout(updateSearchAfterToggle, 100);
        });
    }
    
    if (showLessBtn) {
        showLessBtn.addEventListener('click', function() {
            setTimeout(updateSearchAfterToggle, 100);
        });
    }
});