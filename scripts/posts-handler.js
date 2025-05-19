const posts_handler = {
  posts: [],
  posts_item: "posts",
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
  // creo il post vero e proprio
  build_post(post, username, _title, _body, is_username_logged) {
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
      trash.addEventListener("click", () => {});
      answer_container.appendChild(trash);
    }

    container.appendChild(profile);
    container.appendChild(document.createElement("hr"));
    container.appendChild(title);
    container.appendChild(document.createElement("br"));
    container.appendChild(body);
    container.appendChild(answer_container);
    return container;
  },
  create_posts_if_needed() {
    if (localStorage.getItem(this.posts_item) === null)
      localStorage.setItem(this.posts_item, JSON.stringify([]));
  },
  get_posts() {
    this.create_posts_if_needed();
    this.posts = JSON.parse(localStorage.getItem(this.posts_item));
  },
  load_posts() {
    localStorage.setItem(this.posts_item, JSON.stringify(this.posts));
  },
  async display_default_posts() {
    const posts = await this.request_posts();
    const users = await this.request_users();
    const div = document.getElementById("posts");
    let i = 0;
    posts.forEach((post) => {
      div.appendChild(this.build_post(post, users.at(i).username, null, null));
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
          post.username === logged_username
        )
      );
    });
  },
  add_to_posts(user, title, body) {
    this.get_posts();
    this.posts.push({ username: user.username, title, body });
    this.load_posts();
    ++user.points; // aggiungo 1 punto per ogni post
  },
};
