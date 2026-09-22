import { storefrontConfig } from './config.js';
import { mountCatalog } from './catalog.js';

const section = document.getElementById('catalog');
const productList = mountCatalog(section, storefrontConfig);

// Expose for debugging in the console: window.catalog.state / window.catalog.load()
window.catalog = productList;
