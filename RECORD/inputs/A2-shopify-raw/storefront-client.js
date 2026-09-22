import { storefrontConfig, storefrontEndpoint } from './config.js';

/**
 * Error raised for any failure talking to the Storefront API:
 * network failure, non-2xx HTTP status, or GraphQL-level errors.
 */
export class StorefrontError extends Error {
  constructor(message, { status = null, graphqlErrors = [], cause = null } = {}) {
    super(message);
    this.name = 'StorefrontError';
    this.status = status;
    this.graphqlErrors = graphqlErrors;
    this.cause = cause;
  }
}

/**
 * Send one GraphQL request to the Storefront API and return `data`.
 * Throws StorefrontError on any failure.
 */
export async function storefrontQuery(query, variables = {}, config = storefrontConfig) {
  if (!config.publicAccessToken || config.publicAccessToken.startsWith('REPLACE_')) {
    throw new StorefrontError('Storefront public access token is not configured.');
  }

  let response;
  try {
    response = await fetch(storefrontEndpoint(config), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.publicAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (cause) {
    throw new StorefrontError('Network error while contacting the Storefront API.', { cause });
  }

  if (!response.ok) {
    throw new StorefrontError(
      `Storefront API responded with HTTP ${response.status}.`,
      { status: response.status },
    );
  }

  let body;
  try {
    body = await response.json();
  } catch (cause) {
    throw new StorefrontError('Storefront API returned a non-JSON body.', {
      status: response.status,
      cause,
    });
  }

  if (Array.isArray(body.errors) && body.errors.length > 0) {
    throw new StorefrontError(
      `Storefront API GraphQL errors: ${body.errors.map((e) => e.message).join('; ')}`,
      { status: response.status, graphqlErrors: body.errors },
    );
  }

  if (!body.data) {
    throw new StorefrontError('Storefront API response contained no data.', {
      status: response.status,
    });
  }

  return body.data;
}
