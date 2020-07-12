
function Accordion(accordion) {
    this.init();
    this.accordion = accordion;
};

Accordion.prototype.init = function () {    
    this.accordionList = accordion.children;
    
    for (i = 0; i < this.accordionList.length; i++) {
        this.accordionList[i].classList.add('accordionBody');
    };  

    accordion.addEventListener('click', this.toggleClass.bind(this));
};

Accordion.prototype.toggleClass = function (event) {
    const itemClass = event.target.parentNode.className;
    this.accordionItem = document.getElementsByClassName('accordionBody');

    for (i = 0; i < this.accordionItem.length; i++) {
        this.accordionItem[i].classList.remove('open');
    };

    if (itemClass == 'accordionBody') {
        event.target.parentNode.classList.add('open');
    };
};
