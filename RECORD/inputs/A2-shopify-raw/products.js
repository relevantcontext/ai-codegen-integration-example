import { storefrontConfig } from './config.js';
import { storefrontQuery } from './storefront-client.js';

// The Storefront API only ever exposes products published to the storefront
// channel, so no "published" filter is needed in the query.
const PRODUCTS_QUERY = /* GraphQL */ `
  query CatalogProducts($first: Int!, $after: String) {
    products(first: $first, after: $after, sortKey: TITLE) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        handle
        title
        productType
        tags
        variants(first: 1) {
          nodes {
            id
            title
            price {
              amount
              currencyCode
            }
            weight
            weightUnit
          }
        }
      }
    }
  }
`;

/**
 * Flatten one Storefront API product node into the shape the catalog renders.
 * @returns {{
 *   id: string, handle: string, title: string, productType: string, tags: string[],
 *   price: { amount: number, currencyCode: string } | null,
 *   weight: { value: number, unit: string } | null
 * }}
 */
export function toCatalogProduct(node) {
  const variant = node.variants?.nodes?.[0] ?? null;
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    productType: node.productType ?? '',
    tags: Array.isArray(node.tags) ? node.tags : [],
    price: variant?.price
      ? { amount: Number(variant.price.amount), currencyCode: variant.price.currencyCode }
      : null,
    weight: variant && variant.weight != null
      ? { value: Number(variant.weight), unit: variant.weightUnit }
      : null,
  };
}

/**
 * Fetch every published product, walking cursor pagination until exhausted.
 * Resolves to an array of catalog products. Rejects with StorefrontError.
 */
export async function fetchAllProducts(config = storefrontConfig) {
  const products = [];
  let after = null;

  do {
    const data = await storefrontQuery(
      PRODUCTS_QUERY,
      { first: config.pageSize ?? 250, after },
      config,
    );
    const connection = data.products;
    for (const node of connection.nodes) {
      products.push(toCatalogProduct(node));
    }
    after = connection.pageInfo.hasNextPage ? connection.pageInfo.endCursor : null;
  } while (after);

  return products;
}

/**
 * Small observable holder for the product list so a catalog section can
 * subscribe once and re-render whenever the list (or its status) changes.
 */
export function createProductList(config = storefrontConfig) {
  const listeners = new Set();
  let state = { status: 'idle', products: [], error: null };

  function emit() {
    for (const listener of listeners) listener(state);
  }

  function set(patch) {
    state = { ...state, ...patch };
    emit();
  }

  return {
    get state() {
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      listener(state);
      return () => listeners.delete(listener);
    },
    async load() {
      set({ status: 'loading', error: null });
      try {
        const products = await fetchAllProducts(config);
        set({ status: 'ready', products });
      } catch (error) {
        set({ status: 'error', error });
      }
      return state;
    },
  };
}
