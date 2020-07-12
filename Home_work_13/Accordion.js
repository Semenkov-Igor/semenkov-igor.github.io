
function Tabset(el) {
    this.tabset = el;
    this.generateNewHtml();
    this.init();
};

Tabset.prototype.generateNewHtml = function () {
    this.tabset.titles = document.querySelectorAll('.title');
    this.tabset.bodys = document.querySelectorAll('.body');

    while (this.tabset.firstChild) {
        this.tabset.removeChild(this.tabset.firstChild);
    };

    for (i = 0; i < this.tabset.titles.length; i++) {
        this.tabset.append(this.tabset.titles[i]);
    };

    for (i = 0; i < this.tabset.bodys.length; i++) {
        this.tabset.append(this.tabset.bodys[i]);
    };


};

Tabset.prototype.init = function () {
    this.initClasses();
    // this.addEventListener();
};


Tabset.prototype.initClasses = function () {
    this.tabset.firstChild.classList.add('choose');
    this.tabset.titles = document.querySelectorAll('.title');
    this.tabset.bodys = document.querySelectorAll('.body');

    for (i = 1; i < this.tabset.bodys.length; i++) {
        this.tabset.bodys[i].classList.remove('visible');
        this.tabset.bodys[i].classList.add('hide');
        this.tabset.titles[i].classList.remove('choose');
    };

    this.tabset.addEventListener('click', this.toggleElement.bind(this));

    console.log(this.tabset.titles);
};

Tabset.prototype.toggleElement = function (el) {
    console.log('Hi, Igor!');
    console.log(el.target);

    if (el.target.classList.contains('title')) {
        for (i = 0; i < this.tabset.titles.length; i++) {
            if (el.target == this.tabset.titles[i]) {
                this.showBody(i);
                break;
            }
        }
        // this.closeElement(el);
        // this.openElement(el);
        console.log(i);
    }
};

Tabset.prototype.showBody = function (el) {
    this.closeElement();
    this.tabset.titles[el].classList.add('choose');
    this.tabset.bodys[el].classList.remove('hide');
    this.tabset.bodys[el].classList.add('visible');
    console.log('el');
};

Tabset.prototype.closeElement = function() {
    for (i = 0; i < this.tabset.bodys.length; i++) {
        this.tabset.bodys[i].classList.remove('visible');
        this.tabset.bodys[i].classList.add('hide');
        this.tabset.titles[i].classList.remove('choose');
    };
}

    // const asd = accordion.titles;
    // const titles = document.getElementsByClassName('title');
    // const zxc = titles.cloneNode(true);
    // console.log(zxc);
    // const lis = accordion.map(
    //     (photo, index) =>
    //         `<li class="gallery-photo"><img src="${photo}?${index}" /></li>`
    // );

    // this.rootElement = document.createElement('ul');
    // this.rootElement.insertAdjacentHTML('beforeEnd', `${lis.join('')}`);

    // this.containerEl.append(this.rootElement);

    // this.rootElement.addEventListener(
    //     'click',
    //     this.onRootElementClick.bind(this)
    // );


// Accordion.prototype.toggleClass = function (element) {
//     const itemClass = element.target.parentNode.className;
//     this.accordionItem = document.getElementsByClassName('accordionBody');

//     for (i = 0; i < this.accordionItem.length; i++) {
//         this.accordionItem[i].classList = 'accordionBody close';
//     };

//     if (itemClass == 'accordionBody close') {
//         element.target.parentNode.classList = 'accordionBody open';
//     };
// };
