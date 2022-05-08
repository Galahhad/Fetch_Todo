const fetchUrl = "https://jsonplaceholder.typicode.com/todos";
async function getTodos() {
  try {
    const res = await fetch(fetchUrl);
    const data = await res.json();

    const todoList = document.querySelector(".todo_list");

    data.forEach((item) => {
      const todoWrap = document.createElement("div");
      todoWrap.classList.add("todo_wrap");

      const title = document.createElement("p");
      title.textContent = item.title;
      title.classList.add("title");

      const inputWrap = document.createElement("label");

      const checkbox = document.createElement("input");
      checkbox.classList.add("checkbox");
      checkbox.type = "checkbox";

      const checkmark = document.createElement("div");
      checkmark.classList.add("checkmark");

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete_button");

      document.querySelector(".supreme").append(todoList);
      todoList.prepend(todoWrap);
      todoWrap.append(inputWrap, title, deleteButton);
      inputWrap.append(checkbox, checkmark);

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          patchUser(item.id, true);
          title.style.textDecoration = "line-through";
          todoWrap.style.opacity = "0.3";
        } else {
          patchUser(item.id, false);
          title.style.textDecoration = "none";
          todoWrap.style.opacity = "1";
        }
      });

      deleteButton.addEventListener("click", () => {
        deleteTodo(item.id, todoWrap);
      });
    });
  } catch (err) {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error");
    errorElement.textContent = `Произошла ошибка ${err}`;
    document.querySelector(".todo_list").replaceWith(errorElement);
  }
}

getTodos();

async function patchUser(id, patch) {
  try {
    const patchInfo = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: patch,
      }),
    };

    await fetch(`${fetchUrl}/${id}`, patchInfo);
  } catch (err) {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error");
    errorElement.textContent = `Произошла ошибка ${err}`;
    document.querySelector(".todo_list").replaceWith(errorElement);
  }
}

async function deleteTodo(id, node) {
  try {
    const deleteInfo = {
      method: "DELETE",
    };
    await fetch(`${fetchUrl}/${id}`, deleteInfo);
    node.remove();
  } catch (err) {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error");
    errorElement.textContent = `Произошла ошибка ${err}`;
    document.querySelector(".todo_list").replaceWith(errorElement);
  }
}

async function postTodo() {
  try {
    const addInput = document.querySelector(".add_input");
    const postInfo = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: addInput.value,
        completed: false,
        id: Math.round(Math.random() * 1000),
      }),
    };
    const res = await fetch(fetchUrl, postInfo);
    const data = await res.json();

    const todoList = document.querySelector(".todo_list");

    const todoWrap = document.createElement("div");
    todoWrap.classList.add("todo_wrap");

    const title = document.createElement("p");
    title.textContent = data.title;
    title.classList.add("title");

    const inputWrap = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";

    const checkmark = document.createElement("div");
    checkmark.classList.add("checkmark");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete_button");

    document.querySelector(".supreme").append(todoList);
    todoList.prepend(todoWrap);
    todoWrap.append(inputWrap, title, deleteButton);
    inputWrap.append(checkbox, checkmark);

    deleteButton.addEventListener("click", () => {
      deleteTodo(data.id, todoWrap);
    });

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        patchUser(data.id, true);
        title.style.textDecoration = "line-through";
        todoWrap.style.opacity = "0.3";
      } else {
        patchUser(data.id, false);
        title.style.textDecoration = "none";
        todoWrap.style.opacity = "1";
      }
    });
    addInput.value = "";
  } catch (err) {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error");
    errorElement.textContent = `Произошла ошибка ${err}`;
    document.querySelector(".todo_list").replaceWith(errorElement);
  }
}
const addForm = document.querySelector(".add_form");
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const addInput = document.querySelector(".add_input");
  if (addInput.value.startsWith(" ")) {
    addInput.value = "";
  } else {
    postTodo();
  }
});
