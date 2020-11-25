const todoInput = document.querySelector(".todo_input");
const todoButton = document.querySelector(".todo_button");
const todoList = document.querySelector(".todo_list");

let addTask = (e) => {
  e.preventDefault();
  if (!todoInput.value) return;
  localStoreAndContentDivWthLI(todoInput.value);
};

let completeDelete = (e) => {
  //delete button
  const item = e.target;
  const parent = item.parentElement;
  if (item.classList[0] === "delete_button") {
    parent.classList.add("animation");
    removeTodosLocal(parent);
    //remove after animation
    parent.addEventListener("transitionend", () => {
      parent.remove();
    });
  }
  //complete button
  item.classList[0] === "complete_button"
    ? parent.classList.toggle("complete")
    : null;
};

let localStoreAndContentDivWthLI = (todo) => {
  //add to local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  //Creating and inserting div
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task_div");
  //Li inside main div
  const taskLi = document.createElement("li");
  taskLi.innerText = todos[todos.length - 1];
  taskLi.classList.add("task_li");
  taskDiv.insertAdjacentElement("beforeend", taskLi);
  //Button for complete todo
  const completeButton = document.createElement("Button");
  completeButton.innerHTML = '<i class="fas fa-clipboard-check"></i>';
  completeButton.classList.add("complete_button");
  taskDiv.insertAdjacentElement("beforeend", completeButton);
  //Button for delete
  const deleteButton = document.createElement("Button");
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteButton.classList.add("delete_button");
  taskDiv.insertAdjacentElement("beforeend", deleteButton);
  //main div insert into ul
  todoList.insertAdjacentElement("beforeend", taskDiv);
  todoInput.value = "";
};

let removeTodosLocal = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todo.children[0].innerText);
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

let renderAfterRestart = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //renders data from local storage
  todos.forEach((todo) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task_div");
    //Li inside main div
    const taskLi = document.createElement("li");
    taskLi.innerText = todo;
    taskLi.classList.add("task_li");
    taskDiv.insertAdjacentElement("beforeend", taskLi);
    //Button for complete todo
    const completeButton = document.createElement("Button");
    completeButton.innerHTML = '<i class="fas fa-clipboard-check"></i>';
    completeButton.classList.add("complete_button");
    taskDiv.insertAdjacentElement("beforeend", completeButton);
    //Button for delete
    const deleteButton = document.createElement("Button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete_button");
    taskDiv.insertAdjacentElement("beforeend", deleteButton);
    //main div insert into ul
    todoList.insertAdjacentElement("beforeend", taskDiv);
  });
};

todoButton.addEventListener("click", addTask);
todoList.addEventListener("click", completeDelete);
document.addEventListener("DOMContentLoaded", renderAfterRestart);
