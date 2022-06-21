const numberBtns = new Array(10);
const operatorBtns = new Array(4);

const equationLeft = document.createElement('div');
const equationMid = document.createElement('div');
const equationRight = document.createElement('div');

const display = document.createElement('div');
display.classList.add('display');

equationLeft.classList.add('equation');
equationMid.classList.add('equation');
equationRight.classList.add('equation');



display.appendChild(equationLeft);
display.appendChild(equationMid);
display.appendChild(equationRight);


const operatorSymbols = [String.fromCharCode(0x002B), String.fromCharCode(0x2212), String.fromCharCode(0x00D7), String.fromCharCode(0x00F7)];

const container = document.getElementById('container');

const numberPane = document.createElement('div');
const operatorPane = document.createElement('div');

const equalBtn = document.createElement('button');
equalBtn.textContent = '=';
equalBtn.classList.add('operators')
operatorPane.appendChild(equalBtn)




for(let i =0; i < 4; i++) {
    operatorBtns[i] = document.createElement('button');
    operatorBtns[i].classList.add('operators');
    operatorBtns[i].textContent = operatorSymbols[i];
    operatorPane.appendChild(operatorBtns[i]);
}

for(let i =0; i < numberBtns.length; i++) {
    numberBtns[i] = document.createElement('button');
    numberBtns[i].classList.add('number');
    numberBtns[i].textContent = `${i}`;
    numberPane.appendChild(numberBtns[i]);
}

numberBtns.forEach((button, index) => {
    button.addEventListener('click', () => {
        if(equationMid.textContent == ''){
            equationLeft.textContent += `${index}`;
        } else {
            equationRight.textContent += `${index}`;
        }
    });
});

operatorBtns.forEach((button) => {
    button.addEventListener('click', () =>{
        equationMid.textContent = `${button.textContent}`;
    });
});

equalBtn.addEventListener('click', () => {

    equationLeft.textContent = operate(Number(equationLeft.textContent), operatorSymbols.indexOf(equationMid.textContent), Number(equationRight.textContent));
    equationMid.textContent = '';
    equationRight.textContent = '';

});




container.appendChild(display);
container.appendChild(numberPane);
container.appendChild(operatorPane);



//functions for each operator
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => a/b;

//array that stores references to operator functions (coincides with array of operator symbol for easy matching)
const op = [add, subtract, multiply, divide];



//get value of equation entered
const operate = (a,symbol,b) => op[symbol](a,b);


