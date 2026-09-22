import { SpyneTrait } from 'spyne';

export class CartLineTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'cartLine$';
    super(context, traitPrefix);
  }

  /** Birth state: a single unit cannot be decremented (Remove is the move). */
  static cartLine$OnRendered() {
    this.cartLine$ApplyLine(this.props.data);
  }

  /** Later cart state: this line's quantity and price, or its absence. */
  static cartLine$OnCartEvent(e) {
    const line = (e.payload.lines ?? []).find((l) => l.lineId === this.props.data.lineId);
    if (!line) {
      this.disposeViewStream();
      return;
    }
    this.cartLine$ApplyLine(line);
  }

  static cartLine$ApplyLine(line) {
    this.props.el$('.cart-line__qty-value').el.innerText = String(line.quantity);
    this.props.el$('.cart-line__price').el.innerText = line.price;
    this.props.el$('[data-line-action="decrement"]').el.disabled = line.quantity <= 1;
  }
}
