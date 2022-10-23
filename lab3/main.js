document.addEventListener("keypress", nacisniecieKlawisza);

//pobieranie z html
const przyciskRozpoczeciaNagrywania1 =
  document.querySelector("#startNagrywanie1");
const przyciskRozpoczeciaNagrywania2 =
  document.querySelector("#startNagrywanie2");
const przyciskRozpoczeciaNagrywania3 =
  document.querySelector("#startNagrywanie3");
const przyciskRozpoczeciaNagrywania4 =
  document.querySelector("#startNagrywanie4");
const przyciskZakonczeniaNagrywania = document.querySelector("#stopNagrywanie");
const przyciskOdtwarzaniaNagrania1 =
  document.querySelector("#playOdtwarzanie1");
const przyciskOdtwarzaniaNagrania2 =
  document.querySelector("#playOdtwarzanie2");
const przyciskOdtwarzaniaNagrania3 =
  document.querySelector("#playOdtwarzanie3");
const przyciskOdtwarzaniaNagrania4 =
  document.querySelector("#playOdtwarzanie4");

//zmienne przechowujace
let czasRozpoczeciaNagrywania;
let pierwszeNagranie = [];
let drugieNagranie = [];
let trzecieNagranie = [];
let czwarteNagranie = [];
let aktualneNagranie;

przyciskRozpoczeciaNagrywania1.addEventListener("click", rozpocznijNagrywanie);
przyciskRozpoczeciaNagrywania2.addEventListener("click", rozpocznijNagrywanie);
przyciskRozpoczeciaNagrywania3.addEventListener("click", rozpocznijNagrywanie);
przyciskRozpoczeciaNagrywania4.addEventListener("click", rozpocznijNagrywanie);
przyciskZakonczeniaNagrywania.addEventListener("click", zakonczNagrywanie);
przyciskOdtwarzaniaNagrania1.addEventListener("click", odtworzNagranie);
przyciskOdtwarzaniaNagrania2.addEventListener("click", odtworzNagranie);
przyciskOdtwarzaniaNagrania3.addEventListener("click", odtworzNagranie);
przyciskOdtwarzaniaNagrania4.addEventListener("click", odtworzNagranie);

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
  const button = document.querySelector(`#${dzwiek}.key`); 
  button.classList.add("active");
  audioTag.currentTime = 0;
  audioTag.play();
  audioTag.addEventListener("ended", () => {
    button.classList.remove("active"); 
  });
}

let czyNagrywa = false;

function rozpocznijNagrywanie() {
  if (this.id === "startNagrywanie1") {
    aktualneNagranie = pierwszeNagranie;
  } else if (this.id === "startNagrywanie2") {
    aktualneNagranie = drugieNagranie;
  } else if (this.id === "startNagrywanie3") {
    aktualneNagranie = trzecieNagranie;
  } else if (this.id === "startNagrywanie4") {
    aktualneNagranie = czwarteNagranie;
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
  if (this.id === "playOdtwarzanie1") {
    aktualneNagranie = pierwszeNagranie;
  } else if (this.id === "playOdtwarzanie2") {
    aktualneNagranie = drugieNagranie;
  } else if (this.id === "playOdtwarzanie3") {
    aktualneNagranie = trzecieNagranie;
  } else if (this.id === "playOdtwarzanie4") {
    aktualneNagranie = czwarteNagranie;
  } else {
    console.log("error");
  }

  console.log("Odtwarzanie!");

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