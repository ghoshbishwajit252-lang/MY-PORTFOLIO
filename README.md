# ⚡ Bishwajit Ghosh | Modern React & Systems Architect Portfolio

A world-class, futuristic portfolio web application engineered with **React 19**, **Vite**, **TypeScript/ES6+**, and **Vanilla CSS**. Designed with rich dark glassmorphism aesthetics, ambient gradient orbs, interactive simulated mobile device demo, live code lab, filterable technical matrix, and interactive brief submission form.

---

## 🌟 Key Features

1. **Dark Futuristic & Glassmorphism Aesthetic**:
   - Ambient glowing mesh orbs (`--glow-indigo`, `--glow-cyan`)
   - Translucent glassmorphic cards with `backdrop-filter: blur(18px)`
   - Multi-theme engine: **Cyber Dark**, **Neon Midnight**, and **Crisp Clean Light**
2. **Interactive Simulated Mobile Runtime (Hero Highlight)**:
   - Built-in iPhone 16 Pro mockup frame with dynamic island and active status bar
   - Live mini apps:
     - **NovaPay Crypto Vault**: Real-time balance calculator with animated SVG bar charts and simulated biometric FaceID verification.
     - **AuraFit AI Coach**: VisionCamera pose detector simulation with an interactive `+1 Rep` motion detector.
     - **Runtime Diagnostics**: Live microtask stream showing V8/Hermes bytecode verification, concurrent batch commits, and WebSocket feeds.
3. **Interactive Bio Tabs**:
   - Switch between **Engineering Mission**, **Architecture Ethos**, and **UX Philosophy**.
4. **Technical Capabilities Matrix**:
   - Filterable skills across **Frontend & React**, **Mobile & Native Systems**, **Backend & Cloud**, and **DevOps & Architecture** with proficiency progress bars.
5. **Featured Production Case Studies**:
   - High-resolution interactive project cards for **NovaPay**, **AuraFit**, and **OmniPulse**.
   - Interactive **Architecture Deep-Dive Modal** detailing state management, networking protocols, security layers, and performance optimizations.
6. **Architecture Code Lab**:
   - Tabbed code viewer displaying real architectural implementations:
     - Concurrent Streaming Hook with microtask batching
     - Deterministic Resilient Offline Mutation Queue
     - Native C++ JSI TurboModule Spec
   - One-click code copy button with visual feedback.
7. **Career Milestones & Leadership Timeline**:
   - Detailed history from Full-Stack Engineer to Staff Systems Architect at Apex Cloud Labs.
8. **Interactive Brief Submission / Contact Section**:
   - Form with real-time field validation, project scope pills, and budget tier selectors.
   - WhatsApp direct chat trigger.
   - One-click copy email button with feedback toast.
9. **Executive Resume & Credentials Modal**:
   - Summary of verified certifications (Meta, AWS, Expo), competencies, and simulated download action.

---

## 📁 Project Architecture

```
e:\PORTFOLIO/
├── index.html                   # HTML5 entry with Google Fonts (Outfit, Plus Jakarta Sans, JetBrains Mono)
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite configuration
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main application coordinating state, theme & modals
│   ├── index.css                # Design system variables, themes, glassmorphism & typography
│   ├── App.css                  # Component stylesheets, responsive layout & animations
│   ├── assets/
│   │   ├── avatar.jpg           # 3D digital developer portrait
│   │   ├── novapay.jpg          # NovaPay DeFi app UI showcase
│   │   ├── aurafit.jpg          # AuraFit AI fitness UI showcase
│   │   └── omnipulse.jpg        # OmniPulse collaboration UI showcase
│   ├── data/
│   │   └── portfolioContent.js  # Bio, metrics, projects, skills, timeline, snippets, testimonials
│   └── components/
│       ├── Navbar.jsx           # Sticky glassmorphic navbar with theme switcher
│       ├── Hero.jsx             # Portrait, status badge, bio tabs, CTAs & metrics
│       ├── InteractiveDeviceDemo.jsx # Simulated iPhone 16 Pro mockup with live worklets
│       ├── Skills.jsx           # Filterable technical capabilities matrix
│       ├── Projects.jsx         # Production case studies with deep-dive modal triggers
│       ├── CodePlayground.jsx   # Tabbed code viewer with one-click copy
│       ├── Timeline.jsx         # Career milestones & accomplishments
│       ├── Testimonials.jsx     # Leadership quotes & 5-star ratings
│       ├── Contact.jsx          # Interactive brief submission form with validation
│       ├── ProjectModal.jsx     # Architecture blueprint dialog
│       ├── ResumeModal.jsx      # Executive CV preview & certification specs
│       ├── Icons.jsx            # Crisp SVG brand icons (GitHub, LinkedIn, Twitter)
│       └── Footer.jsx           # Tech tags, back to top trigger & copyright
```

---

## 🚀 How to Run Locally

### Development Server
```powershell
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### Production Build
```powershell
npm run build
```
Optimized assets are emitted to the `dist/` directory.

### Preview Production Build
```powershell
npm run preview
```
