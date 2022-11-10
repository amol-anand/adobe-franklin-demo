import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */

function hideActive(sectionLinks) {
  const activeSections = document.querySelectorAll('.footer-links .active');
  activeSections.forEach((activeSection) => {
    if (activeSection !== sectionLinks) {
      activeSection.classList.remove('active');
    }
  });
}

function showLinks(e) {
  const sectionLinks = e.target.nextElementSibling;
  hideActive(sectionLinks);
  sectionLinks.classList.toggle('active');
}

function addLink() {
  // hard coding for POC
  const link = 'https://www.merative.com/contact';
  window.open(link, '_self');
}

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();

  const modifiedhtml = html.replaceAll('<h4', '<h4 class="link-section-heading"');
  const footer = document.createElement('div');

  footer.innerHTML = modifiedhtml;
  await decorateIcons(footer);
  block.append(footer);
  const linkHeadings = document.querySelectorAll('.footer-links .link-section-heading');
  linkHeadings.forEach((linkHeading) => {
    if (linkHeading.id !== 'contact-us') {
      linkHeading.addEventListener('click', showLinks);
    } else {
      linkHeading.addEventListener('click', addLink);
    }
  });
}
