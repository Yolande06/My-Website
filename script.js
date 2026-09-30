const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementByID('navMenu');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    burgerMenu.classlist.remove('active');
  });
});
