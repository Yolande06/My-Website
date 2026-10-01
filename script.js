const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');
const filterButtons = document.querySelectorAll('.filter-btn');
const continentSections = document.querySelectorAll('.continent-section');
const backToTopButton = document.getElementById('backToTop');

if (burgerMenu && navMenu) {
  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  document.querySelectorAll('.nav-menu > ul > li:not(.dropdown) > a').forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

if (filterButtons.length && continentSections.length) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));

      continentSections.forEach(section => {
        const matches = selectedFilter === 'all' || section.dataset.continent === selectedFilter;
        section.classList.toggle('hidden', !matches);
      });
    });
  });
}

if (backToTopButton) {
  const toggleBackToTop = () => {
    backToTopButton.classList.toggle('show', window.scrollY > 250);
  };

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
