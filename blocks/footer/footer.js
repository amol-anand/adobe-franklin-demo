import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */

// hides all the links except the one clicked on
function hideLinks(event, block) {
  const activeSections = block.querySelectorAll('.footer-links .active');
  const sectionLinks = event.target.nextElementSibling;
  activeSections.forEach((activeSection) => {
    if (activeSection !== sectionLinks) {
      activeSection.classList.remove('active');
    }
  });
}

// expands the links of the section clicked on
function showLinks(event, block) {
  const sectionLinks = event.target.nextElementSibling;
  hideLinks(event, block);
  sectionLinks.classList.toggle('active');
}

// adding contactus link
function addContactLink(e) {
  const contactusheader = e.target;
  const link = contactusheader.nextElementSibling.firstElementChild.href;
  window.open(link, '_self');
}

function addCSSToLinkHeadings(block) {
  const h4elements = block.querySelectorAll('.footer-links > div > div > h4');
  h4elements.forEach((h4element) => {
    h4element.classList.add('link-section-heading');
  });
}

function buildMobileFooter(block) {
  const linkHeadings = block.querySelectorAll('.footer-links .link-section-heading');
  linkHeadings.forEach((linkHeading) => {
    if (linkHeading.id !== 'contact-us') {
      linkHeading.classList.add('fold');
      linkHeading.addEventListener('click', (event) => { showLinks(event, block); });
    } else {
      linkHeading.addEventListener('click', addContactLink);
    }
  });
}

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = document.createElement('div');

  footer.innerHTML = html;
  await decorateIcons(footer);
  block.append(footer);
  addCSSToLinkHeadings(block);

  // code for building mobile footer
  const mobileMedia = window.matchMedia('(max-width: 667px)');
  if (mobileMedia.matches) {
    buildMobileFooter(block);
  }
  // when media size changes
  mobileMedia.onchange = (e) => {
    if (e.matches) {
      buildMobileFooter(block);
    }
  };
}
