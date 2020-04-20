const gridContainer = document.querySelector(".grid");
const placeStartButton = document.querySelector(".placeStart");
const placeGoalButton = document.querySelector(".placeGoal");
const placeWallButton = document.querySelector(".placeWall");

let gridLine;
let gridElement;
let putStart = false;
let putGoal = false;
let putWall = false;
let mouseDown = false;



let start = {
    x: 0,
    y: 0
};

let gridWidth = parseInt(window.getComputedStyle(gridContainer).getPropertyValue('width'), 10) / 22.5;
let gridHeight = (window.innerHeight / 20) - 8;
let grid = [];

for (let i = 0; i < gridHeight; i++) {
    grid[i] = [];
    gridLine = document.createElement('div');
    gridLine.classList.add('line');
    for (let j = 0; j < gridWidth; j++) {
        let xPos = j;
        let yPos = i;
        gridElement = document.createElement('div');
        gridElement.classList.add('element');
        gridElement.onclick = function () {
            putElement(yPos, xPos);
        };
        gridElement.onmousedown = function () {

            mouseDown = true;
        };
        gridElement.onmouseup = function () {

            mouseDown = false;
        };
        gridElement.addEventListener('mousemove', function () {
            if (mouseDown && putWall) {
                placeWall(yPos, xPos);

            }
        })

        grid[i][j] = 'Empty';
        gridLine.appendChild(gridElement);
    }
    gridContainer.appendChild(gridLine);

}


function placeStart(ypos, xpos) {
    start = {
        x: xpos,
        y: ypos
    };

    grid[start.y][start.x] = "Start";
    gridContainer.childNodes[start.y].childNodes[start.x].innerHTML = '<svg class="icon"> <use xlink:href="SVG/sprite.svg#icon-chevron-right"></use></svg>';
}

function placeGoal(ypos, xpos) {
    let goal = {
        x: xpos,
        y: ypos
    }
    grid[goal.y][goal.x] = "Goal";
    gridContainer.childNodes[goal.y].childNodes[goal.x].innerHTML = '<svg class="icon"> <use xlink:href="SVG/sprite.svg#icon-target"></use></svg>';
}

function placeWall(ypos, xpos) {
    let wall = {
        x: xpos,
        y: ypos
    }
    grid[wall.y][wall.x] = "Obstacle";
    gridContainer.childNodes[wall.y].childNodes[wall.x].classList.add("wall");
}

function putElement(yPos, xPos) {
    if (putStart) {
        putWall = false;
        placeStart(yPos, xPos);
        putStart = false;
    } else if (putGoal) {
        putWall = false;
        placeGoal(yPos, xPos);
        putGoal = false;
    } else if (putWall) {
        placeWall(yPos, xPos);
    }
}

placeGoalButton.addEventListener('click', () => {
    document.body.style.cursor = "url('SVG/targetMouse.svg'), auto";
    putGoal = true;
    placeGoalButton.disabled = 'true';
});
placeWallButton.addEventListener('click', () => {
    putWall = true;
});
placeStartButton.addEventListener('click', () => {
    document.body.style.cursor = "url('SVG/chevron-rightMouse.svg'), auto";
    putStart = true;
    placeStartButton.disabled = 'true';
});

document.body.addEventListener('click', () => {
    if (!putStart && !putGoal) {
        document.body.style.cursor = "default";
    }
});