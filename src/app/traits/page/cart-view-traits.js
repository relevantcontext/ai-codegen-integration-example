import { SpyneTrait, SpyneAppProperties } from 'spyne';
import { CartLineItem } from 'components/page-items/cart-line-item.js';

// time for Shopify to set the unlock cookie in the new window before it is
// sent on to the checkout (the window is cross-origin, so its load cannot be
// observed; the POST is a single round trip)
const UNLOCK_SETTLE_MS = 1500;
const CHECKOUT_WINDOW = 'asteroid-metals-checkout';

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
    const shopify = SpyneAppProperties.config?.shopify ?? {};
    const note = this.props.el$('.cart-test-mode').el;
    if (note) note.hidden = shopify.testMode !== true;
    // the hosted checkout sits behind the store's password on a development
    // store: say so, and link the password page in a new tab so the visitor
    // can unlock the store and come back to the checkout link
    const hint = this.props.el$('.cart-password-hint').el;
    const autoUnlock = typeof shopify.storefrontUnlockPassword === 'string' && shopify.storefrontUnlockPassword !== '';
    if (hint) hint.hidden = shopify.storefrontPassword !== true || autoUnlock;
  }

  /**
   * Proceed to checkout. With an unlock password configured, unlock the
   * store first: a top-level POST of Shopify's password form into a new
   * window on the store's origin (the unlock cookie is first-party there;
   * a cross-site fetch could not set it), then send that window to the
   * cart's checkoutUrl, used whole. Without one, plain navigation. The
   * window is opened inside the click so popup blockers allow it; if one
   * still blocks it, the current tab goes to the checkout instead.
   */
  static cartView$OnCheckoutClick(e) {
    const checkoutUrl = e.payload?.checkoutUrl ?? '';
    if (!checkoutUrl) return;

    const { store, storefrontUnlockPassword } = SpyneAppProperties.config?.shopify ?? {};
    if (typeof storefrontUnlockPassword !== 'string' || !storefrontUnlockPassword || !store) {
      window.location.assign(checkoutUrl);
      return;
    }

    const win = window.open('', CHECKOUT_WINDOW);
    if (!win) {
      window.location.assign(checkoutUrl);
      return;
    }
    CartViewTraits.cartView$WriteInterstitial(win, this.props.ui.openingCheckout);

    const form = CartViewTraits.cartView$UnlockForm(store, storefrontUnlockPassword, CHECKOUT_WINDOW);
    document.body.appendChild(form);
    form.submit();
    form.remove();

    setTimeout(() => {
      try {
        win.location.href = checkoutUrl;
      } catch {
        window.location.assign(checkoutUrl);
      }
    }, UNLOCK_SETTLE_MS);
  }

  // ---- pure ----------------------------------------------------------------

  /** The new window shows one line while Shopify answers, instead of a blank page. */
  static cartView$WriteInterstitial(win, text = '') {
    try {
      win.document.write(
        `<!doctype html><title>${text}</title><body style="font-family:system-ui,sans-serif;padding:2rem;color:#111827"><p>${text}</p></body>`,
      );
      win.document.close();
    } catch {
      // cross-origin or closed window: nothing to write
    }
  }

  /**
   * Shopify's storefront password form — exactly the documented fields,
   * built off-template so it never passes through the CMS. The endpoint
   * has no documented redirect parameter (Shopify's assistant, 2026-10-18),
   * so the response lands on the store home and the timed hand-off above
   * takes the window on to the checkout; that flash is the cost of the
   * password on this store type, not something the form can avoid.
   */
  static cartView$UnlockForm(store, password, target) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://${store}/password`;
    form.target = target;
    form.hidden = true;
    const fields = { form_type: 'storefront_password', utf8: '✓', password };
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
    return form;
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
    // the button's dataset carries the live checkout URL — it rides the click's payload
    const checkout = this.props.el$('.cart-checkout').el;
    if (checkout) {
      checkout.dataset.checkoutUrl = checkoutUrl || '';
      checkout.disabled = !checkoutUrl;
    }
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
