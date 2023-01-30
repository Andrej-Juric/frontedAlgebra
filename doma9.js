"use strict";
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-item");
const rezultatPretrage = document.querySelector("#api-zahtjev");
const rezultatRecept = document.querySelector("#api-detalji");
const rezultatLista = document.querySelector("#koktel-lista");

function handleSearchCoctails() {
  // dodaj text kad se upiše u "pretraži"
  const newText = input.value;
  console.log(newText);
  input.value = "";

  if (newText.length === 0) {
    alert(`Nema unosa!`);
    return;
  }
}

// ENTER na pretraga
const handleInputKey = (e) => {
  if (e.key === "Enter") {
    handleSearchCoctails();
  }
};
// url
const url = `http://thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
// dohvati API
const request = new XMLHttpRequest();
request.open("GET", url, true);

request.onload = () => {
  if (request.status === 200) {
    const responseObject = JSON.parse(request.response); // spajanje na API

    const h3Tittle = document - createElement(`h3`);
    h3Tittle.innerText = rezultatRecept;
  }
};

// može pisati bilo što -> handleSearchCoctails
// na klik djeluje "pretraži" koji ima id add-btn, a zove se addBtn u JS
addBtn.addEventListener("click", handleSearchCoctails);

// način na koji povezujem ENTER
input.addEventListener("keypress", handleInputKey);

const newListItem = document.createElement("li");
