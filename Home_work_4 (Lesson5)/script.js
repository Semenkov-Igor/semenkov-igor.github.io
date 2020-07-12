const action = getAction();
const operandsCount = getOperandsCount();
const userNumbers = getUserNumbers();

calculate();

function getAction() {
    let userInput;

    do {
        userInput = prompt('Choose your action:\n +\n -\n *\n /\n', '');
    } while (checkAction(userInput));

    return userInput;
}

function checkAction(userInput) {
    return (
        userInput != '+' &&
        userInput != '-' &&
        userInput != '*' &&
        userInput != '/'
    );
}

function getOperandsCount() {
    return 0;
}

function getUserNumbers() {
    return [];
}

function calculate() {
    console.log('calculated');
}