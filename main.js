document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const sectionCode = urlParams.get('section-code');

    const sections = document.querySelectorAll('section');

    if (sectionCode) {
        sections.forEach(section => {
            if (section.id === sectionCode) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        const allSideMenu = document.querySelectorAll('.sidebar ul .sidemenu-main li');
        allSideMenu.forEach(item => {
            if (item.querySelector('i').getAttribute('id') === sectionCode) {
                allSideMenu.forEach(i => {
                    i.classList.remove('active');
                });
                item.classList.add('active');
            }
        });
    } else {
        // Se não houver nenhum 'section-code' na URL, exibe a primeira seção por padrão
        sections[0].style.display = 'block';
        // Adicione a classe 'active' ao primeiro item do menu por padrão
        const allSideMenu = document.querySelectorAll('.sidebar ul .sidemenu-main li');
        allSideMenu[0].classList.add('active');
    }

    const menu = document.querySelector('.fa-solid.fa-bars');
    const sidebar = document.querySelector('.sidebar');

    menu.addEventListener('click', () => {
        sidebar.classList.toggle('hide');
    });

    const allSideMenu = document.querySelectorAll('.sidebar ul .sidemenu-main li');
    allSideMenu.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Evita o comportamento padrão do link

            const sectionId = item.querySelector('i').getAttribute('id');
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set('section-code', sectionId);

            const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
            history.pushState({}, '', newUrl);

            // Adiciona a classe 'active' ao item do menu clicado
            allSideMenu.forEach(i => {
                i.classList.remove('active');
            });
            item.classList.add('active');

            sections.forEach(section => {
                if (section.id === sectionId) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
});
