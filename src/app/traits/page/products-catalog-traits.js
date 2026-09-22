import { SpyneTrait, DomElementTemplate, safeClone } from 'spyne';
import { ProductTileItem } from 'components/page-items/product-tile-item.js';

const OPTIONS_TMPL = `<option value="">{{allLabel}}</option>
{{#options}}<option value="{{.}}">{{.}}</option>{{/options}}`;

export class ProductsCatalogTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'productsCatalog$';
    super(context, traitPrefix);
  }

  // ---- structural: nesting, channel egress, region updates ---------------

  /** Birth data first: the local products are the development fallback. */
  static productsCatalog$OnRendered() {
    this.productsCatalog$RenderCatalog(this.props.data.products, 'fallback');
  }

  /** The Shopify catalog replaces the fallback; the fallback tiles retire themselves. */
  static productsCatalog$OnCatalogEvent(e) {
    const { products, source } = e.payload;
    this.productsCatalog$RenderCatalog(products, source);
  }

  static productsCatalog$RenderCatalog(products = [], source = 'fallback') {
    const data = this.props.data;
    const tiles = ProductsCatalogTraits.productsCatalog$ShapeTiles(products, data, source);
    const metals = ProductsCatalogTraits.productsCatalog$UniqueValues(tiles, 'metal');
    const origins = ProductsCatalogTraits.productsCatalog$UniqueValues(tiles, 'origin');

    tiles.forEach((tile) => {
      this.appendView(new ProductTileItem({ data: tile }), '.products-grid');
    });

    this.productsCatalog$SetOptions('metal', data.metalFilterAll, metals);
    this.productsCatalog$SetOptions('origin', data.originFilterAll, origins);
    this.props.el$('.products-count__value').el.innerText =
      `${tiles.length} ${data.showingUnit ?? ''}`.trim();
    this.props.el.dataset.catalogSource = source;
  }

  // the select element persists (its change broadcast stays bound); only its
  // options are regenerated from the current products
  static productsCatalog$SetOptions(key, allLabel = '', options = []) {
    const select = this.props.el$(`.products-filter__select[data-filter-key="${key}"]`).el;
    if (!select) return;
    select.innerHTML = new DomElementTemplate(OPTIONS_TMPL, { allLabel, options }).renderToString();
  }

  // ---- pure: shaping ------------------------------------------------------

  /**
   * A tile's data is the product plus the catalog-level labels it renders
   * (each tile is its own template, so the labels ride along) plus the
   * source it came from, which is how a tile knows when to retire.
   */
  static productsCatalog$ShapeTiles(products = [], data = {}, source = 'fallback') {
    const labels = {
      priceLabel: data.priceLabel,
      addToCartLabel: data.addToCartLabel,
      attrAddToCartIconSrc: data.attrAddToCartIconSrc,
    };
    return products.map((product) => {
      const tile = safeClone(product);
      Object.assign(tile, labels, { source });
      return tile;
    });
  }

  static productsCatalog$UniqueValues(products = [], key) {
    const values = products
      .map((p) => (typeof p[key] === 'string' ? p[key].trim() : ''))
      .filter((v) => v !== '');
    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }
}
