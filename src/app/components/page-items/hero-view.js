import { ViewStream } from 'spyne';
import HeroTmpl from './templates/hero.tmpl.html';
import { HeroViewTraits } from 'traits/page/hero-view-traits.js';
export class HeroView extends ViewStream {
  constructor(props = {}) {
    props.class = props.pageType
      ? `hero-component hero-component--${props.pageType}`
      : 'hero-component';
    props.tagName = 'article';
    props.traits = [HeroViewTraits];

    props.template = HeroTmpl;
    super(props);
  }

  addActionListeners() {
    return [];
  }

  broadcastEvents() {
    return [];
  }

  onRendered() {
    this.hero$OnRendered();
  }
}
