# Presentation Template

A React + Vite slide presentation template with dark theme, smooth animations, keyboard navigation, and one-click PDF export.

> For the full design system reference — colors, tokens, components, animation variants, and composition recipes — see [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).

---

## Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Customization Guide](#customization-guide)
  - [Change the title](#1-change-the-title)
  - [Add or remove slides](#2-add-or-remove-slides)
  - [Change the accent color](#3-change-the-accent-color)
  - [Add your logo and avatar](#4-add-your-logo-and-avatar)
  - [Export to PDF](#5-export-to-pdf)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Slide Layouts](#slide-layouts)
- [UI Components](#ui-components)
- [Tech Stack](#tech-stack)

---

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Navigate with arrow keys or the on-screen buttons.

### Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
presentation-template/
│
├── index.html                  # Entry point — change <title> here
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json
├── package.json
│
├── public/                     # Static assets (logos, avatars)
│
├── DESIGN_SYSTEM.md            # Full design system reference
│
└── src/
    ├── main.tsx                # React root mount
    ├── App.tsx                 # Slide orchestrator — add slides here
    ├── index.css               # color tokens + global utilities
    ├── vite-env.d.ts
    │
    ├── data/
    │   └── slides.ts           # Navigation dot labels — one entry per slide
    │
    ├── hooks/
    │   ├── usePresentation.ts  # Slide state + keyboard navigation
    │   └── usePDFExport.ts     # PDF generation (html-to-image + jsPDF)
    │
    ├── utils/
    │   └── animations.ts       # Motion variants: slideVariants, fadeIn, stagger…
    │
    └── components/
        ├── layout/             # Chrome rendered around every slide
        │   ├── ProgressBar.tsx
        │   ├── NavArrows.tsx
        │   ├── NavDots.tsx
        │   ├── SlideCounter.tsx
        │   └── PDFExportButton.tsx
        │
        ├── slides/             # One file per slide — edit or duplicate these
        │   ├── Slide01Cover.tsx
        │   ├── Slide02Content.tsx
        │   ├── Slide03Cards.tsx
        │   ├── Slide04TwoColumn.tsx
        │   └── Slide05Closing.tsx
        │
        └── ui/                 # Reusable building blocks
            ├── Card.tsx
            ├── Badge.tsx
            ├── Tag.tsx
            ├── GlowOrb.tsx
            ├── Layer.tsx
            ├── FlowDiagram.tsx
            ├── AsciiDiagram.tsx
            └── CodeBlock.tsx
```

---

## How It Works

`App.tsx` is the central orchestrator. It holds the `SLIDES` array and renders:

1. **Chrome** — `ProgressBar`, `NavArrows`, `NavDots`, `SlideCounter`, `PDFExportButton`. These are always visible on top of every slide.
2. **Active slide** — wrapped in `<AnimatePresence>` with a horizontal slide transition driven by `usePresentation`.
3. **PDF print frame** — an off-screen `1280×720` div used by `usePDFExport` to render each slide before capturing it as a PNG.

### `usePresentation`

Manages current slide index and direction. Listens to keyboard events globally — no setup needed.

### `usePDFExport`

Loops through every slide, renders it in the hidden frame, captures a `2560×1440` PNG (2× pixel ratio for sharpness), and assembles a landscape PDF via jsPDF.

### Animations

Every slide wraps its content in a `motion.div` with `variants={stagger}`. Individual elements use `variants={fadeIn}`, `fadeInLeft`, `fadeInRight`, or `scaleIn`. The stagger container cascades the children automatically — no manual delay needed.

---

## Customization Guide

### 1. Change the title

Edit `index.html`:

```html
<title>Your Presentation Title</title>
```

### 2. Add or remove slides

**Step 1** — Create `src/components/slides/SlideNN.tsx`. Copy any existing slide as a starting point. Every slide follows this shell:

```tsx
import { motion } from 'motion/react'
import { fadeIn, stagger } from '../../utils/animations'
import Tag from '../ui/Tag'
import GlowOrb from '../ui/GlowOrb'

export default function SlideNN() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-20 py-12">
      <GlowOrb color="cyan" size="lg" opacity={0.06} style={{ top: '-10%', right: '-6%' }} />

      <motion.div
        className="w-full max-w-[960px] relative z-10"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn}>
          <Tag>NN · Section Name</Tag>
        </motion.div>

        <motion.h2
          variants={fadeIn}
          className="font-bold text-[42px] text-white mb-6 leading-tight"
          style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
        >
          Title with a <span className="gradient-text">highlight</span>
        </motion.h2>

        {/* your content */}
      </motion.div>
    </div>
  )
}
```

**Step 2** — Register it in `src/App.tsx`:

```tsx
import SlideNN from './components/slides/SlideNN'

const SLIDES = [
  Slide01Cover,
  // ...
  SlideNN,   // ← add here
]
```

**Step 3** — Add a navigation dot label in `src/data/slides.ts`:

```ts
export const SLIDES_META: SlideMeta[] = [
  // ...
  { id: 6, label: 'My Slide', section: '05' },
]
```

### 3. Change the accent color

Open `src/index.css` and update `--color-primary` and `--color-primary-alt`:

```css
:root {
  --color-primary:     #00BFFF;  /* Cyan (default) */
  --color-primary-alt: #0FF0FF;  /* Aqua — gradient complement */
}
```

Other starting points:

| Theme | `--color-primary` | `--color-primary-alt` |
|-------|-------------------|----------------------|
| Color (default) | `#00BFFF` | `#0FF0FF` |
| Blue | `#3b82f6` | `#60a5fa` |
| Purple | `#8b5cf6` | `#a78bfa` |
| Amber | `#f59e0b` | `#fbbf24` |
| Rose | `#f43f5e` | `#fb7185` |

Also update the matching `rgba(0,191,255,…)` values in components if you switch away from cyan color. See [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for the full token map.

### 4. Add your logo and avatar

Drop image files in `public/` and reference them with an absolute path:

```tsx
<img src="/logo.png" alt="Logo" className="w-14 h-14 rounded-2xl object-cover" />
<img src="/avatar.jpg" alt="Name" className="w-9 h-9 rounded-full object-cover" />
```

### 5. Export to PDF

Click the **PDF** button in the bottom-left corner while presenting. The export captures every slide at `1280×720` at 2× resolution and saves a landscape PDF.

Change the output filename in `src/hooks/usePDFExport.ts`:

```ts
pdf.save('my-presentation.pdf')
```

> The export takes a few seconds per slide — a progress overlay shows which slide is being captured.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` `↓` `Space` | Next slide |
| `←` `↑` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |

Click any navigation dot at the bottom to jump directly to that slide.

---

## Slide Layouts

Five ready-to-use layouts included. Duplicate and modify to build your deck.

| File | Layout | Best for |
|------|--------|----------|
| `Slide01Cover.tsx` | Centered hero — logo, big title, 3 pillar cards, speaker chip | Opening slide |
| `Slide02Content.tsx` | Tag + title + numbered `Layer` list | Key concepts, steps, principles |
| `Slide03Cards.tsx` | Tag + title + 3-column `Card` grid + summary bar | Comparisons, features, options |
| `Slide04TwoColumn.tsx` | Left: text + bullets · Right: `FlowDiagram` or `CodeBlock` | Architecture, code walkthroughs |
| `Slide05Closing.tsx` | Centered symbol + heading + resource links + speaker footer | Q&A, thank you |

---

## UI Components

All in `src/components/ui/`. Import from any slide.

### `Card`

Rounded container with colored border tint.

```tsx
<Card variant="cyan" padding="p-5">content</Card>
```

Variants: `glass` · `cyan` · `blue` · `slate` · `aqua`

---

### `Badge`

Small pill label for tagging items.

```tsx
<Badge variant="cyan">Open Source</Badge>
```

Variants: `cyan` · `blue` · `slate` · `aqua` · `yellow` · `neutral`

---

### `Tag`

Monospaced section tag with a pulsing dot. Goes above slide titles.

```tsx
<Tag>01 · Section Name</Tag>
```

---

### `GlowOrb`

Animated ambient blur circle. Place behind content to add depth.

```tsx
<GlowOrb color="cyan" size="lg" opacity={0.07} style={{ top: '-15%', right: '-8%' }} />
```

Colors: `cyan` · `blue` · `slate`  
Sizes: `sm` (300px) · `md` (460px) · `lg` (600px)

---

### `Layer`

Numbered list item with a colored left-border accent.

```tsx
<Layer number="01" title="Step Title" color="cyan">
  Description text.
</Layer>
```

Colors: `cyan` · `blue` · `slate`

---

### `FlowDiagram`

Vertical pipeline of nodes connected by arrows.

```tsx
const nodes: FlowNodeDef[] = [
  { id: 'a', label: 'Input',    color: 'cyan', sublabel: 'entry' },
  { id: 'b', label: 'Process',  color: 'blue', edgeLabel: 'transforms' },
  { id: 'c', label: 'Output',   color: 'slate' },
]
<FlowDiagram nodes={nodes} />
```

Node colors: `cyan` · `blue` · `slate` · `aqua` · `neutral`

---

### `AsciiDiagram`

Monospaced preformatted block with optional header and line highlight.

```tsx
<AsciiDiagram
  label="terminal"
  highlight="200 OK"
  code={`$ curl /api/health\n→ 200 OK`}
/>
```

---

### `CodeBlock`

Syntax-highlighted code with macOS window chrome. Supports Python and JS/TS out of the box.

```tsx
<CodeBlock
  code={`const data = await fetch('/api')`}
  language="typescript"
  fontSize={13}
/>
```

---

## Tech Stack

| Package | Version | Role |
|---------|---------|------|
| React | 19 | UI |
| TypeScript | 6 | Type safety |
| Vite | 8 | Dev server + bundler |
| Tailwind CSS | 4 | Utility styles |
| Motion | 12 | Animations |
| Lucide React | latest | Icons |
| jsPDF | 2.5 | PDF assembly |
| html-to-image | 1.11 | Slide capture |
