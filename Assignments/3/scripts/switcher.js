document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-button');
    const themeStylesheet = document.getElementById('css-theme');

    // Guard: if we can't find the <link>, bail early with a hint.
    if (!themeStylesheet) {
        console.error('Theme switcher: <link id="css-theme"> not found in <head>.');
        return;
    }

    function setActiveTheme(themeName) {
        // Update stylesheet href
        themeStylesheet.href = `styles/${themeName}.css`;

        // Update active state
        themeButtons.forEach(btn => {
            const isActive = btn.dataset.theme === themeName;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });

        // Persist
        localStorage.setItem('preferredTheme', themeName);
        console.log(`Theme switched to: ${themeName}`);
    }

    // Wire up clicks
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveTheme(button.dataset.theme);
        });
    });

    // Init (restore previous theme if any)
    const saved = localStorage.getItem('preferredTheme');
    if (saved) setActiveTheme(saved);
    else {
        // derive current file name from the link as a sane default
        const m = themeStylesheet.getAttribute('href')?.match(/styles\/(.+)\.css$/);
        setActiveTheme(m ? m[1] : 'styles');
    }
});
