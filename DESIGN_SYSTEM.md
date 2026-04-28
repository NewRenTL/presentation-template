# Design System — presentation-template

Based on the **UTEC** (Universidad de Ingeniería y Tecnología, Peru — utec.edu.pe) brand palette,
adapted for dark-mode React slide presentations.

---

## Table of Contents

1. [Brand Origin](#1-brand-origin)
2. [Color Tokens](#2-color-tokens)
3. [Typography](#3-typography)
4. [CSS Utilities](#4-css-utilities)
5. [Animations](#5-animations)
6. [UI Components](#6-ui-components)
7. [Layout Components](#7-layout-components)
8. [Slide Layouts](#8-slide-layouts)
9. [Composition Recipes](#9-composition-recipes)
10. [Rules & Constraints](#10-rules--constraints)

---

## 1. Brand Origin

Colors were extracted directly from the UTEC production CSS (`utec.edu.pe`).

| Color name | Hex | Source usage |
|------------|-----|-------------|
| UTEC Cyan | `#00BFFF` | Primary brand, hover states, gradients — most frequent |
| UTEC Aqua | `#0FF0FF` | Gradient complement, paired with Cyan in hover transitions |
| UTEC Dark | `#231F20` | Near-black for text (adapted as the base for the dark background) |
| UTEC Slate | `#304659` | Dark teal accent, card tints |
| UTEC Gray | `#5F6480` | Muted labels, secondary text |
| Border hint | `#CADAEF` | Pale lavender (used at very low opacity on dark surfaces) |

> UTEC does not use orange, green, or red in their brand palette. The only accent is cyan + aqua.

---

## 2. Color Tokens

Defined in `src/index.css` under `:root`. Reference these names throughout the codebase.

```css
:root {
  /* Backgrounds */
  --color-bg-deep:      #0A1118;   /* Main slide background */
  --color-bg-darker:    #070C12;   /* Deeper layer */
  --color-bg-darkest:   #04070D;   /* Darkest surface */

  /* UTEC brand */
  --color-primary:      #00BFFF;   /* UTEC Cyan — main accent */
  --color-primary-alt:  #0FF0FF;   /* UTEC Aqua — gradient end */
  --color-primary-dark: #0099CC;   /* Darker cyan for hover states */
  --color-slate:        #304659;   /* UTEC Dark Slate */
  --color-gray:         #5F6480;   /* UTEC Muted Gray */

  /* Typography */
  --font-heading: 'Outfit', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

### Color Usage Map

| Role | Value | Notes |
|------|-------|-------|
| Slide background | `#0A1118` | All slides use this as their base |
| Primary accent | `#00BFFF` | Borders, glows, active dots, highlights |
| Gradient end | `#0FF0FF` | Always paired with `#00BFFF` |
| Secondary accent | `#60a5fa` | Blue — for two-tone layouts |
| Tertiary accent | `#7A9BB5` | Slate — lightened `#304659` for readability |
| Body text | `#94a3b8` | Default `<body>` color |
| Muted text | `rgba(255,255,255,0.5)` | Descriptions, sublabels |
| Dimmed text | `rgba(255,255,255,0.35)` | Captions, metadata |
| Card glass bg | `rgba(255,255,255,0.04)` | Glass morphism base |
| Card glass border | `rgba(255,255,255,0.08)` | Glass morphism border |

---

## 3. Typography

### Fonts

| Role | Family | Weights used |
|------|--------|-------------|
| Headings (`h1`–`h6`) | **Outfit** | 300 400 500 600 700 800 900 |
| Body | **Inter** | 400 500 600 |
| Monospace | **JetBrains Mono** | 400 500 |

Loaded via Google Fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900
  &family=Inter:wght@400;500;600
  &family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

### Scale Reference

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Cover title (`h1`) | `64px` | 900 | Outfit |
| Section title (`h2`) | `40–42px` | 700 | Outfit |
| Card title | `16px` | 700 | Outfit |
| Body text | `15px` | 400 | Inter |
| Description | `13–14px` | 400 | Inter |
| Caption / sublabel | `10.5–12px` | 400 | JetBrains Mono |
| Tag / badge | `11px` | 600 | JetBrains Mono |

### Letter Spacing

| Use case | Value |
|----------|-------|
| Display headings | `letter-spacing: -0.025em` |
| Section titles | `letter-spacing: -0.02em` |
| Tag / mono labels | `letter-spacing: 0.12em` |
| Slide counter | `tabular-nums` |

---

## 4. CSS Utilities

All defined in `src/index.css` under `@layer utilities`.

### `.gradient-text`

Applies the UTEC Cyan → Aqua gradient to text.

```css
.gradient-text {
  background: linear-gradient(135deg, #00BFFF 0%, #0FF0FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Usage:
```tsx
<span className="gradient-text">Highlighted word</span>
```

---

### `.glass`

Semi-transparent frosted glass card surface.

```css
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

`.glass-strong` uses slightly higher opacity (`0.06` / `blur(24px)`).

---

### `.card-*` color utilities

Pre-built colored card surfaces. Applied via class name.

| Class | Background | Border |
|-------|-----------|--------|
| `.card-cyan` | `rgba(0,191,255,0.06)` | `rgba(0,191,255,0.18)` |
| `.card-blue` | `rgba(59,130,246,0.06)` | `rgba(59,130,246,0.18)` |
| `.card-slate` | `rgba(48,70,89,0.12)` | `rgba(48,70,89,0.28)` |
| `.card-aqua` | `rgba(15,240,255,0.05)` | `rgba(15,240,255,0.16)` |

---

### `.pulse-glow`

Breathing opacity animation. Used on accent dots and glowing elements.

```css
animation: pulse-glow 2.5s ease-in-out infinite;
/* 0%,100% → opacity:0.6  |  50% → opacity:1 */
```

---

### `.float-orb`

Slow drift animation for ambient background orbs.

```css
animation: mesh-float 20s ease-in-out infinite;
/* Translates ±20–50px and scales ±0.03 over 20s */
```

---

### Font helpers

```css
.font-heading  /* Outfit */
.font-body     /* Inter */
.font-mono     /* JetBrains Mono */
```

---

## 5. Animations

All defined in `src/utils/animations.ts` as Motion `Variants`.

### `slideVariants` — slide transitions

Horizontal slide in/out between presentation slides.

```ts
slideVariants: {
  enter:  x: ±100%, opacity: 0
  center: x: 0, opacity: 1   → duration 0.45s, ease [0.4,0,0.2,1]
  exit:   x: ±100%, opacity: 0 → duration 0.35s
}
```

Usage — applied by `App.tsx` via `<AnimatePresence>`. Do not use inside individual slides.

---

### `fadeIn` — fade up

Standard element entrance. Starts 24px below, fades in.

```ts
hidden:  { opacity: 0, y: 24 }
visible: { opacity: 1, y: 0, duration: 0.55s, ease: [0.22,1,0.36,1] }
```

---

### `fadeInLeft` / `fadeInRight`

Horizontal entrance for two-column layouts.

```ts
fadeInLeft:  hidden x: -32  → visible x: 0
fadeInRight: hidden x: +32  → visible x: 0
/* Same duration and ease as fadeIn */
```

---

### `scaleIn` — scale up

For focal elements (big symbols, summary cards).

```ts
hidden:  { opacity: 0, scale: 0.92 }
visible: { opacity: 1, scale: 1, duration: 0.5s }
```

---

### `stagger` / `staggerFast` — container wrappers

Apply to a parent `motion.div` to cascade children animations.

| Variant | `staggerChildren` | `delayChildren` |
|---------|-------------------|-----------------|
| `stagger` | `0.09s` | `0.1s` |
| `staggerFast` | `0.05s` | `0.05s` |

Pattern for every slide:
```tsx
<motion.div variants={stagger} initial="hidden" animate="visible">
  <motion.div variants={fadeIn}>…</motion.div>
  <motion.div variants={fadeIn}>…</motion.div>
</motion.div>
```

---

## 6. UI Components

All in `src/components/ui/`.

---

### `Card`

Rounded container with UTEC color variants.

```tsx
import Card from '../ui/Card'

<Card variant="cyan" padding="p-5" className="extra-class">
  content
</Card>
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `variant` | `Variant` | `'glass'` | `'glass' \| 'cyan' \| 'blue' \| 'slate' \| 'aqua'` |
| `padding` | `string` | `'p-6'` | Any Tailwind padding class |
| `className` | `string` | `''` | Additional classes |

**Variant backgrounds and borders:**

| Variant | Background | Border |
|---------|-----------|--------|
| `glass` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.08)` |
| `cyan` | `rgba(0,191,255,0.06)` | `rgba(0,191,255,0.18)` |
| `blue` | `rgba(59,130,246,0.06)` | `rgba(59,130,246,0.18)` |
| `slate` | `rgba(48,70,89,0.12)` | `rgba(48,70,89,0.28)` |
| `aqua` | `rgba(15,240,255,0.05)` | `rgba(15,240,255,0.16)` |

---

### `Badge`

Small colored pill label. Use to tag cards, sections, or items.

```tsx
import Badge from '../ui/Badge'

<Badge variant="cyan">Open Source</Badge>
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `variant` | `Variant` | `'cyan'` | `'cyan' \| 'blue' \| 'slate' \| 'aqua' \| 'yellow' \| 'neutral'` |

**Variant colors:**

| Variant | Text color |
|---------|-----------|
| `cyan` | `#00BFFF` |
| `blue` | `#60a5fa` |
| `slate` | `#7A9BB5` |
| `aqua` | `#0FF0FF` |
| `yellow` | `#fbbf24` |
| `neutral` | `rgba(255,255,255,0.6)` |

Size: `11px`, `font-weight: 600`, `font-family: JetBrains Mono`, fully rounded pill.

---

### `Tag`

Monospaced section label with an optional pulsing dot. Place above slide titles.

```tsx
import Tag from '../ui/Tag'

<Tag>01 · Section Name</Tag>
<Tag dot={false}>No dot</Tag>
```

| Prop | Type | Default |
|------|------|---------|
| `dot` | `boolean` | `true` |

Always renders in `#00BFFF` with `rgba(0,191,255,0.08)` background and `rgba(0,191,255,0.22)` border.
Letter spacing: `0.12em` uppercase. Font: JetBrains Mono.

---

### `GlowOrb`

Animated ambient blur circle. Place behind slide content to add depth.
Always use `position: absolute` and wrap the parent in `position: relative`.

```tsx
import GlowOrb from '../ui/GlowOrb'

<GlowOrb color="cyan"  size="lg" opacity={0.07} style={{ top: '-15%', right: '-8%' }} />
<GlowOrb color="blue"  size="md" opacity={0.05} style={{ bottom: '-12%', left: '-6%' }} delay={-5} />
<GlowOrb color="slate" size="sm" opacity={0.06} style={{ top: '40%', left: '10%' }} delay={-10} />
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `color` | `string` | `'cyan'` | `'cyan' \| 'blue' \| 'slate'` |
| `size` | `string` | `'md'` | `'sm' \| 'md' \| 'lg'` |
| `opacity` | `number` | `0.06` | `0.03 – 0.12` |
| `delay` | `number` | `0` | Negative seconds offset the loop phase |
| `style` | `CSSProperties` | `{}` | Absolute positioning |

**Size → dimensions:**

| Size | Width/Height | Blur |
|------|-------------|------|
| `sm` | `300px` | `blur(100px)` |
| `md` | `460px` | `blur(150px)` |
| `lg` | `600px` | `blur(180px)` |

**Color → hex:**

| Color | Hex |
|-------|-----|
| `cyan` | `#00BFFF` |
| `blue` | `#3b82f6` |
| `slate` | `#304659` |

---

### `Layer`

Numbered list item with a UTEC-colored left-border accent.
Best for step-by-step lists, key principles, or feature breakdowns.

```tsx
import Layer from '../ui/Layer'

<Layer number="01" title="Step Title" color="cyan">
  Description text goes here.
</Layer>
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `number` | `string \| number` | — | e.g. `'01'`, `1` |
| `title` | `string` | — | Bold label |
| `color` | `string` | `'cyan'` | `'cyan' \| 'blue' \| 'slate'` |

**Color → accent / number-badge background:**

| Color | Accent | Number bg |
|-------|--------|-----------|
| `cyan` | `#00BFFF` | `rgba(0,191,255,0.12)` |
| `blue` | `#60a5fa` | `rgba(59,130,246,0.12)` |
| `slate` | `#7A9BB5` | `rgba(48,70,89,0.2)` |

Row background: `rgba(255,255,255,0.025)`. Border-left: `2px solid <accent>`.

---

### `FlowDiagram`

Vertical list of nodes connected by gradient arrows. For pipelines, request flows, or sequential processes.

```tsx
import FlowDiagram, { type FlowNodeDef } from '../ui/FlowDiagram'

const nodes: FlowNodeDef[] = [
  { id: 'a', label: 'Step One',   sublabel: 'entry point', color: 'cyan',  icon: <YourIcon />, badge: 'v2' },
  { id: 'b', label: 'Step Two',   sublabel: 'processing',  color: 'blue',  edgeLabel: 'HTTP' },
  { id: 'c', label: 'Step Three', sublabel: 'output',      color: 'slate' },
]

<FlowDiagram nodes={nodes} animate={true} compact={false} />
```

**`FlowNodeDef` fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✓ | Unique key |
| `label` | `string` | ✓ | Main node label |
| `sublabel` | `string` | | Small monospaced subtitle |
| `icon` | `ReactNode` | | Icon shown in a colored square |
| `color` | `NodeColor` | | Node palette |
| `badge` | `string` | | Small pill on the right |
| `edgeLabel` | `string` | | Label on the connector below this node |

**Component props:**

| Prop | Type | Default |
|------|------|---------|
| `animate` | `boolean` | `true` |
| `compact` | `boolean` | `false` — reduces padding and connector height |

**Available colors:** `'cyan' \| 'blue' \| 'slate' \| 'aqua' \| 'neutral'`

**Node palette:**

| Color | Border | Background | Icon bg |
|-------|--------|-----------|---------|
| `cyan` | `#00BFFF` | `rgba(0,191,255,0.08)` | `rgba(0,191,255,0.14)` |
| `blue` | `#60a5fa` | `rgba(59,130,246,0.08)` | `rgba(59,130,246,0.14)` |
| `slate` | `#7A9BB5` | `rgba(48,70,89,0.12)` | `rgba(48,70,89,0.2)` |
| `aqua` | `#0FF0FF` | `rgba(15,240,255,0.06)` | `rgba(15,240,255,0.12)` |
| `neutral` | `rgba(255,255,255,0.18)` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.07)` |

Connectors: gradient line `fromColor → toColor` + chevron arrow `▽`.

---

### `AsciiDiagram`

Monospaced preformatted block. For terminal output, REST calls, or ASCII art diagrams.
The matched `highlight` string renders in `#00BFFF`.

```tsx
import AsciiDiagram from '../ui/AsciiDiagram'

<AsciiDiagram
  label="terminal"
  highlight="200 OK"
  code={`$ curl /api/health\n→ 200 OK\n→ { "status": "up" }`}
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `code` | `string` | ✓ | Newline-separated content |
| `label` | `string` | | Header bar label (uppercase mono) |
| `highlight` | `string` | | Substring that triggers cyan highlight |

Background: `rgba(0,0,0,0.4)`. Font: `JetBrains Mono 12px`. Header color: `rgba(0,191,255,0.6)`.

---

### `CodeBlock`

Syntax-highlighted code with macOS window chrome.
Supports Python and JS/TS keywords out of the box — extend `KEYWORDS` / `BUILTINS` for other languages.

```tsx
import CodeBlock from '../ui/CodeBlock'

<CodeBlock
  code={`async function load() {\n  const data = await fetch('/api')\n  return data.json()\n}`}
  language="typescript"
  fontSize={13}
  showHeader={true}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | — | Source code string |
| `language` | `string` | `'code'` | Label shown in header bar |
| `fontSize` | `number` | `13` | px |
| `showHeader` | `boolean` | `true` | macOS dots + language label |

**Token colors:**

| Token type | Color | Examples |
|-----------|-------|---------|
| `keyword` | `#c792ea` (purple) | `def`, `const`, `async`, `return` |
| `builtin` | `#82aaff` (blue) | `print`, `console`, `Array` |
| `string` | `#c3e88d` (green) | `"hello"`, `` `template` `` |
| `number` | `#f78c6c` (orange) | `42`, `3.14` |
| `comment` | `#637777` (gray) | `# comment`, `// comment` |
| `operator` | `#89DDFF` (light cyan) | `+`, `=`, `=>` |
| `default` | `rgba(255,255,255,0.82)` | identifiers, punctuation |

Background: `rgba(5,9,15,0.75)`. Header bg: `rgba(0,0,0,0.25)`. Window dots: `#f87171 / #fbbf24 / #34d399`.

---

## 7. Layout Components

All in `src/components/layout/`. These are rendered by `App.tsx` and wrap every slide.

---

### `ProgressBar`

Top 3px bar that fills from left to right as slides advance.
Gradient: `#00BFFF → #0FF0FF`. Transition: `500ms ease-out`.

---

### `NavArrows`

Left `‹` and right `›` floating buttons. Disabled state fades to 20% opacity.
Hover: background `rgba(0,191,255,0.1)`, border `rgba(0,191,255,0.35)`, color `#00BFFF`.

---

### `NavDots`

Bottom center pill-shaped navigation dots.
Active dot: `width: 22px`, color `#00BFFF`. Inactive: `width: 6px`, `rgba(255,255,255,0.15)`.
Hover (inactive): `rgba(255,255,255,0.35)`. Tooltip shows the slide `label` from `SLIDES_META`.

---

### `SlideCounter`

Bottom-right fixed counter: `01 / 05`. Font: JetBrains Mono 11px, `rgba(255,255,255,0.2)`.

---

### `PDFExportButton`

Bottom-left floating button. Triggers `usePDFExport` which renders each slide off-screen at
`1280×720` (2× pixel ratio → 2560×1440 capture) and assembles a landscape PDF.

Idle state: `#00BFFF` text, `rgba(0,191,255,0.08)` bg.
Exporting state: shows progress overlay with `#00BFFF → #0FF0FF` progress bar.

> Change the output filename in `src/hooks/usePDFExport.ts` → `pdf.save('your-file.pdf')`.

---

## 8. Slide Layouts

Five ready-to-use layouts in `src/components/slides/`.

### `Slide01Cover` — Centered hero

```
 ┌─────────────────────────────────┐
 │         [Logo / Icon]           │
 │     [Category Tag + dot]        │
 │                                 │
 │   BIG TITLE                     │
 │   Gradient subtitle word        │
 │                                 │
 │   Short punchy subtitle         │
 │                                 │
 │  ┌──────┐ ┌──────┐ ┌──────┐    │
 │  │ Card │ │ Card │ │ Card │    │
 │  └──────┘ └──────┘ └──────┘    │
 │                                 │
 │      [Avatar] Name · Role      │
 └─────────────────────────────────┘
```

Key elements: `GlowOrb ×3`, `Tag`, `h1` (64px/900), subtitle (24px/600), `3-col glass cards`, speaker chip.

---

### `Slide02Content` — Numbered list

```
 ┌─────────────────────────────────┐
 │ [Tag]                           │
 │ Title with gradient word        │
 │                                 │
 │ ▌01  First Key Point            │
 │    description text             │
 │ ▌02  Second Key Point           │
 │    description text             │
 │ ▌03  Third Key Point            │
 │    description text             │
 │ ▌04  Fourth Key Point           │
 │    description text             │
 └─────────────────────────────────┘
```

Key elements: `GlowOrb ×2`, `Tag`, `h2` (42px), `Layer ×4` with alternating colors.

---

### `Slide03Cards` — Feature grid

```
 ┌─────────────────────────────────┐
 │ [Tag]                           │
 │ Title with gradient word        │
 │                                 │
 │  ┌───────┐ ┌───────┐ ┌───────┐ │
 │  │[Badge]│ │[Badge]│ │[Badge]│ │
 │  │ Title │ │ Title │ │ Title │ │
 │  │  desc │ │  desc │ │  desc │ │
 │  │ • pt  │ │ • pt  │ │ • pt  │ │
 │  └───────┘ └───────┘ └───────┘ │
 │ ┌─────────────────────────────┐ │
 │ │ ℹ Summary / key insight    │ │
 │ └─────────────────────────────┘ │
 └─────────────────────────────────┘
```

Key elements: `GlowOrb ×2`, `Tag`, `h2` (42px), `Card ×3` (cyan/blue/slate), summary bar.

---

### `Slide04TwoColumn` — Text + Visual

```
 ┌─────────────────────────────────┐
 │ [Tag]                           │
 │ Title with gradient word        │
 │                                 │
 │  Left col        Right col      │
 │  ─────────────   ───────────    │
 │  Explanation     ┌──────────┐   │
 │  paragraph       │ Step One │   │
 │                  │    ↓     │   │
 │  • Point one     │ Step Two │   │
 │  • Point two     │    ↓     │   │
 │  • Point three   │Step Three│   │
 │                  └──────────┘   │
 │  ┌─ Key takeaway highlight ─┐   │
 │  └───────────────────────────┘  │
 └─────────────────────────────────┘
```

Right column can swap `FlowDiagram` for `CodeBlock` — see comments in the file.

---

### `Slide05Closing` — Q&A / Thank You

```
 ┌─────────────────────────────────┐
 │          [Tag]                  │
 │                                 │
 │        ○ ─── ○                  │
 │       │  ?  │                  │
 │        ○ ─── ○                  │
 │                                 │
 │         Questions?              │
 │    Closing sentence here        │
 │                                 │
 │  GitHub   Slides   Contact      │
 │                                 │
 │  ─────────────────────────────  │
 │  [Avatar] Name · Role           │
 └─────────────────────────────────┘
```

---

## 9. Composition Recipes

### Add a new slide

**1.** Create `src/components/slides/SlideNN.tsx`:

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
          Your title with a <span className="gradient-text">highlight</span>
        </motion.h2>

        {/* content */}
      </motion.div>
    </div>
  )
}
```

**2.** Register in `src/App.tsx`:
```tsx
import SlideNN from './components/slides/SlideNN'
const SLIDES = [..., SlideNN]
```

**3.** Add a label in `src/data/slides.ts`:
```ts
{ id: N, label: 'My Slide', section: 'NN' }
```

---

### Two-column layout

```tsx
<div className="grid grid-cols-2 gap-8 items-start">
  <motion.div variants={fadeInLeft}>
    {/* text column */}
  </motion.div>
  <motion.div variants={fadeInRight}>
    {/* visual column */}
  </motion.div>
</div>
```

---

### Highlight / callout box

```tsx
<div
  className="rounded-xl p-4"
  style={{
    background: 'rgba(0,191,255,0.05)',
    border: '1px solid rgba(0,191,255,0.15)',
  }}
>
  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
    <strong style={{ color: '#00BFFF' }}>Key takeaway:</strong>{' '}
    Your insight here.
  </p>
</div>
```

---

### Summary / info bar

```tsx
<div
  className="rounded-xl p-4 flex items-center gap-3"
  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
>
  <svg width="18" height="18" stroke="#00BFFF" ...>...</svg>
  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
    Summary text.
  </p>
</div>
```

---

### Speaker chip / footer

```tsx
<div
  className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
>
  <img src="/avatar.jpg" className="w-9 h-9 rounded-full object-cover" />
  <div className="text-left">
    <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
      Full Name
    </div>
    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
      Role · Company
    </div>
  </div>
</div>
```

---

## 10. Rules & Constraints

| Rule | Reason |
|------|--------|
| **Never use `#48D1B2`** (Reescala teal) | That is the previous company's brand color, not UTEC's |
| **Primary accent is always `#00BFFF`** | Single source of truth — do not hardcode `rgba(72,209,178,…)` |
| **Gradient always pairs `#00BFFF → #0FF0FF`** | These are the two UTEC cyan tones; never mix with other gradients |
| **Wrap every slide in `stagger` + `fadeIn`** | Consistent entrance animations across the deck |
| **All slides are `1280×720` (16:9)** | Required by the PDF export renderer |
| **PDF export background is `#0A1118`** | Match the slide background exactly or orbs shift |
| **GlowOrb always uses `pointer-events-none`** | Built into the component — never override |
| **`z-index` hierarchy: orbs `z-0`, content `z-10`, chrome `z-50`, PDF frame `z-150`, overlay `z-200`** | Defined by `App.tsx` — respect this stack |
