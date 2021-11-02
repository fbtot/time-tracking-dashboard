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
      return 'Last Week';
    case 'monthly':
      return 'Last Month';
    case 'daily':
      return 'Yesterday';
    default:
      return 'Last Week';
  }
}

/* ========================== § RETRIEVE DATA FROM JSON === */
const dataUrl = './js/data.json';
let dataJson = {};

async function dataFetch() {
  const response = await fetch(dataUrl);
  dataJson = await response.json();
  getCategoryIndex();
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

function update() {
  for (let i = 0; i < timeCardsEl.length; i++) {
    const card = timeCardsEl[i];
    const thisCategory = getCategory(card);
    const index = dataJson.findIndex((el) => el.title === thisCategory);

    getTime(index, 'previous');
    card.getElementsByClassName('time-card__time')[0].innerText = `${getTime(index, 'current')}hrs`;
    card.getElementsByClassName('time-card__prev')[0].innerText = `${timeFrameName()} - ${getTime(index, 'previous')}hrs`;
  }
}

/* ========================== § EVENT LISTENERS === */

// Change timeframe
for (const link of timeToggleLinkEl) {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    timeToggleLinkElActive().classList.remove('active');
    link.classList.add('active');
    dataFetch();
  });
}
