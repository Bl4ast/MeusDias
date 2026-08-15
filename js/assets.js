function applyTheme(themeKey) {
    let savedThemes = JSON.parse(localStorage.getItem('sys_custom_themes')) || config.themes;
    let theme = savedThemes[themeKey] || config.themes.hanako;

    const root = document.documentElement;
    root.style.setProperty('--bg-dark', theme.bgDark);
    root.style.setProperty('--panel-bg', theme.panelBg);
    root.style.setProperty('--text-main', theme.textMain);
    root.style.setProperty('--text-muted', theme.textMuted);
    root.style.setProperty('--red-accent', theme.redAccent);
    root.style.setProperty('--green-accent', theme.greenAccent);
    root.style.setProperty('--border-color', theme.borderColor);

    const bg = document.getElementById('wallpaper-bg');
    if (bg) bg.style.backgroundImage = `url('${theme.wallpaper}')`;

    const prof = document.getElementById('profile-img');
    if (prof) prof.src = theme.profilePic;

    localStorage.setItem('sys_current_theme', themeKey);
}

window.addNewTheme = function(themeId, name, bgDark, panelBg, textMain, textMuted, redAccent, greenAccent, borderColor, wallpaper, profilePic) {
    let savedThemes = JSON.parse(localStorage.getItem('sys_custom_themes')) || config.themes;
    savedThemes[themeId] = { name, bgDark, panelBg, textMain, textMuted, redAccent, greenAccent, borderColor, wallpaper, profilePic };
    localStorage.setItem('sys_custom_themes', JSON.stringify(savedThemes));
    loadThemeSelector();
    applyTheme(themeId);
}

function loadThemeSelector() {
    const selector = document.getElementById('theme-selector');
    if (!selector) return;
    
    let savedThemes = JSON.parse(localStorage.getItem('sys_custom_themes')) || config.themes;
    let current = localStorage.getItem('sys_current_theme') || config.currentTheme;

    selector.innerHTML = '';
    for (let key in savedThemes) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.innerText = savedThemes[key].name;
        if (key === current) opt.selected = true;
        selector.appendChild(opt);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let current = localStorage.getItem('sys_current_theme') || config.currentTheme;
    applyTheme(current);
    loadThemeSelector();

    const selector = document.getElementById('theme-selector');
    if (selector) {
        selector.addEventListener('change', (e) => {
            applyTheme(e.target.value);
        });
    }
});
