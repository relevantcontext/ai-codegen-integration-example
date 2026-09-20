# METRICS — same fields every stage

| Stage | Wall time | Tokens | Model cost | Prompts | Human corrections | Verification result |
|-------|-----------|--------|------------|---------|-------------------|------------------------|
| A0 | not captured | not captured | not captured | 1 | 0 | PASS — check-grammar 8/8, eslint clean, production build ok, route smoke 5/5 (`verification/A0/`) |

A0: spyne-cli did not log time, tokens, cost, or generator model for the create-app run. From A1 on every field is captured before the stage closes.
