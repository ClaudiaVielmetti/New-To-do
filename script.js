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

//render the todos
todos.forEach((todo, index) => {
    todoListEl.innerHTML += `
    <div class="todo" id=${index}>
      <i 
        class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
        style="color : ${todo.color}"
        data-action="check"
      ></i>
      <p class="${todo.checked ? 'checked' : ''}" data-action="check">${todo.value}</p>
      <i class="bi bi-pencil-square" data-action="edit"></i>
      <i class="bi bi-trash" data-action="delete"></i>
    </div>
    `;
});

//click the eventlistener for all the todos
todoListEl.addEventListener('click', (event) => {
    const target = event.target;
    const parentElement = target.parentNode;

    if (parentElement.className !== 'todos') return;

    //todo Id
    const todo = parentElement;
    const todoId = Number(todo.id);

    //target action
    const action = target.dataset.action;

    action === 'check' && checkTodo(todoId);
    action === 'edit' && EditTodoId(todoId);
    action === 'delete' && deleteTodo(todoId);

});

//check todo is done
function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
      ...todo,
      checked: index === todoId ? !todo.checked : todo.checked,
    }));
  
    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos));
}


//edit todos
function editTodo(todoId) {
    todoInput.value = todos[todoId].value;
    EditTodoId = todoId;
}

//Delete todos
function deleteTodo(todoId) {
    todos = todos.filter((todo, index) => index !== todoId);
    EditTodoId = -1;
  
    // re-render
    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos));
}

//alert notifications
function showNotification(msg) {
    // change the message
    notificationEl.innerHTML = msg;
  
    // notification enter
    notificationEl.classList.add('notif-enter');
  
    // notification leave
    setTimeout(() => {
      notificationEl.classList.remove('notif-enter');
    }, 2000);
}