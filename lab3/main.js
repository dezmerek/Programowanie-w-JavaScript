document.addEventListener("keypress", nacisniecieKlawisza);

//pobieranie z html
const przyciskRozpoczeciaNagrywania = document.querySelector("#startNagrywanie");
const przyciskZakonczeniaNagrywania = document.querySelector("#stopNagrywanie");
const przyciskOdtwarzaniaNagrania = document.querySelector("#playOdtwarzanie");

//zmienne przechowujace
let czasRozpoczeciaNagrywania;
let pierwszeNagranie = [];
let aktualneNagranie = [];

przyciskRozpoczeciaNagrywania.addEventListener("click", rozpocznijNagrywanie);
przyciskZakonczeniaNagrywania.addEventListener("click", zakonczNagrywanie);
przyciskOdtwarzaniaNagrania.addEventListener("click", odtworzNagranie);

function nacisniecieKlawisza(zdarzenie) {
  let dzwiek;
  switch (zdarzenie.key) {
    case "1":
      dzwiek = "boom";
      break;
    case "2":
      dzwiek = "clap";
      break;
    case "3":
      dzwiek = "hihat";
      break;
    case "4":
      dzwiek = "kick";
      break;
    case "5":
      dzwiek = "openhat";
      break;
    case "6":
      dzwiek = "ride";
      break;
    case "7":
      dzwiek = "snare";
      break;
    case "8":
      dzwiek = "tink";
      break;
    case "9":
      dzwiek = "tom";
      break;
    default:
      return;
  }

  odtworzDzwiek(dzwiek);
}

function odtworzDzwiek(dzwiek) {
  if (czyNagrywa) {
    nagrajDzwiek(dzwiek);
  }
  const audioTag = document.querySelector(`#${dzwiek}`);
  audioTag.currentTime = 0;
  audioTag.play();
}

let czyNagrywa = false;

function rozpocznijNagrywanie() {
  if (this.id === "startNagrywanie") {
    pierwszeNagranie = [];
    aktualneNagranie = pierwszeNagranie;
  } else {
    console.log("error");
  }
  console.log("Nagrywanie!");
  czyNagrywa = true;
  czasRozpoczeciaNagrywania = Date.now();
}

function zakonczNagrywanie() {
  console.log("Zakończono nagrywanie!");
  czyNagrywa = false;
}

function odtworzNagranie() {
  if (this.id === "playOdtwarzanie") {
    aktualneNagranie = pierwszeNagranie;
    console.log("Odtwarzanie!");
  } else {
    console.log("error");
  }

  if (aktualneNagranie.length === 0) return;
  aktualneNagranie.forEach((nagranie) => {
    setTimeout(() => {
      odtworzDzwiek(nagranie.klucz);
    }, nagranie.czasRozpoczecia);
  });
}

function nagrajDzwiek(dzwiek) {
  aktualneNagranie.push({
    klucz: dzwiek,
    czasRozpoczecia: Date.now() - czasRozpoczeciaNagrywania,
  });
}