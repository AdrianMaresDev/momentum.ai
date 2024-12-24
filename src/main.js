const navOpenToggle = document.getElementById('open-nav-toggle');
const navLinks = document.getElementById('nav-links');


//Navigation Toggle
navOpenToggle.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navOpenToggle.classList.toggle('rotate-animation-close');
});