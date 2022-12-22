let prognozy = [];

const menuPrognoz = document.querySelector(".prognozy");
const przyciskSzukaj = document.querySelector(".szukaj_przycisk");
const kluczAPI = `f06f748cb174f38b78906946a08bab92`;

const wczytajPrognozy = () => {
  const prognozyJSON = JSON.parse(window.localStorage.getItem("prognozy"));
  prognozyJSON
    ? (prognozy = [...prognozyJSON])
    : console.log("Brak zapisanych prognoz");
};
wczytajPrognozy();

const pobierzDanePrognozy = function (prognoza, miasto, operacja) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${miasto}&units=metric&appid=${kluczAPI}`
  )
    .then((odpowiedz) => odpowiedz.json())
    .then((dane) => {
      prognoza.miasto = dane["name"];
      prognoza.temperatura = Math.round(dane["main"]["temp"]);
      prognoza.wilgotnosc = dane["main"]["humidity"];
      prognoza.ikona = dane["weather"][0]["icon"];
      prognoza.wiatr = dane["wind"]["speed"];
      prognoza.cisnienie = dane["main"]["pressure"];
      prognoza.temp_min = Math.round(dane["main"]["temp_min"]);
      prognoza.temp_max = Math.round(dane["main"]["temp_max"]);
      prognoza.odczuwalna = Math.round(dane["main"]["feels_like"]);

      if (operacja === "dodaj") {
        prognozy.push(prognoza);
      }
      localStorage.setItem("prognozy", JSON.stringify(prognozy));
    })
    .then(() => wyswietlPrognozy(prognozy))
    .catch((err) => console.log(err));
};

function aktualizujPrognoze() {
  prognozy.forEach((prognoza) => {
    pobierzDanePrognozy(prognoza, prognoza.miasto, "aktualizuj");
  });
}

function pobierzPrognoze() {
    const miasto = document.querySelector(".miasto").value;
    const prognoza = {};
    pobierzDanePrognozy(prognoza, miasto, "dodaj");
    miasto.value = "";
  }

function wyswietlPrognozy(prognozy) {
  menuPrognoz.textContent = "";

  prognozy.forEach((prognoza, indeks) => {
    const nowaPrognoza = document.createElement("div");
    nowaPrognoza.classList.add("pole_prognozy");
    nowaPrognoza.innerHTML = `

      <h2>${prognoza.miasto}</h2>
      <div class="info_temp">
        <img src="http://openweathermap.org/img/wn/${prognoza.ikona}@2x.png"/>
    
        <div class="temps"> 
                <p>Wilgotność powietrza: ${prognoza.wilgotnosc}%</p>
                <p>Prędkość wiatru: ${prognoza.wiatr} m/s</p> 
                <p>Temperatura: ${prognoza.temperatura}°C</p>
                <p>Ciśnienie: ${prognoza.cisnienie} hPa</p>
                <p>Temperatura maksymalna: ${prognoza.temp_min}°C</p>
                <p>Temperatura minimalna: ${prognoza.temp_min}°C</p>
                <p>Temperatura odczuwalna: ${prognoza.odczuwalna}°C</p>
        </div>
        <button class="usun_przycisk" data-index="${indeks}">Usuń</button>
        `;
        nowaPrognoza
        .querySelector(".usun_przycisk")
        .addEventListener("click", (e) => {
          const indeks = e.target.getAttribute("data-index");
          prognozy.splice(indeks, 1);
          localStorage.setItem("prognozy", JSON.stringify(prognozy));
          wyswietlPrognozy(prognozy);
        });
      menuPrognoz.appendChild(nowaPrognoza);
    });
  }
  wyswietlPrognozy(prognozy);
  window.addEventListener("load", aktualizujPrognoze);
  przyciskSzukaj.addEventListener("click", pobierzPrognoze);
  