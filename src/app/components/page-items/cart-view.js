import { ViewStream, ChannelPayloadFilter } from 'spyne';
import { CartViewTraits } from 'traits/page/cart-view-traits.js';

// The Cart page's cart: renders its chrome from the page-item data (author
// copy) and mirrors the cart channel — lines as nested CartLineItem views
// (each with its own quantity/remove controls), subtotal, checkout link,
// empty state. The cart channel replays, so a freshly mounted cart page
// shows the current cart at once. UI strings that are not author copy
// (control names for assistive technology, the error notice) are
// developer-owned defaults on props. The checkout link is this view's own
// broadcast: on a password-protected development store the trait unlocks
// the storefront in a new window before sending it to Shopify's checkout.
export class CartView extends ViewStream {
  constructor(props = {}) {
    props.class = 'cart-view';
    props.traits = [CartViewTraits];
    props.channels = ['CHANNEL_CART', 'CHANNEL_UI'];
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
    const checkoutFilter = new ChannelPayloadFilter({ action: 'checkout' });
    return [
      ['CHANNEL_CART_UPDATED_EVENT', 'cartView$OnCartEvent'],
      ['CHANNEL_CART_ERROR_EVENT', 'cartView$OnCartError'],
      ['CHANNEL_UI_CLICK_EVENT', 'cartView$OnCheckoutClick', checkoutFilter],
    ];
  }

  broadcastEvents() {
    return [['.cart-checkout', 'click']];
  }

  onRendered() {
    this.cartView$OnRendered();
  }
}
