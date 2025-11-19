// English comments: Render recipes with two-level filters (category + cuisine)

document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('recipeList');
  const input = document.getElementById('recipeSearch');

  const catButtons = document.getElementById('catButtons');
  const cuisineButtons = document.getElementById('cuisineButtons');

  // --- Extract unique categories & cuisines ---
  const categories = [...new Set(RECIPES.map(r => r.category))].sort();
  const cuisines = [...new Set(RECIPES.map(r => r.cuisine))].sort();

  let selectedCategory = '全部';
  let selectedCuisine = '全部';

  // --- Render category buttons ---
  function renderCategoryButtons() {
    catButtons.innerHTML = '';
    const allBtn = createButton('全部', '全部', 'category');
    catButtons.appendChild(allBtn);

    categories.forEach(cat => {
      const btn = createButton(cat, cat, 'category');
      catButtons.appendChild(btn);
    });
  }

  // --- Render cuisine buttons ---
  function renderCuisineButtons() {
    cuisineButtons.innerHTML = '';
    const allBtn = createButton('全部', '全部', 'cuisine');
    cuisineButtons.appendChild(allBtn);

    cuisines.forEach(c => {
      const btn = createButton(c, c, 'cuisine');
      cuisineButtons.appendChild(btn);
    });
  }

  // --- Button helper ---
  function createButton(label, value, type) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = 'filter-btn';
    btn.dataset.value = value;
    btn.dataset.type = type;

    btn.addEventListener('click', () => {
      if (type === 'category') selectedCategory = value;
      if (type === 'cuisine') selectedCuisine = value;

      // toggle button style
      [...document.querySelectorAll(`.filter-btn[data-type="${type}"]`)]
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      apply();
    });

    // default select "全部"
    if (value === '全部') btn.classList.add('active');

    return btn;
  }

  // --- Render recipes ---
  function render(list) {
    listEl.innerHTML = '';

    if (!list.length) {
      listEl.innerHTML = '<div class="card"><div class="muted">无食谱</div></div>';
      return;
    }

    list.forEach(r => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h4>${r.title}</h4>
        <div class="muted">${r.category} • ${r.cuisine}</div>

        <div style="margin-top:8px;">
          <strong>材料</strong>
          <ul>${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>

        <div style="margin-top:6px;">
          <strong>步骤</strong>
          <ol>${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>
        </div>

        <div class="small muted" style="margin-top:6px;">
          <strong>小贴士：</strong> ${r.tip || ''}
        </div>
      `;
      listEl.appendChild(card);
    });
  }

  // --- Apply all filters ---
  function apply() {
    const q = (input.value || '').trim().toLowerCase();

    let list = RECIPES.slice();

    // filter by category
    if (selectedCategory !== '全部') {
      list = list.filter(r => r.category === selectedCategory);
    }

    // filter by cuisine
    if (selectedCuisine !== '全部') {
      list = list.filter(r => r.cuisine === selectedCuisine);
    }

    // search
    if (q) {
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.ingredients.join(' ').toLowerCase().includes(q)
      );
    }

    render(list);
  }

  // --- initial setup ---
  renderCategoryButtons();
  renderCuisineButtons();
  apply();

  input.addEventListener('input', apply);
});
