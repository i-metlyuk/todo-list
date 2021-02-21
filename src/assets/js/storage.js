export function getUsersFromLocalStorage(field) {
    let users;
    if (localStorage.getItem(field) !== undefined) {
        users = JSON.parse(localStorage.getItem(field), function(key, value) {
            if (key == 'date') return new Date(value);
            return value;
        })
    }
    return users;
}

export function setInitialTheme(field) {
    let currentTheme;
    if (localStorage.getItem(field) !== undefined) {
        currentTheme = localStorage.getItem(field);
    } else {
        currentTheme = "Light";
    }
    return currentTheme;
}

export function setInitialLanguage(field) {
    let currentLanguage;
    if (localStorage.getItem(field) != undefined) {
        currentLanguage = localStorage.getItem(field);
    } else {
        currentLanguage = "English";
    }
    return currentLanguage;
}

export function getCurrentUserFromSessionStorage(field) {
    let currentUser;
    if (sessionStorage.getItem(field) !== undefined) {
        currentUser = JSON.parse(sessionStorage.getItem(field), function(key, value) {
            if (key === 'date') return new Date(value);
            return value;
        });
    }
    return currentUser;
}

export function updateLocalStorage(users, currentUser, field) {
    for (let user of users) {
        if (user.id === currentUser.id) {
            Object.assign(user, currentUser);
        }
    }
    localStorage.removeItem(field);
    localStorage.setItem(field, JSON.stringify(users));
}

export function updateSessionStorage(currentUser, field) {
    sessionStorage.removeItem(field);
    sessionStorage.setItem(field, JSON.stringify(currentUser));
}