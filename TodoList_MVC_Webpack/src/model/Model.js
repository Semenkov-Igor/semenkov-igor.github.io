export default class Model {
    constructor(url) {
        this._baseUrl = url;
    }

    setData(data) {
        Object.assign(this, data)
    }

    delete() {
        return fetch(this._baseUrl + '/' + this.id, {
            method: 'DELETE',
        });
    }

    toggle(model) {
        return fetch(`${this._baseUrl}/${model.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(model),
        });
    }
}