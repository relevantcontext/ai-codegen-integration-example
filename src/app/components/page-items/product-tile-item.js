import { ViewStream } from 'spyne';
import { ProductTileTraits } from 'traits/page/product-tile-traits.js';
import ProductTileTmpl from './templates/product-tile.tmpl.html';

// One catalog tile. Born from a product record (fallback or Shopify), it
// declares its own add-to-cart broadcast — tiles are rendered after the
// catalog's binding pass, so each carries its own declaration. It listens to
// the catalog channel to show or hide itself under the current filters and to
// retire when a catalog from a different source arrives, and to the cart
// channel to mark itself when its variant is in the cart.
export class ProductTileItem extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'article';
    props.class = 'product-tile';
    props.dataset = {
      productId: props.data.attrProductId,
      metal: props.data.metal,
      origin: props.data.origin,
      source: props.data.source,
    };
    props.traits = [ProductTileTraits];
    props.channels = ['CHANNEL_SHOPIFY', 'CHANNEL_CART'];
    props.template = ProductTileTmpl;
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_SHOPIFY_CATALOG_EVENT', 'productTile$OnCatalogEvent'],
      ['CHANNEL_CART_UPDATED_EVENT', 'productTile$OnCartEvent'],
    ];
  }

  broadcastEvents() {
    return [['.product-acquire', 'click']];
  }

  onRendered() {}
}
