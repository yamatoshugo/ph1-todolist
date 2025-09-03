"use strict";

const input = document.getElementById("inputarea");
const button = document.getElementById("buttonarea");
const ul = document.getElementById("ularea");

const todoList = [];

const createElement = (todo, index) => {
  const li = document.createElement("li");
  li.className = "flex justify-between items-center mb-2 p-2 border rounded";

  const span = document.createElement("span");
  span.textContent = todo.text;
  if (todo.completed) {
    span.className = "line-through text-gray-500";
  }

  const completeButton = document.createElement("button");
  completeButton.textContent = todo.completed ? "Undo" : "Complete";
  completeButton.className = "mx-[8px] px-[8px] py-[4px] bg-blue-500 hover:bg-blue-700 text-white font-bold text-center rounded w-[160px]";
  completeButton.addEventListener("click", () => toggleTodo(index));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "mx-[8px] px-[8px] py-[4px] bg-red-500 hover:bg-red-700 text-white font-bold text-center rounded w-[160px]";
  deleteButton.addEventListener("click", () => deleteTodo(index));

  li.append(span, completeButton, deleteButton);
  return li;
};

const renderTodoList = () => {
  ul.innerHTML = "";
  todoList.forEach((todo, index) => {
    ul.appendChild(createElement(todo, index));
  });
};

const addTodo = () => {
  const todoText = input.value.trim();
  if (!todoText) {
    input.value = "";
    return;
  }
  todoList.push({ text: todoText, completed: false });
  input.value = "";
  renderTodoList();
};

const toggleTodo = (index) => {
  todoList[index].completed = !todoList[index].completed;
  renderTodoList();
};

const deleteTodo = (index) => {
  todoList.splice(index, 1);
  renderTodoList();
};

button.addEventListener("click", addTodo);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});