const iframe = document.getElementById('main-iframe');
const navbarLinks = document.querySelectorAll('.links .nav-link');

let previousLinkId;

// Function to update the iframe source and active link
function updateContent(linkId) {
  const newSrc = getNewIframeSrc(linkId);
  iframe.src = newSrc;

  navbarLinks.forEach((navLink) => {
    navLink.classList.remove('activepage');
  });

  const activeLink = document.getElementById(linkId);
  if (activeLink) {
    activeLink.classList.add('activepage');
  }

  previousLinkId = linkId;
}

// Function to get the iframe source based on the link ID
function getNewIframeSrc(linkId) {
  switch (linkId) {
    case 'link-home':
      return '/content.html';
    case 'link-about':
      return '/about/content.html';
    case 'link-blog':
      return '/blog/content.html';
    case 'link-gallery':
      return '/gallery/content.html';
    default:
      return '/content.html';
  }
}

// Function to get the link ID from the URL parameter
function getLinkIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  return page ? `link-${page}` : 'link-home';
}

// Update content based on URL parameter on page load
document.addEventListener('DOMContentLoaded', () => {
  const linkId = getLinkIdFromUrl();
  updateContent(linkId);
});

// Event listeners for navbar links
navbarLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const linkId = link.id;
    updateContent(linkId);

    // Update the URL without reloading the page
    const newUrl = `${window.location.origin}${window.location.pathname}?page=${linkId.split('-')[1]}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  });
});
