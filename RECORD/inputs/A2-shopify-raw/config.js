// Storefront API configuration.
// The public Storefront access token is safe to ship to the browser; it only
// grants read access to published storefront data.
export const storefrontConfig = {
  shopDomain: 'asteroid-metals.myshopify.com',
  apiVersion: '2026-04',
  publicAccessToken: 'REPLACE_WITH_PUBLIC_STOREFRONT_ACCESS_TOKEN',
  // Max products per page the Storefront API allows.
  pageSize: 250,
};

export function storefrontEndpoint(config = storefrontConfig) {
  return `https://${config.shopDomain}/api/${config.apiVersion}/graphql.json`;
}
