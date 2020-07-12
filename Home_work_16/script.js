const addButton = document.getElementById('addBtn');
const userInput = document.getElementById('userInput');
const toDoList = document.getElementById('toDoList');
const liTemplate = document.getElementById('liTemplate').innerHTML;
const DONE_CLASS = 'done';
// const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const TODOS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/todos';

addButton.addEventListener('click', onAddBtnClick);
toDoList.addEventListener('click', onToDoListClick);

getData();

function getData() {
    fetch(TODOS_URL)
        .then((res) => res.json())
        .then(renderData);
}

function renderData(data) {
    data.forEach(generateHtml);
}

function generateHtml(task) {
    toDoList.innerHTML += liTemplate
        .replace('{{title}}', task.title)
        .replace('{{id}}', task.id)
        .replace('{{completed}}', task.completed ? DONE_CLASS : '');
};

function onAddBtnClick() {
    let task = {
        title: userInput.value,
        completed: false,
    };

    fetch(TODOS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then((res) => res.json())
        .then((data) => {
            generateHtml(data);
            console.log(data);
        });

    userInput.value = '';
}

function onToDoListClick(event) {
    switch (true) {
        case event.target.classList.contains('task'):
            toggleClass(event.target);
            break;
        case event.target.classList.contains('remove'):
            deleteItem(event.target.parentElement);
            break;
    }
};

function toggleClass(el) {
    if (el.classList.contains('remove')) return;
    el.classList.toggle(DONE_CLASS);
    const taskId = el.dataset.taskId;
    let task;
    fetch(TODOS_URL + '/' + taskId)
        .then((res) => res.json())
        .then((data) => (task = data))
        .then(updateStatus);
};

function updateStatus(task) {
    console.log(task);
    task.completed = !task.completed;

    fetch(TODOS_URL + '/' + task.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
};

function deleteItem(el) {
    const taskId = el.dataset.taskId;
    el.remove();
    deleteTask(taskId);
};

function deleteTask(taskId) {
    console.log(taskId);
    fetch(TODOS_URL + '/' + taskId, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
};