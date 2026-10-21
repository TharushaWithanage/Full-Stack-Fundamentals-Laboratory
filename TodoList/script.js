
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");
const taskCounter = document.getElementById("taskCounter");

const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        errorMessage.textContent = "Please enter a task!";
        return;
    }

    errorMessage.textContent = "";

    tasks.push({
        id: Date.now() + Math.random(),
        text: text,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.replaceChildren();

    tasks.forEach(function (task) {
        if (currentFilter === "active" && task.completed) return;
        if (currentFilter === "completed" && !task.completed) return;

        const li = document.createElement("li");
        li.className = "list-group-item";

        const leftSection = document.createElement("div");
        leftSection.className = "d-flex align-items-center gap-2";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input";
        checkbox.checked = task.completed;

        const taskName = document.createElement("span");
        taskName.textContent = task.text;
        taskName.classList.toggle("completed", task.completed);

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        leftSection.append(checkbox, taskName);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-danger btn-sm";

        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            saveTasks();
            renderTasks();
        });

        li.append(leftSection, deleteBtn);
        taskList.appendChild(li);
    });

    const remaining = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    taskCounter.textContent = remaining + " tasks remaining";
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.toggle("active", btn === button);
        });

        renderTasks();
    });
});

clearCompletedBtn.addEventListener("click", function () {
    tasks = tasks.filter(function (task) {
        return !task.completed;
    });

    saveTasks();
    renderTasks();
});

renderTasks();
