// scripts/animations.js

// Add 'js' class to html element immediately to prevent FOUC for animated elements
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    // Note: Dopaminic Cross-Page View Transitions are natively handled by the `<meta name="view-transition" content="same-origin" />` parameter.
    // The previous manual opacity=0 click interception was removed because modern browsers cache and morph layout perfectly native.

    // 2. Satisfying Scroll Animations
    // Target elements to animate
    const hiddenElements = document.querySelectorAll(
        '.project-card, .cv-entry, .about-card, .skills-showcase, ' +
        '.about-biography, .hero__content, section > h2, .cv-header, ' +
        '#contact .container > *'
    );
    
    // Add the base class to them
    hiddenElements.forEach((el) => {
        el.classList.add('fade-scroll-item');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', 
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small randomized delay or index-based delay if wanted, 
                // but IntersectionObserver handles it nicely normally.
                entry.target.classList.add('is-visible');
            } else {
                // Remove to allow re-animation on scroll up/down
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Observe each element
    hiddenElements.forEach((el) => {
        fadeObserver.observe(el);
    });
});
