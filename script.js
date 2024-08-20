const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const notificationSound = document.getElementById('notificationSound');
const deleteSound = document.getElementById('deleteSound');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;

        taskList.appendChild(newTask);

        taskInput.value = '';

        newTask.querySelector('.delete-btn').addEventListener('click', deleteTask);
        newTask.querySelector('input[type="checkbox"]').addEventListener('change', toggleTaskCompletion);

        // Play notification sound
        notificationSound.play();
    }
}

function deleteTask(event) {
    const taskItem = event.target.closest('li');
    taskList.removeChild(taskItem);

    // Play delete sound
    deleteSound.play();
}

function toggleTaskCompletion(event) {
    const taskSpan = event.target.nextElementSibling;
    taskSpan.classList.toggle('completed');
}