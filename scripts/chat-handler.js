const chat_handler = {
  chats: [],
  chats_item: "chats",
  users_id: "users",
  get_chats_from_storage() {
    // prende le chat da localStorage
    this.chats = JSON.parse(localStorage.getItem(this.chats_item)) || [];
  },
  load_chats_in_storage() {
    // carica in localStorage le chat attuali
    localStorage.setItem(this.chats_item, JSON.stringify(this.chats));
  },
  remove_section_if_useless() {
    // rimuove la sezione chat da localStorage se non ci sono chat
    this.get_chats_from_storage();
    if (this.chats.length === 0) localStorage.removeItem(this.chats_item);
  },
  search_chat_by_username(username, logged_username) {
    this.get_chats_from_storage();
    return this.chats.find(
      (chat) =>
        (chat.from === logged_username && chat.to === username) ||
        (chat.from === username && chat.to === logged_username)
    );
  },
  build_history(history, history_div, logged) {
    // costruisco i messaggi
    const class_name = "message";
    history.forEach((message) => {
      const message_panel = document.createElement("div");
      message_panel.className = `container bg-light rounded-3 p-2 text mb-2 fade-in ${class_name}`;
      // message_panel.textContent = `@${logged.username}`;
      // message_panel.textContent += message.content;
      const from = document.createElement("h6");
      from.className = "title";
      from.textContent = `@${message.sender}`;
      const content = document.createElement("div");
      content.className = "contanter text-break";
      content.textContent = message.content;
      message_panel.appendChild(from);
      message_panel.appendChild(content);
      // formatto il testo a destra se chi l'ha mandato e' logged in questo momento
      if (message.sender === logged.username)
        message_panel.classList.add("text-end");
      history_div.appendChild(message_panel);
      setTimeout(() => message_panel.classList.add("show"), 50);
    });
    requestAnimationFrame(() => {
      history_div.scrollTop = history_div.scrollHeight;
    });
  },
  send_message(from, history, message) {
    history.push({
      sender: from,
      content: message,
    });
  },
  build_chat(chat, logged, to, div_id) {
    // mostro nome destinatario e tasto chiusura
    const to_name = document.createElement("h3");
    to_name.textContent = `@${to}`;
    to_name.className = "title";
    const to_col = document.createElement("div");
    to_col.className = "col";
    to_col.appendChild(to_name);
    const close = document.createElement("img");
    close.src = "../img/chat/close_chat.png";
    close.className = "post-img-size";
    close.loading = "lazy";
    close.style.cursor = "pointer";
    close.addEventListener("click", () => {
      window.location.reload();
    });
    const close_col = document.createElement("div");
    close_col.className = "col-auto";
    close_col.appendChild(close);
    const header = document.createElement("div");
    header.className = "row align-items-center";
    header.appendChild(to_col);
    header.appendChild(close_col);
    // mostro cronologia chat
    const history_panel = document.createElement("div");
    history_panel.className = "container mt-5 mb-5 scrollbar";
    history_panel.style.maxWidth = "500px";
    history_panel.style.maxHeight = "350px";
    history_panel.style.overflowY = "auto";
    this.build_history(chat.history, history_panel, logged);
    // mostro azioni (scrivi e invia messaggio)
    const actions = document.createElement("div");
    actions.className = "row align-items-center justify-content-center";
    const write_col = document.createElement("div");
    write_col.className = "col";
    const write = document.createElement("textarea");
    write.className = "form-control rounded-3 shadow-lg p-2 text";
    write.style.resize = "none";
    write.style.border = "none";
    write.placeholder = "Scrivi qualcosa...";
    const send_col = document.createElement("div");
    send_col.className = "col-auto";
    const send = document.createElement("img");
    send.src = "../img/chat/send_message.png";
    send.className = "post-img-size";
    send.loading = "lazy";
    send.style.cursor = "pointer";
    send.addEventListener("click", () => {
      const content = write.value.trim();
      if (content) {
        this.send_message(logged.username, chat.history, content);
        this.load_chats_in_storage();
        this.open_chat(logged, div_id);
      }
    });
    write_col.appendChild(write);
    send_col.appendChild(send);
    actions.appendChild(write_col);
    actions.appendChild(send_col);
    // aggiungo tutto al contenitore principale
    const div = document.createElement("div");
    div.appendChild(header);
    div.appendChild(document.createElement("hr"));
    div.appendChild(history_panel);
    div.appendChild(actions);
    return div;
  },
  open_chat(logged, div_id) {
    // prendo il destinatario
    const user = document.getElementById(this.users_id).value;
    if (!user) return;

    let chat = this.search_chat_by_username(user, logged.username);
    if (!chat) {
      // crea e configura la chat se inesistente
      chat = {
        from: logged.username,
        to: user,
        history: [],
      };
      this.chats.push(chat);
      this.load_chats_in_storage();
    }
    // mostro la chat
    const div = document.getElementById(div_id);
    div.innerHTML = "";
    div.appendChild(this.build_chat(chat, logged, user, div_id));
  },
  show_users(users, logged_username, select_id) {
    // mostro gli utenti disponibili per avere una chat
    const select = document.getElementById(this.users_id);
    users.forEach((user) => {
      if (user.username !== logged_username) {
        const option = document.createElement("option");
        option.value = user.username;
        option.textContent = `@${user.username}`;
        select.appendChild(option);
      }
    });
  },
  delete_chats_by_username(username) {
    // cancella tutte le chat di un utente, usato alla cancellazione dell'account
    this.get_chats_from_storage();
    this.chats = this.chats.filter(
      (chat) => chat.from !== username && chat.to !== username
    );
    this.load_chats_in_storage();
    this.remove_section_if_useless();
  },
};
