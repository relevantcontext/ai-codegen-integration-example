import {
  SpyneTrait,
  SpyneAppProperties,
  ChannelPayloadFilter,
  ChannelFetchUtil,
} from 'spyne';

const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 50) {
    nodes {
      id quantity
      merchandise {
        ... on ProductVariant {
          id title
          price { amount currencyCode }
          product { handle title }
        }
      }
    }
  }`;

export class ChannelCartTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'channelCart$';
    super(context, traitPrefix);
  }

  // ---- structural: wiring -------------------------------------------------

  static channelCart$OnRegistered() {
    const addToCartFilter = new ChannelPayloadFilter({ action: 'add-to-cart' });
    this.getChannel('CHANNEL_UI', addToCartFilter).subscribe(
      this.channelCart$OnAddToCart.bind(this),
    );

    // the cart page's line controls: quantity up/down and remove
    const lineActionFilter = new ChannelPayloadFilter({ action: 'cart-line' });
    this.getChannel('CHANNEL_UI', lineActionFilter).subscribe(
      this.channelCart$OnLineAction.bind(this),
    );

    // the storage channel replays the persisted store at boot; a saved cart
    // id means a cart to rehydrate
    const storageInitFilter = new ChannelPayloadFilter({
      action: 'CHANNEL_LOCAL_STORAGE_APP_SETTINGS_INITIALIZED_EVENT',
    });
    this.getChannel('CHANNEL_LOCAL_STORAGE', storageInitFilter).subscribe(
      this.channelCart$OnStorageInit.bind(this),
    );
  }

  static channelCart$OnStorageInit(e) {
    const cartId = e.payload?.shopifyCartId;
    if (cartId && !this.props.cart.cartId) {
      this.channelCart$Enqueue({ type: 'load', cartId });
    }
  }

  /** The tile's dataset is the payload: which variant, which product. */
  static channelCart$OnAddToCart(e) {
    const { variantId, productId } = e.payload;
    if (!variantId) {
      this.channelCart$SendError({
        errorType: 'NO_VARIANT',
        message: `Product "${productId}" has no Shopify variant to add.`,
      });
      return;
    }
    this.channelCart$Enqueue({ type: 'add', variantId, productId, quantity: 1 });
  }

  /** A line control's dataset names the line and the move; the held cart supplies the quantity. */
  static channelCart$OnLineAction(e) {
    const { lineId, lineAction } = e.payload;
    const line = this.props.cart.lines.find((l) => l.lineId === lineId);
    if (!line) return;
    if (lineAction === 'remove' || (lineAction === 'decrement' && line.quantity <= 1)) {
      this.channelCart$Enqueue({ type: 'remove', lineId });
      return;
    }
    const quantity = lineAction === 'increment' ? line.quantity + 1 : line.quantity - 1;
    this.channelCart$Enqueue({ type: 'update', lineId, quantity });
  }

  // ---- structural: one mutation at a time ---------------------------------

  /**
   * Cart mutations are ordered: a second Acquire before the first cart exists
   * must add to that cart, not create another. Intents queue and run one at
   * a time (concat semantics); each result is reconciled before the next fires.
   */
  static channelCart$Enqueue(intent) {
    this.props.queue.push(intent);
    this.channelCart$RunNext();
  }

  static channelCart$RunNext() {
    if (this.props.busy || this.props.queue.length === 0) return;
    const intent = this.props.queue.shift();
    this.props.busy = true;

    const { query, variables } = ChannelCartTraits.channelCart$RequestFor(
      intent,
      this.props.cart.cartId,
    );
    const { store, apiVersion, storefrontAccessToken } = SpyneAppProperties.config.shopify;

    new ChannelFetchUtil(
      {
        url: `https://${store}/api/${apiVersion}/graphql.json`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        },
        body: { query, variables },
      },
      this.channelCart$OnMutationReturned.bind(this, intent),
    );
  }

  static channelCart$OnMutationReturned(intent, response) {
    const outcome = ChannelCartTraits.channelCart$ReconcileResponse(intent, response);

    if (outcome.status === 'error') {
      this.channelCart$SendError(outcome.error);
    } else {
      // 'confirmed' carries the server's cart; 'gone' (a stale saved id) resets
      this.props.cart = outcome.cart;
      this.channelCart$SendUpdated();
    }

    this.props.busy = false;
    this.channelCart$RunNext();
  }

  static channelCart$SendUpdated() {
    const cart = this.props.cart;
    this.sendChannelPayload('CHANNEL_CART_UPDATED_EVENT', {
      ...cart,
      isEmpty: cart.lines.length === 0,
    });
  }

  static channelCart$SendError(error = {}) {
    this.sendChannelPayload('CHANNEL_CART_ERROR_EVENT', {
      errorType: error.errorType ?? 'CART_ERROR',
      message: error.message ?? 'The cart could not be updated.',
      status: error.status,
    });
  }

  // ---- pure: requests, reconciliation, conform ----------------------------

  static channelCart$RequestFor(intent, cartId) {
    if (intent.type === 'load') {
      return {
        query: `query ($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`,
        variables: { id: intent.cartId },
      };
    }
    if (intent.type === 'update') {
      return {
        query: `mutation ($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ${CART_FIELDS} } userErrors { field message }
          }
        }`,
        variables: { cartId, lines: [{ id: intent.lineId, quantity: intent.quantity }] },
      };
    }
    if (intent.type === 'remove') {
      return {
        query: `mutation ($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart { ${CART_FIELDS} } userErrors { field message }
          }
        }`,
        variables: { cartId, lineIds: [intent.lineId] },
      };
    }
    const lines = [{ merchandiseId: intent.variantId, quantity: intent.quantity ?? 1 }];
    if (cartId) {
      return {
        query: `mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ${CART_FIELDS} } userErrors { field message }
          }
        }`,
        variables: { cartId, lines },
      };
    }
    return {
      query: `mutation ($input: CartInput!) {
        cartCreate(input: $input) { cart { ${CART_FIELDS} } userErrors { field message } }
      }`,
      variables: { input: { lines } },
    };
  }

  /** Typed outcome: confirmed (server cart), gone (stale id), error. */
  static channelCart$ReconcileResponse(intent, response = {}) {
    if (response.isChannelFetchError === true) {
      return { status: 'error', error: response };
    }
    if (Array.isArray(response.errors) && response.errors.length) {
      return {
        status: 'error',
        error: { errorType: 'GRAPHQL_ERROR', message: response.errors.map((x) => x.message).join('; ') },
      };
    }
    const data = response.data ?? {};
    const result =
      data.cartCreate ?? data.cartLinesAdd ?? data.cartLinesUpdate ?? data.cartLinesRemove ??
      { cart: data.cart, userErrors: [] };
    if (Array.isArray(result.userErrors) && result.userErrors.length) {
      return {
        status: 'error',
        error: { errorType: 'USER_ERROR', message: result.userErrors.map((x) => x.message).join('; ') },
      };
    }
    if (!result.cart) {
      return { status: 'gone', cart: ChannelCartTraits.channelCart$EmptyCart() };
    }
    return { status: 'confirmed', cart: ChannelCartTraits.channelCart$ConformCart(result.cart) };
  }

  static channelCart$EmptyCart() {
    return { cartId: '', checkoutUrl: '', totalQuantity: 0, subtotal: '', lines: [] };
  }

  static channelCart$ConformCart(cart = {}) {
    return {
      cartId: cart.id ?? '',
      checkoutUrl: ChannelCartTraits.channelCart$CheckoutUrl(cart.checkoutUrl ?? ''),
      totalQuantity: cart.totalQuantity ?? 0,
      subtotal: ChannelCartTraits.channelCart$FormatMoney(cart.cost?.subtotalAmount),
      lines: (cart.lines?.nodes ?? []).map((line) => ({
        lineId: line.id,
        quantity: line.quantity,
        variantId: line.merchandise?.id ?? '',
        variantTitle: line.merchandise?.title === 'Default Title' ? '' : (line.merchandise?.title ?? ''),
        productId: line.merchandise?.product?.handle ?? '',
        title: line.merchandise?.product?.title ?? '',
        price: ChannelCartTraits.channelCart$FormatMoney(line.merchandise?.price),
      })),
    };
  }

  /**
   * Shopify's checkoutUrl is a storefront URL; on a password-protected
   * storefront it is redirected to /password and the return target is lost.
   * When the config says the storefront is passworded, the link goes to the
   * password page with the checkout path as return_to (pure; config-driven).
   */
  static channelCart$CheckoutUrl(checkoutUrl = '') {
    const { storefrontPassword, store } = SpyneAppProperties.config?.shopify ?? {};
    if (!checkoutUrl || storefrontPassword !== true) return checkoutUrl;
    try {
      const url = new URL(checkoutUrl);
      const returnTo = encodeURIComponent(url.pathname + url.search);
      return `https://${store || url.host}/password?return_to=${returnTo}`;
    } catch {
      return checkoutUrl;
    }
  }

  static channelCart$FormatMoney(money) {
    if (!money) return '';
    const amount = Number(money.amount);
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: money.currencyCode,
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `${amount} ${money.currencyCode}`;
    }
  }
}
