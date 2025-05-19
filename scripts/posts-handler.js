const posts_handler = {
  posts: [],
  last_id: 0,
  posts_item: "posts",
  id_item: "posts_last_id",
  async request_posts() {
    // prendo i post (api)
    try {
      const reponse = await fetch("https://jsonplaceholder.typicode.com/posts");
      return await reponse.json();
    } catch (error) {
      alert(`Errore nel caricamento dei post! ${error}`);
      return [];
    }
  },
  async request_users() {
    // prendo gli utenti (api)
    try {
      const response = fetch("https://jsonplaceholder.typicode.com/users");
      return (await response).json();
    } catch (error) {
      alert(`Errore nel caricamento degli utenti! ${error}`);
      return [];
    }
  },
  delete_post(id) {
    this.get_posts();
    console.table(
      this.posts.filter((post) => {
        post.id !== id;
      })
    );
    this.load_posts();
    window.location.reload();
  },
  // creo il post vero e proprio
  build_post(post, username, _title, _body, is_username_logged, post_id) {
    const container = document.createElement("div");
    container.className = "container border border-dark rounded-3 mb-4 p-4";

    // username che ha fatto il post
    const profile = document.createElement("h4");
    profile.className = "title post-title";
    profile.textContent = `@${username}`;

    // titolo
    const title = document.createElement("h5");
    title.className = "title post-title";
    title.textContent = _title === null ? post.title : _title;

    // contenuto post
    const body = document.createElement("p");
    body.className = "text post-body";
    body.textContent = _body === null ? post.body : _body;

    // commento e cestino
    const answer = document.createElement("img");
    answer.className = "post-img-size";
    answer.src = "../img/home/comment.png";
    answer.loading = "lazy";
    answer.addEventListener("click", () => {});

    const answer_container = document.createElement("div");
    answer_container.className = "container text-end";
    answer_container.appendChild(answer);

    if (is_username_logged) {
      // se e' il post dell'utente loggato allora puo' eliminarlo
      const trash = document.createElement("img");
      trash.className = "post-img-size ms-2";
      trash.src = "../img/home/trash.png";
      trash.loading = "lazy";
      trash.addEventListener("click", () => {
        this.delete_post(post_id);
      });
      answer_container.appendChild(trash);
    }
    // aggiungo tutti gli elementi (creo il post intero)
    [
      profile,
      document.createElement("hr"),
      title,
      document.createElement("br"),
      body,
      answer_container,
    ].forEach((element) => {
      container.appendChild(element);
    });
    return container;
  },
  create_posts_if_needed() {
    if (localStorage.getItem(this.posts_item) === null)
      localStorage.setItem(this.posts_item, JSON.stringify([]));
  },
  create_id_if_needed() {
    if (localStorage.getItem(this.id_item) === null)
      localStorage.setItem(this.id_item, JSON.stringify(0));
  },
  get_posts() {
    this.create_posts_if_needed();
    this.posts = JSON.parse(localStorage.getItem(this.posts_item));
  },
  load_posts() {
    localStorage.setItem(this.posts_item, JSON.stringify(this.posts));
  },
  get_last_id() {
    this.create_id_if_needed();
    this.last_id = JSON.parse(localStorage.getItem(this.id_item));
  },
  load_last_id() {
    localStorage.setItem(this.id_item, JSON.stringify(this.last_id));
  },
  async display_default_posts() {
    const users = await this.request_users();
    const _posts = await this.request_posts();
    const div = document.getElementById("posts");
    let i = 0;
    _posts.forEach((post) => {
      div.appendChild(
        this.build_post(post, users.at(i).username, null, null, false, post.id)
      );
      i = i === 9 ? 0 : ++i;
    });
  },
  display_posts(div_id, logged_username) {
    this.get_posts();
    const div = document.getElementById(div_id);
    this.posts.forEach((post) => {
      div.appendChild(
        this.build_post(
          null,
          post.username,
          post.title,
          post.body,
          post.username === logged_username,
          post.id
        )
      );
      console.log(
        "post.username, post.id, post.title :>> ",
        post.username,
        post.id,
        post.title
      );
    });
  },
  add_to_posts(user, logged, title, body) {
    this.get_posts();
    this.get_last_id();
    this.posts.push({
      username: user.username,
      title: title,
      body: body,
      id: this.last_id++,
    });
    this.load_posts();
    this.load_last_id();
    // aggiungo 1 punto per ogni post
    ++user.points;
    ++logged.points;
  },
  delete_posts(username) {
    this.get_posts();
    this.posts = this.posts.filter((post) => post.username !== username);
    if (this.posts.length === 0) {
      localStorage.removeItem(this.posts_item);
      localStorage.removeItem(this.id_item);
    } else this.load_posts();
  },
};
