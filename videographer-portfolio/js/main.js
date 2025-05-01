// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Initializing website...");

    // Initialize preloader
    initPreloader();

    // Initialize header scroll effect
    initHeaderScroll();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize portfolio filter
    initPortfolioFilter();

    // Initialize testimonial slider
    initTestimonialSlider();

    // Initialize back to top button
    initBackToTop();

    // Initialize form submission
    initContactForm();

    // Wait a bit before initializing 3D animations to ensure everything is loaded
    setTimeout(function() {
        // Initialize 3D camera model animations
        initCameraAnimations();
    }, 1000);
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hide');
        }, 1000);
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');

        // Toggle menu icon
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Portfolio filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentIndex = 0;

    // Hide all testimonials except the first one
    testimonialItems.forEach((item, index) => {
        if (index !== 0) {
            item.style.display = 'none';
        }
    });

    // Previous button click
    prevButton.addEventListener('click', function() {
        testimonialItems[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        testimonialItems[currentIndex].style.display = 'block';
    });

    // Next button click
    nextButton.addEventListener('click', function() {
        testimonialItems[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        testimonialItems[currentIndex].style.display = 'block';
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 3D Camera model animations with Spline model
function initCameraAnimations() {
    console.log("Initializing camera animations with Spline 3D model...");

    try {
        // Get the camera container and iframe
        const cameraContainer = document.getElementById('camera-container-1');
        const cameraIframe = cameraContainer.querySelector('iframe');
        const heroSection = document.querySelector('.hero');

        // Check if elements exist
        if (!cameraContainer || !heroSection || !cameraIframe) {
            console.error("Required elements not found!");
            return;
        }

        // Log the iframe source to verify it's correct
        console.log("3D Model iframe source:", cameraIframe.src);

        // Add load event listener to the iframe
        cameraIframe.addEventListener('load', function() {
            console.log("3D Model iframe loaded successfully");
        });

        // Initial state variables
        let scale = 1;
        let translateX = 0;
        let initialScrollY = window.scrollY;
        let isScrolling = false;
        let scrollTimeout;

        // Simple fade-in animation
        cameraContainer.style.opacity = "0";

        setTimeout(() => {
            cameraContainer.style.transition = "opacity 1s ease";
            cameraContainer.style.opacity = "1";
            console.log("Camera faded in with simple effect");
        }, 500);

        // Add scroll zoom effect
        window.addEventListener('scroll', function() {
            // Mark as scrolling
            isScrolling = true;
            clearTimeout(scrollTimeout);

            // Calculate scroll progress within the hero section
            const scrollY = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            const scrollProgress = Math.min(scrollY / heroHeight, 1);

            // Determine if scrolling up or down
            const scrollingDown = scrollY > initialScrollY;
            initialScrollY = scrollY;

            // Apply a subtle zoom effect based on scroll direction
            if (scrollingDown) {
                // Subtle zoom out when scrolling down
                scale = Math.max(0.9, 1 - scrollProgress * 0.2);
            } else {
                // Subtle zoom in when scrolling up
                scale = Math.min(1.1, 1 + (1 - scrollProgress) * 0.1);
            }

            // Update camera container transform
            cameraContainer.style.transition = "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)";
            cameraContainer.style.transform = `scale(${scale})`;

            // Reset scrolling flag after a delay
            scrollTimeout = setTimeout(() => {
                isScrolling = false;

                // Reset to normal scale after scrolling stops
                if (scrollY < heroHeight) {
                    scale = 1;
                    cameraContainer.style.transform = `scale(${scale})`;
                }
            }, 100);
        });

        console.log("Camera animation initialized successfully");

    } catch (error) {
        console.error("Error initializing camera animation:", error);
    }
}

// Contact form submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the form data to a server
            // For now, we'll just log it to the console
            console.log('Form submitted:', { name, email, subject, service, message });

            // Show success message (in a real application)
            alert('Thank you for your message! We will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.main-nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});
