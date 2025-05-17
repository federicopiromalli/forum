// gestrisce tutti gli utenti e le funzioni a loro collegate
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

    // controlla se un utente esiste
    is_user_existing(_username) {
        return JSON.parse(localStorage.getItem(this.users_key)).find(user => user.username === _username) !== undefined;
    },

    register_user(_username, _password) {
        const users = this.get_users();
        users.push({ username: _username, password: _password, date: new Date().toLocaleDateString()});
        this.update_users(users);
    },

    // controlla che username e password rispettino i requisiti
    are_requirements_valid(username, password) {
        return (username.length <= 10 && password.length <= 10);
    },

    // crea la sezione dell'utente loggato
    create_logged_if_needed() {
        if (localStorage.getItem(this.logged_key) === null)
            localStorage.setItem(this.logged_key, JSON.stringify({}));
    },

    exit_if_not_logged() {
        if (localStorage.getItem(this.logged_key) === null) {
            alert(user_errors.NO_LOGGED_USER); window.location.href = './index.html';
        }
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
        document.getElementById(username_id).textContent = logged.username;
        document.getElementById(password_id).textContent = logged.password;
        document.getElementById(date_id).textContent = logged.date;
    },

    logout() {
        localStorage.removeItem(this.logged_key);
        window.location.href = './index.html';
    },

    delete_profile() {
        const new_users = this.get_users().filter(user => user.username !== this.get_logged().username);
        if (new_users.length === 0)     // cancello anche la sezione utenti perche' e' vuota
            localStorage.removeItem(this.users_key);
        else
            this.update_users(new_users);
        this.logout();
    },

    load_chat_with(username, div_id) {
        const div = document.getElementById(div_id);  
    },

    show_users(users_id, chat_id) {
        const div = document.getElementById(users_id);
        this.get_users().forEach(user => {
            if (user.username !== this.get_logged().username) {
                // creo i 'bottoni utente'
                const button = document.createElement('button');
                button.textContent = user.username;
                button.className = 'btn shadow-sm btn-dark';
                button.addEventListener('click', () => this.load_chat_with(user.username, chat_id));
                div.appendChild(button);
            }
        });
    }
};


// errori durante registrazioni o altro legato agli utenti
const user_errors = {

    USER_NOT_FOUND: "L'utente non esiste, registrati!",
    USER_ALREADY_EXISTS: "L'utente esiste gia', accedi!",
    PASSWORD_NOT_MATCH: 'Le password non corrispondono!',
    REQUIREMENTS_ERROR: 'Username e Password devono essere di 10 o meno caratteri!',
    NO_LOGGED_USER: 'Non puoi accedere a questa pagina se non sei loggato!'

};