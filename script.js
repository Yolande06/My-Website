// =====================================
// PROTECT THE ENTIRE TRAVEL GALLERY
// =====================================

const currentPage =
  window.location.pathname.split('/').pop();

const publicPages = [
  'unlock.html'
];

if (!publicPages.includes(currentPage)) {

  const galleryUnlocked =
    sessionStorage.getItem('galleryUnlocked');

  if (galleryUnlocked !== 'true') {

    window.location.href = 'unlock.html';

  }

}
const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');

if (burgerMenu && navMenu) {
  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector('a');
    if (link) {
      link.addEventListener('click', (event) => {
        if (window.innerWidth <= 768) {
          event.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  document.querySelectorAll('.dropdown-content a').forEach((link) => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  document.querySelectorAll('.nav-menu > ul > li:not(.dropdown) > a').forEach((link) => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

const setupContinentFilter = () => {
  const main = document.querySelector('main');
  if (!main) return;

  if (document.querySelector('.continent-filter')) return;

  const filterBar = document.createElement('div');
  filterBar.className = 'continent-filter';

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'North America', value: 'north-america' },
    { label: 'Asia', value: 'asia' },
    { label: 'Europe', value: 'europe' },
    { label: 'South America', value: 'south-america' },
    { label: 'Africa', value: 'africa' }
  ];

  filterBar.innerHTML = filterOptions
    .map(
      (option, index) => `
        <button
          class="filter-btn ${index === 0 ? 'active' : ''}"
          type="button"
          data-filter="${option.value}"
        >
          ${option.label}
        </button>
      `
    )
    .join('');

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.insertAdjacentElement('afterend', filterBar);
  } else {
    main.prepend(filterBar);
  }

  const sections = [...document.querySelectorAll('.continent-section')];
  const buttons = [...document.querySelectorAll('.filter-btn')];

  const applyFilter = (filter) => {
    let visibleCount = 0;

    sections.forEach((section) => {
      const matches = filter === 'all' || section.dataset.continent === filter;
      section.style.display = matches ? 'block' : 'none';
      if (matches) visibleCount += 1;
    });

    buttons.forEach((button) => {
      button.classList.toggle('active', button.dataset.filter === filter);
    });

    if (filter !== 'all' && visibleCount === 0) {
      const fallback = document.querySelector('#home');
      if (fallback) fallback.scrollIntoView({ behavior: 'smooth' });
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });
};

const setupBackToTop = () => {
  let button = document.getElementById('backToTop');

  if (!button) {
    button = document.createElement('button');
    button.id = 'backToTop';
    button.type = 'button';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(button);
  }

  const toggleBackToTop = () => {
    if (window.scrollY > 400) {
      button.classList.add('show');
    } else {
      button.classList.remove('show');
    }
  };

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
};

setupContinentFilter();
setupBackToTop();

// =====================================
// TRAVEL GALLERY PUZZLE
// =====================================

const puzzleWords = [
  "beach",
  "island",
  "travel",
  "camera",
  "sunset",
  "journey",
  "adventure",
  "passport",
  "holiday",
  "explore",
  "mountain",
  "ocean",
  "tropical",
  "wander",
  "gallery"
];

const correctWord =
  puzzleWords[Math.floor(Math.random() * puzzleWords.length)];

function scrambleWord(word) {
  const letters = word.split("");

  for (let i = letters.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temp = letters[i];
    letters[i] = letters[randomIndex];
    letters[randomIndex] = temp;
  }

  return letters.join("");
}

let scrambledWord = scrambleWord(correctWord);

while (scrambledWord === correctWord) {
  scrambledWord = scrambleWord(correctWord);
}


// Show scrambled word

document.getElementById("scrambled-word").textContent =
  scrambledWord.toUpperCase();


// Check answer

document.getElementById("unlock-button").addEventListener("click", function () {

  const answer = document
    .getElementById("answer")
    .value
    .toLowerCase()
    .trim();

  const message =
    document.getElementById("message");

  if (answer === correctWord) {

    message.textContent =
      "✓ Correct! Welcome!";

    sessionStorage.setItem(
      "galleryUnlocked",
      "true"
    );

    setTimeout(function () {

      window.location.href =
        "index.html";

    }, 500);

  } else {

    message.textContent =
      "❌ Incorrect. Try again!";

  }

});


// Allow Enter key

document.getElementById("answer").addEventListener("keydown", function(event) {

  if (event.key === "Enter") {

    document
      .getElementById("unlock-button")
      .click();

  }

});
