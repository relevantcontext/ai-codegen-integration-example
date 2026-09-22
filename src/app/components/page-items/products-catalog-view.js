import { ViewStream } from 'spyne';
import { ProductsCatalogTraits } from 'traits/page/products-catalog-traits.js';

// Products catalog — the shop page's catalog section (heading, filter row,
// tile grid, footnote). Renders its chrome from the page-item data and fills
// the grid with tiles: first the six products it was born with (the
// development fallback), then whatever CHANNEL_SHOPIFY delivers, which
// replaces them. Tiles are nested ProductTileItem views; the selects are
// this view's own and broadcast their changes for the wiring stage.
export class ProductsCatalogView extends ViewStream {
  constructor(props = {}) {
    props.class = 'products-catalog';
    props.traits = [ProductsCatalogTraits];
    props.channels = ['CHANNEL_SHOPIFY'];
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_SHOPIFY_CATALOG_EVENT', 'productsCatalog$OnCatalogEvent'],
    ];
  }

  broadcastEvents() {
    return [['.products-filter__select', 'change']];
  }

  onRendered() {
    this.productsCatalog$OnRendered();
  }
}
