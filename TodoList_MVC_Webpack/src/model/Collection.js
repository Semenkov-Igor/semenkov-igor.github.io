import Model from './Model'
export default class Collection {
    constructor(url) {
        this.url = url;
        this.list = [];
    }

    fetch() {
        return fetch(this.url)
            .then((resp) => resp.json())
            .then(this.setData.bind(this));
    }

    setData(data) {
        return (this.list = data.map((item) => {
            const model = new Model(this.url);
            model.setData(item);
            return model;
        }));
    }

    delete(id) {
        const model = this.list.find((item) => item.id == id);
        return model.delete().then(() => {
            this.list = this.list.filter((item) => item !== model);
        });
    }

    toggle(id) {
        const model = this.list.find((item) => item.id == id);
        model.isDone = !model.isDone;
        return model.toggle(model);
    }

    create(task) {
        return fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then((res) => res.json())
            .then((data) => {
                const model = new Model(this.url);
    	        model.setData(data);
                this.list.push(model)                
	            })
    }
}