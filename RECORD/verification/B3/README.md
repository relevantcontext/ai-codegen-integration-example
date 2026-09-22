# Verification run — B3 (2026-09-22)

Per brief section 6. The POC produces no violation count. (This README was written at
`beta-B3-r3`: the shell chain that should have written it at `beta-B3` broke on an earlier
step, and the r2 record edits aborted on the missing file — recorded here rather than by
moving a tag.)

## Local, on the cleaned production build

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` | PASS 8/8 | `check-grammar.txt` |
| eslint | PASS | `eslint.txt` |
| `app.model.json` against the schema | VALID | `schema.txt` |
| `npm test` (grammar wiring + 27 unit tests) | PASS | `unit-tests.txt` |
| Production build | PASS | `build-and-smoke.txt` |
| Route smoke — 5 full loads + in-app pass | PASS | `route-smoke.json` |
| Behavior Console — A3's crosses | captured | `behavior-console.txt`, `screenshots/B3/` |
| Flow check | PASS, 0 page errors | `flow-check.txt` |

## Live — see `../B3-live/`

Deployed URL: **https://justmetu.com** (CloudFront distribution `E1YHBPGAEXA3TQ`, origin bucket
`justmetu.com`). First verified at the distribution URL `https://dvlyqetb9espg.cloudfront.net`
(`beta-B3`), then at the domain after the DNS change (`beta-B3-r2`); `B3-live/` holds the
domain run.

| Check | Result | Output |
|-------|--------|--------|
| Route smoke against the live URL — 5 full loads (SPA rewrites: `/shop`, `/about/contact` → 200 `text/html`) + in-app pass | PASS | `B3-live/smoke.txt`, `route-smoke.json`, `screenshots/B3-live/` |
| Flow check against the live URL — title, ARIA names, Acquire states, nav badge, cart controls, empty state | PASS, 0 page errors | `B3-live/flow-check.txt` |
| Hosted checkout reach — add Palladium Crystal, open the cart ($2,950), follow `checkoutUrl` | reachable (HTTP 200); Shopify serves the storefront password page | `B3-live/checkout-reach.txt`, `screenshots/B3-live/checkout.png` |

## Deploy record

- Bucket `justmetu.com` held a 2019 site; its `index.html` was snapshotted to
  `s3://justmetu.com/index-2026-09-22-pre-poc.html` before the additive sync (`aws s3 sync dist/`,
  never `--delete`; old objects remain).
- CloudFront `E1YHBPGAEXA3TQ` (alias `justmetu.com`, ACM cert present, S3 origin via OAC) was not
  SPA-capable: no default root object, no error rewrites. Mirrored from `E1K9CDJJHYXTE8`
  (spynejs.com): `DefaultRootObject: index.html`; custom error responses 403 → `/index.html` 200
  (TTL 10) and, since this origin is S3 via OAC, 404 → `/index.html` 200 as well. Viewer
  protocol (redirect-to-https), compression and cache policy were already equal.
- Invalidation `I1ULIRJ0CMP2X92GQQOIL4H74M` on `/*`, completed 12:57.
- **DNS (r2).** `justmetu.com`'s A record was a Route53 alias to the S3 *website* endpoint (HTTP
  only), so `https://justmetu.com` failed the TLS handshake. On Frank's word it was re-aliased to
  the distribution (`dvlyqetb9espg.cloudfront.net`, change `C050555916PQL1LIP0WRS`, INSYNC 13:23);
  `https://justmetu.com/shop` answered 200 within a minute. `www.justmetu.com` still aliases the
  apex and the distribution has no `www` alias — untouched, not in scope.

## Storefront password (ruled)

Frank ruled the dev store keeps its password for now. The hosted checkout is reachable from the
live cart and stops at the password page; completing a test order through it is Frank's step and
is not claimed here. The password is not recorded.
