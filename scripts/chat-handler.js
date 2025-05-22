const chat_handler = {
  chats: [],
  chat_item: "chats",
  create_chats_if_needed() {
    // crea la sezione dei messaggi
    if (!localStorage.getItem(this.chat_item))
      localStorage.setItem(this.chat_item, JSON.stringify([]));
  },
  get_chats_from_storage() {
    // prendo le chat da localStorage
    this.chats = JSON.parse(localStorage.getItem(this.chat_item));
  },
  load_chats_in_storage() {
    // inserisco le chat dentro localStorage
    localStorage.setItem(this.chat_item, JSON.stringify(this.chats));
  },
  show_users(users, logged_username, div_id) {
    // mostro gli utenti nella pagina delle chat
    const div = document.getElementById(div_id);
    // se non ci sono altri utenti che quello loggato
    if (users.length === 1 && users.at(0).username === logged_username) {
      const message = document.createElement("h4");
      message.textContent = "Nessun utente!";
      message.className = "post-title";
      div.appendChild(message);
      return;
    }
    // mostro gli utenti
    users.forEach((user) => {
      if (user.username !== logged_username) {
        const button = document.createElement("button");
        button.className = "btn btn-dark rounded-3";
        button.textContent = user.username;
        div.appendChild(button);
      }
    });
  },
};
