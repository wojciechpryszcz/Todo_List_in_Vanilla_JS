let toDoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;
let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = (params) => {
  prepareDomeElements();
  prepareDomeEvents();
};

const prepareDomeElements = (params) => {
  toDoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");
  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
  popupInput = document.querySelector(".popup-input");
};

const prepareDomeEvents = (params) => {
  addBtn.addEventListener("click", addNewTodo);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeTodoText);
  toDoInput.addEventListener("keyup", enterKeyCheck);
};

const addNewTodo = (params) => {
  if (toDoInput.value !== "") {
    newTodo = document.createElement("li");
    newTodo.textContent = toDoInput.value;

    createToolsArea();

    ulList.append(newTodo);

    toDoInput.value = "";
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Wpisz treść zadania";
  }
};

const createToolsArea = (params) => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  newTodo.append(toolsPanel);

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    console.log(e.target.closest("li").classList.toggle("completed"));
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editTodo(e);
  } else if (e.target.matches(".delete")) {
    deleteTodo(e);
  }
};

const editTodo = (e) => {
  todoToEdit = e.target.closest("li");
  popupInput.value = todoToEdit.firstChild.textContent;
  console.log(todoToEdit.firstChild);
  popup.style.display = "flex";
};

const closePopup = (params) => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

const changeTodoText = (params) => {
  if (popupInput.value !== "") {
    todoToEdit.firstChild.textContent = popupInput.value;
    popup.style.display = "none";
    popupInfo.textContent = "";
  } else {
    popupInfo.textContent = "Musisz podać jakąś treść";
  }
};

const deleteTodo = (e) => {
  e.target.closest("li").remove();
  const allTodos = document.querySelectorAll("li");
  if (allTodos.length === 0) {
    errorInfo.textContent = "Brak zadań na liście";
  }
};

const enterKeyCheck = (e) => {
  if (e.key === "Enter") {
    addNewTodo();
  }
};

document.addEventListener("DOMContentLoaded", main);
