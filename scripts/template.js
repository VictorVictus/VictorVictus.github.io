const navbarHTML = `
    <header class="navbar">
        <a href="index.html" style="text-decoration: none; display: flex; align-items: center;">
            <div class="navbar__brand">
                <span class="navbar__monogram">VP</span>
                <span class="navbar__name" id="firma" data-i18n="firma">VÍCTOR PUCHE</span>
            </div>
        </a>
        <nav class="navbar__menu">
            <a href="aboutme.html" id="sobremi" data-i18n="nav_about">About</a>
            <a href="index.html#work" id="projectes" data-i18n="nav_work">Work</a>
            <a href="cv.html" id="micv" data-i18n="nav_cv">CV</a>
            <a href="index.html#contact" id="contacte" data-i18n="nav_contact">Contact</a>
            
            <div class="language-selector" style="display:inline-block; margin-left:1.5rem;">
                <select class="seleccioidioma" onchange="canviaIdioma()" style="font-family: var(--font-sans); padding: 0.3rem; border: 1px solid var(--navy); border-radius: 4px; background: white; color: var(--navy); font-size: 0.8rem; cursor: pointer;">
                    <option value="ca">Català</option>
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                </select>
            </div>
            
            <button id="dark-mode-toggle" class="theme-toggle" aria-label="Toggle Dark Mode" onclick="toggleDarkMode()">
                <span class="moon-icon">☾</span>
                <span class="sun-icon" style="display:none;">☀</span>
            </button>
        </nav>
    </header>
`;

const footerHTML = `
    <footer class="about-footer global-footer" style="padding: 2rem; border-top: 1px solid var(--sand); font-family: var(--font-sans); font-size: 0.9rem; color: #5a6a7a; text-align: center; display: flex; justify-content: space-between; align-items: center; max-width: 1400px; margin: 0 auto; flex-wrap: wrap;">
        <div class="about-footer__text">
            <p data-i18n="about_footer">Built with Visual Studio and hosted on GitHub: <span style="color: var(--burgundy); font-weight: 500;">HTML, CSS and JavaScript – 2024</span></p>
        </div>
        <div class="about-footer__logos" style="display: flex; gap: 1rem;">
            <img src="img/github.png" alt="GitHub" style="height: 30px; opacity: 0.7;">
            <img src="img/html.png" alt="HTML" style="height: 30px; opacity: 0.7;">
            <img src="img/css.png" alt="CSS" style="height: 30px; opacity: 0.7;">
            <img src="img/js.png" alt="JavaScript" style="height: 30px; opacity: 0.7;">
        </div>
    </footer>
    
    <div id="fullimatgecaixa">
        <img src="" alt="Full size image" id="fullImg">
        <span class="close-lightbox" onclick="closeFullImg()">&times;</span>
        <button class="lightbox-nav lightbox-nav--prev" onclick="changeImg(-1)" aria-label="Previous image">&#8249;</button>
        <button class="lightbox-nav lightbox-nav--next" onclick="changeImg(1)" aria-label="Next image">&#8250;</button>
    </div>
`;

// Inject components
const navPlaceholder = document.getElementById('navbar-placeholder');
if(navPlaceholder) navPlaceholder.outerHTML = navbarHTML;

const footerPlaceholder = document.getElementById('footer-placeholder');
if(footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;

// Theme handling
const toggleBtn = document.getElementById('dark-mode-toggle');
if (toggleBtn) {
    const moon = toggleBtn.querySelector('.moon-icon');
    const sun = toggleBtn.querySelector('.sun-icon');
    
    let isDark = localStorage.getItem('dark-mode') === 'true';
    if (localStorage.getItem('dark-mode') === null) {
        isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    const applyTheme = (dark) => {
        if(dark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            moon.style.display = 'none';
            sun.style.display = 'inline-block';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            moon.style.display = 'inline-block';
            sun.style.display = 'none';
        }
    };
    
    applyTheme(isDark);
    
    window.toggleDarkMode = () => {
        isDark = !isDark;
        localStorage.setItem('dark-mode', isDark);
        applyTheme(isDark);
    };
}

// Lightbox
let currentGalleryImages = [];
let currentImageIndex = 0;

window.openFullImg = function(pic, el) {
    const box = document.getElementById("fullimatgecaixa");
    const img = document.getElementById("fullImg");
    if (box && img) {
        if (el) {
            const parent = el.closest('.project-card__gallery');
            if (parent) {
                currentGalleryImages = Array.from(parent.querySelectorAll('img')).map(i => i.src);
                currentImageIndex = currentGalleryImages.indexOf(pic);
            } else {
                currentGalleryImages = [pic];
                currentImageIndex = 0;
            }
        } else {
            currentGalleryImages = [pic];
            currentImageIndex = 0;
        }

        box.style.display = "flex";
        img.src = pic;
        document.body.style.overflow = "hidden";
    }
}

window.changeImg = function(dir) {
    if (currentGalleryImages.length <= 1) return;
    
    currentImageIndex += dir;
    if (currentImageIndex < 0) currentImageIndex = currentGalleryImages.length - 1;
    if (currentImageIndex >= currentGalleryImages.length) currentImageIndex = 0;
    
    const img = document.getElementById("fullImg");
    if (img) {
        img.style.opacity = '0.6';
        setTimeout(() => {
            img.src = currentGalleryImages[currentImageIndex];
            img.style.opacity = '1';
        }, 100);
    }
}

window.closeFullImg = function() {
    const box = document.getElementById("fullimatgecaixa");
    if (box) {
        box.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

window.addEventListener('keydown', (e) => {
    const box = document.getElementById("fullimatgecaixa");
    if (box && box.style.display === "flex") {
        if (e.key === 'Escape') closeFullImg();
        if (e.key === 'ArrowRight') changeImg(1);
        if (e.key === 'ArrowLeft') changeImg(-1);
    }
});

