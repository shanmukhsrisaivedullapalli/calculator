const inputBox = document.getElementById('inputbox');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.allclear');
const equalButton = document.querySelector('.submit');

const numbers = '0123456789';
const operators = '+−×÷%';

clearButton.addEventListener('click', () => inputBox.textContent = '0');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const last = inputBox.textContent.at(-1);
        const value = button.value;

        if (inputBox.textContent === '0' && value !== '.') {
            inputBox.textContent = value;
        } else if (inputBox.textContent === '0' && value === '.') {
            inputBox.textContent = '0.';
        } else if (value === '.' && last === '.') {
            alert("Invalid input: multiple decimals.");
        } else if (last === ')') {
            alert("Invalid input: number after ')'");
        } else {
            inputBox.textContent += value;
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const last = inputBox.textContent.at(-1);
        const value = button.value;

        if (inputBox.textContent === '0' && value !== '(') {
            alert("Invalid input: cannot start with operator.");
            return;
        }

        if (operators.includes(last) && value !== '(') {
            alert("Invalid input: consecutive operators.");
            return;
        }

        if (last === '.' || last === '(' && value !== '(') {
            alert("Invalid input: bad operator position.");
            return;
        }

        if (numbers.includes(last) && value === '(') {
            inputBox.textContent += '×(';
        } else {
            inputBox.textContent += value;
        }
    });
});

equalButton.addEventListener('click', calculate);

function calculate() {
    let expr = inputBox.textContent;

    expr = expr.replace(/×/g, '*')
               .replace(/÷/g, '/')
               .replace(/−/g, '-');

    if (!/^[0-9+\-*/().% ]+$/.test(expr)) {
        alert("Invalid expression.");
        return;
    }

    try {
        expr = expr.replace(/(\d+)%/g, '($1/100)');

        const result = Function('"use strict"; return (' + expr + ')')();

        if (result === Infinity || isNaN(result)) {
            inputBox.textContent = 'Error';
        } else {
            inputBox.textContent = result.toString();
        }
    } catch (err) {
        inputBox.textContent = 'Error';
    }
}