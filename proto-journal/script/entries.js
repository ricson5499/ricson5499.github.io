(function() {
  const metaBlock = document.querySelector('.meta-block');
  if (!metaBlock) return;

  const get = name => metaBlock.querySelector(`meta[name="${name}"]`)?.content || "";

  const title   = get("title");
  const date    = get("date");
  const status  = get("status");
  const abstr   = get("abstract");
  const type    = get("type");

  if (title) document.title = title + " - Proto Journal";

  const h1 = document.querySelector('h1');
  if (h1 && title) h1.innerText = title;

  const metaDisplay = document.querySelector('.meta');
  if (metaDisplay) {
    metaDisplay.innerHTML = `
      Status: ${status || "Unknown"}<br>
      Date: ${date || "Unknown"}<br>
      Type: ${type || "Uncategorized"}<br>
    `;
  }

  const abstractBlock = document.querySelector('#auto-abstract');
  if (abstractBlock && abstr) {
    abstractBlock.innerText = abstr;
  }
})();