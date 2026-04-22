// prevent FOUC
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .cv-entry, .about-card, .skills-showcase, ' +
        '.about-biography, .hero__content, section > h2, .cv-header, ' +
        '#contact .container > *'
    );
    
    elementsToAnimate.forEach((el) => {
        el.classList.add('fade-scroll-item');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', 
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach((el) => {
        fadeObserver.observe(el);
    });
});

