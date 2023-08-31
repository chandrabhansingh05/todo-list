const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let tasks = [];

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = {
            text: taskText,
            completed: false,
            timestamp: new Date().toLocaleString()
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }
}

function completeTask(index) {
    tasks[index].completed = true;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function showTasks(filter) {
    const filteredTasks = filter === 'completed'
        ? tasks.filter(task => task.completed)
        : tasks.filter(task => !task.completed);

    renderTasks(filteredTasks);
}

function renderTasks(taskArray = tasks) {
    taskList.innerHTML = "";

    taskArray.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text} (Added: ${task.timestamp})</span>
            <button class="complete" onclick="completeTask(${index})">Complete</button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

loadTasks();
