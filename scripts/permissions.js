function exit_if_not_logged(logged) {
  if (!logged || logged.length === 0) {
    alert("Non puoi accedere a questa pagina senza profilo!");
    window.location.href = "./index.html";
  }
}
