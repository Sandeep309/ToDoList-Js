// Selectors
const todoInput = document.querySelector(".todo_input");
const todoBtn = document.querySelector(".todo_btn");
const todoList = document.querySelector(".todo_list");
const filterOption = document.querySelector(".filter_todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(e) {
  // Prevent form from submiting
  event.preventDefault();

  if (!todoInput.value) {
    alert("Please add item to continue");
    return;
  }

  //   Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo_flex");

  //   Create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("list-group-item");
  todoDiv.appendChild(newTodo);

  // Add Todo to LocalStorage
  saveLocalStorage(todoInput.value);

  //   Check Mark Btn
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.classList.add("btn", "btn-success");
  todoDiv.appendChild(completedBtn);

  //   Check Trash Btn
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trashBtn.classList.add("btn", "btn-danger");
  todoDiv.appendChild(trashBtn);

  //   Append To List
  todoList.appendChild(todoDiv);

  //   Clear Todo Input Value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // Delete ToDo
  if (item.classList.contains("btn-danger")) {
    const todo = item.parentElement;
    // animation
    todo.classList.add("fall");
    removeocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // Check Mark
  if (item.classList.contains("btn-success")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalStorage(todo) {
  // Check -- if already have items
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // Check -- if already have items
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    //   Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo_flex");

    //   Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("list-group-item");
    todoDiv.appendChild(newTodo);

    //   Check Mark Btn
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("btn", "btn-success");
    todoDiv.appendChild(completedBtn);

    //   Check Trash Btn
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("btn", "btn-danger");
    todoDiv.appendChild(trashBtn);

    //   Append To List
    todoList.appendChild(todoDiv);
  });
}

function removeocalTodos(todo) {
  // Check -- if already have items
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  // console.log(todos.indexOf(todoIndex));
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
