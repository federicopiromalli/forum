// gestrisce tutti gli utenti e le registrazioni
const user = {
  
    users_key: 'users',

    create_users_if_needed() {
        if (localStorage.getItem(this.users_key) === null) {
            console.log('utenti creati.');
            localStorage.setItem(this.users_key, JSON.stringify([]));
        }
    },

    // controlla se un username esiste
    is_user_existing(_username) {
        return JSON.parse(localStorage.getItem(this.users_key)).find(user => user.username === _username) !== undefined;
    }
    
};


// errori durante registrazioni o altro legato agli utenti
const user_errors = {

    USER_ALREADY_EXISTS: "L'utente esiste gia', accedi!"

};