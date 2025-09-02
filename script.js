/*"use strict";
const input = document.getElementById("inputarea");
const button = document.getElementById("buttonarea");
const ul = document.getElementById("ularea");

const todoList = [];

// To-Do の li 要素を生成する関数
const createTodoElement = (todo, index) => {
  // li 要素を作成
    const li = document.createElement("li");
    li.className = "flex justify-between items-center mb-2 p-2 border rounded";

  // テキスト部分
    const span = document.createElement("span");
    span.textContent = todo.text;

  // 完了ボタン
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.className =
    "mx-[8px] px-[8px] py-[4px] bg-blue-500 hover:bg-blue-700 text-white font-bold text-center rounded w-[160px]";
    completeButton.addEventListener("click", () => toggleTodo(index));

  // 削除ボタン
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className =
    "mx-[8px] px-[8px] py-[4px] bg-red-500 hover:bg-red-700 text-white font-bold text-center rounded w-[160px]";

  // li に要素を追加
    li.appendChild(span);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

  // ul に li を追加
    ul.appendChild(li);
};

// To-Do を追加する関数
const addTodo = () => {
    const todoText = input.value.trim();

if (todoText) {
    const todo = {
        text: todoText,
        completed: false,
    };
    todoList.push(todo);

    // 配列の最後に追加された要素の index を取得
    const index = todoList.length - 1;

    // li 要素を生成して ul に追加
    createTodoElement(todo, index);
}

    input.value = "";
};

// ボタンにイベントを追加
button.addEventListener("click", addTodo);

const toggleTodo = (index) => {
  // completed の値を反転
  todoList[index].completed = !todoList[index].completed;

  // 表示を更新する関数を呼ぶ
  completeTodo(index);
};
const completeTodo = (index) => {
  // ul の子要素 (li) を取得
  const li = ul.children[index];
  const completeButton = li.querySelector("button:first-of-type");

  if (todoList[index].completed) {
    completeButton.textContent = "Undo";
  } else {
    completeButton.textContent = "Complete";
  }
};*/

"use strict";

const input = document.getElementById("inputarea");
const button = document.getElementById("buttonarea");
const ul = document.getElementById("ularea");

const todoList = [];

/** 1) To-Do の HTML を作成する関数 */
const createElement = (todo, index) => {
  const li = document.createElement("li");
  li.className = "flex justify-between items-center mb-2 p-2 border rounded";

  // テキスト
  const span = document.createElement("span");
  span.textContent = todo.text;
  if (todo.completed) {
    span.className = "line-through text-gray-500";
  }

  // ステータス切り替えボタン
  const completeButton = document.createElement("button");
  completeButton.textContent = todo.completed ? "Undo" : "Complete";
  completeButton.className =
    "mx-[8px] px-[8px] py-[4px] bg-blue-500 hover:bg-blue-700 text-white font-bold text-center rounded w-[160px]";
  completeButton.addEventListener("click", () => toggleTodo(index));

  // 削除ボタン
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className =
    "mx-[8px] px-[8px] py-[4px] bg-red-500 hover:bg-red-700 text-white font-bold text-center rounded w-[160px]";
  deleteButton.addEventListener("click", () => deleteTodo(index));

  li.append(span, completeButton, deleteButton);
  return li;
};

/** 2) To-Do を一括で描画 */
const renderTodoList = () => {
  ul.innerHTML = ""; // 一旦リストを空にする
  todoList.forEach((todo, index) => {
    ul.appendChild(createElement(todo, index));
  });
};

/** 3) To-Do を追加 */
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

/** 4) ステータス更新 */
const toggleTodo = (index) => {
  todoList[index].completed = !todoList[index].completed;
  renderTodoList();
};

/** 5) 削除 */
const deleteTodo = (index) => {
  todoList.splice(index, 1);
  renderTodoList();
};

/** 6) ボタンイベント */
button.addEventListener("click", addTodo);

// Enter キーでも追加できるように
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

