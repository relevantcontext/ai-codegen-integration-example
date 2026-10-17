// Vendored from spynejs/application-shell src/index.js — the ROUTES slot (double-brace
// token below) receives the generated config.channels.ROUTE object. Refresh alongside
// shell.tar.gz if the shell's index.js evolves (vendor-shell.mjs prints the source commit).

// inject styles
import './scss/app.scss';

// load spyne
import { SpyneApp, ChannelFetch, SpyneAppProperties } from 'spyne';

// channels
import { ChannelMenuDrawer } from 'channels/channel-menu-drawer';
import { ChannelApp } from 'channels/channel-app.js';
import { ChannelLocalStorage } from 'channels/channel-local-storage.js';
import { ChannelShopify } from 'channels/channel-shopify.js';
import { ChannelCart } from 'channels/channel-cart.js';
import { ChannelShopifyTraits } from 'traits/channel/channel-shopify-traits.js';
//plugins

//data fetch
import AppModelURL from 'data/app.model.json';

// initial view
import { AppContainer } from './app/app-container.js';

import pageItemTemplateLookup from 'traits/utils/page-item-template-lookup.js';

const config = {
  debug: true,
  storageConfig: {
    storageKey: 'spyneAppStorage',
    analyticsOptions: {},
    theme: 'auto',
    themeDefaults: {
      colorScheme: 'auto',
      enableTransitions: true,
    },
  },

  channels: {
    WINDOW: {
      mediaQueries: {
        showMenuDrawer: `(min-width: 1024px)`,
      },
      events: [
        'click',
        'mouseover',
        'mouseenter',
        'message',
        'keyup',
        'keydown',
      ],
      customEvents: [{ name: 'spyne_cms_item_connected', buffer: 400 }],

      listenForScroll: true,
      listenForOrientation: true,
      debounceMSTimeForScroll: 50,
    },

    ROUTE: {
        "add404s": true,
        "routes": {
            "routePath": {
                "routeName": "pageId",
                "home": "",
                "shop": "shop",
                "cart": "cart",
                "about": {
                    "routePath": {
                        "routeName": "topicId",
                        "contact": "contact"
                    }
                }
            }
        }
    },
  },

  // Theme judgment made at generation (see themes.json in the generator) —
  // edit theme_id / font_pairing_id and re-run the pipeline to re-theme.
  theme: {"theme_id":"slate","font_pairing_id":"archivo-worksans"},

  // Shopify Storefront API — the catalog's commerce source. The access token
  // is a public Storefront token (read-only, published data); it ships in the
  // browser by design.
  shopify: {
    store: 'asteroid-metals.myshopify.com',
    apiVersion: '2026-04',
    // the development store keeps its storefront password, which also gates
    // the hosted checkout: the cart page shows the unlock-then-retry hint
    // (checkoutUrl itself is always used whole, per Shopify)
    storefrontPassword: true,
    // payments are test-only (Shopify test gateway); the cart page says so
    testMode: true,
    storefrontAccessToken: '1dbd6bb0d39df2850e10e42cf3f1eac2',
  },
};

SpyneApp.init(config);

SpyneAppProperties.setProp('pageItemTemplateLookup', pageItemTemplateLookup);
SpyneApp.registerChannel(new ChannelApp());
SpyneApp.registerChannel(new ChannelLocalStorage());
SpyneApp.registerChannel(new ChannelMenuDrawer());

// commerce: the Storefront fetch, conformed at its boundary to the catalog's
// product shape, and the domain channel that serves the catalog from it
const { shopify } = config;
SpyneApp.registerChannel(
  new ChannelFetch('CHANNEL_FETCH_SHOPIFY', {
    url: `https://${shopify.store}/api/${shopify.apiVersion}/graphql.json`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': shopify.storefrontAccessToken,
    },
    body: JSON.stringify({ query: ChannelShopifyTraits.channelShopify$CatalogQuery() }),
    map: ChannelShopifyTraits.channelShopify$ConformCatalog,
  }),
);
SpyneApp.registerChannel(new ChannelShopify());
SpyneApp.registerChannel(new ChannelCart());

const registerCmsChannels = () => {
  const mapFn = SpyneApp.pluginsFn.mapCmsData || ((d) => d);

  SpyneApp.registerChannel(
    new ChannelFetch('CHANNEL_FETCH_MODEL', {
      url: AppModelURL,
      map: mapFn,
    }),
  );
};

if (process.env.NODE_ENV === 'development') {
  import('./dev-tools.js').then(({ devToolsReady }) => {
    devToolsReady.then(registerCmsChannels);
  });
} else {
  // production: no CMS, no delay
  registerCmsChannels();
}

new AppContainer().prependToDom(document.querySelector('body'));
