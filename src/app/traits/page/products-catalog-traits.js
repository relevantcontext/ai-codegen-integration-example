import { SpyneTrait, safeClone } from 'spyne';

export class ProductsCatalogTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'productsCatalog$';
    super(context, traitPrefix);
  }

  /**
   * Shapes the catalog data for the logic-less template: the filter option
   * lists and the result count are derived from the products rather than
   * authored, so a product source with different metals or origins changes
   * the dropdowns without a content edit. Derived keys are added on a
   * safeClone so CMS proxy metadata on the authored keys survives.
   */
  static productsCatalog$ShapeCatalogData(data = {}) {
    const shaped = safeClone(data);
    const products = Array.isArray(shaped.products) ? shaped.products : [];

    shaped.metalOptions = ProductsCatalogTraits.productsCatalog$UniqueValues(
      products,
      'metal',
    );
    shaped.originOptions = ProductsCatalogTraits.productsCatalog$UniqueValues(
      products,
      'origin',
    );
    shaped.resultCount = products.length;

    // loop iterations substitute against the item alone (no parent-scope
    // walk), so the per-tile labels authored once at the catalog level are
    // copied onto each product for the template to reach
    // (added in place on the cloned items so the array keeps its own metadata)
    const tileKeys = ['priceLabel', 'addToCartLabel', 'attrAddToCartIconSrc'];
    products.forEach((tile) => {
      tileKeys.forEach((key) => {
        tile[key] = shaped[key];
      });
    });

    return shaped;
  }

  static productsCatalog$UniqueValues(products = [], key) {
    const values = products
      .map((p) => (typeof p[key] === 'string' ? p[key].trim() : ''))
      .filter((v) => v !== '');
    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }
}
