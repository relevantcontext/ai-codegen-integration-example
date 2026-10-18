# Verification run — B4-r6 (2026-10-18): unlock flow refined

| Check | Result | Output |
|-------|--------|--------|
| eslint | PASS | `eslint.txt` |
| Production build; route smoke + dark capture + in-app pass | PASS | `build-and-smoke.txt`, `screenshots/B4-r6/` |
| Flow check (reads the checkout button's dataset) | PASS, 0 page errors | `flow-check.txt` |
| Unlock branch, stubbed (`window.open`, `form.submit`, the window's `location` captured; nothing sent): one window, one form to `/password` with `form_type`, `utf8`, `password`, `return_to`, then the hand-off to `checkoutUrl` | PASS | `unlock-branch-stubbed.txt` |

Frank's test: private window on localhost:8082 → add → cart → Proceed to checkout. If Shopify
honours `return_to`, the new window goes from "Opening checkout…" to the checkout with no store
home in between; if not, the home page shows for about a second before the hand-off.
