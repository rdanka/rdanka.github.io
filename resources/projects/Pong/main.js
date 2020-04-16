const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth * 0.75;
canvas.height = document.documentElement.clientHeight * 0.75;
let fps = 45;

let ball = {
    X: 50,
    Y: 50,
    velocityX: 10,
    velocityY: 4
}


let playerPongY = 250;
let computerPongY = 250;

const pongHeight = 100;
const pongWidth = 10;

let playerScore = 0;
let computerScore = 0;

const winningScore = 5;
let endGame = false;


function circle(centerX, centerY, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function rect(coordX, coordY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(coordX, coordY, width, height);
}

function calculateMousePos(evt) {
    let bounds = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - bounds.left - root.scrollLeft;
    let mouseY = evt.clientY - bounds.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function startGame() {
    if (endGame) {
        playerScore = 0;
        computerScore = 0;
        endGame = false;
    }

}

function ballReset() {

    if (playerScore === winningScore || computerScore === winningScore) {
        endGame = true;
    }

    ball.velocityX *= -1;
    ball.X = canvas.width / 2;
    ball.Y = canvas.height / 2;
}

function moveAI() {
    let center = computerPongY + pongHeight / 2;
    if (center < ball.Y - 35) {
        computerPongY += 6;
    } else if (center > ball.Y + 35) {
        computerPongY -= 6;
    }
}

function move() {

    if (endGame) {
        return;
    }

    moveAI();

    ball.X += ball.velocityX;
    ball.Y += ball.velocityY;

    if (ball.X >= canvas.width) {
        if (ball.Y > computerPongY && ball.Y < computerPongY + pongHeight) {
            ball.velocityX *= -1;
            let deltaY = ball.Y - (computerPongY + pongHeight / 2);
            ball.velocityY = deltaY * 0.35;
        } else {
            playerScore++;
            ballReset();
        }
    }
    if (ball.X < 0) {
        if (ball.Y > playerPongY && ball.Y < playerPongY + pongHeight) {
            ball.velocityX *= -1;
            let deltaY = ball.Y - (playerPongY + pongHeight / 2);
            ball.velocityY = deltaY * 0.35;
        } else {
            computerScore++;
            ballReset();
        }

    }
    if (ball.Y >= canvas.height || ball.Y <= 0) {
        ball.velocityY *= -1;
    }
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 40) {
        rect(canvas.width / 2, i, 1, 20, 'white');
    }
}

function draw() {

    //background
    rect(0, 0, canvas.clientWidth, canvas.height, 'black');
    //ball
    circle(ball.X, ball.Y, 10, 'white');

    //playerPong
    rect(0, playerPongY, pongWidth, pongHeight, 'white');
    drawNet();
    //playerPong
    rect(canvas.width - 10, computerPongY, pongWidth, pongHeight, 'white');
    //score
    canvasContext.font = '30px PressStart2P';
    canvasContext.fillText(playerScore, (canvas.width / 2) - 100, 100);
    canvasContext.fillText(computerScore, (canvas.width / 2) + 100, 100);

    if (endGame) {
        canvasContext.font = '25px PressStart2P';
        canvasContext.fillText("Click to continue", ((canvas.width / 2) / 2) - 150, 500);
        if (playerScore === winningScore) {
            canvasContext.fillText("You Won!", ((canvas.width / 2) / 2) - 100, 300);
        } else if (computerScore === winningScore) {
            canvasContext.fillText("You Lost!", ((canvas.width / 2) / 2) - 100, 300);
        }
        return;
    }

}


window.onload = () => {

    setInterval(() => {
        draw();
        move();
    }, 1000 / fps);

    canvas.addEventListener('mousedown', startGame);

    canvas.addEventListener('mousemove', (evt) => {
        let mousePos = calculateMousePos(evt);
        playerPongY = mousePos.y - pongHeight / 2;
    })
}