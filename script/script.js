'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

const toDoData = [];

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    toDoData.forEach(function(item, index){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${item.value}</span>
                        <div class="todo-buttons">
                            <button class="todo-remove"></button>
                            <button class="todo-complete"></button>
                        </div>`;
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete'),
              btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        btnTodoRemove.addEventListener('click', function(){
            delete toDoData[index];
            render();
        });

    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    headerInput.addEventListener('focus', function(){
        headerInput.style.color = 'white';
        headerInput.placeholder = 'Какие планы?';
    });

    if (headerInput.value.trim() === '') {
        headerInput.value = '';
        headerInput.style.color = 'red';
        headerInput.placeholder = 'Вы ввели пустую строку';
        return;
    }

    const newToDo = {
        value: headerInput.value,
        completed: false
    };

    headerInput.value = '';

    toDoData.push(newToDo);

    render();
});

render();