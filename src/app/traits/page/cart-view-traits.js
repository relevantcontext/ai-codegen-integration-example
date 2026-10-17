import { SpyneTrait, SpyneAppProperties } from 'spyne';
import { CartLineItem } from 'components/page-items/cart-line-item.js';

export class CartViewTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'cartView$';
    super(context, traitPrefix);
  }

  /**
   * Empty until the channel says otherwise (replay makes that immediate).
   * The test-mode notice is author copy, shown only while the config says
   * payments are test-only.
   */
  static cartView$OnRendered() {
    this.props.el.classList.add('is-empty');
    const note = this.props.el$('.cart-test-mode').el;
    if (note) note.hidden = SpyneAppProperties.config?.shopify?.testMode !== true;
  }

  /**
   * Lines are views: the ones already rendered update or retire themselves
   * from the same event; this view nests only the lines it has not seen.
   * Totals, checkout link and the empty state are this view's own regions.
   */
  static cartView$OnCartEvent(e) {
    const { lines = [], subtotal = '', checkoutUrl = '', isEmpty } = e.payload;

    const rendered = new Set(this.props.el$('.cart-line').els.map((el) => el.dataset.lineId));
    lines
      .filter((line) => !rendered.has(line.lineId))
      .forEach((line) => {
        const data = CartViewTraits.cartView$ShapeLine(line, this.props.ui);
        this.appendView(new CartLineItem({ data }), '.cart-lines');
      });

    this.props.el$('.cart-total__value').el.innerText = subtotal;
    const checkout = this.props.el$('.cart-checkout').el;
    if (checkout) checkout.href = checkoutUrl || '#';
    this.props.el$('.cart-error').el.innerText = '';
    this.props.el.classList.toggle('is-empty', isEmpty === true || lines.length === 0);
  }

  /** The visitor sees the developer-owned notice; the channel's message stays on the console. */
  static cartView$OnCartError() {
    this.props.el$('.cart-error').el.innerText = this.props.ui.errorText;
  }

  // ---- pure ----------------------------------------------------------------

  /** A line's data plus the control names assistive technology reads. */
  static cartView$ShapeLine(line, ui = {}) {
    return {
      ...line,
      removeLabel: ui.removeLabel,
      attrQuantityGroupLabel: `${ui.quantityGroup}: ${line.title}`,
      attrDecrementLabel: `${ui.decrement}: ${line.title}`,
      attrIncrementLabel: `${ui.increment}: ${line.title}`,
      attrRemoveLabel: `${ui.remove}: ${line.title}`,
    };
  }
}
