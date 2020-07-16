const $addButton = $('#addBtn');
const $userInput = $('#userInput');
const $toDoList = $('#toDoList');
const divTemplate = $('#divTemplate').html();
const TODOS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/todos';

$addButton.click(createTask);
$toDoList.on('click', '.' + 'task', toggleClass);
$toDoList.on('click', '.' + 'remove', deleteItem);

getData();

function getData() {
    fetch(TODOS_URL)
        .then((res) => res.json())
        .then(renderData);
}

function renderData(data) {
    $toDoList.html(data.map(generateHtml).join('\n'))
}

function generateHtml(task) {
    return divTemplate
        .replace('{{title}}', task.title)
        .replace('{{id}}', task.id)
        .replace('{{completed}}', task.isDone ? 'done' : '');
};

function createTask() {
    let task = {
        title: $userInput.val()
    };

    api.create(task)
        .then((data) => {
            getData();
            console.log(data);
        });

    $userInput.val('');
};

function toggleClass(e) {
    console.log(e);
    $(this).toggleClass('done');
    const $taskId = $(e.target).closest('.task').data('id');
    console.log($taskId);
    api.get($taskId)
        .then(updateStatus);
};

function updateStatus(task) {
    console.log(task);
    task.isDone = !task.isDone;

    api.update(task)
        .then((data) => console.log(data));
};

function deleteItem(e) {
    e.stopPropagation();
    console.log(e);
    const $element = $(e.target).closest('.task');
    const $taskId = $element.data('id');
    $element.remove();
    deleteTask($taskId);
};

function deleteTask(taskId) {
    console.log(taskId);
    api.delete(taskId)
        .then((data) => console.log(data));
};