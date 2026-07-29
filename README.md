# @inkless/theme-product-first

Inkless **product-first** theme: software product landing (hero, capabilities, install CTA, product guides), not a corporate consulting site and not a personal blog.

| | |
|--|--|
| Theme id | `product-first` |
| Contract | `1` (`@inkless/theme-host`) |
| Package version | `0.1.7` |
| Layout | `contentProfile: wide`, `maxWidth: 72rem` |
| Docs | External URL only (`docsUrl` theme setting) |

Design: host monorepo `docs/design-product-first-theme.md` · boundary ADR `docs/adr/0002-theme-host-boundary.md` (appendices A–E).

---

## Audience

**Primary visitors:** people evaluating or adopting the software product (OSS / SaaS)—understand what it is, what it can do, how to start.

**Operators:** site admins who activate the theme, set brand/CTAs/docs, and optionally publish content schema for hardcode pages.

**Not for:** agency brochure IA or personal-blog-first reading sites (use other official themes).

---

## Routes / pages (class C primary IA)

These are **theme `pages[]`** hardcode routes (ADR-0002 class **C**). They seed with the theme and own product-site shape + presentation.

| Path | contentKey | Role |
|------|------------|------|
| `/` | `home` | Product landing |
| `/features` | `features` | Capability catalog |
| `/get-started` | `get-started` | First-success path (steps, install, checklist) |
| `/use-cases` | `use-cases` | Scenario map |
| `/agents` | `agents` | Agent collaboration principles + CLI craft |
| `/contact` | `contact` | Contact / community links |

**Header / footer** include the primary product guides (Get started, Use cases, For agents) alongside Home, Features, and Contact. Default primary CTA href is `/get-started`.

### Extension surface (class D)

| Path | Owner | Expectation |
|------|--------|-------------|
| `/p/*` | Host unified pages + sections | **Extension** (policies, campaigns, one-offs). Usable with Host baseline sections; **does not guarantee** brand parity with theme hardcode pages. Prefer `pf-*` theme sections if a D page must look product-native. |
| `/blog`, `/blog/:slug` | Host Features → blog | Optional changelog |
| Long-form engineering docs | External `docsUrl` | Coexists with in-site product guides |

Dogfood sites that still use `/p/get-started` etc. should migrate nav to theme routes after pinning this package (Host follow-up below).

---

## Default Features

Theme **responds** to Host Features; it does not invent capabilities.

| Feature | Default intent for product sites |
|---------|----------------------------------|
| Identity / brand / SEO | On — required for product chrome |
| `publicPages.blog` | Optional off until changelog content exists |
| Corporate enterprise page matrix | Off — not registered by this theme |
| Unified `/p/*` | Available as extension; not a substitute for class-C product guides |

---

## Content schema (optional, empty-degrades)

Hardcode pages may load instance config from Host:

```http
GET /public/content/{contentKey}
```

| contentKey | Shape (conceptual) | Empty behavior |
|------------|--------------------|----------------|
| `home` | hero, showcase, features, howItWorks, install, bottomCta | Identity + neutral placeholders |
| `get-started` | hero, steps, install, checklist, next, bottomCta | Neutral steps / checklist / install default |
| `use-cases` | hero, scenarios, bottomCta | Neutral scenario map |
| `agents` | hero, principles, cli, bottomCta | Neutral principles + sample CLI |
| `features` / `contact` | mostly static presentation + settings/branding | Branding / theme settings |

**Iron rule 3:** placeholders are short, neutral, bilingual. Final brand marketing copy must come from content schema / site config / identity—not as the only source hard-coded in the theme package.

Localized fields use `{ zh?, en? }`. Install/CLI code blocks are plain strings.

---

## Develop

```bash
pnpm install
pnpm type-check
pnpm test
pnpm build   # dist/theme.umd.js + theme.es.js
```

Host live-dev (from Inkless monorepo):

```bash
THEME_PRODUCT_FIRST_PATH=../inkless-theme-product-first pnpm -C frontend dev
# or: pnpm dev:theme-product-first
```

Runtime host APIs come from `window.InklessThemeHost` / `@inkless/theme-host` (do not bundle React).

---

## Host integration

```ts
import { productFirstTheme } from "@inkless/theme-product-first";
themeManager.registerBuiltIn(productFirstTheme);
```

pnpm dependency example (prefer **pinned commit** for dogfood):

```json
"@inkless/theme-product-first": "github:yixian-huang/inkless-theme-product-first#<git-sha>"
```

### Host monorepo follow-up checklist

After publishing a pin of this package:

1. Bump `frontend` dependency to the new git sha / tag.
2. Update `backend/internal/builtinthemes/pages.json` → `product-first` entries so activation seed includes `get-started`, `use-cases`, `agents` (slugs + contentKeys + navConfig aligned with `pages[]` above).
3. Keep `builtinThemePages` contract tests green (frontend pages ↔ backend seed).
4. Dogfood (e.g. inkless.run): switch primary nav from `/p/get-started|use-cases|agents` to theme routes; optional 301 or unpublish old D pages once verified.
5. Optionally publish content documents for the new contentKeys (or leave empty for placeholders).
6. Marketplace UMD release path if used (`marketplace/v1/themes/product-first/...`).

**Not done in this theme repo:** Host deploy of three sites, ops nav cutover, or `/p/*` migration.

---

## License

Same as Inkless CMS project policy for first-party themes.
