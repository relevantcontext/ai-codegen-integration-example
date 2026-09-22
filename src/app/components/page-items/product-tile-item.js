import { ViewStream, ChannelPayloadFilter } from 'spyne';
import { ProductTileTraits } from 'traits/page/product-tile-traits.js';
import ProductTileTmpl from './templates/product-tile.tmpl.html';

// One catalog tile. Born from a catalog event's product record (fallback or
// Shopify), it declares its own add-to-cart broadcast — tiles are rendered
// after the catalog's binding pass, so each carries its own declaration. It
// listens to the catalog channel to show or hide itself under the current
// filters and to retire when a catalog from a different source arrives —
// skipping the replay of the event that spawned it (its visibility under
// that event rides its birth data) — to the cart channel to mark itself
// when its variant is in the cart and to confirm an add, and to its own
// Acquire click (reclaimed by product id) to show that the add is under way.
export class ProductTileItem extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'article';
    // sale is a fact of the product record, so it is a birth-time class
    props.class = props.data.isOnSale === true ? 'product-tile is-on-sale' : 'product-tile';
    props.dataset = {
      productId: props.data.attrProductId,
      metal: props.data.metal,
      origin: props.data.origin,
      source: props.data.source,
    };
    props.traits = [ProductTileTraits];
    props.channels = [['CHANNEL_SHOPIFY', true], 'CHANNEL_CART', 'CHANNEL_UI'];
    props.template = ProductTileTmpl;
    super(props);
  }

  addActionListeners() {
    const ownAcquireFilter = new ChannelPayloadFilter({
      action: 'add-to-cart',
      productId: this.props.data.attrProductId,
    });
    return [
      ['CHANNEL_SHOPIFY_CATALOG_EVENT', 'productTile$OnCatalogEvent'],
      ['CHANNEL_CART_UPDATED_EVENT', 'productTile$OnCartEvent'],
      ['CHANNEL_CART_ERROR_EVENT', 'productTile$OnCartError'],
      ['CHANNEL_UI_CLICK_EVENT', 'productTile$OnAcquireClick', ownAcquireFilter],
    ];
  }

  broadcastEvents() {
    return [['.product-acquire', 'click']];
  }

  onRendered() {
    this.productTile$OnRendered();
  }
}
