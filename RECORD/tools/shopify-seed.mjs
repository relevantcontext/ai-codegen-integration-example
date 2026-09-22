// RECORD tooling — seed the six asteroid-metal products into the dev store
// through the Admin API, then verify them through the Storefront API. Not app
// code. Idempotent: products are matched by handle and updated in place.
//
//   set -a && source .env && set +a && node RECORD/tools/shopify-seed.mjs
//   ... --sale   also sets compare-at prices on two variants (A4 data)
//
// Env: SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET; optional SHOPIFY_STORE
//      (default asteroid-metals.myshopify.com), SHOPIFY_API_VERSION (2026-04),
//      SHOPIFY_STOREFRONT_TOKEN (else the token titled code-assembly-alpha is reused).
// Needs Admin scopes: read_products, write_products (and write_publications to
// publish to sales channels — skipped with a note if absent).
//
// Data model, as ruled for A2: product type = metal, one tag = origin asteroid,
// one variant whose price is the price and whose weight in grams is the mass.
// Shopify's sample products are set to DRAFT (not deleted) so only the six
// metals are published. Images are not uploaded — the app already carries the
// Figma images per product.

const store = process.env.SHOPIFY_STORE || 'asteroid-metals.myshopify.com';
const version = process.env.SHOPIFY_API_VERSION || '2026-04';
const clientId = process.env.SHOPIFY_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

// same six products as src/static/data/app.model.json (A1-r2)
const SALE = { 'iridium-nugget': '4800', 'osmium-bead': '6200' }; // --sale: compare-at prices (A4)
const saleMode = process.argv.includes('--sale');

const PRODUCTS = [
  { handle: 'iridium-nugget',    title: 'Iridium Nugget',    metal: 'Iridium',   origin: 'Ryugu',   price: '4200', grams: 2.3 },
  { handle: 'platinum-sponge',   title: 'Platinum Sponge',   metal: 'Platinum',  origin: 'Bennu',   price: '3800', grams: 5.0 },
  { handle: 'palladium-crystal', title: 'Palladium Crystal', metal: 'Palladium', origin: 'Psyche',  price: '2950', grams: 1.8 },
  { handle: 'ruthenium-powder',  title: 'Ruthenium Powder',  metal: 'Ruthenium', origin: 'Itokawa', price: '1875', grams: 3.5 },
  { handle: 'osmium-bead',       title: 'Osmium Bead',       metal: 'Osmium',    origin: 'Vesta',   price: '5600', grams: 0.9 },
  { handle: 'rhenium-flake',     title: 'Rhenium Flake',     metal: 'Rhenium',   origin: 'Ceres',   price: '2150', grams: 4.2 },
];

if (!clientId || !clientSecret) {
  console.error('SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET must be in the environment.');
  process.exit(2);
}
const fail = (step, detail) => {
  console.error(`FAIL ${step}\n${typeof detail === 'string' ? detail : JSON.stringify(detail, null, 2)}`);
  process.exit(1);
};

// admin token
const grant = await fetch(`https://${store}/admin/oauth/access_token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, grant_type: 'client_credentials' }),
});
const grantText = await grant.text();
let grantBody = {};
try { grantBody = JSON.parse(grantText); } catch { /* shown raw */ }
if (!grant.ok || !grantBody.access_token) fail('client-credentials grant', { status: grant.status, body: grantText.slice(0, 300) });
const adminToken = grantBody.access_token;
const scopes = (grantBody.scope || '').split(',');
console.log(`admin token: ok (scopes: ${scopes.join(', ')})`);
// write_products implies read_products; the grant lists only the write scope
if (!scopes.includes('write_products')) {
  fail('scope check', `the app lacks Admin scope "write_products". Add it (and write_publications) to asteroid-metals-app in the Dev Dashboard, release the version, reinstall on ${store}, re-run.`);
}

const admin = async (query, variables = {}) => {
  const res = await fetch(`https://${store}/admin/api/${version}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': adminToken },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.errors) fail('admin graphql', { status: res.status, errors: body.errors, query: query.slice(0, 80) });
  return body.data;
};
const userErrors = (step, list) => { if (list?.length) fail(step, list); };

// existing products by handle
const listed = await admin(`{ products(first: 100) { nodes { id handle title status variants(first: 1) { nodes { id } } } } }`);
const byHandle = new Map(listed.products.nodes.map((p) => [p.handle, p]));

for (const p of PRODUCTS) {
  const productInput = { title: p.title, handle: p.handle, productType: p.metal, tags: [p.origin], status: 'ACTIVE', vendor: 'Asteroid Metals Co.' };
  let product = byHandle.get(p.handle);
  let verb;
  if (product) {
    const r = await admin(
      `mutation ($product: ProductUpdateInput!) { productUpdate(product: $product) { product { id handle variants(first: 1) { nodes { id } } } userErrors { field message } } }`,
      { product: { id: product.id, ...productInput } },
    );
    userErrors(`productUpdate ${p.handle}`, r.productUpdate.userErrors);
    product = r.productUpdate.product; verb = 'updated';
  } else {
    const r = await admin(
      `mutation ($product: ProductCreateInput!) { productCreate(product: $product) { product { id handle variants(first: 1) { nodes { id } } } userErrors { field message } } }`,
      { product: productInput },
    );
    userErrors(`productCreate ${p.handle}`, r.productCreate.userErrors);
    product = r.productCreate.product; verb = 'created';
  }
  const variantId = product.variants.nodes[0].id;
  const v = await admin(
    `mutation ($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants { id price inventoryItem { measurement { weight { value unit } } } }
        userErrors { field message }
      }
    }`,
    { productId: product.id, variants: [{ id: variantId, price: p.price, ...(saleMode && SALE[p.handle] ? { compareAtPrice: SALE[p.handle] } : {}), inventoryItem: { measurement: { weight: { value: p.grams, unit: 'GRAMS' } } } }] },
  );
  userErrors(`variant ${p.handle}`, v.productVariantsBulkUpdate.userErrors);
  console.log(`${verb}  ${p.handle}  type=${p.metal} tag=${p.origin} price=${p.price}${saleMode && SALE[p.handle] ? ` compareAt=${SALE[p.handle]}` : ''} weight=${p.grams}g`);
}

// draft everything that is not one of ours
const ours = new Set(PRODUCTS.map((p) => p.handle));
for (const other of listed.products.nodes.filter((n) => !ours.has(n.handle) && n.status === 'ACTIVE')) {
  const r = await admin(
    `mutation ($product: ProductUpdateInput!) { productUpdate(product: $product) { product { id } userErrors { field message } } }`,
    { product: { id: other.id, status: 'DRAFT' } },
  );
  userErrors(`draft ${other.handle}`, r.productUpdate.userErrors);
  console.log(`drafted  ${other.handle}  (sample product)`);
}

// publish ours to every sales channel the app can see (best effort)
if (scopes.includes('write_publications')) {
  const pubs = await admin(`{ publications(first: 20) { nodes { id name } } }`);
  const fresh = await admin(`{ products(first: 100, query: "status:active") { nodes { id handle } } }`);
  for (const prod of fresh.products.nodes.filter((n) => ours.has(n.handle))) {
    const r = await admin(
      `mutation ($id: ID!, $input: [PublicationInput!]!) { publishablePublish(id: $id, input: $input) { userErrors { field message } } }`,
      { id: prod.id, input: pubs.publications.nodes.map((pub) => ({ publicationId: pub.id })) },
    );
    userErrors(`publish ${prod.handle}`, r.publishablePublish.userErrors);
  }
  console.log(`published to: ${pubs.publications.nodes.map((p) => p.name).join(', ')}`);
} else {
  console.log('publish: skipped (no write_publications scope) — if the Storefront verify below shows fewer than 6 products, publish them to the app\'s sales channel in the admin.');
}

// storefront verify
let sfToken = process.env.SHOPIFY_STOREFRONT_TOKEN;
if (!sfToken) {
  const t = await admin(`{ shop { storefrontAccessTokens(first: 20) { nodes { title accessToken } } } }`);
  sfToken = t.shop.storefrontAccessTokens.nodes.find((n) => n.title === 'code-assembly-alpha')?.accessToken;
}
if (!sfToken) fail('storefront verify', 'no Storefront token — run shopify-token.mjs first or set SHOPIFY_STOREFRONT_TOKEN');
const sf = await fetch(`https://${store}/api/${version}/graphql.json`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': sfToken },
  body: JSON.stringify({ query: `{ products(first: 20) { nodes { handle title productType tags variants(first: 1) { nodes { price { amount currencyCode } compareAtPrice { amount currencyCode } weight weightUnit } } } } }` }),
});
const sfBody = await sf.json().catch(() => ({}));
if (!sf.ok || sfBody.errors) fail('storefront verify', { status: sf.status, errors: sfBody.errors });
const seen = sfBody.data.products.nodes;
console.log(`storefront sees ${seen.length} product(s):`);
for (const n of seen) {
  const v = n.variants.nodes[0];
  console.log(`  ${n.handle}  type=${n.productType} tags=${n.tags.join('|')} price=${v?.price.amount} ${v?.price.currencyCode}${v?.compareAtPrice ? ` compareAt=${v.compareAtPrice.amount}` : ''} weight=${v?.weight}${v?.weightUnit}`);
}
