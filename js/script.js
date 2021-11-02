/**
 * Recuperare il timeframe
 * Per ognuna delle cards, recuperare la categoria.
 * Trovare la categoria all'interno del file JSON
 * Recuperare l'incide dell'oggetto della categoria
 * Assegnare al tempo corrente e passato i relativi parametri del file in json
 */

/* ========================== § DOM ELEMENTS === */
const timeCardsEl = document.getElementsByClassName('time-card');

/* ========================== § RETRIEVE DATA FROM DOM ELEMENTS === */
function getCategory(el) {
  return el.getAttribute('data-category');
}

function getTimeFrame() {
  return document.getElementsByClassName('header__time-toggle__link active')[0].getAttribute('data-timeframe');
}

function timeFrameName() {
  return getTimeFrame() === 'weekly' ? 'Last Week' : getTimeFrame() === 'Monthly' ? 'Last Month' : 'Yesterday';
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
