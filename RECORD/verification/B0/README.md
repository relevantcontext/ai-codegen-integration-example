# Verification run — B0 (2026-09-22)

Per brief section 6. The POC produces no violation count.

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` | PASS 8/8 | `check-grammar.txt` |
| eslint (`npm run lint -- src`) | PASS, 0 problems | `eslint.txt` |
| `app.model.json` against the schema (ajv) | VALID | `schema.txt` |
| Production build | PASS (3 bundle-size warnings, no errors) | `build-and-smoke.txt` |
| Route smoke test — 5 full loads + in-app pass (8 route swaps) | PASS | `route-smoke.json` |
| Behavior Console — A3's two crosses recaptured on the B0 code | captured | `behavior-console.txt`, `screenshots/B0/behavior-console*.png` |
| **Flow check (new, `RECORD/tools/b0-flow-check.mjs`)** — production build driven headlessly: tab title; Acquire's accessible name; struck price's screen-reader prefix; Acquire states `Adding…` (busy, disabled) → `Added` → resting with the in-cart mark; nav badge count + accessible name; Cart page lines with increment / decrement (disabled at 1) / remove; subtotal; empty state; contact submit label bound; footer | PASS, 0 page errors | `flow-check.txt` |
| **CMS editability inventory (new)** — development build with the CMS plugin on, every `spyne-cms-item` under `main#app` per route | `/` 14 · `/shop` 9 · `/about` 15 · `/about/contact` 11 · `/cart` 13 editable strings | `cms-editable-keys.json` |
| CMS click-through | partial — see below | `screenshots/B0/cms-click-eyebrow.png` |
| The B0 diff (`alpha-A4`..`beta-B0`, src/) | saved, 679 lines | `B0.diff` |

## CMS click-through

The inventory is the proof that the authored strings are CMS-editable: on the shop page the
CMS wraps `headline`, `subheadline`, `eyebrow`, `title`, `subtitle`, both filter labels,
`showingLabel` and `footnoteText`; on the cart page the cart's `title`, `subtitle`,
`emptyText`, `subtotalLabel`, `checkoutLabel`; on the contact page the form's `title`,
`subtitle`, field labels, `messageLabel` and the newly bound `submitLabel`. Product tiles are
not wrapped — their text is channel data (Shopify), which is correct.

A programmatic click on the eyebrow's CMS hitbox produced no visible selection in the panel
(`cms-click-eyebrow.png` shows the panel at its root). The interactive edit — click a string,
change it in the panel, watch the page — is left to Frank's copy review in a visible browser,
which the brief assigns to him anyway; the record does not claim it here.

Two probes read `/about/contact` as 0 items during a same-context route walk; fresh-context
reads at 1.5 s and 6 s both gave 11. Recorded as a CMS timing observation, not an app fault.
