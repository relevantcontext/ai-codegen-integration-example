import { SpyneTrait } from 'spyne';

export class ProductTileTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'productTile$';
    super(context, traitPrefix);
  }

  /**
   * One label, two outcomes, decided on the tile's own birth data: a catalog
   * from another source means this tile's generation is over; the same
   * source means the visible set may have changed. (A tile's own replayed
   * birth event lands here too — same source, so it only applies filters.)
   */
  static productTile$OnCatalogEvent(e) {
    const { source, visibleIds = [] } = e.payload;
    if (source !== this.props.data.source) {
      this.disposeViewStream();
      return;
    }
    const isVisible = visibleIds.includes(this.props.data.attrProductId);
    this.props.el.classList.toggle('is-filtered-out', !isVisible);
  }

  /** The cart is state; the tile mirrors whether its variant is in it. */
  static productTile$OnCartEvent(e) {
    const lines = e.payload.lines ?? [];
    const inCart = lines.some((line) => line.variantId === this.props.data.attrVariantId);
    this.props.el.classList.toggle('is-in-cart', inCart);
  }
}
