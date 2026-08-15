let collegeTasks = JSON.parse(localStorage.getItem('rpg_college')) || [];

function renderCollegeTasks() {
    const lista = document.getElementById('lista-faculdade');
    if (!lista) return;
    lista.innerHTML = '';

    collegeTasks.sort((a, b) => a.date.localeCompare(b.date));

    collegeTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.done ? 'done' : '';
        
        const parts = task.date.split('-');
        let formattedDate = task.date;
        if (parts.length === 3) formattedDate = `${parts[2]}/${parts[1]}`;
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.done ? 'checked' : ''} onchange="toggleCollegeTask(${task.id})">
            <span class="info-tag tag-red">${formattedDate}</span>
            <span class="task-text">${task.title}</span>
            <button type="button" class="btn-del" onclick="deleteCollegeTask(${task.id})">✖</button>
        `;
        lista.appendChild(li);
    });
    localStorage.setItem('rpg_college', JSON.stringify(collegeTasks));
}

const formCollege = document.getElementById('form-college');
if (formCollege) {
    formCollege.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleEl = document.getElementById('col-title');
        const dateEl = document.getElementById('col-date');

        if (!titleEl || !dateEl) return;

        const title = titleEl.value.trim();
        const date = dateEl.value;

        if(!title || !date) return;

        collegeTasks.push({ id: Date.now(), title, date, done: false });
        
        formCollege.reset();
        
        renderCollegeTasks();
        if (typeof renderCalendar === 'function') renderCalendar();
        if (typeof updateTasksUI === 'function') updateTasksUI();
    });
}

window.toggleCollegeTask = function(id) {
    const task = collegeTasks.find(t => t.id === id);
    if(task) task.done = !task.done;
    renderCollegeTasks();
    if (typeof updateTasksUI === 'function') updateTasksUI();
}

window.deleteCollegeTask = function(id) {
    collegeTasks = collegeTasks.filter(t => t.id !== id);
    renderCollegeTasks();
    if (typeof renderCalendar === 'function') renderCalendar();
    if (typeof updateTasksUI === 'function') updateTasksUI();
}

renderCollegeTasks();