# VictorVictus.github.io

> Personal portfolio website for **Víctor Puche** — Electronic Engineering student, hardware designer, and software developer.

Live at **[victorvictus.github.io](https://victorvictus.github.io)**

---

## Overview

A fully hand-crafted personal portfolio website built with **zero frameworks** — pure HTML, CSS and JavaScript. The site follows a premium *Ralph Lauren*-inspired design aesthetic: serif typography, a warm cream/navy/burgundy colour palette, and deliberate whitespace — all paired with modern UX touches like scroll-triggered animations, native page transitions, and full dark mode.

---

## Pages

| Page | File | Description |
|---|---|---|
| **Home** | `index.html` | Hero section, selected projects grid, contact block |
| **About Me** | `aboutme.html` | Biography, skills showcase, tech stack footer |
| **CV** | `cv.html` | Full curriculum vitae: experience, education, languages, soft skills |

---

## Features

### 🎨 Design System
- **Typography:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (serif, headings) + [Raleway](https://fonts.google.com/specimen/Raleway) (sans-serif, body)
- **Colour tokens** defined as CSS custom properties in `:root` — navy, cream, sand, burgundy, gold, offwhite
- Fully responsive across all modern devices: phones (iPhone X → S24 Ultra), tablets (7" → 15"), and desktops

### 🌗 Dark Mode
- **Automatic:** Respects `prefers-color-scheme: dark` OS setting
- **Manual override:** ☾/☀ toggle button in the navbar persists preference via `localStorage`
- Both modes use the same Ralph Lauren palette shifted to deep charcoal navies keeping the premium look intact

### ✨ Animations
- **Scroll-triggered fade-in:** Elements smoothly resolve from a blurred, semi-transparent state into focus as they enter the viewport (`IntersectionObserver` + CSS `filter: blur`)
- **Native page transitions:** Uses the [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions/) (`<meta name="view-transition" content="same-origin">`) for buttery cross-page morphs. The navbar is pinned with `view-transition-name: navbar` so it never flickers during navigation
- **Interactive skill tags:** Project card skill tags are Wikipedia-linked pill buttons that pop with a spring-eased `transform: scale()` on hover — layout-safe, flicker-free

### 🌍 Internationalisation (i18n)
- Supports **4 languages:** Català, Español, English, Deutsch
- Centralised in `scripts/languages.js` via a `traduccions` dictionary
- Elements are tagged with `data-i18n` attributes; `canviaIdioma()` swaps all text on demand
- Language preference stored in `localStorage` and restored on every page load

### 🧩 JS Templating
- `scripts/template.js` injects the **navbar and footer** into every page from one single source
- Adding a new nav link or updating the footer requires editing exactly one file

---

## Project Structure

```
VictorVictus.github.io/
│
├── index.html          # Landing page
├── aboutme.html        # About / biography page
├── cv.html             # Curriculum Vitae
├── styles.css          # All styles: layout, components, dark mode, responsiveness, animations
│
├── scripts/
│   ├── template.js     # Injects shared navbar + footer; dark mode toggle logic
│   ├── languages.js    # i18n dictionary + canviaIdioma() language switcher
│   ├── animations.js   # IntersectionObserver scroll animations
│   └── fullimg.js      # Portrait image fullscreen handler (About page)
│
└── img/
```

---

## Architecture Notes

### CSS Custom Properties
All semantic colour values live in `:root`. Dark mode works by overriding these tokens inside `@media (prefers-color-scheme: dark)` **and** `[data-theme="dark"]` (for the manual toggle). Light mode restoration uses `[data-theme="light"]`. This means every component automatically inherits the correct theme with zero per-component dark-mode selectors needed.

### Animation Safety
Scroll animations use `opacity`, `filter: blur()`, and `transform: translateY/scale()` exclusively — properties that are **composited on the GPU** and never trigger layout reflow. The hover expansion on skill tags uses `transform: scale()` for the same reason (padding/letter-spacing animations caused a hover-flicker loop and were intentionally removed).

### View Transitions
The View Transitions API is activated via a `<meta>` tag on every page. CSS `::view-transition-old(root)` / `::view-transition-new(root)` define the exit/entry animations. The navbar is isolated with its own `view-transition-name` so it morphs independently (appearing stationary while page content slides).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styling | Vanilla CSS (custom properties, grid, flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts (Cormorant Garamond, Raleway) |
| Hosting | GitHub Pages |
| Version Control | Git |

---

## Deployment

The site is deployed automatically via **GitHub Pages** from the `main` branch root. No build step required — push and it's live.

---

*Built by hand. No frameworks. No dependencies.*
