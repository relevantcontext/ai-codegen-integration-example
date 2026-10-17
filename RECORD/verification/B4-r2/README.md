# Verification run — B4-r2 (2026-10-17): Shopify's answer applied

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs`, eslint | PASS | `check-grammar.txt`, `eslint.txt` |
| Production build; route smoke + dark capture + in-app pass | PASS | `build-and-smoke.txt`, `route-smoke.json`, `screenshots/B4-r2/` |
| Flow check | PASS, 0 page errors | `flow-check.txt` |
| Cart page: password hint visible with the unlock link (new tab); checkout link = Shopify's `checkoutUrl` unchanged | checked on the production build | `cart-page.txt` |
| Live after redeploy | see `../B4-r2-live/` | |

Test order through the hosted checkout (Bogus Gateway, card `1`) after unlocking the store in the
same browser: Frank's step; expected to appear in the admin's Orders.
