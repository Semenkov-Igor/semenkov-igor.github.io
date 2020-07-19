const TODOS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/todos';
const api = {
    getList: () => {
        return fetch(TODOS_URL)
            .then((res) => res.json())
    },
    create: (task) => {
        return fetch(TODOS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then((res) => res.json())
    },
    get: (taskId) => {
        return fetch(TODOS_URL + '/' + taskId)
            .then((res) => res.json())
            .then((data) => (task = data))
    },
    update: (task) => {
        return fetch(TODOS_URL + '/' + task.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then((res) => res.json())
    },
    delete: (taskId) => {
        return fetch(TODOS_URL + '/' + taskId, {
            method: 'DELETE',
        })
            .then((res) => res.json())
    }
};