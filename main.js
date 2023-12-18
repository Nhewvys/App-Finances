const urlParams = new URLSearchParams(window.location.search);
const sectionCode = urlParams.get('section-code');

const sections = document.querySelectorAll('section');
const allSideMenu = document.querySelectorAll('.sidebar ul .sidemenu-main li');
const menu = document.querySelector('.fa-solid.fa-bars');
const sidebar = document.querySelector('.sidebar');

function showSection(sectionId) {
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

function setActiveMenuItem(sectionId) {
    allSideMenu.forEach(item => {
        const itemId = item.querySelector('i').getAttribute('id');
        item.classList.toggle('active', itemId === sectionId);
    });
}

function updateUrlAndState(sectionId) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('section-code', sectionId);

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    history.pushState({}, '', newUrl);
}

function handleSideMenuItemClick(event) {
    event.preventDefault();

    const sectionId = this.querySelector('i').getAttribute('id');
    updateUrlAndState(sectionId);

    allSideMenu.forEach(i => i.classList.remove('active'));
    this.classList.add('active');

    showSection(sectionId);
}

function handleMenuClick() {
    sidebar.classList.toggle('hide');
}

// Show default section or section from URL
if (sectionCode) {
    showSection(sectionCode);
    setActiveMenuItem(sectionCode);
} else {
    // Show the first section by default
    showSection(sections[0].id);
    allSideMenu[0].classList.add('active');
}

// Event listeners
menu.addEventListener('click', handleMenuClick);
allSideMenu.forEach(item => item.addEventListener('click', handleSideMenuItemClick));

