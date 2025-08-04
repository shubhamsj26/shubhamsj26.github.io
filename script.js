const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

// Paddle properties
const paddleHeight = 80;
const paddleWidth = 10;
let playerY = canvas.height / 2 - paddleHeight / 2;
let computerY = canvas.height / 2 - paddleHeight / 2;

// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Score
let playerScore = 0;
let computerScore = 0;

// Fireworks
const fireworksContainer = document.getElementById('fireworks-container');
const fireworks = new Fireworks.default(fireworksContainer, {
    speed: 3,
    acceleration: 1.05,
    friction: 0.97,
    gravity: 1.5,
    particles: 80,
    trace: 6,
    explosion: 5,
    autoresize: true,
    intensity: 30
});

function onGameWon() {
    document.getElementById('fireworkSound').play();
    fireworks.start();
    setTimeout(() => fireworks.stop(), 5000);
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player Paddle
    ctx.fillStyle = "#00f";
    ctx.fillRect(0, playerY, paddleWidth, paddleHeight);

    // Computer Paddle
    ctx.fillStyle = "#f00";
    ctx.fillRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight);

    // Ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0f0";
    ctx.fill();
    ctx.closePath();

    // Score
    ctx.font = "20px Arial";
    ctx.fillText("Player: " + playerScore, 20, 20);
    ctx.fillText("Computer: " + computerScore, canvas.width - 140, 20);
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Top and bottom bounce
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Player paddle bounce
    if (ballX - ballRadius < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Computer paddle bounce
    if (ballX + ballRadius > canvas.width - paddleWidth && ballY > computerY && ballY < computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Left wall (computer scores)
    if (ballX - ballRadius < 0) {
        computerScore++;
        resetBall();
    }

    // Right wall (player scores)
    if (ballX + ballRadius > canvas.width) {
        playerScore++;
        resetBall();
    }

    // Computer AI
    if (computerY + paddleHeight / 2 < ballY) {
        computerY += 4;
    } else {
        computerY -= 4;
    }

    if (playerScore >= 5) {
        onGameWon();
        alert("🎉 You Win!");
        playerScore = 0;
        computerScore = 0;
    }

    if (computerScore >= 5) {
        alert("💥 Computer Wins!");
        playerScore = 0;
        computerScore = 0;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 4;
}

// Paddle movement
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault(); // Stop page scroll
    }

    if (event.key === "ArrowUp" && playerY > 0) {
        playerY -= 20;
    } else if (event.key === "ArrowDown" && playerY < canvas.height - paddleHeight) {
        playerY += 20;
    }
});

// Game loop
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
