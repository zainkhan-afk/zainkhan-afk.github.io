// router.js
function navigateTo(url) {
    history.pushState(null, null, url);
    handleRoute();
  }
  
  window.addEventListener("popstate", handleRoute);
  
  function handleRoute() {
    const path = window.location.pathname;
  
    if (path.startsWith("/projects/")) {
      const projectSlug = path.split("/")[2];
      loadProject(projectSlug);
    } else if (path.startsWith("/notes/")) {
      const parts = path.split("/");
      loadNote(parts[2], parts[3]); // notes-name, note-1
    } else {
      loadHome();
    }
  }
  