function includeHTML(id, file) {
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Could not load ${file}`);
        return response.text();
      })
      .then(data => {
        document.getElementById(id).innerHTML = data;
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    includeHTML("navbar", "/components/navbar.html");
    includeHTML("footer", "/components/footer.html");
  });
  