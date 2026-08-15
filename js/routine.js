let sysWeeklyRoutine = JSON.parse(localStorage.getItem('sys_weekly_routine')) || {
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
};

const routineDaySelect = document.getElementById('routine-day');
const routineLabel = document.getElementById('current-routine-day-label');
const routineList = document.getElementById('lista-editar-rotina');

function renderRoutineEditor() {
    if(!routineDaySelect || !routineList || !routineLabel) return;

    const day = routineDaySelect.value;
    routineLabel.innerText = routineDaySelect.options[routineDaySelect.selectedIndex].text;
    routineList.innerHTML = '';

    const items = sysWeeklyRoutine[day] || [];
    
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${item}</span>
            <button type="button" class="btn-del" onclick="deleteRoutineItem('${day}', ${index})">✖</button>
        `;
        routineList.appendChild(li);
    });
    
    localStorage.setItem('sys_weekly_routine', JSON.stringify(sysWeeklyRoutine));
    
    if (typeof updateTasksUI === 'function') {
        updateTasksUI();
    }
}

const formRoutine = document.getElementById('form-routine');
if (formRoutine) {
    formRoutine.addEventListener('submit', (e) => {
        e.preventDefault();
        const day = routineDaySelect.value;
        const input = document.getElementById('routine-input');
        
        if (!input) return;
        const val = input.value.trim();
        
        if(!val) return;

        if (!sysWeeklyRoutine[day]) sysWeeklyRoutine[day] = [];
        sysWeeklyRoutine[day].push(val);
        input.value = '';
        
        renderRoutineEditor();
    });
}

if (routineDaySelect) {
    routineDaySelect.addEventListener('change', renderRoutineEditor);
}

window.deleteRoutineItem = function(day, index) {
    if (sysWeeklyRoutine[day]) {
        sysWeeklyRoutine[day].splice(index, 1);
        renderRoutineEditor();
    }
}

renderRoutineEditor();