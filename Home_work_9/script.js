const addButton = document.getElementById('addBtn');
const toDoList = document.getElementById('toDoList');
const userInput = document.getElementById('userInput');
const liTemplate = document.getElementById('liTemplate').innerHTML;

addButton.addEventListener('click', onAddBtnClick);
toDoList.addEventListener('click', onToDoListClick);

function onAddBtnClick() {
    toDoList.innerHTML += liTemplate.replace('{{text}}', userInput.value);
    userInput.value = '';
}

function onToDoListClick(e) {
    e.target.classList.toggle('done');

    if (e.target.className != 'remove done') return;
    let toDo = e.target.closest('.toDo');    
    toDo.remove();
}
