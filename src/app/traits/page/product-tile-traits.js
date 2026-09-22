import { SpyneTrait } from 'spyne';

export class ProductTileTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'productTile$';
    super(context, traitPrefix);
  }

  /** Visibility under the spawning event arrives as birth data. */
  static productTile$OnRendered() {
    this.productTile$SetVisible(this.props.data.isVisible !== false);
  }

  /**
   * One label, two outcomes, decided on the tile's own birth data: a catalog
   * from another source means this tile's generation is over; the same
   * source means the visible set may have changed. The birth replay is
   * skipped at subscription, so every payload here is a later emission.
   */
  static productTile$OnCatalogEvent(e) {
    const { source, visibleIds = [] } = e.payload;
    if (source !== this.props.data.source) {
      this.disposeViewStream();
      return;
    }
    this.productTile$SetVisible(visibleIds.includes(this.props.data.attrProductId));
  }

  static productTile$SetVisible(isVisible) {
    this.props.el.classList.toggle('is-filtered-out', !isVisible);
  }

  /** The cart is state; the tile mirrors whether its variant is in it. */
  static productTile$OnCartEvent(e) {
    const lines = e.payload.lines ?? [];
    const inCart = lines.some((line) => line.variantId === this.props.data.attrVariantId);
    this.props.el.classList.toggle('is-in-cart', inCart);
  }
}
