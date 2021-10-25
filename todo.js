let listDOM = document.querySelector("#list");

function newElement() {
  let taskValue = document.querySelector("#task").value;
  if (!taskValue) {
    $(".toast.error").toast("show");
  } else {
    $(".toast.success").toast("show");
    newElementByValue(taskValue);
  }
}

function newElementByValue(value) {
  let liDOM = document.createElement("li"); // Create a new list item when clicking on the "Add" button
  // Create a "close" button and append it to each list item
  let closeDOM = document.createElement("span");
  let checkedDOM = document.querySelector("ul");
  checkedDOM.addEventListener("click", checkedTick, false);
  closeDOM.className = "close";
  closeDOM.innerHTML = "&times";
  closeDOM.addEventListener("click", closeBtn);
  liDOM.innerHTML = value;
  liDOM.appendChild(closeDOM); //append a close btn in a list item
  listDOM.appendChild(liDOM); //append a new list item
  toDoList.push(value); // add taskvalue (list item) to todolist
  saveToLocalstorage(); // call function
}

// Click on a close button to hide the current list item
function closeBtn(event) {
  this.parentElement.style.display = "none";
  let index = toDoList.indexOf(this.parentElement.value);
  toDoList.splice(index);
  saveToLocalstorage();
}

// Add a "checked" symbol when clicking on a list item
function checkedTick(ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
  }
}

let toDoList = []; // localstorage array

function saveToLocalstorage() {
  localStorage.setItem("list", JSON.stringify(toDoList));
}

window.addEventListener("load", (event) => {
  let savedTodoList = JSON.parse(localStorage.getItem("list"));

  // toDoList =JSON.parse(localStorage.getItem("list"))??[]
  if (savedTodoList == null) {
    savedTodoList = [];
  }

  for (let i = 0; i < savedTodoList.length; i++) {
    newElementByValue(savedTodoList[i]);
  }
});
