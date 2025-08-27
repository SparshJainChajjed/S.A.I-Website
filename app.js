// S.A.I Website JavaScript - Simplified and Fixed

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing S.A.I website...');
    
    // Navigation elements
    const nav = document.getElementById('navigation');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            console.log('Menu toggled');
        });
    }
    
    // Smooth scrolling for navigation links - Simplified approach
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav link clicked:', this.href);
            
            // Get the target section ID from href
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu) navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                    
                    // Calculate scroll position accounting for fixed header
                    const headerHeight = nav ? nav.offsetHeight : 70;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerHeight - 10;
                    
                    console.log('Scrolling to:', targetId, 'Position:', offsetPosition);
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    console.error('Target element not found:', targetId);
                }
            }
        });
    });
    
    // Scroll-to-top button - Fixed implementation
    function createScrollToTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.setAttribute('aria-label', 'Scroll to top');
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: #21828D;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;
        
        // Add click handler
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Scroll to top clicked');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.backgroundColor = '#1D747C';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '#21828D';
        });
        
        document.body.appendChild(button);
        return button;
    }
    
    const scrollButton = createScrollToTopButton();
    
    // Navigation background and scroll button visibility
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Update navigation background
        if (nav) {
            if (scrollY > 50) {
                nav.style.backgroundColor = 'rgba(19, 52, 59, 0.98)';
                nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.backgroundColor = 'rgba(19, 52, 59, 0.95)';
                nav.style.boxShadow = 'none';
            }
        }
        
        // Show/hide scroll to top button
        if (scrollButton) {
            if (scrollY > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        }
        
        // Update active navigation link
        updateActiveNavLink();
    }
    
    // Active navigation highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        let currentSection = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Update nav links
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Card animations on scroll
    function animateCards() {
        const cards = document.querySelectorAll('.about-card, .workflow-step, .feature-card, .tech-item, .challenge-card, .accomplishment-card, .future-card');
        
        cards.forEach(function(card) {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !card.classList.contains('animated')) {
                card.classList.add('animated');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize card styles
    function initializeCards() {
        const cards = document.querySelectorAll('.about-card, .workflow-step, .feature-card, .tech-item, .challenge-card, .accomplishment-card, .future-card');
        
        cards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    
    // Enhanced scroll handler with animations
    let animationTimeout;
    window.addEventListener('scroll', function() {
        handleScroll();
        
        if (animationTimeout) {
            clearTimeout(animationTimeout);
        }
        animationTimeout = setTimeout(animateCards, 50);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle && nav) {
            if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize everything
    initializeCards();
    handleScroll();
    animateCards();
    
    console.log('S.A.I website initialized successfully!');
    console.log('Found navigation links:', navLinks.length);
    console.log('Scroll button created:', !!scrollButton);
});
