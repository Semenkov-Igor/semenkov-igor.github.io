const TODOS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/todos';

import $ from 'jquery';
import Collection from '../model/Collection';
import List from '../view/List';

export default class Controller {
    constructor() {
        this.toDoList = new Collection(TODOS_URL);
        this.toDoList
            .fetch()
            .then(() => this.renderData());

        this.listView = new List({
            onDelete: this.onDelete.bind(this),
            onToggle: this.onToggle.bind(this),
            createTask: this.createTask.bind(this)
        });
        $(document.body).append(this.listView.$el);
    }

    onDelete(id) {
        this.toDoList.delete(id).then(() => this.renderData());
    }

    onToggle(id) {
        this.toDoList.toggle(id).then(() => this.renderData());
    }

    createTask(task) {
        this.toDoList.create(task).then(() => this.renderData());
    }

    renderData(){
        this.listView.render(this.toDoList.list);
    }
}