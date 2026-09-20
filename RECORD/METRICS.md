# METRICS — same fields every stage

| Stage | Wall time | Tokens | Model cost | Prompts | Human corrections | Verification result |
|-------|-----------|--------|------------|---------|-------------------|------------------------|
| A0 | not captured | not captured | not captured | 1 | 0 | PASS — check-grammar 8/8, eslint clean, production build ok, route smoke 5/5 (`verification/A0/`) |
| A1 | input pull: 05:46–05:52 (includes waiting on the Figma pin confirmation); conversion: pending | input pull: not metered (interactive Claude Code session); conversion: pending | pending | 0 model prompts so far (the Figma agent prompt is recorded as provenance, `prompts/A1-0-figma.md`); MCP tool calls: 3 (`get_design_context`, `get_metadata`, `get_screenshot`) | 0 | pending |

A0: spyne-cli did not log time, tokens, cost, or generator model for the create-app run. From A1 on every field is captured before the stage closes.
