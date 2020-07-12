
class Tabset {
    static SELECTED_CLASS = 'selected';
    static VISIBLE_CLASS = 'visible';
    static HIDED_CLASS = 'hided';
    static TABSET_CLASS = 'tabset'


    constructor(el) {
        this.tabset = el;
        this.generateNewHtml();
        this.initClasses();
    };

    generateNewHtml() {
        this.tabset.titles = document.querySelectorAll('.title');
        this.tabset.bodys = document.querySelectorAll('.body');

        // while (this.tabset.firstChild) {
        //     this.tabset.removeChild(this.tabset.firstChild);
        // };

        for (let i = 0; i < this.tabset.titles.length; i++) {
            this.tabset.append(this.tabset.titles[i]);
        };

        for (let i = 0; i < this.tabset.bodys.length; i++) {
            this.tabset.append(this.tabset.bodys[i]);
        };
    };

    initClasses() {
        this.tabset.firstChild.classList.add(Tabset.SELECTED_CLASS);
        this.tabset.titles = document.querySelectorAll('.title');
        this.tabset.bodys = document.querySelectorAll('.body');

        for (let i = 1; i < this.tabset.bodys.length; i++) {
            this.tabset.bodys[i].classList.remove(Tabset.VISIBLE_CLASS);
            this.tabset.bodys[i].classList.add(Tabset.HIDED_CLASS);
            this.tabset.titles[i].classList.remove(Tabset.SELECTED_CLASS);
        };

        for (let i = 0; i < this.tabset.children.length; i++) {
            this.tabset.children[i].classList.add(Tabset.TABSET_CLASS);
        };

        this.tabset.addEventListener('click', this.toggleElements.bind(this));
    };

    toggleElements(el) {
        if (el.target.classList.contains('title')) {
            for (let i = 0; i < this.tabset.titles.length; i++) {
                if (el.target == this.tabset.titles[i]) {
                    this.showElements(i);
                    break;
                }
            }
        }
    };

    showElements(el) {
        this.closeElements();
        this.tabset.titles[el].classList.add(Tabset.SELECTED_CLASS);
        this.tabset.bodys[el].classList.remove(Tabset.HIDED_CLASS);
        this.tabset.bodys[el].classList.add(Tabset.VISIBLE_CLASS);
    };

    closeElements() {
        for (let i = 0; i < this.tabset.bodys.length; i++) {
            this.tabset.bodys[i].classList.remove(Tabset.VISIBLE_CLASS);
            this.tabset.bodys[i].classList.add(Tabset.HIDED_CLASS);
            this.tabset.titles[i].classList.remove(Tabset.SELECTED_CLASS);
        };
    };
};
