// RECORD tooling — write the public Storefront token into the app config.
//
//   set -a && source .env && set +a && node RECORD/tools/shopify-config.mjs
//
// Env: SHOPIFY_STOREFRONT_TOKEN; optional SHOPIFY_STORE, SHOPIFY_API_VERSION,
//      SHOPIFY_STOREFRONT_PASSWORD (the storefront password; when set, written to
//      config.shopify.storefrontUnlockPassword so the cart page can unlock the
//      store before checkout — a development-store convenience; it ships in the bundle).
// Rewrites config.shopify in src/index.js in place. The app is a static bundle
// with no env injection, so the public token lives in source; this keeps the
// value out of the agent's hands and out of hand-editing.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
const unlockPassword = process.env.SHOPIFY_STOREFRONT_PASSWORD ?? '';
const store = process.env.SHOPIFY_STORE || 'asteroid-metals.myshopify.com';
const version = process.env.SHOPIFY_API_VERSION || '2026-04';
if (!token) {
  console.error('SHOPIFY_STOREFRONT_TOKEN must be in the environment.');
  process.exit(2);
}

const file = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../src/index.js');
let src = fs.readFileSync(file, 'utf8');
const before = src;
src = src
  .replace(/store: '[^']*'/, `store: '${store}'`)
  .replace(/apiVersion: '[^']*'/, `apiVersion: '${version}'`)
  .replace(/storefrontAccessToken: '[^']*'/, `storefrontAccessToken: '${token}'`)
  .replace(/storefrontUnlockPassword: '[^']*'/, `storefrontUnlockPassword: '${unlockPassword.replace(/'/g, "\\'")}'`);
if (src === before) {
  console.log('src/index.js already carries these values; nothing written.');
  process.exit(0);
}
fs.writeFileSync(file, src);
console.log(`src/index.js: config.shopify = { store: ${store}, apiVersion: ${version}, storefrontAccessToken: ${token.slice(0, 4)}…${token.slice(-3)}, storefrontUnlockPassword: ${unlockPassword ? '(set)' : '(empty)'} }`);
