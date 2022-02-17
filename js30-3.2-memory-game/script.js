//constants
const cards = document.querySelectorAll('.memory-card');
const cellMoves = document.querySelectorAll('.cell-moves');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let openPairs = 0;
let moves = 0;
let arr = [];
arr.length = 10;

//fill moves

function fillMoves(arr) {
  let k = 0;
  cellMoves.forEach((item) => {
    item.textContent = arr[k];
    k++;
  });
}

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
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  openPairs++;
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
      arr.pop();
      arr.unshift(moves);
      fillMoves(arr);
      alert('Сongratulations!\nYou did ' + moves + ' moves');
      cards.forEach((item) => item.classList.remove('flip'));
      cards.forEach((card) => card.addEventListener('click', flipCard));
    }, 20);
    //set local storage
    function setLocalStorage() {
      localStorage.setItem('arrloc', JSON.stringify(arr));
    }
    window.addEventListener('beforeunload', setLocalStorage);
    //set local storage
    setTimeout(() => {
      openPairs = 0;
      moves = 0;
    }, 50);

    (function shuffle() {
      cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
      });
    })();
  }
}

//get local storage

function getLocalStorage() {
  if (localStorage.getItem('arrloc')) {
    const ar = JSON.parse(localStorage.getItem('arrloc'));
    arr = ar.slice();
    fillMoves(arr);
  }
}
window.addEventListener('load', getLocalStorage);
