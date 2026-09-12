document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navbar) {
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });

        // Close mobile menu when clicking a navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                hamburger.classList.remove('toggle');
            });
        });
    }

    // Active Navigation Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const windowScrollHandler = () => {
        let scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', windowScrollHandler);

    // Dynamic Current Year in Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Contact Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name').value.trim();
            const emailInput = document.getElementById('email').value.trim();
            const messageInput = document.getElementById('message').value.trim();

            if (!nameInput || !emailInput || !messageInput) {
                formFeedback.textContent = 'Please fill out all required fields.';
                formFeedback.className = 'form-feedback error';
                return;
            }

            // Simulate successful transmission
            formFeedback.textContent = 'Sending message to @vexornull...';
            formFeedback.className = 'form-feedback';

            setTimeout(() => {
                formFeedback.textContent = 'Message successfully transmitted! Thank you for reaching out.';
                formFeedback.className = 'form-feedback success';
                contactForm.reset();
            }, 1200);
        });
    }

    // Smooth reveal animation on scroll using Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.about-card, .project-card, .skill-item, .contact-wrapper');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
