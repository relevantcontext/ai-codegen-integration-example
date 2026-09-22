# Verification run — A1-r2 (2026-09-21)

Per brief section 6. The POC produces no violation count.

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` (what it checks: see `verification/A0/README.md`) | PASS 8/8 | `check-grammar.txt` |
| eslint (`npm run lint -- src`) | PASS, 0 problems | `eslint.txt` |
| `app.model.json` against `schema/app-model.schema.json` (ajv) | VALID | `schema.txt` |
| Production build (`npm run build`) | PASS (3 webpack bundle-size warnings, no errors); the three typefaces and six Figma images are in `dist/assets/static/` | `build-and-smoke.txt` |
| Route smoke test — 5 nav routes, no console errors / page errors / failed requests | PASS 5/5 | `route-smoke.json` |
| Behavior Console event + payload | n/a before A3 | — |

Development run (CMS + Behavior Console loaded, not captured): `document.fonts.check`
true for DM Serif Text, Geist, Geist Mono, none failed; catalog wrapper background
rgb(8,8,10), tile rgb(17,17,21), button rgb(212,195,163)/rgb(8,8,10); first tile image
`figma-iridium-crystal-node.jpg` loaded at 1024px; chevron asset resolved. Four 404s
appeared in the dev console: the CMS adapter's `:52931/registry/lookup`, during Frank's
restart of the CMS mid-check — dev tooling, not the app; the production smoke run recorded
no failed requests.

Catalog states: `screenshots/A0/shop.png` (generated) → `screenshots/A1/shop.png`
(tokens, app fonts, Pexels) → `screenshots/A1-r2/shop.png` (Figma styles and images).
