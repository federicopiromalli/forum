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
  search_chat_by_username(username) {
    // cerca una chat partendo dal nome del destinatario
    this.create_chats_if_needed();
    return this.chats.find((chat) => chat.receiver === username);
  },
  insert_messages(chat, history_div) {
    // inserisce in una chat i messaggi salvati in history
    chat.history.forEach((message) => {
      const div = document.createElement("div");
      div.className = "d-flex bg-light rounded-3 p-2 mb-2 text-break";
      div.style.maxWidth = "400px";
      if (chat.sender === message.sender)
        div.classList.add("justify-content-end");
      // messaggio
      div.innerHTML = `<p><b>@${message.sender}</b><br>${message.content}</p>`;
      history_div.appendChild(div);
    });
  },
  send_message(chat, sender_username, message_content) {
    // invia un messaggio ad un utente
    chat.history.push({
      sender: sender_username,
      content: message_content,
    });
    this.load_chats_in_storage();
  },
  build_chat(chat) {
    // destinatario
    const receiver = document.createElement("h3");
    receiver.className = "title";
    receiver.textContent = `@${chat.receiver}`;
    // messaggi inviati
    const history = document.createElement("div");
    history.className = "scrollbar mb-5 mt-5";
    history.style.maxHeight = "200px";
    history.style.overflowY = "auto";
    this.insert_messages(chat, history);
    // scrvi messaggio
    const message = document.createElement("textarea");
    message.className = "form-control shadow rounded-3 p-2";
    message.style.resize = "none";
    message.style.border = "none";
    message.placeholder = "Scrivi qualcosa...";
    // invia messaggio
    const send = document.createElement("img");
    send.src = "../img/home/messages.png";
    send.className = "post-img-size";
    send.addEventListener("click", () => {
      if (message.value.trim()) {
        this.send_message(chat, chat.sender, message.value);
        this.open_chat_between(chat.receiver, chat.sender);
      }
    });
    // container scrivi messaggio
    const col_message = document.createElement("div");
    col_message.className = "col-auto text-center";
    col_message.appendChild(message);
    // container invia messaggio
    const col_send = document.createElement("div");
    col_send.className = "col-auto text-end";
    col_send.appendChild(send);
    // container colonne scrivi e invia messaggio
    const actions = document.createElement("div");
    actions.className = "row align-items-center";
    actions.appendChild(col_message);
    actions.appendChild(col_send);
    // container chat
    const div = document.createElement("div");
    div.appendChild(receiver);
    div.append(document.createElement("hr"));
    div.appendChild(history);
    div.appendChild(actions);
    return div;
  },
  open_chat_between(receiver_username, sender_username) {
    // apre una chat e mostra i messaggi precedenti se presenti
    this.create_chats_if_needed();
    this.get_chats_from_storage();
    let chat = this.search_chat_by_username(receiver_username);
    // creo la chat se non esiste
    if (!chat) {
      chat = {
        sender: sender_username,
        receiver: receiver_username,
        history: [],
      };
      this.chats.push(chat);
      this.load_chats_in_storage();
    }
    // mostro la chat
    const div = document.getElementById("chat");
    div.innerHTML = "";
    div.appendChild(this.build_chat(chat));
  },
  show_users(users, logged_username, div_id) {
    // mostro gli utenti nella pagina delle chat
    const div = document.getElementById(div_id);
    // se non ci sono altri utenti che quello loggato
    if (users.length === 1 && users.at(0).username === logged_username) {
      const message = document.createElement("h4");
      message.textContent = "Nessun utente!";
      message.className = "title";
      div.appendChild(message);
      return;
    }
    // mostro gli utenti
    users.forEach((user) => {
      if (user.username !== logged_username) {
        const button = document.createElement("button");
        button.className = "btn btn-dark rounded-3";
        button.textContent = user.username;
        // apro la chat al click del profilo
        button.addEventListener("click", () => {
          this.open_chat_between(user.username, logged_username);
        });
        div.appendChild(button);
      }
    });
  },
  delete_chats_by_username(username) {
    this.create_chats_if_needed();
    this.get_chats_from_storage();
    this.chats = this.chats.filter((chat) => chat.sender !== username);
    if (this.chats.length === 0) localStorage.removeItem(this.chat_item);
    else this.load_chats_in_storage();
  },
};
