const chat_handler = {
  messages: [],
  messages_item: "messages",
  create_messages_if_neeeded() {
    // creo la sezione dei messaggi se necessario
    if (!localStorage.getItem(this.messages_item))
      localStorage.setItem(this.messages_item, JSON.stringify([]));
  },
  get_messages_from_storage() {
    // prendo i messaggi da localStorage
    this.messages = JSON.parse(localStorage.getItem(this.messages_item));
  },
};
