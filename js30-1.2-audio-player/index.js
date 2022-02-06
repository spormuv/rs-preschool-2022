/*constants*/
const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress_container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.song');
const artistName = document.querySelector('.artist');
const cover = document.querySelectorAll('.cover_img');
const imgSrc = document.querySelector('.img_src');
const imgactive = document.querySelector('.cover_img_player');
const currentT = document.querySelector('.current_time');
const durationT = document.querySelector('.duration_time');

/*songs names*/
const songs = [
  'Dont Hurt Yourself',
  'Dont Start Now',
  'Shape Of My Heart',
  'In The End',
];
const artists = ['Beyonce', 'Dua Lipa', 'Sting', 'Linkin Park'];

/*default song*/
let songIndex = 0;

/*player initialization*/
function loadSong(song, artist) {
  title.textContent = song;
  artistName.textContent = artist;
  audio.src = `assets/audio/${song}.mp3`;
  cover.forEach((item) => (item.src = `assets/img/cover${songIndex + 1}.png`));
}
loadSong(songs[songIndex], artists[songIndex]);

/*play*/
function playSong() {
  player.classList.add('play');
  audio.play();
  imgactive.classList.add('active');
  imgSrc.src = 'assets/svg/pause.png';
}

/*pause*/
function pauseSong() {
  player.classList.remove('play');
  audio.pause();
  imgactive.classList.remove('active');
  imgSrc.src = 'assets/svg/play.png';
}

playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});

/*next song*/
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex], artists[songIndex]);
  playSong();
}

nextBtn.addEventListener('click', nextSong);

/*previous song*/
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex], artists[songIndex]);
  playSong();
}

prevBtn.addEventListener('click', prevSong);

/*duration*/

function initDur() {
  durationT.textContent = `${Math.floor(this.duration / 60)}:${
    Math.floor(this.duration) % 60
  }`;
}

audio.addEventListener('loadeddata', initDur);

/*progress bar*/
function updateProgress(event) {
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  currentT.textContent = `${Math.floor(audio.currentTime / 60)}:${String(
    Math.floor(audio.currentTime) % 60
  ).padStart(2, '0')}`;
}
audio.addEventListener('timeupdate', updateProgress);

/*set progress*/
function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);

/*autoplay*/
audio.addEventListener('ended', nextSong);
