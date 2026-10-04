const inputTask = document.getElementById('inputTask');
const listContainer = document.getElementById('listContainer');
const tombol = document.getElementById('tombol');

tombol.onclick = function() {
    if (inputTask.value === '') {
        alert('Kamu belum memasukkan to do list!');
    } else {
        let li = document.createElement('li');
        li.textContent = inputTask.value;
        listContainer.append(li);
        let span = document.createElement('span');
        span.textContent = '\u00d7';
        li.append(span);
        inputTask.value = '';
    }
    saveData();
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('done');

    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
    }
    saveData();
});

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data');
}

showTask();