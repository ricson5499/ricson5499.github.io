document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const thumbnails = document.querySelectorAll('.thumbnail');

    function showPage(pageName) {
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        const targetPage = document.getElementById(pageName);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        const activeLink = document.querySelector(`[data-page="${pageName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.getAttribute('data-page');
            showPage(pageName);
        });
    });

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const pageName = thumbnail.getAttribute('data-page');
            showPage(pageName);
        });
    });
});
