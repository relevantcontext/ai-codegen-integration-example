import { ViewStream } from 'spyne';
import { CartViewTraits } from 'traits/page/cart-view-traits.js';

// The Cart page's cart: renders its chrome from the page-item data (author
// copy) and mirrors the cart channel — lines as nested CartLineItem views
// (each with its own quantity/remove controls), subtotal, checkout link,
// empty state. The cart channel replays, so a freshly mounted cart page
// shows the current cart at once. UI strings that are not author copy
// (control names for assistive technology, the error notice) are
// developer-owned defaults on props.
export class CartView extends ViewStream {
  constructor(props = {}) {
    props.class = 'cart-view';
    props.traits = [CartViewTraits];
    props.channels = ['CHANNEL_CART'];
    props.ui = {
      removeLabel: 'Remove',
      quantityGroup: 'Quantity',
      decrement: 'Decrease quantity',
      increment: 'Increase quantity',
      remove: 'Remove from cart',
      errorText: 'The cart could not be updated. Please try again.',
      ...(props.ui ?? {}),
    };
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
