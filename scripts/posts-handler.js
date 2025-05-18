const posts_handler = {
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
  build_post(post, username, _title, _body) {
    const container = document.createElement("div");
    container.className = "container border border-dark rounded-3 mb-4 p-4";
    // username che ha fatto il post
    const profile = document.createElement("h4");
    profile.className = "title post-title";
    profile.textContent = username;
    // titolo
    const title = document.createElement("h5");
    title.className = "title post-title";
    title.textContent = _title === null ? post.title : _title;
    // contenuto post
    const body = document.createElement("p");
    body.className = "text post-body";
    body.textContent = _body === null ? post.body : _body;
    // commento
    const answer = document.createElement("img");
    answer.className = "post-img-size";
    answer.src = "../img/home/comment.png";
    answer.addEventListener("click", () => {});
    const answer_container = document.createElement("div");
    answer_container.className = "container text-end";
    answer_container.appendChild(answer);

    container.appendChild(profile);
    container.appendChild(title);
    container.appendChild(document.createElement("br"));
    container.appendChild(body);
    container.appendChild(answer_container);
    return container;
  },
  async display_default_posts() {
    const posts = await this.request_posts();
    const users = await this.request_users();
    const div = document.getElementById("posts");
    for (let i = 0; i < 5; ++i)
      div.appendChild(
        this.build_post(posts.at(i), users.at(i).username, null, null)
      );
  },
  display_post(div_id, username, title, body) {
    document
      .getElementById(div_id)
      .appendChild(this.build_post(null, username, title, body));
  },
};
