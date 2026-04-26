# TanjaOS — Project Context for Claude Code

## What this is

A personal OS-style website at **tanjaos.space**. It looks and behaves like a desktop operating system: a background, draggable windows that open when clicked, and a growing set of "apps" that are really just pages about Tanja. The goal is for visitors to feel like they're exploring someone's mind — not reading a portfolio.

This is not a nostalgia project and not a copy of any real OS. The OS metaphor is a navigation shell. What lives inside the windows should feel editorial and personal, not retro-themed.

## Planned windows / apps

These will be added over time, one at a time:

- **About** — who Tanja is (first one to build)
- **Dog** — page about her dog
- **Bookshelf** — books she's read, like a visual shelf
- **Architecture & Art** — curated inspiration, images, references
- **Projects** — design and product work
- **Inspiration** — things she finds beautiful or interesting
- **Traveling** — places she's been or wants to go
- More will come

## The extensibility rule (critical)

Every new "app" should require only two things:
1. Add one entry to a central **app registry** (id, title, icon, which component to render)
2. Create one new window component file

The desktop should automatically pick up new apps from the registry. No other files should need to change. This is the most important architectural decision in the project.

## File structure intent

```
/app
  page.tsx              ← the desktop (renders registered apps)
  layout.tsx

/components
  /windows
    Window.tsx          ← base draggable window shell (reused by all apps)
    AboutWindow.tsx     ← first app
    DogWindow.tsx       ← future
    BookshelfWindow.tsx ← future
    ArchitectureWindow.tsx ← future
  /desktop
    Desktop.tsx         ← manages open/closed window state
    DesktopIcon.tsx     ← clickable icon that opens a window

/lib
  apps.ts               ← THE REGISTRY: all apps declared here

/public
  /icons                ← icon images for each app

/styles
  globals.css           ← CSS variables for the design system
```

## Design direction

The overall feeling is: **a painter who loves nature made an operating system.** Warm, handmade, alive — like stepping into a folk-art landscape painting that also happens to have draggable windows.

### Color palette
Pull from warm, saturated-but-earthy tones:
- Terracotta and clay reds
- Sage and moss greens
- Dusty sky blues and cornflower
- Warm coral and peach
- Ochre and golden yellows

**Not**: neon, purple gradients, dark/moody, cold grays, anything that looks like a SaaS product or an AI startup

### Desktop background
Should feel like one of those illustrated landscape paintings — layered hills, warm sky, organic shapes. Not a photo, not a flat color. Could be a CSS gradient mesh or SVG illustration that evokes warmth and depth. This is the first thing a visitor sees — it should immediately communicate "this is someone with taste and joy."

### Windows
Each window is a small art object. The title bar should have personality — maybe a warm color, rounded corners, a playful close button. Content inside each window should feel considered, not like a generic card component.

### Typography
Choose a font with character — something that feels warm and designed, not a system default. A display font for titles, a readable humanist font for body text. No Inter, no Arial, no Roboto.

### The feeling to aim for
Look at illustrated landscape paintings with bold colors (terracotta mountains, sage valleys, coral skies). That warmth and that sense of "someone made this with love" is the target. The OS is just the frame — the art is what's inside.

## What Tanja does

She is a UX/product designer and PhD candidate in HCI. The site is both a portfolio and a curated personal archive — a window into her taste and personality.

## Tech stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **react-draggable** for window dragging
- Deployed on **Vercel** via GitHub (auto-deploys on push to main)


