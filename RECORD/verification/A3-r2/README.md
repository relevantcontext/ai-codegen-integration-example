# Verification run — A3-r2 (2026-09-22)

Per brief section 6. The POC produces no violation count.

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` (what it checks: see `verification/A0/README.md`) | PASS 8/8 | `check-grammar.txt` |
| eslint (`npm run lint -- src`) | PASS, 0 problems | `eslint.txt` |
| `app.model.json` against `schema/app-model.schema.json` (ajv) | VALID | `schema.txt` |
| Production build (`npm run build`) | PASS (3 webpack bundle-size warnings, no errors) | `build-and-smoke.txt` |
| Route smoke test — 5 nav routes as full loads, no console errors / page errors / failed requests | PASS 5/5 | `route-smoke.json` |
| **In-app navigation pass (new at r2)** — one session, every nav link clicked in order, twice (8 route swaps), no console errors / page errors / failed requests | PASS | `route-smoke.json` → `inAppNavigation` |
| Behavior Console — declared event and payload (the stage's receipt, recaptured) | captured | `behavior-console.txt`, `screenshots/A3-r2/behavior-console*.png` |
| Diffs | saved | `A3.diff` (`alpha-A2`..`alpha-A3-r2`, src/), `A3-r2-fix.diff` (`alpha-A3`..`alpha-A3-r2`, src/) |

## Why `alpha-A3-r2`

Frank, testing `alpha-A3` by hand, hit six uncaught errors on in-app navigation to the shop
page (`Cannot read properties of undefined (reading 'addedChannels')` at
`ProductTileItem.addChannel`). Cause: A2's design rendered six *fallback* tiles from the
catalog's birth data, expecting them to retire when the channel's Shopify catalog arrived.
When the shop page mounts after that catalog already exists (Cart → Shop), `CHANNEL_SHOPIFY`
replays synchronously inside each fallback tile's own subscription setup; the tile's listener
disposes the view mid-`addChannel`, and the framework then touches the disposed view's props.
The page recovered visually (the Shopify tiles rendered), which is why the stage's full-load
smoke test never saw it.

Fix (the grammar's sanctioned form, `skip-replayed-birth-event`): tiles are only ever born
from a catalog event — the channel now serves the app-model products as the fallback catalog
the moment the model arrives, so the view never renders tiles from birth data — and each tile
subscribes with `['CHANNEL_SHOPIFY', true]`, skipping the replay of the event that spawned it;
its visibility under that event rides its birth data (`isVisible`). Cart membership still
replays plainly (a class toggle, not a disposal). Model-written from Frank's report; counted
as one human correction. Tags never move: `alpha-A3` stands; the clean A3 is `alpha-A3-r2`.

The smoke test gained the in-app pass so this class of fault is caught by the record from
now on.

## Development run, by hand (not captured)

Full load of /shop: 6 tiles from the channel (`source=shopify`), in-cart mark present. Filter
Osmium → 1 visible. Cart → Shop → Cart → Shop in-app: filter (Osmium, 1 visible) and in-cart
mark preserved, 6 tiles each time, no new console errors.
