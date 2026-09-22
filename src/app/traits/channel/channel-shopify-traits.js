import { SpyneTrait, ChannelPayloadFilter } from 'spyne';

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
   * is routed to the error label, and the catalog falls back to the products
   * authored in the app model. The filter selects broadcast into CHANNEL_UI;
   * this channel admits them by their dataset action and holds the filter
   * state, so every consumer reads one catalog payload.
   */
  static channelShopify$OnRegistered() {
    this.mergeChannels(['CHANNEL_FETCH_SHOPIFY', 'CHANNEL_FETCH_MODEL']).subscribe(
      this.channelShopify$OnSourcesReturned.bind(this),
    );

    // the app model alone is enough for a catalog: the local products are
    // served as the fallback the moment they exist, and stand until Shopify
    // answers (or for good, if it never does)
    const modelFilter = new ChannelPayloadFilter({ action: 'CHANNEL_FETCH_MODEL_RESPONSE_EVENT' });
    this.getChannel('CHANNEL_FETCH_MODEL', modelFilter).subscribe(
      this.channelShopify$OnModelReturned.bind(this),
    );

    const filterSelectFilter = new ChannelPayloadFilter({ action: 'filter' });
    this.getChannel('CHANNEL_UI', filterSelectFilter).subscribe(
      this.channelShopify$OnFilterChange.bind(this),
    );
  }

  static channelShopify$OnModelReturned(e) {
    if (this.props.catalog.source !== 'none') return;
    const localProducts = ChannelShopifyTraits.channelShopify$LocalProducts(e.payload);
    if (localProducts.length === 0) return;
    this.props.catalog = { products: localProducts, source: 'fallback' };
    this.channelShopify$SendCatalog(false);
  }

  static channelShopify$OnSourcesReturned(e) {
    const shopify = e['CHANNEL_FETCH_SHOPIFY'].payload;
    const model = e['CHANNEL_FETCH_MODEL'].payload;
    const localProducts = ChannelShopifyTraits.channelShopify$LocalProducts(model);

    const hasProducts = Array.isArray(shopify.products) && shopify.products.length > 0;
    if (shopify.isChannelFetchError === true || !hasProducts) {
      const { errorType = 'EMPTY_CATALOG', message = 'The Storefront API returned no published products.', status } = shopify;
      this.props.catalog = { products: localProducts, source: 'fallback' };
      this.sendChannelPayload('CHANNEL_SHOPIFY_ERROR_EVENT', {
        errorType,
        message,
        status,
        source: 'fallback',
      });
      this.channelShopify$SendCatalog(false);
      return;
    }

    const products = ChannelShopifyTraits.channelShopify$MergeImages(
      shopify.products,
      localProducts,
    );
    this.props.catalog = { products, source: 'shopify' };
    this.channelShopify$SendCatalog(false);
  }

  /** A select changed: the dataset names the key, the element carries the value. */
  static channelShopify$OnFilterChange(e) {
    const { filterKey } = e.payload;
    if (!filterKey) return;
    const value = e.srcElement?.el?.value ?? '';
    this.props.filters = { ...this.props.filters, [filterKey]: value };
    this.channelShopify$SendCatalog(true);
  }

  /**
   * One label, complete state on every emission: the channel replays, so a
   * shop page born after any number of filter changes receives the products,
   * the source, the filters and the visible set in a single payload.
   */
  static channelShopify$SendCatalog(isFilterUpdate = false) {
    const { products, source } = this.props.catalog;
    const filters = { ...this.props.filters };
    const visible = ChannelShopifyTraits.channelShopify$ApplyFilters(products, filters);
    this.sendChannelPayload('CHANNEL_SHOPIFY_CATALOG_EVENT', {
      products,
      source,
      filters,
      visibleIds: visible.map((p) => p.attrProductId),
      count: visible.length,
      total: products.length,
      isFilterUpdate,
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
          variants(first: 1) { nodes { id price { amount currencyCode } compareAtPrice { amount currencyCode } weight weightUnit } }
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
      // presence = shape: `sale` exists only when there is a higher compare-at
      // price, so the template's object section renders the struck price
      // for sale items and nothing otherwise
      ...ChannelShopifyTraits.channelShopify$SaleFields(variant),
      attrImageSrc: node.featuredImage?.url ?? '',
      attrImageAlt: node.featuredImage?.altText ?? node.title ?? '',
    };
  }

  static channelShopify$SaleFields(variant) {
    const price = Number(variant?.price?.amount);
    const compareAt = Number(variant?.compareAtPrice?.amount);
    const isOnSale = Number.isFinite(price) && Number.isFinite(compareAt) && compareAt > price;
    return isOnSale
      ? { isOnSale: true, sale: { compareAtPrice: ChannelShopifyTraits.channelShopify$FormatPrice(variant.compareAtPrice) } }
      : { isOnSale: false };
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

  // ---- pure: filtering ----------------------------------------------------

  /** Empty filter values mean "all"; set values match the product's field exactly. */
  static channelShopify$ApplyFilters(products = [], filters = {}) {
    const active = Object.entries(filters).filter(([, value]) => value !== '' && value != null);
    if (active.length === 0) return products;
    return products.filter((product) =>
      active.every(([key, value]) => String(product[key] ?? '') === String(value)),
    );
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
