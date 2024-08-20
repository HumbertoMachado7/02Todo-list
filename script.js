const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const notificationSound = document.getElementById('notificationSound');
const deleteSound = document.getElementById('deleteSound');
const modifySound = document.getElementById('modifySound'); 

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const now = new Date();
        const defaultDateTime = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm

        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <input type="datetime-local" value="${defaultDateTime}">
            <button class="delete-btn">Delete</button>
            <button class="modify-btn">Modify</button>
        `;

        taskList.appendChild(newTask);

        taskInput.value = '';

        newTask.querySelector('.delete-btn').addEventListener('click', deleteTask);
        newTask.querySelector('.modify-btn').addEventListener('click', modifyTask); 
        newTask.querySelector('input[type="checkbox"]').addEventListener('change', toggleTaskCompletion);

        notificationSound.play();
    }
}

function deleteTask(event) {
    const taskItem = event.target.closest('li');
    taskList.removeChild(taskItem);
    deleteSound.play();
}

function modifyTask(event) {
  const taskItem = event.target.closest('li');
  const taskSpan = taskItem.querySelector('span');
  const newTaskText = prompt('Edit Task:', taskSpan.textContent);

  if (newTaskText !== null) {
    taskSpan.textContent = newTaskText.trim();
    modifySound.play();
  }
}


function toggleTaskCompletion(event) {
    const taskSpan = event.target.nextElementSibling;
    taskSpan.classList.toggle('completed');
}