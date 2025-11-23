fetch('entries/')
  .then(res => res.text())
  .then(text => {
    const container = document.getElementById('entries');
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    const links = [...doc.querySelectorAll('a')];
    const htmlFiles = links
      .map(a => a.getAttribute('href'))
      .filter(h => h && h.endsWith('.html'));

    if (htmlFiles.length === 0) {
      container.innerHTML = "<p>No entries yet.</p>";
      return;
    }

    container.innerHTML = "";

    htmlFiles.forEach(file => {
      const title = file
        .replace('.html', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      const a = document.createElement('a');
      a.href = 'entries/' + file;
      a.textContent = title;
      container.appendChild(a);
    });
  })
  .catch(err => {
    document.getElementById('entries').innerHTML =
      "<p>Unable to read entries directory.</p>";
  });