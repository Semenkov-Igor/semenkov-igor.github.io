const person = { 
    name: 'Alex', 
    surname: 'Smith', 
    phone: '+380 00 000 00 00' 
};
const helloTemplate  = createTemplate('Hello, {{name}}!');

// helloTemplate(person); // возвращает Hello, Alex!

const detailsTemplate = createTemplate('{{name}} {{surname}}, phone {{phone}}');

// detailsTemplate(person); // возвращает Alex Smith, phone +380 00 000 00 00

// Object.keys();

function createTemplate() {
    function qew(person) {
        // let qwe = Object.values(person);
        console.log(Object.values(person));
    }
}
