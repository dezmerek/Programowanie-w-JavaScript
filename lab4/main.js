//tablica na notatki
let notatki = [];
let edytowanaNotatka = null;

//pobieranie elementów z html
const form = document.querySelector("form");
const tytulInput = document.querySelector("#tytul");
const trescInput = document.querySelector("#tresc");
const kolorInput = document.querySelector("#kolor");
const pinInput = document.querySelector("#pin");
const listaNotatek = document.querySelector("#lista-notatek");

//pobieranie notatek z localStorage
if (localStorage.getItem("notatki")) {
  notatki = JSON.parse(localStorage.getItem("notatki"));
  renderujListeNotatek();
}

//funkcja dodająca nową notatkę lub edytująca istniejącą
function dodajNotatke(e) {
  e.preventDefault();
  //pobieranie danych z inputów
  const tytul = tytulInput.value;
  const tresc = trescInput.value;
  const kolor = kolorInput.value;
  const pin = pinInput.checked;
  //sprawdzanie trybu edycji
  if (edytowanaNotatka) {
    //aktualizowanie danych notatki
    edytowanaNotatka.tytul = tytul;
    edytowanaNotatka.tresc = tresc;
    edytowanaNotatka.kolor = kolor;
    edytowanaNotatka.pin = pin;
    edytowanaNotatka = null;
    // znajdowanie indeksu notatki w tablicy
    let index = notatki.findIndex(
      (notatka) => notatka.data === edytowanaNotatka.data
    );
    // usunięcie notatki z tablicy
    notatki.splice(index, 1);
    // jeśli notatka jest przypięta, bedzie na początku
    if (pin) {
      notatki.unshift(edytowanaNotatka);
    } else {
      notatki.push(edytowanaNotatka);
    }
  } else {
    //tworzenie nowej notatki
    const nowaNotatka = {
      tytul,
      tresc,
      kolor,
      pin,
      data: Date.now(),
    };
    //dodanie notatki do tablicy
    if (pin) {
      notatki.unshift(nowaNotatka);
    } else {
      notatki.push(nowaNotatka);
    }
  }
  //zapisanie notatek do localStorage
  localStorage.setItem("notatki", JSON.stringify(notatki));
  //renderowanie listy notatek
  renderujListeNotatek();
  //czyszczenie inputów
  tytulInput.value = "";
  trescInput.value = "";
  kolorInput.value = "#ffffff";
  pinInput.checked = false;
}

//nasłuchiwanie na submit formularza
form.addEventListener("submit", dodajNotatke);

//funkcja do renderowania listy notatek
function renderujListeNotatek() {
  //usuwanie zawartości listy notatek
  listaNotatek.innerHTML = "";
  //iterowanie po tablicy notatek
  for (let i = 0; i < notatki.length; i++) {
    const notatka = notatki[i];
    //tworzenie diva dla notatki
    const div = document.createElement("div");
    div.classList.add("notatka");
    if (notatka.pin) {
      div.classList.add("pinned");
    }
    div.style.backgroundColor = notatka.kolor;
    //tworzenie tytułu
    const h2 = document.createElement("h2");
    h2.innerHTML = notatka.tytul;
    div.appendChild(h2);
    //tworzenie treści
    const p = document.createElement("p");
    p.innerHTML = notatka.tresc;
    div.appendChild(p);
    //daty utworzenia
    const span = document.createElement("span");
    const nowalinia = document.createElement("nowalinia");
    span.innerHTML = new Date(notatka.data).toLocaleDateString(); //bez date = +godzina
    nowalinia.innerHTML = `<br>`;
    div.appendChild(span);
    div.appendChild(nowalinia);
    //tworzenie przycisku edycji
    const buttonEdytuj = document.createElement("button");
    buttonEdytuj.innerHTML = `Edytuj`;
    buttonEdytuj.addEventListener("click", () => {
      edytujNotatke(notatka);
    });
    div.appendChild(buttonEdytuj);
    //tworzenie przycisku usuwania
    const buttonUsun = document.createElement("button");
    buttonUsun.innerHTML = `Usuń`;
    buttonUsun.addEventListener("click", () => {
      usunNotatke(notatka);
    });
    div.appendChild(buttonUsun);
    //dodanie notatki do listy
    listaNotatek.appendChild(div);
  }
}

//funkcja edytująca notatkę
function edytujNotatke(notatka) {
  edytowanaNotatka = notatka;
  //wypełnienie pól formularza danymi notatki
  tytulInput.value = notatka.tytul;
  trescInput.value = notatka.tresc;
  kolorInput.value = notatka.kolor;
  pinInput.checked = notatka.pin;
}

//funkcja usuwająca notatkę
function usunNotatke(notatka) {
  //usuwanie notatki z tablicy
  notatki = notatki.filter((el) => el !== notatka);
  //zapisanie notatek do localStorage
  localStorage.setItem("notatki", JSON.stringify(notatki));
  //renderowanie listy notatek
  renderujListeNotatek();
}