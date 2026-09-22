# Verification run — A3 (2026-09-22)

Per brief section 6. The POC produces no violation count.

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` (what it checks: see `verification/A0/README.md`) | PASS 8/8 | `check-grammar.txt` |
| eslint (`npm run lint -- src`) | PASS, 0 problems | `eslint.txt` |
| `app.model.json` against `schema/app-model.schema.json` (ajv) | VALID | `schema.txt` |
| Production build (`npm run build`) | PASS (3 webpack bundle-size warnings, no errors) | `build-and-smoke.txt` |
| Route smoke test — 5 nav routes, no console errors / page errors / failed requests; shop and cart routes fetched the live Storefront API | PASS 5/5 | `route-smoke.json` |
| **Behavior Console — declared event and payload** (this stage's receipt) | captured | `behavior-console.txt`, `screenshots/A3/behavior-console*.png`, `console-capture.txt` |
| The A3 diff (src/, `alpha-A2`..`alpha-A3`) | saved | `A3.diff` |

## The receipt

Captured by `RECORD/tools/screenshot.mjs A3 --console` (option (a): development build so the
console loads; the CMS panel and its body class removed from the page; console panel enlarged
for legibility; the filter and Acquire driven by the script). Four frames, two crosses:

1. **Filter.** Selecting the first metal option → `behavior-console-filter-ui.png`:
   `CHANNEL_UI_CHANGE_EVENT`, payload `{ action: "filter", filterKey: "metal" }` from the
   select's dataset → `behavior-console-filter.png`: `CHANNEL_SHOPIFY_CATALOG_EVENT`, the
   complete catalog state with `filters.metal` set, `visibleIds` = one product, `count: 1`.
   The page behind shows "SHOWING: 1 ARCHIVED LOTS".
2. **Add to cart.** Clicking Acquire on the visible tile → `behavior-console-acquire-ui.png`:
   `CHANNEL_UI_CLICK_EVENT`, payload `{ action: "add-to-cart", productId, variantId }` from
   the button's dataset → `behavior-console.png`: `CHANNEL_CART_UPDATED_EVENT` with the
   Shopify `cartId`, `checkoutUrl`, `totalQuantity: 1`, `subtotal: ",200"` and the line —
   the Storefront `cartCreate` round trip completed inside the channel.

Development run, checked by hand (not captured): metal, origin, both and reset filters
(6 → 1 → 0 → 1 → 6 visible; count and select values in sync); Acquire created the cart
(Storefront 200), the tile took `is-in-cart`, the cart id landed in localStorage under
`shopifyAppStorage.shopifyCartId`; the Cart page listed "Iridium Nugget × 1 $4,200",
subtotal $4,200, a live `checkoutUrl`; a reload rehydrated the cart from the saved id.

Cart mutations succeeded with the token's existing scopes (`unauthenticated_read_product_listings`,
`unauthenticated_read_product_inventory`) — the Storefront cart API did not require the
`unauthenticated_write_checkouts` scope named at pinning time.
