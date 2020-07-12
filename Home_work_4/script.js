const userAction = getUserAction();
const operandsCount = getOperandsCount();
const userNumbers = getUserNumbers(operandsCount);


calculate(userAction, userNumbers);

function getUserAction() {
    let userAction;

    do {
        userAction = prompt('Choose your action:\n +\n -\n *\n /\n', '');
    } while (userAction != '+' && userAction != '-' && userAction != '*' && userAction != '/');

    return userAction;
}

function getOperandsCount() {
    let quantityOperands;

    do {
        quantityOperands = +prompt('How many numbers do you want to use? (min 2)', '');
    } while (!(Number.isInteger(quantityOperands) && quantityOperands > 1));

    return quantityOperands;
}

function getUserNumbers(count) {
    let nums = [];

    for (let i = 0; i < count; i = i + 1) {
        nums.push(getUserNumber());
    }
    
    return nums;
}

function getUserNumber() {
    let userNumber;

    do {
        userNumber = +prompt('Please, enter the numbers', '');
    } while (!(Number.isInteger(userNumber)));

    return userNumber;
}

function calculate(operation, operands) {
    switch (operation) {
        case '+':
            sum(operands);
            break;
        case '-':
            sub(operands);
            break;
        case '*':
            mult(operands);
            break;
        case '/':
            div(operands);
            break;
    }
}

function sum(operands) {
    let result = operands[0];
    let expression = operands[0];

    for (let i = 1; i < operands.length; i++) {
        result = +result + +operands[i];
        expression = expression + ' + ' + operands[i];
    }

    console.log(expression + ' = ' + result);
}

function sub(operands) {
    let result = operands[0];
    let expression = operands[0];

    for (let i = 1; i < operands.length; i++) {
        result = result - operands[i];
        expression = expression + ' - ' + operands[i];
    }

    console.log(expression + ' = ' + result);
}

function mult(operands) {
    let result = operands[0];
    let expression = operands[0];

    for (let i = 1; i < operands.length; i++) {
        result = result * operands[i];
        expression = expression + ' * ' + operands[i];
    }

    console.log(expression + ' = ' + result);
}

function div(operands) {
    let result = operands[0];
    let expression = operands[0];

    for (let i = 1; i < operands.length; i++) {
        result = result / operands[i];
        expression = expression + ' / ' + operands[i];
    }

    console.log(expression + ' = ' + result);
}
