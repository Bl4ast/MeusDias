window.addEventListener('DOMContentLoaded', () => {
    const bg = document.getElementById('wallpaper-bg');
    if (bg) {
        bg.style.backgroundImage = `url('${config.images.wallpaper}')`;
    }
    
    const prof = document.getElementById('profile-img');
    if (prof) {
        prof.src = config.images.profilePic;
    }
});