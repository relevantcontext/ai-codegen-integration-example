# Verification run — A4 (2026-09-22)

Per brief section 6. The POC produces no violation count. Acceptance for A4 (record brief):
declared connections and existing functionality preserved — the A3 wiring still works.

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` (what it checks: see `verification/A0/README.md`) | PASS 8/8 | `check-grammar.txt` |
| eslint (`npm run lint -- src`) | PASS, 0 problems | `eslint.txt` |
| `app.model.json` against `schema/app-model.schema.json` (ajv) | VALID | `schema.txt` |
| Production build (`npm run build`) | PASS (3 webpack bundle-size warnings, no errors) | `build-and-smoke.txt` (and `build-and-smoke.pre-sale.txt`: the same run before the store had sale prices — no regression with no sale data) |
| Route smoke test — 5 nav routes as full loads | PASS 5/5 | `route-smoke.json` |
| In-app navigation pass — 8 route swaps | PASS | `route-smoke.json` → `inAppNavigation` |
| Behavior Console — A3's two crosses recaptured on the evolved code | captured; `CHANNEL_SHOPIFY_CATALOG_EVENT` now carries `isOnSale: true` and `sale.compareAtPrice` for two products; `CHANNEL_CART_UPDATED_EVENT` unchanged | `behavior-console.txt`, `screenshots/A4/behavior-console*.png` |
| The A4 diff (`alpha-A3-r2`..`alpha-A4`, src/) | saved, 107 lines | `A4.diff` |

Catalog capture `screenshots/A4/shop.png`: Iridium Nugget "$4,200 ~~$4,800~~" and Osmium Bead
"$5,600 ~~$6,200~~" in the accent colour; the other four tiles unchanged.

Input: `inputs/A4-shopify-products.json` — the catalog re-pinned after `shopify-seed.mjs --sale`
(run from Frank's terminal) set compare-at prices on two variants; the export query now asks for
`compareAtPrice`.
