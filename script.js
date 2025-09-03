function isLargeScreen() {
    return window.matchMedia('(min-width: 901px)').matches;
}

function updateToggleButtonVisibility() {
    document.getElementById('toggle-dark').style.display = isLargeScreen() ? 'inline-block' : 'none';
    if (!isLargeScreen() && document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
    }
}

function updateToggleButtonIcon() {
    const btn = document.getElementById('toggle-dark');
    btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌓';
}

document.addEventListener('DOMContentLoaded', function () {
    updateToggleButtonVisibility();
    updateToggleButtonIcon();
    window.addEventListener('resize', updateToggleButtonVisibility);
    document.getElementById('toggle-dark').addEventListener('click', function () {
        if (isLargeScreen()) {
            document.body.classList.toggle('dark-mode');
            updateToggleButtonIcon();
        }
    });
});
