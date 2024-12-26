const navOpenToggle = document.getElementById('open-nav-toggle');
const navLinks = document.getElementById('nav-links');


//Navigation Toggle
navOpenToggle.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navOpenToggle.classList.toggle('rotate-animation-close');
});

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
const form = document.getElementById('pomodoro-form');
const minsDisplay = document.getElementById('minutes');
const secsDisplay = document.getElementById('seconds');



let timerLoop;
let futureTime;
let setTime;

//Form Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get user input for the timer
    const studyTime = parseInt(document.getElementById('study-time').value, 10) || 0;
    const breakTime = parseInt(document.getElementById('break-time').value, 10) || 0;
    const numSessions = parseInt(document.getElementById('num-sessions').value, 10) || 0;

    //Convert time to milliseconds
    setTime = studyTime * 60000;
    const startTime = Date.now();
    futureTime = startTime + setTime;

    if(timerLoop) clearInterval(timerLoop);

    timerLoop = setInterval(() => countDownTimer(futureTime, setTime), 1000);
    countDownTimer(futureTime, setTime);
});

//Countdown Timer
function countDownTimer(futureTime, setTime) {
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

    if(remainingTime >= 0) {
        const mins = Math.floor(remainingTime / 60000);
        const secs = Math.floor((remainingTime % 60000) / 1000);
        minsDisplay.textContent = String(mins).padStart(2, '0');
        secsDisplay.textContent = String(secs).padStart(2, '0');
    } else {
        clearInterval(timerLoop);
        minsDisplay.textContent = '00';
        secsDisplay.textContent = '00';
    }
}