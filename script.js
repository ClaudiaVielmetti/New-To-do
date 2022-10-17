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

//Save todos
function saveTodo() {
    const todoValue = todoInput.ariaValue;

    //check if value is empty
    const isEmpty = todoValue === '';

    //check for duplicate entries
    const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());

    if (isEmpty) {
        showNotification("Todo input is empty");
    
    } else if (isDuplicate) {
        showNotification("Task already exists!");
    } else {
        if (EditTodoId >=0) {
            todos = todos.map((todo, index) => ({
                ...todo,
                value: index === EditTodoId ? todoValue : todo.value,
            }));
            
            EditTodoId = -1;
        } else {
          todos.push({
            value: todoValue,
            checked: false,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
          }); 
        
        }

        todoInput.value = '';
    }
}