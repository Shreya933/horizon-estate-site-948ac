# Horizon Estate

Standalone React + Vite source for the Horizon Estate website. The home-page hero automatically plays the supplied villa sequence while it is visible and restarts when you scroll away and return. The separate Horizon Experience section remains scroll-controlled.

## Requirements

- Node.js 22.12 or newer
- pnpm 10 or newer
- Visual Studio Code (or another editor)

## Run locally

1. Extract this ZIP and open the `HorizonEstateVSCode` folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Run:

   ```bash
   pnpm install
   pnpm dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build

```bash
pnpm build
pnpm preview
```

## Videos

- The home-page hero uses `public/hero-villa-tour.mp4`, made from the newly supplied villa frames. It plays muted while the hero is visible, loops, and restarts when you scroll away and return. `public/hero-villa-poster.webp` is its fallback image.
- The Horizon Experience section automatically plays `public/experience-scroll.mp4`, which is the video previously used at the top of the page. It loops while visible and restarts when you return. Its poster is `public/experience-scroll-poster.webp`.
- Both videos are 1280 × 720 and 8 seconds long. Reduced-motion settings leave the posters visible instead of animating.
