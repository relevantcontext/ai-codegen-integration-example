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

  /**
   * The chrome renders from birth data; the tiles come only from the catalog
   * channel, which replays — so a page born after the catalog exists fills
   * at once, and one born before fills when the channel's fallback (the
   * app-model products) or the Shopify catalog arrives. Tiles are never
   * born from birth data, so no tile is ever retired by its own birth replay.
   */
  static productsCatalog$OnRendered() {
    this.props.el.dataset.catalogSource = 'none';
  }

  /**
   * The channel's payload is complete state. A new source means a new set
   * of tiles (the previous generation retires itself); every payload syncs
   * the selects and the count to the filters and the visible set.
   */
  static productsCatalog$OnCatalogEvent(e) {
    const { products, source, filters = {}, visibleIds = [], count } = e.payload;
    if (this.props.el.dataset.catalogSource !== source) {
      this.productsCatalog$RenderCatalog(products, source, visibleIds);
    }
    this.productsCatalog$SyncFilters(filters, count);
  }

  static productsCatalog$RenderCatalog(products = [], source = 'fallback', visibleIds = []) {
    const data = this.props.data;
    const tiles = ProductsCatalogTraits.productsCatalog$ShapeTiles(products, data, source, visibleIds);
    const metals = ProductsCatalogTraits.productsCatalog$UniqueValues(tiles, 'metal');
    const origins = ProductsCatalogTraits.productsCatalog$UniqueValues(tiles, 'origin');

    tiles.forEach((tile) => {
      this.appendView(new ProductTileItem({ data: tile }), '.products-grid');
    });

    this.productsCatalog$SetOptions('metal', data.metalFilterAll, metals);
    this.productsCatalog$SetOptions('origin', data.originFilterAll, origins);
    this.productsCatalog$SetCount(tiles.length);
    this.props.el.dataset.catalogSource = source;
  }

  static productsCatalog$SyncFilters(filters = {}, count) {
    Object.entries(filters).forEach(([key, value]) => {
      const select = this.props.el$(`.products-filter__select[data-filter-key="${key}"]`).el;
      if (select && select.value !== value) select.value = value;
    });
    if (typeof count === 'number') this.productsCatalog$SetCount(count);
  }

  static productsCatalog$SetCount(count = 0) {
    this.props.el$('.products-count__value').el.innerText =
      `${count} ${this.props.data.showingUnit ?? ''}`.trim();
  }

  // the select element persists (its change broadcast stays bound); only its
  // options are regenerated from the current products
  static productsCatalog$SetOptions(key, allLabel = '', options = []) {
    const select = this.props.el$(`.products-filter__select[data-filter-key="${key}"]`).el;
    if (!select) return;
    const current = select.value;
    select.innerHTML = new DomElementTemplate(OPTIONS_TMPL, { allLabel, options }).renderToString();
    if (options.includes(current)) select.value = current;
  }

  // ---- pure: shaping ------------------------------------------------------

  /**
   * A tile's data is the product plus the catalog-level labels it renders
   * (each tile is its own template, so the labels ride along), the source it
   * came from (how a tile knows when to retire), and whether the current
   * filters show it (the tile skips its birth replay, so the birth event's
   * visible set rides its data instead).
   */
  static productsCatalog$ShapeTiles(products = [], data = {}, source = 'fallback', visibleIds = []) {
    const labels = {
      priceLabel: data.priceLabel,
      addToCartLabel: data.addToCartLabel,
      addingLabel: data.addingLabel,
      addedLabel: data.addedLabel,
      attrAddToCartIconSrc: data.attrAddToCartIconSrc,
    };
    return products.map((product) => {
      const tile = safeClone(product);
      Object.assign(tile, labels, {
        source,
        isVisible: visibleIds.includes(product.attrProductId),
        // assistive name for the button: the action label plus the product
        attrAcquireLabel: `${data.addToCartLabel ?? ''} ${product.name ?? ''}`.trim(),
      });
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
