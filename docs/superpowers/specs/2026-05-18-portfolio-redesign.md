# Portfolio Redesign — Design Spec
**Date:** 2026-05-18  
**Status:** Approved for implementation

---

## 1. Overview

Redesign and complete Zain Khan's personal portfolio (Next.js, static export for GitHub Pages). The site already has a working skeleton; this spec covers the visual overhaul, missing pages, and new functionality.

**Goals:**
- Cohesive warm editorial aesthetic across all pages
- Full-page p5.js hero
- Working Genuary26 sketch browser
- Blog with thumbnails and embedded p5.js support
- Dark/light mode toggle
- No backend — GitHub Pages safe

---

## 2. Visual Design System

### 2.1 Aesthetic
Warm Editorial: dark background with amber/brown tones, serif headings mixed with monospace labels, handcrafted feel.

### 2.2 Color Tokens (CSS custom properties on `:root`)

| Token | Dark | Light |
|---|---|---|
| `--bg-primary` | `#111010` | `#f5f0e8` |
| `--bg-secondary` | `#1a1614` | `#ece5d8` |
| `--bg-surface` | `#2a2220` | `#ddd5c4` |
| `--text-primary` | `#e8e0d5` | `#1a120a` |
| `--text-secondary` | `#8a7060` | `#6a5040` |
| `--accent` | `#c87941` | `#b06830` |
| `--border` | `#2a2220` | `#d5c9b8` |

Dark mode is the default. Light mode is activated by adding `class="light"` to `<html>`.

### 2.3 Typography
- **Headings:** Lora (Google Font, serif) — elegant, readable at all sizes
- **Body/UI:** Geist Sans (already loaded)
- **Labels/code/dates:** Geist Mono (already loaded)

Font loading: add Lora to the root layout alongside existing Geist fonts.

### 2.4 Dark/Light Mode
- Use Tailwind `darkMode: 'class'` in `tailwind.config` — dark styles activate when `<html>` has the `dark` class
- `ThemeProvider` is a client component that renders `{children}` and uses `useEffect` to toggle `document.documentElement.classList` between `dark` (default) and no class; preference stored in `localStorage`
- Add `suppressHydrationWarning` to the `<html>` element in `src/app/layout.js` to prevent hydration mismatch
- Toggle button in the navbar (sun/moon icon via lucide-react)
- Default: dark mode (`dark` class present)

---

## 3. Navbar

**File:** `src/components/Navbar.js`

### Changes from current:
- Add **Blog** link (currently missing)
- Add **dark/light theme toggle** button (right side, before mobile menu)
- Replace pink hover accent with amber: `hover:text-amber-500`
- Change logo from "Home" text to italic serif "Zain Khan"
- Apply warm editorial palette

### Links:
```
Zain Khan (logo → /)   |   About   Projects   Craft   Blog   Contact   [theme toggle]
```

---

## 4. Hero (Root Page)

**File:** `src/app/page.js`, `src/components/Hero.js`, `src/components/GlobalP5Wrapper.js`

### Layout: Bottom-left anchor
- `GlobalP5Wrapper` iframe fills the full viewport (`h-screen w-full`)
- Text block anchored to bottom-left with a gradient fade:
  ```
  background: linear-gradient(to top, rgba(17,16,16,0.85) 0%, transparent 60%)
  ```
- Text content:
  - Name: `Zain Khan` — Lora serif, large, `text-primary`
  - Label: `AI DEVELOPER · CREATIVE CODER` — monospace, uppercase, letter-spaced, `accent` color
  - Tagline: *"Making machines that think, and art that computes."* — Lora italic, `text-secondary`
- A subtle scroll-down indicator (chevron or animated arrow) at the very bottom center

### Hero p5.js sketch
- **Path:** `/public/sketches/hero/index.html` (user swaps this file to change the hero sketch)
- `GlobalP5Wrapper` iframe `src` → `/sketches/hero/index.html`
- `sandbox="allow-scripts"` (remove `allow-same-origin` — not needed for self-contained sketches)
- Starter content: copy `/public/sketches/Genuary26/21-jan-bauhaus/` into `/public/sketches/hero/` (most visually distinctive, recently polished per git history)

### Root page structure:
```
<html>
  <Navbar /> (fixed, z-50)
  <Hero />   (h-screen, relative)
  <Footer />
</html>
```
Remove `pt-13` from the root page — the hero is full viewport, navbar overlays it.

---

## 5. About Page

**File:** `src/app/(general)/about/page.js` + `src/components/about/`

### Structure (keep existing components, restyle):
1. **Head** — name, title/role, headshot (if available at `/public/profile/`), social links
2. **Professional Summary** — 2–3 sentence intro
3. **Work Experience** — timeline style, company / role / dates / bullet points
4. **Education** — similar timeline
5. **Skills** — tag-cloud or grouped list (AI/ML, Languages, Tools, Creative)

### Social links (add to Head component):
- GitHub: `https://github.com/zainkhan-afk`
- Email: `zain.9496@gmail.com`
- LinkedIn: to be filled by user
- Twitter/X: to be filled by user

Use lucide-react icons (Github, Mail, Linkedin, Twitter).

### Styling: warm editorial — serif section headings, timeline lines in `--border` color, accent for dates/labels.

---

## 6. Projects Page

**Files:** `src/app/(general)/projects/page.js`, `src/app/(general)/projects/[slug]/page.js`, `src/lib/projects.js`

### List page
- 2-column card grid (stacks to 1-col on mobile)
- Each card: `display_graphic` image (top) + title + tech tags + short description
- Click → `/projects/[slug]`

### Detail page
- Hero image (`display_graphic`) full-width
- Title (Lora serif, large)
- Tech tags (monospace chips)
- GitHub link button if `github` frontmatter present
- Rendered markdown body

### Frontmatter schema (existing, no changes needed):
```yaml
title: string
date: YYYY-MM-DD
description: string
github: url (optional)
display_graphic: url or /path
draft: boolean
tech: [string]
further_reading: boolean
```

---

## 7. Craft / Exhibit

### 7.1 Craft index page
**File:** `src/app/(general)/craft/page.js`

Shows all available crafts as a simple card list. Initially just Genuary 2026. Each card:
- Title
- Short description
- Year / date range
- Link → `/craft/[slug]`

As new crafts are added, they appear automatically by adding new subdirectories + entries.

### 7.2 Genuary 2026 page
**File:** `src/app/(general)/craft/Genuary26/page.js`

**Layout: Sidebar + viewer**

```
┌─────────────────────────────────────────────────────┐
│  Navbar                                             │
├──────────────┬──────────────────────────────────────┤
│  Sidebar     │  Sketch viewer                       │
│  (scrollable)│  (iframe, fills remaining height)    │
│              │                                      │
│  Jan 1 ●    │  [interactive p5.js sketch]          │
│  Jan 2       │                                      │
│  Jan 3       ├──────────────────────────────────────┤
│  ...         │  Notes                               │
│              │  (prompt + Zain's commentary)        │
└──────────────┴──────────────────────────────────────┘
```

**Data source:** `/src/content/craft/genuary26-manifest.json`
```json
[
  {
    "slug": "1-jan-onecolor_oneshape",
    "title": "Jan 1 — One Color, One Shape",
    "prompt": "one color, one shape",
    "notes": "",
    "interactive": true
  },
  ...
]
```
Pre-populate with all 31 sketch slugs; user fills in `notes` and `prompt` fields over time.

**Implementation notes:**
- Server component reads the manifest + uses it for static generation
- Passes manifest to a `GenauryBrowser` client component (handles sidebar selection state)
- Selected sketch: `<iframe src={/sketches/Genuary26/${slug}/index.html} />`
- Sidebar: list of all entries; selected entry highlighted in `--accent`; scrollable independently
- On mobile: sketch viewer full-width, sidebar becomes a horizontal scroll strip above

**Sketch path convention:** `/public/sketches/Genuary26/[slug]/index.html`

---

## 8. Blog

### 8.1 Blog list page
**File:** `src/app/(content)/blog/page.js`

**Layout: Editorial list with thumbnails**
- Horizontal rows, each row:
  - Small thumbnail (64×48px, rounded corners) — left
  - Title (Lora italic serif, linked) + date (monospace, accent color) + excerpt — right
  - Divider line between posts
- If no thumbnail: show a warm-toned placeholder rectangle

### 8.2 Blog post page
**File:** `src/app/(content)/blog/[slug]/page.js`

- Full-width thumbnail image below navbar (if `thumbnail` present in frontmatter)
- Title (Lora, large)
- Date + estimated read time
- Rendered MDX content

### 8.3 p5.js in blog posts
Posts are `.mdx` files (migrate from `.md`). Add a `<P5Sketch>` MDX component:
```jsx
// Usage in .mdx:
<P5Sketch src="/sketches/my-sketch/index.html" height={400} />
```
Component renders a sandboxed iframe. Height is configurable.

### 8.4 Frontmatter schema (updated):
```yaml
title: string
date: YYYY-MM-DD
description: string
thumbnail: /path/to/image.png  # new — optional
draft: boolean
```

### 8.5 lib/posts.js
- Support `.mdx` extension in addition to `.md`
- MDX rendering: use `next-mdx-remote/rsc` for server-side rendering in static export

---

## 9. Contact Page

**File:** `src/app/(general)/contact/page.js`

No form (no backend). Simple, warm page:
- Heading: "Get in touch"
- Short line: "I'm always open to new projects, collaborations, or just a good conversation."
- Four large link buttons:
  - Email (mail icon) → `mailto:zain.9496@gmail.com`
  - GitHub (github icon) → `https://github.com/zainkhan-afk`
  - LinkedIn (linkedin icon) → [user fills in]
  - Twitter/X (twitter icon) → [user fills in]
- Social links use lucide-react icons, styled as warm card buttons

---

## 10. Footer

**File:** `src/components/Footer.js`

Minimal: copyright line + same four social icon links as Contact.
Remove `ChatWidget` (requires backend, no backend in scope).

---

## 11. GitHub Pages Safety

- `output: 'export'` already set ✓
- `images: { unoptimized: true }` already set ✓
- No API routes, no server-only runtime code
- All data fetching via `fs` happens at build time in server components
- Iframe `src` values use relative paths (e.g. `/sketches/...`) — works with static export
- Add `.superpowers/` to `.gitignore`
- `next-mdx-remote/rsc` supports static export ✓

---

## 12. What's Kept vs Changed

| Item | Action |
|---|---|
| `output: 'export'` in next.config | Keep |
| Navbar structure | Keep, restyle + add Blog + theme toggle |
| `(general)` / `(content)` route groups | Keep |
| `lib/posts.js`, `lib/projects.js` | Keep, minor updates |
| About page components | Keep, restyle |
| `GlobalP5Wrapper` iframe approach | Keep, update src path |
| `ChatWidget` | Remove |
| `data-vis/page.js` | Out of scope (not in nav) |
| `notes/` content routes | Out of scope (not in nav) |
| Tailwind / gray-900 color scheme | Replace with warm editorial tokens |
| `Geist` fonts | Keep, add `Lora` |

---

## 13. File / Folder Changes Summary

**New files:**
- `src/components/ThemeProvider.js` — dark/light toggle logic
- `src/components/craft/GenauryBrowser.js` — client component for sidebar+viewer
- `src/components/blog/P5Sketch.js` — MDX component for embedding sketches
- `src/content/craft/genuary26-manifest.json` — Genuary sketch metadata
- `public/sketches/hero/` — hero sketch (copy from a Genuary entry)
- `docs/superpowers/specs/` — this file

**Modified files:**
- `src/app/layout.js` — add ThemeProvider, Lora font, remove ChatWidget
- `src/components/Navbar.js` — warm editorial, Blog link, theme toggle
- `src/components/Hero.js` — bottom-left anchor layout
- `src/components/GlobalP5Wrapper.js` — point to `/sketches/hero/index.html`
- `src/app/globals.css` — warm editorial CSS custom properties
- `src/app/page.js` — remove pt-13
- `src/app/(general)/craft/Genuary26/page.js` — full sidebar+viewer implementation
- `src/app/(general)/craft/page.js` — craft index cards
- `src/app/(content)/blog/page.js` — editorial list layout
- `src/app/(content)/blog/[slug]/page.js` — MDX rendering with thumbnail
- `src/app/(general)/contact/page.js` — social links page
- `src/app/(general)/layout.js` — warm editorial background
- Blog posts: migrate `.md` → `.mdx`
- `tailwind.config` — add `darkMode: 'class'`, warm color palette
