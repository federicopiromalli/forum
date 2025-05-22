const post_handler = {
  posts: [],
  posts_item: "posts",
  last_id: 0,
  last_id_item: "last_id",
  create_posts_if_needed() {
    // crea la sezione dei post se necessario
    if (!localStorage.getItem(this.posts_item))
      localStorage.setItem(this.posts_item, JSON.stringify([]));
  },
  get_posts_from_storage() {
    // prende i post da localStorage
    this.posts = JSON.parse(localStorage.getItem(this.posts_item));
  },
  load_posts_in_storage() {
    // inserisce i post in localStorage
    this.create_posts_if_needed();
    localStorage.setItem(this.posts_item, JSON.stringify(this.posts));
  },
  create_id_if_needed() {
    // crea la sezione dell'ultimo id usato
    if (!localStorage.getItem(this.last_id_item))
      localStorage.setItem(this.last_id_item, JSON.stringify(0));
  },
  get_id_from_storage() {
    // prendo l'ultimo id usato
    this.last_id = JSON.parse(localStorage.getItem(this.last_id_item));
  },
  load_id_in_storage() {
    // inserisce in localStorage l'ultimo id
    localStorage.setItem(this.last_id_item, this.last_id);
  },
  async request_default_posts() {
    // prendo i post generate automaticamente (api)
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return await response.json();
    } catch (error) {
      alert(`Errore durante il caricamento dei post default! ${error}`);
      return [];
    }
  },
  build_post(username, logged_username, title, body, id) {
    // costruisco il post pezzo per pezzo
    const div = document.createElement("div");
    div.className = "container shadow-lg rounded-3 p-4 mb-5";

    const creator = document.createElement("h3");
    creator.className = "post-title";
    creator.textContent = `@${username}`;
    div.appendChild(creator);

    div.appendChild(document.createElement("hr"));
    const post_title = document.createElement("h4");
    post_title.className = "post-title";
    post_title.textContent = title;
    div.appendChild(post_title);

    const post_body = document.createElement("p");
    post_body.className = "post-body text-break";
    post_body.textContent = body;
    div.appendChild(post_body);

    const actions = document.createElement("div");
    actions.className = "container text-end";

    const answer = document.createElement("img");
    answer.className = "post-img-size";
    answer.src = "../img/home/comment.png";
    answer.addEventListener("click", () => {
      // TODO: aprire una modal in cui mostrare i commenti e in cui poter commentare
      window.location.reload();
    });
    actions.appendChild(answer);

    // se username e logged_username coincidono allora il commento puo' essere eliminato
    if (username === logged_username) {
      const trash = document.createElement("img");
      trash.className = "post-img-size ms-1";
      trash.src = "../img/home/trash.png";
      trash.addEventListener("click", () => {
        this.delete_post_by_id(id);
        window.location.reload();
      });
      actions.appendChild(trash);
    }

    div.appendChild(actions);
    return div;
  },
  create_post(username, post_title, post_body) {
    this.create_posts_if_needed();
    this.get_posts_from_storage();
    this.create_id_if_needed();
    this.get_id_from_storage();
    this.posts.unshift({
      creator: username,
      id: this.last_id++,
      title: post_title,
      body: post_body,
    });
    this.load_id_in_storage();
    this.load_posts_in_storage();
  },
  async show_default_posts(div_id) {
    const div = document.getElementById(div_id);
    const posts = await this.request_default_posts();
    posts.forEach((post) => {
      div.appendChild(
        this.build_post("Bot", null, post.title, post.body, null)
      );
    });
  },
  show_posts(div_id, logged_username) {
    this.create_posts_if_needed();
    this.get_posts_from_storage();
    const div = document.getElementById(div_id);
    this.posts.forEach((post) => {
      div.appendChild(
        this.build_post(
          post.creator,
          logged_username,
          post.title,
          post.body,
          post.id
        )
      );
    });
  },
  delete_post_by_id(id) {
    // cancello il post (caso in cui l'utente cancella il suo post)
    this.get_posts_from_storage();
    this.posts = this.posts.filter((post) => post.id !== id);
    this.load_posts_in_storage();
  },
  delete_posts_by_username(username) {
    this.get_posts_from_storage();
    // prendo i post che hanno username diverso da quello specificato
    this.posts = this.posts.filter((post) => post.creator !== username);
    // cancella la sezione dei post e dell'id post se necessario
    if (this.posts.length === 0) {
      localStorage.removeItem(this.posts_item);
      localStorage.removeItem(this.last_id_item);
    } else {
      this.load_posts_in_storage();
    }
  },
};
