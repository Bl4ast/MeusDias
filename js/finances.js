let finances = JSON.parse(localStorage.getItem('sys_finances')) || { income: 0, expense: 0, history: [] };

if (!finances.history) finances.history = [];

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function updateFinanceUI() {
    const balance = finances.income - finances.expense;
    const totalBalanceEl = document.getElementById('total-balance');
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpenseEl = document.getElementById('total-expense');
    const extratoLista = document.getElementById('lista-extrato');

    if (totalBalanceEl) totalBalanceEl.innerText = formatCurrency(balance);
    if (totalIncomeEl) totalIncomeEl.innerText = finances.income.toFixed(2).replace('.', ',');
    if (totalExpenseEl) totalExpenseEl.innerText = finances.expense.toFixed(2).replace('.', ',');
    if (totalBalanceEl) totalBalanceEl.style.color = balance < 0 ? 'var(--red-accent)' : 'var(--text-main)';
    
    if (extratoLista) {
        extratoLista.innerHTML = '';
        if (finances.history.length === 0) {
            extratoLista.innerHTML = `<li style="justify-content: center; color: var(--text-muted); font-size: 0.78rem;">Extrato vazio</li>`;
        } else {
            const historicoReverso = [...finances.history].reverse();
            historicoReverso.forEach(item => {
                const li = document.createElement('li');
                li.className = 'extrato-item';
                const isPos = item.type === 'income';
                li.innerHTML = `
                    <span style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.desc}</span>
                    <span class="ext-val ${isPos ? 'pos' : 'neg'}">${isPos ? '+' : '-'} R$ ${item.val.toFixed(2)}</span>
                `;
                extratoLista.appendChild(li);
            });
        }
    }

    localStorage.setItem('sys_finances', JSON.stringify(finances));
}

window.addFinanceTransaction = function(type, desc, valor) {
    if (type === 'income') finances.income += valor;
    else finances.expense += valor;
    
    finances.history.push({ desc: desc, val: valor, type: type });
    updateFinanceUI();
}

window.clearExtrato = function() {
    if(confirm("Deseja realmente limpar o extrato e zerar as somas de entrada/saída?")) {
        finances.income = 0;
        finances.expense = 0;
        finances.history = [];
        updateFinanceUI();
    }
}

const btnRecebi = document.getElementById('btn-recebi');
if (btnRecebi) {
    btnRecebi.addEventListener('click', () => {
        const descEl = document.getElementById('fin-desc');
        const valorEl = document.getElementById('fin-valor');
        if (!descEl || !valorEl) return;
        
        const desc = descEl.value.trim();
        const val = parseFloat(valorEl.value);
        if(!desc || isNaN(val) || val <= 0) {
            alert("Preencha a descrição e um valor válido!");
            return;
        }
        
        window.addFinanceTransaction('income', desc, val);
        descEl.value = '';
        valorEl.value = '';
    });
}

const btnGastei = document.getElementById('btn-gastei');
if (btnGastei) {
    btnGastei.addEventListener('click', () => {
        const descEl = document.getElementById('fin-desc');
        const valorEl = document.getElementById('fin-valor');
        if (!descEl || !valorEl) return;
        
        const desc = descEl.value.trim();
        const val = parseFloat(valorEl.value);
        if(!desc || isNaN(val) || val <= 0) {
            alert("Preencha a descrição e um valor válido!");
            return;
        }
        
        window.addFinanceTransaction('expense', desc, val);
        descEl.value = '';
        valorEl.value = '';
    });
}

updateFinanceUI();