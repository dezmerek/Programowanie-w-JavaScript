var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var iloscKul = document.querySelector("#iloscKul");
var iloscKulWartosc

canvas.width = window.innerWidth * 0.5;
canvas.height = window.innerHeight * 0.5;

var kulki = [];

var startBtn = document.getElementById("startBtn");
var resetBtn = document.getElementById("resetBtn");
var animacjaId;

startBtn.addEventListener("click", function() {
    animacjaId = requestAnimationFrame(rysuj);
    iloscKulWartosc = iloscKul.value
    for (var i = 0; i < iloscKulWartosc; i++) {
      var kulka = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: Math.random() * 3 - 1.5,
        dy: Math.random() * 3 - 1.5,
        promien: 10
      };
      kulki.push(kulka);
    }
});

resetBtn.addEventListener("click", function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    kulki=[];
});

for (var i = 0; i < iloscKulWartosc; i++) {
  var kulka = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: Math.random() * 3 - 1.5,
    dy: Math.random() * 3 - 1.5,
    promien: 10,
  };
  kulki.push(kulka);
}

function rysuj() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < iloscKulWartosc; i++) {
    var kulka = kulki[i];
    ctx.beginPath();
    ctx.arc(kulka.x, kulka.y, kulka.promien, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    kulka.x += kulka.dx;
    kulka.y += kulka.dy;

    if (kulka.x + kulka.promien > canvas.width || kulka.x - kulka.promien < 0) {
        kulka.dx = -kulka.dx;
    }
    if (kulka.y + kulka.promien > canvas.height || kulka.y - kulka.promien < 0) {
        kulka.dy = -kulka.dy;
    }
  }
  requestAnimationFrame(rysuj);
}

rysuj();