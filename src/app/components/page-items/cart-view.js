import { ViewStream } from 'spyne';
import { CartViewTraits } from 'traits/page/cart-view-traits.js';

// The Cart page's cart: renders its chrome from the page-item data and
// mirrors the cart channel — lines, subtotal, checkout link, empty state.
// Lines carry no behavior of their own here, so they are a rendered region,
// not nested views. The cart channel replays, so a freshly mounted cart page
// shows the current cart at once.
export class CartView extends ViewStream {
  constructor(props = {}) {
    props.class = 'cart-view';
    props.traits = [CartViewTraits];
    props.channels = ['CHANNEL_CART'];
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_CART_UPDATED_EVENT', 'cartView$OnCartEvent'],
      ['CHANNEL_CART_ERROR_EVENT', 'cartView$OnCartError'],
    ];
  }

  broadcastEvents() {
    return [];
  }

  onRendered() {
    this.cartView$OnRendered();
  }
}
