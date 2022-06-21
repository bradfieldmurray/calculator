const buttons = new Array(10);
const container = document.getElementById('container');
const numberPane = document.createElement('div');
const operaterPane = document.createElement('div');

for(let i =0; i <= 9; i++) {
    buttons[i] = document.createElement('button');
    buttons[i].classList.add('number');
    buttons[i].textContent = `${i}`;
    numberPane.appendChild(buttons[i]);
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(button.textContent)
        display.textContent = button.textContent;
    });
});



const display = document.createElement('div');
display.classList.add('display');

container.appendChild(display);
container.appendChild(numberPane);

const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => a/b;


function operate(a,b) {

}
