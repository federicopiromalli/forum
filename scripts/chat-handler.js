const chat_handler = {
  show_users(users, logged_username, div_id) {
    // mostro gli utenti nella pagina delle chat
    const div = document.getElementById(div_id);
    // se non ci sono altri utenti che quello loggato
    if (users.length === 1 && users.at(0).username === logged_username) {
      div.innerHTML = "<h4 class='post-title'> Nessun utente! </h4>";
      return;
    }
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
