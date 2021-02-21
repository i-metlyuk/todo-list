let users = [];

if (localStorage.users !== undefined) {
    users = JSON.parse(localStorage.users, function(key, value) {
        if (key == 'date') return new Date(value);
        return value;
    })
}

let registrationButton = document.querySelector(".registrationButton");
let authorizationButton = document.querySelector(".authorizationButton");

let registrationForm = document.querySelector(".register-form");
let authorizationForm = document.querySelector(".login-form");

let authorizationLogin = authorizationForm.querySelector('.login');
let authorizationPassword = authorizationForm.querySelector('.password');

let registrationName = registrationForm.querySelector('.name');
let registrationLogin = registrationForm.querySelector('.login');
let registrationPassword = registrationForm.querySelector('.password');

let submitRegistrationButton = document.querySelector("#submitRegistration");
let submitAuthorizationButton = document.querySelector("#submitAuthorization");

let alerts = document.querySelector(".alerts");


registrationButton.addEventListener("click", () => {
    event.preventDefault();
    authorizationForm.classList.add("display__none");
    registrationForm.classList.remove("display__none");
});

authorizationButton.addEventListener("click", () => {
    event.preventDefault();
    registrationForm.classList.add("display__none");
    authorizationForm.classList.remove("display__none");
});

function createAlert(text) {
    let domElement = document.createElement('p');
    domElement.className = 'alert__message';
    domElement.innerHTML = `${text}`;
    return domElement;
}

let alertsTimeoutPoint;

function clearAlerts() {
    alerts.classList.remove("display__flex");
    registrationName.classList.remove("red__border");
    registrationLogin.classList.remove("red__border");
    registrationPassword.classList.remove("red__border");
    authorizationLogin.classList.remove("red__border");
    authorizationPassword.classList.remove("red__border");
    while(alerts.firstChild) {
        alerts.firstChild.remove();
    }
}

function clearAlertsWithTimer() {
    if (alertsTimeoutPoint)
        clearTimeout(alertsTimeoutPoint);

    alertsTimeoutPoint = setTimeout(clearAlerts, 6000);
}

submitRegistrationButton.addEventListener("click", () => {
    event.preventDefault();
    clearAlerts();

    let name = registrationName.value;
    let login = registrationLogin.value;
    let password = registrationPassword.value;
    let user;
    let uniqueLogin = true;

    if ((name != "") && (login != "") && (password != "")) {
        if ((/[^ ]/.test(name)) && (/[^ ]/.test(name)) && (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password))) {
            for (user of users) {
                if (user.login == login)
                    uniqueLogin = false;
            }
            if (uniqueLogin != false) {
                user = new CreateUser(name, login, password);
                users.push(user);
                localStorage.removeItem('users');
                localStorage.users = JSON.stringify(users);
        
                registrationName.value = "";
                registrationLogin.value = "";
                registrationPassword.value = "";
        
                alerts.classList.add("display__flex");
                alerts.append(createAlert("Пользователь успешно добавлен!"));
    
                clearAlertsWithTimer();

                sessionStorage.removeItem("currentUser");
                sessionStorage.currentUser = JSON.stringify(user);
                window.location="index.html";
            } else {
                registrationLogin.value = "";
    
                alerts.classList.add("display__block");
                alerts.append(createAlert("Такой логин уже есть!"));

                clearAlertsWithTimer();
            }
        } else {
            if (!(/[^ ]/.test(name))) {
                registrationName.value = "";
                alerts.append(createAlert("Поле \"Имя пользоваля\" не может содержать только пробелы!"));
                registrationName.classList.add("red__border");
            }
                
            if (!(/[^ ]/.test(login))) {
                registrationLogin.value = "";
                alerts.append(createAlert("Поле \"Логин\" не может содержать только пробелы!"));
                registrationLogin.classList.add("red__border");
            }
                
            if (!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password))) {
                registrationPassword.value = "";
                alerts.append(createAlert("Поле \"Пароль\" должно быть не короче восьми символов, содержать буквы нижнего регистра, минимум одну заглавную букву и минимум одну цифру!"));
                registrationPassword.classList.add("red__border");
            }

            alerts.classList.add("display__block");
            clearAlertsWithTimer();
        }
        
    } else {
        if (name == "") {
            alerts.append(createAlert("Заполните поле \"Имя пользоваля\"!"));
            registrationName.classList.add("red__border");
        }
            
        if (login == "") {
            alerts.append(createAlert("Заполните поле \"Логин\"!"));
            registrationLogin.classList.add("red__border");
        }
            
        if (password == "") {
            alerts.append(createAlert("Заполните поле \"Пароль\"!"));
            registrationPassword.classList.add("red__border");
        }
            
        alerts.classList.add("display__block");
        clearAlertsWithTimer();
    }

});

submitAuthorizationButton.addEventListener("click", () => {
    event.preventDefault();
    clearAlerts();

    let login = authorizationLogin.value;
    let password = authorizationPassword.value;
    let currentUser;
    for (user of users) {
        if (user.login==login) {
            currentUser = user;
            break;
        }
    }

    if ((login != "") && (password != "")) {
        if ((currentUser !== undefined) && (currentUser.password == password)) {
            sessionStorage.removeItem("currentUser");
            sessionStorage.currentUser = JSON.stringify(currentUser);
            window.location="index.html";
        } else {
            alerts.append(createAlert("Логин и пароль ведены неверно!"));
            authorizationLogin.value = "";
            authorizationPassword.value = "";
            authorizationLogin.classList.add("red__border");
            authorizationPassword.classList.add("red__border");
            alerts.classList.add("display__block");
            clearAlertsWithTimer();
        }
    } else {       
        if (login == "") {
            alerts.append(createAlert("Заполните поле \"Логин\"!"));
            authorizationLogin.classList.add("red__border");
        }
            
        if (password == "") {
            alerts.append(createAlert("Заполните поле \"Пароль\"!"));
            authorizationPassword.classList.add("red__border");
        }
            
        alerts.classList.add("display__block");
        clearAlertsWithTimer();
    }
});

function CreateUser(name, login, password) {
    this.name = name;
    this.login = login;
    this.password = password;
    this.id = `f${(+new Date).toString(16)}`;
    this.currentTasks = [];
    this.completedTasks = [];
};