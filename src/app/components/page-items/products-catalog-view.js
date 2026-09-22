import { ViewStream } from 'spyne';
import { ProductsCatalogTraits } from 'traits/page/products-catalog-traits.js';

// Products catalog — the shop page's catalog section (heading, filter row,
// tile grid, footnote). Promoted from the data-defined prototype because the
// design declares behavior (filter dropdowns, add-to-cart) that a plain
// data-configured ViewStream cannot host: the ingress is declared here, the
// listeners arrive with the wiring stage. Products reach the tile through
// props.data.products; when the catalog moves to a commerce fetch channel the
// channel's conform map delivers the same product shape and the template is
// untouched.
export class ProductsCatalogView extends ViewStream {
  constructor(props = {}) {
    props.class = 'products-catalog';
    props.traits = [ProductsCatalogTraits];
    // derived, non-editable fields (filter options, result count) are computed
    // once from the supplied products — pure logic, run unbound before render
    props.data = ProductsCatalogTraits.productsCatalog$ShapeCatalogData(
      props.data,
    );
    super(props);
  }

  addActionListeners() {
    return [];
  }

  broadcastEvents() {
    return [
      ['.products-filter__select', 'change'],
      ['.product-acquire', 'click'],
    ];
  }

  onRendered() {}
}
