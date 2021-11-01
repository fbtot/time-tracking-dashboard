/* ========================== § DOM ELEMENTS === */

// Cards
const timeCardsEl = document.getElementsByClassName("time-card");
let getTimeElText = (el) => el.querySelector(".time-card__time");
let getTimePrevElText = (el) => el.querySelector(".time-card__prev");
const getCategory = (el) => el.getAttribute("data-category");

// Menu
const timeToggleMenuEl = document.getElementById("time-toggle-menu");
const timeToggleLinkEl = timeToggleMenuEl.querySelectorAll(".header__time-toggle__link");
const currentTimeframe = () => timeToggleMenuEl.querySelector(".active").getAttribute("data-timeframe");

// url
const dataURI = "./js/data.json";

/* ========================== § GETTING DATA FROM JSON === */
async function data() {
  const resp = await fetch(dataURI);
  const data = await resp.json();
  const titleJ = data["weekly"];
  const index = data.filter((el) => el.title === "Social");
  console.log(data);
  //   console.log(titleJ + "J");
}

data();

/* ========================== § OPDATE FUNCTION === */
function updateTime(el) {
  return (getTimeElText(el).innerText = "60hrs");
}

function update() {
  for (let i = 0; i < timeCardsEl.length; i++) {
    const card = timeCardsEl[i];
    updateTime(card);
  }
}
