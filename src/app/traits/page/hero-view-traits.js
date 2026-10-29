import { SpyneTrait } from 'spyne';

export class HeroViewTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'hero$';
    super(context, traitPrefix);
  }

  /**
   * The ribbon is an external link authored with the hero (ribbonText,
   * attrRibbonHref); a hero without one renders the anchor empty and it is
   * removed. target and rel are set here because the template sanitizer
   * drops target.
   */
  static hero$OnRendered() {
    const ribbon = this.props.el$('.hero__ribbon').el;
    if (!ribbon) return;
    const isAuthored =
      ribbon.innerText.trim() !== '' && ribbon.getAttribute('href');
    if (isAuthored) {
      ribbon.target = '_blank';
      ribbon.rel = 'noopener';
    } else {
      ribbon.remove();
    }
  }
}
