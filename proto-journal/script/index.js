(async function () {
  const container = document.getElementById('entries');
  const filterBar = document.getElementById('filter-bar');

  const parseHTML = html =>
    new DOMParser().parseFromString(html, 'text/html');

  const fetchText = url =>
    fetch(url).then(r => r.text());

  // 读取 entries 目录
  async function loadEntryFiles() {
    const dirDoc = parseHTML(await fetchText('entries.json'));
    return [...dirDoc.querySelectorAll('a')]
      .map(a => a.getAttribute('href'))
      .filter(f => f && f.endsWith('.html'));
  }

  // 解析某篇文章的 metadata
  async function readEntry(file) {
    const path = 'entries/' + file;
    const doc = parseHTML(await fetchText(path));

    const meta = doc.querySelector('.meta-block');
    const get = name => meta?.querySelector(`meta[name="${name}"]`)?.content || "";

    return {
      filePath: path,
      title: get("title") || doc.querySelector('h1')?.innerText || file.replace('.html', ''),
      date: get("date"),
      status: get("status"),
      type: get("type") || "Uncategorized",
      abstract: get("abstract") || doc.querySelector("p")?.innerText || ""
    };
  }

  // 渲染 Filter 按钮
  function renderFilters(types, entries) {
    const all = ["全部", ...types.sort()];
    filterBar.innerHTML = "";

    all.forEach(type => {
      const btn = document.createElement("div");
      btn.className = "filter-btn";
      btn.innerText = type;
      btn.dataset.type = type;
      filterBar.appendChild(btn);
    });

    // 默认选中“全部”
    filterBar.firstChild.classList.add("active");

    filterBar.onclick = e => {
      if (!e.target.classList.contains("filter-btn")) return;

      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");

      const t = e.target.dataset.type;
      renderList(t === "全部" ? entries : entries.filter(x => x.type === t));
    };
  }

  // 渲染列表（精简版）
  function renderList(list) {
    container.innerHTML = list.map(ent => `
      <div class="entry-item">
        <a href="${ent.filePath}" style="font-size:20px; display:block; margin-bottom:6px;">
          ${ent.title}
        </a>
        <div style="font-size:14px; color:#8b949e; margin-bottom:6px;">
          ${ent.date ? `Date: ${ent.date}` : ""}
          ${ent.status ? ` | Status: ${ent.status}` : ""}
          ${ent.type ? ` | Type: ${ent.type}` : ""}
        </div>
        <div style="font-size:15px; color:#9da6b5;">${ent.abstract}</div>
      </div>
    `).join("");
  }

  // ===== 主流程 =====
  try {
    const files = await loadEntryFiles();      // 1. 找到所有文章文件
    const entries = await Promise.all(files.map(readEntry)); // 2. 解析所有 metadata
    const types = [...new Set(entries.map(e => e.type))];    // 3. 找出所有 types

    renderFilters(types, entries); // 渲染过滤按钮
    renderList(entries);           // 默认显示全部

  } catch (err) {
    container.innerHTML = "<p>Unable to read entries directory.</p>";
  }
})();
