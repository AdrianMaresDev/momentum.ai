const navOpenToggle = document.getElementById('open-nav-toggle');
const navLinks = document.getElementById('nav-links');


//Navigation Toggle
navOpenToggle.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navOpenToggle.classList.toggle('rotate-animation-close');
});

//Get user input for the timer
let studyTime = document.getElementById('study-time').value;
let breakTime = document.getElementById('break-time').value;
let numSessions = document.getElementById('num-sessions').value;

//TODO
//Display time depending on user input, counting up to the break.
//Upon completion, do the same thing with the break input.
//Loop through study and breaks depending on the number of sessions entered.

//DISPLAY
//When user clicks start timer, hide input form and only display timer.
//Change start timer button to switch between start and pause.

//Progress bar or timer? Both? Find a way to display the total time spent studying.
//Display circle around the time display?

//Timer Functionality
const semicircles = document.querySelectorAll('.semicircle');

const hr = 0;
const min = 0;
const sec = 10;

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;
const startTime = Date.now();
const futureTime = startTime + setTime;

const timerLoop = setInterval(countDownTimer);
countDownTimer();

function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

    if(angle > 180) {
        semicircles[2].style.display = 'none';
        semicircles[0].style.transform = 'rotate(180deg)';
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircles[2].style.display = 'block';
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }

    if(remainingTime < 0) {
        clearInterval(timerLoop);
        semicircles[0].style.display = 'none';
        semicircles[1].style.display = 'none';
        semicircles[2].style.display = 'none';
    }
}