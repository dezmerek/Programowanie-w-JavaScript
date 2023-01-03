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
    var kulka1 = kulki[i];
    ctx.beginPath();
    ctx.arc(kulka1.x, kulka1.y, kulka1.promien, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    kulka1.x += kulka1.dx;
    kulka1.y += kulka1.dy;

    if (kulka1.x + kulka1.promien > canvas.width || kulka1.x - kulka1.promien < 0) {
        kulka1.dx = -kulka1.dx;
    }
    if (kulka1.y + kulka1.promien > canvas.height || kulka1.y - kulka1.promien < 0) {
        kulka1.dy = -kulka1.dy;
    }

    for (var j = i + 1; j < iloscKulWartosc; j++) {
        var kulka2 = kulki[j];
        var odległość = Math.sqrt(Math.pow(kulka2.x - kulka1.x, 2) + Math.pow(kulka2.y - kulka1.y, 2));
        if (odległość < 100) {
        ctx.beginPath();
        ctx.moveTo(kulka1.x, kulka1.y);
        ctx.lineTo(kulka2.x, kulka2.y);
        ctx.stroke();
        }
        }
        }
        requestAnimationFrame(rysuj);
        }
        
        rysuj();