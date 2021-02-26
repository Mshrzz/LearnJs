'use strict';

class Todo {
    constructor(form, input, todoContainer, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
        this.animateCounter = 0;
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
            <button class="todo-edit"></button>
        </div>
        `);
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if  (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = '';
            this.render();
        } else {
            this.input.placeholder = 'Вы ввели некорректные данные!';
            this.input.value = '';
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(elem) {
        // Удаление элементов
        this.todoData.delete(elem.key);
        this.render();
    }

    completedItem(elem) {
        // Перенос в строку выполненных
        this.todoData.get(elem.key).completed = !this.todoData.get(elem.key).completed;
        this.render();
    }

    handler() {
        // Использовать делегирование
        this.todoContainer.addEventListener('click', (e) => {

            const target = e.target;

            if (target.matches('.todo-complete')) {

                this.animateCounter = 0.05;

                let animateRelocateElem = () => {

                    const element = target.parentNode.parentNode;

                    if (element.style.opacity === '') {
                        element.style.opacity = '1';
                    }

                    element.style.opacity = `${+element.style.opacity - this.animateCounter}`;

                    if (+element.style.opacity > 0) {
                        requestAnimationFrame(animateRelocateElem);
                    } else {
                        this.completedItem(target.parentNode.parentNode);
                        cancelAnimationFrame(relocateId);
                    }
                };

                let relocateId = requestAnimationFrame(animateRelocateElem);

            } else if (target.matches('.todo-remove')) {

                this.animateCounter = 0.07;

                let animateHideElem = () => {

                    const element = target.parentNode.parentNode;

                    if (element.style.opacity === '') {
                        element.style.opacity = '1';
                    }

                    element.style.opacity = `${+element.style.opacity - this.animateCounter}`;

                    if (+element.style.opacity > 0) {
                        requestAnimationFrame(animateHideElem);
                    } else {
                        this.deleteItem(target.parentNode.parentNode);
                        cancelAnimationFrame(hideId);
                    }
                };

                let hideId = requestAnimationFrame(animateHideElem);

            } else if (target.matches('.todo-edit')) {
                target.parentNode.parentNode.contentEditable = true;
                target.parentNode.parentNode.addEventListener('blur', () => {
                    const valueElem = target.parentNode.parentNode.textContent.trim();
                    this.todoData.get(target.parentNode.parentNode.key).value = valueElem;
                    this.render();
                });
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.handler();
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-container', '.todo-list', '.todo-completed');

todo.init();
