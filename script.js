// Select Elements
const form = document.getElementById('todo-form');
const todoInput = document.getElementById('new-todo');
const todoListEl = document.getElementById('.notification');

//Variables
let todos =JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId = -1;


//1st render
renderTodos();

//Form submit
form.addEventListener('submit' , function (event) {
    event.preventDefault();

    saveTodo();
    renderTodos();
    localStorage.setItem('todos' , JSON.stringify(todos));

});
