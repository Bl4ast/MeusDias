window.addEventListener('DOMContentLoaded', () => {
    const textElements = [
        'badgeProfile', 'titleFinances', 'labelBalance', 'titleExtrato', 
        'titleCommissions', 'btnCommAdd', 'titleWorkspace', 'titleCalendar', 
        'titleAgenda', 'btnAgendaAdd', 'titleCollege', 'btnCollegeAdd', 
        'badgeProd', 'titleTasks', 'btnTaskAdd', 'labelToday'
    ];
    textElements.forEach(key => {
        const el = document.getElementById(`txt-${key}`);
        if(el) el.innerText = config.texts[key];
    });

    const btnReceive = document.querySelector('.txt-btnReceive');
    if(btnReceive) btnReceive.innerText = config.texts.btnReceive;
    
    const btnSpend = document.querySelector('.txt-btnSpend');
    if(btnSpend) btnSpend.innerText = config.texts.btnSpend;
    
    const btnTabOpen = document.querySelector('.txt-btnTabOpen');
    if(btnTabOpen) btnTabOpen.innerText = config.texts.btnTabOpen;
    
    const btnTabProcess = document.querySelector('.txt-btnTabProcess');
    if(btnTabProcess) btnTabProcess.innerText = config.texts.btnTabProcess;
    
    const btnTabDone = document.querySelector('.txt-btnTabDone');
    if(btnTabDone) btnTabDone.innerText = config.texts.btnTabDone;

    const finDesc = document.getElementById('fin-desc');
    if(finDesc) finDesc.placeholder = config.texts.phFinance;
    
    const commTitle = document.getElementById('comm-title');
    if(commTitle) commTitle.placeholder = config.texts.phComm;
    
    const schTitle = document.getElementById('sch-title');
    if(schTitle) schTitle.placeholder = config.texts.phAgenda;
    
    const colTitle = document.getElementById('col-title');
    if(colTitle) colTitle.placeholder = config.texts.phCollege;
    
    const inputTask = document.getElementById('input-task');
    if(inputTask) inputTask.placeholder = config.texts.phTask;

    const routineInput = document.getElementById('routine-input');
    if(routineInput) routineInput.placeholder = config.texts.phRoutine;
});