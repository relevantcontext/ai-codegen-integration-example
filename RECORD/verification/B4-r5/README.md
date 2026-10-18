# Verification run — B4-r5 (2026-10-18): dependency mirror, nav alignment

| Check | Result | Output |
|-------|--------|--------|
| `npm test` (grammar wiring 8/8 + 27 unit tests) on the refreshed lockfile | PASS | `unit-tests.txt` |
| eslint | PASS | `eslint.txt` |
| Production build; route smoke + dark capture + in-app pass | PASS | `build-and-smoke.txt`, `screenshots/B4-r5/` |
| Flow check | PASS, 0 page errors | `flow-check.txt` |
| Toggle alignment: link text centre 23 px, icon centre 23.5 px (was 21.5 vs 23.5) | PASS | `toggle-check.txt`, `screenshots/B4-r5/header-toggle.png` |
| `npm audit` | 14 high, 0 critical (from 27 / 4 critical); equals application-shell | — |

Not deployed (Frank's ruling).
