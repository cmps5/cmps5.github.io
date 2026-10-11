(function () {
    const root = document.documentElement;
    const header = document.getElementById('header');
    const themeBtn = document.getElementById('theme-toggle');
    const menuBtn = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-links');

    /* ---------- Theme ---------- */
    function currentTheme() {
        return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }
    function renderThemeIcon() {
        themeBtn.textContent = currentTheme() === 'dark' ? '☀️' : '🌙';
    }
    themeBtn.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) { }
        renderThemeIcon();
    });
    renderThemeIcon();

    /* ---------- Mobile menu ---------- */
    function closeMenu() {
        navList.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
    }
    menuBtn.addEventListener('click', () => {
        const open = navList.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.textContent = open ? '✕' : '☰';
    });
    navList.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    /* ---------- Header shadow on scroll ---------- */
    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Active nav link ---------- */
    const links = Array.from(navList.querySelectorAll('a'));
    const sections = links
        .map(a => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = '#' + entry.target.id;
                    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(s => spy.observe(s));

        /* ---------- Reveal on scroll ---------- */
        const reveal = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    reveal.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
    }
})();