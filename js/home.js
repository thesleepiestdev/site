const iframe = document.getElementById('main-iframe');
const navbarLinks = document.querySelectorAll('.links .nav-link');

let previousLinkId;

navbarLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const newSrc = getNewIframeSrc(link.id);
    iframe.src = newSrc;

    navbarLinks.forEach((navLink) => {
      navLink.classList.remove('activepage');
    });

    if (link.id !== previousLinkId) {
      link.classList.add('activepage');
      previousLinkId = link.id;
    }
  });
});

function getNewIframeSrc(linkId) {
  switch (linkId) {
    case 'link-home':
      return 'home.html';
    case 'link-about':
      return 'about.html';
    case 'link-blog':
      return 'blog.html';
    case 'link-gallery':
      return 'gallery.html';
    default:
      return '';
  }
}