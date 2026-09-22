import { SpyneTrait, DomElementTemplate } from 'spyne';

const LINES_TMPL = `{{#lines}}
<li class="cart-line" data-line-id="{{lineId}}">
  <span class="cart-line__title">{{title}}</span>
  <span class="cart-line__variant">{{variantTitle}}</span>
  <span class="cart-line__qty">× {{quantity}}</span>
  <span class="cart-line__price">{{price}}</span>
</li>
{{/lines}}`;

export class CartViewTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'cartView$';
    super(context, traitPrefix);
  }

  /** Empty until the channel says otherwise (replay makes that immediate). */
  static cartView$OnRendered() {
    this.props.el.classList.add('is-empty');
  }

  static cartView$OnCartEvent(e) {
    const { lines = [], subtotal = '', checkoutUrl = '', isEmpty } = e.payload;
    const root = this.props.el;

    this.props.el$('.cart-lines').el.innerHTML = new DomElementTemplate(
      LINES_TMPL,
      { lines },
    ).renderToString();
    this.props.el$('.cart-total__value').el.innerText = subtotal;

    const checkout = this.props.el$('.cart-checkout').el;
    if (checkout) checkout.href = checkoutUrl || '#';

    this.props.el$('.cart-error').el.innerText = '';
    root.classList.toggle('is-empty', isEmpty === true || lines.length === 0);
  }

  static cartView$OnCartError(e) {
    this.props.el$('.cart-error').el.innerText = e.payload.message ?? '';
  }
}
