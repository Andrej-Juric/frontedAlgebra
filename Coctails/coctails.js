"use strict";

const display = document.querySelector(".myInput");
const btnSearch = document.querySelector(".btnSearch");
const coctailsContainer = document.querySelector(".coctailsContainer");

const coctailName = document.querySelector(".api-zahtjev");
const coctailList = document.querySelector(".coctailDetails");
const btnDetails = document.querySelector(".btnDetails");

btnSearch.addEventListener("click", function () {
  const inputCoctail = display.value.trim();

  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputCoctail}`,
    true
  );
  request.send();
  request.addEventListener("load", function () {
    const data = JSON.parse(request.response);
    console.log(data);

    let myDrink = data.drinks[0];
    console.log(myDrink);
    console.log(myDrink.strDrinkThumb);

    const html = `<div class="coctailName">
    
      <img class="coctailImg" src="${myDrink.strDrinkThumb}" />
        <ul><li>
        ${myDrink.strDrink}</li></ul>
        <button class="btnDetails">Details</button>
      </div>`;
    //console.log(html);
    coctailsContainer.insertAdjacentHTML("beforebegin", html);
  });
});
