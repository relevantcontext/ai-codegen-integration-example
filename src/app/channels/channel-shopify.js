import { Channel } from 'spyne';
import { ChannelShopifyTraits } from 'traits/channel/channel-shopify-traits.js';

// Shopify domain channel — the catalog's source of truth. Acquires the
// Storefront fetch (CHANNEL_FETCH_SHOPIFY) together with the app model
// (CHANNEL_FETCH_MODEL, for the local products' images and the development
// fallback), conforms both into one catalog payload, and emits it under its
// own vocabulary. Views only ever receive. Replay: a catalog is current
// state, so a shop page born after the fetch resolved gets it at once.
export class ChannelShopify extends Channel {
  constructor(name, props = {}) {
    name = 'CHANNEL_SHOPIFY';
    props.replay = true;
    props.traits = [ChannelShopifyTraits];
    super(name, props);
    this.props.catalog = { products: [], source: 'none' };
  }

  onRegistered() {
    this.channelShopify$OnRegistered();
  }

  addRegisteredActions() {
    return ['CHANNEL_SHOPIFY_CATALOG_EVENT', 'CHANNEL_SHOPIFY_ERROR_EVENT'];
  }
}
