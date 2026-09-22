# Verification run — B0-r2 (2026-09-22)

Per brief section 6. The POC produces no violation count.

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` | PASS 8/8 | `check-grammar.txt` |
| eslint | PASS, 0 problems | `eslint.txt` |
| `app.model.json` against the schema (ajv) | VALID | `schema.txt` |
| Production build | PASS | `build-and-smoke.txt` |
| Route smoke — 5 full loads (nav order now `/`, `/shop`, `/cart`, `/about`, `/about/contact`) + in-app pass | PASS | `route-smoke.json` |
| Behavior Console — A3's crosses recaptured | captured | `behavior-console.txt`, `screenshots/B0-r2/behavior-console*.png` |
| Flow check (`b0-flow-check.mjs`) | PASS, 0 page errors | `flow-check.txt` |
| Diff (`beta-B0`..`beta-B0-r2`, src/) | saved, 483 lines | `B0-r2.diff` |

## Why `beta-B0-r2`

After confirming B0, Frank (a) removed the shop page's duplicate section title through the
CMS, (b) asked for the About link to be the last nav item via the route config, and (c) updated
the Figma frame's typeface and section background (`prompts/B0-2.md`). Tags never move:
`beta-B0` stands; this is the code state B3 builds on.

- (a) is a **content change through the CMS**, as the brief prescribes for copy — not a code
  exception. The CMS adapter wrote `app.model.json` back as a single line and blanked
  `uiProps.fontFamilyStr` (a value nothing in the app reads; CMS side effect, noted). The file
  was re-indented for diff legibility; content untouched.
- (b) `config.channels.ROUTE.routes.routePath` order in `src/index.js`: home, shop, cart, about.
  The nav renders from `navLinks`, which derive from that order — no nav code changed.
- (c) Frame v2 pinned as `inputs/B0-figma-catalog-v2.md` + `.png`: typeface Inter throughout
  (Bold product names, Semi Bold eyebrow/price/button, Medium filter values, Regular otherwise),
  section background `#091725`; everything else as before. Inter 400/500/600/700 self-hosted
  from `@fontsource/inter` 5.3.0 (OFL); DM Serif Text, Geist and Geist Mono files and licences
  removed as no longer referenced.
