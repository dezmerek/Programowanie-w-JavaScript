var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.5;
canvas.height = window.innerHeight * 0.5;

var kulki = [];
var iloscKul = 10;

for (var i = 0; i < iloscKul; i++) {
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
  for (var i = 0; i < iloscKul; i++) {
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
    if (
      kulka.y + kulka.promien > canvas.height ||
      kulka.y - kulka.promien < 0
    ) {
      kulka.dy = -kulka.dy;
    }
  }
  requestAnimationFrame(rysuj);
}

rysuj();
