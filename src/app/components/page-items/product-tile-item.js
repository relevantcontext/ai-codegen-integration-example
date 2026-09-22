import { ViewStream, ChannelPayloadFilter } from 'spyne';
import ProductTileTmpl from './templates/product-tile.tmpl.html';

// One catalog tile. Born from a product record (fallback or Shopify), it
// declares its own add-to-cart broadcast — tiles are rendered after the
// catalog's binding pass, so each carries its own declaration — and retires
// itself when a catalog from a different source arrives: the fallback tiles
// leave when Shopify answers; Shopify tiles ignore their own birth event.
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
    props.channels = ['CHANNEL_SHOPIFY'];
    props.template = ProductTileTmpl;
    super(props);
  }

  addActionListeners() {
    const otherSourceFilter = new ChannelPayloadFilter({
      source: (source) => source !== this.props.data.source,
    });
    return [
      ['CHANNEL_SHOPIFY_CATALOG_EVENT', 'disposeViewStream', otherSourceFilter],
    ];
  }

  broadcastEvents() {
    return [['.product-acquire', 'click']];
  }

  onRendered() {}
}
