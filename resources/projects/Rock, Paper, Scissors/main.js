const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
let finalChoice = 0;
let status;

function computerChoice() {
    const choice = Math.floor(Math.random() * 3);
    const choices = [ROCK, PAPER, SCISSORS];
    const animationChoice = [0, -20, -42];
    finalChoice = animationChoice[choice];
    return choices[choice];
}

function getWinner(pChoice, cChoice) {
    if (pChoice === ROCK && cChoice === SCISSORS || pChoice === PAPER && cChoice === ROCK || pChoice === SCISSORS && cChoice === PAPER) {
        console.log("Player won!");
        console.log(`${pChoice} againts ${cChoice}`);
        status = 'WON';
    } else if (pChoice === cChoice) {
        console.log("It's a draw!");
        console.log(`${pChoice} againts ${cChoice}`);
        status = 'DRAW';
    } else {
        console.log("Computer won!");
        console.log(`${pChoice} againts ${cChoice}`);
        status = 'LOST';
    }
}

function draw(pChoice) {
    const playerLabel = document.getElementById(pChoice);
    const statusText = document.querySelector('.statusText');
    const computerLabel = document.querySelector('.computer').style;
    const root = document.documentElement;
    const replayButton = document.querySelector('.playAgainButton').style;


    if (pChoice === ROCK) {
        document.getElementById(PAPER).style.display = "none";
        document.getElementById(SCISSORS).style.display = "none";
    } else if (pChoice === PAPER) {
        document.getElementById(ROCK).style.display = "none";
        document.getElementById(SCISSORS).style.display = "none";
    } else {
        document.getElementById(ROCK).style.display = "none";
        document.getElementById(PAPER).style.display = "none";
    }

    playerLabel.onclick = null;
    playerLabel.style.gridColumn = "1/2";
    playerLabel.style.gridRow = "1/2";
    playerLabel.style.gridRow = "1/2";
    playerLabel.classList.remove("onHover");

    statusText.style.display = "block";
    computerLabel.display = "block";

    root.style.setProperty('--final', `${finalChoice}rem`);

    setTimeout(() => {
        if (status === 'WON') {
            statusText.style.color = "#1BA345";
            statusText.innerHTML = "You won!";
        } else if (status === 'DRAW') {
            statusText.style.color = "#FEC001";
            statusText.innerHTML = "It's a draw!";
        } else {
            statusText.style.color = "#DE3E44";
            statusText.innerHTML = "You lost!";
        }
        replayButton.display = "block";
    }, 2175);




}

function startGame(pChoice) {
    getWinner(pChoice, computerChoice());
    draw(pChoice);

}

function restartGame() {
    location.reload();
}