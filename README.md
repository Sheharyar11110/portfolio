# Luxury 3D Portfolio

A premium, cinematic portfolio built with React, Three.js (React Three Fiber), Framer Motion, GSAP, Lenis, and Tailwind CSS.

## Features

- Fullscreen 3D hero with glass orbs, metallic shapes, ribbons, and particles
- Smooth Lenis scrolling with GSAP ScrollTrigger
- Luxury UI: glassmorphism, magnetic buttons, custom cursor
- Sections: Hero, About, Skills, Projects, Experience, Testimonials, Contact
- Command palette (⌘K / Ctrl+K)
- Dark/light theme toggle
- Ambient audio toggle
- Floating dock navigation
- Minimal AI assistant
- Mobile-optimized with 3D fallbacks

## Getting Started

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Customize

- Edit `src/data/` for projects, skills, experience, and testimonials
- Update hero copy in `src/sections/Hero.jsx`
- Replace profile image URL in `src/sections/About.jsx`
- Adjust colors in `src/index.css` `@theme` block

## Tech Stack

- React 19 + Vite 8
- Three.js + @react-three/fiber + @react-three/drei
- Framer Motion + GSAP
- Lenis smooth scroll
- Tailwind CSS v4
