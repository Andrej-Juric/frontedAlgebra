const apiKey = "21f5a6c3c8e682ccc0a932d0ab315219";

const h1City = document.querySelector("#city");
const divTemp = document.querySelector("#temp");
const searchBtn = document.getElementById("search-btn");
const input = document.querySelector("#city-input");
const divClouds = document.getElementById("clouds");
const divHumidity = document.getElementById("humidity");
const divPressure = document.getElementById("pressure");
const divWind = document.getElementById("wind");
const divVrijeme = document.getElementById("vrijeme");
const imgIcon = document.getElementById("icon");

const handleSearch = () => {
  //pročitaj input -> koji je grad
  const city = input.value.trim();

  if(city.lenght < 2) {
    return;
  }
  // napravi url za taj grad
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=hr`;

  // dohvati vrijeme
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
// iz dokumentacije hvatam put
  request.onload = () => {
    if(request.status === 200){
      const responseObject = JSON.parse(request.response); // tako spojim
      const temperature = responseObject.main.temp; // ovo sve po uputama 
      const clouds = responseObject.clouds.all;
      const humidity = responseObject.main.humidity;
      const pressure = responseObject.main.pressure;
      const wind = responseObject.wind.speed;
      const vrijeme = responseObject.weather[0].description;
      const icon = responseObject.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      h1City.innerText = city;
      divTemp.innerHTML = `Temperatura je: <b>${temperature} &#8451</b>.`;
      divClouds.innerHTML = `Prisutnost oblaka: ${clouds}%`;
      divHumidity.innerHTML = `Vlažnost je: ${humidity}%`;
      divPressure.innerHTML = `Pritisak je: ${pressure} hpa`;
      divWind.innerHTML = `Brzina vjetra: ${wind} m/s`;
      divVrijeme.innerHTML = `Vrijeme: ${vrijeme}`;
      imgIcon.src = `${iconUrl}`;



    const div = document.querySelector("#rezultat");
    } else if(request.status >= 404 && request.status < 500) {
      h1City.innerText = `${city} nije pronađen`;
      divTemp.innerHTML = "";
    } else {
      h1City.innerText = "Dogodila se greška. Pokušajte opet."
    }
    input.value = "";
    
  };
  request.send();
};

const handleInputKey = (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
  
} 

searchBtn.addEventListener("click", handleSearch);
input.addEventListener("keypress", handleInputKey);
