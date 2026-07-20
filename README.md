# @inkless/theme-product-first

Inkless **product-first** theme: software product landing (hero, capabilities, install CTA), not a corporate consulting site and not a personal blog.

| | |
|--|--|
| Theme id | `product-first` |
| Contract | `1` (`@inkless/theme-host`) |
| Layout | `contentProfile: wide`, `maxWidth: 72rem` |
| Docs | External URL only (`docsUrl` theme setting) |

Design: see host monorepo `docs/design-product-first-theme.md`.

## Develop

```bash
pnpm install
pnpm type-check
pnpm test
pnpm build   # dist/theme.umd.js + theme.es.js
```

Runtime host APIs come from `window.InklessThemeHost` / `@inkless/theme-host` (do not bundle React).

## Host integration

```ts
import { productFirstTheme } from "@inkless/theme-product-first";
themeManager.registerBuiltIn(productFirstTheme);
```

pnpm dependency example:

```json
"@inkless/theme-product-first": "github:yixian-huang/inkless-theme-product-first#main"
```

## Pages

| Slug | Role |
|------|------|
| `/` | Product landing |
| `/features` | Capabilities |
| `/contact` | Contact / community links |

Changelog uses host **Features → blog** (`/blog`) when enabled — not part of this package.

## License

Same as Inkless CMS project policy for first-party themes.
