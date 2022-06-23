const numberBtns = [0,1,2,3,4,5,6,7,8,9];
const operatorBtns = new Array(4);

const operatorSymbols = [String.fromCharCode(0x002B), String.fromCharCode(0x2212), String.fromCharCode(0x00D7), String.fromCharCode(0x00F7)];



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

    button.addEventListener('click', () => {
        if(equationMid.textContent == ''){
            equationLeft.textContent += button.textContent;
        } else {
            equationRight.textContent += button.textContent;
        }
    });
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



for(let i =0; i < 4; i++) {
    operatorBtns[i] = document.createElement('button');
    operatorBtns[i].classList.add('operators');
    operatorBtns[i].textContent = operatorSymbols[i];
    operatorPane.appendChild(operatorBtns[i]);
}


operatorBtns.forEach((button) => {
    button.addEventListener('click', () =>{
        if(equationLeft.textContent != '') {
            equationMid.textContent = `${button.textContent}`;
       }
    });
});

containerBottom.appendChild(operatorPane);




//--------------- RIGHT OF BOTTOM ------------------------//

const miscPane = document.createElement('div');


//equals button
const equalBtn = document.createElement('button');
equalBtn.textContent = String.fromCharCode(0x003D);
equalBtn.classList.add('otherBtns')
miscPane.appendChild(equalBtn);

equalBtn.addEventListener('click', () => {
    if(equationLeft.textContent != '' && equationMid != '' && equationRight.textContent != ''){
        equationLeft.textContent = operate(Number(equationLeft.textContent), operatorSymbols.indexOf(equationMid.textContent), Number(equationRight.textContent));
        equationMid.textContent = '';
        equationRight.textContent = '';
    }
});


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

backBtn.addEventListener('click', () => {
    if(equationRight.textContent != '') {
        equationRight.textContent = removeOne(equationRight.textContent);
    } else if(equationMid.textContent != '') {
        equationMid.textContent = removeOne(equationMid.textContent);
    } else {
        equationLeft.textContent = removeOne(equationLeft.textContent);
    }

});

function removeOne(string) {
    return Array.from(string)
    .slice(0,string.length-1)
    .join('');
}



containerBottom.appendChild(miscPane);





//functions for each operator
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => (b==0) ? alert("Nice try") : (a/b).toFixed(2);

//array that stores references to operator functions (coincides with array of operator symbol for easy matching)
const op = [add, subtract, multiply, divide];



//get value of equation entered
const operate = (a,symbol,b) => op[symbol](a,b);