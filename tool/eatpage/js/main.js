// English comments: Simple filters for meal list.
 const mealFunction = {
  init(){
    const results = document.getElementById('results');
    const searchInput = document.getElementById('searchInput');

    const mealButtons = document.getElementById('mealButtons');
    const typeButtons = document.getElementById('typeButtons');
    const locationButtons = document.getElementById('locationButtons');

    // Unique values
    const mealTypes = [...new Set(
      MEALS.flatMap(x => Array.isArray(x.meal) ? x.meal : [x.meal])
    )];
    const foodTypes = [...new Set(
      MEALS.flatMap(x => Array.isArray(x.type) ? x.type : [x.type])
    )];
    const locationTypes = [...new Set(MEALS.map(x => x.location))];

    let selectedMeal = '全部';
    let selectedType = '全部';
    let selectedLocation = '全部';

    // Create filter buttons
    function createGroupButtons(container, values, type) {
      container.innerHTML = '';

      const all = createBtn('全部', '全部', type);
      container.appendChild(all);

      values.forEach(v => {
        container.appendChild(createBtn(v, v, type));
      });
    }

    function createBtn(label, value, group) {
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.className = 'filter-btn';
      btn.dataset.value = value;
      btn.dataset.group = group;

      if (value === '全部') btn.classList.add('active');

      btn.addEventListener('click', () => {
        // clear active
        [...document.querySelectorAll(`.filter-btn[data-group="${group}"]`)]
          .forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        if (group === 'meal') selectedMeal = value;
        if (group === 'type') selectedType = value;
        if (group === 'location') selectedLocation = value;

        apply();
      });

      return btn;
    }

    // Render results
    function render(list) {
      results.innerHTML = '';

      if (!list.length) {
        results.innerHTML = '<div class="card"><div class="muted">没有找到结果</div></div>';
        return;
      }

      list.forEach(x => {
        const div = document.createElement('div');
        div.className = 'card';

        div.innerHTML = `
          <h4>${x.name}</h4>
          <div class="muted">
  ${(Array.isArray(x.meal) ? x.meal.join(' / ') : x.meal)}
  •
  ${(Array.isArray(x.type) ? x.type.join(' / ') : x.type)}
  •
  ${x.location}
</div>
          <div class="small muted" style="margin-top:6px;">${x.note || ''}</div>
        `;

        results.appendChild(div);
      });
    }

    // Apply all filters
    function apply() {
      const q = searchInput.value.trim().toLowerCase();

      let list = MEALS.slice();

      if (selectedMeal !== '全部') {
        list = list.filter(x => Array.isArray(x.meal) ? x.meal.includes(selectedMeal) : x.meal === selectedMeal);
      }

      if (selectedType !== '全部') {
        list = list.filter(x => Array.isArray(x.type) ? x.type.includes(selectedType) : x.type === selectedType);
      }

      if (selectedLocation !== '全部')
        list = list.filter(x => x.location === selectedLocation);

      if (q) {
        list = list.filter(x =>
          x.name.toLowerCase().includes(q) ||
          (x.location || '').toLowerCase().includes(q) ||
          (x.note || '').toLowerCase().includes(q) ||
          (x.tags || []).join(' ').toLowerCase().includes(q)
        );
      }

      render(list);
    }

  
    // Initial render
    createGroupButtons(mealButtons, mealTypes, 'meal');
    createGroupButtons(typeButtons, foodTypes, 'type');
    createGroupButtons(locationButtons, locationTypes, 'location');
    apply();

    searchInput.addEventListener('input', apply);
  }
 };
 mealFunction.init();