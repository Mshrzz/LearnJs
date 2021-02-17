'use strict';

document.addEventListener('DOMContentLoaded', function(){

    function DomElement(selector, height, width, bg) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
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
        insertElem.style.cssText = `position: absolute;
                                    height: ${this.height};
                                    width: ${this.width};
                                    background: ${this.bg};`;
        document.body.append(insertElem);
    };

    DomElement.prototype.moveElement = function(event) {
        let currentElement = document.querySelector(this.selector);
        let currentElementStyles = getComputedStyle(currentElement);

        let left = parseFloat(currentElementStyles.left);
        let bottom = parseFloat(currentElementStyles.bottom);

        switch (event.key) {
            case 'ArrowUp':
                currentElement.style.bottom = bottom+10+'px';
                break;
            case 'ArrowDown':
                currentElement.style.bottom = bottom-10+'px';
                break;
            case 'ArrowRight':
                currentElement.style.left = left+10+'px';
                break;
            case 'ArrowLeft':
                currentElement.style.left = left-10+'px';
                break;
        }
    };
    
    const domElem1 = new DomElement('.js', '100px', '100px', 'red');
    
    domElem1.createElement();
    addEventListener('keydown', domElem1.moveElement.bind(domElem1));
    
});