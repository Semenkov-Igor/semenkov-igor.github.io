const TODOS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/todos';
class Controller {
    constructor() {
        this.toDoList = new Collection(TODOS_URL);
        this.toDoList
            .fetch()
            .then(() => this.listView.render(this.toDoList.list));

        this.listView = new List({
            onDelete: this.onDelete.bind(this),
            onToggle: this.onToggle.bind(this),
            createTask: this.createTask.bind(this)
        });
        $(document.body).append(this.listView.$el);
    }

    onDelete(id) {
        this.toDoList.delete(id).then(() => {
            this.listView.render(this.toDoList.list)
        })
    }

    onToggle(id) {
        this.toDoList.toggle(id).then(() => {
            this.listView.render(this.toDoList.list)
        })
    }

    createTask(task) {
        this.toDoList.create(task).then(() => {
                this.listView.render(this.toDoList.list)
            })
    }
}