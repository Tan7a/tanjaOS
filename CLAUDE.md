# TanjaOS — Project Context for Claude Code

## What this is

A personal OS-style website at **tanjaos.space**, shipped as **TanjaXP**: a Windows XP time capsule. It looks and behaves like the Windows XP desktop Tanja grew up on — Bliss wallpaper, Luna title bars, the green Start button, the taskbar clock — with a growing set of "apps" that are really just windows into her childhood, teenage years, and present-day taste.

This **is** a nostalgia project, on purpose. It's a love letter to the family-computer era — Tanja playing DX-Ball after school, dragging photos around in folders, doodling in MS Paint, listening to MP3s with a cartoon visualizer dancing in the corner. It is not a portfolio. It is not a SaaS landing page. It is fun for Tanja first; visitors are welcome to wander.

The vibe to protect at all costs: **childish, warm, slightly silly, unmistakably Windows XP, made with love.** When in doubt, lean more retro, not less.

## Planned windows / apps

Already shipped (live on tanjaos.space):

- **My Computer / My Documents / Recycle Bin** — themed folders sharing one `FolderShell` file-explorer component
- **Music Player** — with the priority animated sheep mascot (3 skins: classic-with-bow, pink-with-shades, woolly-cream), simulated transport, seek bar, volume
- **DX-Ball 2** — canvas-based brick-breaker with paddle physics, lives, score, particles, win/game-over overlays
- **Photo Folder** — placeholder thumbnails, opens like the XP photo viewer
- **Screenplay Editor** — `contentEditable` writing surface in Word 2003 chrome
- **Start Menu** — two-column XP layout, green Start button, live clock, system tray

Coming over time, one at a time (priorities, not promises):

- **About Me** — who Tanja is, her childhood/teen years on XP
- **Dog** — page about her dog
- **Bookshelf** — books she's read, like a visual shelf
- **Architecture & Art** — curated inspiration, images, references
- **Projects** — design and product work
- **Inspiration** — things she finds beautiful or interesting
- **Traveling** — places she's been or wants to go
- **MS Paint** — actual sketching surface (would be perfect)
- More will come — anything Tanja wants a window for

## The extensibility rule (critical)

Every new "app" should require only two things:
1. Add one entry to the central **app registry** in `lib/apps.ts` (id, title, icon, which component to render)
2. Create one new window component file under `components/windows/`

The desktop, Start menu, and taskbar all read from the registry — adding an app should never require touching `Desktop.tsx`, `StartMenu.tsx`, or `Taskbar.tsx`. **This is the most important architectural decision in the project.** Don't break it.

## File structure (as shipped)

```
/app
  page.tsx              ← renders <Desktop />
  layout.tsx
  globals.css           ← XP Luna design tokens

/components
  /desktop
    Desktop.tsx         ← reads the registry, manages window state via useReducer
    DesktopIcon.tsx     ← clickable icon that opens a window
    StartMenu.tsx       ← two-column XP Start menu
    Taskbar.tsx         ← bottom bar with Start button, open windows, tray, clock
    BlissWallpaper.tsx  ← the wallpaper
  /windows
    Window.tsx          ← base XP window chrome (drag, focus/z-index, minimize, close)
    MusicPlayer.tsx
    DXBall.tsx
    PhotoFolder.tsx
    ScreenplayEditor.tsx
    MyComputer.tsx
    MyDocuments.tsx
    RecycleBin.tsx
    /folder
      FolderShell.tsx   ← shared file-explorer chrome reused by the folder windows
  /icons
    AppIcons.tsx        ← inline SVG XP-style icons
  /sheep
    AnimatedSheep.tsx   ← the music-player mascot

/lib
  apps.ts               ← THE REGISTRY: every app declared here, single source of truth

/public
  wallpaper-bliss.jpg   ← the wallpaper
```

## Design direction

The overall feeling: **stepping into a 2003 bedroom with the family computer humming, Windows XP boot chime fresh in your ears.** Bliss on the desktop, Luna theme on every window, the soft hum of an era. Childish on purpose. Pixel-perfect XP where it matters; loose and fun where it doesn't.

### Visual language: Windows XP Luna (default blue theme)

- **Title bars**: blue gradient (active) and grey gradient (inactive), with the white XP-style minimize/maximize/close buttons in the top right. The close button is red.
- **Window chrome**: beige/silver borders, slight 3D bevel, the kind of subtle gradients XP loved.
- **Taskbar**: the iconic blue gradient bar at the bottom. Green Start button on the left with the four-color flag and "start" in white. System tray and live clock on the right. One button per open window in between.
- **Start menu**: two columns — left side "user pinned" apps, right side system places (My Computer, My Documents, etc.). User avatar at the top with a name. Green/blue chrome.
- **Icons**: chunky, slightly cartoonish SVG icons in the XP style. No flat minimalism. No SF Symbols. No Lucide.

### Wallpaper

`Bliss` — the green-hills-blue-sky photo. It's already live (`/public/wallpaper-bliss.jpg`). Don't replace it lightly. If we add more wallpaper options later, they should be other XP defaults (Azul, Autumn, Crystal, Tulips, Red moon desert, Friend) — not modern photography.

### Color palette

Windows XP Luna:
- Title bar blue: deep gradient, roughly `#0058e0` → `#3a93ff`
- Inactive title grey: `#6585bf` ish
- Start button green: the iconic Luna green gradient
- Window chrome: cream/beige `#ece9d8` with silver edges
- Selection blue: `#316ac5`
- Red close-button hover

**Not**: modern flat design, dark mode, neon, purple gradients, gradient meshes that look like 2024 SaaS, anything that screams "AI startup." If a designer in 2026 would call it "tasteful," it's probably wrong here.

### Typography

Tahoma is the canonical XP UI font. Use it (or a close web fallback like `Tahoma, "Segoe UI", "MS Sans Serif", sans-serif`). For inside-window content where it fits the bit (Screenplay Editor, etc.), reach for era-appropriate fonts — Times New Roman for the Word 2003 vibe, Comic Sans where it's funny, etc. **No Inter. No Roboto. No SF Pro.** Those are anti-XP.

### The feeling to aim for

Imagine Tanja, age 12, after school, opening up the family computer. The XP boot chime. The hills. Double-clicking My Computer. Playing DX-Ball with the volume too loud. Saving a screenplay in Word. That specific texture of joy. The OS isn't a navigation metaphor — it's the artifact itself. Visitors should feel like they snuck onto someone else's childhood computer and found a folder labeled "tanja's stuff."

When choosing between "tastefully retro" and "actually XP," choose actually XP.

## What Tanja does

UX/product designer and PhD candidate in HCI. By day she thinks about interfaces; this site is the opposite of that — a place where she gets to be uncool, sentimental, and unserious on purpose.

## Tech stack

- **Next.js 16** (App Router) — `next build` (Turbopack production build, the default)
- **TypeScript**
- **Tailwind CSS v4**
- **react-draggable** for window dragging
- Window state managed via `useReducer` inside `Desktop.tsx`
- Deployed on **Vercel** via GitHub — auto-deploys on push to `main`.

> Vercel deploy gotcha (learned the hard way): the Vercel project's **Framework Preset must be set to "Next.js"**. If it's "Other" or unset, Vercel ignores the `.next/` build output and only publishes `/public`, which makes every route return a Vercel platform 404 even though the build "succeeded."
