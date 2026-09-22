import { SpyneTrait } from 'spyne';

export class NavPrimaryViewTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'nav$';

    super(context, traitPrefix);
  }

  static nav$UIHeaderNavViewUpdateSettingsBtn(type, value) {
    this.props.el$(`[data-settings-type="${type}"]`).el.dataset.settingsValue =
      value;
  }

  static nav$UIHeaderNavViewOnSettingsInit(e) {
    const { theme } = e.payload;
    this.nav$UIHeaderNavViewUpdateSettingsBtn('theme', theme);
  }

  static nav$UIHeaderNavViewOnSettingsEvent(e) {
    const { settingsType, settingsValue } = e.payload;
    this.nav$UIHeaderNavViewUpdateSettingsBtn(settingsType, settingsValue);
  }

  static nav$UIHeaderNavViewOnRouteChangeEvent(e) {
    const { pageId } = e.payload;
    const activeSel = `a.nav[data-page-id='${pageId}']`;
    this.props.el$('a.nav').setActiveItem('selected', activeSel);
  }

  /**
   * The cart link carries a count badge from the cart channel's state — a
   * live mirror on the link the nav already renders; the badge is created
   * on first use and hidden at zero. The link's accessible name says the
   * count too.
   */
  static nav$OnCartEvent(e) {
    const { totalQuantity = 0 } = e.payload;
    const link = this.props.el$('a.nav[data-page-id="cart"]').el;
    if (!link) return;
    let badge = link.querySelector('.nav-cart-count');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'nav-cart-count';
      badge.setAttribute('aria-hidden', 'true');
      link.appendChild(badge);
    }
    badge.innerText = String(totalQuantity);
    badge.hidden = totalQuantity === 0;
    const title = link.dataset.text || link.textContent.trim();
    link.setAttribute(
      'aria-label',
      totalQuantity === 0 ? title : `${title}, ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}`,
    );
  }
}
