//constants

const joke = document.querySelector('.joke');
const btn = document.querySelector('.btn');
const url =
  'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';

//get joke
let getJoke = () => {
  joke.classList.remove('fade');
  let col = function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };
  document.body.style.backgroundColor = col();
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      joke.textContent = item.joke;
      joke.classList.add('fade');
    });
};
getJoke();

//add listener
btn.addEventListener('click', getJoke);
