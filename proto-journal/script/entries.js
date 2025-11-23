(function() {
  const metaBlock = document.querySelector('.meta-block');
  if (!metaBlock) return;

  const get = name => metaBlock.querySelector(`meta[name="${name}"]`)?.content || "";

  const title   = get("title");
  const date    = get("date");
  const status  = get("status");
  const abstr   = get("abstract");

  // Document title
  if (title) document.title = title + " - Proto Journal";

  // Page <h1>
  const h1 = document.querySelector('h1');
  if (h1 && title) h1.innerText = title;

  // Meta info section
  const metaDisplay = document.querySelector('.meta');
  if (metaDisplay) {
    metaDisplay.innerHTML = `
      Status: ${status || "Unknown"}<br>
      Date: ${date || "Unknown"}<br>
    `;
  }

  // Abstract
  const abstractBlock = document.querySelector('#auto-abstract');
  if (abstractBlock && abstr) {
    abstractBlock.innerText = abstr;
  }
})();