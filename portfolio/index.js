const icon = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.nav');
const blackout = document.querySelector('.blackout');

function addOpenClasstoMenu() {
  icon.classList.toggle('open');
  nav.classList.toggle('open');
  blackout.classList.toggle('open');
}

icon.addEventListener('click', addOpenClasstoMenu);
nav.addEventListener('click', addOpenClasstoMenu);

/*---Portfolio buttons---*/
/*---1---find images---*/
const portfolioBtn = document.querySelector('.portfolio__button');
const portfolioImages = document.querySelectorAll('.portfolio__image');
portfolioImages.forEach(
  (img, index) => (img.src = `./assets/img/winter/${index + 1}.jpg`)
);

/*---2---Delegation---*/

const portfolioBtns = document.querySelector('.portfolio__buttons');
portfolioBtns.addEventListener('click', changeImage);

function changeImage(event) {
  if (event.target.classList.contains('portfolio__button')) {
    let season = event.target.dataset.season;
    portfolioImages.forEach(
      (img, index) => (img.src = `./assets/img/${season}/${index + 1}.jpg`)
    );
  }
}

/*---3---Pictures cashing---*/

const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadSummerImages() {
  for (let k of seasons) {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${k}/${i}.jpg`;
    }
  }
}
preloadSummerImages();

/*---4---Highlight active button---*/

portfolioBtns.addEventListener('click', changeBut);
function changeBut(event) {
  for (let x = 0; x < portfolioBtns.children.length; x++) {
    portfolioBtns.children[x].classList.remove('active');
  }
  event.target.classList.add('active');
}
