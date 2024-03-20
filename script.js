const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bird = {
  x: 50,
  y: canvas.height / 2,
  radius: 20,
  velocity: 0,
  gravity: 0.7,
  jumpStrength: -12
};

let obstacles = [];
let gameStopped = false;
let score = 0;

function drawBird() {
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawObstacles() {
  for (let obstacle of obstacles) {
    ctx.fillStyle = "green";
    ctx.fillRect(obstacle.x, 0, obstacle.width, obstacle.topHeight);
    ctx.fillRect(obstacle.x, obstacle.bottomY, obstacle.width, canvas.height - obstacle.bottomY);
  }
}

function update() {
  if (!gameStopped) {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.radius > canvas.height) {
      bird.y = canvas.height - bird.radius;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawObstacles();
    drawBird();

    for (let obstacle of obstacles) {
      if (
        bird.x + bird.radius > obstacle.x &&
        bird.x - bird.radius < obstacle.x + obstacle.width &&
        (bird.y - bird.radius < obstacle.topHeight || bird.y + bird.radius > obstacle.bottomY)
      ) {
        resetGame();
        return;
      }
      if (bird.x === obstacle.x) {
        score++;
      }
    }

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(update);
  }
}

function jump() {
  bird.velocity = bird.jumpStrength;
}

function resetGame() {
  gameStopped = true;
  obstacles = [];
  bird.y = canvas.height / 2;
  bird.velocity = 0;
  score = 0;
  setTimeout(() => {
    gameStopped = false;
  }, 1000);
}

function createObstacle() {
  const minHeight = 50;
  const gap = 150;
  const maxHeight = canvas.height - gap - minHeight;
  const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

  const obstacle = {
    x: canvas.width,
    topHeight: height,
    bottomY: height + gap,
    width: 50,
    speed: 2
  };
  obstacles.push(obstacle);
}

setInterval(createObstacle, 1500);

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});

update();
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}