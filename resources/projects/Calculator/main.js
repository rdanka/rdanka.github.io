const currentOutput = document.querySelector('.calc__screen--current');
const previousOutput = document.querySelector('.calc__screen--previous');
const additionBtn = document.getElementById('add');
const substractionBtn = document.getElementById('sub');
const multiplyBtn = document.getElementById('multiply');
const divisionBtn = document.getElementById('divide');

let firstNum;
let secondNum;
let result = 0;
let secondInput = false;
let calculated = false;
let addition = false;
let subtraction = false;
let multiplication = false;
let division = false;
let input = [];

function calculateResult() {
    secondNum = input.join('');
    if (addition) {
        result = parseFloat(firstNum) + parseFloat(secondNum);
        addition = false;
    } else if (subtraction) {
        result = parseFloat(firstNum) - parseFloat(secondNum);
        subtraction = false;
    } else if (multiplication) {
        result = parseFloat(firstNum) * parseFloat(secondNum);
        multiplication = false;
    } else {
        result = parseFloat(firstNum) / parseFloat(secondNum);
        division = false;
    }

    console.log(`First number: ${firstNum}, Second number: ${secondNum},result: ${result}`);
    firstNum = 0;
    secondNum = 0;
    currentOutput.innerHTML = result;
    calculated = true;
    input = [];
}

function add() {
    writeResult('+');
    input.pop();
    if (input.length !== 0) {
        firstNum = input.join('');
    }
    secondInput = true;
    addition = true;
    input = [];
}

function sub() {
    writeResult('-');
    input.pop();
    if (input.length !== 0) {
        firstNum = input.join('');
    }
    secondInput = true;
    subtraction = true;
    input = [];
}

function multiply() {
    writeResult('*');
    input.pop();
    if (input.length !== 0) {
        firstNum = input.join('');
    }
    secondInput = true;
    multiplication = true;
    input = [];
}

function divide() {
    writeResult('/');
    input.pop();
    if (input.length !== 0) {
        firstNum = input.join('');
    }
    secondInput = true;
    division = true;
    input = [];
}

function writeResult(pressedBtn) {
    input.push(pressedBtn);
    console.log(pressedBtn);
    currentOutput.innerHTML += pressedBtn;
}

function clearAll() {
    currentOutput.innerHTML = '';
    input = [];
}

additionBtn.addEventListener('click', () => {
    if (calculated) {
        currentOutput.innerHTML = '';
        previousOutput.innerHTML = result;
        firstNum = result;
        result = '';
        calculated = false;
    }
});
substractionBtn.addEventListener('click', () => {
    if (calculated) {
        currentOutput.innerHTML = '';
        previousOutput.innerHTML = result;
        firstNum = result;
        result = '';
        calculated = false;
    }
});
multiplyBtn.addEventListener('click', () => {
    if (calculated) {
        currentOutput.innerHTML = '';
        previousOutput.innerHTML = result;
        firstNum = result;
        result = '';
        calculated = false;
    }
});
divisionBtn.addEventListener('click', () => {
    if (calculated) {
        currentOutput.innerHTML = '';
        previousOutput.innerHTML = result;
        firstNum = result;
        result = '';
        calculated = false;
    }
});

document.body.addEventListener('keydown', (evt) => {
    const key = evt.key;
    if (calculated) {
        currentOutput.innerHTML = '';
        previousOutput.innerHTML = result;
        if (key === '+' || key === '-' || key === '*' || key === '/') {
            firstNum = result;
        }
        result = '';
        calculated = false;
    }
    if (key === 'Enter') {
        calculateResult();
    } else {
        switch (key) {
            case '1':
                writeResult(key);
                break;
            case '2':
                writeResult(key);
                break;
            case '3':
                writeResult(key);
                break;
            case '4':
                writeResult(key);
                break;
            case '5':
                writeResult(key);
                break;
            case '6':
                writeResult(key);
                break;
            case '7':
                writeResult(key);
                break;
            case '8':
                writeResult(key);
                break;
            case '9':
                writeResult(key);
                break;
            case '0':
                writeResult(key);
                break;
            case '.':
                writeResult(key);
                break;
            case ',':
                writeResult('.');
                break;
            case '+':
                add();
                break;
            case '-':
                sub();
                break;
            case '*':
                multiply();
                break;
            case '/':
                divide();
                break;
        }
    }
});