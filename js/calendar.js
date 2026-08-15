const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const calMonth = document.getElementById('cal-month');
    if (calMonth) calMonth.innerText = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const grid = document.getElementById('cal-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const collegeTasks = JSON.parse(localStorage.getItem('rpg_college')) || [];
    const commissions = JSON.parse(localStorage.getItem('sys_commissions')) || [];
    const schedules = JSON.parse(localStorage.getItem('rpg_schedule')) || [];

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-day empty';
        grid.appendChild(empty);
    }
    
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'cal-day';
        dayEl.innerText = i;
        
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayEl.classList.add('today');
        }

        const strMonth = String(month + 1).padStart(2, '0');
        const strDay = String(i).padStart(2, '0');
        const dateStr = `${year}-${strMonth}-${strDay}`;

        let events = [];
        collegeTasks.forEach(t => { if(t.date === dateStr) events.push(` ${t.title}`); });
        commissions.forEach(c => { if(c.date === dateStr) events.push(` ${c.title}`); });
        schedules.forEach(s => { if(s.date === dateStr) events.push(` ${s.title}`); });

        if (events.length > 0) {
            const dot = document.createElement('div');
            dot.className = 'cal-dot';
            dayEl.appendChild(dot);

            const tooltip = document.createElement('div');
            tooltip.className = 'cal-tooltip';
            tooltip.innerHTML = events.join('<br>');
            dayEl.appendChild(tooltip);
        }

        grid.appendChild(dayEl);
    }
}

const calPrev = document.getElementById('cal-prev');
if (calPrev) {
    calPrev.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
}

const calNext = document.getElementById('cal-next');
if (calNext) {
    calNext.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

window.addEventListener('focus', renderCalendar);
renderCalendar();
