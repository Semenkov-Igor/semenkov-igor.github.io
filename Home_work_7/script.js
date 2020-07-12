const addButton = document.querySelector('#addBtn');
const toDoList = document.querySelector('#toDoList');
const userInput = document.querySelector('#userInput');

function onAddBtnClick() {  
    const li = document.createElement('li');
    li.textContent = userInput.value;
    toDoList.append(li);
    userInput.value = '';
}

addButton.addEventListener('click', onAddBtnClick);