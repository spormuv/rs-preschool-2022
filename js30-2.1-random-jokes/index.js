// constants
const joke = document.querySelector('.joke');
const btn = document.querySelector('.btn');
const url = 'https://type.fit/api/quotes';
const url2 = 'quotes.json';
const langChange = document.querySelector('.lang-change');
const wrapper = document.querySelector('.wrapper');
let source = url;

// function get and show data
async function getData(url) {
  joke.classList.remove('unfade');
  const res = await fetch(url);
  const data = await res.json();
  let randJoke = data[Math.floor(Math.random() * data.length)];

  let col = function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };
  document.body.style.backgroundColor = col();

  function showData() {
    joke.textContent = randJoke.text;
    joke.classList.add('unfade');
  }
  showData();
}
getData(source);

// change language

btn.addEventListener('click', () => getData(source));

function rusLang() {
  btn.textContent = 'Получить Цитату';
  langChange.textContent = 'ru';
  source = url2;
  getData(source);
}

function engLang() {
  btn.textContent = 'Get Quote';
  langChange.textContent = 'en';
  source = url;
  getData(source);
}

langChange.addEventListener('click', () => {
  wrapper.classList.toggle('rus');
  const isLang = wrapper.classList.contains('rus');
  isLang ? rusLang() : engLang();
});
