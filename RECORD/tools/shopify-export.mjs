// RECORD tooling — pin the Shopify catalog as A2's input. Not app code.
//
//   set -a && source .env && set +a && node RECORD/tools/shopify-export.mjs [stage]
//   (stage defaults to A2; the file is RECORD/inputs/<stage>-shopify-products.json)
//
// Env: SHOPIFY_STOREFRONT_TOKEN; optional SHOPIFY_STORE, SHOPIFY_API_VERSION.
// Reads every published product through the Storefront API — the same
// endpoint, token and fields the app's fetch channel will use — and writes the
// unmodified response to RECORD/inputs/A2-shopify-products.json with the
// request that produced it, so the input is replayable.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const store = process.env.SHOPIFY_STORE || 'asteroid-metals.myshopify.com';
const version = process.env.SHOPIFY_API_VERSION || '2026-04';
const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
if (!token) {
  console.error('SHOPIFY_STOREFRONT_TOKEN must be in the environment (see shopify-token.mjs).');
  process.exit(2);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const stage = process.argv[2] || 'A2';
const out = path.join(root, `RECORD/inputs/${stage}-shopify-products.json`);
const endpoint = `https://${store}/api/${version}/graphql.json`;
const query = `{
  shop { name primaryDomain { url } }
  products(first: 50, sortKey: TITLE) {
    nodes {
      id handle title productType tags vendor description
      featuredImage { url altText width height }
      variants(first: 5) {
        nodes { id title availableForSale price { amount currencyCode } compareAtPrice { amount currencyCode } weight weightUnit }
      }
    }
  }
}`;

const res = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
  body: JSON.stringify({ query }),
});
const body = await res.json().catch(() => ({}));
if (!res.ok || body.errors) {
  console.error(`FAIL storefront query\n${JSON.stringify({ status: res.status, errors: body.errors }, null, 2)}`);
  process.exit(1);
}

const pinned = {
  pinnedAt: new Date().toISOString(),
  request: { endpoint, apiVersion: version, header: 'X-Shopify-Storefront-Access-Token', tokenTitle: 'code-assembly-alpha', query },
  response: body,
};
fs.writeFileSync(out, JSON.stringify(pinned, null, 2) + '\n');
const products = body.data.products.nodes;
console.log(`pinned ${products.length} product(s) from ${body.data.shop.name} -> ${path.relative(root, out)}`);
for (const p of products) {
  const v = p.variants.nodes[0];
  console.log(`  ${p.handle}  type=${p.productType} tags=${p.tags.join('|')} price=${v?.price.amount} ${v?.price.currencyCode} weight=${v?.weight}${v?.weightUnit} image=${p.featuredImage ? 'yes' : 'none'}`);
}
