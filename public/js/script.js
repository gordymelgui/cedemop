document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times (close)
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                // If it's a dropdown trigger, don't close. handled by dropdown logic
                if (!link.classList.contains('dropdown-trigger')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // Hero Carousel
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }

    // Sticky Header Scroll Effect (Optional but creates a nice touch)
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scrolling for Anchor Links (Cross-browser backup)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            // Only scroll if it's an ID selector on the current page
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Account for fixed header height
                    const headerHeight = header ? header.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Dropdown Mobile Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a.dropdown-trigger');
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // Prevent navigation on mobile click
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Course Detail Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                if (!targetId) return;

                // Remove active class from all
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Add active class to clicked
                btn.classList.add('active');
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // Course Detail Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                item.classList.toggle('active');
            });
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, revealOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Help Carousel Logic
    const helpSlides = document.querySelectorAll('.help-slide');
    const helpPrevBtn = document.querySelector('.prev-slide');
    const helpNextBtn = document.querySelector('.next-slide');
    const helpDots = document.querySelectorAll('.help-dots .dot');
    let currentHelpSlide = 0;
    const totalHelpSlides = helpSlides.length;

    function showHelpSlide(n) {
        if (helpSlides.length === 0) return;

        helpSlides.forEach(slide => slide.classList.remove('active'));
        helpDots.forEach(dot => dot.classList.remove('active'));

        currentHelpSlide = (n + totalHelpSlides) % totalHelpSlides;

        helpSlides[currentHelpSlide].classList.add('active');
        if (helpDots[currentHelpSlide]) {
            helpDots[currentHelpSlide].classList.add('active');
        }
    }

    if (helpPrevBtn && helpNextBtn) {
        helpPrevBtn.addEventListener('click', () => {
            showHelpSlide(currentHelpSlide - 1);
        });

        helpNextBtn.addEventListener('click', () => {
            showHelpSlide(currentHelpSlide + 1);
        });

        // Dots click event
        helpDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showHelpSlide(index);
            });
        });

        // Auto-slide
        let helpInterval = setInterval(() => {
            showHelpSlide(currentHelpSlide + 1);
        }, 7000);

        // Pause auto-slide on interaction
        const carouselContainer = document.querySelector('.help-slider');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => clearInterval(helpInterval));
            carouselContainer.addEventListener('mouseleave', () => {
                helpInterval = setInterval(() => {
                    showHelpSlide(currentHelpSlide + 1);
                }, 7000);
            });
        }
    }

});
