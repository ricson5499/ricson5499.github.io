// === RENDERING ===
function init() {
  renderCategories(KB_DATA);
  renderCards(KB_DATA);
}

function renderCategories(data) {
  const ul = document.getElementById("category-list");
  const cats = [...new Set(data.map(x => x.category))];

  const liAll = document.createElement("li");
  liAll.textContent = "All";
  liAll.onclick = () => renderCards(KB_DATA, "All Concepts");
  ul.appendChild(liAll);

  cats.forEach(cat => {
    const li = document.createElement("li");
    li.textContent = cat;
    li.onclick = () => {
      const filtered = KB_DATA.filter(x => x.category === cat);
      renderCards(filtered, cat);
    };
    ul.appendChild(li);
  });
}

function renderCards(list, title = "All Concepts") {
  document.getElementById("section-title").textContent = title;
  const container = document.getElementById("cards");
  container.innerHTML = "";

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${item.title}</h4>
      <div class="explain">${item.explain}</div>
      <strong>Cheat sheet:</strong>
      <ul>
        ${item.cheatsheet.map(c => `<li class='cheat-item'>• ${c}</li>`).join("")}
      </ul>
    `;

    if (item.examples?.length) {
      item.examples.forEach(ex => {
        const pre = document.createElement("pre");
        pre.textContent = ex.code;
        card.appendChild(pre);
      });
    }

    container.appendChild(card);
  });
}

init();