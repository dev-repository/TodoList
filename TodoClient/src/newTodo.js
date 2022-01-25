const eleInputTodo = document.getElementById("ipt-todo");
const eleBtnAllDelete = document.getElementById("btn-all-delete");
const eleBtnAddTodo = document.getElementById("btn-todo-add");
const eleTodoList = document.querySelector(".todoList");
const pendingNumber = document.querySelector(".pendingNumb");

function getTodos() {
  const data = localStorage.getItem("New Todo");
  if (!data) {
    return [];
  }
  return JSON.parse(data) ?? [];
}

function setTodos(todos) {
  localStorage.setItem("New Todo", JSON.stringify(todos));
}

class Todo {
  constructor(todo, index, instance) {
    this.todo = todo;
    this.instance = instance;
    this.index = index;
    this.ele = null;

    this.mount();
  }

  mount() {
    this.ele = this.makeTodoItem();

    eleTodoList.appendChild(this.ele);

    this.addEventListener();
  }

  remove() {
    this.ele.remove();
    this.ele = null;
    this.todo = "";
    this.index = 0;
  }

  makeTodoItem() {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.setAttribute("name", "btn-todo-delete");
    span.setAttribute("data-idx", this.index);
    span.innerHTML = '<i class="fas fa-trash"></i>';
    li.textContent = this.todo;
    li.appendChild(span);
    return li;
  }

  addEventListener() {
    this.ele
      .querySelector('[name="btn-todo-delete"]')
      .addEventListener("click", () => {
        const currentTodos = getTodos();
        currentTodos.splice(this.index, 1);
        setTodos(currentTodos);
        pendingNumber.textContent = this.instance.todos.length - 1;
        this.ele.remove();
      });
  }
}

class TodoList {
  constructor() {
    this.todos = getTodos().map((todo, index) => {
      return new Todo(todo, index, this);
    });

    pendingNumber.textContent = this.todos.length;
    this.visibleTodos();

    this.addEventListener();
  }

  visibleTodos() {
    if (this.todos.length) {
      eleBtnAllDelete.classList.add("active");
    } else {
      eleBtnAllDelete.classList.remove("active");
    }
  }

  addEventListener() {
    eleInputTodo.addEventListener("keyup", (e) => {
      if (e.target.value.trim().length) {
        eleBtnAddTodo.classList.add("active");
        return;
      }
      eleBtnAddTodo.classList.remove("active");
    });

    eleBtnAddTodo.addEventListener("click", (e) => {
      const text = eleInputTodo.value;
      if (!text) return;

      const todos = getTodos();
      todos.push(text);
      setTodos(todos);

      const todo = new Todo(text, todos.length - 1, this);
      this.todos.push(todo);
      eleInputTodo.value = "";

      this.visibleTodos();

      pendingNumber.textContent = this.todos.length;
    });

    eleBtnAllDelete.addEventListener("click", (e) => {
      localStorage.removeItem("New Todo");
      this.todos.forEach((todo) => {
        todo.remove();
      });
      pendingNumber.textContent = 0;
      this.todos = [];
    });
  }
}

new TodoList();