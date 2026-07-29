# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** End visitors of sites that use this theme—people evaluating or adopting the software product being marketed (typically OSS or SaaS). Their job on first visit is to understand what the product is, what it can do, and how to start (docs, install, GitHub).

**Secondary (not the success lens of surfaces):** Inkless site operators who choose and configure the theme, and host integrators who register the package against `@inkless/theme-host`. They supply content, branding, and CTAs; visitor persuasion remains the surface outcome.

## Product Purpose

`@inkless/theme-product-first` is an Inkless CMS first-party theme that turns a hosted site into a **software product landing**, not a corporate consulting site and not a personal blog.

It provides hard-coded product pages (home, features, contact), product-oriented chrome (header CTAs for Docs / GitHub / primary action, minimal footer), and design tokens suited to product marketing. Content and CTAs are supplied by the host (global config, theme settings, optional `/public/content/home`); the theme owns presentation and information architecture.

**Success:** A visitor can quickly grasp the product, scan capabilities, and take a clear next step (install, docs, or repository)—without the site feeling like a blog index or agency brochure.

## Positioning

**Product landing, not blog or corporate.** Neighboring Inkless themes (e.g. blog-first, corporate-classic) own different site jobs. This theme owns software-product IA: hero with product shot, capability cards, how-it-works, install / quick-start, and conversion CTAs. That job boundary is the durable claim; generic marketing templates and other Inkless themes should not be treated as interchangeable with it.

## Operating Context

- Runs inside **Inkless CMS** via the theme host contract (`@inkless/theme-host`, `contractVersion: "1"`).
- Distributed as a package (`product-first` theme id) with UMD/ESM builds for remote registration and a TypeScript source entry for built-in host registration.
- Operators configure brand mark mode, docs URL, GitHub URL, primary CTA, and token overrides in admin; home sections may be driven by host content config.
- Locale-aware copy (zh / en fields and host locale mode) is part of normal operation.
- Docs live on an **external** URL only (`docsUrl` setting); changelog/blog, when enabled, is host Features → blog, not this package.
- Development in this repo: `pnpm type-check`, `pnpm test`, `pnpm build`—no standalone site preview server in-package; runtime APIs come from `window.InklessThemeHost` / host shared globals (React is a peer, not bundled).

## Capabilities and Constraints

**Shipped surfaces (theme package):**

| Slug | Role |
|------|------|
| `/` | Product landing (hero, showcase, capabilities, how-it-works, install, bottom CTA) |
| `/features` | Capability catalog aligned with shipped product narrative |
| `/get-started` | First-success path (steps, install craft, checklist) — class C |
| `/use-cases` | Scenario map for product / blog / team / agents — class C |
| `/agents` | Agent collaboration principles + CLI craft — class C |
| `/contact` | Contact / community links from branding and theme settings |

**Chrome & system:** sticky product header with Docs/GitHub/primary CTA utilities; minimal footer; layout `contentProfile: wide`, `maxWidth: 72rem`; default + Midnight token presets; shared UI primitives (buttons, cards, product shot, showcase strip, media frame).

**Hard constraints:**

- Theme id `product-first`; host contract version `1`; keep lockstep with host `THEME_CONTRACT_VERSION` / `inkless.theme.json`.
- Do not bundle React; use host peer dependencies and host APIs.
- Preserve pages home / features / get-started / use-cases / agents / contact and product-oriented chrome behavior unless product scope explicitly expands.
- Content, SEO defaults, branding, and many CTAs are host-owned; theme must degrade gracefully with placeholders when config is empty.
- Tags/intent: product, landing, oss/saas—not blog-first or corporate consulting presentation.

**Open (not decided in init):** exact WCAG evaluation process in CI; which host monorepo design doc paths remain canonical beyond this package; any future pages beyond the three above.

## Brand Commitments

- Package / theme name: **Product First** / 产品优先 (`product-first`).
- Author attribution: Inkless CMS; repository under the Inkless first-party theme set.
- Token defaults in code align with Inkless product mark accent (`#2563eb`) and ink neutrals—**product, not consulting teal**.
- Bilingual zh/en naming and copy patterns are expected.
- No separate consumer brand for the theme package itself; sites inject their own identity via host branding.

## Evidence on Hand

- This repository: page implementations, chrome, tokens, settings schema, tests (`resolveProductCtas`), README, `inkless.theme.json`, built `dist/` artifacts.
- Placeholder feature/step copy and polished media placeholders when host content is absent.
- Features page copy claims alignment with shipped Inkless capabilities (not roadmap vapor); treat host monorepo as source of truth if claims diverge.
- Default GitHub setting points at `https://github.com/yixian-huang/inkless`.
- Host monorepo design note referenced by README (`docs/design-product-first-theme.md`)—external to this package.

**Do not fabricate** for future design work: customer logos, testimonials, metrics, pricing, licensing claims beyond what host/product policy states, or “docs” content that only exists as an empty `docsUrl`.

## Product Principles

1. **Visitor job first** — Every surface optimizes for product understanding and a clear next step, not content browsing or agency storytelling.
2. **Own product IA** — Hero, capabilities, workflow, install, and CTAs stay the spine; do not drift into blog or corporate patterns.
3. **Host is source of truth** — Content, brand, and links come from Inkless config; the theme presents, never invents proof or product claims.
4. **Contract-stable packaging** — Theme id, contract version, peer React, and register paths stay reliable for operators and integrators.
5. **Bilingual by default** — zh/en is a normal operating mode, not an afterthought.

## Accessibility & Inclusion

Target **WCAG 2.2 Level AA** for theme-owned UI. No additional product-specific inclusion requirements (e.g. specialized audiences) were established beyond that standard and ordinary host/good-practice expectations (focus visibility, semantic structure, locale-aware text).
