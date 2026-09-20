# A0 notes — deviations of the generated baseline from the alpha prompt

Recorded as found at `alpha-A0`. These are notes, not fixes; nothing was changed.

1. **No product-detail route was generated.** The prompt asked for a Product detail page
   (name, origin, purity, mass, price, image, add-to-cart). The generated route tree in
   `src/index.js` is `home`, `shop`, `about` → `contact`, `cart`; there is no detail route
   and no detail node in `app.model.json`.

2. **The metal/origin filter does not exist.** Checked: `products.tmpl.html` renders a
   header and a grid of tiles only — no filter controls; no filter Behavior or Logic exists
   in `src/app` (the only `filter` matches are array `.filter()` calls in nav/ui traits);
   the product data shape is `name`, `variant`, `price`, `attrImageSrc` — metal and origin
   are not fields (origin appears only inside the `variant` string, e.g. "Ryugu fragment,
   2.3g"). The page copy mentions filtering ("Filter by metal type or asteroid origin") but
   nothing implements it. Consequence per the brief: A1's prompt asks for the filter, and
   the log shows it arriving by prompt, not from Figma.

Also observed while checking (relevant to A2/A3, not ruled deviations):

- No add-to-cart exists on the tile or anywhere in `src/app`; the cart page is a static
  article ("Cart and quote request").
- Products are not modeled as their own fetch channel; the six products are inline data in
  the shop node of `app.model.json`, which arrives through the app-wide
  `CHANNEL_FETCH_MODEL`.
- The prompt's `[Brand]` placeholder was resolved by the generator to "Asteroid Metals Co."
