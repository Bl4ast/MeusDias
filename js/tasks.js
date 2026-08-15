let extraTasks = JSON.parse(localStorage.getItem('sys_extra_tasks')) || [];
let taskStatus = JSON.parse(localStorage.getItem('sys_task_status')) || {}; 

function getTodayFormatted() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function updateTasksUI() {
    const lista = document.getElementById('lista-rotinas');
    if (!lista) return;
    lista.innerHTML = '';
    
    const todayDateStr = getTodayFormatted(); 
    const todayDayOfWeek = new Date().getDay(); 

    let weeklyRoutine = JSON.parse(localStorage.getItem('sys_weekly_routine')) || {};
    let dailyRoutineItems = weeklyRoutine[todayDayOfWeek] || [];

    let scheduleItems = [];
    const savedSchedule = JSON.parse(localStorage.getItem('rpg_schedule')) || [];
    savedSchedule.forEach(item => {
        if (item.date === todayDateStr) {
            scheduleItems.push(`[Agenda] ${item.title} (${item.time})`);
        }
    });

    const collegeTasks = JSON.parse(localStorage.getItem('rpg_college')) || [];
    collegeTasks.forEach(item => {
        if(item.date === todayDateStr && !item.done) {
            scheduleItems.push(`[Faculdade] ${item.title}`);
        }
    });

    let allTodayItems = [
        ...dailyRoutineItems.map(text => ({ id: `rtn_${text.replace(/\s/g,'')}`, text: text, type: 'rotina' })),
        ...scheduleItems.map(text => ({ id: `sch_${text.replace(/\s/g,'')}`, text: text, type: 'compromisso' })),
        ...extraTasks
    ];

    let completedCount = 0;

    allTodayItems.forEach(task => {
        const isDone = taskStatus[task.id] || false;
        if (isDone) completedCount++;

        const li = document.createElement('li');
        li.className = isDone ? 'done' : '';
        
        let deleteBtnHTML = '';
        if (task.type === 'extra') {
            deleteBtnHTML = `<button type="button" class="btn-del" onclick="deleteExtraTask('${task.id}')">✖</button>`;
        }

        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${isDone ? 'checked' : ''} onchange="toggleTaskStatus('${task.id}')">
            <span class="task-text">${task.text}</span>
            ${deleteBtnHTML}
        `;
        lista.appendChild(li);
    });

    const countEl = document.getElementById('tasks-completed-count');
    if (countEl) countEl.innerText = completedCount;
}

const formTask = document.getElementById('form-task');
if (formTask) {
    formTask.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('input-task');
        if (!input || !input.value.trim()) return;

        extraTasks.push({ id: `ext_${Date.now()}`, text: input.value.trim(), type: 'extra' });
        input.value = '';
        
        localStorage.setItem('sys_extra_tasks', JSON.stringify(extraTasks));
        updateTasksUI();
    });
}

window.toggleTaskStatus = function(id) {
    taskStatus[id] = !taskStatus[id];
    localStorage.setItem('sys_task_status', JSON.stringify(taskStatus));
    updateTasksUI();
}

window.deleteExtraTask = function(id) {
    extraTasks = extraTasks.filter(t => t.id !== id);
    localStorage.setItem('sys_extra_tasks', JSON.stringify(extraTasks));
    updateTasksUI();
}

updateTasksUI();