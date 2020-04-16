const canvas = document.querySelector(".canvas");
const generateArrayButton = document.querySelector("#generateArray");
const currentValueText = document.querySelector("#currentValue");
const timerValue = document.querySelector(".timer");
const sizeSlider = document.querySelector("#slider");
let arraySize = 50;
let time = 0;
let arr = [];

sizeSlider.addEventListener('input', () => {
    arraySize = sizeSlider.value;
    currentValueText.innerText = sizeSlider.value;
});

timerValue.addEventListener('input', () => {
    time = timerValue.value;
});

generateArrayButton.addEventListener('click', () => {
    arr = generateArray(arraySize);
    draw(arr);
});



function generateArray(size) {
    arr = [];
    for (let i = 0; i < size; i++) {
        arr[i] = Math.floor(Math.random() * 500 + 1);
    }
    return (arr);
}

function draw(arr) {
    canvas.innerHTML = '';
    console.log("asd");
    for (let i = 0; i < arr.length; i++) {
        let col = document.createElement('div');
        col.style.height = `${arr[i]}px`;
        col.style.width = `${1000/arr.length}px`;
        col.classList.add(`col`);
        col.classList.add(`col-${i}`);
        canvas.appendChild(col);
    }
}

function swap(arr, j, i) {
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* Sorting Algorithms */



let swaps = 0;

function bubbleSortAnimation(arr) {
    let animatedArray = []
    let swapped;
    let end;
    do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                animatedArray.push({
                    indexI: j,
                    indexJ: j + 1,
                    state: 'compare',
                })
                if (arr[j] > arr[j + 1]) {
                    animatedArray.push({
                        indexI: j,
                        indexJ: j + 1,
                        state: 'swap',
                    })
                    swap(arr, j, j + 1);
                    swapped = true;
                }
            }
            end = i;
        }
    } while (swapped && end === 0);
    return animatedArray;
}

async function bubbleSort() {

    let columns = Array.from(canvas.children);
    let animatedArray = bubbleSortAnimation(arr);
    let previous;


    for (let i = 0; i < animatedArray.length; i++) {
        await sleep(time);
        if (previous) {
            columns[previous.indexI].style.backgroundColor = "white";
            columns[previous.indexJ].style.backgroundColor = "white";
        }
        const animation = animatedArray[i];

        if (animation.state === 'compare') {
            columns[animation.indexI].style.backgroundColor = "red";
            columns[animation.indexJ].style.backgroundColor = "green";
        } else {
            columns[animation.indexI].style.backgroundColor = "green";
            columns[animation.indexJ].style.backgroundColor = "red";
            await sleep(time);
            const tempHeight = columns[animation.indexI].style.height;
            columns[animation.indexI].style.height = columns[animation.indexJ].style.height;
            columns[animation.indexJ].style.height = tempHeight;
        }

        previous = animation;
    }

    if (previous) {
        columns[previous.indexI].style.backgroundColor = "white";
        columns[previous.indexJ].style.backgroundColor = "white";
    }
}



function selectionSortAnimation(arr) {
    let animatedArray = [];
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        animatedArray.push({
            min: i,
            state: 'select-min',
        });
        for (let j = i + 1; j < arr.length; j++) {
            animatedArray.push({
                min,
                j,
                state: 'compare'
            });
            if (arr[min] > arr[j]) {
                animatedArray.push({
                    min: j,
                    state: 'select-min',
                });
                min = j;
            }
        }

        if (min !== i) {
            animatedArray.push({
                min,
                i,
                state: 'swap'
            });
            swap(arr, i, min);
        }
    }
    return animatedArray;
}

async function selectionSort() {
    let columns = Array.from(canvas.children);
    let animatedArray = selectionSortAnimation(arr);
    let previous;

    for (let i = 0; i < animatedArray.length; ++i) {
        await sleep(time);
        if (previous) {
            Number.isInteger(previous.min) && (columns[previous.min].style.backgroundColor = "white");
            Number.isInteger(previous.j) && (columns[previous.j].style.backgroundColor = "white");
            Number.isInteger(previous.i) && (columns[previous.i].style.backgroundColor = "white");
        }
        const animation = animatedArray[i];
        console.log(animation);

        if (animation.state === 'compare') {
            columns[animation.min].style.backgroundColor = "green";
            columns[animation.j].style.backgroundColor = "green";
        } else if (animation.state === 'swap') {
            columns[animation.min].style.backgroundColor = "red";
            columns[animation.i].style.backgroundColor = "red";
            await sleep(time);
            const tempHeight = columns[animation.min].style.height;
            columns[animation.min].style.height = columns[animation.i].style.height;
            columns[animation.i].style.height = tempHeight;

        } else {
            columns[animation.min].style.backgroundColor = "yellow";
        }

        previous = animation;
    }

    if (previous) {
        Number.isInteger(previous.min) && (columns[previous.min].style.backgroundColor = "white");
        Number.isInteger(previous.j) && (columns[previous.j].style.backgroundColor = "white");
        Number.isInteger(previous.i) && (columns[previous.i].style.backgroundColor = "white");
    }
}

function insertionSortAnimation(arr) {
    let animatedArray = [];

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i]; //Selects the first unsorted element

        animatedArray.push({
            key: i,
            state: 'select-key',
        });

        let j = i - 1;

        while (j >= 0 && arr[j] > key) { //Shifts elements to the right
            animatedArray.push({
                key: i,
                indexI: j,
                indexJ: j + 1,
                state: 'compare',
            })
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key; //Puts the element to the position
        animatedArray.push({
            key: j + 1,
            indexI: j,
            indexJ: j + 1,
            state: 'swap',
        })
    }
    return animatedArray;

}

async function insertionSort() {
    let columns = Array.from(canvas.children);
    let animatedArray = insertionSortAnimation(arr);
    let previous;

    for (let i = 0; i < animatedArray.length; i++) {
        await sleep(time);
        if (previous) {
            Number.isInteger(previous.key) && (columns[previous.key].style.backgroundColor = "white");
            Number.isInteger(previous.indexJ) && (columns[previous.indexJ].style.backgroundColor = "white");
            Number.isInteger(previous.indexI) && (columns[previous.indexI].style.backgroundColor = "white");
        }
        const animation = animatedArray[i];
        console.log(animation);
        if (animation.state === 'compare') {
            console.log(animation);
            columns[animation.key].style.backgroundColor = "green";
            columns[animation.indexJ].style.backgroundColor = "green";
        } else if (animation.state === 'swap') {
            columns[animation.key].style.backgroundColor = "red";
            columns[animation.indexI].style.backgroundColor = "red";
            await sleep(time);
            const tempHeight = columns[animation.key].style.height;
            columns[animation.key].style.height = columns[animation.indexI].style.height;
            columns[animation.indexI].style.height = tempHeight;

        } else {
            columns[animation.key].style.backgroundColor = "yellow";
        }

        previous = animation;
    }

    if (previous) {
        Number.isInteger(previous.key) && (columns[previous.key].style.backgroundColor = "white");
        Number.isInteger(previous.indexJ) && (columns[previous.indexJ].style.backgroundColor = "white");
        Number.isInteger(previous.indexI) && (columns[previous.indexI].style.backgroundColor = "white");
    }
}