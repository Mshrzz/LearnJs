'use strict';

function DomElement(selector, height, width, bg, fontSize, text) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;
}

DomElement.prototype.createElement = function() {

    let insertElem;

    switch (this.selector[0]) {
        case '.':
            insertElem = document.createElement('div');
            break;
        case '#':
            insertElem = document.createElement('p');
            break;
        defalut:
            alert('Ошибка! Селектор введен некорректно.');
    }

    insertElem.classList.add(this.selector.slice(1, this.selector.length));
    insertElem.style.cssText = `height: ${this.height};
                                width: ${this.width};
                                background: ${this.bg};
                                font-size: ${this.fontSize};`;
    insertElem.textContent = this.text;
    document.body.append(insertElem);
};

const domElem1 = new DomElement('.js', '200px', '200px', 'red', '15px', 'Hello, OOP');
const domElem2 = new DomElement('#OOP-javascript', '500px', '300px', 'green', '20px', 'Second child');

domElem1.createElement();
domElem2.createElement();