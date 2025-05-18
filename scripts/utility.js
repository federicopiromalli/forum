const utility = {
  sort_users_by_points(users) {
    let temp_user, changes;
    do {
      changes = false;
      for (let i = 0; i < users.length - 1; ++i) {
        if (users[i].points < users[i + 1].points) {
          temp_user = users[i];
          users[i] = users[i + 1];
          users[i + 1] = temp_user;
          changes = true;
        }
      }
    } while (changes);
    return users;
  },
  display_most_active_users(div_id, users) {
    const div = document.getElementById(div_id);
    this.sort_users_by_points(users).forEach((user) => {
      const username = document.createElement("h3");
      username.className = "post-title";
      username.textContent = user.username;
      div.appendChild(username);
    });
  },
};
