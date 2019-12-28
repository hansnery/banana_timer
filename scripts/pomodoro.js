const add = function(number1, number2) {
    return number1 + number2;
}
const subtract = function(number1, number2) {
    return number1 - number2;
}
const multiply = function(number1, number2) {
    return number1 * number2;
}
const divide = function(number1, number2) {
    return number1 / number2;
}
const operate = function(number1, number2, functionName) {
    return functionName(number1, number2);
}

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
const numbers = document.querySelectorAll('.number');
const buttonsArray = Array.from(buttons);
const dot = document.getElementById('dot');
let displayedNumbersArray = [];
let tempArray = [];
let firstNumber = 0;
let secondNumber = 0;
let result = 0;
let operatorSelected = false;
let operation = 0;

function hitKey(e) {
    let button = e.target;
    let buttonValue = button.innerHTML;

    if (e.keyCode == '96') {
        buttonValue = '0';
    }   else if (e.keyCode == '97') {
        buttonValue = '1';
    }   else if (e.keyCode == '98') {
        buttonValue = '2';
    }   else if (e.keyCode == '99') {
        buttonValue = '3';
    }   else if (e.keyCode == '100') {
        buttonValue = '4';
    }   else if (e.keyCode == '101') {
        buttonValue = '5';
    }   else if (e.keyCode == '102') {
        buttonValue = '6';
    }   else if (e.keyCode == '103') {
        buttonValue = '7';
    }   else if (e.keyCode == '104') {
        buttonValue = '8';
    }   else if (e.keyCode == '105') {
        buttonValue = '9';
    }   else if (e.keyCode == '107') {
        buttonValue = '+';
    }   else if (e.keyCode == '109') {
        buttonValue = '-';
    }   else if (e.keyCode == '106') {
        buttonValue = '×';
    }   else if (e.keyCode == '111') {
        buttonValue = '÷';
    }   else if (e.keyCode == '110') {
        buttonValue = '.';
    }   else if (e.keyCode == '13') {
        buttonValue = '=';
    }   else if (e.keyCode == '27') {
        buttonValue = 'C';
    }   else if (e.keyCode == '46') {
        buttonValue = 'CE';
    }   else if (e.keyCode == '8') {
        buttonValue = '⌫';
    }   else if (e.keyCode == '120') {
        buttonValue = '±';
    }   else if (e.keyCode < 8 || e.keyCode > 8 && e.keyCode < 13 ||e.keyCode > 13 && e.keyCode < 27 
                || e.keyCode > 27 && e.keyCode < 46 || e.keyCode < 96 || e.keyCode > 96 && e.keyCode < 106 
                || e.keyCode > 106 && e.keyCode < 107 || e.keyCode > 107 && e.keyCode < 109 
                || e.keyCode > 109 && e.keyCode < 111 || e.keyCode > 111 && e.keyCode < 120
                || e.keyCode > 120) {
        return false;
    }

    function countDecimals(value) {
        if (Math.floor(value) !== value)
            return value.toString().split(".")[1].length || 0;
        return 0;
    }

    function countDigits(value) {
        return value.toString().length;
    }

    function resultIs() {
        switch (operation) {
            case 'isAdding':
                tempResult = operate(firstNumber, secondNumber, add); 
                break;
            case 'isSubtracting':
                tempResult = operate(firstNumber, secondNumber, subtract);
                break; 
            case 'isMultiplying':
                tempResult = operate(firstNumber, secondNumber, multiply);
                break;
            case 'isDividing':
                tempResult = operate(firstNumber, secondNumber, divide);
                break;
        }
        result = Number(tempResult);
        resultDecimals = countDecimals(result);
        if (resultDecimals > 12) {
            result = result.toFixed(10);
        }
        display.innerHTML = result;
        tempArray = [];
        secondNumber = 0;
        operatorSelected = false;
        tempArray.push(secondNumber);
        tempArray.push(result);
        tempNumber = tempArray.join('');
        firstNumber = tempNumber.replace(/[^0-9.]/g, "");
        firstNumber = Number(firstNumber);
        dot.classList.remove('blocked');
    }
    
    tempArray.push(buttonValue);

    displayLengthMax = 13;
    displayLength = countDigits(firstNumber) + countDigits(secondNumber);

    if (displayLength < displayLengthMax) {
        displayedNumbersArray.push(buttonValue);
        displayNumbers = displayedNumbersArray.join('');
        display.innerHTML = displayNumbers;
        if (operatorSelected === false && countDigits(firstNumber) < displayLengthMax) {
            tempNumber = tempArray.join('');
            firstNumber = tempNumber.replace(/[^0-9.]/g, "");
            firstNumber = Number(firstNumber);
        }   else if (operatorSelected === true && countDigits(secondNumber) < displayLengthMax) {      
            tempNumber = tempArray.join('');
            secondNumber = tempNumber.replace(/[^0-9.]/g, "");
            secondNumber = Number(secondNumber);
            dot.classList.remove('blocked');
        }    
    }

    if (!Number.isInteger(firstNumber) && !Number.isInteger(secondNumber)) {
        dot.classList.add('blocked');
    }

    if (buttonValue === '+') {
        if (firstNumber > 0 && secondNumber > 0) {
            resultIs();
            tempArray.push(result);
            displayedNumbersArray = [];
            displayedNumbersArray.push(result);
            displayedNumbersArray.push('+');
            displayNumbers = displayedNumbersArray.join('');
            display.innerHTML = displayNumbers;
        }
        if (operation !== 'isAdding') {
            displayedNumbersArray = [];
            displayedNumbersArray.push(firstNumber);
            displayedNumbersArray.push('+');
            displayNumbers = displayedNumbersArray.join('');
            display.innerHTML = displayNumbers;
        }
        operation = 'isAdding';
        operatorSelected = true;
        tempArray = [];
        tempNumber = 0;
    }
    if (buttonValue === '-') {
        if (firstNumber > 0 && secondNumber > 0) {
            resultIs();
            tempArray.push(result);
            displayedNumbersArray = [];
            displayedNumbersArray.push(result);
            displayedNumbersArray.push('-');
            displayNumbers = displayedNumbersArray.join('');
            display.innerHTML = displayNumbers;
        }
        if (operation !== 'isSubtracting') {
            displayedNumbersArray = [];
            displayedNumbersArray.push(firstNumber);
            displayedNumbersArray.push('-');
            displayNumbers = displayedNumbersArray.join('');
            display.innerHTML = displayNumbers;
        }
        operation = 'isSubtracting';
        operatorSelected = true;
        tempArray = [];
        tempNumber = 0;
    }
    if (buttonValue === '×') {
        if (firstNumber > 0 && secondNumber > 0) {
            resultIs();
            tempArray.push(result);
            displayedNumbersArray = [];
            displayedNumbersArray.push(result);
            displayedNumbersArray.push('×');
            displayNumbers = displayedNumbersArray.join('');
            display.innerHTML = displayNumbers;
        }
        if (operation !== 'isMultiplying') {
            displayedNumbersArray = [];
            displayedNumbersArray.push(firstNumber);
            displayedNumbersArray.push('×');
            displayNumbers = displayedNumbersArray.join('');
            display.innerHTML = displayNumbers;
        }
        operation = 'isMultiplying';
        operatorSelected = true;
        tempArray = [];
        tempNumber = 0;
    }
    if (buttonValue === '÷') {
        if (firstNumber > 0 && secondNumber > 0) {
            resultIs();
            tempArray.push(result);
            displayedNumbersArray = [];
            displayedNumbersArray.push(result);
            displayedNumbersArray.push('÷');
            displayNumbers = displayedNumbersArray.join('');
            display.innerHTML = displayNumbers;
        }
        if (operation !== 'isDividing') {
            displayedNumbersArray = [];
            displayedNumbersArray.push(firstNumber);
            displayedNumbersArray.push('÷');
            displayNumbers = displayedNumbersArray.join('');
            display.innerHTML = displayNumbers;
        }
        operation = 'isDividing';
        operatorSelected = true;
        tempArray = [];
        tempNumber = 0;
    }
    if (buttonValue === '=') {
        if (operation === 'isDividing' && secondNumber === 0) {
            alert('You can\'t divide a number by 0!');
            displayedNumbersArray.pop();
            displayNumbers = displayedNumbersArray.join('');
            display.innerHTML = displayNumbers;
        }   else {
            resultIs();
            displayedNumbersArray = [];
            displayedNumbersArray.push(result);
            displayNumbers = displayedNumbersArray.join('');
            display.innerHTML = displayNumbers;
        }
    }
    if (buttonValue === 'CE') {
        tempArray = [];
        displayNumbers = firstNumber;
        displayedNumbersArray = [displayNumbers];
        display.innerHTML = displayNumbers;
    }
    if (buttonValue === 'C') {
        tempArray = [];
        displayedNumbersArray = [];
        display.innerHTML = 0;
        firstNumber = 0;
        secondNumber = 0;
        result = 0;
        operatorSelected = false;
        dot.classList.remove('blocked');
    }
    if (buttonValue === '±') {
        displayedNumbersArray = [];
        if (firstNumber > 0 && secondNumber === 0) {
            tempNumber = tempArray.join('');
            firstNumber = tempNumber.replace(/[^0-9.]/g, "");
            firstNumber = Number(firstNumber);
            firstNumber = -firstNumber;
            displayedNumbersArray.push(firstNumber);
            operatorSelected = true;
        }   else if (secondNumber > 0) {
            tempNumber = tempArray.join('');
            secondNumber = tempNumber.replace(/[^0-9.]/g, "");
            secondNumber = Number(secondNumber);
            secondNumber = -secondNumber;
            displayedNumbersArray.push(firstNumber);
            displayedNumbersArray.push(secondNumber);
            operatorSelected = true;
        }
        displayNumbers = displayedNumbersArray.join('');
        display.innerHTML = displayNumbers;
        operation = 'isSubtracting';
    }
    if (buttonValue === '⌫') {
        displayedNumbersArray = displayNumbers.split('');
        if (displayedNumbersArray.includes('⌫')){
            displayedNumbersArray.pop();
        }
        displayedNumbersArray.pop();
        displayNumbers = displayedNumbersArray.join('');
        display.innerHTML = displayNumbers;
        if (displayedNumbersArray.includes('+')) {
            tempIndex = displayNumbers.indexOf('+');    
        }   else if (displayedNumbersArray.includes('-')) {
            tempIndex = displayNumbers.indexOf('-');    
        }   else if (displayedNumbersArray.includes('×')) {
            tempIndex = displayNumbers.indexOf('×');    
        }   else if (displayedNumbersArray.includes('÷')) {
            tempIndex = displayNumbers.indexOf('÷');    
        }   else {
            firstNumber = displayNumbers;
            firstNumber = Number(firstNumber);
            tempArray = [firstNumber];
        }
        if (displayedNumbersArray.includes('+') || displayedNumbersArray.includes('-') || displayedNumbersArray.includes('×') || displayedNumbersArray.includes('÷')) {
            tempArray = displayedNumbersArray.slice(tempIndex + 1, displayedNumbersArray.length);
            tempNumber = tempArray.join('');
            secondNumber = tempNumber;
            secondNumber = Number(secondNumber);
        }
    }
    if (buttonValue === '.') {
        dot.classList.add('blocked');
    }
}

buttonsArray.map((key) => {
    key.addEventListener('click', hitKey);
});

window.addEventListener('keydown', hitKey);