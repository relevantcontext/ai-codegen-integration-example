# Verification run — B4-r3 (2026-10-17): unlock on checkout

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs`, eslint | PASS | `check-grammar.txt`, `eslint.txt` |
| Production build; route smoke + dark capture + in-app pass | PASS | `build-and-smoke.txt`, `screenshots/B4-r3/` |
| Flow check | PASS, 0 page errors | `flow-check.txt` |
| Checkout click wiring, stubbed (`window.open`, `form.submit`, navigation captured; no password in this build, so the handler takes the plain-navigation branch) | see `checkout-click.txt` | |

Not run by CC: the unlock branch itself (it submits the storefront password to Shopify). Frank
runs it after `shopify-config.mjs` has copied `SHOPIFY_STOREFRONT_PASSWORD` into the config:
Proceed to checkout should open a new window that lands on Shopify's checkout directly.
