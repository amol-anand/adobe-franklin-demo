import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */

// hides all the links except the one clicked on
function hideLinks(sectionLinks) {
  const activeSections = document.querySelectorAll('.footer-links .active');
  activeSections.forEach((activeSection) => {
    if (activeSection !== sectionLinks) {
      activeSection.classList.remove('active');
    }
  });
}

// expands the links of the section clicked on
function showLinks(e) {
  const sectionLinks = e.target.nextElementSibling;
  hideActive(sectionLinks);
  sectionLinks.classList.toggle('active');
}

// adding contactus link
function addContactLink(e) {
  const contactusheader = e.target;
  const link = contactusheader.nextElementSibling.firstElementChild.href;
  window.open(link, '_self');
}

function buildMobileFooter() {
  // adding the folding behavior to links in the footer
  const mediaQuery = window.matchMedia('(max-width: 667px)');
  if (mediaQuery.matches) {
    const linkHeadings = document.querySelectorAll('.footer-links .link-section-heading');
    linkHeadings.forEach((linkHeading) => {
      if (linkHeading.id !== 'contact-us') {
        linkHeading.classList.add('fold');
        linkHeading.addEventListener('click', showLinks);
      } else {
        linkHeading.addEventListener('click', addLink);
      }
    });
  } else {
    resetActive();
  }
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
  addCSSToLinkHeadings();

  // code for building mobile footer
  const mobileMedia = window.matchMedia('(max-width: 667px)');
  if (mobileMedia.matches) {
    buildMobileFooter();
  }
}
