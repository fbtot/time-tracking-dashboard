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
const dataUrl = 'https://raw.githubusercontent.com/Filippo-B/time-tracking-dashboard/main/js/data.json';
let dataJson = {};
function getCategoryIndex(cat) {
  dataJson.filter((el) => el.title === cat);
}

function throwError() {
  swal({
    title: 'Dang!',
    text: 'I can\'t find the data 😰. Try to refresh the page.',
    icon: 'error',
    button: 'Ok',
  });
}

async function dataFetch() {
  const response = await fetch(dataUrl);
  if (!response.ok) {
    throwError();
  }
  dataJson = await response.json();
  // eslint-disable-next-line no-use-before-define
  getCategoryIndex();
  // eslint-disable-next-line no-use-before-define
  update();
}

dataFetch();

/* ========================== § UPDATE FUNCTION === */
function getTime(i, tf) {
  return dataJson[i].timeframes[getTimeFrame()][tf];
}

function setTime(el, elClass, content) {
  el.getElementsByClassName(elClass)[0].innerText = content;
}

function moreOrLess(i) {
  if (getTime(i, 'current') > getTime(i, 'previous')) return true;
  if (getTime(i, 'current') < getTime(i, 'previous')) return false;
  return 'equal';
}

function getIconEl(el) {
  return el.getElementsByClassName('time-card__icon')[0];
}

function setIcon(el, i) {
  switch (moreOrLess(i)) {
    case true:
      getIconEl(el).setAttribute('name', 'chevron-up');
      break;
    case false:
      getIconEl(el).setAttribute('name', 'chevron-down');
      break;
    default:
      getIconEl(el).setAttribute('name', 'code');
      break;
  }
}

function update() {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < timeCardsEl.length; i++) {
    const card = timeCardsEl[i];
    const thisCategory = getCategory(card);
    const index = dataJson.findIndex((el) => el.title === thisCategory);

    setIcon(card, i);
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
