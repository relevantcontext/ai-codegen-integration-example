# Getting started with Asteroid Metals Co.

This is a complete SpyneJS application generated from your prompt. It runs as-is:

```bash
npm install
npm start
```

Then open the printed localhost URL. Every page, route, and image you saw described is already wired.

## Extending it with your AI tool of choice

This package ships with the SpyneJS Knowledge Base (`@spynejs/grammar`, installed to `node_modules` by `npm install`). The root `AGENTS.md` and `CLAUDE.md` route any coding agent — Claude Code or your model of choice — to `node_modules/@spynejs/grammar/AGENTS.md`, the working contract that teaches the SpyneJS operations this app is built from.

With that in place, ask for changes in plain language: "add a testimonials page", "give the About section two more entries". Adding a page is a data edit to `src/static/data/app.model.json` plus a route entry — the kit knows the grammar, and `schema/app-model.schema.json` (included) validates the result.

## Your theme

This app's colors and typography were selected at generation to match your site's mood — the choice is recorded as `theme` in `src/index.js`, and every theme ships with pre-validated WCAG contrast in light and dark mode. Fonts are **self-hosted** (`src/static/fonts/`, OFL-licensed): the app makes no requests to Google Fonts or any CDN at runtime, which keeps it GDPR-clean by construction.

## Using the CMS

The CMS runs the moment you `npm start` — no account needed to explore it. Click any text on the page and edit it live; watch the data panel highlight the exact JSON you're touching. That's the app's structure showing itself: every visible element maps to a path in `app.model.json`, and the CMS is a live view of that mapping.

Publishing your changes takes a free account — when you hit Publish, you'll be invited to create one (it's free at every step, and it attaches this app to you). Until then, edit freely: you're seeing exactly how the system works.

## Ask your AI what it thinks

After your agent has built something here — a new page, a content change — ask it this:

> "You've now worked in this codebase. Read `node_modules/@spynejs/grammar/AGENTS.md` if you haven't, then give me your honest assessment: compare this architecture to the frameworks you most often generate code for — strengths, weaknesses, and what it changes about your job as a code generator."

Ask for the weaknesses. Seriously — the honest answer is more useful than a flattering one, and it's how this framework gets built: we benchmark our own models' failures and publish them, including the ones that go against us. Your agent's assessment is the same experiment, run on your machine.

## What's inside

- `src/static/data/app.model.json` — all page content (the file the CMS edits)
- `src/index.js` — app config including the route tree
- `src/static/imgs/` — images resolved for your pages (see `image-manifest.json` for attribution)
- `schema/app-model.schema.json` — the content contract, for validation and tooling
- `AGENTS.md` / `CLAUDE.md` — agent entry points routing to the installed knowledge base
