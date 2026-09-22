import { createProductList } from './products.js';

function formatPrice(price) {
  if (!price) return 'Price unavailable';
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: price.currencyCode,
    }).format(price.amount);
  } catch {
    return `${price.amount} ${price.currencyCode}`;
  }
}

function formatWeight(weight) {
  if (!weight) return '';
  const units = { GRAMS: 'g', KILOGRAMS: 'kg', OUNCES: 'oz', POUNDS: 'lb' };
  return `${weight.value} ${units[weight.unit] ?? weight.unit}`;
}

function renderProduct(product) {
  const li = document.createElement('li');
  li.className = 'catalog__item';
  li.dataset.handle = product.handle;

  const title = document.createElement('h3');
  title.textContent = product.title;

  const meta = document.createElement('p');
  meta.className = 'catalog__meta';
  meta.textContent = [product.productType, formatWeight(product.weight)]
    .filter(Boolean)
    .join(' · ');

  const price = document.createElement('p');
  price.className = 'catalog__price';
  price.textContent = formatPrice(product.price);

  li.append(title, meta, price);

  if (product.tags.length > 0) {
    const tags = document.createElement('ul');
    tags.className = 'catalog__tags';
    for (const tag of product.tags) {
      const tagEl = document.createElement('li');
      tagEl.textContent = tag;
      tags.append(tagEl);
    }
    li.append(tags);
  }

  return li;
}

function renderState(section, state) {
  section.replaceChildren();
  section.dataset.status = state.status;

  if (state.status === 'loading') {
    const p = document.createElement('p');
    p.textContent = 'Loading products…';
    section.append(p);
    return;
  }

  if (state.status === 'error') {
    const p = document.createElement('p');
    p.className = 'catalog__error';
    p.setAttribute('role', 'alert');
    p.textContent = `Could not load products: ${state.error?.message ?? 'unknown error'}`;
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Retry';
    retry.dataset.action = 'retry';
    section.append(p, retry);
    return;
  }

  if (state.status === 'ready') {
    if (state.products.length === 0) {
      const p = document.createElement('p');
      p.textContent = 'No products available.';
      section.append(p);
      return;
    }
    const list = document.createElement('ul');
    list.className = 'catalog__list';
    for (const product of state.products) list.append(renderProduct(product));
    section.append(list);
  }
}

/**
 * Wire a catalog section element to the product list and kick off loading.
 * Returns the product list so callers can reload or read state later.
 */
export function mountCatalog(section, config) {
  const productList = createProductList(config);

  productList.subscribe((state) => renderState(section, state));

  section.addEventListener('click', (event) => {
    if (event.target.closest('[data-action="retry"]')) productList.load();
  });

  productList.load();
  return productList;
}
