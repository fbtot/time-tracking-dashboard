/* ========================== § DOM ELEMENTS === */

// Cards
const timeCardsEl = document.getElementsByClassName('time-card');
const getTimeElText = (el) => el.querySelector('.time-card__time');
const getTimePrevElText = (el) => el.querySelector('.time-card__prev');
const getCategory = (el) => el.getAttribute('data-category');

// Menu
const timeToggleMenuEl = document.getElementById('time-toggle-menu');
const timeToggleLinkEl = timeToggleMenuEl.querySelectorAll('.header__time-toggle__link');
const currentTimeframe = () => timeToggleMenuEl.querySelector('.active').getAttribute('data-timeframe');

// url
const dataURI = './js/data.json';

/* ========================== § GETTING DATA FROM JSON === */
async function data() {
  const resp = await fetch(dataURI);
  const data = await resp.json();
  const titleJ = data.weekly;
  const index = data.filter((el) => el.title === 'Social');
  console.log(data);
  //   console.log(titleJ + "J");
}

async function JSONdata() {
  const response = await fetch(dataURI);
  const data = await response.json();
  setTime();
  // data.forEach((el) => console.log(el.title));
}

// JSONdata().then((data) => { jjj = data; });
/* ========================== § CHANGE DOM === */

/* ========================== § UPDATE FUNCTION === */
function update() {
  for (let i = 0; i < timeCardEl.length; i++) {
    const card = timeCardEl[i];
    currentTimeFrame();
    const thisCardCatetory = getCategory(card);
    console.log(thisCardCatetory, currentTimeFrame());
  }
}

update();
