# Prisma Studio | Premium Portfolio Template

A high-end, minimalist portfolio web application designed for filmmakers, visual artists, and creative studios. Developed with a rigorous focus on aesthetic pacing, fluid animations, and a moody, cinematic visual identity.

![Prisma Preview](https://imgur.com/gallery/prisma-portfolio-demo-UdxQQcr)

## Features

- **Cinematic Asymmetrical Grid:** The portfolio page (`/portfolio`) automatically generates an offset, staggered layout that transitions dynamically into a rich, full-screen takeover modal using Framer Motion's shared `layoutId` architecture.
- **Bilingual & Data-Driven:** Everything visible on the frontend is entirely decoupled from the React components. A robust `content.json` handles global configurations, English text (`en`), and Spanish text (`es`). Switch themes seamlessly with a global context toggle.
- **Client Onboarding Engine:** An internal form workflow (`/onboarding`) exists to dynamically generate `content.json` overrides. This means the template can be repurposed for completely independent clients without requiring *any* code changes. The AI prompt generator within helps structure scattered bios into Prisma's precise tonal formats.
- **Split-Screen Contact Architecture:** An ultra-premium, horizontally locked layout showcasing edge-to-edge ambient looping videos paired with minimalist, "underline-only" inputs.

## Technologies Used

- **React 18** / **Vite** — Core framework and incredibly fast HMR development environment.
- **TailwindCSS** — For pure, utility-first styling and precise dark-mode (`bg-black`, `border-primary/5`) layout aesthetics.
- **Framer Motion** — Drives all immersive interactions, scroll-based parallax (`whileInView`), and cinematic overlays.
- **React Router** — For seamless navigation across `/`, `/portfolio`, `/about`, `/contact`, and `/onboarding`.
- **Lucide React** — For gorgeous, infinitely scalable vector iconography perfectly tailored to the studio theme.

## Quick Start
To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/prisma-studio.git
   ```
2. Navigate to the project directory:
   ```sh
   cd prisma-studio
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```

### Development
Start the Vite development server:
```sh
npm run dev
```

### Customization
Navigate to `http://localhost:5174/onboarding` in your local environment. Fill out the massive Questionnaire form with your specific configurations, descriptions, project URLs, and social links. Then, click the "Download" icon in the sticky JSON window and replace `src/data/content.json` in your repository. The entire site will instantly refresh to your custom brand.

## Deployment
When ready for production:
```sh
npm run build
```
This will compile a highly optimized `/dist` folder that you can deploy to Vercel, Netlify, or any static hosting provider.
