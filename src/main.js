const navOpen = document.getElementById('open-nav-toggle');
const navLinks = document.getElementById('nav-links');

navOpen.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
});