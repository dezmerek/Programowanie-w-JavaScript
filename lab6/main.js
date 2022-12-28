const area = document.getElementById("area");
const ball = document.getElementById("ball");
const hole = document.getElementById("hole");

let x = 0;
let y = 0;

// set the size of the area
area.style.width = "400px";
area.style.height = "400px";

const holeWidth = hole.offsetWidth;
const holeHeight = hole.offsetHeight;
const areaWidth = area.offsetWidth;
const areaHeight = area.offsetHeight;

window.addEventListener("deviceorientation", (event) => {
  x += event.gamma / 10;
  y += event.beta / 10;

  x = Math.max(0, Math.min(x, areaWidth - ball.offsetWidth));
  y = Math.max(0, Math.min(y, areaHeight - ball.offsetHeight));
});

function animate() {
  ball.style.left = x + "px";
  ball.style.top = y + "px";

  if (
    x > hole.offsetLeft &&
    x < hole.offsetLeft + holeWidth &&
    y > hole.offsetTop &&
    y < hole.offsetTop + holeHeight
  ) {
    hole.style.display = "none";
    randomHolePosition();
  }

  requestAnimationFrame(animate);
}

function randomHolePosition() {
  const x = Math.floor(Math.random() * (areaWidth - holeWidth));
  const y = Math.floor(Math.random() * (areaHeight - holeHeight));

  hole.style.left = x + "px";
  hole.style.top = y + "px";
  hole.style.display = "block";
}

randomHolePosition();

animate();