---
target: 首页
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-07-29T06-03-16Z
slug: src-pages-home-tsx
---
# Critique: Product First homepage (`src/pages/home.tsx` / http://localhost:3001/)

**Mode:** Persuade · **Method:** dual-agent · **Run:** second critique after P0+P1 fixes

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Sectioning clear; locale “EN” cryptic; terminal has no copy/progress feedback |
| 2 | Match System / Real World | 2 | Still ops/theme-id jargon (artifact/compose, product-first names, npc deploy comments) |
| 3 | User Control and Freedom | 3 | Easy nav; mobile utilities missing (header CTAs hidden) |
| 4 | Consistency and Standards | 2 | Get started vs 快速开始; EN footer on zh page; blue logo vs teal accent |
| 5 | Error Prevention | 3 | isSameHref CTA dedupe + docsUrl filter; host install comments still mislead |
| 6 | Recognition Rather Than Recall | 3 | Labeled mocks 编辑器/主题/发布; section eyebrows aid scan |
| 7 | Flexibility and Efficiency | n/a | Persuade landing — not power-user UI |
| 8 | Aesthetic and Minimalist Design | 3 | Strong craft restraint; silhouette frames still pad without real proof |
| 9 | Error Recovery | 2 | Empty docs → README only; few interactive error paths |
| 10 | Help and Documentation | n/a | External docs pattern; live docsUrl empty |
| **Total** | | **21/32** | **Acceptable (~66%)** |

Prior run: **16/32** → **+5**.

## Design Specificity Verdict

**LLM:** Product showroom floor craft is coherent (MediaFrame, staggered/snap showcase, terminal, ink CTAs, accent-token mocks). Still reads “polished template” without real product screenshots — placeholders perform product, don’t prove it.

**CLI:** 2 advisories only (`design-system-font-size` header 15px, footer 11px). home/ui core clean.

**Browser:** Overlay injection succeeded (15 boxes). Solid signals: white-on-teal 2.5:1, text-occlusion on mock title. Likely FP / intentional: kicker×3 (DESIGN section pattern), ai-color-palette teal brand, elevated card shadows, hero grid/halo.

## Overall Impression

Craft and conversion hygiene improved; **persuasion close and real proof still mid-band**. Install caption/jargon filter and CTA dedupe landed; peak-end still “view source,” operator install comments remain, mobile chrome lacks conversion utilities.

## What's Working

1. Signature product floor craft (MediaFrame + terminal + hybrid elevation) holds North Star.
2. Showcase differentiation + mobile snap strip landed (编辑器/主题/发布).
3. Host teal token discipline + readable accent mix for labels; CTA twin suppression works when primary=GitHub.

## Priority Issues

### [P0] Peak-end CTA is the wrong close
- Bottom primary is 「查看源码」→ GitHub only; Persuade should reaffirm install/start.
- **Fix:** Prefer #install / host primary as closer; GitHub as ghost when distinct.
- **Command:** `/impeccable clarify` or `/impeccable distill`

### [P1] Operator jargon still on visitor path
- Install comments (`npc deploy`); How-it-works artifact/compose; capability theme-id laundry list.
- **Fix:** Scrub host comment lines; visitor-safe outcome copy.
- **Command:** `/impeccable clarify`

### [P1] Mobile sticky chrome loses conversion utilities
- ProductHeaderCtas `hidden md:flex`; drawer is pages only.
- **Command:** `/impeccable adapt` (or harden)

### [P2] Product-as-proof still silhouette theater
- Differentiated mocks help; need real media or richer labeled mocks.
- **Command:** `/impeccable bolder` / host media

### [P3] Locale consistency (zh page, EN chrome/footer)
- **Command:** `/impeccable polish` / clarify chrome

## Persona Red Flags

- **Jordan:** Silhouettes → vapor risk; close is source not trial.
- **Casey:** Install defers via comments; no single crisp path when host partial code wins.
- **Riley:** Blue logo vs teal marks; EN footer on zh; template-y frames.
- **OSS visitor:** Empty docsUrl; theme-id copy; ops jargon without requirements beat.

## Minor Observations

- Hero ghost 能力 duplicates nav; no terminal copy button; MediaFrame hardcodes inkless.run; mock title occlusion (detector).

## Questions to Consider

1. If silhouettes stay forever, is this a product theme or a chrome theme?
2. Why is the last click “view source” after a terminal?
3. Is install for clone-and-run developers or npc operators?
4. Is mobile sticky header a conversion tool or a brand sticker?

## Delta vs prior fixes

| Fix | Landed? |
|-----|---------|
| Install caption / docsUrl filter | Yes |
| Install code body scrub | Partial (host git line keeps comment-heavy block) |
| CTA isSameHref dedupe | Yes (bottom twin gone); density still multi-GitHub |
| Showcase variants + mobile snap | Yes |
| Accent-token mocks | Yes |
| Readable accent mix | Yes |
