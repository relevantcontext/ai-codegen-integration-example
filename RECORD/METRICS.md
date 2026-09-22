# METRICS — same fields every stage

| Stage | Wall time | Tokens | Model cost | Prompts | Human corrections | Verification result |
|-------|-----------|--------|------------|---------|-------------------|------------------------|
| A0 | not captured | not captured | not captured | 1 | 0 | PASS — check-grammar 8/8, eslint clean, production build ok, route smoke 5/5 (`verification/A0/`) |
| A1 | input pull 05:46–05:52 (09-20); conversion 20:27–20:39; review + r2 20:45–21:01 (09-21) | not metered (interactive Claude Code session; no token/cost log available) | not metered | 2 model prompts (`prompts/A1-1.md`, `prompts/A1-2.md`); MCP tool calls 3 (input pull) | 1 review correction (A1-2: two items — images, styles; plus 1 ruling on font sourcing) | PASS at `alpha-A1` and at `alpha-A1-r2` — check-grammar 8/8, eslint clean, schema valid, production build ok, route smoke 5/5 (`verification/A1/`, `verification/A1-r2/`) |

A0: spyne-cli did not log time, tokens, cost, or generator model for the create-app run. From A1 on every field is captured before the stage closes.
A1: tokens and cost were not metered — the conversion ran inside an interactive Claude Code session that exposes no per-task token or cost log. Recorded as "not metered" rather than estimated.
