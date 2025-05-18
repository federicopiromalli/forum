const users_errors = {
  USER_ALREADY_EXISTS: "L'utente esiste gia', accedi!",
  CREDENTIALS_NOT_MATCH: "Le credenziali sono errate!",
};

const users_handler = {
  users: [],
  logged: {},
  users_item: "users",
  logged_item: "logged",
  create_users_if_needed() {
    // crea la sezione degli utenti se non esiste
    if (localStorage.getItem(this.users_item) === null)
      localStorage.setItem(this.users_item, JSON.stringify([]));
  },
  get_users() {
    // prende gli utenti da localStorage
    this.users = JSON.parse(localStorage.getItem(this.users_item));
  },
  load_users() {
    // imposta gli utenti in localStorage
    localStorage.setItem(this.users_item, JSON.stringify(this.users));
  },
  search_user(_username_to_find) {
    this.get_users();
    return this.users.find((user) => user.username === _username_to_find);
  },
  register_user(_username, _password) {
    this.create_users_if_needed();
    if (this.search_user(_username) === undefined) {
      // creo l'utente solo se non esiste
      this.users.push({
        username: _username,
        password: _password,
        date: new Date().toLocaleDateString(),
        points: 0,
      });
      this.load_users();
    } else alert(users_errors.USER_ALREADY_EXISTS);
  },
  create_logged_if_needed() {
    // crea la sezione dell'utente loggato se necessario
    if (localStorage.getItem(this.logged_item) === null)
      localStorage.setItem(this.logged_item, JSON.stringify({}));
  },
  get_logged() {
    // prende da localStorage l'utente loggato
    this.logged = JSON.parse(localStorage.getItem(this.logged_item));
  },
  load_logged() {
    // imposta in localStorage l'utente loggato
    localStorage.setItem(this.logged_item, JSON.stringify(this.logged));
  },
  login(_username, _password) {
    this.create_logged_if_needed();
    const user = this.search_user(_username);
    if (user) {
      // creo l'utente se esiste e le credenziali sono corrette
      if (user.password === _password) {
        this.logged = user;
        this.load_logged();
        location.href = "../html/home.html";
      } else alert(users_errors.CREDENTIALS_NOT_MATCH);
    }
  },
};
