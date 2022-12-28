const area = document.getElementById("area");
const ball = document.getElementById("ball");
const holeContainer = document.getElementById("holeContainer");
const timeTakenElement = document.getElementById("timeTaken");
setInterval(() => {
  timer.innerHTML = (timeElapsed / 1000).toFixed(2) + "s";
}, 100);
let x = 0;
let y = 0;
let startTime;
let endTime;
let timeElapsed = 0;
let holesFilled = 0;
let intervalId;

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
  if (!startTime) {
    startTime = Date.now();
    intervalId = setInterval(() => {
      timeElapsed = Date.now() - startTime;
    }, 1000);
  }
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
      holesFilled++;
      isHoleFilled = true;
      if (holesFilled === holes.length) {
        endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000;
        timeTakenElement.innerHTML = `Końcowy czas: ${
          timeElapsed / 1000
        } seconds`;
        clearInterval(intervalId);
      }
    }
  }
  requestAnimationFrame(animate);
}

function randomHolePositions() {
  for (const hole of holes) {
    hole.style.display = "block";
    hole.style.left =
      Math.floor(Math.random() * (areaWidth - hole.offsetWidth)) + "px";
    hole.style.top =
      Math.floor(Math.random() * (areaHeight - hole.offsetHeight)) + "px";
  }
}

randomHolePositions();
animate();
