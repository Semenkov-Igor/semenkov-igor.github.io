$(() => {
    const $addButton = $('#addBtn');
    const $userInput = $('#userInput');
    const $toDoList = $('#toDoList');
    const divTemplate = $('#divTemplate').html();

    $addButton.click(createTask);
    $toDoList.on('click', '.' + 'task', toggleClass);
    $toDoList.on('click', '.' + 'remove', deleteItem);

    getData();

    function getData() {
        api.getList()
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
        const task = {
            title: $userInput.val()
        };
        api.create(task)
            .then(getData);
        $userInput.val('');
    };

    function toggleClass(e) {
        $(this).toggleClass('done');
        const $taskId = $(e.target).closest('.task').data('id');
        api.get($taskId)
            .then(updateStatus);
    };

    function updateStatus(task) {
        task.isDone = !task.isDone;

        api.update(task)
    };

    function deleteItem(e) {
        e.stopPropagation();
        const $element = $(e.target).closest('.task');
        const $taskId = $element.data('id');
        $element.remove();
        deleteTask($taskId);
    };

    function deleteTask(taskId) {
        api.delete(taskId)
    };
});