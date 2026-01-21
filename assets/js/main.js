const max = 20;
let ground = Array(max).fill("_");
let dino = 13;

let jumping = 0;
let jumpTimer = 0;
let cactusCd = 0;
let isGameOver = 0;
let score = 0;
let gameOverShow = 0;

function clear() {
    ground[dino] = "_";
}

function world() {
    for (let i = max - 1; i > 0; i--) {
        ground[i] = ground[i - 1];
    }
    ground[0] = "_";
}

function spawnCactus() {
    if (cactusCd > 0) cactusCd--;

    if (cactusCd == 0 && Math.random() < 0.3 && ground[0] === "_") {
        ground[0] = "🌵";
        cactusCd = 5;
    }
}

function updateJump() {
    if (jumping) {
        jumpTimer--;
        if (jumpTimer <= 0) jumping = 0;
    }
}

function initDino() {
    if (jumping == 0) {
        ground[dino] = "🦖";
    }
}

function checkGameOver() {
    if (ground[dino] === "🌵" && jumping == 0) {
        isGameOver = 1;
    }
}

function render() {
    if (isGameOver) {
        if (gameOverShow == 0) {
            gameOverShow = 1;

            // title
            document.title = "GAME OVER 💥";
            // address bar
            // location.hash = "GAME-OVER-💥";

            setTimeout(() => {
                document.title = "SCORE: " + score;
                // location.hash = "SCORE:" + score;
            }, 1500);
        }
    } else {
        document.title = ground.join("");
        // location.hash = ground.join("");
    }
}

function jump() {
    if (jumping || isGameOver) return;
    jumping = 1;
    jumpTimer = 3;
}

document.addEventListener("keydown", e => {
    if (e.code === "Space") jump();
});
document.addEventListener("click", jump);

setInterval(function () {
    if (isGameOver) {
        render();
        return;
    }

    score++;
    clear();
    world();
    spawnCactus();
    checkGameOver();
    updateJump();
    initDino();
    render();
}, 200);
