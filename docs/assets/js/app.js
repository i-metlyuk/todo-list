import {getUsersFromLocalStorage, setInitialTheme, getCurrentUserFromSessionStorage, updateLocalStorage, updateSessionStorage, setInitialLanguage} from '/assets/js/storage.js';
import {internationalization} from '/assets/js/internationalization.js';

let users = getUsersFromLocalStorage('users');
let currentUser = getCurrentUserFromSessionStorage('currentUser');
let currentTheme = setInitialTheme('currentTheme');
let currentLanguage = setInitialLanguage('currentLanguage');
let editButtons = document.querySelectorAll("[data-edit]");
let deleteButtons = document.querySelectorAll("[data-delete]");
let completeButtons = document.querySelectorAll("[data-complete]");
let currentTask;
let currentTasksCounterSpan = document.querySelector('#currentTasksCounter');
let completedTasksCounterSpan = document.querySelector('#completedTasksCounter');
let currentTasksList = document.querySelector('#currentTasks');
let completedTasksList = document.querySelector('#completedTasks');
const editTaskButton = document.querySelector('#sendTask1');
const sortToMaxButton = document.querySelector('#sort');
const sortToMinButton = document.querySelector('#sort1');
const addTaskButton = document.querySelector('#sendTask');
const logoutButton = document.querySelector("#logout");
const addTaskTitleField = document.querySelector('#inputTitle');
const addTaskTextField = document.querySelector('#inputText');
const editTaskTitleField = document.querySelector('#inputTitle1');
const editTaskTextField = document.querySelector('#inputText1');
const addTaskRadios = document.querySelectorAll('input[name="gridRadios"]');
const editTaskRadios = document.querySelectorAll('input[name="gridRadios1"]');
const themeRadios = document.querySelectorAll('input[name="gridRadios2"]');
const languageRadios = document.querySelectorAll('input[name="gridRadios3"]');

let appTitle = document.querySelector(".app__title");
let appOut = document.querySelector(".app__out");
let appAddTask = document.querySelector(".app__addtask");
let appTheme = document.querySelector(".app__theme");
let appLightTheme = document.querySelector(".app__lighttheme");
let appDarkTheme = document.querySelector(".app__darktheme");
let appLanguage = document.querySelector(".app__language");
let appCurrentTasks = document.querySelector(".app__currenttasks");
let appCompletedTasks = document.querySelector(".app__completedtasks");
let appCreateTaskFormTitle = document.querySelector(".app__createtaskformtitle");
let appCteateTaskTitle = document.querySelector(".app__createtasktitle");
let appCteateTaskTitlePlaceholder = document.querySelector(".app__createtasktitleplaceholder");
let appCteateTaskText = document.querySelector(".app__createtasktext");
let appCteateTaskTextPlaceholder = document.querySelector(".app__createtasktextplaceholder");
let appCteateTaskPriority = document.querySelector(".app__createtaskpriority");
let appCreateTaskAddButton = document.querySelector(".app__createtaskaddbutton");
let appCreateTaskCloseButton = document.querySelector(".app__createtaskclosebutton");
let appEditTaskFormTitle = document.querySelector(".app__edittaskformtitle");
let appEditTaskTitle = document.querySelector(".app__edittasktitle");
let appEditTaskTitlePlaceholder = document.querySelector(".app__edittasktitleplaceholder");
let appEditTaskText = document.querySelector(".app__edittasktext");
let appEditTaskTextPlaceholder = document.querySelector(".app__edittasktextplaceholder");
let appEditTaskPriority = document.querySelector(".app__edittaskpriority");
let appEditTaskEditButton = document.querySelector(".app__edittaskeditbutton");
let appEditTaskCloseButton = document.querySelector(".app__edittaskclosebutton");

function changeLanguage(){
    appTitle.innerHTML = internationalization[currentLanguage].appTitle;
    appOut.innerHTML = internationalization[currentLanguage].appOut;
    appAddTask.innerHTML = internationalization[currentLanguage].appAddTask;
    appTheme.innerHTML = internationalization[currentLanguage].appTheme;
    appLightTheme.innerHTML = internationalization[currentLanguage].appLightTheme;
    appDarkTheme.innerHTML = internationalization[currentLanguage].appDarkTheme;
    appLanguage.innerHTML = internationalization[currentLanguage].appLanguage;
    appCurrentTasks.innerHTML = internationalization[currentLanguage].appCurrentTasks;
    appCompletedTasks.innerHTML = internationalization[currentLanguage].appCompletedTasks;
    appCreateTaskFormTitle.innerHTML = internationalization[currentLanguage].appCreateTaskFormTitle;
    appCteateTaskTitle.innerHTML = internationalization[currentLanguage].appCteateTaskTitle;
    appCteateTaskTitlePlaceholder.placeholder = internationalization[currentLanguage].appCteateTaskTitlePlaceholder;
    appCteateTaskText.innerHTML = internationalization[currentLanguage].appCteateTaskText;
    appCteateTaskTextPlaceholder.placeholder = internationalization[currentLanguage].appCteateTaskTextPlaceholder;
    appCteateTaskPriority.innerHTML = internationalization[currentLanguage].appCteateTaskPriority;
    appCreateTaskAddButton.innerHTML = internationalization[currentLanguage].appCreateTaskAddButton;
    appCreateTaskCloseButton.innerHTML = internationalization[currentLanguage].appCreateTaskCloseButton;
    appEditTaskFormTitle.innerHTML = internationalization[currentLanguage].appEditTaskFormTitle;
    appEditTaskTitle.innerHTML = internationalization[currentLanguage].appEditTaskTitle;
    appEditTaskTitlePlaceholder.placeholder = internationalization[currentLanguage].appEditTaskTitlePlaceholder;
    appEditTaskText.innerHTML = internationalization[currentLanguage].appEditTaskText;
    appEditTaskTextPlaceholder.placeholder = internationalization[currentLanguage].appEditTaskTextPlaceholder;
    appEditTaskPriority.innerHTML = internationalization[currentLanguage].appEditTaskPriority;
    appEditTaskEditButton.innerHTML = internationalization[currentLanguage].appEditTaskEditButton;
    appEditTaskCloseButton.innerHTML = internationalization[currentLanguage].appEditTaskCloseButton;

    for (let button of completeButtons) {
        button.innerHTML = internationalization[currentLanguage].appCompleteTaskButton;
    }

    for (let button of editButtons) {
        button.innerHTML = internationalization[currentLanguage].appEditTaskButton;
    }

    for (let button of deleteButtons) {
        button.innerHTML = internationalization[currentLanguage].appDeleteTaskButton;
    }
}

logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("currentUser");
    window.location = "login.html";
});

if (((window.location.pathname.includes("/docs")) || (window.location.href.includes("/index.html") || (window.location.pathname.includes("/")))) && (currentUser === null || undefined)) {
    window.location="login.html";
} else {
    document.body.classList.remove("display__none");
}

function setCurrentThemeToRadios() {
    for (let i = 0; i < themeRadios.length; i++) {
        if (themeRadios[i].value === currentTheme) {
            themeRadios[i].checked = true;
        }
    }
}

function setCurrentLanguageToRadios() {
    for (let i = 0; i < languageRadios.length; i++) {
        if (languageRadios[i].value === currentLanguage) {
            languageRadios[i].checked = true;
        }
    }
}

setCurrentThemeToRadios();
setCurrentLanguageToRadios();

function changeTheme() {
    if (currentTheme === "Dark") {
        document.body.classList.add("dark__theme");
        document.querySelector("#nav").classList.add("dark__theme");
        document.querySelectorAll(".modal-content").forEach(function(elem) {
            elem.classList.add("dark__theme");
        });
        document.querySelectorAll(".dropdown-menu").forEach(function(elem) {
            elem.classList.add("dark__theme");
        })
    } else {
        document.body.classList.remove("dark__theme");
        document.querySelector("#nav").classList.remove("dark__theme");
        document.querySelectorAll(".modal-content").forEach(function(elem) {
            elem.classList.remove("dark__theme");
        });
        document.querySelectorAll(".dropdown-menu").forEach(function(elem) {
            elem.classList.remove("dark__theme");
        })
    }
}



function changeThemeAfterRadio() {
    currentTheme = event.currentTarget.value;
    localStorage.removeItem('currentTheme');
    localStorage.setItem('currentTheme', currentTheme);
    changeTheme();
}

function changeLanguageAfterRadio() {
    currentLanguage = event.currentTarget.value;
    localStorage.removeItem('currentLanguage');
    localStorage.setItem('currentLanguage', currentLanguage);
    changeLanguage();
}

themeRadios.forEach(function(elem) {
    elem.addEventListener('change', changeThemeAfterRadio);
})

languageRadios.forEach(function(elem) {
    elem.addEventListener('change', changeLanguageAfterRadio);
})

function updateTasksCounter() {
    if (currentUser.currentTasks.length !== 0) {
        currentTasksCounterSpan.textContent = "(" + currentUser.currentTasks.length + ")";
    } else {
        currentTasksCounterSpan.textContent = "";
    }

    if (currentUser.completedTasks.length !== 0) {    
        completedTasksCounterSpan.textContent = "(" + currentUser.completedTasks.length + ")";
    } else {
        completedTasksCounterSpan.textContent = ""
    }
}

if (currentUser.currentTasks.length !== 0) {
    for (let task of currentUser.currentTasks) {
        currentTasksList.append(createDOMElement(task));
    }
}

if (currentUser.completedTasks.length !== 0) {
    for (let task of currentUser.completedTasks) {
        completedTasksList.append(createDOMElement(task));
        completedTasksList.lastChild.querySelector("[data-complete]").remove();
        completedTasksList.lastChild.querySelector("[data-edit]").remove();
    }
}

function updateStates() {
    updateEditList();
    updateDeleteList();
    updateCompleteList();
    updateTasksCounter();
    changeTheme();
    changeLanguage();
    updateLocalStorage(users, currentUser, 'users');
    updateSessionStorage(currentUser, 'currentUser');
    updateDragList();
}

updateStates();

function CreateUser(name, login, password) {
    this.name = name;
    this.login = login;
    this.password = password;
    this.id = `f${(+new Date).toString(16)}`;
    this.currentTasks = [];
    this.completedTasks = [];
}

function CreateTask(title, priority, text) {
    this.title = title;
    this.priority = priority + " priority";
    this.isCompleted = false;
    this.date = new Date();
    this.id = `f${(+new Date).toString(16)}`;
    this.text = text;
}

let alertsTimeoutPoint;

function clearAlerts() {
    addTaskTitleField.classList.remove("red__border");
    addTaskTextField.classList.remove("red__border");
    editTaskTitleField.classList.remove("red__border");
    editTaskTextField.classList.remove("red__border");
}

function clearAlertsWithTimer() {
    if (alertsTimeoutPoint)
        clearTimeout(alertsTimeoutPoint);

    alertsTimeoutPoint = setTimeout(clearAlerts, 4000);
}

addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearAlerts();

    let taskTitle = addTaskTitleField.value;
    let taskText = addTaskTextField.value;
    let priority;
    
    for (let i = 0; i < addTaskRadios.length; i++) {
        if (addTaskRadios[i].checked) {
            priority = addTaskRadios[i].value;
        }
    }

    let task;

    if ((taskTitle !== "") && (taskText !== "") && (priority !== undefined)) {
        task = new CreateTask(taskTitle, priority, taskText);

        currentUser.currentTasks.push(task);
        currentTasksList.append(createDOMElement(currentUser.currentTasks[currentUser.currentTasks.length-1]));
        addTaskTitleField.value = "";
        addTaskTextField.value = "";
    
        for (let i = 0; i < addTaskRadios.length; i++) {
            if (addTaskRadios[i].checked = true) {
                addTaskRadios[i].checked = false;
                addTaskRadios[0].checked = true;
                break;
            }
        }
        
        updateStates();
        $('#exampleModal').modal('hide');
    } else {
        if (taskTitle === "") {
            addTaskTitleField.classList.add("red__border");
        }
            
        if (taskText === "") {
            addTaskTextField.classList.add("red__border");
        }
            
        clearAlertsWithTimer();
    }
});

function createDOMElement(task) {
    let domElement = document.createElement('li');
    domElement.className = 'list-group-item d-flex w-100 mb-2';

    if (task.isCompleted === false) {
        domElement.classList.add("current__task");
    } else {
        domElement.classList.add("completed__task");
    }
        
    switch (task.priority) {
        case "High priority":
            domElement.classList.add("task__red");
            break;
        case "Medium priority":
            domElement.classList.add("task__blue");
            break;
        case "Low priority":
            domElement.classList.add("task__gray");
            break;
    }

    domElement.id = task.id;
    domElement.innerHTML = `
    <div class="w-100 mr-2">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1 task-title">${task.title}</h5>
            <div>
                <small class="mr-2 task-priority">${task.priority}</small>
                <small>${task.date.getHours()}:${task.date.getMinutes()} ${task.date.getDate()}.${task.date.getMonth()}.${task.date.getFullYear()}</small>
            </div>
        </div>
        <p class="mb-1 w-100 task-text">${task.text}</p>
    </div>
    <div class="dropdown m-2 dropleft">
        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
        </button>
        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
            <button type="button" class="btn btn-success w-100 app__taskcompletebutton" data-complete="">Complete</button>
            <button type="button" class="btn btn-info w-100 my-2 app__taskeditbutton" data-edit="" data-toggle="modal" data-target="#exampleModal1" id='asdf'>Edit</button>
            <button type="button" class="btn btn-danger w-100 app__taskdeletebutton" data-delete="">Delete</button>
        </div>
    </div>
    `;
    return domElement;
};

sortToMaxButton.addEventListener('click', (event) => {
    event.preventDefault();

    currentUser.currentTasks.sort( function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    currentUser.completedTasks.sort( function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    while (currentTasksList.firstChild) {
        currentTasksList.removeChild(currentTasksList.firstChild);
    }

    while (completedTasksList.firstChild) {
        completedTasksList.removeChild(completedTasksList.firstChild);
    }

    for (let task of currentUser.currentTasks) {
        currentTasksList.append(createDOMElement(task));
    }
    
    for (let task of currentUser.completedTasks) {
        completedTasksList.append(createDOMElement(task));
        completedTasksList.lastChild.querySelector("[data-complete]").remove();
        completedTasksList.lastChild.querySelector("[data-edit]").remove();
    }

    updateStates();
})

sortToMinButton.addEventListener('click', (event) => {
    event.preventDefault();

    currentUser.currentTasks.sort( function(a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    currentUser.completedTasks.sort( function(a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    while (currentTasksList.firstChild) {
        currentTasksList.removeChild(currentTasksList.firstChild);
    }

    while (completedTasksList.firstChild) {
        completedTasksList.removeChild(completedTasksList.firstChild);
    }

    for (let task of currentUser.currentTasks) {
        currentTasksList.append(createDOMElement(task));
    }
    
    for (let task of currentUser.completedTasks) {
        completedTasksList.append(createDOMElement(task));
        completedTasksList.lastChild.querySelector("[data-complete]").remove();
        completedTasksList.lastChild.querySelector("[data-edit]").remove();
    }

    updateStates();
})

function deleteTask() {
    event.preventDefault();
    currentTask = event.currentTarget.closest('.list-group-item');

    if (currentTask.closest('#currentTasks')) {
        currentUser.currentTasks.splice(currentUser.currentTasks.findIndex(item => item.id === currentTask.id),1);
    } else {
        currentUser.completedTasks.splice(currentUser.completedTasks.findIndex(item => item.id === currentTask.id),1);
    }

    currentTask.remove();

    updateStates();
}

function updateDeleteList() {
    deleteButtons = document.querySelectorAll("[data-delete]");
    deleteButtons.forEach( function(elem) {
        elem.addEventListener('click', deleteTask);
    });
}

function completeTask() {
    event.preventDefault();
    currentTask = event.currentTarget.closest('.list-group-item');
    let [completedTask] = currentUser.currentTasks.splice(currentUser.currentTasks.findIndex(item => item.id === currentTask.id),1);
    completedTask.isCompleted = true;
    currentUser.completedTasks.push(completedTask);
    currentTask.remove();
    completedTasksList.append(createDOMElement(currentUser.completedTasks[currentUser.completedTasks.length-1]));
    completedTasksList.lastChild.querySelector("[data-complete]").remove();
    completedTasksList.lastChild.querySelector("[data-edit]").remove();

    updateStates();
}

function updateCompleteList() {
    completeButtons = document.querySelectorAll("[data-complete]");
    completeButtons.forEach( function(elem) {
        elem.addEventListener('click', completeTask);
    });
}

function editTask() {
    event.preventDefault();
    currentTask = event.currentTarget.closest('.list-group-item');
    editTaskTitleField.value = currentTask.querySelector('.task-title').textContent;
    editTaskTextField.value = currentTask.querySelector('.task-text').textContent;
    
    for (let i = 0; i < editTaskRadios.length; i++) {
        if (currentTask.querySelector('.task-priority').textContent.includes(editTaskRadios[i].value)) {
            editTaskRadios[i].checked = true;
        }
    }      
}

function updateEditList() {
    editButtons = document.querySelectorAll("[data-edit]");
    editButtons.forEach( function(elem) {
        elem.addEventListener('click', editTask);
    });
}

function updateTask(id, title, priority, text) {
    for (let obj of currentUser.currentTasks) {
        if (obj.id === id) {
            obj.title = title;
            obj.priority = priority + " priority";
            obj.text = text;
        }
    }

    currentTask.querySelector('.task-title').textContent = title;
    currentTask.querySelector('.task-text').textContent = text;
    currentTask.querySelector('.task-priority').textContent = priority + " priority";
    currentTask.classList.remove("task__red");
    currentTask.classList.remove("task__blue");
    currentTask.classList.remove("task__gray");

    switch (priority) {
        case "High" ||"High priority":
            currentTask.classList.add("task__red");
            break;
        case "Medium" ||"Medium priority":
            currentTask.classList.add("task__blue");
            break;
        case "Low" ||"Low priority":
            currentTask.classList.add("task__gray");
            break;
    }
}

editTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearAlerts();
    
    let taskTitle = editTaskTitleField.value;
    let taskText = editTaskTextField.value;
    let priority;
    
    for (let i = 0; i < editTaskRadios.length; i++) {
        if (editTaskRadios[i].checked) {
            priority = editTaskRadios[i].value;
        }
    }

    if ((taskTitle !== "") && (taskText !== "")) {
        updateTask(currentTask.id, taskTitle, priority, taskText);
        $('#exampleModal1').modal('hide');

        updateStates();
    } else {
        if (taskTitle === "")
            editTaskTitleField.classList.add("red__border");
        if (taskText === "")
            editTaskTextField.classList.add("red__border");

        clearAlertsWithTimer();
    }
})

function updateDragList() {
    let currentTaskElements = currentTasksList.querySelectorAll(".current__task");
    let completedTasksElements = completedTasksList.querySelectorAll(".completed__task");
    
    for (let task of currentTaskElements) {
      task.draggable = true;
    }
    
    for (let task of completedTasksElements) {
        task.draggable = true;
    }
}

currentTasksList.addEventListener(`dragstart`, (event) => {
    event.target.classList.add(`selected`);
});

completedTasksList.addEventListener(`dragstart`, (event) => {
    event.target.classList.add(`selected`);
});

currentTasksList.addEventListener(`dragend`, (event) => {
    event.target.classList.remove(`selected`);
});

completedTasksList.addEventListener(`dragend`, (event) => {
    event.target.classList.remove(`selected`);
});

currentTasksList.addEventListener(`dragover`, (event) => {
    event.preventDefault();
});

completedTasksList.addEventListener(`dragover`, (event) => {
    event.preventDefault();
});

currentTasksList.addEventListener(`drop`, (event) => {
    let currentTask = completedTasksList.querySelector(`.selected`);
    event.target.classList.remove(`selected`);

    let [restoredTask] = currentUser.completedTasks.splice(currentUser.completedTasks.findIndex(item => item.id === currentTask.id), 1);
    restoredTask.isCompleted = false;
    currentUser.currentTasks.push(restoredTask);
    currentTask.remove();
    currentTasksList.append(createDOMElement(currentUser.currentTasks[currentUser.currentTasks.length-1]));

    updateStates();
});

completedTasksList.addEventListener(`drop`, (event) => {
    let currentTask = currentTasksList.querySelector(`.selected`);
    event.target.classList.remove(`selected`);

    let [completedTask] = currentUser.currentTasks.splice(currentUser.currentTasks.findIndex(item => item.id === currentTask.id), 1);
    completedTask.isCompleted = true;
    currentUser.completedTasks.push(completedTask);
    currentTask.remove();
    completedTasksList.append(createDOMElement(currentUser.completedTasks[currentUser.completedTasks.length-1]));
    completedTasksList.lastChild.querySelector("[data-complete]").remove();
    completedTasksList.lastChild.querySelector("[data-edit]").remove();

    updateStates();
});