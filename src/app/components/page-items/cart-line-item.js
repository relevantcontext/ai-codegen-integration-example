import { ViewStream } from 'spyne';
import { CartLineTraits } from 'traits/page/cart-line-traits.js';
import CartLineTmpl from './templates/cart-line.tmpl.html';

// One cart line. Born from a cart event's line record, it declares its own
// quantity and remove broadcasts (lines are rendered after the cart view's
// binding pass, so each carries its own declaration), skips the replay of
// the event that spawned it, and on later cart events updates its quantity
// and price or retires when its line is gone from the cart.
export class CartLineItem extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'li';
    props.class = 'cart-line';
    props.dataset = { lineId: props.data.lineId, variantId: props.data.variantId };
    props.traits = [CartLineTraits];
    props.channels = [['CHANNEL_CART', true]];
    props.template = CartLineTmpl;
    super(props);
  }

  addActionListeners() {
    return [['CHANNEL_CART_UPDATED_EVENT', 'cartLine$OnCartEvent']];
  }

  broadcastEvents() {
    return [['button', 'click']];
  }

  onRendered() {
    this.cartLine$OnRendered();
  }
}
