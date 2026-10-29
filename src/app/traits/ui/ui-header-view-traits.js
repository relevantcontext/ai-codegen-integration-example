import { SpyneTrait } from 'spyne';
import { NavPrimaryView } from 'components/nav/nav-primary-view.js';
import { NavHeaderHamburgerItem } from 'components/nav/nav-header-hamburger-item.js';

export class UIHeaderViewTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'uiHeader$';

    super(context, traitPrefix);
  }

  static uiHeader$AddNavLinks(navLinks = []) {
    const data = navLinks.filter((o) => o.navLevel === 1);
    this.appendView(new NavPrimaryView({ data }), '.header-content');
  }

  static uiHeader$OnAppDataEvent(logoTxt = '') {
    this.props.el$('.branding h1 span').el.innerHTML = logoTxt;
  }

  /** The source-repository line under the nav: shown only when both the text and the href are authored. */
  static uiHeader$OnSourceLinkData(text = '', href = '') {
    const line = this.props.el$('.source-link').el;
    const anchor = this.props.el$('.source-link__anchor').el;
    const isAuthored =
      typeof text === 'string' &&
      text !== '' &&
      typeof href === 'string' &&
      href !== '';
    if (isAuthored) {
      anchor.innerText = text;
      anchor.href = href;
      // set here, not in the template: the template sanitizer drops target
      anchor.target = '_blank';
      anchor.rel = 'noopener';
    }
    line.hidden = !isAuthored;
  }

  static uiHeader$UIHeaderViewOnAppInitEvent(e) {
    const { initData } = e.payload;
    const { navLinks, header, sourceLinkText, sourceLinkHref } = initData;
    this.uiHeader$AddNavLinks(navLinks);
    this.uiHeader$OnAppDataEvent(header);
    this.uiHeader$OnSourceLinkData(sourceLinkText, sourceLinkHref);
  }

  static uiHeader$UIHeaderViewOnRendered() {
    this.appendView(new NavHeaderHamburgerItem());
  }
}
