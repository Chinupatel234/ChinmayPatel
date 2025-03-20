// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add JS class to HTML element for visibility control
    document.documentElement.classList.add('js');

    // Remove js-hidden class after a short delay
    setTimeout(() => {
        document.querySelectorAll('.js-hidden').forEach(el => {
            el.classList.remove('js-hidden');
        });
    }, 500);

    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out',
            delay: 200,
            disable: 'mobile'
        });
    }

    // Initialize Typed.js
    initTyped();

    // Page Loader
    initPageLoader();

    // Theme Toggling
    initThemeToggle();

    // Mobile Menu
    initMobileMenu();

    // Active Navigation Link
    initActiveNavLink();

    // Back to Top Button
    initBackToTop();

    // Portfolio Filter
    initPortfolioFilter();

    // Tab System
    initTabs();

    // Stats Counter Animation
    initStatsCounter();

    // Form Validation and Submission
    initContactForm();

    // Smooth Scrolling for Anchor Links
    initSmoothScrolling();

    // Initialize Modals
    initModals();

    // Add Header Shadow on Scroll
    initHeaderShadow();
});

// Typed.js Animation
function initTyped() {
    const typedElement = document.getElementById('typed');

    if (typedElement && typeof Typed !== 'undefined') {
        const typed = new Typed('#typed', {
            stringsElement: '#typed-strings',
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }
}

// Page Loader Function
function initPageLoader() {
    const progressBar = document.querySelector('.page-transition-progress');
    const pageTransition = document.querySelector('.page-transition');

    if (!progressBar || !pageTransition) return;

    let width = 0;
    const interval = setInterval(() => {
        width += 5;
        progressBar.style.width = width + '%';
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                pageTransition.style.opacity = 0;
                setTimeout(() => {
                    pageTransition.style.display = 'none';
                }, 700);
            }, 500);
        }
    }, 50);
}

// Theme Toggle Function
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');

    if (!themeToggle) return;

    // Check for saved theme preference or system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');

    // Apply stored theme on load or default to system preference
    if (storedTheme === 'light' || (!storedTheme && !prefersDarkScheme.matches)) {
        document.documentElement.classList.add('light-mode');
        document.body.classList.add('light-mode');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-mode');
        document.body.classList.toggle('light-mode');

        // Store theme preference
        const currentTheme = document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });

    // Listen for system preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.remove('light-mode');
                document.body.classList.remove('light-mode');
            } else {
                document.documentElement.classList.add('light-mode');
                document.body.classList.add('light-mode');
            }
        }
    });
}

// Mobile Menu Function
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu nav a');

    if (!menuBtn || !closeBtn || !mobileMenu || !overlay) return;

    // Toggle menu function
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');

        // Toggle body scroll
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Open menu
    menuBtn.addEventListener('click', toggleMenu);

    // Close menu
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Active Navigation Link Function
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    // Update active link on scroll
    function updateActiveLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        // Set active class
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveLink);

    // Initial call to set active link on page load
    window.addEventListener('load', updateActiveLink);
}

// Back to Top Button Function
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (!backToTopBtn) return;

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Portfolio Filter Function
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length === 0 || portfolioItems.length === 0) return;

    // Filter items by category
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');

            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to current button
            btn.classList.add('active');

            // Filter items
            portfolioItems.forEach(item => {
                // Get item category
                const itemCategory = item.getAttribute('data-category');

                // Show/hide items based on filter
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = '';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize isotope if available (optional enhancement)
    if (typeof Isotope !== 'undefined') {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            const iso = new Isotope(portfolioGrid, {
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filterValue = btn.getAttribute('data-filter');
                    iso.arrange({
                        filter: filterValue === 'all' ? '*' : `[data-category="${filterValue}"]`
                    });
                });
            });
        }
    }
}

// Tab System Function
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length === 0 || tabPanes.length === 0) return;

    // Switch tabs on button click
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Get tab ID
            const tabId = btn.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to current button and pane
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Stats Counter Animation Function
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statNumbers.length === 0) return;

    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Animate counter on scroll
    function animateCounters() {
        statNumbers.forEach(stat => {
            if (isInViewport(stat) && !stat.classList.contains('counted')) {
                stat.classList.add('counted');

                const target = parseInt(stat.getAttribute('data-count'));
                let count = 0;
                const increment = target / 40; // Increase number in 40 steps
                const duration = 2000; // 2 seconds
                const stepTime = duration / 40;

                // Update counter
                const counter = setInterval(() => {
                    count += increment;

                    // Round the number and update the display
                    stat.textContent = Math.round(count);

                    // Stop when target is reached
                    if (count >= target) {
                        stat.textContent = target; // Ensure exact target
                        clearInterval(counter);
                    }
                }, stepTime);
            }
        });
    }

    // Check on scroll
    window.addEventListener('scroll', animateCounters);

    // Initial check
    animateCounters();

    // Also check when AOS animations complete
    document.addEventListener('aos:in', animateCounters);
}

// Form Validation and Submission Function
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Basic validation
        let isValid = true;

        // Validate name
        if (!nameInput.value.trim()) {
            isValid = false;
            showError(nameInput, 'Please enter your name');
        } else {
            removeError(nameInput);
        }

        // Validate email
        if (!emailInput.value.trim()) {
            isValid = false;
            showError(emailInput, 'Please enter your email');
        } else if (!isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Please enter a valid email');
        } else {
            removeError(emailInput);
        }

        // Validate subject
        if (!subjectInput.value.trim()) {
            isValid = false;
            showError(subjectInput, 'Please enter a subject');
        } else {
            removeError(subjectInput);
        }

        // Validate message
        if (!messageInput.value.trim()) {
            isValid = false;
            showError(messageInput, 'Please enter your message');
        } else {
            removeError(messageInput);
        }

        // If form is valid, submit it
        if (isValid) {
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            showModal('success-modal');

            // Reset form
            contactForm.reset();

            // Log form data (remove in production)
            console.log({
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            });

            // Example of form submission with fetch API (commented out)
            /*
            fetch('your-form-handler-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    email: emailInput.value,
                    subject: subjectInput.value,
                    message: messageInput.value
                })
            })
            .then(response => response.json())
            .then(data => {
                showModal('success-modal');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                // Show error message
            });
            */
        }
    });

    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }

        errorElement.textContent = message;
        input.style.borderColor = 'var(--accent)';
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
            formGroup.removeChild(errorElement);
        }

        input.style.borderColor = '';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Smooth Scrolling Function
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not(.tab-btn)');

    if (scrollLinks.length === 0) return;

    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default if not a tab button
            if (!link.classList.contains('tab-btn')) {
                e.preventDefault();

                const targetId = link.getAttribute('href');

                // Check if href is not just "#"
                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                        const offsetPosition = targetPosition - headerHeight;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
}

// Modal Functions
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');

    if (modals.length === 0) return;

    // Close modal when clicking close button
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            hideModal(modal);
        });
    });

    // Close modal when clicking outside the modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                hideModal(activeModal);
            }
        }
    });
}

// Show modal by ID
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Hide modal element
function hideModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Add Header Shadow on Scroll
function initHeaderShadow() {
    const header = document.getElementById('header');

    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-shadow');
        } else {
            header.classList.remove('header-shadow');
        }
    });
}

// Page Visibility
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        document.title = 'Chinmay Patel | Software Engineer';
    } else {
        document.title = 'Come Back to Chinmay\'s Portfolio!';
    }
});

// Prevent Flash of Unstyled Content
document.documentElement.style.visibility = 'visible';
