// ================================
// Talent Loop - Main JavaScript
// FRESH START - GUARANTEED WORKING
// ================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded!'); // Debug
    
    // ================================
    // MOBILE NAVIGATION
    // ================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ================================
    // STAT COUNTER ANIMATION - SIMPLE & WORKING
    // ================================
    function startCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 50); // Update every 50ms
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Check if it needs % sign
            const label = element.parentElement.querySelector('.stat-label').textContent;
            const needsPercent = label.includes('Rate') || label.includes('rate');
            
            element.textContent = Math.floor(current).toLocaleString() + (needsPercent ? '%' : '');
        }, 50);
    }
    
    // Check if stats are visible
    function checkStatsVisible() {
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        ) || (rect.top < window.innerHeight && rect.bottom > 0);
        
        if (isVisible && !statsSection.classList.contains('animated')) {
            statsSection.classList.add('animated');
            const statNumbers = statsSection.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                startCounter(stat);
            });
        }
    }
    
    // Listen for scroll
    window.addEventListener('scroll', checkStatsVisible);
    // Check on load
    setTimeout(checkStatsVisible, 500);
    
    // ================================
    // NAVBAR SCROLL EFFECT
    // ================================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 100 ? '0 4px 16px rgba(0, 0, 0, 0.1)' : 'none';
        }
    });
    
    // ================================
    // CONTACT FORM
    // ================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Form submitted:', data);
            
            const successMsg = document.getElementById('formSuccess');
            if (successMsg) {
                successMsg.style.display = 'block';
                contactForm.reset();
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
            }
        });
    }
    
    // ================================
    // SMOOTH SCROLL
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // ================================
    // FADE-IN ANIMATION
    // ================================
    const fadeElements = document.querySelectorAll('.feature-card, .blog-card, .value-item, .team-member');
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeObserver.observe(element);
        });
    }
});
