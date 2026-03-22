# Boo — Match Page Clone

An exact HTML/CSS/JS clone of the [boo.world/match](https://boo.world/match) landing page.

## Features

- **Animated hero** with floating personality-match cards and pulsing heart connector
- **Scroll-reveal animations** for all sections
- **Interactive personality grid** — click any of the 16 MBTI types to instantly see compatibility score and description
- **Auto-scrolling profiles carousel** with seamless loop
- **Particle background** (canvas-based)
- **Cursor spotlight** effect (desktop)
- **Page loader** with gradient progress bar
- **Read-progress bar** at top of viewport
- **Toast notifications** on CTA clicks
- **Responsive design** — works on mobile, tablet, and desktop
- **Smooth scroll** + active nav highlighting

## Structure

```
├── index.html              # Main page (Boo /match clone)
├── assets/
│   ├── css/
│   │   ├── style.css       # Core layout, hero, sections, responsive
│   │   └── components.css  # UI components: loader, toast, cursor, animations
│   └── js/
│       └── main.js         # All interactive behaviour
└── README.md
```

## Running locally

Open `index.html` directly in a browser, or serve with any static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Tech stack

- Vanilla HTML5, CSS3, JavaScript (no frameworks or build tools)
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts
- CSS custom properties, `clamp()`, CSS Grid/Flexbox, `conic-gradient`
- `IntersectionObserver` for scroll-reveal
- Canvas 2D API for particle background