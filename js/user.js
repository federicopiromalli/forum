// gestrisce tutti gli utenti e le registrazioni
const user = {
  
    users_key: 'users',
    logged_key: 'logged_user',

    create_users_if_needed() {
        if (localStorage.getItem(this.users_key) === null)
            localStorage.setItem(this.users_key, JSON.stringify([]));
    },

    // prende tutti gli utenti registrati
    get_users() {
        return JSON.parse(localStorage.getItem(this.users_key));
    },

    // aggiorna gli utenti registrati
    update_users(users) {
        localStorage.setItem(this.users_key, JSON.stringify(users));
    },

    // controlla se un username esiste
    is_user_existing(_username) {
        return JSON.parse(localStorage.getItem(this.users_key)).find(user => user.username === _username) !== undefined;
    },

    register_user(_username, _password) {
        const users = this.get_users();
        users.push({ username: _username, password: _password, date: new Date().toLocaleDateString()});
        this.update_users(users);
    },

    // crea la sezione dell'utente loggato
    create_logged_if_needed() {
        if (localStorage.getItem(this.logged_key) === null)
            localStorage.setItem(this.logged_key, JSON.stringify({}));
    },

    // prende l'utente loggato
    get_logged() {
        return JSON.parse(localStorage.getItem(this.logged_key));
    },

    // cambia l'utente loggato
    update_logged(user) {
        localStorage.setItem(this.logged_key, JSON.stringify(user));
    },

    // logga un utente
    login_user(_username, _password) {
        this.create_logged_if_needed();
        const user = this.get_users().find(user => user.username === _username);

        if (_password !== user.password) {
            alert(user_errors.PASSWORD_NOT_MATCH); return;
        }
        
        this.update_logged(user);
        window.location.href = './home.html';
    },

    show_profile_info(username_id, password_id, date_id) {
        const logged = this.get_logged();
        document.getElementById(username_id).textContent += logged.username;
        document.getElementById(password_id).textContent += logged.password;
        document.getElementById(date_id).textContent += logged.date;
    }
    
};


// errori durante registrazioni o altro legato agli utenti
const user_errors = {

    USER_NOT_FOUND: "L'utente non esiste, registrati!",
    USER_ALREADY_EXISTS: "L'utente esiste gia', accedi!",
    PASSWORD_NOT_MATCH: 'Le password non corrispondono!'

};
