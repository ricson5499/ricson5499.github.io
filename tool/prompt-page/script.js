import prompts from './data.js';

const container = document.getElementById('prompt-container');
const dialog = document.getElementById('fullTextDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogContent = document.getElementById('dialogContent');
const MAX_CHARS = 200;
const MAX_TITLE_CHARS = 80;

function truncateText(text, maxChars) {
  return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
}

prompts.forEach(group => {
  const section = document.createElement('section');
  section.className = 'prompt-section';
  section.innerHTML = `<h2>${group.category}</h2><p>${group.description || ''}</p>`;

  const list = document.createElement('div');
  list.className = 'prompt-list';

  group.items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'prompt-card';
    const isPromptOverLimit = item.prompt.length > MAX_CHARS;
    const isTitleOverLimit = item.title.length > MAX_TITLE_CHARS;
    const displayText = truncateText(item.prompt, MAX_CHARS);
    const displayTitle = truncateText(item.title, MAX_TITLE_CHARS);

    card.innerHTML = `
          <h3 class="${isTitleOverLimit ? 'clickable-title' : ''}">${displayTitle}</h3>
          <p><strong>用途：</strong>${item.usage}</p>
          <pre class="${isPromptOverLimit ? 'clickable' : ''}">${displayText}</pre>
        `;

    const h3 = card.querySelector('h3');
    const pre = card.querySelector('pre');

    const openDialog = () => {
      dialogTitle.textContent = item.title;
      dialogContent.textContent = item.prompt;
      dialog.showModal();
    };

    if (isTitleOverLimit) {
      h3.addEventListener('click', openDialog);
    }

    if (isPromptOverLimit) {
      pre.addEventListener('click', openDialog);
    }

    list.appendChild(card);
  });

  section.appendChild(list);
  container.appendChild(section);
});