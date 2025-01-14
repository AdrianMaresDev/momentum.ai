//Authentication
let token = localStorage.getItem('token');

let isLoading = false;
let isAuthenticating = false;
let isRegistration = false;
let tasks = [];

const apiBase = '/';

const authBtn = document.getElementById('auth-btn');
const registerBtn = document.getElementById('register-btn');
const password = document.getElementById('password');
const error = document.getElementById('error-msg');

authBtn.addEventListener('click', authenticate);
registerBtn.addEventListener('click', toggleIsRegister);

//Add function to render tasks later

async function toggleIsRegister() {
    isRegistration = !isRegistration;
}

async function authenticate() {

    //Access email and password values
    const emailVal = email.value;
    const passVal = password.value;

    //Guard clauses
    if(
        isLoading ||
        isAuthenticating ||
        !emailVal ||
        !passVal ||
        passVal.length < 6 ||
        !emailVal.includes('@')
    ) { return }

    //Reset error and set isAuthenticating to true
    //Add error message to HTML later
    error.style.display = 'none';
    isAuthenticating = true;
    authBtn.innerText = 'Authenticating';

    try {
        let data;
        if(isRegistration) {
            //Create an account
            const response = await fetch(apiBase + 'auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: emailVal, password: passVal })
            });
            data = await response.json();
        } else {
            //Log into existing account
            const response = await fetch(apiBase + 'auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: emailVal, password: passVal })
            });
            data = await response.json();
        }
        if(data.token) {
            token = data.token;
            localStorage.setItem('token', token);

            //Move into loading
            authBtn.innerText = 'Loading';

            //Fetch tasks, create function later
            await fetchTasks();

            //Show dashboard
            showDashboard();
        } else {
            throw Error('Failed to Authenticate')
        }
    } catch(err) {
        console.log(err.message);
        error.innerText = err.message;
        error.style.display = 'block';
    } finally {
        authBtn.innerText = 'Submit';
        isAuthenticating = false;
    }
}

function logout() {
    //Clear cached token and clear states
}

//Task fetch logic
async function fetchTasks() {
    isLoading = true;
    const response = await fetch(apiBase + 'tasks', {
        headers: { 'Authorization': token }
    });
    const taskData = await response.json();
    tasks = taskData;
    isLoading = false;
    renderTasks();
}

async function updateTask(index) {
    //Set task complete status to true
    await fetch(apiBase + 'tasks' + '/' + index, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ task: tasks.find(val => val.id === index).task,
            completed: 1
         })
    });
    fetchTasks();
}

async function deleteTask(index) {
    //Set task complete status to true
    await fetch(apiBase + 'tasks' + '/' + index, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        },
    });
    fetchTasks();
}

async function addTask() {
    //Need to access this value later on. This page hasn't been created yet
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value;

    if(!task) { return }

    await fetch(apiBase + 'tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ task })
    });
    taskInput.value = '';
    fetchTasks();
}

//Utility functions

//Load page and read local storage for key
//Default to login screen and show data if authenticated
//Reuse this logic for the study session logs
if(token) {
    async function run() {
        await fetchTasks();
        showDashboard();
    }
    run();
}