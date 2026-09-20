# Verification run — A0 (2026-09-20)

Per brief section 6. The POC produces no violation count.

| Check | Result | Output |
|-------|--------|--------|
| `scripts/check-grammar.mjs` | PASS 8/8 | `check-grammar.txt` |
| eslint (`npm run lint -- src`) | PASS, 0 problems | `eslint.txt` |
| Production build (`npm run build`) | PASS (3 webpack bundle-size warnings, no errors) | `build-and-smoke.txt` |
| Route smoke test — 5 nav routes, no console errors / page errors / failed requests | PASS 5/5 | `route-smoke.json` |
| Behavior Console event + payload | n/a before A3 | — |

What `check-grammar.mjs` checks: that the installed `@spynejs/grammar` package and this
repo's agent docs agree — manifest files present, card/record counts match the payload,
manifest entry points resolve, payload lives at `grammar/`, the stackVersion claimed in
`AGENTS.md` and `CLAUDE.md` matches the package (v50-r11), installed `spyne` satisfies the
grammar's frameworkCompat, and no `@spynejs/kb` references remain in tracked source. It is
a wiring check on the agent's material; it does not inspect application code.

Routes: `/`, `/shop`, `/about`, `/cart`, `/about/contact`.
