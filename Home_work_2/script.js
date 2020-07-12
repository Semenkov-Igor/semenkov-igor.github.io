const action = prompt('Choose your action (add, sub, mult, div)', '');
const firstNumber = +prompt('Enter the first number (Введите первое число)', '');
const secondNumber = +prompt('Enter the second number (Введите второе число)', '');

switch (action) {
    case 'add':
        sum(firstNumber, secondNumber);
        function sum(x, y) {
            const result = x + y;
            console.log(`${x} + ${y} = ${result}`);
            return result;
        } break;

    case 'sub':
        sub(firstNumber, secondNumber);
        function sub(x, y) {
            const result = x - y;
            console.log(`${x} - ${y} = ${result}`);
            return result;
        } break;
    case 'mult':
        mult(firstNumber, secondNumber);
        function mult(x, y) {
            const result = x * y;
            console.log(`${x} * ${y} = ${result}`);
            return result;
        } break;
    case 'div':
        div(firstNumber, secondNumber);
        function div(x, y) {
            const result = x / y;
            console.log(`${x} / ${y} = ${result}`);
            return result;
        } break;
    default: alert('Please check your choice of action');
}
