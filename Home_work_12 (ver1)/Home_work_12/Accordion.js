
function Accordion() {    
    this.init();        
};

Accordion.prototype.init = function () {
    this.accordion = document.getElementById('list');
    this.accordionList = this.accordion.children;    
    this.titles = document.getElementsByClassName('title');

    for (i = 0; i < this.accordionList.length; i++) {
        this.accordionList[i].className = 'accordionBody close';
    };
    for (i = 0; i < this.titles.length; i++) {
        this.titles[i].addEventListener('click', this.toggleClass.bind(this));        
    };
};

Accordion.prototype.toggleClass = function (element) {
    this.itemClass = element.target.parentNode.className;
    this.accordionItem = document.getElementsByClassName('accordionBody');
    
    for (i = 0; i < this.accordionItem.length; i++) {
        this.accordionItem[i].className = 'accordionBody close';
    };
    if (this.itemClass == 'accordionBody close') {
        element.target.parentNode.className = 'accordionBody open';
    };       
};
