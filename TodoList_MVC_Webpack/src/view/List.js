import $ from 'jquery';
export default class List {
    constructor(config) {
        this.config = config;
        this.$el = $('<div id="toDoList" class="container"></div>');
        this.renderModel = this.renderModel.bind(this);
        this.$el.on('click', '.remove', this.onDelBtnClick.bind(this));
        this.$el.on('click', '.task', this.onTaskToggleClick.bind(this));
        this.$btn = $('#addBtn');
        this.$btn.click(this.onAddBtnClick.bind(this));
        this.$userInput = $('#userInput');
    }

    render(list) {
        this.$el.empty();
        list.forEach(this.renderModel);
    }

    renderModel(model) {
        this.$el.append(`<div class="task ${model.isDone ? 'done' : ''}" data-id="${model.id}">${model.title}<button class="remove">x</button></div>`)
    }

    onDelBtnClick(event) {
        event.stopPropagation();
        const id = $(event.target).closest('.task').data('id');
        this.config.onDelete(id);
    }

    onTaskToggleClick(event) {
        const id = $(event.target).closest('.task').data('id');
        this.config.onToggle(id);
    }

    onAddBtnClick() {
        const task = {
            title: this.$userInput.val(),
            isDone: false
        };
        this.$userInput.val('');
        this.config.createTask(task);
    }
}