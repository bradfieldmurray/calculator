const numberBtns = [0,1,2,3,4,5,6,7,8,9];


const operatorLiterals = ['+', '-', '*', '/'];
const operatorSymbols = [String.fromCharCode(0x002B), String.fromCharCode(0x2212), String.fromCharCode(0x00D7), String.fromCharCode(0x00F7)];

//functions for each operator
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => (b==0) ? alert("Nice try") : (a/b).toFixed(2);

//array that stores references to operator functions (coincides with array of operator symbol for easy matching)
const op = [add, subtract, multiply, divide];


//get value of equation entered
const operate = (a,symbol,b) => op[symbol](a,b);


function addToEquation(value) {
    if(equationMid.textContent == ''){
        equationLeft.textContent += value;
    } else {
        equationRight.textContent += value;
    }
}

function addOperatorToEquation(value) {
    if(equationLeft.textContent != '') {
        equationMid.textContent = value;
    }
}

function removeFromEquation() {
    if(equationRight.textContent != '') {
        equationRight.textContent = removeOne(equationRight.textContent);
    } else if(equationMid.textContent != '') {
        equationMid.textContent = removeOne(equationMid.textContent);
    } else {
        equationLeft.textContent = removeOne(equationLeft.textContent);
    }
}

function evaluateEquation() {
    if(equationLeft.textContent != '' && equationMid != '' && equationRight.textContent != ''){
        equationLeft.textContent = operate(Number(equationLeft.textContent), operatorSymbols.indexOf(equationMid.textContent), Number(equationRight.textContent));
        equationMid.textContent = '';
        equationRight.textContent = '';
    }
}

//removes one character from string (used with backspace operations)
function removeOne(string) {
    return Array.from(string)
    .slice(0,string.length-1)
    .join('');
}

//set up listeners for keyboard entry
const body = document.querySelector('body');
body.addEventListener('keydown', (e) => {

    if(e.key == 'Backspace') {
        removeFromEquation();
    } else if(e.key == 'Enter') {
        evaluateEquation();
    } else if(e.key != ' '){
        //check to see if a number has been pressed
        if(numberBtns.indexOf(Number(e.key)) != -1) {
            addToEquation(e.key);
        } else if(operatorSymbols[operatorLiterals.indexOf(e.key)] != -1) {
            addOperatorToEquation(operatorSymbols[operatorLiterals.indexOf(e.key)]);
        }
    }

})

//main container variable
const container = document.getElementById('container');



//---------------- TOP OF CONTAINER ----------------------------//

//display for equation as you input it and displays the result
const containerTop = document.createElement('div');
containerTop.classList.add('containerTop');


//elements for each part of the equation
const equationLeft = document.createElement('div');
const equationMid = document.createElement('div');
const equationRight = document.createElement('div');

//add css class to equation elements to equation div
equationLeft.classList.add('equation');
equationMid.classList.add('equation');
equationRight.classList.add('equation');

//append equation elements to display pane
containerTop.appendChild(equationLeft);
containerTop.appendChild(equationMid);
containerTop.appendChild(equationRight);

container.appendChild(containerTop);




//---------------- BOTTOM OF CONTAINER -----------------------//


//bottom of container
const containerBottom = document.createElement('div');
containerBottom.classList.add('containerBottom');

container.appendChild(containerBottom);




//-------------- LEFT OF BOTTOM -----------------------------//

//main container for number buttons
const numberPane = document.createElement('div');

numberBtns.forEach((button, index, array) => {
    button = document.createElement('button');
    button.classList.add('number');
    button.textContent = array[index];
    numberPane.appendChild(button);

    button.addEventListener('click', () => addToEquation(array[index]));
});

const periodBtn = document.createElement('button');
periodBtn.classList.add('periodBtn');
periodBtn.textContent = '.';
numberPane.appendChild(periodBtn);

periodBtn.addEventListener('click', () => {
    if(equationLeft.textContent != '') {
        if(!equationLeft.textContent.includes('.')) {
            equationLeft.textContent += periodBtn.textContent;
        }
    }

    if(equationRight.textContent != '') {
        if(!equationRight.textContent.includes('.')) {
            equationRight.textContent += periodBtn.textContent;
        }
    }
});


containerBottom.appendChild(numberPane);




//------------------- MIDDLE OF BOTTOM ------------------------//



const operatorPane = document.createElement('div');



operatorLiterals.forEach((button,index) => {
    button = document.createElement('button');
    button.classList.add('operators');
    button.textContent = operatorSymbols[index];
    operatorPane.appendChild(button)

    button.addEventListener('click', () => addOperatorToEquation(button.textContent));
});

containerBottom.appendChild(operatorPane);




//--------------- RIGHT OF BOTTOM ------------------------//

const miscPane = document.createElement('div');


//equals button
const equalBtn = document.createElement('button');
equalBtn.textContent = String.fromCharCode(0x003D);
equalBtn.classList.add('otherBtns')
miscPane.appendChild(equalBtn);

equalBtn.addEventListener('click', () => evaluateEquation());


//clear button
const clrBtn = document.createElement('button');
clrBtn.textContent = "C";
clrBtn.classList.add('otherBtns');
miscPane.appendChild(clrBtn)

clrBtn.addEventListener('click', () => {
    equationLeft.textContent = '';
    equationMid.textContent= '';
    equationRight.textContent = '';
});


//backspace button
const backBtn = document.createElement('button');
backBtn.textContent = String.fromCharCode(0x2190);
backBtn.classList.add('otherBtns','backspaceBtn');
miscPane.appendChild(backBtn)

backBtn.addEventListener('click', () => removeFromEquation());




containerBottom.appendChild(miscPane);

