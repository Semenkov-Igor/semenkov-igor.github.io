const action = prompt('Choose your action (add, sub, mult, div)', '');
const firstNumber = +prompt('Enter the first number (Введите первое число)', '');
const secondNumber = +prompt('Enter the second number (Введите второе число)', '');

switch (action) {
    case 'add':
        add(firstNumber, secondNumber);
        break;
    case 'sub':
        sub(firstNumber, secondNumber);
        break;
    case 'mult':
        mult(firstNumber, secondNumber);
        break;
    case 'div':
        div(firstNumber, secondNumber);
        break;
    default: alert('Please check your choice of action');
}

function add(x, y) {
    const result = x + y;
    console.log(`${x} + ${y} = ${result}`);
    return result;
}

function sub(x, y) {
    const result = x - y;
    console.log(`${x} - ${y} = ${result}`);
    return result;
}

function mult(x, y) {
    const result = x * y;
    console.log(`${x} * ${y} = ${result}`);
    return result;
}

function div(x, y) {
    const result = x / y;
    console.log(`${x} / ${y} = ${result}`);
    return result;
} 