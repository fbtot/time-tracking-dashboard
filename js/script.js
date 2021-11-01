/* eslint-disable no-plusplus */
/* ========================== § DOM ELEMENTS === */
// Cards
const timeCardEl = document.getElementsByClassName('time-card');
/* ========================== § DATA FROM DOM === */
const getCategory = (el) => el.getAttribute('data-category');

// Time toggle
const currentTimeFrame = () => document.getElementsByClassName('header__time-toggle__link active')[0].getAttribute('data-timeframe');

/* ========================== § DATA FROM JSON === */
const dataURI = './js/data.json';

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
