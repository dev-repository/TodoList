import "./index";

const eleInputTodo = document.getElementById("ipt-todo");
const deleteAllButton = document.getElementById("btn-all-delete");
const addTodoButton = document.getElementById("btn-todo-add");
const eleTodoList = document.querySelector(".todoList");

// const inputBox = document.querySelector(".inputField input");
// const addBtn = document.querySelector(".inputField button");
// const todoList = document.querySelector(".todoList");
// const deleteAllBtn = document.querySelector(".footer button");

function makeTodoItem(text, index) {
  return `
          <li> ${text} 
              <span data-idx="${index}" name="btn-todo-delete">
                  <i class="fas fa-trash"></i>
              </span>
          </li>
      `;
}

function getTodos() {
  const data = localStorage.getItem("New Todo");
  if (!data) {
    return [];
  }
  return JSON.parse(data) ?? [];
}

function showTodos(todos) {
  const newTodos = typeof todos === "undefined" ? getTodos() : todos;

  console.log("todos =====>", todos);
  console.log("newTodos =====>", newTodos);
  if (newTodos.length) {
    deleteAllButton.classList.add("active");
  } else {
    deleteAllButton.classList.remove("active");
  }

  const pendingNumber = document.querySelector(".pendingNumb");
  pendingNumber.textContent = newTodos.length; //getLocalStorage안에 있는 갯수 가져오기

  const html = newTodos
    .map((todo, index) => {
      return makeTodoItem(todo, index);
    })
    .join("");

  console.log("html =====>", html);

  eleTodoList.innerHTML = html;
  eleInputTodo.value = "";

  const eleDeleteBtns = document.querySelectorAll("[name=btn-todo-delete]");
  console.log("eleDeleteBtns =====>", eleDeleteBtns);
  for (const ele of eleDeleteBtns) {
    ele.addEventListener("click", function () {
      console.log("ele.dataset.idx =====>", ele.dataset.idx);
      const idx = this.dataset.idx;

      const currentTodos = getTodos();
      currentTodos.splice(idx, 1);
      localStorage.setItem("New Todo", JSON.stringify(currentTodos));
      showTodos();
    });
  }
}

deleteAllButton.addEventListener("click", (e) => {
  localStorage.removeItem("New Todo");
  showTodos();
});

eleInputTodo.addEventListener("keyup", (e) => {
  if (e.target.value.trim().length) {
    addTodoButton.classList.add("active");
    return;
  }
  addTodoButton.classList.remove("active");
});

addTodoButton.addEventListener("click", (e) => {
  const text = eleInputTodo.value;
  if (!text) return;

  const todos = getTodos();
  todos.push(text);
  localStorage.setItem("New Todo", JSON.stringify(todos));
  showTodos(todos);
});

// inputBox.onkeyup = () => {
//     let userData = inputBox.value; //인풋박스의 인풋벨류 가져오기
//     if (userData.trim() != 0) { //사용자가 공백만 입력한 경우
//         addBtn.classList.add('active'); // 버튼에 active 클레스 추가
//     } else {
//         addBtn.classList.remove('active'); //버튼에 active 클레스 제거
//     }
// }

// showTasks();
showTodos();

//사용자가 +버튼을 추가한 경우
// addBtn.onclick = () => {
//   let userData = inputBox.value;
//   let getLocalStorage = localStorage.getItem("New Todo"); //로컬장소 가져오기

//   let listArr = getLocalStorage !== null ? JSON.parse(getLocalStorage) : [];

//   listArr.push(userData); //사용자 데이터 밀어주기
//   localStorage.setItem("New Todo", JSON.stringify(listArr)); // js를 json 객체로 변환
//   showTasks(); //callback
// };

//ul에 list 추가
// function showTasks() {
//   let getLocalStorage = localStorage.getItem("New Todo");

//   let listArr = getLocalStorage !== null ? JSON.parse(getLocalStorage) : [];
//   listArr = JSON.parse(getLocalStorage);

//   const pendingNumber = document.querySelector(".pendingNumb");
//   pendingNumber.textContent = listArr.length; //getLocalStorage안에 있는 갯수 가져오기

//   if (listArr.length > 0) {
//     //갯수가 0개면 버튼 조건
//     deleteAllBtn.classList.add("active");
//   } else {
//     deleteAllBtn.classList.remove("active");
//   }

//   let newLiTag = "";
//   listArr.forEach((element, index) => {
//     newLiTag += `<li> ${element} <span onclick='deleteTask(${index})'><i class="fas fa-trash"></i></span></li>`;
//   });

//   todoList.innerHTML = newLiTag; //html ul Tag에 넣기
//   inputBox.value = ""; //입력후 value 지우기
// }

//하나만 지우기
// function deleteTask(index) {
//   let getLocalStorage = localStorage.getItem("New Todo");
//   listArr = JSON.parse(getLocalStorage);
//   listArr.splice(index, 1); //특정 인덱스 리를 삭제 또는 제거

//   //삭제후 리스트 보여주기
//   localStorage.setItem("New Todo", JSON.stringify(listArr));
//   deleteTask();
// }

//전부 지우기
// deleteAllBtn.onclick = () => {
//   todoList.remove(".todoList");
//   let listArr = getLocalStorage !== null ? JSON.parse(getLocalStorage) : [];
//   listArr = []; //

//   // localStorage.setItem('New Todo', JSON.stringify(listArr));
//   showTasks();
// };