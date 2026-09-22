import { Channel } from 'spyne';
import { ChannelCartTraits } from 'traits/channel/channel-cart-traits.js';

// Cart domain channel — the Shopify cart as application state. Admits the
// tiles' add-to-cart clicks from CHANNEL_UI, runs the Storefront cart
// mutations (channels cannot push into ChannelFetch, so the request rides
// ChannelFetchUtil inside the trait), rehydrates a cart id the storage
// channel hands back at boot, and emits the conformed cart under its own
// vocabulary. Replay: the cart is current state for any page that mounts.
export class ChannelCart extends Channel {
  constructor(name, props = {}) {
    name = 'CHANNEL_CART';
    props.replay = true;
    props.traits = [ChannelCartTraits];
    super(name, props);
    this.props.cart = ChannelCartTraits.channelCart$EmptyCart();
    this.props.queue = [];
    this.props.busy = false;
  }

  onRegistered() {
    this.channelCart$OnRegistered();
  }

  addRegisteredActions() {
    return ['CHANNEL_CART_UPDATED_EVENT', 'CHANNEL_CART_ERROR_EVENT'];
  }
}
