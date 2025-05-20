const user_handler = {
  users: [],
  users_item: "users",
  logged: {},
  logged_item: "logged",
  create_users_if_needed() {
    // creo la sezione utenti se necessario
    if (!localStorage.getItem(this.users_item))
      localStorage.setItem(this.users_item, JSON.stringify([]));
  },
  get_users_from_storage() {
    // prendo gli utenti da localStorage
    this.users = JSON.parse(localStorage.getItem(this.users_item));
  },
  load_users_in_storage() {
    // inserisco gli utenti in localStorage
    localStorage.setItem(this.users_item, JSON.stringify(this.users));
  },
  get_users() {
    // ritorna gli utenti
    this.create_users_if_needed();
    this.get_users_from_storage();
    return this.users;
  },
  get_user_by_username(username) {
    // ritorna un utente da username
    this.create_users_if_needed();
    this.get_users_from_storage();
    return this.users.find((user) => user.username === username);
  },
  register(_username, _password) {
    if (!this.get_user_by_username(_username)) {
      // configuro l'utente
      this.users.push({
        username: _username,
        password: _password,
        date: new Date().toLocaleDateString(),
      });
      this.load_users_in_storage();
      window.location.href = "./signin.html";
    } else alert("L'utente esiste gia'. accedi!");
  },
  create_logged_if_needed() {
    // crea la sezione dell'utente loggato se necessario
    if (!localStorage.getItem(this.logged_item))
      localStorage.setItem(this.logged_item, JSON.stringify({}));
  },
  get_logged_from_storage() {
    // prende l'utente loggato da localStorage
    this.logged = JSON.parse(localStorage.getItem(this.logged_item));
  },
  load_logged_in_storage() {
    // inserisce l'utente loggato in localStorage
    localStorage.setItem(this.logged_item, JSON.stringify(this.logged));
  },
  get_logged() {
    // ritorna l'utente loggato
    this.create_logged_if_needed();
    this.get_logged_from_storage();
    return this.logged;
  },
  login(_username, _password) {
    const user = this.get_user_by_username(_username);
    if (user) {
      // se la password e' corretta allora entra
      if (user.password === _password) {
        this.logged = user;
        this.create_logged_if_needed();
        this.load_logged_in_storage();
        window.location.href = "./home.html";
      } else alert("Le password non corrispondono!");
    } else alert("L'utente non esiste. registrati!");
  },
  exit_if_not_logged() {
    // controlla, prima di entrare in una pagina, che l'utente sia loggato
    this.get_logged_from_storage();
    if (!this.logged) {
      alert("Non puoi accedere a questa pagina senza un profilo!");
      window.location.href = "./index.html";
    }
  },
  show_profile_info(username_id, password_id, date_id) {
    // mostra le info del profilo nei campi specificati
    this.get_logged_from_storage();
    document.getElementById(
      username_id
    ).textContent = `@${this.logged.username}`;
    document.getElementById(password_id).textContent = this.logged.password;
    document.getElementById(date_id).textContent = this.logged.date;
  },
  logout() {
    localStorage.removeItem(this.logged_item);
    window.location.href = "./index.html";
  },
  delete_profile() {
    this.get_users_from_storage();
    this.get_logged_from_storage();
    // prendo tutti gli utenti che non hanno il nome dell'utente loggato
    this.users = this.users.filter(
      (user) => user.username !== this.logged.username
    );
    // cancello la sezione utenti se necessario
    if (this.users.length === 0) localStorage.removeItem(this.users_item);
    else this.load_users_in_storage();
    this.logout();
  },
};
