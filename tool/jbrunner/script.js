document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const strPSINum = document.querySelector('.navbar .psi .num');

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

    async function showPSI(){
        try {
            const data = await getJohorBahruAPI();

            if (!data || data.api == null) {
                throw new Error("PSI data unavailable");
            }

            const num = data.api;

            console.log(num);
            strPSINum.innerHTML = num;

            strPSINum.classList.remove("red", "yellow", "green");

            switch (true) {
                case num > 200:
                    strPSINum.classList.add("red");
                    break;
                case num > 100:
                    strPSINum.classList.add("yellow");
                    break;
                default:
                    strPSINum.classList.add("green");
            }
        } catch (error) {
            console.error("Unable to show PSI:", error);
            strPSINum.innerHTML = "--";
            strPSINum.classList.remove("red", "yellow", "green");
        }
    }
    showPSI();

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
