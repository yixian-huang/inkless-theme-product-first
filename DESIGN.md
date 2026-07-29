---
name: Product First
description: Inkless product-landing theme — product as proof, ink neutrals, brand-blue signals
colors:
  primary: "#0f172a"
  primary-dark: "#020617"
  accent: "#2563eb"
  accent-hover: "#1d4ed8"
  surface: "#ffffff"
  surface-alt: "#f8fafc"
  on-primary: "#f8fafc"
  on-surface: "#0f172a"
  on-surface-muted: "#64748b"
  border: "#e2e8f0"
  terminal-chrome: "#0a0f1a"
  terminal-body: "#0c1222"
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
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "0.75rem"
  "2xl": "1rem"
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
    backgroundColor: "{colors.surface}"
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
    padding: "0.375rem 0.875rem"
  button-on-primary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.5rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.2xl}"
    padding: "1.5rem"
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

Default tokens ship as **Near-Black Product + Brand Blue**—slate-ink primaries aligned with the Inkless mark accent (`#2563eb`), explicitly not consulting teal. System UI sans is the house face; mono appears only in install/terminal craft. A **Midnight** token preset inverts the floor for dark product sites without changing structure or components.

**Key Characteristics:**
- Product-as-proof: screenshots and UI mocks lead; illustration does not replace product truth
- Wide, sectioned landing floor with sticky product chrome
- Ink primary + scarce brand-blue signal; hybrid flat/tonal base with lift on media and hover
- System sans hierarchy; mono reserved for install/terminal
- Signature craft: browser `MediaFrame`, staggered showcase strip, terminal install block

## Colors

Near-black product ink for primary action and inverted bands; one brand blue as a scarce signal; cool slate neutrals for surfaces, type, and borders.

### Primary
- **Near-Black Product** (`#0f172a`): Primary buttons, step badges, inverted bottom CTA band, high-emphasis text pairing with on-primary. Deepens to **Ink Black** (`#020617`) on hover / `primaryDark`.
- **On Primary** (`#f8fafc`): Text and icons on ink surfaces.

### Secondary
- **Brand Blue** (`#2563eb`): Inkless mark-aligned accent—eyebrows, section labels, icon wells, hover borders, sparse gradient blooms. Hover to **Brand Blue Deep** (`#1d4ed8`). Never the default page fill.

### Neutral
- **Surface** (`#ffffff`): Default page and card canvas.
- **Surface Alt** (`#f8fafc`): Alternating bands, header chrome wash, media chrome bars, footer wash.
- **On Surface** (`#0f172a`): Primary body/headline text on light surfaces.
- **On Surface Muted** (`#64748b`): Leads, meta, quiet links, captions.
- **Border** (`#e2e8f0`): Section rules, card edges, header/footer hairlines (often at `/70`–`/80` opacity).
- **Terminal Chrome / Body** (`#0a0f1a` / `#0c1222`): Install window chrome and code block—console craft, not general UI dark mode.

### Named Rules
**The Signal Blue Rule.** Brand blue is a signal, not a surface. Use it for labels, sparse fills (`accent/10`), focus rings, and small marks—never as a full-viewport background or dominant card fill.

**The No Consulting Teal Rule.** Keep primary in ink slate and accent in mark blue. Do not re-skin the system toward teal, warm agency orange, or purple SaaS clichés.

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
- **Body large** (400, ~1.125–1.25rem, relaxed): Hero subtitle and section leads (~max ~42rem for leads).
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

Form language is **soft product modern**: continuous rounded rectangles, never sharp enterprise corners or playful blobs as structure.

- **Buttons / small controls:** gently rounded (`0.5rem` / `rounded-lg`).
- **Token radius baseline:** `0.75rem` layout `borderRadius`.
- **Cards, media frames, contact rows, terminal outer:** larger soft corners (`1rem` / `rounded-2xl`).
- **Icon wells:** `rounded-xl` (~`0.75rem`).
- **Pills / eyebrows / step-adjacent chips:** full pill (`rounded-full`).
- **Borders:** cool slate hairlines; accent borders appear as hover/signal only (`border-accent/20`–`/40`).
- **Media viewport aspect:** `16/10` inside browser chrome.
- **Traffic-light dots:** literal macOS-ish red/amber/green on media and terminal chrome (signature craft, not a general color token).

### Named Rules
**The Soft Product Radius Rule.** Prefer `lg`–`2xl` radii for marketing surfaces. Avoid 0-radius “engineering brutalism” and oversized 2rem+ blob cards.

## Components

Components are **confident and product-forward**: solid ink primary actions, quiet secondary paths, and media frames as the permanent visual anchor.

### Buttons
- **Shape:** Medium soft corners (`0.5rem`).
- **Primary:** Near-black fill, on-primary text, `text-sm` semibold, `px-5 py-2.5`, light primary-tinted shadow; hover deepens to primary-dark; active scales to `0.98`; focus-visible accent outline.
- **Secondary:** Surface fill, on-surface text, border; hover surface-alt.
- **Ghost:** No chrome; muted text → on-surface; used for tertiary paths (e.g. Features).
- **Header CTA:** Compact primary (`px-3.5 py-1.5`) in sticky utilities.
- **On-primary (inverted band):** Surface fill on ink band for primary action; ghost outline variant for GitHub/docs on the same band.

### Chips
- **Eyebrow chip:** Pill, `accent/10` fill, `accent/20` border, accent text, uppercase/tracking optional via adjacent label system.
- **Badge chip:** Pill, surface-alt + border, muted text (version/status style).

### Cards / Containers
- **Corner:** `rounded-2xl`.
- **Background:** Surface on default bands.
- **Border:** `border-border/80`.
- **Shadow:** Rest small; hover lift + optional top accent gradient line.
- **Padding:** `1.5rem`–`1.75rem`.
- **Icon well:** `2.5rem` square, `rounded-xl`, `accent/10` with accent glyph (◇ ▣ ◎ etc. when no media).

### Inputs / Fields
- No first-class form field system in this package. Closest patterns: terminal code block (read-only) and media frame URL chrome (display only). Prefer host form primitives if admin/settings ever surface here.

### Navigation
- **Header:** Sticky, translucent white + backdrop blur, bottom hairline; brand mark (logo or text) left; nav + Docs/GitHub quiet links + primary CTA right (`md+`).
- **Links:** Muted `text-sm`, hover on-surface / surface-alt chip background.
- **Footer:** Minimal three-column product/resources + copyright + powered-by; uppercase micro labels.

### MediaFrame (signature)
- Browser chrome bar with traffic lights + fake `inkless.run` address pill.
- `16/10` content stage; elevated shadow by default.
- Holds real images or `ProductShot` CSS UI mock (ink + brand blue silhouette admin).

### ShowcaseStrip (signature)
- Up to three product shots; empty state still shows polished mocks.
- Middle item slightly scaled/upshifted on `md+` for depth staging.

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

### Don't:
- **Don't** recolor the system toward consulting teal, warm agency orange, or generic purple SaaS gradients as primary identity.
- **Don't** replace the hero/product stage with decorative illustration as the main visual proof.
- **Don't** restructure the home spine into a blog-style long-form or post-list architecture.
- **Don't** flood the viewport with accent blue backgrounds; blue stays scarce.
- **Don't** invent testimonials, customer logos, metrics, or docs content the host did not supply.
- **Don't** introduce decorative display webfonts or drop system mono from install craft without an explicit token-preset decision.
- **Don't** apply dashboard-dense spacing or sharp 0-radius chrome to this marketing floor.
