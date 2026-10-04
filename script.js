const inputTask = document.getElementById('inputTask');
const listContainer = document.getElementById('listContainer');
const tombol = document.getElementById('tombol');
const selectAllButton = document.getElementById('selectAll');
const deleteDoneButton = document.getElementById('deleteDone');
const warningMessage = document.getElementById('warningMessage');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const remainingTasks = document.getElementById('remainingTasks');

function showWarning(message) {
    warningMessage.textContent = message;
    warningMessage.hidden = false;
}

function hideWarning() {
    warningMessage.hidden = true;
}

function updateStats() {
    const tasks = listContainer.querySelectorAll('li');
    const doneCount = listContainer.querySelectorAll('li.completed').length;

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = doneCount;
    remainingTasks.textContent = tasks.length - doneCount;
}

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
    updateStats();
}

function addTask() {
    const value = inputTask.value.trim();

    if (!value) {
        showWarning('Masukkan tugas terlebih dahulu.');
        inputTask.focus();
        return;
    }

    hideWarning();

    const li = document.createElement('li');
    li.textContent = value;

    const span = document.createElement('span');
    span.textContent = '\u00d7';
    li.append(span);

    listContainer.append(li);
    inputTask.value = '';
    saveData();
    inputTask.focus();
}

deleteDoneButton.onclick = function() {
    listContainer.querySelectorAll('li.completed').forEach(task => task.remove());
    saveData();
}

selectAllButton.onclick = function() {
    listContainer.querySelectorAll('li').forEach(task => task.classList.add('completed'));
    saveData();
}

tombol.onclick = addTask;

inputTask.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

listContainer.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    const removeButton = e.target.closest('span');

    if (removeButton) {
        removeButton.parentElement.remove();
        saveData();
        return;
    }

    if (li) {
        li.classList.toggle('completed');
        saveData();
    }
});

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
    updateStats();
}

showTask();