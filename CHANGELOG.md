# Changelog

## 0.1.9

### Polish
- **Tighter radii:** buttons `rounded-md` (6px), cards/media/terminal `rounded-lg` (8px). Dropped soft-blob `xl`/`2xl` chrome that read dated / template-AI.
- Cards hover without bounce translate; chips use md radius instead of full pills.
- **P0 CTA unify:** “快速开始 / Get started” always → `/get-started` (rewrites content `#install`); install band titled “安装”; secondary “查看安装” → `#install`.
- **P0 product proof:** denser ProductShot mocks (higher ink contrast); no polished in-frame title bar (fixes occlusion).

### Visual / multi-product
- **Neutral Product** defaults: zinc floor + indigo signal (override accent to match any product UI).
- New **Ocean** token preset; Midnight retuned to zinc/indigo dark.
- Softer hero atmosphere (mesh bloom, lighter grid); refined MediaFrame, cards, CTAs, step badges.
- Generic visitor placeholders (install → configure → ship) — no vendor-specific laundry.
- Empty default `githubUrl` / secondary CTA — operators set product links.

## 0.1.8

### Fixes
- **MediaRef white-screen (React #31):** `alt` / `caption` are coerced to DOM-safe strings in `ProductShot`, `MediaFrame`, `ShowcaseStrip`, and feature cards. Accidental `{ zh, en }` bags no longer crash the home page.
- **Brand chrome:** Header never forces a missing logo path; text brand when `logo.light` is empty. MediaFrame address pill uses site name (not hard-coded `inkless.run`).

### Visual / IA
- Stronger hero primary CTA (size + shadow); secondary demoted to outline.
- Hero subtitle density tightened (`max-w-md`); peak visuals stay on hero shot + primary CTA.
- Showcase defaults to ≤3 narrative beats (upload / manage / integrate); mobile snap-scroll, desktop staged grid.
- Optional **fact bar** before install (`home.factBar` or theme setting `factBar`).
- Mobile features: at most 3 cards + link to `/features`.

### Docs
- README / PRODUCT.md / DESIGN.md: MediaRef leaf contract, accent override guidance, fact bar, chrome rules.

### Tests
- `resolveMediaText` / `resolveMediaRef` unit tests for bilingual caption/alt safety.
