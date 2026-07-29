---
target: 首页
total_score: 16
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
timestamp: 2026-07-29T05-50-11Z
slug: src-pages-home-tsx
---
# Critique: Product First homepage (`src/pages/home.tsx` / http://localhost:3001/)

**Mode:** Persuade · **Method:** dual-agent

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No version/status; install path doesn’t signal “this works” |
| 2 | Match System / Real World | 1 | Visitor-facing `docsUrl`; EN chrome on ZH story; teal vs brand-blue mock |
| 3 | User Control and Freedom | 3 | In-page nav + GitHub; EN toggle on desktop; mobile menu ok |
| 4 | Consistency and Standards | 1 | Get started vs 快速开始; footer EN; showcase EN; accent teal vs mock blue |
| 5 | Error Prevention | 2 | Dual bottom CTAs same URL; non-actionable install |
| 6 | Recognition Rather Than Recall | 3 | Section labels + numbered steps support scan |
| 7 | Flexibility and Efficiency | n/a | Persuade landing — not multi-path power-user UI |
| 8 | Aesthetic and Minimalist Design | 2 | Restrained floor; redundant media strip + duplicate CTAs add noise |
| 9 | Error Recovery | 2 | Image→mock ok; no recovery for missing docs/install |
| 10 | Help and Documentation | n/a | Persuade external-docs pattern; live site has zero docs entry points |
| **Total** | | **16/32** | **Acceptable (50%)** |

## Design Specificity Verdict

**LLM assessment:** Structure and primitives are product-first (MediaFrame, ShowcaseStrip, terminal install, inverted band). Live host tokens + empty media make the page read as a **generic OSS CMS template**: host accent teal `#14b8a6` vs hardcoded mock blue `#2563eb`; four near-identical wireframes; bilingual chrome split.

**Deterministic scan (CLI):** 5 advisories all `design-system-font-size` — ProductHeader 15px, ProductFooter 11px, MediaFrame/ProductShot 10px. `home.tsx` alone clean.

**Browser detector:** Overlay injection succeeded (24 log hits). Solid: undersized `inkless.run` 10px, teal-on-white ~2.5:1 contrast, thin-border+wide-shadow. Likely FP / intentional per DESIGN: kicker-above-heading ×3, section grid bloom, nested mock panels.

## Overall Impression

Architecture is right for product landing; **live persuasion fails** at proof, brand signal, install/docs rails, locale chrome, and a hollow peak-end.

## What's Working

1. Product IA spine + signature craft (browser frame, staggered strip, terminal, inverted CTA band).
2. Hero hierarchy and mobile stacked CTAs with focus-visible / motion-reduce polish.
3. Graceful empty media → polished CSS mock instead of broken images.

## Priority Issues

### [P0] Install + docs path fails visitor job
- **Why:** Visitor success needs docs/install/GitHub. Terminal is comments; caption exposes operator `docsUrl`; no Docs link.
- **Fix:** Real install one-liner or host content; visitor-facing caption; surface Docs when real URL exists.
- **Suggested command:** `/impeccable clarify` (install + CTA copy) + `/impeccable harden` (empty docs/install states)

### [P0] Brand signal is teal, not Inkless blue (host vs design contract)
- **Why:** Live `--color-accent: #14b8a6` paints labels/chip; mocks stay `#2563eb`. Violates No Consulting Teal; contrast fails AA on labels.
- **Fix:** Align host default/theme registration to mark blue; drive ProductUiMock off semantic accent tokens.
- **Suggested command:** `/impeccable colorize` (restore Signal Blue) + host token alignment

### [P1] Bottom CTA is a GitHub twin
- **Why:** 「查看源码」 and 「GitHub」 both open the same repo URL — failed peak-end.
- **Fix:** Deduplicate when primary equals githubUrl; prefer install/docs secondary.
- **Suggested command:** `/impeccable distill` (CTA set) or `/impeccable polish` bottom band

### [P1] Showcase is proof theater without proof
- **Why:** Three identical mocks + EN labels; ~1000px mobile cost with low information gain.
- **Fix:** Real media or differentiated mocks + localized titles; mobile collapse/snap.
- **Suggested command:** `/impeccable layout` showcase + `/impeccable adapt` mobile

### [P2] Locale consistency (chrome, footer, CTAs, showcase)
- **Why:** ZH body vs EN Get started / Product / Editor labels; language toggle missing on mobile.
- **Fix:** Localize chrome/footer/showcase placeholders; mobile language control.
- **Suggested command:** `/impeccable clarify` + `/impeccable harden` i18n

### [P2] Mobile sticky chrome omits conversion utilities
- **Why:** Header CTAs `hidden md:flex`; mobile menu = pages only.
- **Fix:** Primary + GitHub/Docs in mobile drawer or compact utility bar.
- **Suggested command:** `/impeccable adapt` ProductHeader

## Persona Red Flags

**Jordan (First-Timer):** Install is English comments + `docsUrl` jargon; wireframe “proof” undermines trust; mixed language feels unfinished.

**Casey (Distracted Mobile):** Long triple MediaFrame stack; sticky header has no Get started; dual GitHub at end.

**Riley (Stress Tester):** Twin CTAs same URL; no Docs; EN toggle not on mobile; teal vs blue token clash; `#install` doesn’t start anything runnable.

**OSS/SaaS product visitor (PRODUCT primary):** Capabilities/workflow ok; install/docs path broken; showcase doesn’t show three product outcomes.

## Minor Observations

- Empty hero badge slot (version / 开源·自托管 opportunity).
- MediaFrame URL 10px (CLI + browser agree undersized).
- Header `variant="blog"` may affect mobile utilities behavior.
- Soft grid + host teal bloom can read “AI SaaS template.”

## Questions to Consider

1. Without docsUrl and real hero/showcase media, is the theme still honest about product-as-proof?
2. Should product-first refuse consulting teal when host tokens violate brand commitment?
3. Is a three-frame identical showcase worth ~1000px of mobile scroll?
4. When primary and GitHub resolve to the same URL, is dual buttons a feature or a conversion bug?
