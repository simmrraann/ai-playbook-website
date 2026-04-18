# AI Playbook ✦

> Build smarter. Learn faster. Grow together.

A beautifully designed workshop website built with **React + Tailwind CSS**. Features a soft sand/beach aesthetic, 3D rotating team cube, animated envelope registration, and a cute robot cursor.

---

## ✨ Features

- **Hero Section** — Full-screen with hand-drawn floating crowd + animated CTA
- **Robot Cursor** — Smooth-easing cute robot that follows your mouse with bounce
- **Star Particles** — Subtle twinkling background dots
- **Team Section** — 3D rotating CSS cube (5 faces) + mobile swipeable cards
- **Registration** — Pulsing coral envelope → animated form modal with success state
- **Loading Screen** — Branded loader with animated progress bar
- **Fully Responsive** — Desktop cube → mobile cards

---

## 📁 Folder Structure

```
ai-playbook/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── RobotCursor.jsx       # Mouse-following robot with lerp easing
│   │   ├── StarParticles.jsx     # Twinkling background particles
│   │   ├── LoadingScreen.jsx     # Initial branded loader
│   │   ├── Navbar.jsx            # Sticky nav with mobile hamburger
│   │   ├── HeroSection.jsx       # Hero + hand-drawn SVG crowd
│   │   ├── TeamSection.jsx       # 3D CSS cube + mobile cards
│   │   └── RegisterSection.jsx   # Envelope + modal form + footer
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Getting Started

### Install & Run

```bash
npm install
npm start
# Opens at http://localhost:3000
```

### Production Build

```bash
npm run build
# Output in build/ folder

# Preview locally:
npx serve -s build
```

---

## 🌐 Deploy

### Netlify (Recommended)

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

Or drag the `build/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

### Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## 📦 GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit - AI Playbook website"
git remote add origin https://github.com/YOUR_USERNAME/ai-playbook.git
git branch -M main
git push -u origin main
```

---

## 🎨 Customization

### Team Members → `src/components/TeamSection.jsx`
Edit the `teamMembers` array — update name, role, bio, emoji, bg gradient, face.

### Social Links → `src/components/RegisterSection.jsx`
Update the `href` values in the footer `<a>` tags.

### Colors (main palette)
| Token | Hex |
|---|---|
| Sand BG | `#F5EBDD` |
| Soft Purple | `#9B7FD4` |
| Coral CTA | `#E8614D` |
| Dark Text | `#2C2415` |

### Connect Registration Form
The form is frontend-only. To wire it up, replace the `setTimeout` in `handleSubmit` inside `RegisterSection.jsx` with your API call (Supabase, Airtable, EmailJS, etc.).

---

## 🏗️ Built by

AIJugaad × AI Playbook Community · Nashik, Maharashtra 🇮🇳
