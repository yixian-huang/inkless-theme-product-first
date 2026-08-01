---
name: Product First
description: Multi-product software landing — quiet product floor, zinc neutrals, indigo signal
colors:
  primary: "#18181b"
  primary-dark: "#09090b"
  accent: "#4f46e5"
  accent-hover: "#4338ca"
  surface: "#ffffff"
  surface-alt: "#fafafa"
  on-primary: "#fafafa"
  on-surface: "#18181b"
  on-surface-muted: "#71717a"
  border: "#e4e4e7"
  terminal-chrome: "#0c0f14"
  terminal-body: "#0c0f14"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.1rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-lg:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.125rem, 2vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.14em"
  mono:
    fontFamily: "ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
rounded:
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.5rem"
  "2xl": "0.75rem"
  full: "9999px"
spacing:
  content-padding: "1.5rem"
  content-gap: "2rem"
  section: "5rem"
  section-y-md: "5rem"
  section-y-lg: "6rem"
  card-padding: "1.5rem"
  card-padding-md: "1.75rem"
  shell-x: "1rem"
  shell-x-md: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
    typography: "{typography.title}"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-muted}"
    padding: "0.5rem"
  button-header-cta:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
  button-on-primary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "1.25rem"
  chip-eyebrow:
    backgroundColor: "color-mix(in srgb, #2563eb 10%, transparent)"
    textColor: "{colors.accent}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
  media-frame:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.2xl}"
  code-block:
    backgroundColor: "{colors.terminal-body}"
    textColor: "#f1f5f9"
    rounded: "{rounded.xl}"
    padding: "1.25rem"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.sm}"
    padding: "0.375rem 0.625rem"
---

# Design System: Product First

## Overview

**Creative North Star: "The Product Showcase Floor"**

This system is a clean, wide product floor: the software itself is the exhibit. Chrome, type, and color step back so product shots, capability cards, and install CTAs can carry conviction. Surfaces feel like a polished showroom floor—ample width (`72rem`), calm neutrals, and deliberate rhythm—never a blog stream or an agency storyboard.

The atmosphere is **evidence-first with light tech texture**. Real (or CSS-mocked) product UI is the proof. Hero may use a faint grid and soft accent bloom; subsequent bands stay quieter, alternating `surface` / `surface-alt` with hairline borders. Personality is confident and product-forward: solid ink CTAs, cards that lift on hover, media frames that float as the visual anchor.

Default tokens ship as **Neutral Product**—zinc primary (`#18181b`) + indigo signal (`#4f46e5`), intentionally **not** tied to a single vendor brand. Hosts override `accent` / `primary` to match real product UI. System UI sans is the house face; mono appears only in install/terminal craft. Presets: **Neutral Product**, **Ocean** (slate + sky), **Midnight** (dark zinc).

**Key Characteristics:**
- Product-as-proof: screenshots and UI mocks lead; illustration does not replace product truth
- Wide, sectioned landing floor with sticky product chrome
- Zinc primary + scarce indigo signal; hybrid flat/tonal base with soft lift on media and hover
- System sans hierarchy; mono reserved for install/terminal
- Signature craft: browser `MediaFrame`, staggered showcase strip, terminal install block

## Colors

Near-black zinc for primary action and inverted bands; one indigo accent as a scarce signal; cool zinc neutrals for surfaces, type, and borders.

### Primary
- **Zinc Near-Black** (`#18181b`): Primary buttons, step badges, inverted bottom CTA band. Deepens to **Zinc Black** (`#09090b`) on hover / `primaryDark`.
- **On Primary** (`#fafafa`): Text and icons on ink surfaces.

### Secondary
- **Indigo Signal** (`#4f46e5`): Eyebrows, section labels, icon wells, hover borders, sparse gradient blooms. Hover to **Indigo Deep** (`#4338ca`). Never the default page fill. Override freely to product brand.

### Neutral
- **Surface** (`#ffffff`): Default page and card canvas.
- **Surface Alt** (`#fafafa`): Alternating bands, header chrome wash, media chrome bars, footer wash.
- **On Surface** (`#18181b`): Primary body/headline text on light surfaces.
- **On Surface Muted** (`#71717a`): Leads, meta, quiet links, captions.
- **Border** (`#e4e4e7`): Section rules, card edges, header/footer hairlines (often at `/60`–`/80` opacity).
- **Terminal Chrome / Body** (`#0c0f14`): Install window chrome and code block—console craft, not general UI dark mode.

### Named Rules
**The Signal Accent Rule.** Accent is a signal, not a surface. Use it for labels, sparse fills (`accent/8`–`/12`), focus rings, and small marks—never as a full-viewport background or dominant card fill.

**The Multi-Product Neutral Rule.** Defaults stay vendor-agnostic (zinc + indigo). Align accent to product screenshots via host token overrides; do not hardcode customer brand colors in theme source.

## Typography

**Display Font:** System UI sans (`ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif`)  
**Body Font:** Same system sans stack  
**Label/Mono Font:** System mono (`ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace`)

**Character:** One family for marketing chrome—semibolds with tight tracking for product authority; no display serif, no geometric “startup” webfont dependency. Mono is a craft accent for install only.

### Hierarchy
- **Display** (600, ~2.25–3.1rem, 1.15, tight tracking): Hero H1 only.
- **Headline** (600, ~1.875–2.25rem / `text-3xl`–`text-4xl`, tight): Section titles and bottom CTA titles.
- **Title** (600, 1rem, tight): Card titles, feature titles, brand mark label, footer site name.
- **Body** (400, 1rem, relaxed): Card descriptions, contact rows, general copy.
- **Body large** (400, ~1rem–1.125rem on hero, ~1.125–1.25rem for section leads, relaxed): Hero subtitle stays short (≈2 lines Chinese, `max-w-md`) so H1 + primary CTA dominate; section leads may use ~max ~42rem.
- **Label** (600, 0.75rem, 0.14em tracking, uppercase): Section eyebrows (`text-accent`) and quieter showcase titles (`text-on-surface-muted`).
- **Mono** (400, ~13–14px, relaxed): Install code blocks only.

### Named Rules
**The One Stack Rule.** Stay on system sans + system mono. Do not introduce decorative webfonts for “premium” marketing polish unless the host token presets explicitly override.

**The Mono is Install Rule.** Monospace appears in the terminal/install craft—not in nav, cards, or hero headlines.

## Layout

Wide product floor: host layout profile `contentProfile: wide` with **max width `72rem`**. Horizontal shell padding is `1rem` mobile, token content padding (`1.5rem` / `md:px-content`) on larger breakpoints. Section vertical rhythm is generous: roughly `4–5rem` mobile, `5–6rem` desktop (`py-16`–`py-28` patterns), with token `sectionSpacing: 5rem` as the system target.

**Spatial model:**
- Sticky header; page bands stack full-bleed with inner max-width shell (`ProductPageShell`).
- Hero: 12-column mental model—copy `5/12`, product shot `7/12` from `lg` up; single column stacked on small screens.
- Capability grids: 1 → 2 (`md`) → 3 (`lg`) columns; gap ~`1.25–1.5rem`.
- How-it-works: three equal columns from `md`.
- Install: 4/8 split (copy / terminal) from `md`.
- Contact: narrow shell (`max-w-2xl`) for focus.
- Footer: 3-column product/resources grid from `sm`.

**Density:** Marketing-comfortable, not dashboard-dense. Cards get `1.5–1.75rem` internal padding; lists stay short and scannable.

### Named Rules
**The Wide Floor Rule.** Prefer the `72rem` product measure. Do not collapse the system to a narrow blog column for primary landing sections.

## Elevation & Depth

**Hybrid depth:** most of the floor is flat or tonal—surface alternation, 1px borders, and soft backdrop on the header. True shadows and rings concentrate on **product media**, **hovering cards**, and **terminal craft**. Hero may add a large soft accent radial and a masked grid; these are atmosphere, not structural elevation.

### Shadow Vocabulary
- **Card rest** (`shadow-sm` + very soft `shadow-on-surface/[0.03]`): Default capability/contact cards.
- **Card hover** (`shadow-lg` + `shadow-accent/10`, slight `-translate-y-0.5`): Engagement lift; optional accent hairline on top edge.
- **Media elevated** (`shadow-2xl shadow-on-surface/10` + `ring-1 ring-black/[0.04]`): Primary product shot frames.
- **Media quiet** (`shadow-md shadow-on-surface/5`): Secondary showcase frames.
- **Terminal** (`shadow-xl shadow-on-surface/5`): Install window container.
- **Step badge** (`shadow-md shadow-primary/20`): Numbered how-it-works marks.
- **Header** (`bg-white/85` + `backdrop-blur-xl`, border): Glass stickiness, not a drop shadow.

### Named Rules
**The Flat-By-Default Rule.** Surfaces rest flat or tonal. Borrow elevation for product media and interactive hover—not for every box on the page.

## Shapes

Form language is **tight modern product**: modest radii (Linear / system-UI scale), not soft-blob SaaS or 0-radius brutalism.

- **Buttons / small controls:** `0.375rem` / `rounded-md`.
- **Token radius baseline:** `0.5rem` layout `borderRadius`.
- **Cards, media frames, contact rows, terminal outer:** `0.5rem` / `rounded-lg`.
- **Icon wells / chips:** `rounded-md` (not full pills except true status dots).
- **Borders:** cool zinc hairlines; accent borders as hover/signal only.
- **Media viewport aspect:** `16/10` inside browser chrome.
- **Traffic-light dots:** macOS-ish red/amber/green on media and terminal chrome (signature craft).

### Named Rules
**The Tight Radius Rule.** Prefer `md`–`lg` (6–8px) on buttons and cards. Avoid `xl`/`2xl` marketing blobs and full-pill chrome on every chip—both read dated / template-AI.

## Components

Components are **confident and product-forward**: solid ink primary actions, quiet secondary paths, and media frames as the permanent visual anchor.

### Buttons
- **Shape:** Tight `rounded-md` (6px).
- **Primary:** Near-black fill, on-primary text, `text-sm` semibold, `px-5 py-2.5`, light primary shadow; hover deepens to primary-dark; active scales to `0.99`; focus-visible accent outline.
- **Secondary:** Surface / outline, on-surface text, border; demoted vs primary.
- **Ghost:** No chrome; muted text → on-surface; tertiary paths.
- **Header CTA:** Compact primary (`px-3 py-1.5`) in sticky utilities.
- **On-primary (inverted band):** Surface fill on ink band; outline ghost for secondary.

### Chips
- **Eyebrow / badge:** `rounded-md` (not full pill), thin border, compact padding.

### Cards / Containers
- **Corner:** `rounded-lg` (8px).
- **Background:** Surface on default bands.
- **Border:** `border-border/80`.
- **Shadow:** Rest almost flat; hover only border + soft shadow (no bounce translate).
- **Padding:** `1.25rem`–`1.5rem`.
- **Icon well:** ~`2.25rem` square, `rounded-md`, hairline border + quiet fill.

### Inputs / Fields
- No first-class form field system in this package. Closest patterns: terminal code block (read-only) and media frame URL chrome (display only). Prefer host form primitives if admin/settings ever surface here.

### Navigation
- **Header:** Sticky, translucent white + backdrop blur, bottom hairline; brand mark (logo or text) left; nav + Docs/GitHub quiet links + primary CTA right (`md+`).
- **Links:** Muted `text-sm`, hover on-surface / surface-alt chip background.
- **Footer:** Minimal three-column product/resources + copyright + powered-by; uppercase micro labels.

### MediaFrame (signature)
- Browser chrome bar with traffic lights + **site-name / identity address pill** (never a hard-coded host domain; neutral `app` fallback).
- `16/10` content stage; elevated shadow by default.
- Holds real images or `ProductShot` CSS UI mock (accent-token silhouette). Caption/alt are string-coerced at render so accidental Localized bags cannot white-screen the page.

### ShowcaseStrip (signature)
- Up to **three** narrative shots (upload / manage / integrate story, not a 5-up gallery); empty state still shows polished mocks.
- Mobile: horizontal snap scroll; desktop: staged 3-col grid with middle item slightly scaled/upshifted.

### Fact bar (optional)
- Narrow strip between workflow and install: version · license · single binary (or product-specific facts).
- Driven by home content `factBar.items` or theme setting `factBar`; **omitted when empty**.

### Install / Terminal (signature)
- Dark chrome header with traffic lights + “terminal” label; mono code body; outer `rounded-2xl` on light floor.

### Section header pattern
- Accent uppercase label → headline title → optional muted lead. Reused on home and features.

### Contact row
- Full-width soft card link: label (uppercase micro) + value; hover accent border/text and light accent shadow.

## Do's and Don'ts

### Do:
- **Do** lead key sections with product evidence (real shot or polished UI mock inside `MediaFrame`).
- **Do** keep CTAs scannable: one solid primary path, secondary outline/ghost, optional Docs/GitHub as quiet utilities.
- **Do** alternate surface / surface-alt bands with hairline borders for rhythm without heavy shadows.
- **Do** preserve bilingual (zh/en) layout resilience: allow wrap, avoid fixed English-only widths on labels.
- **Do** use brand blue sparingly as signal (labels, icons, focus, small fills).
- **Do** respect host tokens: colors/fonts/layout may be overridden in admin—compose with CSS variables / semantic roles when available.
- **Do** keep MediaRef leaves (`url` / `alt` / `caption`) as plain strings; coerce at render if a Localized bag slips in.
- **Do** align accent with the real product UI via host token overrides when screenshots would clash with default blue.

### Don't:
- **Don't** lock the theme to a single customer brand in source; use tokens and host content for product identity.
- **Don't** replace the hero/product stage with decorative illustration as the main visual proof.
- **Don't** restructure the home spine into a blog-style long-form or post-list architecture.
- **Don't** flood the viewport with accent blue backgrounds; blue stays scarce.
- **Don't** invent testimonials, customer logos, metrics, or docs content the host did not supply.
- **Don't** introduce decorative display webfonts or drop system mono from install craft without an explicit token-preset decision.
- **Don't** apply dashboard-dense spacing or sharp 0-radius chrome to this marketing floor.
- **Don't** put Localized `{ zh, en }` bags on MediaRef `alt` / `caption` (copy fields elsewhere may be bilingual; media leaves must not).
- **Don't** hardcode product domains or lockup SVG paths that may 404; use site identity and BrandMark fallbacks.
