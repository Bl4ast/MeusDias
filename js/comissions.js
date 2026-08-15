let commissions = [];
try {
    commissions = JSON.parse(localStorage.getItem('sys_commissions')) || [];
    if (!Array.isArray(commissions)) commissions = [];
} catch (e) {
    commissions = [];
}
let currentTab = 'aberto';

function formatShortDate(dateStr) {
    if(!dateStr) return 'Sem Prazo';
    try {
        const parts = dateStr.split('-');
        if(parts.length !== 3) return dateStr;
        return `${parts[2]}/${parts[1]}`;
    } catch(e) { return 'Sem Prazo'; }
}

function renderCommissions() {
    const lista = document.getElementById('lista-comissoes');
    if (!lista) return;
    lista.innerHTML = '';

    const filtered = commissions.filter(c => c.status === currentTab);

    if (filtered.length === 0) {
        lista.innerHTML = `<li style="justify-content: center; color: var(--text-muted); font-size: 0.8rem;">Nenhum item nesta aba</li>`;
    }

    filtered.forEach(comm => {
        const li = document.createElement('li');
        li.style.flexWrap = 'wrap'; 
        
        let actionsHTML = '';
        if (comm.status === 'aberto') {
            actionsHTML = `
                <span class="info-tag tag-red">Prazo: ${formatShortDate(comm.date)}</span>
                <button type="button" class="info-tag tag-blue" style="cursor:pointer; background: transparent; border: 1px solid #4a90e2;" onclick="changeCommStatus(${comm.id}, 'processo')">▶ Mover p/ Processo</button>
            `;
        } else if (comm.status === 'processo') {
            actionsHTML = `
                <span class="info-tag tag-blue">Em andamento</span>
                <button type="button" class="info-tag tag-green" style="cursor:pointer; background: transparent; border: 1px solid var(--green-accent);" onclick="finalizeCommission(${comm.id})">✔️ Concluir (Enviar $)</button>
            `;
        } else {
            actionsHTML = `<span class="info-tag tag-green">Finalizada no Histórico</span>`;
        }

        const safeVal = Number(comm.val) || 0;
        const safeTitle = comm.title || 'Comissão sem nome';

        li.innerHTML = `
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <span class="task-text" style="font-weight: bold;">${safeTitle}</span>
                <span class="info-tag">R$ ${safeVal.toFixed(2)}</span>
            </div>
            <div style="width: 100%; display: flex; gap: 8px; align-items: center;">
                ${actionsHTML}
                <button type="button" class="btn-del" onclick="deleteCommission(${comm.id})">✖</button>
            </div>
        `;
        lista.appendChild(li);
    });

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeTab = document.getElementById(`tab-${currentTab}`);
    if (activeTab) activeTab.classList.add('active');

    localStorage.setItem('sys_commissions', JSON.stringify(commissions));
}

window.switchCommTab = function(tabName) {
    currentTab = tabName;
    renderCommissions();
};

const formComm = document.getElementById('form-comm');
if (formComm) {
    formComm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const titleEl = document.getElementById('comm-title');
        const valEl = document.getElementById('comm-val');
        const dateEl = document.getElementById('comm-date');
        
        if (!titleEl || !valEl || !dateEl) return;
        
        const title = titleEl.value.trim();
        const val = parseFloat(valEl.value) || 0;
        const date = dateEl.value;

        if(!title || !date) return;

        commissions.push({ id: Date.now(), title, val, date, status: 'aberto' });
        
        formComm.reset();
        currentTab = 'aberto'; 
        renderCommissions();
        
        if (typeof renderCalendar === 'function') renderCalendar();
    });
}

window.changeCommStatus = function(id, newStatus) {
    const comm = commissions.find(c => c.id === id);
    if(comm) { comm.status = newStatus; renderCommissions(); }
}

window.finalizeCommission = function(id) {
    const comm = commissions.find(c => c.id === id);
    if(comm && comm.status !== 'finalizada') {
        comm.status = 'finalizada';
        if(typeof window.addFinanceTransaction === 'function') {
            window.addFinanceTransaction('income', `Comissão: ${comm.title}`, comm.val);
        }
        currentTab = 'finalizada'; 
        renderCommissions();
    }
}

window.deleteCommission = function(id) {
    commissions = commissions.filter(c => c.id !== id);
    renderCommissions();
    if (typeof renderCalendar === 'function') renderCalendar();
}

try {
    renderCommissions();
} catch(e) {
    commissions = [];
    localStorage.setItem('sys_commissions', JSON.stringify([]));
    renderCommissions();
}