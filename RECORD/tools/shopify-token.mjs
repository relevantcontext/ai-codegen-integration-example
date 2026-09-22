// RECORD tooling — mint / verify a Storefront API access token. Not app code.
//
//   set -a && source .env && set +a && node RECORD/tools/shopify-token.mjs
//
// Env: SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET (Dev Dashboard app credentials),
//      optional SHOPIFY_STORE (default asteroid-metals.myshopify.com),
//      optional SHOPIFY_API_VERSION (default 2026-04).
//
// 1. Client-credentials grant -> short-lived Admin API token (never printed).
// 2. Reuse a Storefront access token titled `code-assembly-alpha` if one exists,
//    otherwise create it (storefrontAccessTokenCreate).
// 3. Verify it against the Storefront API and print it with its scopes.
//
// The Storefront token is public by design and is what the app's fetch channel
// carries; the client secret never leaves this process.

const store = process.env.SHOPIFY_STORE || 'asteroid-metals.myshopify.com';
const version = process.env.SHOPIFY_API_VERSION || '2026-04';
const clientId = process.env.SHOPIFY_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
const TOKEN_TITLE = 'code-assembly-alpha';

if (!clientId || !clientSecret) {
  console.error('SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET must be in the environment.');
  process.exit(2);
}

const fail = (step, detail) => {
  console.error(`FAIL ${step}\n${typeof detail === 'string' ? detail : JSON.stringify(detail, null, 2)}`);
  process.exit(1);
};

// 1. admin token via client credentials
const grant = await fetch(`https://${store}/admin/oauth/access_token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, grant_type: 'client_credentials' }),
});
const grantText = await grant.text();
let grantBody = {};
try { grantBody = JSON.parse(grantText); } catch { /* non-JSON reply, shown raw below */ }
if (!grant.ok || !grantBody.access_token) {
  fail('client-credentials grant', {
    status: grant.status,
    contentType: grant.headers.get('content-type'),
    body: grantText.slice(0, 800) || '(empty)',
    hint: [
      'invalid_client / 401 -> id or secret wrong (Dev Dashboard app > Settings > Client credentials)',
      'invalid_request / 400 -> the app is not installed on this store, or it is a store-admin "custom app" (those issue an Admin token directly and have no client-credentials grant)',
      `store used: ${store} (override with SHOPIFY_STORE)`,
    ],
  });
}
const adminToken = grantBody.access_token;
console.log(`admin token: ok (scope: ${grantBody.scope || 'n/a'}, expires_in: ${grantBody.expires_in ?? 'n/a'}s)`);

const admin = async (query, variables = {}) => {
  const res = await fetch(`https://${store}/admin/api/${version}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': adminToken },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.errors) fail('admin graphql', { status: res.status, errors: body.errors, apiVersion: res.headers.get('x-shopify-api-version') });
  return body.data;
};

// 2. reuse or create the storefront token
const existing = await admin(`{
  shop { name myshopifyDomain storefrontAccessTokens(first: 20) { nodes { id title accessToken accessScopes { handle } } } }
}`);
let token = existing.shop.storefrontAccessTokens.nodes.find((t) => t.title === TOKEN_TITLE);
let action = 'reused';
if (!token) {
  const created = await admin(
    `mutation ($input: StorefrontAccessTokenInput!) {
      storefrontAccessTokenCreate(input: $input) {
        storefrontAccessToken { id title accessToken accessScopes { handle } }
        userErrors { field message }
      }
    }`,
    { input: { title: TOKEN_TITLE } },
  );
  const r = created.storefrontAccessTokenCreate;
  if (r.userErrors?.length) fail('storefrontAccessTokenCreate', r.userErrors);
  token = r.storefrontAccessToken;
  action = 'created';
}

// 3. verify against the Storefront API
const sf = await fetch(`https://${store}/api/${version}/graphql.json`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token.accessToken },
  body: JSON.stringify({ query: '{ shop { name } products(first: 3) { nodes { handle title productType tags } } }' }),
});
const sfBody = await sf.json().catch(() => ({}));
if (!sf.ok || sfBody.errors) fail('storefront verify', { status: sf.status, errors: sfBody.errors });

console.log(`storefront token: ${action} ("${TOKEN_TITLE}")`);
console.log(`  store:   ${existing.shop.myshopifyDomain} (${existing.shop.name})`);
console.log(`  scopes:  ${token.accessScopes.map((s) => s.handle).join(', ') || '(none listed)'}`);
console.log(`  version: ${version}`);
console.log(`  token:   ${token.accessToken}`);
console.log(`  verify:  shop "${sfBody.data.shop.name}", first products: ${JSON.stringify(sfBody.data.products.nodes)}`);
