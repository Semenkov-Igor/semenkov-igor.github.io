fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        const toDoList = document.getElementById('toDoList');
        const liTemplate = document.getElementById('liTemplate').innerHTML;
        const DONE_CLASS = 'done';
        
        generateHtml();

        function generateHtml() {
            for (let i = 0; i < data.length; i++) {
                toDoList.innerHTML += liTemplate.replace('{{text}}', data[i].title);
                if (data[i].completed !== false) {
                    toDoList.children[i].classList.add(DONE_CLASS);
                }
            }
            toDoList.addEventListener('click', onToDoListClick);
        };

        function onToDoListClick(el) {
            toggleClass(el);
            deleteItem(el);
        };

        function toggleClass(e) {
            e.target.classList.toggle(DONE_CLASS);
        };

        function deleteItem(e) {
            if (e.target.className != 'remove done') return;
            let toDo = e.target.closest('.toDo');
            toDo.remove();
        }
    });