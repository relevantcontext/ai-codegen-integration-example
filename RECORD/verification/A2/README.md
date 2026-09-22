# Verification run — A2 (2026-09-22)

Per brief section 6. The POC produces no violation count.

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` (what it checks: see `verification/A0/README.md`) | PASS 8/8 | `check-grammar.txt` |
| eslint (`npm run lint -- src`) | PASS, 0 problems | `eslint.txt` |
| `app.model.json` against `schema/app-model.schema.json` (ajv) | VALID | `schema.txt` |
| Production build (`npm run build`) | PASS (3 webpack bundle-size warnings, no errors) | `build-and-smoke.txt` |
| Route smoke test — 5 nav routes, no console errors / page errors / failed requests. The shop route fetched the live Storefront API during capture. | PASS 5/5 | `route-smoke.json` |
| Behavior Console event + payload | n/a before A3 | — |

Development run (CMS + Behavior Console loaded, not captured), shop page:
- With the placeholder token: Storefront request 401 → `CHANNEL_FETCH_SHOPIFY_ERROR_EVENT` →
  `CHANNEL_SHOPIFY_ERROR_EVENT`; catalog root `data-catalog-source="fallback"`, 6 tiles
  `data-source="fallback"` (the app.model.json products), filter options and count derived.
- With the real token: Storefront request 200 in 153 ms → `CHANNEL_SHOPIFY_CATALOG_EVENT`;
  catalog root `data-catalog-source="shopify"`, 6 tiles all `data-source="shopify"` (fallback
  tiles retired, no duplicates), Shopify's title order, variant ids on the Acquire buttons,
  Figma images merged by product id, prices "$4,200", masses "2.3g" (Shopify's `5` renders
  "5g" where the local data said "5.0g").
- The selects and Acquire buttons broadcast into CHANNEL_UI with their datasets; no listener
  yet — A3.

Catalog states: `screenshots/A1-r2/shop.png` (local data) → `screenshots/A2/shop.png` (Shopify-fed).
