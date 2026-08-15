let schedule = JSON.parse(localStorage.getItem('rpg_schedule')) || [];

function renderSchedule() {
    const listaFixos = document.getElementById('lista-fixos');
    const listaUnicos = document.getElementById('lista-unicos');
    if(!listaFixos || !listaUnicos) return;
    
    listaFixos.innerHTML = '';
    listaUnicos.innerHTML = '';

    schedule.forEach(ev => {
        const li = document.createElement('li');
        const dataStr = ev.date ? `(${ev.date})` : '';
        li.innerHTML = `
            <span class="info-tag">${ev.time}</span>
            <span class="task-text">${ev.title} ${dataStr}</span>
            <button type="button" class="btn-del" onclick="deleteSchedule(${ev.id})">✖</button>
        `;

        if (ev.type === 'fixo') {
            listaFixos.appendChild(li);
        } else {
            listaUnicos.appendChild(li);
        }
    });
    
    localStorage.setItem('rpg_schedule', JSON.stringify(schedule));
}

const formSchedule = document.getElementById('form-schedule');
if(formSchedule) {
    formSchedule.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const titleEl = document.getElementById('sch-title');
        const typeEl = document.getElementById('sch-type');
        const dateEl = document.getElementById('sch-date');
        const timeEl = document.getElementById('sch-time');

        if (!titleEl || !typeEl || !dateEl || !timeEl) return;

        const title = titleEl.value.trim();
        const type = typeEl.value;
        const date = dateEl.value;
        const time = timeEl.value;

        if(!title || !date || !time) return;

        schedule.push({ id: Date.now(), title, type, date, time });
        
        formSchedule.reset();
        
        renderSchedule();
        if(typeof renderCalendar === 'function') renderCalendar();
        if(typeof updateTasksUI === 'function') updateTasksUI();
    });
}

window.deleteSchedule = function(id) {
    schedule = schedule.filter(ev => ev.id !== id);
    renderSchedule();
    if(typeof renderCalendar === 'function') renderCalendar();
    if(typeof updateTasksUI === 'function') updateTasksUI();
}

renderSchedule();