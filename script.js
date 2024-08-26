const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskDateTime = document.getElementById('taskDateTime');
const notificationSound = document.getElementById('notificationSound');
const deleteSound = document.getElementById('deleteSound');
const editSound = document.getElementById('editSound');

// Add event listener to auto-fill date and time
taskInput.addEventListener('keydown', (event) => {
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
  const allTasks = document.querySelectorAll('#taskList li');
  let taskDeleted = false; 

  allTasks.forEach(task => {
    const checkbox = task.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      taskList.removeChild(task);
      taskDeleted = true;
    }
  });

  if (!taskDeleted) {
    const taskItem = event.target.closest('li');
    taskList.removeChild(taskItem);
  }

  deleteSound.play();
}

function editTask(event) {
  const taskItem = event.target.closest('li');
  const taskSpan = taskItem.querySelector('span');
  const dueDateSpan = taskItem.querySelector('.due-date');

  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.value = taskSpan.textContent;

  const dateTimeInput = document.createElement('input');
  dateTimeInput.type = 'datetime-local';
  dateTimeInput.value = dueDateSpan.textContent;

  taskSpan.parentNode.replaceChild(taskInput, taskSpan);
  dueDateSpan.parentNode.replaceChild(dateTimeInput, dueDateSpan);

  taskInput.focus();

  taskInput.addEventListener('blur', function() {
    const newTaskText = taskInput.value;
    const newTaskSpan = document.createElement('span');
    newTaskSpan.textContent = newTaskText;
    taskInput.parentNode.replaceChild(newTaskSpan, taskInput);
  });

  dateTimeInput.addEventListener('blur', function() {
    const newDueDate = dateTimeInput.value;
    const newDueDateSpan = document.createElement('span');
    newDueDateSpan.className = 'due-date';
    newDueDateSpan.textContent = newDueDate;
    dateTimeInput.parentNode.replaceChild(newDueDateSpan, dateTimeInput);

    editSound.play(); 
  });
}

function toggleTaskCompletion(event) {
  const taskSpan = event.target.nextElementSibling;
  taskSpan.classList.toggle('completed');
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Delete') {
    const checkedTasks = document.querySelectorAll('#taskList li input[type="checkbox"]:checked');
    if (checkedTasks.length > 0) {
      deleteTask({});  
    } 
  }
});