import { SpyneTrait } from 'spyne';

export class ChannelShopifyTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'channelShopify$';
    super(context, traitPrefix);
  }

  // ---- structural: wiring, state, emission -------------------------------

  /**
   * Both sources are boot-time fetches, so a snapshot merge is the sync
   * point: the catalog is conformed once both have answered. A failed
   * Storefront fetch still arrives here (as its conformed error payload) and
   * is routed to the error label; the view keeps the fallback it was born with.
   */
  static channelShopify$OnRegistered() {
    this.mergeChannels(['CHANNEL_FETCH_SHOPIFY', 'CHANNEL_FETCH_MODEL']).subscribe(
      this.channelShopify$OnSourcesReturned.bind(this),
    );
  }

  static channelShopify$OnSourcesReturned(e) {
    const shopify = e['CHANNEL_FETCH_SHOPIFY'].payload;
    const model = e['CHANNEL_FETCH_MODEL'].payload;

    if (shopify.isChannelFetchError === true) {
      const { errorType, message, status } = shopify;
      this.sendChannelPayload('CHANNEL_SHOPIFY_ERROR_EVENT', {
        errorType,
        message,
        status,
        source: 'fallback',
      });
      return;
    }

    // an empty catalog is "no data" too: the view keeps its fallback
    if (!Array.isArray(shopify.products) || shopify.products.length === 0) {
      this.sendChannelPayload('CHANNEL_SHOPIFY_ERROR_EVENT', {
        errorType: 'EMPTY_CATALOG',
        message: 'The Storefront API returned no published products.',
        source: 'fallback',
      });
      return;
    }

    const localProducts = ChannelShopifyTraits.channelShopify$LocalProducts(model);
    const products = ChannelShopifyTraits.channelShopify$MergeImages(
      shopify.products,
      localProducts,
    );

    this.props.catalog = { products, source: 'shopify' };
    this.sendChannelPayload('CHANNEL_SHOPIFY_CATALOG_EVENT', {
      products,
      source: 'shopify',
      count: products.length,
    });
  }

  // ---- pure: the request and the conform at the fetch boundary -------------

  /** Every published product with the fields the catalog binds. */
  static channelShopify$CatalogQuery() {
    return `{
      products(first: 250, sortKey: TITLE) {
        nodes {
          id handle title productType tags
          featuredImage { url altText }
          variants(first: 1) { nodes { id price { amount currencyCode } weight weightUnit } }
        }
      }
    }`;
  }

  /**
   * ChannelFetch map for CHANNEL_FETCH_SHOPIFY: the Storefront response is
   * shaped once, here, into the product shape the catalog template binds
   * (the A1 shape). Product type carries the metal, the first tag the origin
   * asteroid, the first variant the price and the mass (weight in grams).
   */
  static channelShopify$ConformCatalog(data = {}) {
    const nodes = data?.data?.products?.nodes ?? [];
    return { products: nodes.map(ChannelShopifyTraits.channelShopify$ConformProduct) };
  }

  static channelShopify$ConformProduct(node = {}) {
    const variant = node.variants?.nodes?.[0] ?? null;
    return {
      attrProductId: node.handle ?? '',
      attrVariantId: variant?.id ?? '',
      name: node.title ?? '',
      metal: node.productType ?? '',
      origin: Array.isArray(node.tags) && node.tags.length ? node.tags[0] : '',
      mass: ChannelShopifyTraits.channelShopify$FormatMass(variant),
      price: ChannelShopifyTraits.channelShopify$FormatPrice(variant?.price),
      attrImageSrc: node.featuredImage?.url ?? '',
      attrImageAlt: node.featuredImage?.altText ?? node.title ?? '',
    };
  }

  static channelShopify$FormatMass(variant) {
    if (!variant || variant.weight == null) return '';
    const units = { GRAMS: 'g', KILOGRAMS: 'kg', OUNCES: 'oz', POUNDS: 'lb' };
    return `${Number(variant.weight)}${units[variant.weightUnit] ?? ''}`;
  }

  static channelShopify$FormatPrice(price) {
    if (!price) return '';
    const amount = Number(price.amount);
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currencyCode,
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `${amount} ${price.currencyCode}`;
    }
  }

  // ---- pure: the local products and their images ---------------------------

  /** The six products authored in app.model.json — the development fallback. */
  static channelShopify$LocalProducts(model = {}) {
    const shop = (model.content ?? []).find((node) => node.pageId === 'shop');
    const catalog = (shop?.pageItems ?? []).find(
      (item) => item.viewClass === 'ProductsCatalogView',
    );
    return catalog?.props?.data?.products ?? [];
  }

  /**
   * Shopify carries no images for these products; the app does, keyed by
   * product id. A Storefront image wins when present.
   */
  static channelShopify$MergeImages(products = [], localProducts = []) {
    const localById = new Map(localProducts.map((p) => [p.attrProductId, p]));
    return products.map((product) => {
      if (product.attrImageSrc) return product;
      const local = localById.get(product.attrProductId);
      return {
        ...product,
        attrImageSrc: local?.attrImageSrc ?? 'imgs/placeholder-solid.svg',
        attrImageAlt: local?.attrImageAlt ?? product.attrImageAlt,
      };
    });
  }
}
