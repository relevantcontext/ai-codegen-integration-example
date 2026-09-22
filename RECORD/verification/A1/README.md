# Verification run — A1 (2026-09-21)

Per brief section 6. The POC produces no violation count.

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` (what it checks: see `verification/A0/README.md`) | PASS 8/8 | `check-grammar.txt` |
| eslint (`npm run lint -- src`) | PASS, 0 problems | `eslint.txt` |
| `app.model.json` against `schema/app-model.schema.json` (ajv) | VALID | `schema.txt` |
| Production build (`npm run build`) | PASS (3 webpack bundle-size warnings, no errors) | `build-and-smoke.txt` |
| Route smoke test — 5 nav routes, no console errors / page errors / failed requests | PASS 5/5 | `route-smoke.json` |
| Behavior Console event + payload | n/a before A3 | — |

Also checked in a development run (CMS + Behavior Console loaded, not captured): the
catalog renders under CMS-proxified data; both selects carry the derived option lists
(6 metals, 6 origins); tiles carry `data-product-id`, `data-metal`, `data-origin`; the
button carries `data-action="add-to-cart"` and `data-product-id`; no console errors.

Catalog before/after: `screenshots/A0/shop.png` → `screenshots/A1/shop.png`.
