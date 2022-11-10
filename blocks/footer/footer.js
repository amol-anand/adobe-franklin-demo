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

function resetActive() {
  const activeSections = document.querySelectorAll('.footer-links .active');
  activeSections.forEach((activeSection) => {
    activeSection.classList.remove('active');
  });
}

function showLinks(e) {
  const sectionLinks = e.target.nextElementSibling;
  const sectionHeading = e.target;
  sectionHeading.classList.remove('fold');
  sectionHeading.classList.add('unfold');
  hideActive(sectionLinks);
  sectionLinks.classList.toggle('active');
}

function addLink() {
  // hard coding for POC
  const link = 'https://www.merative.com/contact';
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

  const modifiedhtml = html.replaceAll('<h4', '<h4 class="link-section-heading"');
  const footer = document.createElement('div');

  footer.innerHTML = modifiedhtml;
  await decorateIcons(footer);
  block.append(footer);

  window.addEventListener('resize', buildMobileFooter);

  
}
