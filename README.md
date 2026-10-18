# Application Shell

A SpyneJS application template with pages, navigation, and UI components already
wired up. Use it as the starting point for an application that needs routing and
a page structure from the outset.

For a minimal starting point instead, see
[application-starter](https://github.com/spynejs/application-starter).

## Requirements

Node.js 18 or newer.

## Getting started

```bash
git clone https://github.com/spynejs/application-shell.git my-app
cd my-app
rm -rf .git && git init
npm install
npm start
```

`npm start` runs the webpack dev server with hot reload.

## Scripts

| Script | Description |
| --- | --- |
| `npm start` | Development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm test` | Unit tests via Web Test Runner |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with autofix |
| `npm run format` | Prettier over `src/` |

## Structure

```
src/
  app/
    channels/      Channels — event flow and application state
    components/    ViewStreams — nav, pages, page items, UI elements
    traits/        SpyneTraits — reusable behaviour
  scss/            Styles, including the design system tokens
  static/          Data, fonts, and images
  index.js         Application entry: config, channel registration, root view
```

SpyneJS separates rendering (`ViewStream`), event flow (`Channel`), and
behaviour (`SpyneTrait`). Components are organised by those roles rather than by
feature.

## Content

Page content is read from `src/static/data/app.model.json` through a
`ChannelFetch`. Editing that file changes the rendered pages without touching
component code.

## Shopify

The catalog and cart use the Shopify Storefront API. The store settings are
read from the environment when webpack runs and packaged into the bundle; they
are not kept in source.

| Variable | Purpose |
| --- | --- |
| `SHOPIFY_STORE` | Store domain, e.g. `example.myshopify.com` |
| `SHOPIFY_API_VERSION` | Storefront API version (default `2026-04`) |
| `SHOPIFY_STOREFRONT_TOKEN` | Public Storefront access token |
| `SHOPIFY_STOREFRONT_PASSWORD` | Storefront password of a password-protected development store, used to unlock the store before checkout |

Without a token the catalog serves the local sample in `app.model.json`;
without a password the cart shows a manual unlock hint. Load the variables
before `npm start` or `npm run build`, for example from a git-ignored `.env`:

```bash
set -a && source .env && set +a && npm run build
```

## Deployment

The build output in `dist/` is a static single-page application. All application
routes must resolve to `index.html`, and requests for static assets must be
served directly. See [HOSTING.md](HOSTING.md) for platform-specific
configuration.

## License

MIT — see [LICENSE](LICENSE).
