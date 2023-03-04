"use strict";

const display = document.querySelector(".myInput");
const btnSearch = document.querySelector(".btnSearch");
const coctailsContainer = document.querySelector(".coctailsContainer");

const coctailList = document.querySelector(".coctailList");
const coctailDetails = document.querySelector(".coctailDetails");
const btnDetails = document.querySelector(".btnDetails");

// dodavanje event listenera na button za pretraživanje
btnSearch.addEventListener("click", function () {
  const inputCoctail = display.value.trim();

  // API poziv, zahtjev za dohvaćanje koktela po nazivu
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputCoctail}`,
    true
  );
  request.send();

  // ako je input manji od zadanog, prikaži alert poruku
  if (inputCoctail.length < 3) {
    alert("Type in your cocktail! 🍹");
  }

  // JSON
  request.addEventListener("load", function () {
    if (request.status === 200) {
      // ako je zahtjev uspio, prikaži koktele
      const data = JSON.parse(request.response);
      let myDrink = data.drinks;
      let myID = data.drinks[0].idDrink;
      console.log(myID);

      showCoctails(myDrink, myID);
    } else {
      // ako dođe do greške, prikaži sljedeću poruku
      console.error("Došlo je do greške, koktela je nestalo.");
    }
  });
});

// funkcija prikazivanja koktela
function showCoctails(myDrink, myID) {
  // pokazuje ispravno
  console.log("showCoctails called with", myDrink.length, "drinks");

  coctailList.innerHTML = "";

  // prolazak kroz sve koktele forEach metodom (prolazi jer je myDrink niz objekata)
  myDrink.forEach((coctail) => {
    const html = `
      <div class="coctail" id="${coctail.idDrink}">
        <h2>${coctail.strDrink}</h2>
        
      </div>
    `;
    //<img src="${coctail.strDrinkThumb}" alt="${coctail.strDrink}"></img> - iznad h2
    coctailList.insertAdjacentHTML("beforeend", html);
  });
}
// dodavanje event listenera na svaki koktel element
coctailList.addEventListener("click", function (event) {
  const coctailElement = event.target.closest(".coctail");
  if (!coctailElement) return;
  const coctailId = coctailElement.id;
  showDrinkDetails(coctailId);
});

// funkcija prikazivanja detalja o koktelu
function showDrinkDetails(coctailID) {
  // sve ispravno, ID prikaže normalno
  console.log("showDrinkDetails called with coctailID:", coctailID);

  // API poziv za dohvaćanje detalja o koktelu preko id-a
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${coctailID}`,
    true
  );
  coctailDetails.innerHTML = "";
  request.send();

  // JSON
  request.addEventListener("load", function () {
    if (request.status === 200) {
      // ako je zahtjev uspio, prikaži detalje o koktelu
      const data = JSON.parse(request.response);
      const coctailDetailsHtml = `
      <br>
      <hr>
          <h3>${data.drinks[0].strDrink}</h3>
          <img src="${data.drinks[0].strDrinkThumb}" alt="${
        data.drinks[0].strDrink
      }">
          <p>Category: ${data.drinks[0].strCategory}</p>
          <p>Glass: ${data.drinks[0].strGlass}</p>
          <p>Instructions: ${data.drinks[0].strInstructions}</p>
          <ul>Ingredients:
            ${getIngredientsList(data.drinks[0])}
          </ul>
        `;
      //coctailDetails.innerHTML = coctailDetailsHtml;
      coctailDetails.insertAdjacentHTML("beforeend", coctailDetailsHtml);
    } else {
      // ako dođe do greške, prikaži sljedeću poruku
      console.error("Došlo je do greške, koktela je nestalo.");
    }
  });
}

// funkcija za dobivanje liste sastojaka
function getIngredientsList(coctail) {
  let ingredientsList = "";
  for (let i = 1; i <= 15; i++) {
    if (coctail[`strIngredient${i}`]) {
      ingredientsList += `<li>${coctail[`strIngredient${i}`]} - ${
        coctail[`strMeasure${i}`]
      }</li>`;
    }
  }
  return ingredientsList;
}
