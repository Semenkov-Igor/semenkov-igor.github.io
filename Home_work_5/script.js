const action = getUserAction();
const answer = getUserAnswer();
const numbers = parseNumber(answer);
const array = toDoArray(numbers);
const userNumbers = toDoNums(array);

calculate(action, userNumbers);

function getUserAction() {
    let userAction;
    
    do {
        userAction = prompt('Choose your action:\n +\n -\n *\n /\n', '');
    } while (userAction != '+' && userAction != '-' && userAction != '*' && userAction != '/');

    return userAction;
}

function getUserAnswer() {    
    return prompt('Enter numbers separated by spaces', '');
}

function parseNumber(answer) {    
    return answer.replace(/[^0-9\.]+/g);
}

function toDoArray(numbers) {
    return numbers.split('undefined');
}

function toDoNums(arrOfNums) {
    return arrOfNums.filter(arrOfNums => arrOfNums !=='0');
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
