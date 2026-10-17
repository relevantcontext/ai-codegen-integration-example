# Verification run — B4 (2026-10-17): follow-ups after the live deploy

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` | PASS 8/8 | `check-grammar.txt` |
| eslint | PASS | `eslint.txt` |
| Production build; route smoke — 5 full loads + shop dark capture + in-app pass | PASS | `build-and-smoke.txt`, `route-smoke.json`, `screenshots/B4/` |
| Flow check | PASS, 0 page errors | `flow-check.txt` |
| Cart page: test-mode notice shown (config `testMode: true`); checkout link = `https://asteroid-metals.myshopify.com/password?return_to=%2Fcart%2Fc%2F…` | checked in a headless run of the production build | (this README) |
| Live after redeploy | see `../B4-live/` | |

Not verifiable by CC: whether Shopify's password page honours `return_to` (needs the password);
whether the gateway is in test mode (admin setting). Both are Frank's.
