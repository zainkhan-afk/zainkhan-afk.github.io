// loadContent.js

export async function loadContent({ apiUrl, containerId, title }) {
    const container = document.getElementById(containerId);
    container.innerHTML = `Loading ${title.toLowerCase()}...`;
  
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
  
      if (!Array.isArray(data[title])) throw new Error("Invalid data");
  
      container.innerHTML = ""; // Clear loading text
  
      data[title].forEach(async item => {
        const block = document.createElement("div");
        // block.classList.add("box", "is-flex", "is-flex-direction-column", "is-justify-content-space-between", "fixed-box");
        
        // block.innerHTML = `
        //   <h3 class="title is-4">${item.title}</h3>
        //   <p>
        //     <small>${item.date || ""}</small>
        //     <br/><br/>
        //     ${item.description || ""}
        //   </p>
        //   ${item.link ? `<a href="${item.link}" target="_blank" class="button is-link is-light mt-2">View</a>` : ""}
        // `;
        
        // const res = await fetch(`/content/projects/OpenCV-3D-Renderer.md`);
        // const markdown = await res.text();
        // const html = marked.parse(markdown); // use marked.js for markdown -> HTML

        block.classList.add("card");

        block.innerHTML = `
          <header class="card-header">
            <p class="card-header-title">${item.title}</p>
          </header>
        
          <div class="card-content fixed-box">
            <div class="columns is-vcentered is-mobile">
              <div class="column is-8">
                <div class="content has-text-justified" style="max-height: 200px; ">
                  ${item.description}
                </div>
              </div>
              <div class="column is-4 has-text-centered">
                <figure class="image is-128x128" style="margin: auto;">
                  <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt="project image" />
                </figure>
              </div>
            </div>
          </div>
        
          <footer class="card-footer">
            <a href="${item.link}" target="_blank" class="card-footer-item has-text-weight-semibold has-text-link">View</a>
          </footer>
        `;
  
        container.appendChild(block);
      });
    } catch (err) {
      console.error(`Failed to load ${title.toLowerCase()}:`, err);
      container.innerHTML = `<p class="has-text-danger">Failed to load ${title.toLowerCase()}.</p>`;
    }
  }
  