const taskForm = document.getElementById('task-form');
const taskHeader = document.getElementById('task-header');
const closeDialog = document.getElementById('close-dialog');
const openTaskForm = document.getElementById('open-form-btn');
const closeTaskForm = document.getElementById('close-form-btn');
const addTask = document.getElementById('add-task-btn');
const discardTask = document.getElementById('discard-btn');
const cancelTask = document.getElementById('cancel-btn');
const taskContainer = document.getElementById('task-container');
const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const detailInput = document.getElementById('detail-input');
const subHeader = document.getElementById('subheader');

//Task Form

const taskData = [];
let currentTask = {};

//Check if the task list is empty and update the subheader accordingly
function updateSubHeader () {
    if (taskData.length > 0) {
        subHeader.innerText = "Click on a task to view details."
    } else {
        subHeader.innerText = "Your list is currently empty. Use the button below to add a task."
    }
};

updateSubHeader();

//Open and close the task form
openTaskForm.addEventListener('click', () => {
    taskForm.classList.toggle('hidden');
    taskHeader.classList.toggle('hidden');
});

closeTaskForm.addEventListener('click', () => {
    closeDialog.showModal();
});

discardTask.addEventListener('click', () => {
    taskForm.classList.toggle('hidden');
    taskHeader.classList.toggle('hidden');

    //Clear the task form
    taskForm.reset();
});

cancelTask.addEventListener('click', () => {
    closeDialog.close();
});

taskForm.addEventListener('submit', (event) => {

    //Prevent page refresh when form is submitted
    event.preventDefault();

    //Check if the task already exists
    const taskArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
    const taskList = {

    //Create a unique ID for each task
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    details: detailInput.value,
}

console.log(taskList);
});