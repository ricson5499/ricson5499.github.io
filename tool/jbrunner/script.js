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

    async function showPSI(){
        try {
            const data = await getJohorBahruAPI();

            if (!data) {
                throw new Error("PSI data unavailable");
            }

            const location = data.location || "";
            const date = data.updatedAt || "";
            const num = data.api || "";

            const strStatus = `${location} - ${num} - ${date}`;

            const strPSIStatus = document.querySelector('.navbar .psi .status');

            strPSIStatus.innerHTML = strStatus;
            strPSIStatus.classList.remove("red", "yellow", "green");

            switch (true) {
                case num > 200:
                    strPSIStatus.classList.add("red");
                    break;
                case num > 100:
                    strPSIStatus.classList.add("yellow");
                    break;
                default:
                    strPSIStatus.classList.add("green");
            }
            
        } catch (error) {
            console.error("Unable to show PSI:", error);
            strPSIStatus.innerHTML = "--";
            strPSIStatus.classList.remove("red", "yellow", "green");
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
