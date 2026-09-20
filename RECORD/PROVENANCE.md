# PROVENANCE — one line per artifact

Format: artifact — what it is — origin — model / prompt / version — stage.

## Material (never counted as output)

- `spyne` 0.26.7 — framework — npm — A0
- `@spynejs/grammar` 0.3.1 (stackVersion v50-r11) — grammar — npm — A0
- `spyne-cli` 0.6.8 (installed; package.json range ^0.6.2) — CLI that ran `create-app` — npm — A0
- `@spynejs/cms` ^0.4.11, `@spynejs/cms-adapter` ^0.1.6, `spyne-plugin-console` ^0.5.5 — CMS and Behavior Console plugins — npm — A0
- Application Shell — `src/index.js` and shell files vendored from spynejs/application-shell by the generator — A0

## A0 — baseline

- Entire repo at `alpha-A0` (appId ns9ev5evqvcd) — generated app "Asteroid Metals Co." — `npx spyne-cli create-app` from prompt `prompts/A0-1.md` — generator model: not captured — A0
- All A0 content (copy, product data in `src/static/data/app.model.json`) — model-authored by the create-app run — prompt `prompts/A0-1.md` — A0
- Product images, six, Pexels stock, license permits use, no attribution required — **placeholder, to be replaced by generated images in beta (B1)** — resolved by the generator; attribution in `image-manifest.json` — A0
  - `imgs/pexels-35497189.jpeg` — products row 0 — James Lee
  - `imgs/pexels-10187646.jpeg` — products row 1 — Ron Lach
  - `imgs/pexels-35497314.jpeg` — products row 2 — James Lee
  - `imgs/pexels-9259962.jpeg` — products row 3 — Jess Loiterton
  - `imgs/pexels-4198921.jpeg` — products row 4 — Magda Ehlers
  - `imgs/pexels-28215401.jpeg` — products row 5 — Nic Wood
- Page images, five, Pexels stock, same terms — home `pexels-15826216`, shop `pexels-6129873`, about `pexels-30596894` + `pexels-8442265`, cart `pexels-34221998` — resolved by the generator — A0
- Other files in `src/static/imgs/` not listed in `image-manifest.json` — Shell material shipped by the generator — A0

## Tooling (exempt from all-code-is-AI)

- `RECORD/tools/screenshot.mjs` — stage screenshots + route smoke test — written by Claude Code (claude-fable-5-1) from the record brief v1, 2026-09-20 — A0
  - Builds production and serves `dist/`, so dev plugins never load; full-page captures at a 1280×800 viewport.
  - Route source: navLinks is a runtime CHANNEL_ROUTE payload, not a key in `app.model.json`, and is not reachable from outside the production bundle; the script reads the hrefs from the nav the app renders from navLinks. Nothing is hard-coded.
- `RECORD/tools/package.json` + `package-lock.json` — Playwright 1.62.1 (pinned to the Chromium build already cached on the capture machine) — tooling — A0
- `RECORD/screenshots/A0/*.png` — five routes, captured by the script — A0
