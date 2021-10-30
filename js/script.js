const dataURI = "./js/data.json";

async function data() {
  const resp = await fetch(dataURI);
  const data = await resp.json();
  const titleJ = data[1].title;
  const index = data.filter((el) => el.title === "Social");
  console.log(index[0].timeframes);
  //   console.log(titleJ + "J");
}

data();

const timeCards = document.getElementsByClassName("time-card");

function getCategory(el) {
  return el.getAttribute("data-category");
}

getCategory(timeCards[0]);
