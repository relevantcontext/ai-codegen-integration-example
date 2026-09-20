# AGENTS.md — Asteroid Metals Co.

This is a generated SpyneJS application (appId ns9ev5evqvcd). **Before writing or modifying any SpyneJS code, read `node_modules/@spynejs/grammar/AGENTS.md`** — the SpyneJS Knowledge Base ships with this project as a devDependency (`@spynejs/grammar`, stackVersion v50-r11) and its fetch discipline applies to every task: identify the task's shape, read the matching kb cards/records, then author. If `node_modules/@spynejs/grammar` is missing, run `npm install` first.

## This app specifically

- All page content lives in `src/static/data/app.model.json` — validated by `schema/app-model.schema.json` (included). The route tree lives in `config.channels.ROUTE` in `src/index.js`.
- Adding a page is a DATA edit (kb card `author-app-model-node`): a schema-valid node whose route-identity keys (`pageId`, `topicId`) match the route config branch, plus the route entry. Routing, nav, and page swapping derive.
- Images live in `src/static/imgs/`; `image-manifest.json` carries per-image attribution.
- `npm start` — dev server; `npm run build` — production build.
