const openFormButton = document.getElementById("open-form-btn");
const closeFormButton = document.getElementById("close-task-form-btn");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const taskForm = document.getElementById("task-form");
const popUpWindow = document.getElementById("pop-up-window");
const cancelButton = document.getElementById("cancel-btn");
const discardButton = document.getElementById("discard-btn");
const tasksList = document.getElementById("tasks-list");


const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};


openFormButton.addEventListener("click", () => {
    taskForm.classList.toggle("hidden");
});

closeFormButton.addEventListener("click", () => {
    if (titleInput.value || dateInput.value || descriptionInput.value) {
        popUpWindow.showModal();
    } else {
        reset();        
    };
});

discardButton.addEventListener("click", () => {
    popUpWindow.close();
    reset();
});

cancelButton.addEventListener("click", () => {
    popUpWindow.close();
});



const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    currentTask = {};
    taskForm.classList.toggle("hidden");
};

const editButtonClicked = (element) => {
    const retrievedId = element.parentElement.id;
    currentTask = taskData.find((item) => item.id === retrievedId);
    taskForm.classList.toggle("hidden");
    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;
}

const deleteButtonClicked = (element) => {
    const retrievedId = element.parentElement.id;
    const currentTaskIndex = taskData.findIndex((item) => item.id === retrievedId);
    taskData.splice(currentTaskIndex, 1);
    element.parentElement.remove();
    localStorage.setItem("data", JSON.stringify(taskData));
}

const updateTaskArray = () => {
    if ((!titleInput.value && !dateInput.value && !descriptionInput.value) || titleInput.value.trim().length === 0) {
        alert("Please enter in the text before press submit!");
        return;
    } 

    const newObj = {
        id : `${titleInput.value.split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
    };

    const currentTaskIndex = taskData.findIndex((item) => item.id === currentTask.id);

    if (currentTaskIndex === -1) {
        taskData.unshift(newObj);
    } else {
        taskData[currentTaskIndex] = newObj;
    };
    localStorage.setItem("data", JSON.stringify(taskData));
};


const renderArray = () => {
    tasksList.innerHTML = "";

    taskData.forEach(({id, title, date, description}) => {
        HTMLString = `
            <div class = "task-entry" id = "${id}">
                <button class = "edit-button" onclick = "editButtonClicked(this)">
                    <p class = "text-inside-button"><strong>Title: </strong>${title}</p>
                    <p class = "text-inside-button"><strong>Date: </strong>${date}</p>
                    <p class = "text-inside-button"><strong>Description: </strong>${description}</p>
                </button>
                <button class = "delete-button" onclick = "deleteButtonClicked(this)">
                    Delete
                </button>
            </div>
        `
        tasksList.innerHTML += HTMLString;
    });
};


const addOrUpdateTask = (e) => {
    e.preventDefault();
    updateTaskArray();
    renderArray();

    reset();
};

taskForm.addEventListener("submit", addOrUpdateTask);

if (taskData) {
    renderArray();
};






