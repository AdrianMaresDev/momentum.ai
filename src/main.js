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
let breakTime;
let studyTime;
let numSessions;

//Form submission to prevent page from refreshing
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get user input for the timer as a number
    const studyTime = parseInt(document.getElementById('study-time').value, 10) || 0;
    const breakTime = parseInt(document.getElementById('break-time').value, 10) || 0;
    const numSessions = parseInt(document.getElementById('num-sessions').value, 10) || 0;

    //Convert time to milliseconds
    setTime = studyTime * 60000;
    const startTime = Date.now();
    futureTime = startTime + setTime;

    //Clear any existing timer
    if(timerLoop) clearInterval(timerLoop);

    countDownTimer();
});

function countDownTimer() {
    function updateTimer() {
        const currentTime = Date.now();
        const remainingTime = futureTime - currentTime;

        if(remainingTime > 0) {
            updateDisplay(remainingTime);
            updateSemicircles(remainingTime);
            timerLoop = requestAnimationFrame(updateTimer);
        } else {
            stopTimer();
        }
    }
    timerLoop = requestAnimationFrame(updateTimer);
}

function stopTimer() {
    if(timerLoop) cancelAnimationFrame(timerLoop);
    handleCompletion();
}

function updateDisplay(remainingTime) {
    const mins = Math.floor(remainingTime / 60000);
    const secs = Math.floor((remainingTime % 60000) / 1000);
}

function updateSemicircles(remainingTime) {
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

//Change timer from study to break time
let currentSession = 1;
let isStudying = true;

function startBreak() {
    if(isStudying && futureTime - Date.now() <= 0) {
        isStudying = false;
        setTime = breakTime * 60000;
        const startTime = Date.now();
        futureTime = startTime + setTime;

        //Update UI for the break phase
        updateDisplay(setTime);
        updateSemicircles(setTime);

        countDownTimer();
        console.log(`Starting break for session ${currentSession}.`)
    }
}

function startStudy() {
    if(!isStudying && futureTime - Date.now() <= 0) {
        currentSession++;
        if(currentSession > numSessions) {
            endSessions();
            return;
        }
        isStudying = true;
        setTime = studyTime * 60000;
        const startTime = Date.now();
        futureTime = startTime + setTime;

        //Update UI for study phase
        updateDisplay(setTime);
        updateSemicircles(setTime);

        countDownTimer();
        console.log(`Starting study for session ${currentSession}.`);
    }
}

function handleCompletion() {
    if(isStudying) {
        startBreak();
    } else {
        startStudy();
    }
}

function endSessions() {
    minsDisplay.textContent = '00';
    secsDisplay.textContent = '00';
    console.log('All sessions complete.');
}