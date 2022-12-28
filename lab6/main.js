const area = document.getElementById("area");
const ball = document.getElementById("ball");
const holeContainer = document.getElementById("holeContainer");

let x = 0;
let y = 0;

area.style.width = "400px";
area.style.height = "400px";

const areaWidth = area.offsetWidth;
const areaHeight = area.offsetHeight;

const holes = [];
for (let i = 0; i < 5; i++) {
  const hole = document.createElement("div");
  hole.classList.add("hole");
  holeContainer.appendChild(hole);
  holes.push(hole);
}

window.addEventListener("deviceorientation", (event) => {
  x += event.gamma / 10;
  y += event.beta / 10;

  x = Math.max(0, Math.min(x, areaWidth - ball.offsetWidth));
  y = Math.max(0, Math.min(y, areaHeight - ball.offsetHeight));
});

function animate() {
  ball.style.left = x + "px";
  ball.style.top = y + "px";

  for (const hole of holes) {
    if (
      x > hole.offsetLeft &&
      x < hole.offsetLeft + hole.offsetWidth &&
      y > hole.offsetTop &&
      y < hole.offsetTop + hole.offsetHeight
    ) {
      hole.style.display = "none";
    }
  }

  requestAnimationFrame(animate);
}

function randomHolePositions() {
  for (const hole of holes) {
    hole.style.display = "block";
    hole.style.left = Math.floor(Math.random() * (areaWidth - hole.offsetWidth)) + "px";
    hole.style.top = Math.floor(Math.random() * (areaHeight - hole.offsetHeight)) + "px";
  }
  for (const hole of holes) {
  hole.addEventListener("mouseover", () => {
    hole.style.display = "none";
  });
}

}

randomHolePositions();

animate();
