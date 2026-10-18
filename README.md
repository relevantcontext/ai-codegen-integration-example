# AI Codegen Integration Example

A public demonstration of AI-generated application construction and external
service integration using [SpyneJS](https://spynejs.com). The application is a
small storefront for a fictitious company, Asteroid Metals Co.; the point of the
repository is how it was built and how that can be checked.

**Live application:** https://codegen-integration.relevantcontext.io/

## What was built

A complete shopping application: custom Figma designs with light and dark
themes, CMS-editable content, Shopify product integration, a shopping cart, and
checkout against a Shopify development store in test mode.

## How it was built

1. The application was initialized with `npx spyne-cli create-app`, which
   produced the [Application Shell](https://github.com/spynejs/application-shell)
   baseline.
2. A Figma AI agent created the shopping application designs, including the
   product images and, later, the light theme.
3. Claude Code (Claude Fable 5.1) was given those designs through the Figma
   integration.
4. Using the [SpyneJS Grammar](https://www.npmjs.com/package/@spynejs/grammar),
   Claude implemented the designs within the View, Behavior, Logic architecture,
   establishing global Channel connections and keeping the content, including the
   AI-generated images, editable through the CMS.
5. A Shopify development store was configured and its credentials were provided
   to Claude.
6. Claude implemented the Shopify integration: product data through the
   Storefront API, cart operations, and the hosted checkout in test mode.

**The distinction that matters.** The application code was AI-generated without
manual developer editing. Human participation was directing each stage,
authorizing the external integrations, providing credentials, reporting defects,
and reviewing the outcome. The one human code edit over the whole project, a
superseded one-line timing workaround, is logged in
[RECORD/EXCEPTIONS.md](RECORD/EXCEPTIONS.md).

## What the experiment demonstrates

- A frontier model can build with SpyneJS despite the framework's limited
  representation in training data.
- The Grammar supplies the construction rules; the model applies what it already
  knows about HTML, CSS, JavaScript, APIs, and the external services.
- Design, content, and commerce capabilities can be integrated through the same
  structural roles and the same Channel communication, rather than through
  service-specific glue.
- The resulting application keeps recognizable modules, inspectable behavior,
  and a separation between structure and content.

## Why this matters

The experiment tests one question: can an AI agent combine design and commerce
services using a construction grammar, instead of inventing an application
architecture of its own each time? Figma and Shopify were connected to a shared,
observable channel system, and the code that connects them reads like the rest
of the application. The repository exists as supporting evidence for the article
*Toward a Standard for Building Web Applications*, not as the source of a
shopping cart.

## Scope

This is a successful integration demonstration. It is not proof of universal
application coverage, and it is not a guarantee that generated code is correct.
The full record of what was asked, what came back, what had to be redone, and
what was ruled is under [RECORD/](RECORD/):

| File | Contents |
| --- | --- |
| [CONVERSION-LOG.md](RECORD/CONVERSION-LOG.md) | Every stage, element by element: mapped, inferred, or undefined, with the rulings |
| [PROVENANCE.md](RECORD/PROVENANCE.md) | Where each input and artifact came from |
| [METRICS.md](RECORD/METRICS.md) | Time and verification results per stage |
| [EXCEPTIONS.md](RECORD/EXCEPTIONS.md) | Human edits to code |
| [prompts/](RECORD/prompts/) | The prompts, pinned verbatim before they ran |
| [inputs/](RECORD/inputs/) | Figma pulls and Shopify exports |
| [screenshots/](RECORD/screenshots/), [verification/](RECORD/verification/) | Captures and check output per stage |

Each stage is a git tag (`alpha-A0` through `beta-B4-r7`); a redo is a new tag,
never a moved one.

## Verify it yourself

- **Live application**, built with the SpyneJS Behavior Console
  ([spyne-plugin-console](https://www.npmjs.com/package/spyne-plugin-console))
  and the CMS panel ([@spynejs/cms](https://www.npmjs.com/package/@spynejs/cms))
  enabled. The console shows every Channel event as it happens; the panel edits
  content in the browser, with publishing not offered on the public site.
- **Noisemap** of the source, below.
- **Source files that carry the integrations:**
  - [src/index.js](src/index.js): configuration, the Storefront fetch channel, and channel registration
  - [channel-shopify.js](src/app/channels/channel-shopify.js) with [channel-shopify-traits.js](src/app/traits/channel/channel-shopify-traits.js): the catalog as channel state, served from Shopify with the local model as fallback
  - [channel-cart.js](src/app/channels/channel-cart.js) with [channel-cart-traits.js](src/app/traits/channel/channel-cart-traits.js): the Shopify cart as channel state
  - [products-catalog-view.js](src/app/components/page-items/products-catalog-view.js) and [product-tile-item.js](src/app/components/page-items/product-tile-item.js): the catalog, rendered only from channel events
  - [cart-view.js](src/app/components/page-items/cart-view.js) with [cart-view-traits.js](src/app/traits/page/cart-view-traits.js): the cart page and the checkout hand-off
  - [products.tmpl.html](src/app/components/page-items/templates/products.tmpl.html): the Figma catalog as a template
  - [app.model.json](src/static/data/app.model.json): the CMS-managed content

## Noisemap

The noisemap measures the **separation of classified code responsibilities**:
every token in `src/` is classified as View, Behavior, Logic, or Content, and
each module is scored on how far it stays in one role. It says nothing about
overall code quality, only whether responsibilities are mixed. Open
[noisemap.html](noisemap.html) for the map; [noisemap.json](noisemap.json) is
the data behind it.

| Measure | Result |
| --- | --- |
| Tool | [code-noisemap](https://www.npmjs.com/package/code-noisemap) 0.2.0, generated 2026-10-18 |
| Modules | 152 (View 21, Behavior 5, Logic 28, Content 98) |
| Tokens counted | 15,791 |
| Mean mixing, all modules | 0.00 |
| Mean mixing, non-stylesheet modules (80) | 0.01 |
| Mean mixing by token | 0.00 |
| Mean mixing by operation | 0.08 |
| Consistency | 0.01 |
| Shape | inside declared shape 47/51, on sanctioned surface 51/51 |

Regenerate with:

```bash
npx code-noisemap@0.2.0 map ./src --no-open
```

The classification and scores are the tool's output, unmodified. The only edit
to the artifacts is the analysis root, written as `src` instead of the absolute
path of the machine that ran it. Methodology and source:
[relevantcontext/noisemap](https://github.com/relevantcontext/noisemap).

## Running locally

Node.js 18 or newer.

```bash
git clone https://github.com/relevantcontext/ai-codegen-integration-example.git
cd ai-codegen-integration-example
npm install
npm start
```

`npm start` runs the webpack dev server with hot reload. Without Shopify
settings the catalog serves the local sample from `app.model.json`, so the
application runs with no credentials at all.

### Shopify settings

The store settings are read from the environment when webpack runs and
packaged into the bundle; they are not kept in source.

| Variable | Purpose |
| --- | --- |
| `SHOPIFY_STORE` | Store domain, e.g. `example.myshopify.com` |
| `SHOPIFY_API_VERSION` | Storefront API version (default `2026-04`) |
| `SHOPIFY_STOREFRONT_TOKEN` | Public Storefront access token |
| `SHOPIFY_STOREFRONT_PASSWORD` | Storefront password of a password-protected development store, used to unlock the store before checkout |

Without a password the cart shows a manual unlock hint instead. Load the
variables before `npm start` or `npm run build`, for example from a git-ignored
`.env`:

```bash
set -a && source .env && set +a && npm run build
```

### Scripts

| Script | Description |
| --- | --- |
| `npm start` | Development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm test` | Grammar check and unit tests via Web Test Runner |
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
feature. Page content is read from `src/static/data/app.model.json` through a
`ChannelFetch`; editing that file changes the rendered pages without touching
component code.

## Deployment

The build output in `dist/` is a static single-page application. All application
routes must resolve to `index.html`, and requests for static assets must be
served directly. See [HOSTING.md](HOSTING.md) for platform-specific
configuration.

## License

MIT — see [LICENSE](LICENSE).
