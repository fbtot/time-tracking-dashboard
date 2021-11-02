/* ========================== § DOM ELEMENTS === */
const timeCardsEl = document.getElementsByClassName('time-card');
const timeToggleLinkEl = document.getElementsByClassName('header__time-toggle__link');
const timeToggleLinkElActive = () => document.getElementsByClassName('header__time-toggle__link active')[0];

/* ========================== § RETRIEVE DATA FROM DOM ELEMENTS === */
function getCategory(el) {
  return el.getAttribute('data-category');
}

function getTimeFrame() {
  return document.getElementsByClassName('header__time-toggle__link active')[0].getAttribute('data-timeframe');
}

function timeFrameName() {
  switch (getTimeFrame()) {
    case 'weekly':
      return 'Last week';
    case 'monthly':
      return 'Last month';
    case 'daily':
      return 'Yesterday';
    default:
      return 'Last week';
  }
}

/* ========================== § RETRIEVE DATA FROM JSON === */
const dataUrl = './js/data.json';
let dataJson = {};

async function dataFetch() {
  const response = await fetch(dataUrl);
  dataJson = await response.json();
  // eslint-disable-next-line no-use-before-define
  getCategoryIndex();
  // eslint-disable-next-line no-use-before-define
  update();
}

function getCategoryIndex(cat) {
  dataJson.filter((el) => el.title === cat);
}

dataFetch();

/* ========================== § UPDATE FUNCTION === */
function getTime(i, tf) {
  return dataJson[i].timeframes[getTimeFrame()][tf];
}

function setTime(el, elClass, content) {
  el.getElementsByClassName(elClass)[0].innerText = content;
}

function update() {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < timeCardsEl.length; i++) {
    const card = timeCardsEl[i];
    const thisCategory = getCategory(card);
    const index = dataJson.findIndex((el) => el.title === thisCategory);

    setTime(card, 'time-card__time', `${getTime(index, 'current')}hrs`);
    setTime(card, 'time-card__prev', `${timeFrameName()} - ${getTime(index, 'previous')}hrs`);
  }
}

/* ========================== § EVENT LISTENERS === */

// Change timeframe
Array.from(timeToggleLinkEl).map((el) => el.addEventListener('click', (e) => {
  e.preventDefault();
  timeToggleLinkElActive().classList.remove('active');
  el.classList.add('active');
  dataFetch();
}));
