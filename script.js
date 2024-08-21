const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskDateTime = document.getElementById('taskDateTime');
const notificationSound = document.getElementById('notificationSound');
const deleteSound = document.getElementById('deleteSound');
const editSound = document.getElementById('editSound');

// Add event listener to auto-fill date and time
taskInput.addEventListener('keydown', (event) => {
    // Check if the input is empty and a character is being entered
    if (taskDateTime.value === '' && event.key.length === 1) { 
        const now = new Date();
        taskDateTime.value = now.toISOString().slice(0, 16);
    }
});

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  const taskDateTimeValue = taskDateTime.value;

  if (taskText !== '') {
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <span class="due-date">${taskDateTimeValue}</span> 
        <button class="delete-btn"></button>
        <button class="edit-btn"></button>
    `;

    taskList.appendChild(newTask);

    taskInput.value = '';
    taskDateTime.value = '';

    newTask.querySelector('.delete-btn').addEventListener('click', deleteTask);
    newTask.querySelector('.edit-btn').addEventListener('click', editTask); 
    newTask.querySelector('input[type="checkbox"]').addEventListener('change', toggleTaskCompletion);

    notificationSound.play();
  }
}

function deleteTask(event) {
  const taskItem = event.target.closest('li');
  taskList.removeChild(taskItem);
  deleteSound.play();
}

function editTask(event) {
  const taskItem = event.target.closest('li');
  const taskSpan = taskItem.querySelector('span');
  const newTaskText = prompt('Edit Task:', taskSpan.textContent);

  if (newTaskText !== null) {
    taskSpan.textContent = newTaskText.trim();
    editSound.play(); 
  }
}

function toggleTaskCompletion(event) {
  const taskSpan = event.target.nextElementSibling;
  taskSpan.classList.toggle('completed');
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Delete') {
    const checkedTasks = document.querySelectorAll('#taskList li input[type="checkbox"]:checked');
    checkedTasks.forEach(task => {
      deleteTask({ target: task.parentNode.querySelector('.delete-btn') }); 
    });
  }
});