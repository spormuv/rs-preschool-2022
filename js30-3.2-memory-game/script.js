//constants
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let openPairs = 0;
let moves = 0;
let arr = [];

//flip cards
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  //second click
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unFlipCards();
  moves++;
  console.log('moves: ', moves);
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  openPairs++;
  console.log('openPairs:', openPairs);

  finish();
  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener('click', flipCard));

//finish
function finish() {
  if (openPairs === 6) {
    setTimeout(() => {
      arr.unshift(moves);
      console.log(arr);
      alert('Сongratulations!\nYou did ' + moves + ' moves');
    }, 10);

    setTimeout(() => {
      openPairs = 0;
      moves = 0;
    }, 20);

    cards.forEach((item) => item.classList.remove('flip'));
    cards.forEach((card) => card.addEventListener('click', flipCard));
    (function shuffle() {
      cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
      });
    })();
  }
}
