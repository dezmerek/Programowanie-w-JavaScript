//tablica na notatki
let notatki = [];

//pobieranie elementów z html
const form = document.querySelector("form");
const tytulInput = document.querySelector("#tytul");
const trescInput = document.querySelector("#tresc");
const kolorInput = document.querySelector("#kolor");
const pinInput = document.querySelector("#pin");
const listaNotatek = document.querySelector("#lista-notatek");

//pobieranie elementów radio 
const bialyRadio = document.querySelector("#bialy-radio");
const zielonyRadio = document.querySelector("#zielony-radio");
const niebieskiRadio = document.querySelector("#niebieski-radio");
const zoltyRadio = document.querySelector("#zolty-radio")

//pobieranie notatek z localStorage
if (localStorage.getItem("notatki")) {
  notatki = JSON.parse(localStorage.getItem("notatki"));
  renderujListeNotatek();
}

//funkcja dodająca nową notatkę
function dodajNotatke(e){
    e.preventDefault();
    //pobieranie danych z inputów
    const tytul = tytulInput.value;
    const tresc = trescInput.value;
    let kolor = "";
    if(bialyRadio.checked) kolor = "white";
    if(zielonyRadio.checked) kolor = "green";
    if(niebieskiRadio.checked) kolor = "aqua";
    if(zoltyRadio.checked) kolor = "yellow";
    const pin = pinInput.checked;
    //tworzenie nowej notatki
    const nowaNotatka = {
        tytul,
        tresc,
        kolor,
        pin,
        data: Date.now()
    }
    //dodanie notatki do tablicy
    notatki.push(nowaNotatka);
    //zapisanie notatek do localStorage
    localStorage.setItem("notatki", JSON.stringify(notatki));
    //renderowanie listy notatek
    renderujListeNotatek();
    //czyszczenie inputów
    tytulInput.value = "";
    trescInput.value = "";
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
    //dodanie notatki do listy
    listaNotatek.appendChild(div);
  }
}