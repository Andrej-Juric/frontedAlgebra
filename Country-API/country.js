"use strict";
//let API = 'croatia';
//let country = 'croatia';

//const url = `https://restcountries.com/v3.1/name/${country}`;

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const display = document.querySelector(".myInput");
const btnSearch = document.querySelector(".btnSearch");
/*
///////////////////////////////////////
// funkcija kojom pozivamo proizvodnju državu
const getCountryData = function (country) {
  // spajanje na API "old school" metodom.
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`, true);
  request.send();

  // asinc način spajanja, load funkcija
  request.addEventListener("load", function () {
    //console.log(this.responseText); //this ili request - svejedno

    // podaci s API-a su u JSON formatu -> konvertiranje istog
    const [data] = JSON.parse(this.responseText); // ili [0] iza responseText

    const html = `<article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p> 
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0]
    }</p>
  </div>
</article>`;
    countriesContainer.insertAdjacentHTML("afterbegin", html);
    countriesContainer.style.opacity = 1;
  });
};
//getCountryData("croatia");
//getCountryData("france");
*/

btnSearch.addEventListener("click", function () {
  // inputCountry je nova varijabla unutar ove funkcije u kojoj želim
  // da mi u DISPLAY odnosno u myInput koji je moj naziv za search
  // sprema moj upis "value", a trim trima razmake
  const inputCountry = display.value.trim();

  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://restcountries.com/v3.1/name/${inputCountry}`,
    true
  );
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);

    const html = `<article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p> 
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies.EUR)[0]
    }</p>
  </div>
</article>`;
    countriesContainer.insertAdjacentHTML("afterbegin", html);
    countriesContainer.style.opacity = 1;
  });
});
