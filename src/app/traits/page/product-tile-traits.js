import { SpyneTrait } from 'spyne';

const ADDED_STATE_MS = 1600;

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

  // ---- add-to-cart feedback: adding -> added -> in cart ------------------

  /** The tile's own Acquire click, reclaimed by product id: the add is under way. */
  static productTile$OnAcquireClick() {
    this.productTile$SetButtonState('adding');
  }

  /**
   * The cart is state; the tile mirrors whether its variant is in it. If this
   * tile was mid-add, the cart's arrival is the confirmation: a short "added"
   * state, then back to the resting label with the in-cart mark kept.
   */
  static productTile$OnCartEvent(e) {
    const lines = e.payload.lines ?? [];
    const inCart = lines.some((line) => line.variantId === this.props.data.attrVariantId);
    this.props.el.classList.toggle('is-in-cart', inCart);

    if (this.props.el.classList.contains('is-adding')) {
      this.productTile$SetButtonState(inCart ? 'added' : 'idle');
      if (inCart) {
        // the tile may be disposed (route change) before the timer fires
        setTimeout(() => {
          if (this.props?.el?.isConnected) this.productTile$SetButtonState('idle');
        }, ADDED_STATE_MS);
      }
    }
  }

  static productTile$OnCartError() {
    if (this.props.el.classList.contains('is-adding')) {
      this.productTile$SetButtonState('idle');
    }
  }

  /** Button state is a class on the tile plus the label the data provides for it. */
  static productTile$SetButtonState(state = 'idle') {
    const { addToCartLabel, addingLabel, addedLabel } = this.props.data;
    const labels = { idle: addToCartLabel, adding: addingLabel || addToCartLabel, added: addedLabel || addToCartLabel };
    const el = this.props.el;
    el.classList.toggle('is-adding', state === 'adding');
    el.classList.toggle('is-added', state === 'added');
    const button = this.props.el$('.product-acquire').el;
    if (!button) return;
    button.setAttribute('aria-busy', state === 'adding' ? 'true' : 'false');
    button.disabled = state === 'adding';
    this.props.el$('.product-acquire__label').el.innerText = labels[state] ?? addToCartLabel;
  }
}
