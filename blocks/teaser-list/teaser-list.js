import { lookupPages } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function createCard(row, style) {
  const card = document.createElement('div');
  if (style) card.classList.add(style);

  const link = document.createElement('a');
  link.classList.add('teaser-link');
  link.href = row.path;

  const title = document.createElement('div');
  title.classList.add('teaser-title');
  title.innerHTML = `<h6>${row.title}</h6>`;

  const description = document.createElement('div');
  description.classList.add('teaser-description');
  description.innerHTML = `<p>${row.description}</p>`;

  card.prepend(title, description, link);
  return (card);
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';
  const pageList = await lookupPages(pathnames);
  if (pageList.length) {
    pageList.forEach((row) => {
      block.append(createCard(row, 'teaser-card'));
    });
  } else {
    block.remove();
  }
}
