# Verification run — B3-r4 (2026-09-22): light mode from Figma, redeployed

Per brief section 6. The POC produces no violation count.

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` | PASS 8/8 | `check-grammar.txt` |
| eslint | PASS | `eslint.txt` |
| Production build | PASS | `build-and-smoke.txt` |
| Route smoke — 5 full loads + **shop in the other scheme** (theme toggle → `shop-dark.png`, new capture) + in-app pass | PASS | `route-smoke.json`, `screenshots/B3-r4/` |
| Flow check | PASS, 0 page errors | `flow-check.txt` |
| Live at https://justmetu.com after sync + invalidation `IDBKAYU80DOJPRCPJ3UTJC7CRH` (completed 14:03): same smoke incl. the dark capture, flow check | PASS, 0 errors | `../B3-r4-live/`, `screenshots/B3-r4-live/` |

## What changed

Frank added a light-mode frame in Figma (node `28:2`, pinned as `inputs/B3-figma-catalog-light.*`;
`get_variable_defs` returned none — the modes are two frames). The catalog had been dark in both
of the app's colour schemes since A1-r2; it now follows the app's theme toggle: the light frame's
values are the defaults (the app's default scheme is light) and the dark frame's values apply under
`[data-theme='dark']`. Diff: one file, `_products.scss` (+49/−18).

Light values as drawn: section `#f0f4f8`, text `#111827`, muted `#6b7280`, borders/dot `#d1d5db`,
cards and filter boxes white, image container `#f3f4f6`; the eyebrow, mass and footnote take the
muted colour where the dark frame uses the accent; the Acquire button is unchanged in both.
Two values the light frame does not draw were inferred: the sale price in light mode uses the text
colour (the accent on white would not meet contrast), and the select popup's option text follows the
light text colour.
